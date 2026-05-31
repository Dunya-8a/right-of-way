"""Right of Way — WS2 Agent: one autonomous space object in a negotiation.

An ``Agent`` wraps a single ``SpaceObject`` plus a "brain" (LLM or deterministic
policy). It:

  - **observes only its local neighborhood** — objects within ``neighbor_range_km``
    — never the global scenario. The conjunction counterpart is always visible
    (you can always sense the thing you're about to hit); everything else is
    gated by range. This is the permissioned-context property that lets the
    mechanism scale.
  - **negotiates over A2A**: each round it reads its inbox, asks its brain for a
    stance, and emits ``NegotiationMsg``s (propose / counter / accept / yield).
  - **proposes a concrete burn** when it takes the maneuver duty — direction from
    ``geometry`` (away from the counterpart), magnitude sized within its fuel
    budget. The deterministic PhysicsCore is the final arbiter of feasibility.

The Agent does not decide the *outcome* of a negotiation — the swarm engine
routes its messages and detects consensus. The Agent only decides *its own next
move* from *its own* view. That separation is what makes the collective behavior
emergent rather than centrally planned.
"""

from __future__ import annotations

from typing import Optional

from row.contracts import ManeuverProposal, NegotiationMsg, SpaceObject

from .geometry import avoidance_direction, distance, scale, size_burn
from .llm import IMMOBILE_DV, AgentBrain, DecisionContext

# How far ahead of TCA to schedule the burn (s). Mirrors the demo fixture's lead.
DEFAULT_LEAD_S = 180.0
# Local sensing radius (km). sat_C sits ~40 km from sat_B, so 100 km lets B see
# it as a neighbor while still being a *local* view, not the whole constellation.
DEFAULT_NEIGHBOR_RANGE_KM = 100.0


class Agent:
    """One negotiating space object."""

    def __init__(
        self,
        obj: SpaceObject,
        brain: AgentBrain,
        *,
        threshold_km: float,
        neighbor_range_km: float = DEFAULT_NEIGHBOR_RANGE_KM,
        lead_s: float = DEFAULT_LEAD_S,
    ) -> None:
        self.obj = obj
        self.brain = brain
        self.threshold_km = threshold_km
        self.neighbor_range_km = neighbor_range_km
        self.lead_s = lead_s

        # Conjunction context (set in observe()).
        self.counterpart_id: Optional[str] = None
        self.counterpart_priority: Optional[int] = None
        self._counterpart_r = None
        self.miss_distance_km: float = 0.0
        self.tca: float = 0.0
        self.rel_speed: float = 0.0
        self.neighbors: list[tuple[str, int, float]] = []

        # Negotiation state.
        self.inbox: list[NegotiationMsg] = []
        self.proposal: Optional[ManeuverProposal] = None
        self.has_proposed = False
        self.declared_cannot = False
        self.asserted_row = False
        # Facts learned over A2A.
        self._heard_cannot = False
        self._heard_assert_row = False
        self._heard_proposed = False
        self._heard_accept = False

    # -- identity ----------------------------------------------------------
    @property
    def id(self) -> str:
        return self.obj.id

    @property
    def can_maneuver(self) -> bool:
        return self.obj.fuel_budget_dv > IMMOBILE_DV

    # -- observation (local only) -----------------------------------------
    def observe(self, objects: dict[str, SpaceObject], conjunction) -> None:
        """Build this agent's LOCAL view for the given conjunction.

        ``conjunction`` is the contracts ``Conjunction`` involving this object;
        the other id becomes the counterpart. Only objects within
        ``neighbor_range_km`` are retained as neighbors.
        """
        self.counterpart_id = (
            conjunction.b_id if conjunction.a_id == self.id else conjunction.a_id
        )
        self.miss_distance_km = conjunction.miss_distance_km
        self.tca = conjunction.tca
        self.rel_speed = conjunction.rel_speed

        cp = objects.get(self.counterpart_id)
        if cp is not None:
            self.counterpart_priority = cp.priority
            self._counterpart_r = cp.state.r if cp.state else None

        self.neighbors = []
        r_self = self.obj.state.r if self.obj.state else None
        if r_self is not None:
            for oid, other in objects.items():
                if oid in (self.id, self.counterpart_id) or other.state is None:
                    continue
                d = distance(r_self, other.state.r)
                if d <= self.neighbor_range_km:
                    self.neighbors.append((oid, other.priority, d))
            self.neighbors.sort(key=lambda t: t[2])

    # -- A2A inbox ---------------------------------------------------------
    def receive(self, msg: NegotiationMsg) -> None:
        self.inbox.append(msg)
        p = msg.payload or {}
        if msg.type == "counter":
            if p.get("cannot_maneuver"):
                self._heard_cannot = True
            if p.get("assert_row"):
                self._heard_assert_row = True
        elif msg.type == "propose":
            self._heard_proposed = True
        elif msg.type == "accept":
            self._heard_accept = True
        # "yield" is the counterpart conceding right-of-way; the concrete burn
        # arrives in the "propose" that follows, so no extra state needed here.

    # -- a round of negotiation -------------------------------------------
    def step(self, round_idx: int) -> list[NegotiationMsg]:
        """Ask the brain for a stance and translate it into A2A messages."""
        assert self.counterpart_id is not None, "observe() must run before step()"
        ctx = DecisionContext(
            self_id=self.id,
            self_priority=self.obj.priority,
            self_fuel=self.obj.fuel_budget_dv,
            can_maneuver=self.can_maneuver,
            counterpart_id=self.counterpart_id,
            counterpart_priority=self.counterpart_priority,
            miss_distance_km=self.miss_distance_km,
            tca=self.tca,
            rel_speed=self.rel_speed,
            neighbors=list(self.neighbors),
            counterpart_cannot_maneuver=self._heard_cannot,
            counterpart_asserted_row=self._heard_assert_row,
            counterpart_has_proposed=self._heard_proposed,
            counterpart_accepted=self._heard_accept,
            i_have_proposed=self.has_proposed,
            i_declared_cannot=self.declared_cannot,
            i_asserted_row=self.asserted_row,
            round=round_idx,
        )
        decision = self.brain.decide(ctx)
        to = self.counterpart_id

        if decision.action == "take_duty":
            proposal = self.make_proposal(decision.rationale)
            self.proposal = proposal
            self.has_proposed = True
            return [
                NegotiationMsg(
                    from_id=self.id,
                    to_id=to,
                    type="yield",
                    payload={"concede_row": True, "rationale": decision.rationale},
                ),
                NegotiationMsg(
                    from_id=self.id,
                    to_id=to,
                    type="propose",
                    payload={
                        "proposal": proposal.model_dump(),
                        # recipient_id = the conjunction partner this burn is aimed
                        # at (== to_id here, but named explicitly so WS3's Timeline
                        # proposal-event mapping needn't infer it; see decisions.md).
                        "recipient_id": to,
                        "rationale": decision.rationale,
                    },
                ),
            ]
        if decision.action == "cannot":
            self.declared_cannot = True
            return [
                NegotiationMsg(
                    from_id=self.id,
                    to_id=to,
                    type="counter",
                    payload={"cannot_maneuver": True, "rationale": decision.rationale},
                )
            ]
        if decision.action == "assert_row":
            self.asserted_row = True
            return [
                NegotiationMsg(
                    from_id=self.id,
                    to_id=to,
                    type="counter",
                    payload={"assert_row": True, "rationale": decision.rationale},
                )
            ]
        if decision.action == "accept":
            return [
                NegotiationMsg(
                    from_id=self.id,
                    to_id=to,
                    type="accept",
                    payload={"accepts_proposer": to, "rationale": decision.rationale},
                )
            ]
        # "wait": emit nothing this round.
        return []

    # -- proposal construction --------------------------------------------
    def make_proposal(self, rationale: str) -> ManeuverProposal:
        """Build a concrete burn: direction away from counterpart, sized to budget."""
        r_self = self.obj.state.r if self.obj.state else (0.0, 0.0, 0.0)
        r_other = self._counterpart_r or (0.0, 0.0, 0.0)
        direction = avoidance_direction(r_self, r_other)
        mag = size_burn(self.miss_distance_km, self.threshold_km, self.obj.fuel_budget_dv)
        dv_vector = scale(direction, mag)
        t_burn = max(self.tca - self.lead_s, 0.0)
        return ManeuverProposal(
            proposer_id=self.id,
            dv_vector=dv_vector,
            t_burn=t_burn,
            est_dv_cost=mag,
            rationale=rationale,
        )
