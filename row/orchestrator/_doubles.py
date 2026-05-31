"""Reference test doubles for WS3 — a working physics core and negotiators so the
orchestrator runs end-to-end *today*, before WS1/WS2 land.

NONE of this is the real deliverable:
  - ``KeplerPhysics`` is replaced by WS1's production core (sgp4 / Skyfield).
  - ``ReferenceHierarchical`` / ``ReferenceSwarm`` are replaced by WS2's real
    LLM agents over A2A. They are intentionally simple — a priority-yield policy
    plus a greedy, *physics-verified* burn search — just enough to drive the full
    forced-trade arc deterministically.

Both implement the same interfaces (PhysicsCore / Negotiator), so the real ones
drop in with no orchestrator changes.
"""

from __future__ import annotations

import itertools

from ..contracts import (
    Conjunction,
    ManeuverProposal,
    NegotiationMsg,
    Scenario,
    State,
)
from ..physics import PhysicsCore
from ._kepler import add, cross, kepler, norm, scale, sub, unit
from .interfaces import NegotiationContext, NegotiationResult, Topology

# An object with less than this much delta-v (km/s) is treated as unable to move.
MIN_FUEL_DV = 1e-3  # 1 m/s


# --------------------------------------------------------------------------- #
# Physics double                                                              #
# --------------------------------------------------------------------------- #
class KeplerPhysics(PhysicsCore):
    """Deterministic two-body referee. Stateless; never mutates inputs.

    Maneuvers are baked into the epoch state (propagate to t_burn, add dv,
    back-propagate to epoch) so the result stays a plain single-state Scenario.
    Valid because burns are scheduled before the conjunctions they prevent.
    """

    def __init__(self, screen_step_s: float = 10.0) -> None:
        self._step = screen_step_s

    def _pos_at(self, state: State, t: float):
        return kepler(tuple(state.r), tuple(state.v), t)[0]

    def propagate(self, scenario: Scenario, t: float) -> dict[str, State]:
        out: dict[str, State] = {}
        for o in scenario.objects:
            if o.state is None:
                continue
            r, v = kepler(tuple(o.state.r), tuple(o.state.v), t)
            out[o.id] = State(r=r, v=v)
        return out

    def screen_conjunctions(self, scenario: Scenario, window: int) -> list[Conjunction]:
        objs = [o for o in scenario.objects if o.state is not None]
        if len(objs) < 2:
            return []
        threshold = scenario.conjunction_threshold_km
        step = self._step
        n = max(2, int(window / step) + 1)
        times = [min(float(window), i * step) for i in range(n)]
        if times[-1] < float(window):  # always sample the window endpoint
            times.append(float(window))

        # Cache propagated positions per (id, sampled-time).
        cache: dict[tuple[str, float], tuple[float, float, float]] = {}

        def pos(o, t: float):
            key = (o.id, t)
            hit = cache.get(key)
            if hit is None:
                hit = self._pos_at(o.state, t)
                cache[key] = hit
            return hit

        conjs: list[Conjunction] = []
        for a, b in itertools.combinations(objs, 2):
            def sep(t: float) -> float:
                return norm(sub(pos(a, t), pos(b, t)))

            # Coarse scan -> sample with the smallest separation, then refine.
            # ASSUMPTION: at most one close approach per pair in the window, which
            # holds while screen_window_s < one orbital period (~5677 s at this
            # altitude; demo uses 3600 s). This double reports only the global-min
            # approach; WS1's real screener should find ALL local minima for longer
            # windows. The global-min sample brackets that single TCA.
            best_i, best_d = 0, float("inf")
            for i, t in enumerate(times):
                d = sep(t)
                if d < best_d:
                    best_d, best_i = d, i

            lo = times[max(0, best_i - 1)]
            hi = times[min(len(times) - 1, best_i + 1)]
            # Ternary refinement on the (unimodal) bracket.
            for _ in range(80):
                if hi - lo < 1e-4:
                    break
                m1 = lo + (hi - lo) / 3.0
                m2 = hi - (hi - lo) / 3.0
                if sep(m1) < sep(m2):
                    hi = m2
                else:
                    lo = m1
            tca = 0.5 * (lo + hi)
            miss = norm(sub(self._pos_at(a.state, tca), self._pos_at(b.state, tca)))
            if miss <= threshold:
                _, va = kepler(tuple(a.state.r), tuple(a.state.v), tca)
                _, vb = kepler(tuple(b.state.r), tuple(b.state.v), tca)
                conjs.append(
                    Conjunction(
                        a_id=a.id,
                        b_id=b.id,
                        tca=tca,
                        miss_distance_km=miss,
                        rel_speed=norm(sub(va, vb)),
                    )
                )
        conjs.sort(key=lambda c: (c.tca, c.a_id, c.b_id))
        return conjs

    def apply_maneuver(
        self, scenario: Scenario, obj_id: str, dv_vector, t_burn: float
    ) -> Scenario:
        dv = (float(dv_vector[0]), float(dv_vector[1]), float(dv_vector[2]))
        dv_mag = norm(dv)
        new_objs = []
        for o in scenario.objects:
            if o.id != obj_id or o.state is None:
                new_objs.append(o)
                continue
            # Match the real core's contract: refuse over-budget burns so a
            # ~0-fuel object physically cannot be the mover (the forced trade).
            if dv_mag > o.fuel_budget_dv + 1e-12:
                raise ValueError(
                    f"{obj_id}: maneuver |dv|={dv_mag:.4f} km/s exceeds "
                    f"fuel_budget_dv={o.fuel_budget_dv:.4f} km/s"
                )
            r_b, v_b = kepler(tuple(o.state.r), tuple(o.state.v), t_burn)
            r_e, v_e = kepler(r_b, add(v_b, dv), -t_burn)  # re-anchor to epoch
            # Spend the fuel: the post-burn world reflects reduced budget so a
            # later iteration can't re-burn beyond the physical limit.
            new_fuel = max(0.0, o.fuel_budget_dv - dv_mag)
            new_objs.append(
                o.model_copy(update={"state": State(r=r_e, v=v_e), "fuel_budget_dv": new_fuel})
            )
        return scenario.model_copy(update={"objects": new_objs})


# --------------------------------------------------------------------------- #
# Shared greedy, physics-verified clearance search                            #
# --------------------------------------------------------------------------- #
def _burn_frame(physics: PhysicsCore, scenario: Scenario, mover_id: str, t_burn: float):
    """Radial / along-track / cross-track unit vectors for the mover at t_burn."""
    st = physics.propagate(scenario, t_burn)[mover_id]
    r, v = tuple(st.r), tuple(st.v)
    radial = unit(r)
    along = unit(v)
    crosst = unit(cross(r, v))
    return radial, along, crosst


def _pair_key(a: str, b: str) -> frozenset:
    return frozenset((a, b))


def greedy_clearance(ctx: NegotiationContext, mover, partner):
    """Search a small set of physics-verified burns for ``mover`` to clear its
    conjunction with ``partner``. Returns (ManeuverProposal | None).

    Intentionally naive: tries the *obvious radial dodge first*, which is exactly
    the move the forced-trade scenario punishes (it walks sat_B toward sat_C).
    That naivety is what makes the re-negotiation beat happen; WS2's real agents
    reason past it.
    """
    physics = ctx.physics
    scenario = ctx.scenario
    window = scenario.screen_window_s
    tca = ctx.conjunction.tca
    t_burn = max(1.0, tca * 0.4)  # leave lead time before closest approach

    radial, along, crosst = _burn_frame(physics, scenario, mover.id, t_burn)
    # Direction-major ordering: radial-out gets first dibs (the naive dodge).
    directions = [
        ("radial-out", radial),
        ("radial-in", scale(radial, -1.0)),
        ("along-prograde", along),
        ("along-retrograde", scale(along, -1.0)),
        ("cross-track+", crosst),
        ("cross-track-", scale(crosst, -1.0)),
    ]
    mags = [0.005, 0.010, 0.020, 0.030, 0.045]  # km/s (5..45 m/s)
    fuel = mover.fuel_budget_dv
    want = _pair_key(mover.id, partner.id)

    for name, d in directions:
        for mag in mags:
            if mag > fuel:
                break  # mags ascending: skip the rest for THIS direction, try next
            dv = scale(unit(d), mag)
            try:
                trial = physics.apply_maneuver(scenario, mover.id, list(dv), t_burn)
            except ValueError:
                continue  # referee refused this burn (over budget); try the next
            still = any(
                _pair_key(c.a_id, c.b_id) == want
                for c in physics.screen_conjunctions(trial, window)
            )
            if not still:
                return ManeuverProposal(
                    proposer_id=mover.id,
                    dv_vector=dv,
                    t_burn=t_burn,
                    est_dv_cost=mag,
                    rationale=(
                        f"{name} burn {mag * 1000:.0f} m/s clears {partner.id} "
                        f"(verified against the physics referee)."
                    ),
                )
    return None


def _resolve_pairwise(ctx: NegotiationContext):
    """Decide who maneuvers for a single pairwise conjunction.

    Policy: the lower-priority party yields first; but a party with ~0 fuel
    cannot move, so the higher-priority party is forced to trade (the demo's
    load-bearing case). Returns (proposal | None, mover | None, partner | None,
    yield_messages, note).
    """
    pair = sorted(ctx.involved, key=lambda o: o.priority)  # ascending priority
    yields: list[NegotiationMsg] = []
    for cand in pair:
        partner = pair[1] if cand is pair[0] else pair[0]
        if cand.fuel_budget_dv <= MIN_FUEL_DV:
            yields.append(
                NegotiationMsg(
                    from_id=cand.id,
                    to_id=partner.id,
                    type="yield",
                    payload={
                        "reason": "insufficient_fuel",
                        "fuel_budget_dv": cand.fuel_budget_dv,
                        "recipient_id": partner.id,
                    },
                )
            )
            continue
        proposal = greedy_clearance(ctx, cand, partner)
        if proposal is not None:
            return proposal, cand, partner, yields, f"{cand.id} maneuvers to clear {partner.id}"
    return None, None, None, yields, "no feasible mover found"


# --------------------------------------------------------------------------- #
# Reference negotiators                                                        #
# --------------------------------------------------------------------------- #
class ReferenceHierarchical:
    """A central coordinator: collects constraints, picks the mover, commits."""

    topology: Topology = "hierarchical"

    def negotiate(self, ctx: NegotiationContext) -> NegotiationResult:
        proposal, mover, partner, yields, note = _resolve_pairwise(ctx)
        messages = list(yields)
        if proposal is None:
            return NegotiationResult(
                committed=[], messages=messages, rounds_used=1, converged=False, note=note
            )
        messages.append(
            NegotiationMsg(
                from_id="coordinator",
                to_id=mover.id,
                type="propose",
                payload={**proposal.model_dump(), "recipient_id": partner.id},
            )
        )
        messages.append(
            NegotiationMsg(from_id=mover.id, to_id="coordinator", type="accept", payload={})
        )
        return NegotiationResult(
            committed=[proposal], messages=messages, rounds_used=1, converged=True, note=note
        )


class ReferenceSwarm:
    """Peer-to-peer framing of the same resolution: each agent announces its
    constraint, the chosen mover proposes, the partner accepts. May report
    ``converged=False`` (no feasible mover) -> WS3 falls back to hierarchical.
    """

    topology: Topology = "swarm"

    def negotiate(self, ctx: NegotiationContext) -> NegotiationResult:
        proposal, mover, partner, yields, note = _resolve_pairwise(ctx)
        messages = list(yields)
        rounds = max(1, len(ctx.involved))
        if proposal is None:
            return NegotiationResult(
                committed=[], messages=messages, rounds_used=rounds, converged=False, note=note
            )
        messages.append(
            NegotiationMsg(
                from_id=mover.id,
                to_id=partner.id,
                type="propose",
                payload={**proposal.model_dump(), "recipient_id": partner.id},
            )
        )
        messages.append(
            NegotiationMsg(from_id=partner.id, to_id=mover.id, type="accept", payload={})
        )
        return NegotiationResult(
            committed=[proposal], messages=messages, rounds_used=rounds, converged=True, note=note
        )
