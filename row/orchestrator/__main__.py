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
    p.add_argument("--out", default="web/public/timeline.json", help="Timeline JSON output path")
    p.add_argument("--dt", type=float, default=20.0, help="frame cadence (s)")
    args = p.parse_args()

    res = run(topology=args.topology, dt_seconds=args.dt, output_path=args.out)

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
