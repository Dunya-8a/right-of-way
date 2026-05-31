"""Timeline assembly for WS3 — turn a run (original scenario + committed burns +
event stream) into the Timeline JSON the viz plays back.

Frame rendering is **physics-agnostic**: it propagates each object segment by
segment through the injected ``PhysicsCore`` (impulsive burns split the
trajectory into segments), so frames show the *true* piecewise path — on the
collision course until the burn, then on the dodged orbit — and it works
identically with WS1's real core. Uses only ``physics.propagate``.
"""

from __future__ import annotations

from ..contracts import (
    Frame,
    FrameObject,
    Scenario,
    SpaceObject,
    State,
    Timeline,
    TimelineEvent,
)
from ..physics import PhysicsCore
from ._kepler import add

# burns: object id -> list of (t_burn, dv_vector)
Burns = dict[str, list[tuple[float, tuple[float, float, float]]]]


def _prop_one(physics: PhysicsCore, original: Scenario, obj: SpaceObject, state: State, dt: float) -> State:
    """Propagate a single object's ``state`` by ``dt`` through the physics core,
    using a one-object scenario so any PhysicsCore implementation works."""
    if dt == 0.0:
        return state
    mini = original.model_copy(update={"objects": [obj.model_copy(update={"state": state})]})
    return physics.propagate(mini, dt)[obj.id]


def _segment_anchors(
    physics: PhysicsCore, original: Scenario, obj: SpaceObject, obj_burns
) -> list[tuple[float, State]]:
    """(t_start, state_at_t_start) anchors, one per trajectory segment."""
    anchors: list[tuple[float, State]] = [(0.0, obj.state)]
    for t_burn, dv in sorted(obj_burns, key=lambda x: x[0]):
        t_a, st = anchors[-1]
        s_tb = _prop_one(physics, original, obj, st, t_burn - t_a)
        new_v = add(tuple(s_tb.v), (float(dv[0]), float(dv[1]), float(dv[2])))
        anchors.append((t_burn, State(r=s_tb.r, v=new_v)))
    return anchors


def _state_at(physics, original, obj, anchors, t: float) -> State:
    t_a, st = anchors[0]
    for ta, s in anchors:
        if ta <= t + 1e-9:
            t_a, st = ta, s
        else:
            break
    return _prop_one(physics, original, obj, st, t - t_a)


def build_timeline(
    original: Scenario,
    burns: Burns,
    events: list[TimelineEvent],
    physics: PhysicsCore,
    dt_seconds: float,
    horizon_s: float,
    meta_extra: dict | None = None,
) -> Timeline:
    objs = [o for o in original.objects if o.state is not None]
    anchors = {o.id: _segment_anchors(physics, original, o, burns.get(o.id, [])) for o in objs}

    frames: list[Frame] = []
    n = int(horizon_s / dt_seconds) + 1
    for i in range(n):
        t = min(horizon_s, i * dt_seconds)
        fobjs = []
        for o in objs:
            st = _state_at(physics, original, o, anchors[o.id], t)
            fobjs.append(FrameObject(id=o.id, r=st.r, v=st.v))
        frames.append(Frame(t=t, objects=fobjs))

    meta = {
        "frame": "ECI",
        "units": {"distance": "km", "velocity": "km/s", "dv": "km/s", "time": "seconds_from_epoch"},
        "dt_seconds": dt_seconds,
        "epoch": original.epoch,
        "conjunction_threshold_km": original.conjunction_threshold_km,
        "objects": [o.id for o in objs],
        "generated_by": "row.orchestrator.run",
    }
    if meta_extra:
        meta.update(meta_extra)
    return Timeline(meta=meta, frames=frames, events=list(events))
