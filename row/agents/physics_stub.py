"""Right of Way — WS2 StubPhysics: a scripted PhysicsCore stand-in (NOT real physics).

This exists ONLY so the agent layer can be exercised end-to-end before WS1's real
core lands and without WS3's run loop. It is duck-typed to the PhysicsCore seam
(``propagate`` / ``screen_conjunctions`` / ``apply_maneuver``) and reproduces the
documented forced-trade arc:

  screen -> primary A/B conjunction
  (designated mover burns)
  screen -> secondary B/C conjunction   (B's dodge trended toward C)
  (a party to B/C burns)
  screen -> clear

It is a *pure* model: ``apply_maneuver`` returns a new Scenario with the mover's
fuel reduced and never mutates internal state, and ``screen_conjunctions`` decides
which conjunction is active purely from how each object's fuel compares to its
original budget. That purity matters: the negotiator's verify step calls
apply+screen on throwaway candidate scenarios, and must not perturb the demo's
own world. WS1's real core replaces this wholesale.
"""

from __future__ import annotations

from typing import Optional

from row.contracts import Conjunction, Scenario, State, Vec3

from .geometry import norm

_EPS = 1e-9


class StubPhysics:
    def __init__(
        self,
        scenario: Scenario,
        primary: Conjunction,
        secondary: Optional[Conjunction] = None,
        secondary_trigger: Optional[str] = None,
    ) -> None:
        self._orig_fuel = {o.id: o.fuel_budget_dv for o in scenario.objects}
        self._primary = primary
        self._secondary = secondary
        # Which object's burn "creates" the secondary (defaults to secondary.a_id).
        self._secondary_trigger = secondary_trigger or (
            secondary.a_id if secondary else None
        )

    # -- seam: propagation (no real orbital math; epoch states stand in) ----
    def propagate(self, scenario: Scenario, t: float) -> dict[str, State]:
        return {o.id: o.state for o in scenario.objects if o.state is not None}

    # -- seam: maneuver application (pure; reduces mover fuel) --------------
    def apply_maneuver(
        self, scenario: Scenario, obj_id: str, dv_vector: Vec3, t_burn: float
    ) -> Scenario:
        new = scenario.model_copy(deep=True)
        cost = norm(dv_vector)
        for o in new.objects:
            if o.id == obj_id:
                o.fuel_budget_dv = max(o.fuel_budget_dv - cost, 0.0)
        return new

    # -- seam: conjunction screening (scripted by fuel deltas) -------------
    def _burned(self, scenario: Scenario, oid: str) -> bool:
        cur = next((o.fuel_budget_dv for o in scenario.objects if o.id == oid), None)
        orig = self._orig_fuel.get(oid)
        return cur is not None and orig is not None and cur < orig - _EPS

    def screen_conjunctions(self, scenario: Scenario, window: int) -> list[Conjunction]:
        p = self._primary
        if not (self._burned(scenario, p.a_id) or self._burned(scenario, p.b_id)):
            return [p]  # primary still open
        s = self._secondary
        if s is not None and self._secondary_trigger is not None:
            trig = self._secondary_trigger
            other = s.b_id if trig == s.a_id else s.a_id
            # Secondary is "armed" once the trigger has burned, and clears once
            # the other party has burned to resolve it.
            if self._burned(scenario, trig) and not self._burned(scenario, other):
                return [s]
        return []  # provably clear
