"""Two-body (Keplerian) orbital propagation — the exact, closed-form core.

Given a Cartesian state ``(r, v)`` in the ECI frame at one epoch, advance it
``dt`` seconds by solving the **universal Kepler equation** (Stumpff functions +
Newton-Raphson) and applying the Lagrange ``f``/``g`` coefficients. This is an
*exact* two-body solution — no time-stepping, so no integration error to
accumulate over a screening window — and it handles elliptic / circular /
hyperbolic orbits with one branch-free formulation. ``dt`` may be negative
(back-propagation), which ``apply_maneuver`` relies on.

Reference: Curtis, *Orbital Mechanics for Engineering Students*, Algorithm 3.4
(universal variables). We deliberately do **not** use SGP4 / Skyfield: the
scenario generator emits state vectors, so two-body from the Cartesian state is
the correct, dependency-light model. numpy only; fully deterministic.

Units (per ``row.contracts``): positions km, velocities km/s, ``dt`` seconds.
"""

from __future__ import annotations

import math
import warnings

import numpy as np

from ..contracts import State, Vec3

# Standard gravitational parameter of Earth, km^3 / s^2.
MU_EARTH = 398_600.4418

# Newton-Raphson controls for the universal Kepler equation.
_NEWTON_TOL = 1.0e-10        # convergence tolerance on the universal anomaly step
_NEWTON_MAX_ITER = 100
# Below this |z| the closed-form Stumpff expressions lose precision to
# cancellation, so we switch to their Maclaurin series.
_STUMPFF_SERIES_CUTOFF = 1.0e-3


def _stumpff_c(z: float) -> float:
    """Stumpff function C(z) = (1 - cos√z)/z, continued analytically for z<=0."""
    if z > _STUMPFF_SERIES_CUTOFF:
        sz = math.sqrt(z)
        return (1.0 - math.cos(sz)) / z
    if z < -_STUMPFF_SERIES_CUTOFF:
        sz = math.sqrt(-z)
        return (math.cosh(sz) - 1.0) / (-z)
    # |z| small: Maclaurin series  1/2 - z/24 + z^2/720 - z^3/40320 + ...
    return 0.5 - z / 24.0 + z * z / 720.0 - z * z * z / 40320.0


def _stumpff_s(z: float) -> float:
    """Stumpff function S(z) = (√z - sin√z)/√z^3, continued analytically for z<=0."""
    if z > _STUMPFF_SERIES_CUTOFF:
        sz = math.sqrt(z)
        return (sz - math.sin(sz)) / (sz * sz * sz)
    if z < -_STUMPFF_SERIES_CUTOFF:
        sz = math.sqrt(-z)
        return (math.sinh(sz) - sz) / (sz * sz * sz)
    # |z| small: Maclaurin series  1/6 - z/120 + z^2/5040 - z^3/362880 + ...
    return (1.0 / 6.0) - z / 120.0 + z * z / 5040.0 - z * z * z / 362880.0


def propagate_rv(
    r0: np.ndarray, v0: np.ndarray, dt: float, mu: float = MU_EARTH
) -> tuple[np.ndarray, np.ndarray]:
    """Propagate a Cartesian state ``dt`` seconds under two-body gravity.

    Args:
        r0: initial position, km (array-like, shape (3,)).
        v0: initial velocity, km/s (array-like, shape (3,)).
        dt: elapsed time in seconds. May be negative (back-propagation).
        mu: gravitational parameter, km^3/s^2.

    Returns:
        ``(r, v)`` as float ``np.ndarray`` of shape (3,) at time ``dt``.
    """
    r0 = np.asarray(r0, dtype=float)
    v0 = np.asarray(v0, dtype=float)
    if dt == 0.0:
        return r0.copy(), v0.copy()

    sqrt_mu = math.sqrt(mu)
    r0mag = float(np.linalg.norm(r0))
    v0mag = float(np.linalg.norm(v0))
    vr0 = float(np.dot(r0, v0)) / r0mag
    # Reciprocal of semimajor axis: >0 ellipse/circle, =0 parabola, <0 hyperbola.
    alpha = 2.0 / r0mag - v0mag * v0mag / mu

    # Initial guess for the universal anomaly (sign follows dt).
    chi = sqrt_mu * abs(alpha) * dt

    for _ in range(_NEWTON_MAX_ITER):
        z = alpha * chi * chi
        c = _stumpff_c(z)
        s = _stumpff_s(z)
        chi2 = chi * chi
        chi3 = chi2 * chi
        # Universal Kepler equation residual F(chi) and its derivative.
        f = (
            (r0mag * vr0 / sqrt_mu) * chi2 * c
            + (1.0 - alpha * r0mag) * chi3 * s
            + r0mag * chi
            - sqrt_mu * dt
        )
        df = (
            (r0mag * vr0 / sqrt_mu) * chi * (1.0 - alpha * chi2 * s)
            + (1.0 - alpha * r0mag) * chi2 * c
            + r0mag
        )
        dchi = f / df
        chi -= dchi
        if abs(dchi) < _NEWTON_TOL:
            break
    else:
        # Never converged (loop ran out without break). Unreachable for the
        # near-circular LEO states this demo uses, but fail loudly rather than
        # return a plausible-looking wrong state for exotic inputs.
        warnings.warn(
            f"universal-variable Kepler solve did not converge in "
            f"{_NEWTON_MAX_ITER} iterations (final |dchi|={abs(dchi):.2e}); "
            "returned state may be inaccurate.",
            RuntimeWarning,
            stacklevel=2,
        )

    z = alpha * chi * chi
    c = _stumpff_c(z)
    s = _stumpff_s(z)
    chi2 = chi * chi
    chi3 = chi2 * chi

    # Lagrange coefficients give the new position from r0, v0.
    f_l = 1.0 - (chi2 / r0mag) * c
    g_l = dt - (chi3 / sqrt_mu) * s
    r = f_l * r0 + g_l * v0
    rmag = float(np.linalg.norm(r))

    fdot = (sqrt_mu / (rmag * r0mag)) * (alpha * chi3 * s - chi)
    gdot = 1.0 - (chi2 / rmag) * c
    v = fdot * r0 + gdot * v0

    return r, v


def propagate_state(state: State, dt: float, mu: float = MU_EARTH) -> State:
    """Propagate a contracts ``State`` ``dt`` seconds; return a new ``State``."""
    r, v = propagate_rv(np.asarray(state.r), np.asarray(state.v), dt, mu)
    r_t: Vec3 = (float(r[0]), float(r[1]), float(r[2]))
    v_t: Vec3 = (float(v[0]), float(v[1]), float(v[2]))
    return State(r=r_t, v=v_t)
