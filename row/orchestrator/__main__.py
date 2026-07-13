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
        choices=["forced-trade", "aeolus", "liar", "live"],
        default="forced-trade",
        help="forced-trade: the synthetic proof scenario; "
        "aeolus: the Sept 2019 Aeolus/Starlink-44 re-enactment; "
        "liar: one satellite lies about its capability and the referee "
        "audits the claim against ground truth (best with --topology swarm); "
        "live: a REAL predicted conjunction from CelesTrak SOCRATES, "
        "fetched now (needs network)",
    )
    p.add_argument(
        "--pick",
        type=int,
        default=None,
        help="live only: force the Nth SOCRATES conjunction instead of "
        "auto-selecting the first one the referee re-confirms",
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
    elif args.scenario == "live":
        from row.orchestrator._doubles import KeplerPhysics
        from row.scenario_live import fetch_top_conjunctions, generate_live_scenario

        # SOCRATES's predictions use its own element sets; with today's TLEs
        # some pairs no longer conjoin under our two-body core. Auto-select the
        # first one the referee independently re-confirms (or honor --pick).
        n = len(fetch_top_conjunctions())
        picks = [args.pick] if args.pick is not None else list(range(n))
        ph = KeplerPhysics()
        for pick in picks:
            cand = generate_live_scenario(pick=pick)
            if ph.screen_conjunctions(cand, cand.screen_window_s):
                scenario = cand
                print(f"live pick {pick}: {cand.name}")
                break
            print(f"live pick {pick}: not re-confirmed by our screener — skipping")
        if scenario is None:
            raise SystemExit(
                "no SOCRATES conjunction re-confirmed under two-body propagation "
                "today; try again after the next SOCRATES update (3x daily)"
            )

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
