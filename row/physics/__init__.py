"""Right of Way — PhysicsCore package (WS1): the deterministic referee.

Public API is unchanged from the WS0 stub module — ``from row.physics import
PhysicsCore, MU_EARTH`` keeps working — plus the lower-level functions are
exported for callers that want them directly.

  from row.physics import PhysicsCore, MU_EARTH        # primary
  from row.physics import propagate_state, screen_conjunctions, propagate_rv

No LLM lives anywhere in this package; it is pure, deterministic two-body
mechanics (universal-variable Keplerian propagation + sample-and-refine
conjunction screening). The optional MCP server wrapper lives in
``row.physics.mcp_server`` and is imported lazily so this package never depends
on the MCP SDK.
"""

from __future__ import annotations

from .core import PhysicsCore
from .propagation import MU_EARTH, propagate_rv, propagate_state
from .screening import DEFAULT_COARSE_STEP_S, screen_conjunctions

__all__ = [
    "PhysicsCore",
    "MU_EARTH",
    "propagate_rv",
    "propagate_state",
    "screen_conjunctions",
    "DEFAULT_COARSE_STEP_S",
]
