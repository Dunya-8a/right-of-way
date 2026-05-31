"""Right of Way — PhysicsCore: the deterministic referee (WS0 = interface only).

This is the ground-truth verifier. **No LLM ever lives in here.** It propagates
orbits, screens for conjunctions, and applies maneuvers — all deterministically.

WS0 ships *signatures + docstrings only*. WS1 fills in the bodies (Skyfield /
sgp4, or two-body Keplerian). Every method below raises ``NotImplementedError``
so that an accidental call during integration fails loudly instead of silently
returning garbage.

Implementation contract for WS1:
  - Pure functions: never mutate the ``Scenario`` passed in. ``apply_maneuver``
    returns a *new* Scenario.
  - Deterministic: same inputs -> same outputs, no wall-clock, no randomness.
  - Units per ``contracts.py``: km, km/s, seconds-since-epoch.
"""

from __future__ import annotations

from .contracts import Conjunction, Scenario, State, Vec3

# Standard gravitational parameter of Earth, km^3 / s^2. (For two-body WS1 impl.)
MU_EARTH = 398_600.4418


class PhysicsCore:
    """Deterministic orbital referee. Stateless; methods take a Scenario.

    WS1 may make these ``@staticmethod`` or instance methods — keep the
    signatures stable so WS2/WS3 don't have to change call sites.
    """

    def propagate(self, scenario: Scenario, t: float) -> dict[str, State]:
        """Return each object's State at ``t`` seconds after the epoch.

        Args:
            scenario: world to propagate (treated as read-only).
            t: seconds since ``scenario.epoch``.

        Returns:
            Mapping of ``object_id -> State`` at time ``t``.

        TODO(WS1): two-body Keplerian propagation from each object's epoch
        ``state`` (or from its TLE via sgp4 if ``state`` is absent).
        """
        raise NotImplementedError("WS1: implement propagation")

    def screen_conjunctions(
        self, scenario: Scenario, window: int
    ) -> list[Conjunction]:
        """Find all pairwise close approaches within the next ``window`` seconds.

        A pair is a conjunction when its minimum separation over the window is
        <= ``scenario.conjunction_threshold_km``.

        Args:
            scenario: world to screen (read-only).
            window: look-ahead horizon in seconds.

        Returns:
            One Conjunction per offending pair, each with the time of closest
            approach (TCA), miss distance, and relative speed. Empty list means
            the orbit is provably clear over the window.

        TODO(WS1): sample-and-refine — coarse propagate over the window, find
        local separation minima per pair, refine TCA, emit those under threshold.
        """
        raise NotImplementedError("WS1: implement conjunction screening")

    def apply_maneuver(
        self, scenario: Scenario, obj_id: str, dv_vector: Vec3, t_burn: float
    ) -> Scenario:
        """Return a NEW scenario with ``dv_vector`` applied to ``obj_id`` at ``t_burn``.

        An impulsive burn: propagate the object to ``t_burn``, add ``dv_vector``
        to its velocity, then re-express its epoch state so the rest of the
        pipeline can keep treating ``t=0`` as the epoch.

        Does not mutate ``scenario``; returns a copy with the one object updated.

        Args:
            scenario: world before the burn (read-only).
            obj_id: which object burns.
            dv_vector: impulsive delta-v [dvx, dvy, dvz] in km/s, ECI.
            t_burn: when the burn happens, seconds since epoch.

        Returns:
            A new Scenario reflecting the post-burn trajectory.

        TODO(WS1): propagate to t_burn, v += dv, back-propagate to epoch (or
        carry a per-object burn schedule). Validate ``|dv| <= fuel_budget_dv``
        is the *agent/guardrail's* job, not the physics core's.
        """
        raise NotImplementedError("WS1: implement maneuver application")
