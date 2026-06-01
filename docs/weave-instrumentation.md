---
created: 2026-05-31
status: active
author: Claude main session (WS4 — Weave instrumentation)
session: WS4 weave
branch: ws4-weave
informed_by: docs/decisions.md, README.md, row/orchestrator/loop.py, row/agents/*, row/physics/core.py, W&B Weave docs (weave 0.52.8)
notes: What WS4 instruments with W&B Weave, how it stays additive/parallel-safe, the run/leaderboard/guardrail commands, and a demo-video script with the live Weave URLs.
---

# WS4 — W&B Weave instrumentation

Turns the opaque multi-agent run loop into a readable, scored transcript in
[W&B Weave](https://wandb.ai). **Additive and parallel-safe**: nothing here edits
`contracts.py`, `orchestrator/interfaces.py`, or `orchestrator/loop.py`. All
tracing lives in a thin wrapper package, `row/eval/`, that wraps the two seams
`run()` already accepts by injection (the `PhysicsCore` referee and the
`Negotiator`).

## What gets traced

`traced_run()` is the `@weave.op` over `row.orchestrator.run` the spec calls for
(kept as a wrapper, not an edit to the loop). It injects:

- **`TracedPhysics`** — wraps the real `PhysicsCore`; traces `screen_conjunctions`
  and `apply_maneuver` (the ground-truth referee calls). `propagate` is left
  untraced — the Timeline builder calls it once per frame and would bury the view.
- **`TracedNegotiator`** — wraps the real WS2 negotiator; traces each
  `negotiate()` call.

The result is a nested trace:

```
traced_run                       (the whole run)
└─ negotiate                     (one per conjunction; swarm or hierarchical)
   ├─ screen_conjunctions        (verifier checks a candidate burn clears the pair)
   └─ apply_maneuver             (referee applies — or REJECTS over-budget — a burn)
```

This makes the **verifier-first** thesis visible: every candidate burn an agent
proposes is a physics call nested under its negotiation, and an over-budget burn
shows up as a referee `ValueError` inside the trace.

## Scorers (the leaderboard metrics)

Each is a `@weave.op` reading the run summary (`tracing.summarize`):

| scorer | metric | direction |
| --- | --- | --- |
| `conjunctions_resolved` | scene provably clear at the end | higher |
| `new_conjunctions_created` | fixes that spawned a fresh conjunction | lower |
| `total_dv` | fuel spent (km/s and m/s) | lower |
| `rounds_to_converge` | negotiation rounds summed | lower |
| `iterations` | outer verify-repair iterations | lower |
| `budget_respected` | guardrail: no over-budget burn committed | higher |

## Evaluation + leaderboard

`run_leaderboard()` scores the full matrix on the forced-trade scenario:

```
topology = {swarm, hierarchical}   ×   brain = {MockBrain, ClaudeBrain}
```

Each cell is a `weave.Model` whose `predict` runs `traced_run`; all four are
scored by the same scorers over the same one-row dataset, so Weave's evaluation
comparison view (and the published `Leaderboard` object) line them up side by
side. ClaudeBrain cells are included automatically when `ANTHROPIC_API_KEY` is
set; otherwise only the MockBrain cells run.

A representative run (all four converge on the same physical answer — sat_B then
sat_C burn, 20 m/s total — but the real Claude swarm takes more negotiation
rounds to get there, which is exactly what the leaderboard surfaces):

```
cell                    resolved    dv (m/s)  new_conj  rounds  budget_ok
swarm/mock                  1.00        20.0      1.00    2.00       1.00
swarm/claude                1.00        20.0      1.00    4.00       1.00
hierarchical/mock           1.00        20.0      1.00    2.00       1.00
hierarchical/claude         1.00        20.0      1.00    2.00       1.00
```

## The budget guardrail (bonus)

`budget_guardrail_probe()` deliberately commands a 5000 m/s burn on the
near-empty `sat_A` and asserts the deterministic core refuses it — the referee is
the thing that keeps the agents honest. It's a `@weave.op`, so the guardrail
check is itself an auditable trace.

## Commands

```bash
# needs WANDB_API_KEY (+ ANTHROPIC_API_KEY for real-LLM runs) — loaded from ../.env
uv run python -m row.eval --topology swarm        # one full traced run (Claude agents)
uv run python -m row.eval --topology swarm --mock # force the offline deterministic brain
uv run python -m row.eval --leaderboard           # topology × brain evaluation + leaderboard
uv run python -m row.eval --guardrail             # the over-budget referee guardrail probe
```

With no `WANDB_API_KEY` everything still runs, just untraced (ops execute
normally), so offline/CI is unaffected. To run fully offline:
`ROW_FORCE_MOCK_BRAIN=1 uv run python -m row.eval --mock`.

## Demo-video script (~60s)

1. **Project page** — open the Weave project
   `right-of-way`; show the list of traced runs and the evaluations.
2. **One run, expanded** — open a `traced_run` (swarm/claude) and expand the tree:
   `negotiate → screen_conjunctions / apply_maneuver`. Narrate: *"every burn the
   agents propose is checked against the physics referee — that nesting IS the
   verifier-first design."*
3. **The forced trade** — in the `negotiate` for `sat_A/sat_B`, show the inputs:
   sat_A has ~0 fuel, so the higher-priority sat_B is forced to move. Then the
   re-screen finds the new `sat_B/sat_C` conjunction and a second `negotiate`
   fires — the verify-and-repair loop, visible.
4. **Leaderboard** — open the published `right-of-way-leaderboard` (or the
   Evaluations → Compare view): swarm vs hierarchical × mock vs claude across the
   six metrics. Narrate the rounds-to-converge difference.
5. **Guardrail** — show the `budget_guardrail_probe` trace: the referee rejecting
   the 5000 m/s burn on the empty sat_A.

Project: `https://wandb.ai/<entity>/right-of-way/weave`
