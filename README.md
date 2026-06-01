# Right of Way
### Agentic air-traffic control for space 🛰️

> **We gave satellites a group chat to keep them from crashing into each other.**

![Two satellites negotiating a collision-avoidance maneuver in plain English over A2A, with the physics engine refereeing](docs/images/negotiation-chat.png)

When two satellites from different operators drift onto a collision course, there's no mission control to settle it — each one only knows its own fuel, its own mission, and wants the *other* one to move. **Right of Way turns them into AI agents that negotiate their own avoidance maneuvers — peer-to-peer, no central planner** — while a **deterministic physics engine referees every deal** and catches the moment one satellite's dodge creates the *next* near-miss. *Kessler syndrome, handled by conversation.*

![The live 3D view — two active conjunctions, the agents' burn proposals streaming into the event log, maneuver vectors on the satellites, over a real NASA Earth](docs/images/negotiation.png)

> *Built at the **Multi-Agent Orchestration Build Day** · The Engine, Cambridge MA · May 31, 2026.*

---

## Why this isn't just a physics sim

Computing *one* satellite's avoidance burn is solved, deterministic math — you should never want an LLM doing orbital mechanics. The hard part is the **coupling between operators who share no central authority, no common objective, and won't take each other's math on faith.** One satellite's dodge can shove it into a *third* satellite's path. That isn't a computation — it's a **negotiation under partial information with conflicting goals.** Which is exactly what multi-agent systems are for.

And the mechanism generalizes to any fleet with no central boss: drones (the FAA's decentralized UTM / Part 108 framework lands ~2026), self-driving cars, autonomous ships.

## The demo that proves the agents are load-bearing

The naive rule is *"lowest-priority satellite yields."* So we broke it: the lowest-priority satellite (`sat_A`) is **out of fuel and physically cannot move**, forcing the higher-priority `sat_B` to give up right-of-way and dodge anyway. **Nobody hard-codes this.** Listen in on the actual A2A exchange:

```
sat_A → sat_B   Right-of-way says I should give way to you — but my Δv budget is ~0.
                I physically cannot maneuver. Requesting a trade.
sat_B → sat_A   I hold right-of-way (priority 9 vs your 1). Requesting you give way.
sat_B → sat_A   Understood — you have no fuel and can't move. Right-of-way is moot
                against a sat that physically can't yield. I'll trade and take the burn.
sat_B → sat_A   PROPOSE burn (0, +8.5, −8.5) m/s @ t+240s
sat_A → sat_B   Your burn clears our conjunction. Accepted.
```

The trade **emerges from the conversation** — a test proves that giving `sat_A` fuel flips who moves, so it's negotiation, not an `if`-statement. Then `sat_B`'s dodge nearly clips a *third* satellite, the physics referee catches it, and they renegotiate. Here's a full run (`python -m row.orchestrator`):

```
topology=hierarchical  converged=True  iterations=2  total_dv=20.0 m/s  rounds=2
  t=    0.0  conjunction_detected   sat_A / sat_B   (miss 3.0 km)
  t=  240.0  maneuver_committed     sat_B  Δv 0.010 km/s
  t=  240.0  new_conjunction        sat_B / sat_C   (miss 1.5 km)   ← the fix created a new risk
  t=  335.8  maneuver_committed     sat_C  Δv 0.010 km/s
  t=  879.6  resolved                                               ← provably clear
```

## How it works

```
        ┌─────────── verify-and-repair loop ───────────┐
        │                                               │
  screen for      negotiate            commit        RE-SCREEN
  conjunctions ─▶ (A2A, peer-to-peer) ─▶ maneuver ─▶ (physics) ──┐
        ▲                                                        │
        └──────── new conjunction? back to the table ◀──────────┘
                          ↓ provably clear
                       emit Timeline → 3D viz
```

- **A2A** — agents negotiate by passing `propose / counter / accept / yield` messages. The bus just routes; the **agents** decide who moves.
- **MCP** — the physics referee is a real [FastMCP](https://modelcontextprotocol.io) server exposing `propagate / screen_conjunctions / apply_maneuver` as agent-callable tools. Agents call ground-truth orbital mechanics instead of guessing.
- **Two topologies, one flag** — runs as an emergent peer-to-peer **swarm** *or* a **hierarchical** coordinator. Swarm stalls → fall back to hierarchical → flagged safe no-op. The demo can't hard-fail.
- **Verifier-first** — LLM-agents reason about *intent, priority, and strategy*; the deterministic core owns *feasibility* (exact two-body propagation via universal variables, conjunction screening, fuel accounting). Knowing what to delegate to the model vs. to deterministic compute **is** the design.

## Run it

```bash
uv sync

uv run python -m row.agents.demo         # the agents negotiating — both topologies + the forced-trade transcript
uv run python -m row.orchestrator        # the full verify-and-repair run → emits web/public/timeline.json
uv run python -m row.physics.demo        # the deterministic referee: propagation, screening, the avoidance burn
uv run python -m row.physics.mcp_server  # the physics core as a real MCP server (stdio transport)

# the same run under W&B Weave — every negotiate() + physics call traced
uv run python -m row.eval --topology swarm   # add --mock for the offline brain
uv run python -m row.eval --leaderboard      # swarm/hierarchical × mock/claude scored
uv run python -m row.eval --guardrail        # the over-budget referee guardrail

cd web && pnpm install && pnpm dev       # the 3D visualization — plays back the emitted Timeline
```

## Architecture

```
row/
├── contracts.py            # pydantic v2 data models — the single source of truth
├── scenario.py             # generate_scenario() — the forced-trade constellation
├── physics/                # the deterministic referee (NumPy, two-body universal variables)
│   ├── core.py             #   PhysicsCore: propagate / screen_conjunctions / apply_maneuver
│   ├── screening.py        #   coarse sampling + golden-section refinement per close approach
│   └── mcp_server.py       #   ← the same core exposed as a real MCP tool server
├── orchestrator/           # the verify-and-repair run loop
│   ├── loop.py             #   detect → negotiate → commit → RE-SCREEN → repeat; emits Timeline
│   └── interfaces.py       #   the Negotiator seam the agents plug into
└── agents/                 # the LLM agent layer — peer-to-peer A2A negotiation
    ├── swarm.py            #   emergent peer-to-peer negotiation, no coordinator
    ├── hierarchical.py     #   central-coordinator fallback
    └── llm.py              #   ClaudeBrain (Sonnet 4.6) + deterministic MockBrain fallback
web/                        # three.js + Vite 3D orbit viz (real NASA Blue Marble / live GIBS tiles)
```

> **Built in parallel.** The four workstreams — physics core, MCP server, the Claude-backed A2A agent layer, and the verify-and-repair orchestrator — were developed concurrently in separate git worktrees against locked `pydantic` contracts, then merged to `main`. A multi-agent build process for a multi-agent product. The orchestrator runs the real peer-to-peer agents by default and falls back to deterministic reference negotiators if the agent layer is unavailable, so the pipeline always runs.

## Sponsor tools

- **W&B Weave** — traces the full multi-agent run (every `negotiate()`, every physics `screen_conjunctions` / `apply_maneuver`, every repair iteration) so an opaque agent loop becomes a transcript you can read and evaluate. The verifier-first principle becomes *visible*: each candidate burn an agent proposes is a physics call nested under its negotiation, and an over-budget burn surfaces as a referee `ValueError` right in the trace. A Weave **evaluation + leaderboard** scores `swarm` vs `hierarchical` × `MockBrain` vs `ClaudeBrain` on six metrics (conjunctions resolved, new conjunctions created, total Δv, rounds-to-converge, iterations, and a budget guardrail). Instrumentation is **additive** — a thin `row/eval/` wrapper around the seams the loop already exposes, touching neither the contracts nor the run loop. See [`row/eval/`](row/eval/) (`uv run python -m row.eval --leaderboard`).
- **Anthropic Claude (Sonnet 4.6)** — the reasoning core of each satellite-agent (tool-use + prompt caching, with a deterministic offline fallback so the demo never breaks). Claude Code was also the *build* harness: parallel agent sessions, one per workstream, each in its own worktree.
- **MCP** — the physics referee as a real FastMCP tool server, the thing that keeps the LLM-agents honest.

---

*Right of Way is a research demonstrator of a coordination mechanism for a real, unsolved gap — cross-operator collision avoidance with no shared maneuvering authority — not a flight-ready system.*
