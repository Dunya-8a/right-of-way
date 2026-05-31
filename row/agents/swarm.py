"""Right of Way — WS2 swarm negotiation: peer-to-peer A2A, no central planner.

``run_swarm`` resolves ONE conjunction by letting the two involved satellites
exchange ``NegotiationMsg``s until they reach consensus or run out of rounds.
There is no coordinator here: the engine only *routes* messages between agents
and *detects* when a proposal has been accepted. Who maneuvers is decided by the
agents themselves, from their own local views — which is exactly what lets the
forced-trade resolve correctly without a hardcoded rule.

Message semantics on the wire (NegotiationMsg.type):
  propose  — carries a ManeuverProposal the sender will execute.
  counter  — a position statement: ``cannot_maneuver`` (fuel ~0) or ``assert_row``.
  yield    — the sender concedes right-of-way and accepts the duty to maneuver
             (always paired with a following ``propose``).
  accept   — the sender accepts the proposal currently on the table.

Consensus = a proposal that the counterpart has accepted. A debris object cannot
negotiate or maneuver, so a sat paired with debris is told upfront the debris
"cannot maneuver" and takes the duty itself.
"""

from __future__ import annotations

from typing import Callable, Optional

from row.contracts import Conjunction, ManeuverProposal, Scenario, SpaceObject

from .agent import DEFAULT_LEAD_S, DEFAULT_NEIGHBOR_RANGE_KM, Agent
from .llm import AgentBrain
from .outcome import NegotiationOutcome


def _emit(log: Optional[Callable[..., None]], event: str, **data) -> None:
    if log is not None:
        try:
            log({"event": event, **data})
        except Exception:
            pass  # a logger must never break the negotiation


def run_swarm(
    conjunction: Conjunction,
    objects: dict[str, SpaceObject],
    scenario: Scenario,
    brain: AgentBrain,
    *,
    max_rounds: int = 6,
    threshold_km: Optional[float] = None,
    neighbor_range_km: float = DEFAULT_NEIGHBOR_RANGE_KM,
    lead_s: float = DEFAULT_LEAD_S,
    log: Optional[Callable[..., None]] = None,
) -> NegotiationOutcome:
    threshold = (
        threshold_km if threshold_km is not None else scenario.conjunction_threshold_km
    )
    pair = (conjunction.a_id, conjunction.b_id)

    # Only satellites can negotiate; debris is a passive obstacle.
    negotiating = [pid for pid in pair if objects[pid].type == "sat"]
    agents: dict[str, Agent] = {}
    for pid in negotiating:
        ag = Agent(
            objects[pid],
            brain,
            threshold_km=threshold,
            neighbor_range_km=neighbor_range_km,
            lead_s=lead_s,
        )
        ag.observe(objects, conjunction)
        agents[pid] = ag

    # A sat paired with debris (or with a missing party) is told the counterpart
    # cannot maneuver, so it immediately takes the duty.
    for pid, ag in agents.items():
        if ag.counterpart_id not in agents:
            ag._heard_cannot = True

    _emit(
        log,
        "negotiation_start",
        topology="swarm",
        a_id=conjunction.a_id,
        b_id=conjunction.b_id,
        miss_distance_km=conjunction.miss_distance_km,
        tca=conjunction.tca,
        negotiating=list(negotiating),
    )

    transcript = []
    proposals_on_table: dict[str, ManeuverProposal] = {}
    accepted_proposers: set[str] = set()
    rounds_used = 0
    committed: list[ManeuverProposal] = []

    for r in range(max_rounds):
        rounds_used = r + 1

        # 1) Each agent acts on its current view (synchronous round).
        outgoing = []
        for pid in negotiating:
            outgoing.extend(agents[pid].step(r))

        # 2) Record, log, and route every message.
        for msg in outgoing:
            transcript.append(msg)
            _emit(
                log,
                "message",
                round=r,
                from_id=msg.from_id,
                to_id=msg.to_id,
                type=msg.type,
                rationale=(msg.payload or {}).get("rationale", ""),
            )
            if msg.type == "propose":
                proposals_on_table[msg.from_id] = ManeuverProposal(
                    **msg.payload["proposal"]
                )
            elif msg.type == "accept":
                accepted = (msg.payload or {}).get("accepts_proposer")
                if accepted:
                    accepted_proposers.add(accepted)
            recipient = agents.get(msg.to_id)
            if recipient is not None:
                recipient.receive(msg)

        # 3) Consensus check: an accepted proposal, or a lone mover's proposal.
        committed = [
            proposals_on_table[p] for p in accepted_proposers if p in proposals_on_table
        ]
        if not committed and len(negotiating) == 1:
            solo = negotiating[0]
            if solo in proposals_on_table:
                committed = [proposals_on_table[solo]]
        if committed:
            break

    resolved = bool(committed)

    # Fallback tie-break: proposals exist but none was accepted in time → take
    # the cheapest (minimize total Δv); break ties toward the lower-priority sat.
    if not resolved and proposals_on_table:
        def _key(item):
            pid, prop = item
            return (prop.est_dv_cost, objects[pid].priority)

        pid, prop = min(proposals_on_table.items(), key=_key)
        committed = [prop]
        resolved = True
        _emit(log, "tiebreak", chosen=pid, est_dv_cost=prop.est_dv_cost)

    _emit(
        log,
        "negotiation_end",
        topology="swarm",
        resolved=resolved,
        rounds=rounds_used,
        movers=[p.proposer_id for p in committed],
        total_dv=sum(p.est_dv_cost for p in committed),
    )

    return NegotiationOutcome(
        committed=committed,
        transcript=transcript,
        resolved=resolved,
        rounds=rounds_used,
        meta={
            "topology": "swarm",
            "movers": [p.proposer_id for p in committed],
            "total_dv_km_s": sum(p.est_dv_cost for p in committed),
        },
    )
