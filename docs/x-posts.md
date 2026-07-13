---
created: 2026-07-12
status: active
author: Claude main session (right-of-way#1c4039f7)
session: 1c4039f7-9715-4fc6-8f4a-ed545fddc13a
branch: main
informed_by: product-strategist brainstorm (this session), docs/SUBMISSION.md taglines, README.md positioning, the shipped demos (aeolus / liar / live VELOX-I run), PROTOCOL.md
notes: Working drafts for the X launch posts. Anchor = the real VELOX-I conjunction from --scenario live. Earlier drafts preserved at the bottom. Re-roll --scenario live the day of posting so the conjunction is current.
---

# X post drafts — Right of Way

**The anchor: the VELOX-I run is real.** `--scenario live` pulled it from
CelesTrak SOCRATES: STARLINK-3068 and VELOX-I (a defunct Singapore nanosat,
dead for years) predicted to pass **~18 meters** apart, TCA 2026-07-13 08:31
UTC, max collision probability ~1.8e-1. Our agents settled it in one round:
Starlink concedes (the dead sat physically can't move) and burns 45 m/s.

> ⚠️ Before posting: re-run `uv run python -m row.orchestrator --scenario live
> --topology swarm` so the featured conjunction is from *that day*, re-bundle
> `timeline-live.json`, and update the numbers below. Never claim the sats
> "will collide" — say "predicted to pass within X m (CelesTrak SOCRATES)".

---

## Post 1 — the thread (VELOX anchor → Aeolus story → clip)

**Tweet 1 (hook — real, checkable, today):**

> Sometime tomorrow morning, a Starlink satellite is predicted to pass ~18
> meters from VELOX-I — a dead Singaporean nanosat that hasn't answered
> commands in years. (Real conjunction, on CelesTrak's books right now.)
>
> Dead satellites can't negotiate. So I built agents that do. 🧵

**Tweet 2 (the clip — Aeolus or the live run):**

> There's no air-traffic control in orbit. In 2019, ESA and SpaceX
> coordinated a near-collision **by email** — SpaceX missed the thread due to
> a paging bug, and a €480M science mission dodged a Starlink.
>
> Here's that incident, re-run: Claude agents negotiate who moves, in plain
> English, while a physics engine referees every deal.
>
> [30s clip]

**Tweet 3 (the mechanism — for the AI crowd):**

> The interesting part isn't the satellites — it's the judge.
>
> LLM-as-judge can be sweet-talked. Orbital mechanics can't. No agreement
> counts until a deterministic referee confirms the burn actually clears —
> and if the dodge creates a NEW near-miss, the agents get thrown back to
> the table.

**Tweet 4 (the lie — the kicker):**

> We tested it adversarially: told one satellite (with 40 m/s of fuel) to
> claim it couldn't move. The other agent fell for it and offered to burn.
>
> The referee didn't: "ground truth shows 40 m/s of Δv available. Claim
> rejected." The liar ended up making the maneuver.
>
> Agents can lie to each other. They can't lie to physics.

**Tweet 5 (the ask):**

> It's a protocol, not just a demo — spec'd domain-independently (drones,
> ships, any fleet with no central boss) with the orbital sim as reference
> implementation. Open source, MIT:
>
> github.com/Dunya-8a/right-of-way
>
> Built in a day at [hackathon], polished since. Second implementations
> welcome.

---

## Post 2 (a few days later) — the living-demo follow-up

> Update: Right of Way now negotiates *the actual conjunctions on this
> week's books*. Every run pulls CelesTrak SOCRATES's latest predicted
> close approaches, seeds the world from live TLEs, and the agents settle
> whichever pair the physics referee re-confirms.
>
> Today it was [X] vs [Y], predicted [Z] m apart on [date]. [screenshot]
>
> `python -m row.orchestrator --scenario live`

---

## Alternate hooks (if the VELOX open doesn't land in testing)

- **The email angle first:** "In 2019, the way two spacecraft operators
  avoided a collision was *email*. One side missed the thread because of a
  paging bug. It's 2026 and that's still the state of the art. So I gave the
  satellites a group chat — with a physics engine as referee."
- **The group-chat original (from the hackathon submission):** "There's no
  air-traffic control in space. So when two satellites are on a collision
  course, our AI agents argue it out themselves — peer-to-peer, no one in
  charge — while a physics engine referees the deal before anyone burns
  fuel."
- **The eval-first angle:** "An agent benchmark where the judge is physics,
  not vibes: LLM satellites negotiate collision avoidance; a deterministic
  orbital-mechanics referee rejects any deal that doesn't actually clear;
  and when an agent lies about its fuel, the referee catches it."

---

## Clip recording checklist

1. `cd web/dist && python3 -m http.server 8823` (or `pnpm dev` in `web/`).
2. Open `http://localhost:8823/?clean&autoplay` — chrome hidden, story
   starts by itself. Variants: `&timeline=live`, `&timeline=liar`.
3. Keep the tab focused (background tabs pause the animation).
4. Speed 30× ≈ 50 s full arc; 60× ≈ 28 s (speed also paces the captions).
   For X, 60× is the right cut; record at 30× if you want to trim manually.
5. The arc: invite caption → COLLISION COURSE → the negotiation bubbles →
   ⚖ referee verify → BURN → (Aeolus: done / forced-trade: NEW NEAR-MISS →
   round 2) → ALL CLEAR → RESOLVED card. End the clip ~1.5 s after the card.
6. Screenshot stills for the thread: scrub to mid-negotiation (the comms
   panel full), and the RESOLVED card.

## Earlier drafts (preserved)

**Short single-tweet (pre-Aeolus, from this session's first pass):**

> There's no air-traffic control in space. So we gave satellites a group
> chat. 🛰️ When two sats drift onto a collision course, AI agents negotiate
> who dodges — peer-to-peer, no one in charge — while a physics engine
> referees every deal. When the dodge creates a *new* near-miss, they go
> back to the table. Built at a 1-day hackathon. Open source:
> github.com/Dunya-8a/right-of-way

**Thread opener with the forced-trade twist (pre-Aeolus):**

> The rule in orbit is "lowest priority yields." So we broke it: the
> low-priority sat is out of fuel and physically can't move. Nobody
> hard-coded what happens next — sat_A says "I can't move," and sat_B
> *concedes right-of-way and takes the burn*. A test proves giving sat_A
> fuel flips who moves. Negotiation, not an if-statement.

**Hackathon submission tagline (docs/SUBMISSION.md):**

> There's no air-traffic control in space. So when two satellites are on a
> collision course, our AI agents argue it out themselves — peer-to-peer, no
> one in charge — while a physics engine referees the deal before anyone
> burns fuel.
