# Right of Way (`row`)

A decentralized collision-avoidance harness. Satellite-agents detect orbital
near-misses (conjunctions), negotiate avoidance maneuvers peer-to-peer over
**A2A**, and a deterministic **physics core** acts as ground-truth referee —
verifying every proposed maneuver and catching when a fix creates a *new*
near-miss, then triggering re-negotiation. The same mechanism is a general
coordination layer for any fleet of autonomous agents owned by different
operators (drones / UTM, AVs, autonomous vessels).

## Shared vocabulary (read this first — one paragraph)

A **Scenario** is a set of **SpaceObject**s (satellites we control + debris we
avoid), each with an ECI **State** (position `r`, velocity `v`), a
`fuel_budget_dv` (remaining delta-v; ~0 means it physically cannot move), and an
integer `priority` (higher = more right of way). The world is **two-body**:
every object is defined by its Cartesian `state.r` / `state.v` in the ECI frame;
`tle` stays optional and is **unused** for the synthetic demo. The
**PhysicsCore** is the deterministic referee — *no LLM* — that can `propagate`
objects forward, `screen_conjunctions` to find close approaches under
`conjunction_threshold_km`, and `apply_maneuver` to produce a new post-burn
Scenario. A **Conjunction** is a predicted close approach (`tca`,
`miss_distance_km`, `rel_speed`). Agents resolve conjunctions by exchanging
**NegotiationMsg**s (A2A) carrying **ManeuverProposal**s (a `dv_vector`, when to
burn, its cost, and a `rationale`). The whole run is recorded as a **Timeline**
— ordered `frames` (object positions over time) plus `events`
(`conjunction_detected`, `proposal`, `maneuver_committed`, `new_conjunction`,
`resolved`), with `Timeline.meta` carrying `frame: "ECI"`, a `units` block, and
`dt_seconds` (frame cadence) so viz and physics agree on playback — which the
visualization plays back with zero dependency on the sim.

**Frame & units (locked — every session inherits these):** the frame is
**Earth-Centered Inertial (ECI)** everywhere. Distance = **km**, velocity =
**km/s**, `dv_vector` and `fuel_budget_dv` = **km/s**, and `t` / `tca` /
`t_burn` / `screen_window_s` = **seconds from `epoch`**. Realistic LEO scale:
orbit radius ≈ **6,700–7,200 km** (the demo sits at ~6,878 km, i.e. ~500 km
altitude), so a viz built against the fixture matches real physics output later.

## What WS0 (this foundation) ships

- `row/contracts.py` — the data contracts as pydantic v2 models (source of truth).
- `web/types.ts` — the matching TypeScript types (kept in lockstep).
- `row/physics.py` — `PhysicsCore` **interface only** (signatures + docstrings,
  every method raises `NotImplementedError`). WS1 implements the bodies.
- `row/scenario.py` — `generate_scenario()`, the 6-object LEO constellation with
  the injected **forced-trade** conjunction (see below).
- `web/sample_timeline.json` — a hand-faked Timeline that plays the full demo
  arc so the viz session can start with **zero dependencies**. Regenerate with
  `python tools/make_fixture.py`.

### The forced-trade scenario (the whole point of the demo)

- **sat_A** — LOW priority, `fuel_budget_dv ≈ 0` → physically *cannot* maneuver.
- **sat_B** — HIGH priority, has fuel, on a near-miss course with sat_A. The
  naive rule "lowest priority yields" orders sat_A to move, but it can't →
  **sat_B is forced to trade** despite outranking A. This is the proof the
  agents are load-bearing, not a priority `if`-statement.
- **sat_C** — placed just off sat_B's most obvious avoidance direction, so when
  B burns it trends toward C → a likely **secondary** conjunction that triggers
  the re-negotiation beat.
- Plus filler `sat_D`, `sat_E`, `debris_1` so it reads like a real constellation.

## Setup

Python (using [uv](https://docs.astral.sh/uv/)):

```bash
uv sync                    # creates .venv from pyproject.toml
uv run python -c "from row import generate_scenario; print(generate_scenario())"
uv run python tools/make_fixture.py        # regenerate the viz fixture
```

Web types (using [pnpm](https://pnpm.io/)):

```bash
cd web
pnpm install
pnpm typecheck             # tsc --noEmit over the shared types
```

## How the other five sessions import this

```python
# WS1 — Physics Core: implement the bodies of these.
from row.physics import PhysicsCore, MU_EARTH
from row import Scenario, Conjunction, State

# WS2 — Agent + Negotiation:
from row import (
    generate_scenario, Scenario, SpaceObject,
    Conjunction, ManeuverProposal, NegotiationMsg,
)
from row.physics import PhysicsCore   # call it as the referee

# WS3 — Orchestrator (the run loop): pulls everything together and EMITS a Timeline.
from row import (
    generate_scenario, PhysicsCore,
    Conjunction, ManeuverProposal, NegotiationMsg,
    Timeline, Frame, FrameObject, TimelineEvent,
)

# WS4 — Weave: wrap WS2/WS3 callables with @weave.op(); read the same contracts.
from row import Scenario, Conjunction, ManeuverProposal, Timeline
```

```ts
// WS5 — Visualization: import the types and play back the fixture. No sim needed.
import type { Timeline, Frame, SpaceObject, Conjunction } from "./types";
import sample from "./sample_timeline.json";
// JSON arrays infer as number[]; the unknown-hop is the standard cast to the
// tuple-typed (Vec3) Timeline. Needs "resolveJsonModule": true (set in tsconfig).
const timeline = sample as unknown as Timeline;
```

**Contract discipline:** if you must change a field, change it in *both*
`row/contracts.py` and `web/types.ts`, regenerate the fixture, and tell the room.
Everything else is built against the contract, not against running code.

## File tree

```
.
├── README.md
├── pyproject.toml              # uv / packaging; physics deps are an extra
├── row/                        # the Python package (foundation)
│   ├── __init__.py             # re-exports the public API
│   ├── contracts.py            # pydantic models — SOURCE OF TRUTH
│   ├── physics.py              # PhysicsCore INTERFACE ONLY (WS1 implements)
│   └── scenario.py             # generate_scenario() + forced-trade injection
├── tools/
│   └── make_fixture.py         # regenerates web/sample_timeline.json
└── web/                        # viz workspace (WS5)
    ├── package.json            # pnpm; typescript devDep
    ├── tsconfig.json
    ├── types.ts                # TS mirror of contracts.py
    └── sample_timeline.json    # dependency-free demo-arc fixture
```
