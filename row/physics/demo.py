"""WS1 acceptance demo — run with ``python -m row.physics.demo``.

Prints the injected sat_A/sat_B conjunction detected by the physics core, then
shows the miss distance changing after a maneuver on sat_B (and the secondary
sat_B/sat_C conjunction the dodge creates). Pure physics, no LLM, deterministic.
"""

from __future__ import annotations

import numpy as np

from row import generate_scenario
from row.physics import PhysicsCore, propagate_state


def _fmt(conjunctions, pair):
    a, b = pair
    for c in conjunctions:
        if {c.a_id, c.b_id} == {a, b}:
            return (
                f"miss={c.miss_distance_km:7.3f} km  "
                f"tca={c.tca:7.1f} s  rel_speed={c.rel_speed:6.3f} km/s"
            )
    return "(clear — no conjunction under threshold)"


def main() -> None:
    pc = PhysicsCore()
    sc = generate_scenario()
    win = 900

    print("Right of Way — PhysicsCore (WS1) acceptance demo")
    print(f"  threshold = {sc.conjunction_threshold_km} km   window = {win} s\n")

    before = pc.screen_conjunctions(sc, window=win)
    print("Before maneuver:")
    print("  sat_A/sat_B :", _fmt(before, ("sat_A", "sat_B")))
    print("  sat_B/sat_C :", _fmt(before, ("sat_B", "sat_C")))

    # sat_B dodges radially outward (its cheapest escape from A) — 10 m/s at epoch.
    b_at_tca = propagate_state(next(o for o in sc.objects if o.id == "sat_B").state, 600.0)
    r_hat = np.asarray(b_at_tca.r)
    r_hat = r_hat / np.linalg.norm(r_hat)
    dv = tuple((0.010 * r_hat).tolist())
    out = pc.apply_maneuver(sc, "sat_B", dv, t_burn=0.0)

    after = pc.screen_conjunctions(out, window=win)
    print(f"\nAfter sat_B burn  dv={tuple(round(x, 5) for x in dv)} km/s "
          f"(|dv|={np.linalg.norm(dv):.3f} km/s, fuel "
          f"{next(o for o in sc.objects if o.id=='sat_B').fuel_budget_dv:.3f} -> "
          f"{next(o for o in out.objects if o.id=='sat_B').fuel_budget_dv:.3f}):")
    print("  sat_A/sat_B :", _fmt(after, ("sat_A", "sat_B")), " <- threat cleared")
    print("  sat_B/sat_C :", _fmt(after, ("sat_B", "sat_C")), " <- secondary, re-negotiate")


if __name__ == "__main__":
    main()
