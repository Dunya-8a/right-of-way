"""WS3 acceptance tests — the verify-and-repair loop on the forced-trade scenario.

Run with `pytest` (once installed) or directly:
    .venv/bin/python tests/test_orchestrator.py
The root conftest.py puts the repo on sys.path so `import row` works.
"""

from __future__ import annotations

from row import Timeline, generate_scenario
from row.orchestrator import run
from row.orchestrator._doubles import KeplerPhysics
from row.orchestrator._kepler import kepler, norm, sub


def test_kepler_roundtrip():
    s = generate_scenario()
    for o in s.objects:
        r1, v1 = kepler(tuple(o.state.r), tuple(o.state.v), 911.0)
        r0, _ = kepler(r1, v1, -911.0)
        assert norm(sub(r0, tuple(o.state.r))) < 1e-6


def test_screen_finds_only_AB():
    s = generate_scenario()
    conjs = KeplerPhysics().screen_conjunctions(s, s.screen_window_s)
    assert len(conjs) == 1
    assert {conjs[0].a_id, conjs[0].b_id} == {"sat_A", "sat_B"}
    assert abs(conjs[0].tca - 600.0) < 15.0
    assert abs(conjs[0].miss_distance_km - 3.0) < 0.1


def _event_types(res):
    return [e.type for e in res.events]


def test_hierarchical_resolves_full_arc():
    res = run(topology="hierarchical", output_path=None)
    assert res.converged is True
    types = _event_types(res)
    # The whole demo beat: detect A/B -> commit -> NEW B/C secondary -> resolve.
    assert types.count("conjunction_detected") == 1
    assert types.count("new_conjunction") == 1
    assert types.count("maneuver_committed") == 2
    assert types[-1] == "resolved"
    assert res.total_dv_km_s > 0.0


def test_forced_trade_sat_B_moves_not_A():
    """sat_A is out of fuel, so the high-priority sat_B must trade first."""
    res = run(topology="hierarchical", output_path=None)
    commits = [e for e in res.events if e.type == "maneuver_committed"]
    movers = [e.data["obj_id"] for e in commits]
    assert movers[0] == "sat_B"  # B forced to move despite outranking A
    assert "sat_A" not in movers  # A can never be the mover (no fuel)


def test_new_conjunction_is_BC():
    res = run(topology="hierarchical", output_path=None)
    nc = [e for e in res.events if e.type == "new_conjunction"]
    assert len(nc) == 1
    assert {nc[0].data["a_id"], nc[0].data["b_id"]} == {"sat_B", "sat_C"}


def test_swarm_converges():
    res = run(topology="swarm", output_path=None)
    assert res.converged is True
    assert _event_types(res)[-1] == "resolved"


def test_apply_maneuver_decrements_fuel():
    """A burn must spend fuel so a later iteration can't overdraft the budget."""
    s = generate_scenario()
    ph = KeplerPhysics()
    b0 = next(o for o in s.objects if o.id == "sat_B").fuel_budget_dv
    s2 = ph.apply_maneuver(s, "sat_B", [0.0, 0.0, 0.010], 240.0)
    b1 = next(o for o in s2.objects if o.id == "sat_B").fuel_budget_dv
    assert abs((b0 - b1) - 0.010) < 1e-9  # spent exactly |dv|
    # other objects untouched
    a0 = next(o for o in s.objects if o.id == "sat_A").fuel_budget_dv
    a1 = next(o for o in s2.objects if o.id == "sat_A").fuel_budget_dv
    assert a0 == a1


def test_sat_A_cannot_maneuver():
    """The referee refuses a burn larger than the mover's fuel (forced trade):
    sat_A (~0 fuel) physically cannot maneuver."""
    s = generate_scenario()
    ph = KeplerPhysics()
    raised = False
    try:
        ph.apply_maneuver(s, "sat_A", [0.0, 0.0, 0.010], 240.0)
    except ValueError:
        raised = True
    assert raised, "referee must reject sat_A's over-budget burn"


def test_frames_cover_whole_arc():
    """The last frame must reach the horizon so the viz plays past 'resolved'."""
    res = run(topology="hierarchical", output_path=None)
    last_event_t = max(e.t for e in res.events)
    assert res.timeline.frames[-1].t >= last_event_t


def test_emitted_timeline_is_dropin_for_viz():
    res = run(topology="hierarchical", output_path=None)
    # Round-trips through the same model the fixture/viz use.
    tl = Timeline.model_validate(res.timeline.model_dump())
    assert len(tl.frames) > 1
    # frames carry velocity (the WS5-requested ghost-orbit field)
    assert all(o.v is not None for o in tl.frames[0].objects)
    # proposal events carry recipient_id
    props = [e for e in tl.events if e.type == "proposal" and "proposer_id" in e.data]
    assert props and all("recipient_id" in e.data for e in props)
    assert tl.meta["frame"] == "ECI"


if __name__ == "__main__":
    fns = [v for k, v in sorted(globals().items()) if k.startswith("test_") and callable(v)]
    for fn in fns:
        fn()
        print(f"PASS  {fn.__name__}")
    print(f"\n{len(fns)} tests passed.")
