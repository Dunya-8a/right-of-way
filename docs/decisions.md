---
created: 2026-05-31
status: active
author: Claude WS3 session
session: WS3 orchestrator
branch: main
informed_by: right-of-way-build-spec.md, user decisions during build day, WS3 interface design
notes: Cross-session decision log + interface seams for Right of Way. Every parallel Claude session (WS1–WS5) should read this before building.
---

# Right of Way — shared decisions & seams

Read this before starting any workstream. Conventions (frame/units/vocabulary)
live in the top-level `README.md`; this file is the **decision log** and the
**interface seams** between sessions.

## Locked conventions (from README — repeated so nobody misses them)

- Frame: **ECI**. Units: distance **km**, velocity/Δv **km/s**, time **seconds
  from `epoch`**. `priority` int, higher = more right of way.
- Two-body world; objects defined by Cartesian `state.r` / `state.v`. `tle`
  optional and unused for the synthetic demo.
- `row/contracts.py` and `row/__init__.py` are the **source of truth** and are
  **read-only** for everyone except WS0. Change a field => tell the room and
  update `web/types.ts` + regenerate the fixture.

## Decision 1 — Protocol authenticity (LOCKED 2026-05-31)

- **MCP = fully real.** WS1 wraps the physics core as a genuine MCP server
  exposing `propagate` / `screen_conjunctions` / `apply_maneuver`. Cheap, high
  credibility, verifiable in Q&A. Do it.
- **A2A = shaped bus now, real transport if time.** WS2 builds negotiation on a
  lightweight peer bus whose messages mirror the A2A structure (roles, parts,
  task lifecycle) so we can honestly call it "A2A-compatible schema". Only after
  the hierarchical floor + Weave are solid do we (optionally) upgrade one or two
  agents to the real `a2a-sdk` to claim A2A fully.
- Rationale: the judging criterion ("multiple agents meaningfully working
  together") is met by the negotiation logic + verify-repair loop, not the wire
  protocol. Don't bet the demo on server infra; spend the budget on negotiation,
  Weave, and viz.

## Decision 2 — Verifier-first division of labor (LOCKED)

LLMs negotiate **intent / priority / strategy**; the deterministic physics core
verifies **feasibility** and supplies ground truth. Any committed maneuver is
re-screened by the referee; a fix that creates a new conjunction forces
re-negotiation. Never let the model do the orbital arithmetic that the core can
do exactly.

## Seam: WS1 — PhysicsCore (`row/physics.py`)

Implement the three methods in `row/physics.py` (signatures already there).
Stateless, deterministic, pure (never mutate the input Scenario). `apply_maneuver`
returns a NEW Scenario. WS3 ships a Kepler **reference double** so the pipeline
runs today; your real core (sgp4 / Skyfield / higher-fidelity two-body) is a
drop-in replacement behind the same interface. Stretch: the MCP server wrapper.

## Seam: WS2 — Negotiator (`row/orchestrator/interfaces.py`)

**This is the contract your agents must satisfy.** Import and implement it:

```python
from row.orchestrator.interfaces import (
    Negotiator, NegotiationContext, NegotiationResult, Topology,
)
```

- Implement `negotiate(ctx) -> NegotiationResult`. Resolve the SINGLE
  `ctx.conjunction`; WS3 owns re-screening and chaining to any new conjunction.
- Ship two implementations selected by `topology`: `"swarm"` (peer-to-peer A2A)
  and `"hierarchical"` (central coordinator — the fallback path).
- Use `ctx.physics` to confirm a proposed burn actually clears the conjunction.
  Respect fuel budgets (`est_dv_cost <= mover.fuel_budget_dv`); a ~0-fuel object
  cannot be the mover — that's the forced-trade case the demo hinges on.
- Populate `messages` (propose/counter/accept/yield) — WS3 renders them as
  Timeline `proposal` events and WS4 traces them in Weave.
- Set `converged=False` if you can't resolve it; WS3 falls back gracefully.

WS3 ships reference negotiators (a priority-yield baseline + a greedy resolver)
so the loop runs end-to-end before WS2 lands; yours replace them.

## Seam: WS3 -> WS5 — emitted Timeline

WS3 writes a `Timeline` JSON (same schema as `web/sample_timeline.json`) to
**`web/public/timeline.json`** (vite serves `public/` at `/`, so the viz can
`fetch('/timeline.json')`). `web/sample_timeline.json` stays as the static dev
fixture. The emitted file is a runtime artifact (gitignored).

Contract additions (2026-05-31, from WS5, backward-compatible):
- `frames[].objects[].v` — optional ECI velocity (km/s) on each frame object, so
  the viz can extrapolate ghost-orbit arcs at a maneuver. Optional (defaults
  null); only WS3 (producer) and WS5 (consumer) touch it. WS1/WS2 unaffected.
- Proposal events SHOULD include `data.recipient_id` (the negotiation partner the
  proposal is aimed at) alongside `proposer_id`. No schema change — `events[].data`
  is an open dict — just a convention so the viz needn't infer the target.
- `meta.epoch` is already present; absolute UTC currently unused by the viz.

## Workflow note

Solo human (no human teammates) coordinating multiple parallel Claude Code
sessions, one per workstream, each in its own git worktree/branch, merging to
`main`. Keep changes inside your workstream's files; the shared contracts above
are the integration points.
