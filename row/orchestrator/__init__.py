"""Right of Way — orchestrator (WS3).

Owns the verify-and-repair run loop that ties the PhysicsCore (WS1) and the
Negotiator agents (WS2) together and emits a Timeline.

Public seam (shared contract, safe to import from any session):
    from row.orchestrator.interfaces import (
        Negotiator, NegotiationContext, NegotiationResult, Topology,
    )

The run-loop entry point (``run``) is added by the WS3 build; import it as
``from row.orchestrator import run`` once that lands.
"""

from __future__ import annotations

from .interfaces import (
    NegotiationContext,
    NegotiationResult,
    Negotiator,
    Topology,
)

__all__ = [
    "Negotiator",
    "NegotiationContext",
    "NegotiationResult",
    "Topology",
]
