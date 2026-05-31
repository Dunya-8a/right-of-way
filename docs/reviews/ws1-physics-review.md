---
created: 2026-05-31
status: reference
author: code-reviewer agent (triaged by Claude WS1 session)
session: WS1 physics
branch: ws1-physics
informed_by: WS1 PhysicsCore implementation, ROW build spec, contracts.py
notes: Pre-merge review of the WS1 physics core. All findings ADDRESSED before commit; kept for the verification reasoning (why the two-body math is trustworthy).
---

# WS1 PhysicsCore — Pre-Merge Review (resolved)

Reviewed before merging `ws1-physics`. The orbital math was confirmed correct;
three minor findings were raised and **all three were fixed before the commit**.
Kept as a committed reference because the "Confirmed correct" section documents
*why* the propagation/screening/maneuver code is trustworthy — useful if a judge
or a later session probes the physics. Tests: 12 passing.

## Findings — all addressed

- [x] **Finding 1 (Important) — silent Newton-Raphson non-convergence**
  (`propagation.py`). The universal-Kepler NR loop could exhaust
  `_NEWTON_MAX_ITER` and silently return a wrong state. **Fixed:** added a
  `for/else` that emits a `RuntimeWarning` on non-convergence. (Unreachable for
  the near-circular LEO states in `generate_scenario()` — converges in 4–9 iters
  — but now fails loudly for exotic inputs instead of returning garbage.)

- [x] **Finding 2 (Suggestion) — fuel could go sub-nanometer negative**
  (`core.py`). A burn accepted at the `_FUEL_TOL` margin charged full `|dv|`,
  leaving a ~ -5e-10 km/s balance a downstream `fuel > 0` check could misread.
  **Fixed:** `fuel_budget_dv = max(0.0, fuel_budget_dv - |dv|)`.

- [x] **Finding 3 (Suggestion) — no test for `apply_maneuver` at `t_burn > 0`**
  (`tests/test_physics.py`). All maneuver tests used `t_burn=0.0`, which
  short-circuits the propagate→burn→back-propagate path. **Fixed:** added
  `test_apply_maneuver_at_nonzero_t_burn_shifts_velocity_there` — burns sat_B at
  `t_burn=300` and asserts position is continuous there while velocity changes by
  exactly `dv` (not at the epoch).

## Confirmed correct — no action needed (verification record)

**Propagation (`propagation.py`)**
- Stumpff C/S formulas + Maclaurin series coefficients are textbook-correct
  (Curtis Alg. 3.4); the `|z| < 1e-3` series cutoff introduces a discontinuity of
  ~1.9e-14, below machine epsilon.
- Initial guess `chi0 = sqrt_mu·|alpha|·dt` is correct for elliptic, self-bootstraps
  for parabolic (alpha≈0), and correct for hyperbolic (sign carried by `dt`).
- `dt = 0` early return is correct (also handles `-0.0`).
- Lagrange identity `f·gdot − fdot·g = 1` holds to machine precision; `fdot`
  formula verified algebraically equivalent to the common form.
- Energy and angular-momentum drift < 1e-6 over multi-orbit propagation;
  round-trip back-propagation error < 1e-6 km.

**Screening (`screening.py`)**
- `<=` in the local-minimum test is load-bearing (handles flat/equal adjacent
  coarse samples so a narrow fast crossing is still bracketed).
- Endpoint handling (`k==0` / `k==m-1`) correct for approaches at window edges.
- No late-binding closure bug in `sep_at` (defined and called synchronously in the
  same pair iteration).
- Golden-section unimodality holds: each bracket spans ≤ 2·coarse_step = 10 s; two
  LEO objects can't have two complete approaches within 10 s.
- "Deepest per pair" tracking + final sort by `(tca, miss)` is fully deterministic
  given fixed `scenario.objects` order.

**Maneuver (`core.py`)**
- Purity confirmed: `model_copy(deep=True[, update=...])` throughout; input scenario
  never mutated.
- Fuel refusal uses `>` (a burn equal to the exact budget is allowed); `_FUEL_TOL`
  (1 nm/s) correctly swallows `np.linalg.norm` rounding.
- Back-propagation `propagate_rv(r_burn, v_burn_new, -t_burn)` exactly inverts the
  forward step (round-trip < 1e-6 km).

**Tests** — tolerances appropriately tight (1e-6 km radius, 1e-9 km/s velocity,
0.01 km miss, 0.5 s TCA); tests are load-bearing (would fail if the code were a
no-op or had the wrong sign).
