"""Right of Way — the 2019 Aeolus / Starlink-44 re-enactment.

On 2 September 2019 at ~11:02 UTC, ESA's Aeolus wind-lidar mission and
SpaceX's Starlink-44 (lowered to ~320 km for deorbit testing) were predicted
to pass within a collision probability of ~1/1000 — ten times ESA's action
threshold. There was no protocol: coordination happened over EMAIL, SpaceX
declined to maneuver (a paging-system bug hid ESA's follow-ups), and Aeolus
raised its orbit half a revolution before closest approach. As of 2026 there
is still no automated cross-operator negotiation standard.

``generate_aeolus_scenario()`` reconstructs the ENCOUNTER GEOMETRY — not the
exact ephemerides — and lets the agents re-run the decision:

  - AEOLUS        320 km, near-polar sun-synchronous plane. Can maneuver.
  - STARLINK-44   320 km, ~53° plane, crossing Aeolus with a sub-km miss.
                  Its operator is modeled as unresponsive/constrained (the
                  historical reality) via a ~zero maneuver budget, so the
                  negotiation reproduces the forced concession: the science
                  mission with right-of-way takes the burn anyway.

Honesty notes (keep these true in any public copy):
  * This is a geometric reconstruction under two-body dynamics, seeded from
    the documented facts (320 km altitude, crossing planes, sub-km predicted
    miss, TCA 2019-09-02 ~11:02 UTC) — not archival TLE propagation.
  * Starlink-44 COULD physically maneuver in 2019; SpaceX declined/was
    unreachable. We model "will not / cannot coordinate a burn" as a ~zero
    maneuver budget because the negotiation protocol treats them identically;
    the satellite's ``notes`` give its agent the real operational story.

Frame & units: Earth-centered inertial (ECI), km and km/s. See contracts.py.
"""

from __future__ import annotations

import math

from .contracts import Scenario, SpaceObject, Vec3
from .scenario import _crossing_orbit_state

_R_EARTH = 6378.0
_ALT_ENCOUNTER = 320.0                 # both principals, km (documented)
_R = _R_EARTH + _ALT_ENCOUNTER
_ALT_STARLINK_SHELL = 550.0            # operational Starlink shell for filler
_R_SHELL = _R_EARTH + _ALT_STARLINK_SHELL

EPOCH = "2019-09-02T10:52:00Z"         # TCA ~11:02 UTC -> 600 s after epoch
TCA_S = 600.0
MISS_KM = 0.9                          # sub-km predicted miss (reconstruction)
SCREEN_WINDOW_S = 3600
CONJUNCTION_THRESHOLD_KM = 5.0

# Crossing point on the +x axis; each orbit's velocity direction there sets its
# plane. Aeolus is near-polar sun-synchronous (~96.7 deg), Starlink ~53 deg.
_X: Vec3 = (1.0, 0.0, 0.0)


def _motion_axis(inclination_deg: float) -> Vec3:
    """Unit velocity direction at the +x crossing for a given inclination.

    The orbit plane contains +x and this vector; the angle from the equatorial
    +y direction sets the inclination of the plane. Exact enough for a
    reconstruction — the screener, not this file, is the arbiter of the miss.
    """
    i = math.radians(inclination_deg)
    return (0.0, math.cos(i), math.sin(i))


def generate_aeolus_scenario() -> Scenario:
    """The Sept 2019 Aeolus / Starlink-44 conjunction, re-run by agents."""

    aeolus = SpaceObject(
        id="AEOLUS",
        type="sat",
        state=_crossing_orbit_state(_R + MISS_KM, _X, _motion_axis(96.7), TCA_S),
        fuel_budget_dv=0.045,
        priority=7,
        notes=(
            "ESA's Aeolus (ADM-Aeolus), the ~480 M-euro wind-lidar Earth-science "
            "mission, flying at 320 km. Operated by ESOC, Darmstadt. Thrusters "
            "healthy; an avoidance burn costs science time but is feasible. In "
            "the real 2019 event your operators coordinated by email and got no "
            "answer until it was almost too late."
        ),
    )

    starlink44 = SpaceObject(
        id="STARLINK-44",
        type="sat",
        state=_crossing_orbit_state(_R, _X, _motion_axis(53.0), TCA_S),
        fuel_budget_dv=0.0005,
        priority=3,
        notes=(
            "SpaceX Starlink-44, a v0.9 test satellite deliberately lowered to "
            "320 km for active-deorbit testing. Your operator has declined to "
            "maneuver and is not answering coordination requests (their on-call "
            "paging system silently dropped the thread). State the operational "
            "reality: no burn can be scheduled on your side — do not invent a "
            "fuel emergency."
        ),
    )

    # Filler: two operational Starlink siblings on the 550 km shell, same plane,
    # offset far along-track (~±13 min ≈ ±5800 km) — they read as "the rest of
    # the constellation, elsewhere" instead of crowding the encounter, and the
    # separation is constant so they never conjoin with anything.
    shell_axis = _motion_axis(53.0)
    starlink_43 = SpaceObject(
        id="STARLINK-43",
        type="sat",
        state=_crossing_orbit_state(_R_SHELL, _X, shell_axis, TCA_S + 780.0),
        fuel_budget_dv=0.050,
        priority=3,
    )
    starlink_45 = SpaceObject(
        id="STARLINK-45",
        type="sat",
        state=_crossing_orbit_state(_R_SHELL, _X, shell_axis, TCA_S - 780.0),
        fuel_budget_dv=0.050,
        priority=3,
    )

    return Scenario(
        name="Aeolus / Starlink-44 — Sept 2019, re-run by agents",
        objects=[aeolus, starlink44, starlink_43, starlink_45],
        epoch=EPOCH,
        screen_window_s=SCREEN_WINDOW_S,
        conjunction_threshold_km=CONJUNCTION_THRESHOLD_KM,
    )
