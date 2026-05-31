"""Right of Way — scenario generator (WS0).

``generate_scenario()`` builds a 6-object LEO constellation that *injects* the
"forced-trade" conjunction the whole demo is built around:

  - sat_A  LOW priority, fuel ~= 0  -> physically CANNOT maneuver.
  - sat_B  HIGH priority, has fuel, on a near-miss course with sat_A.
        The naive rule "lowest priority yields" orders sat_A to move, but it
        can't -> sat_B is forced to trade despite outranking A. This is the
        proof that the agents are load-bearing, not a priority if-statement.
  - sat_C  positioned just off sat_B's most obvious avoidance direction so that
        when B raises/pushes its orbit it trends toward C -> a likely SECONDARY
        conjunction that triggers the re-negotiation beat.

Plus filler (sat_D, sat_E, debris_1) so it reads like a real constellation.

Frame & units: Earth-centered inertial (ECI), km and km/s. See contracts.py.

NOTE: WS0 only places plausible states; WS1's real propagator/screener is the
arbiter of the actual conjunction geometry. sat_A and sat_B are placed within
the conjunction threshold *at epoch* so screening finds the A/B conjunction
regardless of propagation details. sat_C is placed just outside threshold so it
becomes a conjunction only after B maneuvers.
"""

from __future__ import annotations

import math

from .contracts import Scenario, SpaceObject, State, Vec3

# ~500 km altitude circular LEO.
_R_EARTH = 6378.0
_ALT = 500.0
_R = _R_EARTH + _ALT  # orbital radius, km
_MU = 398_600.4418
_V_CIRC = math.sqrt(_MU / _R)  # circular speed, km/s (~7.6)

EPOCH = "2026-05-31T16:00:00Z"
SCREEN_WINDOW_S = 3600
CONJUNCTION_THRESHOLD_KM = 5.0


def _circular_state(r: Vec3, v_dir: Vec3) -> State:
    """Build a circular-orbit state at position ``r`` moving along unit ``v_dir``."""
    speed = _V_CIRC
    mag = math.sqrt(sum(c * c for c in v_dir)) or 1.0
    v = (v_dir[0] / mag * speed, v_dir[1] / mag * speed, v_dir[2] / mag * speed)
    return State(r=r, v=v)


def generate_scenario() -> Scenario:
    """Return the canonical forced-trade demo scenario (deterministic)."""

    # sat_A — LOW priority, ~no fuel. Equatorial-plane circular orbit, moving +y.
    sat_a = SpaceObject(
        id="sat_A",
        type="sat",
        state=_circular_state((_R, 0.0, 0.0), (0.0, 1.0, 0.0)),
        fuel_budget_dv=0.0005,  # effectively immobile (~0.5 m/s)
        priority=1,
    )

    # sat_B — HIGH priority, has fuel. Polar-ish crossing orbit placed ~2 km from
    # A at epoch (inside the 5 km threshold) so the A/B conjunction is guaranteed.
    # Its velocity crosses A's plane, so they are genuinely closing, not parallel.
    sat_b = SpaceObject(
        id="sat_B",
        type="sat",
        state=_circular_state((_R + 2.0, 0.0, 0.0), (0.0, 0.0, 1.0)),
        fuel_budget_dv=0.060,  # ~60 m/s available
        priority=9,
    )

    # sat_C — sits just up-track of B in the +z direction (B's obvious dodge),
    # ~40 km away: outside threshold now, but a plausible secondary once B burns.
    sat_c = SpaceObject(
        id="sat_C",
        type="sat",
        state=_circular_state((_R + 2.0, 0.0, 40.0), (0.0, 0.0, 1.0)),
        fuel_budget_dv=0.045,
        priority=5,
    )

    # --- Filler to make it a constellation (not part of the forced trade). ---
    sat_d = SpaceObject(
        id="sat_D",
        type="sat",
        state=_circular_state((-_R, 0.0, 0.0), (0.0, -1.0, 0.0)),
        fuel_budget_dv=0.050,
        priority=4,
    )
    sat_e = SpaceObject(
        id="sat_E",
        type="sat",
        state=_circular_state((0.0, _R, 0.0), (-1.0, 0.0, 0.0)),
        fuel_budget_dv=0.050,
        priority=6,
    )
    debris_1 = SpaceObject(
        id="debris_1",
        type="debris",
        state=_circular_state((0.0, 0.0, _R), (1.0, 0.0, 0.0)),
        fuel_budget_dv=0.0,  # debris never maneuvers
        priority=0,
    )

    return Scenario(
        objects=[sat_a, sat_b, sat_c, sat_d, sat_e, debris_1],
        epoch=EPOCH,
        screen_window_s=SCREEN_WINDOW_S,
        conjunction_threshold_km=CONJUNCTION_THRESHOLD_KM,
    )
