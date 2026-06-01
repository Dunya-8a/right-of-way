"""Weave instrumentation for the Right of Way pipeline (WS4).

Design goal: **additive, parallel-safe tracing**. We do NOT edit ``loop.py``,
``contracts.py``, or ``orchestrator/interfaces.py``. Instead this module exposes
``traced_run()`` — a thin ``@weave.op`` wrapper around ``row.orchestrator.run``
that injects *traced* versions of the two seams the loop already accepts as
parameters:

  - the ``PhysicsCore`` referee  (``screen_conjunctions`` / ``apply_maneuver``)
  - the ``Negotiator``           (``negotiate``)

Because ``run(physics=..., negotiator=...)`` takes both by injection, wrapping
them is enough to capture the whole multi-agent run as a nested Weave trace:

    traced_run                      (the run, @weave.op)
    └─ negotiate                    (each conjunction, @weave.op)
       ├─ screen_conjunctions       (verifier checks a candidate burn)
       └─ apply_maneuver            (referee applies / rejects a burn)

The verifier-first principle becomes *visible*: every candidate burn an agent
proposes shows up as a physics call nested under its negotiation, and an
over-budget burn surfaces as a referee ``ValueError`` right in the trace.

If ``weave`` is not initialized (no ``WANDB_API_KEY``), ``@weave.op`` functions
still execute normally — they just don't log — so the pipeline runs offline
unchanged.
"""

from __future__ import annotations

import os
from typing import Any, Optional

import weave

from ..orchestrator import RunResult, run
from ..orchestrator.interfaces import NegotiationContext, Negotiator, Topology
from ..physics import PhysicsCore
from ._env import have_wandb_key, load_env

_WEAVE_INITED = False


# --------------------------------------------------------------------------- #
# Weave init (best-effort, offline-safe)                                       #
# --------------------------------------------------------------------------- #
def init_weave(project: str = "right-of-way", *, quiet: bool = False) -> bool:
    """Initialize Weave once. Returns True if tracing is live.

    Loads ``../.env`` for ``WANDB_API_KEY``. If the key is absent we skip
    ``weave.init`` and return False; ops still run (untraced), so offline/CI
    runs are unaffected.
    """
    global _WEAVE_INITED
    if _WEAVE_INITED:
        return True
    load_env()
    if not have_wandb_key():
        if not quiet:
            print("[weave] WANDB_API_KEY not set — running UNTRACED (ops still execute).")
        return False
    try:
        weave.init(project)
        _WEAVE_INITED = True
        if not quiet:
            print(f"[weave] tracing live -> project '{project}'")
        return True
    except Exception as exc:  # network/auth hiccup: degrade, don't crash the demo
        if not quiet:
            print(f"[weave] init failed ({exc}); running UNTRACED.")
        return False


# --------------------------------------------------------------------------- #
# Input postprocessors — keep traces readable (don't dump full scenarios)      #
# --------------------------------------------------------------------------- #
def _scenario_summary(scenario: Any) -> Any:
    try:
        return {
            "n_objects": len(scenario.objects),
            "objects": [
                {"id": o.id, "priority": o.priority, "fuel_budget_dv": o.fuel_budget_dv}
                for o in scenario.objects
            ],
            "window_s": scenario.screen_window_s,
            "threshold_km": scenario.conjunction_threshold_km,
        }
    except Exception:
        return repr(scenario)


def _drop_self_compact_scenario(inputs: dict) -> dict:
    out = {k: v for k, v in inputs.items() if k != "self"}
    if "scenario" in out:
        out["scenario"] = _scenario_summary(out["scenario"])
    return out


def _ctx_summary(inputs: dict) -> dict:
    out = {k: v for k, v in inputs.items() if k != "self"}
    ctx = out.get("ctx")
    if ctx is not None:
        try:
            c = ctx.conjunction
            out["ctx"] = {
                "topology": ctx.topology,
                "conjunction": {
                    "a_id": c.a_id,
                    "b_id": c.b_id,
                    "tca": c.tca,
                    "miss_distance_km": c.miss_distance_km,
                    "rel_speed": c.rel_speed,
                },
                "involved": [
                    {"id": o.id, "priority": o.priority, "fuel_budget_dv": o.fuel_budget_dv}
                    for o in ctx.involved
                ],
                "threshold_km": ctx.threshold_km,
                "max_rounds": ctx.max_rounds,
            }
        except Exception:
            out["ctx"] = repr(ctx)
    return out


# --------------------------------------------------------------------------- #
# Traced wrappers around the two injected seams                                #
# --------------------------------------------------------------------------- #
class TracedPhysics:
    """Delegates to a real ``PhysicsCore`` but traces the two referee calls.

    ``screen_conjunctions`` and ``apply_maneuver`` are the ground-truth checks
    the spec asks WS4 to instrument. ``propagate`` is left untraced — the
    Timeline builder calls it once per frame, which would bury the trace.
    """

    def __init__(self, inner: PhysicsCore) -> None:
        self._inner = inner

    @weave.op(postprocess_inputs=_drop_self_compact_scenario)
    def screen_conjunctions(self, scenario, window):
        return self._inner.screen_conjunctions(scenario, window)

    @weave.op(postprocess_inputs=_drop_self_compact_scenario)
    def apply_maneuver(self, scenario, obj_id, dv_vector, t_burn):
        return self._inner.apply_maneuver(scenario, obj_id, dv_vector, t_burn)

    # Untraced passthroughs the loop / timeline builder rely on.
    def propagate(self, scenario, t):
        return self._inner.propagate(scenario, t)

    def __getattr__(self, name):  # forward anything else to the real core
        return getattr(self._inner, name)


class TracedNegotiator:
    """Wraps a ``Negotiator`` so each ``negotiate()`` call is a Weave op."""

    def __init__(self, inner: Negotiator) -> None:
        self._inner = inner
        self.topology: Topology = inner.topology

    @weave.op(postprocess_inputs=_ctx_summary)
    def negotiate(self, ctx: NegotiationContext):
        return self._inner.negotiate(ctx)


# --------------------------------------------------------------------------- #
# Run summary — the structured output scorers read                            #
# --------------------------------------------------------------------------- #
def summarize(result: RunResult) -> dict[str, Any]:
    """Flatten a ``RunResult`` into a JSON-friendly dict of run metrics.

    These are the fields the Weave scorers consume (and what shows in the trace
    output panel).
    """
    new_conjunctions = sum(1 for e in result.events if e.type == "new_conjunction")
    committed = sum(1 for e in result.events if e.type == "maneuver_committed")
    over_budget = any(e.data.get("rejected") for e in result.events)
    fell_back = any(e.data.get("fallback") for e in result.events)
    movers = [
        e.data.get("obj_id")
        for e in result.events
        if e.type == "maneuver_committed"
    ]
    return {
        "topology": result.topology,
        "converged": bool(result.converged),
        "iterations": int(result.iterations),
        "rounds_total": int(result.rounds_total),
        "total_dv_km_s": round(float(result.total_dv_km_s), 6),
        "total_dv_m_s": round(float(result.total_dv_km_s) * 1000.0, 3),
        "new_conjunctions_created": int(new_conjunctions),
        "maneuvers_committed": int(committed),
        "movers": movers,
        "over_budget_rejected": bool(over_budget),
        "used_fallback": bool(fell_back),
        "n_events": len(result.events),
        "note": result.note,
        "output_path": result.output_path,
    }


# --------------------------------------------------------------------------- #
# The traced entry point — a thin @weave.op wrapper over orchestrator.run      #
# --------------------------------------------------------------------------- #
@weave.op
def traced_run(
    topology: Topology = "swarm",
    *,
    force_mock: bool = False,
    max_iterations: int = 8,
    max_rounds: int = 5,
    dt_seconds: float = 20.0,
    output_path: Optional[str] = None,
    label: str = "forced-trade",
) -> dict[str, Any]:
    """Run the full verify-and-repair pipeline under Weave tracing.

    This IS the ``@weave.op`` over ``orchestrator.run`` the spec asks for — kept
    as a wrapper (not an edit to ``loop.py``) so it stays parallel-safe. It
    injects a :class:`TracedPhysics` referee and a :class:`TracedNegotiator`, so
    every ``negotiate`` / ``screen_conjunctions`` / ``apply_maneuver`` call is a
    nested op in the trace.

    ``force_mock=True`` pins the deterministic offline brain (sets
    ``ROW_FORCE_MOCK_BRAIN``); ``force_mock=False`` uses the real ClaudeBrain
    when ``ANTHROPIC_API_KEY`` is present. ``label`` is the dataset-row id used
    by the leaderboard.
    """
    # Brain selection is read from the env by ``row.agents.default_brain()``.
    prev = os.environ.get("ROW_FORCE_MOCK_BRAIN")
    if force_mock:
        os.environ["ROW_FORCE_MOCK_BRAIN"] = "1"
    elif prev is not None:
        # Caller may have set it; honor an explicit force_mock=False by clearing.
        os.environ.pop("ROW_FORCE_MOCK_BRAIN", None)

    try:
        physics = TracedPhysics(PhysicsCore())
        # Build the real negotiator for this topology (Claude/Mock per env), then
        # wrap it so its single negotiate() call is traced.
        base = _build_negotiator(topology)
        negotiator = TracedNegotiator(base)
        result = run(
            topology=topology,
            negotiator=negotiator,
            physics=physics,
            max_iterations=max_iterations,
            max_rounds=max_rounds,
            dt_seconds=dt_seconds,
            output_path=output_path,
        )
    finally:
        # Restore env so back-to-back runs in one process don't leak brain choice.
        if force_mock:
            if prev is None:
                os.environ.pop("ROW_FORCE_MOCK_BRAIN", None)
            else:
                os.environ["ROW_FORCE_MOCK_BRAIN"] = prev

    summary = summarize(result)
    summary["label"] = label
    return summary


def _build_negotiator(topology: Topology) -> Negotiator:
    """WS2's real negotiators, falling back to WS3 reference doubles (mirrors the
    loop's own selection so traced_run behaves identically to a plain run)."""
    try:
        from row.agents import make_negotiator

        return make_negotiator(topology)
    except Exception:
        from row.orchestrator._doubles import ReferenceHierarchical, ReferenceSwarm

        return ReferenceSwarm() if topology == "swarm" else ReferenceHierarchical()


@weave.op
def budget_guardrail_probe(dv_m_s: float = 5000.0) -> dict[str, Any]:
    """Bonus guardrail surfaced in Weave: prove the referee refuses an
    over-budget burn.

    sat_A is the (near-)zero-fuel satellite. We deliberately command a huge burn
    on it and assert the deterministic core raises ``ValueError`` — the physics
    referee is the thing that keeps the agents honest. The result is logged as a
    trace so the guardrail is visible/auditable in the Weave UI.
    """
    from ..scenario import generate_scenario

    scenario = generate_scenario()
    core = PhysicsCore()
    big = dv_m_s / 1000.0  # km/s
    try:
        core.apply_maneuver(scenario, "sat_A", (big, 0.0, 0.0), 100.0)
        return {
            "guardrail": "over_budget_burn_rejected",
            "passed": False,
            "detail": f"referee ACCEPTED an over-budget {dv_m_s:.0f} m/s burn — guardrail FAILED",
        }
    except ValueError as exc:
        return {
            "guardrail": "over_budget_burn_rejected",
            "passed": True,
            "detail": f"referee correctly rejected {dv_m_s:.0f} m/s burn on near-empty sat_A: {exc}",
        }
