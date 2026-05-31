"""Right of Way — WS2: agents + negotiation.

Public API for WS3 (the orchestrator) and for standalone demos.

WS3 integration — drop a WS2 negotiator into the run loop wherever the reference
negotiator / NullNegotiator was used:

    from row.agents import SwarmNegotiator, HierarchicalNegotiator, make_negotiator
    from row.orchestrator.interfaces import NegotiationContext

    negotiator = make_negotiator(ctx.topology)        # or pick by your registry
    result = negotiator.negotiate(ctx)                 # -> NegotiationResult

Both negotiators satisfy the ``Negotiator`` Protocol in
``row.orchestrator.interfaces`` and carry a ``.topology`` attribute. The swarm
path runs peer-to-peer A2A negotiation; the hierarchical path is a deterministic
coordinator (the fallback). Each resolves ONE conjunction; WS3 owns re-screening.

Standalone (no WS3, no WS1): see ``row.agents.demo`` —
``python -m row.agents.demo`` prints both topologies' transcripts on the
forced-trade scenario plus the secondary re-negotiation beat, using StubPhysics.
"""

from __future__ import annotations

from .agent import (
    DEFAULT_LEAD_S,
    DEFAULT_NEIGHBOR_RANGE_KM,
    Agent,
)
from .hierarchical import Coordinator, run_hierarchical
from .llm import (
    IMMOBILE_DV,
    AgentBrain,
    ClaudeBrain,
    Decision,
    DecisionContext,
    MockBrain,
    default_brain,
)
from .negotiator import (
    HierarchicalNegotiator,
    RowNegotiator,
    SwarmNegotiator,
    make_negotiator,
)
from .outcome import NegotiationOutcome
from .physics_stub import StubPhysics
from .swarm import run_swarm

__all__ = [
    # negotiators (the WS3 seam)
    "SwarmNegotiator",
    "HierarchicalNegotiator",
    "RowNegotiator",
    "make_negotiator",
    # agent + coordinator
    "Agent",
    "Coordinator",
    "run_swarm",
    "run_hierarchical",
    "NegotiationOutcome",
    # brains
    "AgentBrain",
    "MockBrain",
    "ClaudeBrain",
    "default_brain",
    "Decision",
    "DecisionContext",
    "IMMOBILE_DV",
    # standalone testing
    "StubPhysics",
    # tunables
    "DEFAULT_LEAD_S",
    "DEFAULT_NEIGHBOR_RANGE_KM",
]
