"""Right of Way — WS2 hierarchical fallback: a deterministic Coordinator.

This is the demo safety net. Instead of peer-to-peer negotiation, a single
``Coordinator`` looks at the conjunction and *assigns* who maneuvers by a fixed
rule, then computes that party's burn. It is intentionally simple and always
terminates in one round — when the swarm is flaky or time is short, WS3 flips
``topology="hierarchical"`` and still gets a correct, explainable result.

The assignment rule encodes the same right-of-way logic the swarm discovers by
negotiation, but as deterministic compute:

  among the satellites that *can* maneuver (fuel above the immobile threshold),
  the lowest-priority one gives way.

That single rule yields the forced-trade outcome for free: if the lowest-priority
satellite is out of fuel, it is not in the capable set, so the duty falls to the
next-lowest capable party — even if that party outranks the one that can't move.
The Coordinator labels this case explicitly in its rationale so the trade is
visible in the transcript.
"""

from __future__ import annotations

from typing import Callable, Optional

from row.contracts import (
    Conjunction,
    ManeuverProposal,
    NegotiationMsg,
    Scenario,
    SpaceObject,
)

from .agent import DEFAULT_LEAD_S
from .geometry import avoidance_direction, scale, size_burn
from .llm import IMMOBILE_DV
from .outcome import NegotiationOutcome

COORDINATOR_ID = "coordinator"


class Coordinator:
    """Deterministically decides which object maneuvers for a conjunction."""

    def assign(
        self, conjunction: Conjunction, objects: dict[str, SpaceObject]
    ) -> Optional[str]:
        """Return the id of the object that should maneuver, or None if none can."""
        pair = (conjunction.a_id, conjunction.b_id)
        sats = [p for p in pair if objects[p].type == "sat"]
        capable = [p for p in sats if objects[p].fuel_budget_dv > IMMOBILE_DV]
        if not capable:
            return None
        # Lowest-priority capable satellite gives way; tie-break by id for determinism.
        return min(capable, key=lambda p: (objects[p].priority, p))

    def reason(
        self, mover: str, conjunction: Conjunction, objects: dict[str, SpaceObject]
    ) -> str:
        """Explain the assignment — surfacing the forced trade when it occurs."""
        pair = (conjunction.a_id, conjunction.b_id)
        sats = [p for p in pair if objects[p].type == "sat"]
        lowest = min(sats, key=lambda p: (objects[p].priority, p))
        if lowest != mover:
            return (
                f"{lowest} is lower priority and would normally give way, but its "
                f"Δv budget is ~0 — it cannot maneuver. Assigning {mover} "
                f"(priority {objects[mover].priority}) to trade and maneuver instead."
            )
        return (
            f"{mover} is the lowest-priority satellite that can maneuver; "
            "assigning it to give way."
        )


def _emit(log: Optional[Callable[..., None]], event: str, **data) -> None:
    if log is not None:
        try:
            log({"event": event, **data})
        except Exception:
            pass


def run_hierarchical(
    conjunction: Conjunction,
    objects: dict[str, SpaceObject],
    scenario: Scenario,
    *,
    threshold_km: Optional[float] = None,
    lead_s: float = DEFAULT_LEAD_S,
    coordinator: Optional[Coordinator] = None,
    log: Optional[Callable[..., None]] = None,
) -> NegotiationOutcome:
    coord = coordinator or Coordinator()
    threshold = (
        threshold_km if threshold_km is not None else scenario.conjunction_threshold_km
    )

    _emit(
        log,
        "negotiation_start",
        topology="hierarchical",
        a_id=conjunction.a_id,
        b_id=conjunction.b_id,
        miss_distance_km=conjunction.miss_distance_km,
        tca=conjunction.tca,
    )

    mover = coord.assign(conjunction, objects)
    if mover is None:
        _emit(log, "negotiation_end", topology="hierarchical", resolved=False, rounds=1)
        return NegotiationOutcome(
            committed=[],
            transcript=[
                NegotiationMsg(
                    from_id=COORDINATOR_ID,
                    to_id=conjunction.a_id,
                    type="counter",
                    payload={
                        "directive": "unresolvable",
                        "rationale": "No involved satellite has fuel to maneuver.",
                    },
                )
            ],
            resolved=False,
            rounds=1,
            meta={"topology": "hierarchical", "movers": []},
        )

    other = conjunction.b_id if mover == conjunction.a_id else conjunction.a_id
    reason = coord.reason(mover, conjunction, objects)

    mo = objects[mover]
    r_self = mo.state.r if mo.state else (0.0, 0.0, 0.0)
    r_other = objects[other].state.r if objects[other].state else (0.0, 0.0, 0.0)
    direction = avoidance_direction(r_self, r_other)
    mag = size_burn(conjunction.miss_distance_km, threshold, mo.fuel_budget_dv)
    proposal = ManeuverProposal(
        proposer_id=mover,
        dv_vector=scale(direction, mag),
        t_burn=max(conjunction.tca - lead_s, 0.0),
        est_dv_cost=mag,
        rationale=reason,
    )

    # A readable transcript mirroring the swarm's shape: directive → propose → accept.
    transcript = [
        NegotiationMsg(
            from_id=COORDINATOR_ID,
            to_id=mover,
            type="counter",
            payload={"directive": "you_maneuver", "rationale": reason},
        ),
        NegotiationMsg(
            from_id=mover,
            to_id=COORDINATOR_ID,
            type="propose",
            payload={"proposal": proposal.model_dump(), "rationale": reason},
        ),
        NegotiationMsg(
            from_id=COORDINATOR_ID,
            to_id=mover,
            type="accept",
            payload={"rationale": "Assignment confirmed; maneuver committed."},
        ),
    ]

    for msg in transcript:
        _emit(
            log,
            "message",
            round=0,
            from_id=msg.from_id,
            to_id=msg.to_id,
            type=msg.type,
            rationale=(msg.payload or {}).get("rationale", ""),
        )

    _emit(
        log,
        "negotiation_end",
        topology="hierarchical",
        resolved=True,
        rounds=1,
        movers=[mover],
        total_dv=mag,
    )

    return NegotiationOutcome(
        committed=[proposal],
        transcript=transcript,
        resolved=True,
        rounds=1,
        meta={
            "topology": "hierarchical",
            "movers": [mover],
            "total_dv_km_s": mag,
        },
    )
