"""Right of Way — WS2 standalone demo / acceptance harness.

Run from the repo root:  python -m row.agents.demo

This needs NEITHER WS1's physics NOR WS3's run loop. It uses ``StubPhysics`` to
mimic the verify-and-repair loop WS3 will own, so the agent layer can be seen
working today:

  1. Screen -> the forced-trade conjunction sat_A / sat_B.
  2. Negotiate it under BOTH topologies. sat_A is out of fuel, so the naive
     "lowest priority yields" is impossible -> high-priority sat_B must trade and
     burn. The transcript shows this being reasoned out, not hardcoded.
  3. Re-screen -> sat_B's burn surfaced a secondary with sat_C -> re-negotiate
     (the verify-repair beat).
  4. Re-screen -> clear.

Acceptance (asserted at the bottom): for BOTH topologies the FIRST conjunction is
resolved by a committed maneuver from sat_B (not sat_A), each with a readable
rationale.
"""

from __future__ import annotations

import pathlib
import sys

# Make `row` importable no matter how this is launched (mirrors tools/make_fixture.py).
_REPO_ROOT = pathlib.Path(__file__).resolve().parent.parent.parent
if str(_REPO_ROOT) not in sys.path:
    sys.path.insert(0, str(_REPO_ROOT))

from row import Conjunction, Scenario, generate_scenario  # noqa: E402
from row.agents import StubPhysics, make_negotiator  # noqa: E402
from row.agents.geometry import norm  # noqa: E402
from row.orchestrator.interfaces import NegotiationContext  # noqa: E402

# The two conjunctions of the demo arc (values mirror web/sample_timeline.json;
# WS1's real screener will compute these for real).
PRIMARY = Conjunction(
    a_id="sat_A", b_id="sat_B", tca=900.0, miss_distance_km=1.8, rel_speed=10.7
)
SECONDARY = Conjunction(
    a_id="sat_B", b_id="sat_C", tca=1500.0, miss_distance_km=3.4, rel_speed=0.9
)
MAX_OUTER_ROUNDS = 5
MAX_NEG_ROUNDS = 6


def _fmt_msg(msg) -> str:
    p = msg.payload or {}
    rationale = p.get("rationale", "")
    head = f"    {msg.from_id:>11} --{msg.type:^9}--> {msg.to_id:<11}"
    if msg.type == "propose" and "proposal" in p:
        prop = p["proposal"]
        dv = prop["dv_vector"]
        head += f" | burn ({dv[0]:+.4f},{dv[1]:+.4f},{dv[2]:+.4f}) km/s, |Δv|={prop['est_dv_cost']:.4f}"
    return f"{head}\n        ↳ {rationale}"


def resolve(scenario: Scenario, topology: str) -> dict:
    """Mimic WS3's outer verify-repair loop for one topology. Returns a summary."""
    physics = StubPhysics(scenario, PRIMARY, SECONDARY, secondary_trigger="sat_B")
    negotiator = make_negotiator(topology)
    objs = {o.id: o for o in scenario.objects}

    print(f"\n{'='*74}\nTOPOLOGY: {topology.upper()}\n{'='*74}")

    scen = scenario
    by_id = {o.id: o.model_copy(deep=True) for o in scen.objects}
    total_dv = 0.0
    movers_per_conjunction: list[list[str]] = []
    conjs = physics.screen_conjunctions(scen, scen.screen_window_s)
    outer = 0

    while conjs and outer < MAX_OUTER_ROUNDS:
        c = conjs[0]
        involved = [by_id[c.a_id], by_id[c.b_id]]
        a, b = involved
        print(
            f"\n  ⚠ conjunction #{outer + 1}: {c.a_id} ↔ {c.b_id} | "
            f"miss {c.miss_distance_km:.2f} km @ TCA {c.tca:.0f}s "
            f"(closing {c.rel_speed:.1f} km/s)"
        )
        print(
            f"    {a.id}: priority {a.priority}, fuel {a.fuel_budget_dv:.4f} km/s"
            f"  |  {b.id}: priority {b.priority}, fuel {b.fuel_budget_dv:.4f} km/s"
        )
        ctx = NegotiationContext(
            scenario=scen,
            conjunction=c,
            involved=involved,
            physics=physics,
            threshold_km=scen.conjunction_threshold_km,
            max_rounds=MAX_NEG_ROUNDS,
            topology=topology,
        )
        result = negotiator.negotiate(ctx)

        print(f"    — A2A transcript ({result.rounds_used} round(s)) —")
        for msg in result.messages:
            print(_fmt_msg(msg))

        movers = [p.proposer_id for p in result.committed]
        movers_per_conjunction.append(movers)
        for prop in result.committed:
            scen = physics.apply_maneuver(
                scen, prop.proposer_id, prop.dv_vector, prop.t_burn
            )
            by_id = {o.id: o.model_copy(deep=True) for o in scen.objects}
            total_dv += prop.est_dv_cost
        print(
            f"    ✓ committed: {movers or '∅'} "
            f"({'converged' if result.converged else 'NOT converged'})  | {result.note}"
        )

        conjs = physics.screen_conjunctions(scen, scen.screen_window_s)
        outer += 1

    clear = not conjs
    print(
        f"\n  RESULT [{topology}]: "
        f"{'ALL CLEAR' if clear else 'UNRESOLVED'} after {outer} negotiation(s), "
        f"total Δv = {total_dv:.4f} km/s"
    )
    return {
        "topology": topology,
        "clear": clear,
        "total_dv": total_dv,
        "movers_per_conjunction": movers_per_conjunction,
    }


def main() -> int:
    scenario = generate_scenario()
    summaries = {t: resolve(scenario, t) for t in ("swarm", "hierarchical")}

    print(f"\n{'='*74}\nACCEPTANCE CHECKS\n{'='*74}")
    ok = True
    for topology, s in summaries.items():
        first = s["movers_per_conjunction"][0] if s["movers_per_conjunction"] else []
        b_moves = first == ["sat_B"]
        cleared = s["clear"]
        ok = ok and b_moves and cleared
        print(
            f"  [{topology:^12}] first conjunction resolved by sat_B (not sat_A): "
            f"{'PASS' if b_moves else 'FAIL'} (movers={first})   "
            f"all-clear: {'PASS' if cleared else 'FAIL'}"
        )
    print(f"\n  {'ALL ACCEPTANCE CHECKS PASSED ✅' if ok else 'ACCEPTANCE FAILED ❌'}")
    return 0 if ok else 1


if __name__ == "__main__":
    raise SystemExit(main())
