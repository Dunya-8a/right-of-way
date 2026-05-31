"""Right of Way — WS2 internal negotiation outcome.

Both topologies (swarm, hierarchical) produce this same shape; ``negotiator.py``
adapts it to the WS3 ``NegotiationResult`` seam. Kept separate so swarm and
hierarchical don't import each other.
"""

from __future__ import annotations

from dataclasses import dataclass, field

from row.contracts import ManeuverProposal, NegotiationMsg


@dataclass
class NegotiationOutcome:
    committed: list[ManeuverProposal]
    transcript: list[NegotiationMsg]
    resolved: bool
    rounds: int
    meta: dict = field(default_factory=dict)
