"""CLI for the WS4 Weave instrumentation.

  # one full traced run (real Claude agents if ANTHROPIC_API_KEY is set)
  uv run python -m row.eval --topology swarm

  # force the deterministic offline brain (no network/keys needed)
  uv run python -m row.eval --topology hierarchical --mock

  # the topology x brain evaluation + leaderboard
  uv run python -m row.eval --leaderboard

  # the over-budget referee guardrail, logged to Weave
  uv run python -m row.eval --guardrail

Needs WANDB_API_KEY to publish traces (loaded from ../.env automatically). With
no key it still runs, just untraced.
"""

from __future__ import annotations

import argparse

from .leaderboard import run_leaderboard
from .tracing import budget_guardrail_probe, init_weave, traced_run


def main() -> int:
    p = argparse.ArgumentParser(description="Right of Way — Weave instrumentation (WS4).")
    p.add_argument("--topology", choices=["swarm", "hierarchical"], default="swarm")
    p.add_argument("--mock", action="store_true", help="force the deterministic offline brain")
    p.add_argument("--leaderboard", action="store_true", help="run the topology x brain evaluation")
    p.add_argument("--guardrail", action="store_true", help="run the over-budget referee guardrail probe")
    p.add_argument("--project", default="right-of-way", help="Weave project name")
    p.add_argument("--out", default=None, help="optional Timeline JSON output path")
    args = p.parse_args()

    if args.leaderboard:
        run_leaderboard(project=args.project)
        return 0

    init_weave(args.project)

    if args.guardrail:
        res = budget_guardrail_probe()
        status = "PASS" if res["passed"] else "FAIL"
        print(f"[guardrail {status}] {res['detail']}")
        return 0 if res["passed"] else 1

    summary = traced_run(args.topology, force_mock=args.mock, output_path=args.out)
    print("\n" + "=" * 60)
    print(f"RUN  topology={summary['topology']}  brain={'mock' if args.mock else 'claude/auto'}")
    print("=" * 60)
    print(f"  converged            : {summary['converged']}")
    print(f"  iterations           : {summary['iterations']}")
    print(f"  rounds_total         : {summary['rounds_total']}")
    print(f"  total_dv             : {summary['total_dv_m_s']} m/s")
    print(f"  maneuvers_committed  : {summary['maneuvers_committed']}  movers={summary['movers']}")
    print(f"  new_conjunctions     : {summary['new_conjunctions_created']}")
    print(f"  over_budget_rejected : {summary['over_budget_rejected']}")
    print(f"  used_fallback        : {summary['used_fallback']}")
    print(f"  note                 : {summary['note']}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
