"""Right of Way — orchestrator (WS3).

Owns the verify-and-repair run loop that ties the PhysicsCore (WS1) and the
Negotiator agents (WS2) together and emits a Timeline.

Public seam (shared contract, safe to import from any session):
    from row.orchestrator.interfaces import (
        Negotiator, NegotiationContext, NegotiationResult, Topology,
    )

Run loop entry point:
    from row.orchestrator import run
    result = run(topology="hierarchical")   # emits web/public/timeline.json
"""

from __future__ import annotations

from .interfaces import (
    NegotiationContext,
    NegotiationResult,
    Negotiator,
    Topology,
)
from .loop import RunResult, run

__all__ = [
    "Negotiator",
    "NegotiationContext",
    "NegotiationResult",
    "Topology",
    "run",
    "RunResult",
]
