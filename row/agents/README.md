# WS2 — Agents + Negotiation (`row.agents`)

The negotiation layer of Right of Way. Autonomous satellite-agents observe their
local neighborhood, negotiate avoidance maneuvers peer-to-peer over an
A2A-shaped message bus, and commit a burn — with the deterministic PhysicsCore
as referee. Two topologies (`swarm`, `hierarchical`) both resolve the
forced-trade conjunction.

## Run it standalone (no WS1 physics, no WS3 run loop)

```bash
# from the repo root, using the project venv
python -m row.agents.demo            # prints both topologies' A2A transcripts
python -m pytest row/agents/         # 8 acceptance tests
```

`demo.py` uses `StubPhysics` to mimic WS3's verify-and-repair loop so the agent
layer is visible today: forced trade (sat_B moves, not the out-of-fuel sat_A) →
re-screen catches the secondary sat_B/sat_C → re-negotiate → all clear.

## WS3 integration (the seam)

```python
from row.agents import make_negotiator   # or SwarmNegotiator / HierarchicalNegotiator
from row.orchestrator.interfaces import NegotiationContext

negotiator = make_negotiator(ctx.topology)   # "swarm" | "hierarchical"
result = negotiator.negotiate(ctx)           # -> NegotiationResult
```

Each negotiator implements the `Negotiator` Protocol in
`row.orchestrator.interfaces` and carries a `.topology` attribute. It resolves
ONE conjunction; WS3 owns re-screening and the swarm→hierarchical fallback. On
failure it returns `converged=False`.

**Message payloads** (in `result.messages`, all `NegotiationMsg`):
- `propose` → `payload["proposal"]` is a `ManeuverProposal.model_dump()`;
  `payload["recipient_id"]` is the conjunction partner the burn is aimed at (use
  this for the Timeline proposal event — in the hierarchical path `to_id` is the
  coordinator, but `recipient_id` is the real partner).
- `counter` → `payload` carries `cannot_maneuver: true` or `assert_row: true`.
- `yield` → `payload["concede_row"]: true` (the high-priority party trading).
- `accept` → `payload["accepts_proposer"]` is who it accepts.
All carry `payload["rationale"]` (natural language).

## Brains: deterministic vs. real Claude

Two interchangeable `AgentBrain`s decide each agent's stance (intent only — the
Δv numbers come from `geometry` and are verified by physics):

- **`MockBrain`** — deterministic local policy. Offline, reproducible, the
  default. The forced-trade resolution emerges from local rules + A2A exchange,
  not a hardcoded `if`.
- **`ClaudeBrain`** — real Anthropic API (model `claude-sonnet-4-6`),
  lazy-imported, prompt-cached system prompt. Falls back to `MockBrain` on any
  import/API error, so a flaky network never breaks the demo.

`default_brain()` returns `ClaudeBrain` only when **all** of these hold:
`anthropic` is importable **and** `ANTHROPIC_API_KEY` is set **and**
`ROW_FORCE_MOCK_BRAIN` is unset.

### Enabling the real Claude brain  ⚠️ needs room action

`anthropic` is **not** in `pyproject.toml` and no API key is set in the shared
venv, so demo/tests currently run on `MockBrain`. To run real LLM negotiation:

```bash
uv pip install anthropic            # or add to pyproject (see below)
export ANTHROPIC_API_KEY=sk-ant-... # never commit this
python -m row.agents.demo          # now negotiates via Claude
```

**Suggested `pyproject.toml` change (owner: WS0/main — not in WS2's lane):**
add an optional extra so the dep is declared without forcing it on sessions that
don't need it —

```toml
[project.optional-dependencies]
agents = ["anthropic>=0.40"]
```

The negotiation logic, message flow, and transcript shape are identical with
either brain; Claude only changes the reasoning and the wording of rationales.

## Files

| File | Role |
|---|---|
| `agent.py` | `Agent`: local observation, A2A inbox, per-round `step()`, proposal sizing |
| `llm.py` | `AgentBrain` protocol, `MockBrain`, `ClaudeBrain`, `default_brain()` |
| `geometry.py` | pure vector helpers + avoidance direction / burn sizing (no orbital math) |
| `swarm.py` | `run_swarm`: peer-to-peer A2A, consensus by acceptance |
| `hierarchical.py` | `Coordinator` + `run_hierarchical`: deterministic fallback |
| `negotiator.py` | the WS3 seam: `SwarmNegotiator`, `HierarchicalNegotiator`, `make_negotiator` |
| `physics_stub.py` | `StubPhysics`: scripted PhysicsCore stand-in for standalone runs |
| `outcome.py` | internal `NegotiationOutcome` (adapted to `NegotiationResult`) |
| `demo.py` | runnable acceptance harness (prints transcripts) |
| `test_acceptance.py` | pytest acceptance suite |

Scope: everything here is inside `row/agents/`. `row/contracts.py` and the
`row.orchestrator.interfaces` seam are read-only for WS2.
