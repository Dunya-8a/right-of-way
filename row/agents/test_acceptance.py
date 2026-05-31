"""Right of Way — WS2 acceptance tests (run offline with the deterministic brain).

The headline check: on the forced-trade scenario, BOTH topologies resolve the
sat_A / sat_B conjunction with a committed maneuver by sat_B — never sat_A, which
is out of fuel. Plus a guard proving the trade is *conditional on fuel*, not a
hardcoded "sat_B always moves": give sat_A fuel and it (the lower-priority party)
yields normally.

Run:  python -m pytest row/agents/test_acceptance.py -q
"""

from __future__ import annotations

import os

import pytest

# Force the deterministic brain so the suite is reproducible and offline.
os.environ.setdefault("ROW_FORCE_MOCK_BRAIN", "1")

from row import Conjunction, generate_scenario  # noqa: E402
from row.agents import StubPhysics, make_negotiator  # noqa: E402
from row.orchestrator.interfaces import NegotiationContext  # noqa: E402

PRIMARY = Conjunction(
    a_id="sat_A", b_id="sat_B", tca=900.0, miss_distance_km=1.8, rel_speed=10.7
)


def _context(scenario, conjunction, topology):
    objs = {o.id: o for o in scenario.objects}
    physics = StubPhysics(scenario, conjunction)
    return NegotiationContext(
        scenario=scenario,
        conjunction=conjunction,
        involved=[objs[conjunction.a_id], objs[conjunction.b_id]],
        physics=physics,
        threshold_km=scenario.conjunction_threshold_km,
        max_rounds=6,
        topology=topology,
    )


@pytest.mark.parametrize("topology", ["swarm", "hierarchical"])
def test_forced_trade_sat_b_maneuvers(topology):
    scenario = generate_scenario()
    objs = {o.id: o for o in scenario.objects}
    result = make_negotiator(topology).negotiate(_context(scenario, PRIMARY, topology))

    assert result.converged, f"{topology} failed to converge: {result.note}"
    assert len(result.committed) == 1, "exactly one party should maneuver"
    burn = result.committed[0]
    # The whole point: B trades, A (no fuel) does not move.
    assert burn.proposer_id == "sat_B", f"expected sat_B to move, got {burn.proposer_id}"
    # Respect fuel budget.
    assert burn.est_dv_cost <= objs["sat_B"].fuel_budget_dv
    # Readable rationale present.
    assert burn.rationale.strip(), "committed maneuver must carry a rationale"
    # A is never the mover under any message in the transcript.
    proposers = {
        m.payload.get("proposal", {}).get("proposer_id")
        for m in result.messages
        if m.type == "propose"
    }
    assert "sat_A" not in proposers


@pytest.mark.parametrize("topology", ["swarm", "hierarchical"])
def test_lower_priority_yields_when_it_has_fuel(topology):
    """Not a hardcoded 'B moves': give sat_A fuel and the lower-priority party yields."""
    scenario = generate_scenario()
    for o in scenario.objects:
        if o.id == "sat_A":
            o.fuel_budget_dv = 0.05  # now A *can* maneuver
    result = make_negotiator(topology).negotiate(_context(scenario, PRIMARY, topology))

    assert result.converged
    assert len(result.committed) == 1
    # A is lower priority (1 < 9) and now capable -> A gives way, not B.
    assert result.committed[0].proposer_id == "sat_A"


def test_transcript_shows_high_priority_yielding():
    """The swarm transcript should contain a 'yield' from the high-priority sat_B."""
    scenario = generate_scenario()
    result = make_negotiator("swarm").negotiate(_context(scenario, PRIMARY, "swarm"))
    yields = [(m.from_id, m.type) for m in result.messages if m.type == "yield"]
    assert ("sat_B", "yield") in yields, (
        "expected high-priority sat_B to explicitly yield right-of-way (the trade)"
    )
    # And sat_A should have declared it cannot maneuver.
    cannot = [
        m.from_id
        for m in result.messages
        if m.type == "counter" and (m.payload or {}).get("cannot_maneuver")
    ]
    assert "sat_A" in cannot


def test_full_arc_resolves_and_catches_secondary():
    """End-to-end via the demo driver: both topologies clear, secondary beat fires."""
    from row.agents import demo

    scenario = generate_scenario()
    for topology in ("swarm", "hierarchical"):
        summary = demo.resolve(scenario, topology)
        assert summary["clear"], f"{topology} did not reach all-clear"
        # First conjunction resolved by B; a secondary negotiation also occurred.
        assert summary["movers_per_conjunction"][0] == ["sat_B"]
        assert len(summary["movers_per_conjunction"]) >= 2, "secondary beat missing"
