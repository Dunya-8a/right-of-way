"""Right of Way — scenario generator (WS0).

``generate_scenario()`` builds a 6-object LEO constellation that *injects* the
"forced-trade" conjunction the whole demo is built around:

  - sat_A  LOW priority, fuel ~= 0  -> physically CANNOT maneuver.
  - sat_B  HIGH priority, has fuel, on a near-miss course with sat_A.
        The naive rule "lowest priority yields" orders sat_A to move, but it
        can't -> sat_B is forced to trade despite outranking A. This is the
        proof that the agents are load-bearing, not a priority if-statement.
  - sat_C  positioned to BOX sat_B in: B's cheapest dodge of A (raise its orbit
        outward) walks it straight into C -> a SECONDARY conjunction that forces
        the re-negotiation beat. Going inward instead would head toward A. So a
        naive radial dodge can't win; B must do something cleverer or trade.

Plus filler (sat_D, sat_E, debris_1) so it reads like a real constellation.

Geometry (the important part — read this before tuning):
  All three principals are on circular orbits that cross the +x axis at the same
  time ``TCA_S`` seconds after the epoch. At that crossing they line up radially:

      sat_A at radius R         -> (R,        0, 0)
      sat_B at radius R + 3 km  -> (R + 3,    0, 0)   miss vs A = 3 km  (< 5 km => CONJUNCTION)
      sat_C at radius R + 9 km  -> (R + 9,    0, 0)   miss vs B = 6 km  (clear, for now)

  The separation vectors are purely radial (x) while the relative velocities are
  in-plane tangential (y for A, z for B/C) and therefore perpendicular -> the
  crossing time IS the time of closest approach, and the miss distances are just
  the radius differences. This makes the conjunction robust under real two-body
  propagation (WS1), not a coincidence of objects being near each other at epoch.

  The BOX: to clear A, sat_B must open the A/B gap from 3 km to >=5 km, i.e. move
  >=2 km outward. But B/C starts at only 6 km, so a >=2 km outward move drops B/C
  to <=4 km -> a new conjunction with C. Inward would aim at A. Pure-radial dodges
  are trapped; resolution needs an out-of-plane / timed burn or a negotiated trade.

  TCA_S is 600 s (10 min) out so agents have time to negotiate and burn *before*
  closest approach — not zero like a naive at-epoch placement.

NOTE (honesty): WS0 places the geometry; WS1's propagator/screener is the arbiter
of the exact numbers, and WS3's end-to-end run is where the secondary conjunction
gets confirmed and the constants below get fine-tuned. They are intentionally
module-level so WS3 can adjust them without touching the construction.

Frame & units: Earth-centered inertial (ECI), km and km/s. See contracts.py.
"""

from __future__ import annotations

import math

from .contracts import Scenario, SpaceObject, State, Vec3

# ~500 km altitude circular LEO.
_R_EARTH = 6378.0
_ALT = 500.0
_R = _R_EARTH + _ALT  # orbital radius, km (~6878)
_MU = 398_600.4418

EPOCH = "2026-05-31T16:00:00Z"
SCREEN_WINDOW_S = 3600
CONJUNCTION_THRESHOLD_KM = 5.0

# --- Forced-trade geometry (tunable by WS3 once the real propagator is live). ---
TCA_S = 600.0      # A/B closest approach 10 min after epoch -> agents have time.
AB_MISS_KM = 3.0   # sat_B sits this far outside sat_A at the crossing (< threshold).
BC_GAP_KM = 6.0    # sat_C sits this far outside sat_B (clear now; box shuts if B
                   # dodges A outward by >= AB clearance, i.e. >= ~2 km).

# Unit axes.
_X: Vec3 = (1.0, 0.0, 0.0)
_Y: Vec3 = (0.0, 1.0, 0.0)
_Z: Vec3 = (0.0, 0.0, 1.0)


def _neg(u: Vec3) -> Vec3:
    return (-u[0], -u[1], -u[2])


def _crossing_orbit_state(
    radius: float, point_axis: Vec3, motion_axis: Vec3, t_cross: float
) -> State:
    """Circular-orbit State for an object that is at ``radius * point_axis`` at
    time ``t_cross`` after the epoch, moving along ``motion_axis`` there.

    ``point_axis`` and ``motion_axis`` are orthonormal unit vectors spanning the
    orbital plane: ``point_axis`` points at the crossing position, ``motion_axis``
    is the velocity direction at the crossing. We back the object up along its
    circular orbit by the angle it sweeps in ``t_cross`` to get its epoch state.
    """
    omega = math.sqrt(_MU / radius**3)  # mean motion, rad/s
    speed = omega * radius              # circular speed, km/s
    theta0 = -omega * t_cross           # epoch angle so theta(t_cross) = 0
    c, s = math.cos(theta0), math.sin(theta0)
    r = tuple(radius * (c * point_axis[i] + s * motion_axis[i]) for i in range(3))
    v = tuple(speed * (-s * point_axis[i] + c * motion_axis[i]) for i in range(3))
    return State(r=r, v=v)  # type: ignore[arg-type]


def generate_scenario() -> Scenario:
    """Return the canonical forced-trade demo scenario (deterministic)."""

    # sat_A — LOW priority, ~no fuel. xy-plane orbit; reaches (R, 0, 0) at TCA_S.
    sat_a = SpaceObject(
        id="sat_A",
        type="sat",
        state=_crossing_orbit_state(_R, _X, _Y, TCA_S),
        fuel_budget_dv=0.0005,  # effectively immobile (~0.5 m/s)
        priority=1,
    )

    # sat_B — HIGH priority, has fuel. xz-plane orbit; reaches (R+3, 0, 0) at TCA_S,
    # i.e. 3 km radially outside A at the crossing -> the A/B conjunction.
    sat_b = SpaceObject(
        id="sat_B",
        type="sat",
        state=_crossing_orbit_state(_R + AB_MISS_KM, _X, _Z, TCA_S),
        fuel_budget_dv=0.060,  # ~60 m/s available
        priority=9,
    )

    # sat_C — same xz-plane as B; reaches (R+9, 0, 0) at TCA_S, 6 km outside B.
    # Clear for now, but it boxes B's outward escape (see module docstring).
    sat_c = SpaceObject(
        id="sat_C",
        type="sat",
        state=_crossing_orbit_state(_R + AB_MISS_KM + BC_GAP_KM, _X, _Z, TCA_S),
        fuel_budget_dv=0.045,
        priority=5,
    )

    # --- Filler: real constellation flavor, parked far from the crossing at TCA_S
    #     (they cross the axis at different points / planes), so they don't perturb
    #     the forced trade. WS1's screener is the final word on any interactions.
    sat_d = SpaceObject(
        id="sat_D",
        type="sat",
        state=_crossing_orbit_state(_R, _neg(_X), _Y, TCA_S),  # crosses at (-R,0,0)
        fuel_budget_dv=0.050,
        priority=4,
    )
    sat_e = SpaceObject(
        id="sat_E",
        type="sat",
        state=_crossing_orbit_state(_R, _Y, _neg(_X), TCA_S),  # crosses at (0,R,0)
        fuel_budget_dv=0.050,
        priority=6,
    )
    debris_1 = SpaceObject(
        id="debris_1",
        type="debris",
        state=_crossing_orbit_state(_R, _Z, _X, TCA_S),  # crosses at (0,0,R)
        fuel_budget_dv=0.0,  # debris never maneuvers
        priority=0,
    )

    return Scenario(
        objects=[sat_a, sat_b, sat_c, sat_d, sat_e, debris_1],
        epoch=EPOCH,
        screen_window_s=SCREEN_WINDOW_S,
        conjunction_threshold_km=CONJUNCTION_THRESHOLD_KM,
    )
