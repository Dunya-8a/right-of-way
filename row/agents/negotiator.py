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
from .geometry import cross, norm, normalize, scale
from .hierarchical import run_hierarchical
from .llm import IMMOBILE_DV, AgentBrain, default_brain
from .outcome import NegotiationOutcome
from .swarm import run_swarm

# Magnitude multipliers tried first, scaling the agent's own proposed burn (so we
# honor its sizing when it works). Mirrors the spirit of greedy_clearance.
_GROW_FACTORS = (1.0, 1.5, 2.0, 3.0)
# Absolute magnitude ladder (km/s) searched if scaling the agent's burn fails —
# same ladder the deterministic coordinator uses, so the swarm can find the same
# feasible burn instead of punting to the WS3 fallback.
_MAG_LADDER = (0.005, 0.010, 0.020, 0.030, 0.045)


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


def _candidate_directions(
    physics: PhysicsCore,
    scenario: Scenario,
    mover_id: str,
    t_burn: float,
    agent_direction: tuple[float, float, float],
) -> list[tuple[float, float, float]]:
    """Directions to try when verifying a burn, agent's choice first.

    The agent proposes a first-order direction (push away from the counterpart at
    epoch). That heuristic often doesn't clear under real two-body propagation,
    because the conjunction geometry is at TCA, not epoch. So if it fails we let
    the deterministic referee search the mover's orbital frame at burn time —
    radial / along-track / cross-track and their negatives — exactly the
    feasible-direction search the hierarchical coordinator already does. The agent
    still owns *who moves and why*; physics owns *which vector actually works*.
    """
    dirs: list[tuple[float, float, float]] = []
    if norm(agent_direction) > 0:
        dirs.append(normalize(agent_direction))
    try:
        st = physics.propagate(scenario, t_burn)[mover_id]
        r, v = tuple(st.r), tuple(st.v)
        radial = normalize(r)
        along = normalize(v)
        crosst = normalize(cross(r, v))
        for d in (radial, scale(radial, -1.0), along, scale(along, -1.0),
                  crosst, scale(crosst, -1.0)):
            if norm(d) > 0:
                dirs.append(d)
    except Exception:
        pass  # no orbital frame available (e.g. stub physics): agent dir only
    # De-dupe near-identical directions (the agent dir may coincide with an axis).
    unique: list[tuple[float, float, float]] = []
    for d in dirs:
        if not any(
            abs(d[0] - u[0]) < 1e-6 and abs(d[1] - u[1]) < 1e-6 and abs(d[2] - u[2]) < 1e-6
            for u in unique
        ):
            unique.append(d)
    return unique or [(0.0, 0.0, 1.0)]


def _try_burn(
    physics: PhysicsCore,
    scenario: Scenario,
    conjunction: Conjunction,
    proposer_id: str,
    direction: tuple[float, float, float],
    mag: float,
    t_burn: float,
    threshold_km: float,
    rationale: str,
) -> Optional[ManeuverProposal]:
    """Apply one candidate burn via the referee; return it if it clears the pair."""
    candidate = ManeuverProposal(
        proposer_id=proposer_id,
        dv_vector=scale(direction, mag),
        t_burn=t_burn,
        est_dv_cost=mag,
        rationale=rationale,
    )
    try:
        new_scn = physics.apply_maneuver(scenario, proposer_id, candidate.dv_vector, t_burn)
    except ValueError:
        return None  # referee refused (over budget) — caller tries the next
    conjs = physics.screen_conjunctions(new_scn, scenario.screen_window_s)
    if not _pair_active(conjs, conjunction.a_id, conjunction.b_id, threshold_km):
        return candidate
    return None


def _verify_clears(
    physics: PhysicsCore,
    scenario: Scenario,
    conjunction: Conjunction,
    proposal: ManeuverProposal,
    threshold_km: float,
    fuel_budget_dv: float,
    t_floor: float = 0.0,
) -> tuple[ManeuverProposal, bool]:
    """Confirm (and if needed redirect/retime within fuel) a burn that clears the pair.

    Uses ONLY the PhysicsCore seam (propagate + apply_maneuver +
    screen_conjunctions). The agent owns *who moves and why*; this confirms the
    feasible *vector*, searching the same space the deterministic coordinator does
    so the swarm converges on its own instead of punting to the WS3 fallback:

      1. the agent's exact proposal (honor its choice when it works);
      2. its direction, grown within fuel;
      3. the mover's orbital frame (radial/along/cross-track ±) × an absolute
         magnitude ladder × burn times (the agent's t_burn and an earlier
         retime with more lead, which often clears with less Δv).

    No candidate is ever scheduled before ``t_floor`` (the latest burn already
    committed this run): this conjunction may be that burn's consequence, and a
    fix that launches before its own cause reads backwards in the timeline.

    Returns the (possibly adjusted) proposal and whether physics says the pair is
    clear. Raises whatever the physics core raises (caller decides to skip).
    """
    base_mag = proposal.est_dv_cost or 0.0
    # No magnitude to scale (e.g. a 0-fuel mover should never have committed):
    # nothing useful to try — report not-cleared and let WS3 fall back.
    if base_mag <= 0:
        return proposal, False

    mover = proposal.proposer_id
    fuel_cap = max(fuel_budget_dv * 0.9, 0.0)
    if fuel_cap <= 0:
        return proposal, False

    agent_dir = normalize(proposal.dv_vector)
    # Burn times: the agent's own choice first (floored), then the earliest
    # allowed burn — maximum lead clears slow-drift conjunctions that late burns
    # can't separate within fuel. When 0.4*TCA would precede a committed burn
    # (this conjunction may be its consequence), "earliest" means just past it.
    t_agent = max(proposal.t_burn, t_floor)
    t_lead = max(1.0, conjunction.tca * 0.4)
    if t_lead <= t_floor:
        t_lead = t_floor + min(10.0, 0.4 * max(conjunction.tca - t_floor, 0.0))
    t_burns = [t_agent]
    if abs(t_lead - t_agent) > 1.0 and t_lead < conjunction.tca:
        t_burns.append(t_lead)

    # 1) The agent's exact proposal, as-is (its intent, honored when feasible).
    hit = _try_burn(
        physics, scenario, conjunction, mover, agent_dir or (0.0, 0.0, 1.0),
        min(base_mag, fuel_cap), t_agent, threshold_km, proposal.rationale,
    )
    if hit is not None:
        return hit, True

    last = proposal
    # 2 & 3) Search directions × magnitudes × burn times.
    for t_burn in t_burns:
        directions = _candidate_directions(physics, scenario, mover, t_burn, proposal.dv_vector)
        for direction in directions:
            # Step 1 already honored the agent's exact proposal; here we want the
            # CHEAPEST feasible correction, so search magnitudes ascending (the
            # agent-scaled sizes and the absolute ladder, merged + sorted).
            raw = [base_mag * f for f in _GROW_FACTORS] + list(_MAG_LADDER)
            mags = sorted({min(m, fuel_cap) for m in raw if min(m, fuel_cap) > 0})
            for mag in mags:
                hit = _try_burn(
                    physics, scenario, conjunction, mover, direction, mag,
                    t_burn, threshold_km, proposal.rationale,
                )
                if hit is not None:
                    return hit, True
                last = ManeuverProposal(
                    proposer_id=mover, dv_vector=scale(direction, mag),
                    t_burn=t_burn, est_dv_cost=mag, rationale=proposal.rationale,
                )
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
                        t_floor=getattr(ctx, "t_floor", 0.0),
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
