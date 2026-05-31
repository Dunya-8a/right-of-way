"""Two-body Kepler propagation — math for the WS3 reference physics double.

NOT the real physics core. WS1 owns the production propagator (sgp4 / Skyfield /
higher-fidelity two-body). This exists only so the orchestrator runs end-to-end
today against a deterministic, dependency-free referee. Universal-variable
formulation (Vallado / Bate-Mueller-White) so it handles circular, elliptical,
and (post-burn) eccentric orbits uniformly, and negative dt (back-propagation).

Units: km, km/s, seconds. Earth-centered inertial.
"""

from __future__ import annotations

import math
import warnings

from ..contracts import Vec3

MU_EARTH = 398_600.4418  # km^3 / s^2


def add(a: Vec3, b: Vec3) -> Vec3:
    return (a[0] + b[0], a[1] + b[1], a[2] + b[2])


def sub(a: Vec3, b: Vec3) -> Vec3:
    return (a[0] - b[0], a[1] - b[1], a[2] - b[2])


def scale(a: Vec3, k: float) -> Vec3:
    return (a[0] * k, a[1] * k, a[2] * k)


def dot(a: Vec3, b: Vec3) -> float:
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]


def cross(a: Vec3, b: Vec3) -> Vec3:
    return (
        a[1] * b[2] - a[2] * b[1],
        a[2] * b[0] - a[0] * b[2],
        a[0] * b[1] - a[1] * b[0],
    )


def norm(a: Vec3) -> float:
    return math.sqrt(dot(a, a))


def unit(a: Vec3) -> Vec3:
    n = norm(a)
    return scale(a, 1.0 / n) if n else a


def _stumpff_c(z: float) -> float:
    if z > 1e-6:
        sz = math.sqrt(z)
        return (1.0 - math.cos(sz)) / z
    if z < -1e-6:
        sz = math.sqrt(-z)
        return (math.cosh(sz) - 1.0) / (-z)
    return 0.5 - z / 24.0 + z * z / 720.0  # series near 0


def _stumpff_s(z: float) -> float:
    if z > 1e-6:
        sz = math.sqrt(z)
        return (sz - math.sin(sz)) / (sz ** 3)
    if z < -1e-6:
        sz = math.sqrt(-z)
        return (math.sinh(sz) - sz) / (sz ** 3)
    return 1.0 / 6.0 - z / 120.0 + z * z / 5040.0  # series near 0


def kepler(r0: Vec3, v0: Vec3, dt: float, mu: float = MU_EARTH) -> tuple[Vec3, Vec3]:
    """Propagate state (r0, v0) by ``dt`` seconds under two-body gravity.

    Returns the new (r, v). Works for dt of either sign.
    """
    if dt == 0.0:
        return r0, v0

    sqrt_mu = math.sqrt(mu)
    r0n = norm(r0)
    v0n = norm(v0)
    vr0 = dot(r0, v0) / r0n
    alpha = 2.0 / r0n - v0n * v0n / mu  # reciprocal of semi-major axis (1/a)

    # Initial guess for the universal anomaly chi.
    if alpha > 1e-9:  # ellipse / circle
        chi = sqrt_mu * dt * alpha
    elif alpha < -1e-9:  # hyperbola
        a = 1.0 / alpha
        sign = math.copysign(1.0, dt)
        chi = sign * math.sqrt(-a) * math.log(
            (-2.0 * mu * alpha * dt)
            / (dot(r0, v0) + sign * math.sqrt(-mu * a) * (1.0 - r0n * alpha))
        )
    else:  # near-parabolic
        chi = sqrt_mu * abs(dt) / r0n * math.copysign(1.0, dt)

    # Newton-Raphson on the universal Kepler equation.
    converged = False
    for _ in range(200):
        z = alpha * chi * chi
        c = _stumpff_c(z)
        s = _stumpff_s(z)
        r = (
            chi * chi * c
            + (vr0 / sqrt_mu) * chi * (1.0 - z * s)
            + r0n * (1.0 - z * c)
        )
        f_chi = (
            (r0n * vr0 / sqrt_mu) * chi * chi * c
            + (1.0 - alpha * r0n) * chi ** 3 * s
            + r0n * chi
            - sqrt_mu * dt
        )
        dchi = f_chi / r
        chi -= dchi
        if abs(dchi) < 1e-9:
            converged = True
            break
    if not converged:
        warnings.warn(
            f"kepler: universal-anomaly Newton iteration did not converge "
            f"(dt={dt}, alpha={alpha:.3e}); propagated state may be inaccurate.",
            RuntimeWarning,
            stacklevel=2,
        )

    z = alpha * chi * chi
    c = _stumpff_c(z)
    s = _stumpff_s(z)
    f = 1.0 - chi * chi / r0n * c
    g = dt - chi ** 3 / sqrt_mu * s
    r_vec = add(scale(r0, f), scale(v0, g))
    rn = norm(r_vec)
    fdot = sqrt_mu / (rn * r0n) * (alpha * chi ** 3 * s - chi)
    gdot = 1.0 - chi * chi / rn * c
    v_vec = add(scale(r0, fdot), scale(v0, gdot))
    return r_vec, v_vec
