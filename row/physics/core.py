"""``PhysicsCore`` — the deterministic orbital referee (WS1 implementation).

No LLM ever lives here. The three methods are pure and deterministic: same
inputs -> same outputs, no wall-clock, no randomness, and the input ``Scenario``
is never mutated (``apply_maneuver`` returns a new one).

  - ``propagate``          : two-body Keplerian state of every object at time t.
  - ``screen_conjunctions``: pairwise close-approach detection over a window.
  - ``apply_maneuver``     : impulsive burn -> a new post-burn ``Scenario``.

Units (per ``row.contracts``): km, km/s, seconds since the scenario epoch.
"""

from __future__ import annotations

import numpy as np

from ..contracts import Conjunction, Scenario, State, Vec3
from .propagation import MU_EARTH, propagate_rv, propagate_state
from .screening import DEFAULT_COARSE_STEP_S
from .screening import screen_conjunctions as _screen_conjunctions

# Tolerance (km/s) so a burn whose magnitude equals the remaining budget exactly
# is not rejected by floating-point noise.
_FUEL_TOL = 1.0e-9


class PhysicsCore:
    """Stateless deterministic referee. Construct once; methods take a Scenario."""

    def propagate(self, scenario: Scenario, t: float) -> dict[str, State]:
        """Return each object's ``State`` at ``t`` seconds after the epoch.

        Two-body Keplerian propagation from each object's Cartesian epoch state.
        Treats ``scenario`` as read-only.
        """
        out: dict[str, State] = {}
        for obj in scenario.objects:
            if obj.state is None:
                raise ValueError(
                    f"object {obj.id!r} has no Cartesian state; physics core "
                    "needs state vectors (it does not consume TLEs)."
                )
            out[obj.id] = propagate_state(obj.state, t)
        return out

    def screen_conjunctions(
        self, scenario: Scenario, window: int
    ) -> list[Conjunction]:
        """Find all pairwise close approaches within the next ``window`` seconds.

        One ``Conjunction`` per offending pair (its deepest approach), with a
        refined TCA, miss distance, and relative speed. Empty list => provably
        clear over the window. Read-only on ``scenario``.
        """
        return _screen_conjunctions(scenario, window, DEFAULT_COARSE_STEP_S)

    def apply_maneuver(
        self, scenario: Scenario, obj_id: str, dv_vector: Vec3, t_burn: float
    ) -> Scenario:
        """Return a NEW scenario with an impulsive ``dv_vector`` applied to
        ``obj_id`` at ``t_burn``.

        Procedure: propagate the object to ``t_burn``, add ``dv_vector`` to its
        velocity, then back-propagate the post-burn state to the epoch so the
        rest of the pipeline can keep treating ``t=0`` as the epoch and re-screen
        the post-burn trajectory directly. Fuel is charged: ``fuel_budget_dv`` is
        reduced by ``|dv_vector|``, and the burn is **refused** (``ValueError``)
        if ``|dv_vector|`` exceeds the object's remaining budget.

        Does not mutate ``scenario``.

        Note (two-body limitation): because the post-burn orbit is re-expressed
        at the epoch, the returned scenario describes the object on its *post-burn*
        orbit for all t — including t < t_burn. The intended use is re-screening
        the future (t >= t_burn), where this is exact; callers that render the
        pre-burn arc should propagate the pre-burn scenario up to t_burn and
        switch at the burn.
        """
        dv = np.asarray(dv_vector, dtype=float)
        dv_mag = float(np.linalg.norm(dv))

        target = next((o for o in scenario.objects if o.id == obj_id), None)
        if target is None:
            raise ValueError(f"unknown object {obj_id!r} in scenario")
        if target.state is None:
            raise ValueError(
                f"object {obj_id!r} has no Cartesian state to maneuver."
            )
        if dv_mag > target.fuel_budget_dv + _FUEL_TOL:
            raise ValueError(
                f"maneuver |dv|={dv_mag:.6f} km/s exceeds {obj_id!r} fuel budget "
                f"{target.fuel_budget_dv:.6f} km/s"
            )

        # Post-burn state at t_burn, then back-propagate to the epoch.
        r_burn, v_burn = propagate_rv(
            np.asarray(target.state.r), np.asarray(target.state.v), t_burn
        )
        v_burn_new = v_burn + dv
        r0_new, v0_new = propagate_rv(r_burn, v_burn_new, -t_burn)
        new_state = State(
            r=(float(r0_new[0]), float(r0_new[1]), float(r0_new[2])),
            v=(float(v0_new[0]), float(v0_new[1]), float(v0_new[2])),
        )

        new_objects = []
        for obj in scenario.objects:
            if obj.id == obj_id:
                new_objects.append(
                    obj.model_copy(
                        deep=True,
                        update={
                            "state": new_state,
                            # max(0, ...): a burn accepted at the _FUEL_TOL margin
                            # must not leave a tiny negative budget that a
                            # downstream `fuel > 0` check would misread.
                            "fuel_budget_dv": max(0.0, obj.fuel_budget_dv - dv_mag),
                        },
                    )
                )
            else:
                new_objects.append(obj.model_copy(deep=True))

        return scenario.model_copy(deep=True, update={"objects": new_objects})


__all__ = ["PhysicsCore", "MU_EARTH"]
