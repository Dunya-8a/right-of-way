"""Generate web/sample_timeline.json — a dependency-free playback fixture (WS0).

The numbers are *faked* (simple circular motion, no real propagation). Its only
job: let the viz session (WS5) build the full demo arc immediately —
  green -> conjunction_detected(A,B) -> proposal -> maneuver_committed(B)
  -> new_conjunction(B,C) -> proposal -> resolved.

Run from repo root:  python tools/make_fixture.py
It writes web/sample_timeline.json and validates it against the Timeline model.
"""

from __future__ import annotations

import json
import math
import pathlib
import sys

# Make `row` importable no matter the cwd or how this file is invoked. (uv's
# editable install isn't reliably honored at runtime, and running a script in a
# subdir puts that subdir — not the repo root — on sys.path.)
_REPO_ROOT = pathlib.Path(__file__).resolve().parent.parent
if str(_REPO_ROOT) not in sys.path:
    sys.path.insert(0, str(_REPO_ROOT))

from row import Timeline  # noqa: E402
from row.scenario import _R  # noqa: E402  (orbital radius used by the generator)

OUT = pathlib.Path(__file__).resolve().parent.parent / "web" / "sample_timeline.json"

# Objects mirror generate_scenario(): each gets a circular path we sample.
# (plane_axes, phase0, ang_vel_scale) — purely cosmetic, just so the viz moves.
ORBITS = {
    "sat_A": dict(plane="xy", phase=0.000, w=1.0),
    "sat_B": dict(plane="xz", phase=0.000, w=1.0),
    "sat_C": dict(plane="xz", phase=0.006, w=1.0),  # just up-track of B
    "sat_D": dict(plane="xy", phase=math.pi, w=1.0),
    "sat_E": dict(plane="xy", phase=math.pi / 2, w=1.0),
    "debris_1": dict(plane="zx", phase=0.0, w=0.9),
}

# Angular rate so a frame step looks like motion (faked, not Keplerian).
W = 2 * math.pi / 5400.0  # ~90-min orbit feel


def pos(obj_id: str, t: float) -> list[float]:
    o = ORBITS[obj_id]
    ang = o["phase"] + W * o["w"] * t
    c, s = _R * math.cos(ang), _R * math.sin(ang)
    plane = o["plane"]
    if plane == "xy":
        return [c, s, 0.0]
    if plane == "xz":
        return [c, 0.0, s]
    # "zx"
    return [0.0, c, s]


def vel(obj_id: str, t: float) -> list[float]:
    """Faked tangential velocity (d/dt of pos) so frames carry optional ECI v."""
    o = ORBITS[obj_id]
    w = W * o["w"]
    ang = o["phase"] + w * t
    dc, ds = -_R * math.sin(ang) * w, _R * math.cos(ang) * w  # km/s
    plane = o["plane"]
    if plane == "xy":
        return [dc, ds, 0.0]
    if plane == "xz":
        return [dc, 0.0, ds]
    # "zx"
    return [0.0, dc, ds]


def build() -> Timeline:
    frames = []
    for k in range(0, 31):  # t = 0,120,...,3600
        t = k * 120.0
        frames.append(
            {
                "t": t,
                "objects": [
                    {"id": oid, "r": pos(oid, t), "v": vel(oid, t)} for oid in ORBITS
                ],
            }
        )

    events = [
        {
            "t": 600.0,
            "type": "conjunction_detected",
            "data": {
                "a_id": "sat_A",
                "b_id": "sat_B",
                "tca": 900.0,
                "miss_distance_km": 1.8,
                "rel_speed": 10.7,
                "note": "sat_A is out of fuel; naive 'low-priority yields' is impossible.",
            },
        },
        {
            "t": 650.0,
            "type": "proposal",
            "data": {
                "proposer_id": "sat_B",
                "recipient_id": "sat_A",
                "dv_vector": [0.0, 0.0, 0.012],
                "t_burn": 720.0,
                "est_dv_cost": 0.012,
                "rationale": "sat_A cannot maneuver (fuel ~0); I outrank it but will trade and burn cross-track.",
            },
        },
        {
            "t": 720.0,
            "type": "maneuver_committed",
            "data": {
                "obj_id": "sat_B",
                "dv_vector": [0.0, 0.0, 0.012],
                "est_dv_cost": 0.012,
            },
        },
        {
            "t": 780.0,
            "type": "new_conjunction",
            "data": {
                "a_id": "sat_B",
                "b_id": "sat_C",
                "tca": 1500.0,
                "miss_distance_km": 3.4,
                "rel_speed": 0.9,
                "note": "B's avoidance burn pushed it toward sat_C — re-screen caught a secondary.",
            },
        },
        {
            "t": 820.0,
            "type": "proposal",
            "data": {
                "proposer_id": "sat_B",
                "recipient_id": "sat_C",
                "dv_vector": [0.0, 0.0, 0.007],
                "t_burn": 900.0,
                "est_dv_cost": 0.007,
                "rationale": "Refine burn: split cross-track so I clear both A and C within budget.",
            },
        },
        {
            "t": 900.0,
            "type": "maneuver_committed",
            "data": {
                "obj_id": "sat_B",
                "dv_vector": [0.0, 0.0, 0.007],
                "est_dv_cost": 0.007,
            },
        },
        {
            "t": 1000.0,
            "type": "resolved",
            "data": {
                "all_clear": True,
                "total_dv_km_s": 0.019,
                "rounds": 2,
                "note": "No conjunctions remain over the screen window.",
            },
        },
    ]

    meta = {
        "scenario": "forced-trade demo (faked fixture, no physics)",
        "epoch": "2026-05-31T16:00:00Z",
        # Frame + units so viz and physics agree on playback. Lock these.
        "frame": "ECI",
        "units": {
            "distance": "km",
            "velocity": "km/s",
            "dv": "km/s",
            "time": "seconds_from_epoch",
        },
        "dt_seconds": 120.0,  # frame cadence (== frame_step_s, kept for clarity)
        "frame_step_s": 120.0,
        "conjunction_threshold_km": 5.0,
        "orbit_radius_km": round(_R, 1),  # ~6878 km, realistic LEO scale
        "objects": list(ORBITS.keys()),
        "generated_by": "tools/make_fixture.py",
    }

    return Timeline(meta=meta, frames=frames, events=events)


def main() -> None:
    tl = build()  # constructing it already validates against the model
    OUT.write_text(json.dumps(tl.model_dump(), indent=2) + "\n")
    # Round-trip to be sure the written JSON re-validates.
    Timeline.model_validate_json(OUT.read_text())
    print(f"wrote + validated {OUT} ({len(tl.frames)} frames, {len(tl.events)} events)")


if __name__ == "__main__":
    main()
