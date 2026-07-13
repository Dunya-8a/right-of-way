# The Right of Way Protocol — v0.1 (draft)

A peer-to-peer negotiation protocol for autonomous vehicles that must resolve
conflicts **without a central authority**, built on one principle:

> **Agents negotiate intent. A deterministic referee owns truth.**
> Agents may argue, bargain, concede — even lie to each other. No agreement
> takes effect until a ground-truth verifier confirms it physically works, and
> no claim that contradicts ground truth survives.

This document specifies the protocol independently of any domain. The
reference implementation in this repository plays it out in low-Earth orbit
(LLM satellite-agents, a two-body orbital-mechanics referee); the mechanism is
the same for drone corridors, autonomous shipping lanes, or any fleet whose
world admits a deterministic model.

Status: **v0.1 draft** — one reference implementation. Field names below match
`row/contracts.py`, which is normative where this text is ambiguous.

---

## 1. Roles

| Role | Cardinality | Trust |
|---|---|---|
| **Agent** | one per vehicle | Untrusted. Sees only its own state + what it is told. May be an LLM, a policy, or a human console. |
| **Referee** | one per conflict domain | Trusted. A deterministic world-model with three capabilities: `propagate` (predict state), `screen` (detect conflicts), `apply` (simulate an action and return the new world). Holds ground truth the agents cannot alter or argue with. |
| **Orchestrator** | one per episode | Trusted but mechanical: detects conflicts via the referee, opens negotiation channels, enforces the loop and the audit. Makes **no** allocation decisions itself. |

The referee must be **deterministic and inspectable** — in the reference
implementation it is exposed as an MCP tool server (`propagate /
screen_conjunctions / apply_maneuver`), so any party can re-run any check.

## 2. The conflict object

A conflict is a predicted violation of a separation invariant between exactly
two parties (`Conjunction` in the reference implementation):

```
{ a_id, b_id, tca, miss_distance, rel_speed }
```

Multi-party situations are handled as a *sequence* of pairwise conflicts via
the repair loop (§5) — deliberately, so the protocol composes instead of
requiring an n-party solver.

## 3. Message grammar

All negotiation happens over an A2A channel with four agent message types and
one referee type. Every message carries a natural-language `rationale` — the
transcript is part of the product, not debug output.

| type | sender | meaning | key payload |
|---|---|---|---|
| `counter` + `assert_row` | agent | "I hold right-of-way; you move." | rationale |
| `counter` + `cannot_maneuver` | agent | "I am unable to act; requesting a trade." | rationale (the stated reason travels verbatim to the counterpart) |
| `yield` (`concede_row`) | agent | "I concede right-of-way; I will act." | rationale |
| `propose` | agent | a concrete action offer | action (`ManeuverProposal`), recipient, rationale |
| `accept` | agent | accept the proposal on the table | rationale |
| `counter` + `audit_failed` | **referee** | a claim contradicted ground truth; the negotiated outcome is void | rationale |

Norms (right-of-way conventions, priority order) are **prompt-level policy**,
not protocol: the protocol only guarantees that whatever the agents agree to
is verified, repaired, and audited.

## 4. Verification (before commitment)

An accepted proposal is **not** an outcome. The orchestrator submits it to the
referee, which must confirm, against ground truth:

1. **Feasibility** — the actor can physically execute it (e.g. within its
   remaining Δv budget; the referee *rejects* over-budget actions).
2. **Effectiveness** — after `apply`, re-`screen` shows the original conflict
   is cleared.

The verifier may **adjust the action but never the decision**: it can search
for a feasible vector/magnitude/timing that honors *who* agreed to act and
*why*, but it cannot reassign the actor. If nothing feasible exists, the
negotiation is marked unconverged and falls through to §6.

## 5. The verify-and-repair loop

```
screen ─▶ negotiate ─▶ verify ─▶ commit ─▶ RE-SCREEN ─┐
   ▲                                                   │
   └────────── new conflict? back to the table ◀───────┘
                     ↓ no conflicts remain
                  provably clear
```

After every committed action the **whole world is re-screened**. An action
that resolves conflict A by creating conflict B does not terminate the
episode; it opens a new negotiation (with the causal constraint that repairs
are never scheduled before the action that caused them). Termination =
re-screen finds nothing, bounded by a hard iteration cap.

## 6. Liveness: the fallback chain

Negotiation must not be able to deadlock the system. If agents fail to
converge within a round cap, the orchestrator falls back to a deterministic
coordinator that allocates by capability and priority — verified by the same
referee — and, failing that, to a flagged safe no-op for human escalation.
The agents' transcript is preserved through every fallback.

## 7. The audit: lying has nowhere to cash out

Agents cannot read each other's private state, so claims ("I cannot act") are
unverifiable *between agents* — but not to the referee. After each
negotiation the orchestrator audits every capability claim against ground
truth. If a party claimed incapacity while ground truth shows capability, and
that claim moved the burden to someone else:

1. the referee publishes an `audit_failed` message naming the claim and the
   ground truth,
2. the negotiated outcome is **voided**, and
3. allocation falls to the deterministic coordinator, which assigns by *true*
   capability — typically putting the burden back on the liar.

Truthful incapacity (ground truth agrees) passes untouched. See
`--scenario liar` for the reference demonstration and
`test_liar_is_audited_and_reassigned` for the normative behavior.

## 8. The record

An episode emits a self-contained, replayable `Timeline`: world frames, every
negotiation message verbatim (`comms` events), every verification, commitment,
re-screen and audit. The reference viz plays it back; the transcript **is**
the accountability artifact — the thing two operators' lawyers read afterward.

## 9. What a new domain must supply

To instantiate the protocol outside orbit:

1. a deterministic referee (`propagate / screen / apply`) for your world,
2. a conflict definition (the separation invariant),
3. an action type (the domain's `ManeuverProposal`),
4. agent policies/prompts encoding your domain's right-of-way norms.

Everything else — the loop, the grammar, the fallback chain, the audit, the
record — is domain-independent.

---

*v0.1, extracted from the working implementation rather than designed a
priori. Feedback and second implementations welcome — that is the point of
writing it down.*
