"""Conjunction screening — find pairwise close approaches over a time window.

Strategy (sample-and-refine, the standard conjunction-assessment pattern):

  1. Coarsely sample the window at ``coarse_step_s`` and propagate every object
     to each sample time (each object is propagated once per sample, then shared
     across all pairs).
  2. For each pair, build the separation-vs-time series and find every local
     minimum (the basins where the two objects are approaching then receding).
  3. Refine each basin with a golden-section search to pin the true time of
     closest approach (TCA) and the true miss distance — the coarse grid only
     needs to *bracket* a basin, not resolve it, because the separation function
     is smooth and unimodal near each minimum.
  4. Emit one ``Conjunction`` per pair whose deepest refined miss distance is
     ``<= scenario.conjunction_threshold_km``.

Why refine: at LEO the relative speed at a crossing is ~10 km/s, so the window
in which two objects sit under a 5 km threshold can be well under a second —
narrower than any affordable coarse step. We therefore never threshold the
coarse samples; we threshold the *refined* minimum. Fully deterministic.
"""

from __future__ import annotations

import math
from typing import Callable

import numpy as np

from ..contracts import Conjunction, Scenario, State
from .propagation import propagate_state

# Default coarse sampling step (seconds). Fine enough to bracket every LEO
# close-approach basin; the refinement does the precision work.
DEFAULT_COARSE_STEP_S = 5.0

# Golden-section refinement tolerance on TCA (seconds).
_REFINE_TOL_S = 1.0e-3
_REFINE_MAX_ITER = 200
_INV_PHI = (math.sqrt(5.0) - 1.0) / 2.0  # 0.618...


def _state_at(scenario: Scenario, obj_id: str, t: float) -> State:
    obj = next(o for o in scenario.objects if o.id == obj_id)
    if obj.state is None:
        raise ValueError(
            f"object {obj_id!r} has no Cartesian state; physics core needs "
            "state vectors (it does not consume TLEs)."
        )
    return propagate_state(obj.state, t)


def _golden_min(
    f: Callable[[float], float], lo: float, hi: float
) -> tuple[float, float]:
    """Golden-section minimisation of a unimodal ``f`` on ``[lo, hi]``.

    Returns ``(t_min, f(t_min))``.
    """
    a, b = lo, hi
    c = b - _INV_PHI * (b - a)
    d = a + _INV_PHI * (b - a)
    fc, fd = f(c), f(d)
    for _ in range(_REFINE_MAX_ITER):
        if (b - a) < _REFINE_TOL_S:
            break
        if fc < fd:
            b, d, fd = d, c, fc
            c = b - _INV_PHI * (b - a)
            fc = f(c)
        else:
            a, c, fc = c, d, fd
            d = a + _INV_PHI * (b - a)
            fd = f(d)
    t_min = 0.5 * (a + b)
    return t_min, f(t_min)


def screen_conjunctions(
    scenario: Scenario,
    window: int,
    coarse_step_s: float = DEFAULT_COARSE_STEP_S,
) -> list[Conjunction]:
    """Return one ``Conjunction`` per pair whose closest approach over ``[0, window]``
    is at/under ``scenario.conjunction_threshold_km``.

    See module docstring for the sample-and-refine algorithm.
    """
    threshold = scenario.conjunction_threshold_km
    objs = [o for o in scenario.objects]
    n = len(objs)
    if n < 2 or window <= 0:
        return []

    # 1) Coarse sample grid (inclusive of the window endpoint).
    n_steps = max(1, int(math.ceil(window / coarse_step_s)))
    times = [min(window, i * coarse_step_s) for i in range(n_steps + 1)]
    if times[-1] != window:
        times.append(float(window))

    # 2) Propagate every object to every sample time once; cache positions.
    #    positions[obj_id] -> ndarray of shape (len(times), 3)
    positions: dict[str, np.ndarray] = {}
    for o in objs:
        if o.state is None:
            raise ValueError(
                f"object {o.id!r} has no Cartesian state; physics core needs "
                "state vectors (it does not consume TLEs)."
            )
        pts = np.empty((len(times), 3), dtype=float)
        for k, t in enumerate(times):
            st = propagate_state(o.state, t)
            pts[k] = st.r
        positions[o.id] = pts

    conjunctions: list[Conjunction] = []

    # 3) For each unordered pair, find + refine the deepest approach.
    for i in range(n):
        for j in range(i + 1, n):
            a_id, b_id = objs[i].id, objs[j].id
            sep = np.linalg.norm(positions[a_id] - positions[b_id], axis=1)

            # Indices that are local minima of the coarse separation series
            # (endpoints count if they slope inward).
            candidate_idx: list[int] = []
            m = len(sep)
            for k in range(m):
                left_ok = k == 0 or sep[k] <= sep[k - 1]
                right_ok = k == m - 1 or sep[k] <= sep[k + 1]
                if left_ok and right_ok:
                    candidate_idx.append(k)

            def sep_at(t: float) -> float:
                ra = _state_at(scenario, a_id, t).r
                rb = _state_at(scenario, b_id, t).r
                return float(
                    math.dist(ra, rb)  # exact Euclidean distance of 3-tuples
                )

            best_tca: float | None = None
            best_miss = float("inf")
            for k in candidate_idx:
                lo = times[max(0, k - 1)]
                hi = times[min(m - 1, k + 1)]
                if hi <= lo:  # degenerate single-sample bracket
                    t_ref, miss_ref = times[k], float(sep[k])
                else:
                    t_ref, miss_ref = _golden_min(sep_at, lo, hi)
                if miss_ref < best_miss:
                    best_miss = miss_ref
                    best_tca = t_ref

            if best_tca is not None and best_miss <= threshold:
                # Relative speed at TCA from the propagated velocities.
                sa = _state_at(scenario, a_id, best_tca)
                sb = _state_at(scenario, b_id, best_tca)
                rel_v = np.asarray(sa.v) - np.asarray(sb.v)
                conjunctions.append(
                    Conjunction(
                        a_id=a_id,
                        b_id=b_id,
                        tca=float(best_tca),
                        miss_distance_km=float(best_miss),
                        rel_speed=float(np.linalg.norm(rel_v)),
                    )
                )

    # Deterministic ordering: soonest (then closest) first.
    conjunctions.sort(key=lambda c: (c.tca, c.miss_distance_km))
    return conjunctions
