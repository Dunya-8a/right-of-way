"""The WS2 <-> WS3 seam: the Negotiator contract.

WS3 (orchestrator) owns the OUTER verify-and-repair loop: step the sim, screen
for conjunctions, and for each one, call a Negotiator; then apply the committed
maneuvers, RE-SCREEN, and call again on any *new* conjunction until the scene is
provably clear or a cap is hit.

WS2 (agents) owns the INNER logic: implement ``Negotiator.negotiate`` to resolve
ONE conjunction. Provide two implementations selected by ``topology``:
  - "swarm"        — peer-to-peer A2A negotiation between the involved agents.
  - "hierarchical" — a central coordinator decides (the fallback path).

This interface lives on ``main`` (not in a feature branch) precisely because it
is a shared contract: both WS2 and WS3 import it. Treat it like contracts.py —
don't change a field without telling the room.

Verifier-first principle (non-negotiable): the LLM negotiates *intent*; the
deterministic ``ctx.physics`` referee decides *feasibility*. Always confirm a
proposed burn actually clears the conjunction by testing it against
``ctx.physics`` — never trust model arithmetic. That division of labor IS the
project.
"""

from __future__ import annotations

from dataclasses import dataclass, field
from typing import Literal, Protocol, runtime_checkable

from ..contracts import (
    Conjunction,
    ManeuverProposal,
    NegotiationMsg,
    Scenario,
    SpaceObject,
)
from ..physics import PhysicsCore

Topology = Literal["swarm", "hierarchical"]


@dataclass
class NegotiationContext:
    """Everything a Negotiator needs to resolve a single conjunction.

    All fields are read-only inputs. The negotiator must not mutate ``scenario``;
    to test a candidate burn, call ``physics.apply_maneuver(...)`` (which returns
    a new Scenario) and re-screen.
    """

    scenario: Scenario            # current world (prior committed burns already applied)
    conjunction: Conjunction      # the ONE close approach to resolve
    involved: list[SpaceObject]   # the objects party to it (subset of scenario.objects)
    physics: PhysicsCore          # the referee — test candidate maneuvers against it
    threshold_km: float           # miss distance at/above which the pair is "clear"
    max_rounds: int               # HARD cap on negotiation rounds for this conjunction
    topology: Topology
    t_floor: float = 0.0          # earliest allowed burn time (s since epoch): the latest
                                  # already-committed burn, so a repair burn can't be
                                  # scheduled before the maneuver that caused this conjunction


@dataclass
class NegotiationResult:
    """The outcome of negotiating one conjunction.

    ``committed`` are the burns WS3 will apply via the physics core. Each
    ManeuverProposal's ``proposer_id`` names who burns; ``dv_vector`` / ``t_burn``
    / ``est_dv_cost`` are the burn. Respect fuel: ``est_dv_cost`` must be
    <= the mover's ``fuel_budget_dv`` (a ~0-fuel object like sat_A simply cannot
    be the mover — that's the forced-trade case).

    ``messages`` is the negotiation trace (propose / counter / accept / yield);
    WS3 maps it into Timeline ``proposal`` events and WS4 traces it in Weave, so
    populate it even for the hierarchical path.

    ``converged=False`` tells WS3 this negotiator could not resolve the
    conjunction; WS3 then falls back (swarm -> hierarchical -> safe no-op + flag).
    """

    committed: list[ManeuverProposal]
    messages: list[NegotiationMsg] = field(default_factory=list)
    rounds_used: int = 0
    converged: bool = False
    note: str = ""


@runtime_checkable
class Negotiator(Protocol):
    """Implemented by WS2; called by WS3. Resolve ONE conjunction per call.

    WS3 handles re-screening and chaining across conjunctions — a negotiator
    only needs to reason about the single ``ctx.conjunction`` in front of it.
    """

    topology: Topology

    def negotiate(self, ctx: NegotiationContext) -> NegotiationResult:
        ...
