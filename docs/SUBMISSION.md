---
created: 2026-05-31
status: active
author: Claude main session
session: submission-writing
branch: main
informed_by: right-of-way-build-spec.md, docs/decisions.md, README.md, WS1/WS2/WS3 worktree source, project memory
notes: AGI House submission copy for Right of Way (`row`). Paste the field blocks into the platform. Description tightened + reopened so it doesn't echo the tagline. Keep in lockstep with what's merged to main + whether Weave is wired.
---

# Right of Way — AGI House submission

> **Multi-Agent Orchestration Build Day · The Engine · May 31, 2026**
> Public repo: `<github-url>` · Demo video: `<link, under 2 min>`

## Submission metadata (fill in on the platform)

- **Project Name:** Right of Way
- **Track:** General Track
- **Repository URL:** `<public github url — main must be merged, or point at ws3-orch>`
- **Demo URL:** `<deployed viz url, or the demo video link>`
- **Team Members:** `<your @handle>` (solo build)

---

## Tagline (the "tweet")

> There's no air-traffic control in space. So when two satellites are on a collision course, our AI agents argue it out themselves — peer-to-peer, no one in charge — while a physics engine referees the deal before anyone burns fuel.

_Alternates if you want a different vibe:_
- _A four-way stop in orbit, with no traffic light. AI satellite-agents negotiate who yields to dodge a collision — and a physics engine won't let them lie about it._
- _Two satellites, a collision course, and nobody in charge. We made them talk it out: AI agents negotiate who moves, a physics engine checks the deal is real, and if the dodge creates a new near-miss, they go back to the table._

---

## Description

**Two operators, one near-miss, no shared authority to settle it.** Right of Way turns each satellite into an AI agent that negotiates its own collision avoidance — peer-to-peer, no central planner. The agents bargain over who yields and who burns fuel; a deterministic physics engine referees, checking every maneuver against real orbital mechanics. The instant one satellite's dodge creates a *new* near-miss with a third, it throws them back to the table. Loop until the sky is provably clear.

**The trick that proves the agents are real.** The obvious rule is "lowest-priority satellite moves" — so we broke it. The lowest-priority satellite is out of fuel and physically *can't* move, forcing the high-priority one to give up right-of-way and dodge anyway. Nobody hard-codes this: sat_A says "I can't move," sat_B concedes. The trade **emerges from the conversation** (a test proves that giving sat_A fuel flips who moves — negotiation, not an `if`-statement). Then sat_B's dodge nearly clips a third satellite, the re-screen catches it, and they renegotiate. The whole loop, live.

**Why agents, not a solver?** Computing one dodge is solved math — we keep the LLM out of it. The hard part is the negotiation between operators who share no goal and won't take each other's math on faith. The agents negotiate; the physics engine keeps them honest. The same mechanism fits any fleet with no central boss — drones, self-driving cars, ships (next: the FAA's decentralized drone-traffic framework, ~2026).

**How it's built**
- **A2A** — agents pass `propose / counter / accept / yield` messages; the bus just routes, the agents decide who moves.
- **MCP** — the physics referee is a real FastMCP server; agents call `propagate / screen_conjunctions / apply_maneuver` as tools instead of guessing orbital math.
- **Two topologies, one flag** — emergent swarm or hierarchical coordinator; swarm stalls → fall back → safe no-op, so the demo can't hard-fail.
- **Claude (Sonnet 4.6)** is each satellite's brain (tool-use + prompt caching), with a deterministic offline fallback so it runs with zero keys.
- **W&B Weave** traces every round, physics call, and repair loop — the run becomes a transcript you can read.
- **three.js** globe with real NASA textures plays it back. Built multi-agent too: parallel Claude Code sessions, one per workstream, in separate git worktrees.

**Sponsor tools** — **W&B Weave:** traces the full run (that trace tree *is* the demo — you watch a new conjunction force re-negotiation). **Anthropic Claude (Sonnet 4.6):** the agents' reasoning core, and the dev harness via Claude Code. **MCP:** the physics referee as a real FastMCP tool server.

---

## Tech Stack (comma-separated, for the form field)

```
Python, pydantic v2, Claude (Anthropic API), MCP (FastMCP), A2A negotiation, NumPy two-body orbital mechanics, W&B Weave, three.js, Vite, TypeScript, Claude Code (parallel git worktrees)
```

---

## How to run (reviewer quickstart)

```bash
uv sync
uv run python -m row.physics.demo        # physics referee: propagation, screening, the avoidance burn
uv run python -m row.agents.demo         # negotiation: both topologies + the forced-trade transcript
uv run python -m row.orchestrator        # full verify-and-repair run, emits web/public/timeline.json
uv run python -m row.physics.mcp_server  # physics core as a live MCP server (stdio)
cd web && pnpm install && pnpm dev       # 3D visualization, plays back the Timeline
```

---

## Maps to judging criteria

- **Agent Orchestration:** emergent swarm + hierarchical fallback, a verify-and-repair loop that re-screens every burn, and a graceful degradation chain. The forced-trade test proves the outcome isn't a priority `if`-statement.
- **Utility:** a real, growing, unsolved gap — cross-operator coordination with no shared maneuvering authority (orbital today; drone/UTM next, Part 108 ~2026).
- **Technical Execution:** exact two-body physics, a deterministic referee, unit + acceptance tests, working end-to-end demos, contract-driven parallel build.
- **Creativity:** reframes collision avoidance from numerical optimization into an *interoperability/negotiation* problem — agents applied where everyone assumes pure compute.
- **Sponsor Usage:** real MCP server, Claude as agent brains, Weave tracing the whole multi-agent run.
