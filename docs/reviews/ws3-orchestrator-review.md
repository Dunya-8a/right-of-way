---
created: 2026-05-31
status: active
author: code-reviewer agent (triaged + resolved by Claude WS3 session)
branch: ws3-orch
informed_by: review of the WS3 orchestrator (loop.py, _kepler.py, _doubles.py, emit.py)
notes: WS3 orchestrator code review. All findings addressed; checklist of fixes + the items WS1/WS2 must honor at integration.
---

# WS3 orchestrator — code review (resolved)

Reviewer verdict: pipeline structurally sound, forced-trade demo runs correctly
end-to-end. Findings below; all addressed in WS3, with two items flagged for
WS1/WS2 to honor at integration.

## Critical
- [x] **C1 — Baked burns corrupt pre-burn positions; post-commit screening could
  misanalyze a conjunction with `tca < t_burn`.** Fixed in `loop.py`: after each
  `screen_conjunctions`, drop conjunctions with `tca <= last_commit_t` (they're in
  the committed past and can't be maneuvered away anyway).
- [x] **C2 — `fuel_budget_dv` never decremented → a sat could overdraft across
  iterations.** Fixed in `_doubles.py` `apply_maneuver`: spend `|dv|` from the
  mover's budget in the returned Scenario. Regression test added.
  **⚠️ WS1 integration:** the real `PhysicsCore.apply_maneuver` MUST also return a
  Scenario with the mover's `fuel_budget_dv` reduced by `|dv|`, or multi-burn
  budgeting breaks. (Now stated in `docs/decisions.md`.)

## Important
- [x] **I1 — `chi_prev` dead code; silent non-convergence in Kepler Newton loop.**
  Removed `chi_prev`; added a `RuntimeWarning` if the 200-iter loop doesn't
  converge. Tests run clean under `-W error::RuntimeWarning`.
- [x] **I2 — `screen_conjunctions` finds only the nearest TCA per pair.** Documented
  the assumption (one approach per pair while `screen_window_s` < orbital period,
  ~5677 s; demo uses 3600 s). **WS1's real screener should find all local minima**
  for longer windows.
- [x] **I3 — `build_timeline` off-by-one: last frame fell short of the horizon.**
  Fixed: guarantee a frame exactly at `horizon_s`; regression test added.
- [x] **I4 — `NegotiationContext.scenario` not defensively copied.** Fixed: hand the
  negotiator a `model_copy(deep=True)` so a buggy WS2 agent can't corrupt the
  loop's working scenario.

## Suggestions
- [x] **S1 — screen times skipped the window endpoint when not divisible by step.**
  Fixed (append the endpoint).
- [x] **S2 — re-detected pair indistinguishable from first detection.** Added a
  `retry` flag in the event `data` (no schema change; open dict).
- [x] **S3 / S4 — clarifying comments** on sorted-anchor reliance (`emit.py`) and
  the magnitude-loop `break` (`_doubles.py`).

## Not changed (by design)
- Reference doubles (`KeplerPhysics`, reference negotiators) are intentionally
  simple placeholders; WS1/WS2 replace them behind the interfaces.
