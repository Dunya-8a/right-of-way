"""Right of Way — WS2 vector helpers for choosing a burn (NOT orbital math).

WS2 does not propagate orbits or compute conjunctions — that is the PhysicsCore
referee's job (WS1). What WS2 *does* need is cheap, deterministic vector algebra
to pick a sensible avoidance *direction* and size a burn within budget. None of
this claims orbital accuracy; the real feasibility check is delegated to the
PhysicsCore handle on the negotiation request (``apply_maneuver`` +
``screen_conjunctions``). Treat everything here as a heuristic the agent uses to
*propose*, which the deterministic core then verifies.

Units (per contracts.py): positions km, velocities/dv km/s, time seconds.
"""

from __future__ import annotations

import math

from row.contracts import Vec3


def sub(a: Vec3, b: Vec3) -> Vec3:
    return (a[0] - b[0], a[1] - b[1], a[2] - b[2])


def add(a: Vec3, b: Vec3) -> Vec3:
    return (a[0] + b[0], a[1] + b[1], a[2] + b[2])


def scale(a: Vec3, k: float) -> Vec3:
    return (a[0] * k, a[1] * k, a[2] * k)


def dot(a: Vec3, b: Vec3) -> float:
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]


def norm(a: Vec3) -> float:
    return math.sqrt(dot(a, a))


def normalize(a: Vec3) -> Vec3:
    m = norm(a)
    if m == 0.0:
        return (0.0, 0.0, 0.0)
    return (a[0] / m, a[1] / m, a[2] / m)


def cross(a: Vec3, b: Vec3) -> Vec3:
    return (
        a[1] * b[2] - a[2] * b[1],
        a[2] * b[0] - a[0] * b[2],
        a[0] * b[1] - a[1] * b[0],
    )


def distance(a: Vec3, b: Vec3) -> float:
    return norm(sub(a, b))


def avoidance_direction(r_self: Vec3, r_other: Vec3) -> Vec3:
    """Unit vector pointing *away* from the counterpart at epoch.

    The simplest separation-increasing heuristic: push along the line from the
    other object to me. (A real planner would work in the RTN frame at TCA; the
    PhysicsCore re-screen is what actually validates the result, so a first-order
    direction is enough for the agent to put a credible proposal on the table.)
    """
    d = normalize(sub(r_self, r_other))
    if d == (0.0, 0.0, 0.0):
        # Degenerate (co-located at epoch): dodge cross-track via an arbitrary
        # but deterministic axis so the proposal is still well-defined.
        return (0.0, 0.0, 1.0)
    return d


def size_burn(
    miss_distance_km: float,
    threshold_km: float,
    fuel_budget_dv: float,
    *,
    k_dv: float = 0.00375,
    min_dv: float = 0.003,
    fuel_fraction_cap: float = 0.5,
) -> float:
    """Pick a burn magnitude (km/s) proportional to how badly the pair misses.

    ``deficit = threshold - miss`` is how much extra separation we want. We scale
    it by ``k_dv`` (tuned so a typical few-km deficit yields a ~0.01 km/s burn),
    floor it at ``min_dv`` so a burn is never a no-op, and cap it at a fraction of
    the remaining fuel so an agent never proposes a burn it can't afford. The
    deterministic core still has final say on feasibility.
    """
    deficit = max(threshold_km - miss_distance_km, threshold_km * 0.5)
    want = max(deficit * k_dv, min_dv)
    cap = max(fuel_budget_dv * fuel_fraction_cap, 0.0)
    return min(want, cap) if cap > 0 else 0.0
