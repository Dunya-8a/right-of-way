# Right of Way — Build Spec

**Multi-Agent Orchestration Build Day · The Engine · May 31, 2026**
Working name: **Right of Way** (the four-way-stop with no traffic light — who yields, who goes). Repo/package: `row`. Demo-facing name; may get a platform rename later (ROW collides as a company handle).

A decentralized collision-avoidance harness. Satellite-agents detect orbital near-misses (conjunctions), negotiate avoidance maneuvers peer-to-peer, and a deterministic physics core acts as ground-truth referee — verifying every proposed maneuver and catching when a fix creates a *new* near-miss, then triggering re-negotiation.

The whole design is **verifier-first** and **topology-swappable**: the physics referee and a hierarchical fallback are the guaranteed-demoable core; the emergent swarm negotiation is the upside you ship if it converges in time.

---

## 1. Submission description (paste into AGI House, tighten on the day)

**2–3 sentence summary.** Right of Way is a multi-agent harness where autonomous satellite-agents detect collision risks in a live orbital simulation and negotiate avoidance maneuvers peer-to-peer over A2A — with no central planner. A deterministic physics core serves as an objective referee: it screens every committed maneuver, and when a fix creates a new conjunction, it forces the agents back into negotiation until the orbit is provably clear. The same mechanism is a general coordination layer for any fleet of autonomous agents owned by different operators.

**What it does / problem.** When autonomous systems from *different operators* share contested space, there's no central controller and no shared objective function — each party has private constraints and wants to spend the least resource. Collision avoidance becomes a negotiation, not a computation, and one party's fix can endanger another (a chain reaction). Right of Way demonstrates decentralized, self-correcting coordination where safe behavior *emerges* from local agent negotiation, with a hard physics ground-truth that keeps the agents honest. Satellites are the demo because the constraints are unforgiving and visible; the mechanism generalizes (see §1C).

**Why now.** Space is shifting from ground-centralized avoidance to onboard, tactical autonomy (uplink latency can't meet emergency timescales). In parallel, FAA's drone framework (Part 108 / UTM) is standing up a *decentralized, multi-operator* coordination ecosystem right now — the exact architecture this project prototypes.

**How it's built.**
- **Orchestration protocols:** A2A for inter-agent maneuver negotiation; MCP to expose the physics/sim core as callable tools to the agents.
- **Topology-as-config:** the same agents and referee run as a decentralized swarm *or* a hierarchical detector→planner→verifier — flip a flag. (This swappability is itself a harness-sophistication talking point.)
- **Verify-and-repair loop:** propose → negotiate → commit → physics re-screen → if new conjunction, repeat. Verification is the core, not a bolt-on.
- **Stack:** Python physics core (Skyfield / sgp4 or two-body), LLM agents (Claude), A2A message bus, Weave instrumentation, 3D orbit visualization.

**Sponsor tools used** (fill in exactly what you wire up — see §6).

---

## 1B. Why multi-agent is the right tool — Utility & Creativity (the "is this even right?" answer)

**Own the critique first.** Computing a single satellite's avoidance burn is a solved, deterministic optimization. You don't need — and shouldn't want — an LLM doing orbital mechanics. If the agents are just computing Δv, they're decoration on a physics solver and "multi-agent" is a costume. This is the version a sharp judge will attack, so don't build it.

**Why it's genuinely the right tool.** The hard part isn't the physics of one maneuver — it's the *coupling between parties*. When A burns to dodge debris it can move into B's path; B reacts, affecting C. And in reality those assets belong to *different operators* who:
- share no central maneuvering authority,
- carry heterogeneous, contextual constraints that resist a single shared objective function ("science mission in a critical observation window," "fuel reserved for end-of-life deorbit"),
- each want to spend the least fuel.

That is not a computation. It is a **negotiation under partial information with conflicting objectives** — the exact structure multi-agent systems exist for.

**Creativity — the reframe.** Collision avoidance is almost always treated as numerical optimization. Right of Way treats it as an **interoperability / negotiation problem** between operators who can't agree on a shared objective function but *can* exchange structured rationale. LLM-agents earn their place precisely because they negotiate over expressible, heterogeneous, policy-level priorities — and can explain their reasoning — where a fixed optimizer would need every constraint pre-encoded. Applying agent negotiation to a domain everyone assumes is pure compute is the novel move.

**The division of labor IS the harness-sophistication point.** LLMs negotiate intent, priority, and strategy; the deterministic physics core verifies feasibility and supplies ground truth. The design's correctness is that it knows what to delegate to the model versus to deterministic compute. The physics core isn't a weakness in the AI story — it's what keeps the agents honest.

**Utility — scope it honestly.** Orbital congestion and the cross-operator coordination gap are real and growing; there genuinely is no shared maneuvering authority across commercial constellations today. Right of Way is a *research demonstrator* of a coordination mechanism for that gap — not a flight-ready system. Claim exactly that: it credibly prototypes a mechanism for a real, unsolved coordination problem. Don't oversell.

**The failure mode to design against.** If negotiation collapses to "lowest-priority object always yields," that's an if-statement, not a multi-agent system — and a judge will say so. Include at least one scenario where the naive rule fails and real back-and-forth is required (e.g. the lowest-priority sat is out of fuel and physically cannot yield, forcing a higher-priority party to trade). That scenario is the proof the agents are load-bearing. It belongs in the demo.

---

## 1C. Roadmap — why this is a company (extendability)

The asset is not "satellites." It's the **mechanism**: decentralized negotiation between autonomous agents owned by different operators, over a shared contested space, refereed by a deterministic ground-truth verifier. That shape recurs anywhere there's no central controller and no shared objective function.

**Tier 1 — the wedge (today's demo): orbital collision avoidance.** A real market on its own — space traffic management is projected to grow from ~$15.9B (2025) to ~$44.9B (2034) (ResearchAndMarkets / GlobeNewswire, 2025), with players like Kayhan Space already shipping AI-driven collision-avoidance tooling. The decentralized angle is validated by physics, not vibes: ground-centralized avoidance can't meet emergency timescales due to uplink latency, so the field is moving toward onboard tactical autonomy (PatSnap STM landscape, 2026).

**Tier 2 — the beachhead (where the company is): drone traffic / UTM.** Bigger, sooner, and almost spookily aligned with this architecture. FAA's UTM is explicitly decentralized — multiple operators and service providers coordinate in real time via APIs with no positive air-traffic control. Part 108 enables routine BVLOS flights with up to ~100 aircraft per operation and required UTM integration, final rule landing ~2026 (FAA; UAVHQ / DroneTrust, 2026). The gap is the explicit unsolved one: today's detect-and-avoid still requires *manual* operator avoidance (GAO-26-107648, Feb 2026). Buyers already built out: Amazon Prime Air, Google Wing, Zipline, DroneUp. Same mechanism, denser problem, regulatory tailwind, real customers.

**Tier 3 — the platform (the thesis): a coordination + verification layer for multi-operator autonomous fleets.** Air (sats → drones → eVTOL), ground (cross-vendor AV intersections, multi-vendor warehouse/factory robots), sea (autonomous vessels under COLREGs), grid (distributed energy resources negotiating dispatch). The **defensible core** is constant: agents from parties who don't trust each other and won't cede control negotiate intent in language; a deterministic domain referee guarantees the deal is physically safe. As autonomous agents from different vendors proliferate, someone has to own the interoperability/trust layer between them — and it can't be a black box you have to take on faith. The verifier-as-trust-anchor is the moat.

**Founder discipline (say this, don't hide it).** "One protocol for everything" is a pitch, not a fact — each domain has its own physics and regulatory moat, and chasing all of them is how you die. The credible version names the platform vision but commits to **one** beachhead after the satellite demo. Given Part 108 timing, that beachhead is drones.

---

## 2. Interface contracts (define these FIRST — they let sessions run in parallel)

Lock these in the first 30–40 minutes. Every other session builds against the *contract*, not the running code, so nothing blocks on anything else.

**Scenario**
```
SpaceObject { id, type: "sat"|"debris", tle?: [line1, line2],
              state?: { r:[x,y,z], v:[vx,vy,vz] },
              fuel_budget_dv: float, priority: int }
Scenario   { objects: SpaceObject[], epoch: ISO8601,
             screen_window_s: int, conjunction_threshold_km: float }
```

**PhysicsCore API (the referee — deterministic, no LLM)**
```
propagate(scenario, t)                  -> states at time t
screen_conjunctions(scenario, window)   -> Conjunction[]
        Conjunction { a_id, b_id, tca, miss_distance_km, rel_speed }
apply_maneuver(scenario, obj_id, dv_vector, t_burn) -> new Scenario
```

**Negotiation messages (A2A)**
```
ManeuverProposal { proposer_id, dv_vector, t_burn, est_dv_cost, rationale }
NegotiationMsg   { from, to, type: "propose"|"counter"|"accept"|"yield", payload }
```

**Timeline (the viz contract — the run emits this; viz only plays it back)**
```
Timeline {
  meta,
  frames: [{ t, objects: [{ id, r:[x,y,z] }] }],
  events: [{ t, type: "conjunction_detected"|"proposal"|"maneuver_committed"
                      |"resolved"|"new_conjunction", data }]
}
```

**Deliverable of the contracts step:** typed definitions (pydantic + TS), a scenario generator that builds a synthetic LEO constellation with at least one *guaranteed* injected conjunction (the forced-trade scenario below), and a hand-written **sample Timeline fixture** so the viz session can start immediately with zero dependencies.

**The forced-trade scenario (non-negotiable — this is your proof of load-bearing agents):**
- `sat_A`: LOW priority, `fuel_budget_dv ≈ 0` (physically cannot maneuver).
- `sat_B`: HIGH priority, has fuel, on a near-miss course with `sat_A`.
- The naive rule "lowest priority yields" orders `sat_A` to move — but it can't — forcing `sat_B` to trade despite outranking A.
- `sat_C`: positioned so `sat_B`'s most obvious avoidance direction trends toward it → a likely *secondary* conjunction that triggers the re-negotiation beat.

---

## 3. Parallel workstreams (one per Claude Code session)

Each is self-contained against the contracts above. Kickoff prompts for all six are in the companion file. Suggested model per the slow-smart / fast-cheap split.

### WS0 — Repo + Contracts + Scenario generator
**You + Opus. Blocks everything for ~30–40 min, then unblocks all.**
Repo skeleton, the §2 contracts as code, scenario generator with the forced-trade conjunction, sample Timeline fixture, one-paragraph README "shared vocabulary."

### WS1 — Physics Core (the referee)
**Opus to design the screening + maneuver math, Sonnet to implement + test.**
Propagation, pairwise conjunction screening over the window, maneuver application. Pure, deterministic, unit-tested against the injected conjunction. **Stretch:** wrap as an MCP server exposing the three tools — earns the "MCP" line.

### WS2 — Agent + Negotiation
**Opus for the negotiation protocol + agent loop (the hard part), Sonnet for boilerplate.**
Agent harness: observe local neighborhood → reason → propose burn → negotiate → commit. Peer-to-peer A2A. Consensus that handles the forced-trade case (can't just yield-by-priority). **Hierarchical fallback** coordinator. Both behind one `topology` flag.

### WS3 — Orchestrator (integration)
**Opus or Sonnet — owns the seams.**
The run loop: step sim → detect conjunction → wake involved agents → negotiation rounds (bounded) → collect committed maneuvers → apply via PhysicsCore → **re-screen** → if new conjunction, repeat → emit Timeline + events. Round cap + fallback for graceful failure.

### WS4 — Weave (observability + eval) — your Best-Use-of-Weave play
**Sonnet, cross-cutting, once WS1–WS3 interfaces are stable.**
`@weave.op()` on every agent decision and orchestrator step. Scorers: all conjunctions resolved? new conjunctions created? total Δv? rounds-to-converge? A small **eval** comparing swarm vs hierarchical → Weave **leaderboard**. Bonus **guardrail** blocking any maneuver over an object's fuel budget. Doubles as the demo's legibility layer.

### WS5 — Visualization (decoupled via Timeline)
**Sonnet — your design edge, the crowd-winner.**
3D orbit render (react-three-fiber, or plotly for speed) that plays back the Timeline JSON: rotating constellation, conjunction flashed red, maneuver as trajectory delta, negotiation messages animating between agents, a scrubber. **Never needs the sim running — only the contract + sample fixture.** Start the moment WS0's fixture exists.

---

## 4. Hour-by-hour (11:30 build start → 8:00 final, 7:00 draft)

- **11:30–12:15** WS0: contracts + scenario gen + sample Timeline fixture. Unblocks everyone.
- **12:15** Fan out: WS1, WS2, WS5 in parallel sessions. WS5 starts immediately off the fixture.
- **~1:00** Lunch — sessions keep running; you review diffs.
- **1:30–3:30** WS3 wires WS1+WS2 together; WS5 maturing.
- **3:30–4:30** First **end-to-end on hierarchical topology** (the safe path). Prove: detect → resolve → re-screen clean. This is your floor — a demoable system.
- **4:30** Check-in: have something working. ✅
- **4:30–6:00** WS4 Weave (traces, scorers, eval, leaderboard) + attempt swarm negotiation.
- **6:00** Dinner — **lock the decision:** swarm converges → ship swarm; else ship hierarchical. Either way you have a verified, instrumented system.
- **6:00–7:00** Polish viz, record the <2-min demo, draft submission.
- **7:00** Draft due. **7:00–8:00** final integration + final submission.

**Verifier-first hedge:** the physics referee + hierarchical fallback is the guaranteed deliverable; the swarm is pure upside. You can never end the day with nothing to demo.

---

## 5. The 3-minute demo arc

1. Constellation rotating, all green. "These satellites coordinate with no ground control."
2. Inject / fast-forward to a **conjunction** — `sat_A` and `sat_B` flash red, miss distance on screen. Note A is out of fuel — the naive "low-priority yields" rule is impossible.
3. Negotiation messages fly between the agents (A2A); high-priority `sat_B` agrees to trade and commits a maneuver.
4. The referee re-screens — **and catches that B's maneuver now threatens `sat_C`.** They re-negotiate. *(This beat is the whole prize — sophistication you can see.)*
5. Orbit goes green. Cut to the **Weave trace / leaderboard**: rounds-to-converge, total Δv, swarm vs hierarchical side by side.
6. **Close (two lines, don't overclaim):** *"We're showing satellites because the constraints are unforgiving and you can see it work. But this is a coordination layer for any fleet of autonomous agents from different operators — and it's exactly what FAA's drone traffic framework needs, where the market is opening right now."*

---

## 6. Sponsor mapping

- **W&B Weave (primary — dedicated $1K prize):** WS4. Tracing, scorers, evals, leaderboard, guardrail. Deepest, most legible integration — make this real, not token.
- **MCP:** WS1 physics core as an MCP server. Named protocol in the submission.
- **A2A:** WS2 agent negotiation. Named protocol; Weave traces it.
- **Possible second sponsor tool — verify on-site:** the Reachy Mini prize suggests Hugging Face is in the room. If HF inference/models are an available sponsor tool, run one agent on an HF-hosted model to legitimately claim a second sponsor. Check the sponsor table / the API request form. Don't claim a tool you didn't actually use.

---

## 7. Code reuse

You know the room's norms better than I do — sounds like the organizer is relaxed about it in practice. The only honest caveats that survive regardless of norm: the submission asks you to describe what you built and judges may probe live, so keep the description to something you can stand behind; and the demo is judged on what's on screen, which provenance doesn't change. Patterns worth carrying in your head:
- **Wallace's Advisor/Executor split** → each agent's *propose (executor) / referee-verify (advisor)* loop.
- **Platypi permissioned context** → "each agent sees only its local neighborhood" is permissioned context by another name; a good answer if a judge asks why it scales.
