"""Right of Way (``row``) — decentralized orbital collision-avoidance harness.

Foundation layer (WS0): shared contracts, the PhysicsCore interface, and the
forced-trade scenario generator. Other sessions import from here.

  from row import (
      generate_scenario, PhysicsCore,
      Scenario, SpaceObject, State, Conjunction,
      ManeuverProposal, NegotiationMsg,
      Timeline, Frame, FrameObject, TimelineEvent,
  )
"""

from __future__ import annotations

from .contracts import (
    Conjunction,
    Frame,
    FrameObject,
    ManeuverProposal,
    NegotiationMsg,
    Scenario,
    SpaceObject,
    State,
    Timeline,
    TimelineEvent,
)
from .physics import MU_EARTH, PhysicsCore
from .scenario import (
    CONJUNCTION_THRESHOLD_KM,
    EPOCH,
    SCREEN_WINDOW_S,
    generate_scenario,
)

__all__ = [
    # contracts
    "Conjunction",
    "Frame",
    "FrameObject",
    "ManeuverProposal",
    "NegotiationMsg",
    "Scenario",
    "SpaceObject",
    "State",
    "Timeline",
    "TimelineEvent",
    # physics (interface only — WS1 implements)
    "PhysicsCore",
    "MU_EARTH",
    # scenario
    "generate_scenario",
    "EPOCH",
    "SCREEN_WINDOW_S",
    "CONJUNCTION_THRESHOLD_KM",
]
