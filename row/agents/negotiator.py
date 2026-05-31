"""Right of Way — WS2 Negotiators: the WS3 seam implementation.

This is the file WS3 imports. It adapts WS2's internal negotiation engines
(``run_swarm`` / ``run_hierarchical``) to the shared ``Negotiator`` Protocol in
``row.orchestrator.interfaces``:

    negotiate(ctx: NegotiationContext) -> NegotiationResult

Two concrete negotiators are provided, each tagged with its ``topology`` so WS3
can register them and drive its swarm→hierarchical fallback chain:

  - ``SwarmNegotiator``       (topology="swarm")
  - ``HierarchicalNegotiator``(topology="hierarchical")

``RowNegotiator`` is a convenience that dispatches on ``ctx.topology`` if WS3
prefers a single object.

Verifier-first: when ``ctx.physics`` is a working referee, every committed burn
is confirmed to actually clear ``ctx.conjunction`` — and grown within fuel if it
doesn't. If the physics core isn't implemented yet (WS1's stub raises
``NotImplementedError``), verification is skipped and the negotiated burn is
trusted, so the agent layer is testable before WS1 lands. NOTE: detecting *new*
conjunctions a burn creates (e.g. B→C) is WS3's re-screen job, not ours — we only
confirm the one conjunction in front of us is cleared.
"""

from __future__ import annotations

from typing import Optional

from row.contracts import Conjunction, ManeuverProposal, Scenario, SpaceObject
from row.orchestrator.interfaces import (
    NegotiationContext,
    NegotiationResult,
    Topology,
)
from row.physics import PhysicsCore

from .agent import DEFAULT_LEAD_S, DEFAULT_NEIGHBOR_RANGE_KM
from .geometry import norm, normalize, scale
from .hierarchical import run_hierarchical
from .llm import IMMOBILE_DV, AgentBrain, default_brain
from .outcome import NegotiationOutcome
from .swarm import run_swarm

# Magnitude multipliers tried when verifying a burn actually clears the pair.
_GROW_FACTORS = (1.0, 1.5, 2.0, 3.0)


def _objects(ctx: NegotiationContext) -> dict[str, SpaceObject]:
    """Full object map for local-neighborhood sensing (agents still filter by range)."""
    return {o.id: o for o in ctx.scenario.objects}


def _pair_active(
    conjs: list[Conjunction], a_id: str, b_id: str, threshold_km: float
) -> bool:
    """Is the specific (a,b) pair still in conjunction after a candidate burn?"""
    target = {a_id, b_id}
    return any(
        {c.a_id, c.b_id} == target and c.miss_distance_km < threshold_km for c in conjs
    )


def _verify_clears(
    physics: PhysicsCore,
    scenario: Scenario,
    conjunction: Conjunction,
    proposal: ManeuverProposal,
    threshold_km: float,
    fuel_budget_dv: float,
) -> tuple[ManeuverProposal, bool]:
    """Confirm (and if needed grow within fuel) a burn that clears the pair.

    Uses ONLY the PhysicsCore seam (apply_maneuver + screen_conjunctions). Returns
    the (possibly enlarged) proposal and whether physics says the pair is clear.
    Raises whatever the physics core raises (caller decides to skip on failure).
    """
    # NOTE: a non-empty tuple is always truthy, so `normalize(...) or fallback`
    # would never fire — check the magnitude explicitly.
    unit = normalize(proposal.dv_vector)
    direction = unit if norm(unit) > 0 else (0.0, 0.0, 1.0)
    base_mag = proposal.est_dv_cost or 0.0
    # No magnitude to scale (e.g. a 0-fuel mover should never have committed):
    # nothing useful to try — report not-cleared and let WS3 fall back.
    if base_mag <= 0:
        return proposal, False
    fuel_cap = max(fuel_budget_dv * 0.9, 0.0)
    last = proposal
    for factor in _GROW_FACTORS:
        mag = min(base_mag * factor, fuel_cap) if fuel_cap > 0 else 0.0
        if mag <= 0:
            break
        candidate = ManeuverProposal(
            proposer_id=proposal.proposer_id,
            dv_vector=scale(direction, mag),
            t_burn=proposal.t_burn,
            est_dv_cost=mag,
            rationale=proposal.rationale,
        )
        last = candidate
        new_scn = physics.apply_maneuver(
            scenario, proposal.proposer_id, candidate.dv_vector, candidate.t_burn
        )
        conjs = physics.screen_conjunctions(new_scn, scenario.screen_window_s)
        if not _pair_active(
            conjs, conjunction.a_id, conjunction.b_id, threshold_km
        ):
            return candidate, True
    return last, False


class _AdapterMixin:
    """Shared NegotiationOutcome -> NegotiationResult mapping + physics verification."""

    verify: bool = True

    def _finalize(
        self, ctx: NegotiationContext, outcome: NegotiationOutcome
    ) -> NegotiationResult:
        committed = outcome.committed
        converged = outcome.resolved
        status = ""  # physics-verification status; topology is added to the note once below

        if self.verify and committed:
            objs = _objects(ctx)
            try:
                verified: list[ManeuverProposal] = []
                all_clear = True
                for prop in committed:
                    fuel = objs[prop.proposer_id].fuel_budget_dv
                    grown, cleared = _verify_clears(
                        ctx.physics,
                        ctx.scenario,
                        ctx.conjunction,
                        prop,
                        ctx.threshold_km,
                        fuel,
                    )
                    verified.append(grown)
                    all_clear = all_clear and cleared
                committed = verified
                if all_clear:
                    status = "verified against physics"
                else:
                    converged = False
                    status = (
                        "physics: burn does not clear within fuel — flagged for "
                        "WS3 fallback"
                    )
            except Exception:
                # WS1 not landed (NotImplementedError) or core unavailable: trust
                # the negotiated burn so the agent layer is testable standalone.
                status = "physics verification unavailable"

        total_dv = sum(p.est_dv_cost for p in committed)
        movers = [p.proposer_id for p in committed]
        topology = outcome.meta.get("topology", "?")
        parts = [f"[{topology}] movers={movers} total_dv={total_dv:.4f} km/s"]
        if status:
            parts.append(status)
        full_note = "; ".join(parts)
        return NegotiationResult(
            committed=committed,
            messages=outcome.transcript,
            rounds_used=outcome.rounds,
            converged=converged,
            note=full_note,
        )


class SwarmNegotiator(_AdapterMixin):
    """Peer-to-peer A2A negotiation between the involved agents (no central planner)."""

    topology: Topology = "swarm"

    def __init__(
        self,
        brain: Optional[AgentBrain] = None,
        *,
        neighbor_range_km: float = DEFAULT_NEIGHBOR_RANGE_KM,
        lead_s: float = DEFAULT_LEAD_S,
        verify: bool = True,
    ) -> None:
        self.brain = brain or default_brain()
        self.neighbor_range_km = neighbor_range_km
        self.lead_s = lead_s
        self.verify = verify

    def negotiate(self, ctx: NegotiationContext) -> NegotiationResult:
        outcome = run_swarm(
            ctx.conjunction,
            _objects(ctx),
            ctx.scenario,
            self.brain,
            max_rounds=ctx.max_rounds,
            threshold_km=ctx.threshold_km,
            neighbor_range_km=self.neighbor_range_km,
            lead_s=self.lead_s,
        )
        return self._finalize(ctx, outcome)


class HierarchicalNegotiator(_AdapterMixin):
    """Deterministic central coordinator assigns who maneuvers (the fallback path)."""

    topology: Topology = "hierarchical"

    def __init__(self, *, lead_s: float = DEFAULT_LEAD_S, verify: bool = True) -> None:
        self.lead_s = lead_s
        self.verify = verify

    def negotiate(self, ctx: NegotiationContext) -> NegotiationResult:
        outcome = run_hierarchical(
            ctx.conjunction,
            _objects(ctx),
            ctx.scenario,
            threshold_km=ctx.threshold_km,
            lead_s=self.lead_s,
        )
        return self._finalize(ctx, outcome)


class RowNegotiator(_AdapterMixin):
    """Single negotiator that dispatches on ``ctx.topology`` (convenience for WS3)."""

    topology: Topology = "swarm"

    def __init__(
        self,
        brain: Optional[AgentBrain] = None,
        *,
        neighbor_range_km: float = DEFAULT_NEIGHBOR_RANGE_KM,
        lead_s: float = DEFAULT_LEAD_S,
        verify: bool = True,
    ) -> None:
        self._swarm = SwarmNegotiator(
            brain, neighbor_range_km=neighbor_range_km, lead_s=lead_s, verify=verify
        )
        self._hier = HierarchicalNegotiator(lead_s=lead_s, verify=verify)

    def negotiate(self, ctx: NegotiationContext) -> NegotiationResult:
        if ctx.topology == "hierarchical":
            return self._hier.negotiate(ctx)
        return self._swarm.negotiate(ctx)


def make_negotiator(topology: Topology = "swarm", **kwargs) -> _AdapterMixin:
    """Factory: return the negotiator for ``topology``."""
    if topology == "hierarchical":
        return HierarchicalNegotiator(
            lead_s=kwargs.get("lead_s", DEFAULT_LEAD_S),
            verify=kwargs.get("verify", True),
        )
    return SwarmNegotiator(**kwargs)
