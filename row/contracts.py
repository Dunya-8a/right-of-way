"""Right of Way — shared data contracts (WS0).

These pydantic models are the *single source of truth* every other session
builds against. Do not change a field name or type without telling the room —
the TypeScript mirror in ``web/types.ts`` and the sample fixture in
``web/sample_timeline.json`` must stay in lockstep.

Units convention (lock this in your head):
  - positions ``r`` are in **kilometers**, Earth-centered inertial (ECI) frame.
  - velocities ``v`` and delta-v vectors are in **km/s**.
  - ``fuel_budget_dv`` / ``est_dv_cost`` are a delta-v budget in **km/s**.
  - times ``t`` / ``tca`` / ``t_burn`` are **seconds since the scenario epoch**.
  - ``priority`` is an int where **higher = more important** (more right of way).
"""

from __future__ import annotations

from typing import Any, Literal, Optional

from pydantic import BaseModel, Field

Vec3 = tuple[float, float, float]


class State(BaseModel):
    """An object's instantaneous Cartesian state in the ECI frame."""

    r: Vec3 = Field(..., description="Position [x, y, z] in km.")
    v: Vec3 = Field(..., description="Velocity [vx, vy, vz] in km/s.")


class SpaceObject(BaseModel):
    """A single tracked object: a satellite we control or debris we avoid.

    Either ``tle`` or ``state`` should be present so the physics core has
    something to propagate. The scenario generator (WS0) emits ``state``.
    """

    id: str
    type: Literal["sat", "debris"]
    tle: Optional[tuple[str, str]] = Field(
        default=None, description="Optional two-line element set [line1, line2]."
    )
    state: Optional[State] = Field(
        default=None, description="Cartesian state at the scenario epoch."
    )
    fuel_budget_dv: float = Field(
        ..., description="Remaining maneuver budget in km/s. ~0 means it cannot move."
    )
    priority: int = Field(..., description="Higher = more important / more right of way.")
    notes: str = Field(
        default="",
        description="Operational context fed to the object's agent brain "
        "(mission, operator, constraints). Free text; empty for synthetic sats.",
    )


class Scenario(BaseModel):
    """The full world the orchestrator steps through."""

    name: str = Field(
        default="forced-trade demo",
        description="Human-readable scenario name (shown by the viz).",
    )
    objects: list[SpaceObject]
    epoch: str = Field(..., description="ISO-8601 UTC timestamp for t=0.")
    screen_window_s: int = Field(
        ..., description="How many seconds ahead to screen for conjunctions."
    )
    conjunction_threshold_km: float = Field(
        ..., description="Miss distance at/below which a pair is a conjunction."
    )


class Conjunction(BaseModel):
    """A predicted close approach between two objects, found by screening."""

    a_id: str
    b_id: str
    tca: float = Field(..., description="Time of closest approach, sec since epoch.")
    miss_distance_km: float
    rel_speed: float = Field(..., description="Relative speed at TCA in km/s.")


class ManeuverProposal(BaseModel):
    """A proposed burn an agent puts on the table during negotiation."""

    proposer_id: str
    dv_vector: Vec3 = Field(..., description="Delta-v [dvx, dvy, dvz] in km/s, ECI.")
    t_burn: float = Field(..., description="When to burn, sec since epoch.")
    est_dv_cost: float = Field(..., description="Magnitude of the burn in km/s.")
    rationale: str = Field(..., description="Why this agent is proposing this.")


class NegotiationMsg(BaseModel):
    """One A2A message in a negotiation round.

    ``payload`` is intentionally open — agents will put a ManeuverProposal,
    a counter, or free-form rationale in here. Keep it JSON-serializable.
    """

    from_id: str
    to_id: str
    type: Literal["propose", "counter", "accept", "yield"]
    payload: dict[str, Any] = Field(default_factory=dict)


# --- Timeline: the viz contract. The run emits it; the viz only plays it back.


class FrameObject(BaseModel):
    id: str
    r: Vec3
    v: Optional[Vec3] = Field(
        default=None,
        description="ECI velocity [vx, vy, vz] in km/s. Optional; lets the viz "
        "extrapolate 'ghost orbit' arcs (old vs new trajectory) at a maneuver.",
    )


class Frame(BaseModel):
    t: float = Field(..., description="Seconds since epoch.")
    objects: list[FrameObject]


TimelineEventType = Literal[
    "conjunction_detected",
    "proposal",
    "maneuver_committed",
    "resolved",
    "new_conjunction",
    "comms",  # one negotiation message (any kind) — the agents' own words
]


class TimelineEvent(BaseModel):
    t: float
    type: TimelineEventType
    data: dict[str, Any] = Field(default_factory=dict)


class Timeline(BaseModel):
    """Self-contained playback artifact. The viz needs *only* this — no sim."""

    meta: dict[str, Any] = Field(default_factory=dict)
    frames: list[Frame]
    events: list[TimelineEvent]
