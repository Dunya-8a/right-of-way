"""Weave evaluation + leaderboard: topology x brain on the forced-trade scene.

Compares the four configurations the spec calls for on the same scorers:

    topology = {swarm, hierarchical}   x   brain = {MockBrain, ClaudeBrain}

Each configuration is a ``weave.Model`` whose ``predict`` runs the full traced
pipeline (``traced_run``). All four are scored by the same ``ALL_SCORERS`` over
the same one-row dataset (the forced-trade scenario), so Weave's evaluation
comparison view lines them up side by side. We also publish an explicit
``Leaderboard`` object (best-effort) so there's a dedicated ranked view.

Run:  python -m row.eval --leaderboard
"""

from __future__ import annotations

import asyncio
from typing import Any

import weave

from ._env import have_anthropic_key
from .scorers import ALL_SCORERS
from .tracing import init_weave, traced_run

# One-row dataset: the canonical forced-trade scenario. (Add rows here to score
# more scenarios; the topology/brain axes live on the models, not the dataset.)
DATASET = [{"scenario_id": "forced-trade"}]


class RowOrchestratorModel(weave.Model):
    """A configuration of the Right of Way orchestrator as a Weave Model.

    The Model's identity (topology + brain) is captured by Weave, so each cell
    of the topology x brain matrix is a distinct, versioned model in the UI.
    """

    topology: str
    brain: str  # "mock" or "claude" — display/identity only
    max_rounds: int = 5
    max_iterations: int = 8

    @weave.op
    def predict(self, scenario_id: str) -> dict[str, Any]:
        force_mock = self.brain == "mock"
        return traced_run(
            self.topology,
            force_mock=force_mock,
            max_rounds=self.max_rounds,
            max_iterations=self.max_iterations,
            output_path=None,
            label=f"{self.topology}/{self.brain}",
        )


def _models(include_claude: bool) -> list[RowOrchestratorModel]:
    cells: list[RowOrchestratorModel] = []
    brains = ["mock"] + (["claude"] if include_claude else [])
    for topology in ("swarm", "hierarchical"):
        for brain in brains:
            cells.append(
                RowOrchestratorModel(
                    name=f"row-{topology}-{brain}",
                    topology=topology,
                    brain=brain,
                )
            )
    return cells


def _publish_leaderboard(eval_ref) -> str | None:
    """Best-effort: publish an explicit ranked Leaderboard object.

    The evaluation comparison view already works without this; the dedicated
    Leaderboard is a nicer single-screen artifact for the demo. If the API shape
    differs across weave versions we swallow the error — the comparison view is
    the reliable fallback.
    """
    try:
        from weave.flow import leaderboard

        uri = eval_ref.uri()

        def column(scorer_name: str, metric_path: str, minimize: bool = False):
            # NOTE: pass ``should_minimize`` ONLY when minimizing — this weave
            # build rejects an explicit ``None`` for that Optional[bool] field.
            kwargs = {
                "evaluation_object_ref": uri,
                "scorer_name": scorer_name,
                "summary_metric_path": metric_path,
            }
            if minimize:
                kwargs["should_minimize"] = True
            return leaderboard.LeaderboardColumn(**kwargs)

        spec = leaderboard.Leaderboard(
            name="right-of-way-leaderboard",
            description=(
                "Right of Way — collision-avoidance negotiation. "
                "topology (swarm/hierarchical) x brain (mock/claude) on the "
                "forced-trade scenario. Ranked by conjunctions resolved, then "
                "lowest total delta-v."
            ),
            columns=[
                column("conjunctions_resolved", "resolved.true_fraction"),
                column("total_dv", "m_s.mean", minimize=True),
                column("new_conjunctions_created", "count.mean", minimize=True),
                column("rounds_to_converge", "rounds.mean", minimize=True),
                column("budget_respected", "respected.true_fraction"),
            ],
        )
        ref = weave.publish(spec)
        return ref.uri()
    except Exception as exc:
        print(f"[weave] explicit Leaderboard object skipped ({exc}).")
        print("[weave] use the evaluation comparison view instead "
              "(Evaluations tab -> select the runs -> Compare).")
        return None


def run_leaderboard(project: str = "right-of-way") -> dict[str, Any]:
    """Evaluate all topology x brain cells and (best-effort) publish a leaderboard."""
    live = init_weave(project)
    include_claude = have_anthropic_key()
    if not include_claude:
        print("[weave] ANTHROPIC_API_KEY not set — scoring MockBrain cells only "
              "(set it in ../.env to include the real ClaudeBrain).")

    evaluation = weave.Evaluation(
        name="row-topology-x-brain",
        dataset=DATASET,
        scorers=ALL_SCORERS,
    )
    eval_ref = weave.publish(evaluation) if live else None

    models = _models(include_claude)
    results: dict[str, Any] = {}
    for model in models:
        cell = f"{model.topology}/{model.brain}"
        print(f"\n[weave] evaluating cell: {cell}")
        summary = asyncio.run(evaluation.evaluate(model))
        results[cell] = summary
        _print_cell(cell, summary)

    leaderboard_uri = None
    if live and eval_ref is not None:
        leaderboard_uri = _publish_leaderboard(eval_ref)

    print("\n" + "=" * 70)
    print("LEADERBOARD SUMMARY (topology x brain on the forced-trade scene)")
    print("=" * 70)
    _print_table(results)
    if leaderboard_uri:
        print(f"\n[weave] leaderboard object: {leaderboard_uri}")
    if not live:
        print("\n[weave] (untraced run — set WANDB_API_KEY to publish to the UI)")
    return results


def _get(summary: dict, scorer: str, metric: str, default=None):
    try:
        return summary[scorer][metric]
    except Exception:
        return default


def _print_cell(cell: str, summary: dict) -> None:
    resolved = _get(summary, "conjunctions_resolved", "resolved", {})
    dv = _get(summary, "total_dv", "m_s", {})
    print(f"  {cell}: resolved={resolved}  total_dv_m_s={dv}")


def _print_table(results: dict[str, Any]) -> None:
    header = f"{'cell':<22}{'resolved':>10}{'dv (m/s)':>12}{'new_conj':>10}{'rounds':>8}{'budget_ok':>11}"
    print(header)
    print("-" * len(header))
    for cell, summary in results.items():
        resolved = _get(summary, "conjunctions_resolved", "resolved", {})
        resolved = resolved.get("true_fraction") if isinstance(resolved, dict) else resolved
        dv = _get(summary, "total_dv", "m_s", {})
        dv = dv.get("mean") if isinstance(dv, dict) else dv
        nc = _get(summary, "new_conjunctions_created", "count", {})
        nc = nc.get("mean") if isinstance(nc, dict) else nc
        rounds = _get(summary, "rounds_to_converge", "rounds", {})
        rounds = rounds.get("mean") if isinstance(rounds, dict) else rounds
        budget = _get(summary, "budget_respected", "respected", {})
        budget = budget.get("true_fraction") if isinstance(budget, dict) else budget

        def f(x, nd=2):
            return f"{x:.{nd}f}" if isinstance(x, (int, float)) else str(x)

        print(f"{cell:<22}{f(resolved):>10}{f(dv,1):>12}{f(nc):>10}{f(rounds):>8}{f(budget):>11}")
