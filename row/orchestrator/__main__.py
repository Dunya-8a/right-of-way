"""CLI for the WS3 run loop:  python -m row.orchestrator [--topology swarm] [--out PATH]

Runs the forced-trade scenario end-to-end with the reference doubles and writes
the Timeline JSON the viz plays back.
"""

from __future__ import annotations

import argparse

from . import run


def main() -> None:
    p = argparse.ArgumentParser(description="Right of Way orchestrator (WS3).")
    p.add_argument("--topology", choices=["hierarchical", "swarm"], default="hierarchical")
    p.add_argument(
        "--scenario",
        choices=["forced-trade", "aeolus", "liar"],
        default="forced-trade",
        help="forced-trade: the synthetic proof scenario; "
        "aeolus: the Sept 2019 Aeolus/Starlink-44 re-enactment; "
        "liar: one satellite lies about its capability and the referee "
        "audits the claim against ground truth (best with --topology swarm)",
    )
    p.add_argument("--out", default="web/public/timeline.json", help="Timeline JSON output path")
    p.add_argument("--dt", type=float, default=20.0, help="frame cadence (s)")
    args = p.parse_args()

    scenario = None
    negotiator = None
    if args.scenario == "aeolus":
        from row.scenario_real import generate_aeolus_scenario

        scenario = generate_aeolus_scenario()
    elif args.scenario == "liar":
        from row.agents.llm import DeceptiveBrain
        from row.agents.negotiator import make_negotiator
        from row.scenario import generate_liar_scenario

        scenario = generate_liar_scenario()
        # The deception lives in the brain wrapper; marked sats negotiate as if
        # they had no capability. The referee's audit is what catches it.
        negotiator = make_negotiator(args.topology, brain=DeceptiveBrain())

    res = run(
        scenario,
        topology=args.topology,
        negotiator=negotiator,
        dt_seconds=args.dt,
        output_path=args.out,
    )

    print(f"topology={res.topology}  converged={res.converged}  "
          f"iterations={res.iterations}  total_dv={res.total_dv_km_s*1000:.1f} m/s  "
          f"rounds={res.rounds_total}")
    print(f"events ({len(res.events)}):")
    for e in res.events:
        print(f"  t={e.t:7.1f}  {e.type}")
    if res.output_path:
        print(f"wrote Timeline -> {res.output_path} ({len(res.timeline.frames)} frames)")


if __name__ == "__main__":
    main()
