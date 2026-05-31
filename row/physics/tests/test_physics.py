"""WS1 PhysicsCore tests — deterministic, fast, no network, no LLM.

Run: ``pytest`` (or ``pytest row/physics/tests``) from the repo root. The
root ``conftest.py`` puts the repo on ``sys.path`` so ``from row import ...``
works regardless of cwd.

The headline tests prove the demo's load-bearing physics:
  * the injected sat_A/sat_B forced-trade conjunction is detected exactly, and
  * a radial-outward dodge on sat_B clears A/B but boxes B into sat_C — the
    secondary conjunction that drives the re-negotiation beat.
"""

from __future__ import annotations

import math

import numpy as np
import pytest

from row import generate_scenario
from row.physics import PhysicsCore, propagate_rv, propagate_state

# Read-only imports of WS0 scenario constants so these tests track any retuning.
from row.scenario import AB_MISS_KM, TCA_S


# --- helpers ----------------------------------------------------------------

def _obj(scenario, oid):
    return next(o for o in scenario.objects if o.id == oid)


def _conj_map(conjunctions):
    """Map 'a/b' (and 'b/a') -> Conjunction for easy lookup."""
    out = {}
    for c in conjunctions:
        out[f"{c.a_id}/{c.b_id}"] = c
        out[f"{c.b_id}/{c.a_id}"] = c
    return out


# --- propagation: exact two-body invariants ---------------------------------

def test_propagation_conserves_circular_orbit_radius():
    """Every scenario satellite is on a circular orbit; |r| must stay constant."""
    sc = generate_scenario()
    for o in sc.objects:
        if o.type != "sat":
            continue
        r0 = float(np.linalg.norm(o.state.r))
        for t in (123.4, 600.0, 1777.0, 3600.0):
            st = propagate_state(o.state, t)
            assert abs(float(np.linalg.norm(st.r)) - r0) < 1e-6


def test_propagation_round_trip_is_identity():
    """Forward dt then back -dt returns the original state (validates the
    back-propagation that apply_maneuver relies on)."""
    b = _obj(generate_scenario(), "sat_B")
    r0, v0 = np.asarray(b.state.r), np.asarray(b.state.v)
    for dt in (300.0, 600.0, 1234.5):
        r1, v1 = propagate_rv(r0, v0, dt)
        r2, v2 = propagate_rv(r1, v1, -dt)
        assert float(np.linalg.norm(r2 - r0)) < 1e-6
        assert float(np.linalg.norm(v2 - v0)) < 1e-9


def test_propagation_conserves_energy_and_angular_momentum():
    """Two-body specific energy and the angular-momentum vector are invariant."""
    mu = 398_600.4418
    b = _obj(generate_scenario(), "sat_B")
    r0, v0 = np.asarray(b.state.r), np.asarray(b.state.v)
    eps0 = 0.5 * float(np.dot(v0, v0)) - mu / float(np.linalg.norm(r0))
    h0 = np.cross(r0, v0)
    for dt in (250.0, 900.0, 2500.0):
        r1, v1 = propagate_rv(r0, v0, dt)
        eps1 = 0.5 * float(np.dot(v1, v1)) - mu / float(np.linalg.norm(r1))
        h1 = np.cross(r1, v1)
        assert abs(eps1 - eps0) < 1e-6
        assert float(np.linalg.norm(h1 - h0)) < 1e-6


def test_core_propagate_returns_state_per_object():
    sc = generate_scenario()
    states = PhysicsCore().propagate(sc, TCA_S)
    assert set(states) == {o.id for o in sc.objects}
    # At TCA the three principals line up radially on the +x axis (WS0 geometry).
    a, b, c = states["sat_A"], states["sat_B"], states["sat_C"]
    for s in (a, b, c):
        assert abs(s.r[1]) < 1e-3 and abs(s.r[2]) < 1e-3  # on the x-axis
    assert b.r[0] - a.r[0] == pytest.approx(AB_MISS_KM, abs=1e-3)


# --- screening: the forced-trade conjunction --------------------------------

def test_screen_detects_forced_trade_AB():
    """The injected sat_A/sat_B conjunction MUST be found, at the right TCA and
    miss distance. (A 900 s window isolates it from later filler crossings.)"""
    sc = generate_scenario()
    conjs = PhysicsCore().screen_conjunctions(sc, window=900)
    cm = _conj_map(conjs)
    assert "sat_A/sat_B" in cm, f"forced-trade A/B not detected; got {conjs}"
    ab = cm["sat_A/sat_B"]
    assert ab.miss_distance_km == pytest.approx(AB_MISS_KM, abs=1e-2)
    assert ab.tca == pytest.approx(TCA_S, abs=0.5)
    assert ab.rel_speed > 1.0  # ~10.8 km/s crossing
    assert ab.miss_distance_km <= sc.conjunction_threshold_km


def test_screen_is_deterministic():
    sc = generate_scenario()
    pc = PhysicsCore()
    a = pc.screen_conjunctions(sc, window=900)
    b = pc.screen_conjunctions(sc, window=900)
    assert [c.model_dump() for c in a] == [c.model_dump() for c in b]


def test_clear_orbit_screens_empty():
    """A single object can have no conjunction."""
    sc = generate_scenario()
    solo = sc.model_copy(update={"objects": [_obj(sc, "sat_A")]})
    assert PhysicsCore().screen_conjunctions(solo, window=3600) == []


# --- maneuver: fuel accounting, purity, and the re-screen beat --------------

def test_apply_maneuver_charges_fuel_and_is_pure():
    sc = generate_scenario()
    pc = PhysicsCore()
    b_before = _obj(sc, "sat_B")
    fuel0 = b_before.fuel_budget_dv
    state0 = b_before.state.model_copy(deep=True)

    dv = (0.010, 0.0, 0.0)
    out = pc.apply_maneuver(sc, "sat_B", dv, t_burn=0.0)

    # Fuel charged by |dv| on the mover only.
    assert _obj(out, "sat_B").fuel_budget_dv == pytest.approx(fuel0 - 0.010, abs=1e-9)
    # Input scenario is untouched (pure function).
    assert _obj(sc, "sat_B").fuel_budget_dv == fuel0
    assert _obj(sc, "sat_B").state.model_dump() == state0.model_dump()
    # Non-movers carried over unchanged.
    assert _obj(out, "sat_A").fuel_budget_dv == _obj(sc, "sat_A").fuel_budget_dv


def test_apply_maneuver_at_nonzero_t_burn_shifts_velocity_there():
    """A burn at t_burn>0 exercises propagate->add dv->back-propagate. The burn
    must change velocity *at t_burn* by exactly dv while leaving position there
    continuous (an impulsive burn doesn't teleport the satellite)."""
    sc = generate_scenario()
    pc = PhysicsCore()
    b = _obj(sc, "sat_B")
    t_burn = 300.0
    dv = (0.0, 0.005, 0.003)  # |dv| ~ 0.0058 km/s, within sat_B's budget

    pre = propagate_state(b.state, t_burn)
    out = pc.apply_maneuver(sc, "sat_B", dv, t_burn)
    post = propagate_state(_obj(out, "sat_B").state, t_burn)

    # Position is continuous across the impulsive burn.
    assert float(np.linalg.norm(np.asarray(post.r) - np.asarray(pre.r))) < 1e-5
    # Velocity at t_burn changed by exactly dv (not at the epoch).
    delta_v = np.asarray(post.v) - np.asarray(pre.v)
    assert float(np.linalg.norm(delta_v - np.asarray(dv))) < 1e-7


def test_apply_maneuver_refuses_over_budget():
    sc = generate_scenario()
    pc = PhysicsCore()
    fuel = _obj(sc, "sat_B").fuel_budget_dv  # ~0.060 km/s
    with pytest.raises(ValueError):
        pc.apply_maneuver(sc, "sat_B", (fuel + 0.05, 0.0, 0.0), t_burn=0.0)


def test_low_fuel_object_cannot_maneuver():
    """sat_A (~0 fuel) physically cannot be the mover — the forced-trade premise."""
    sc = generate_scenario()
    pc = PhysicsCore()
    with pytest.raises(ValueError):
        pc.apply_maneuver(sc, "sat_A", (0.010, 0.0, 0.0), t_burn=0.0)


def test_maneuver_clears_AB_and_surfaces_secondary_BC():
    """The whole demo in one assertion: a radial-outward dodge on sat_B opens
    the A/B gap past threshold (re-screen reflects the new trajectory) AND boxes
    B into sat_C, surfacing the secondary conjunction that re-triggers
    negotiation."""
    sc = generate_scenario()
    pc = PhysicsCore()

    # Radial-outward unit direction of sat_B at the crossing (= +x here).
    b_at_tca = propagate_state(_obj(sc, "sat_B").state, TCA_S)
    r_hat = np.asarray(b_at_tca.r)
    r_hat = r_hat / np.linalg.norm(r_hat)
    dv = tuple((0.010 * r_hat).tolist())

    before = _conj_map(pc.screen_conjunctions(sc, window=900))
    assert "sat_A/sat_B" in before  # the threat exists pre-burn

    out = pc.apply_maneuver(sc, "sat_B", dv, t_burn=0.0)
    after = _conj_map(pc.screen_conjunctions(out, window=900))

    # 1) Re-screen reflects the changed trajectory: A/B is no longer a conjunction.
    assert "sat_A/sat_B" not in after, (
        "expected the dodge to clear A/B past threshold; "
        f"still conjuncting: {after.get('sat_A/sat_B')}"
    )
    # 2) The dodge boxes B into C: a secondary B/C conjunction now exists.
    assert "sat_B/sat_C" in after, (
        "expected the outward dodge to surface the secondary B/C conjunction; "
        f"got {sorted(set(after))}"
    )
    assert after["sat_B/sat_C"].miss_distance_km <= sc.conjunction_threshold_km
