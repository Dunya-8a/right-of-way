"""The WS3 run loop — detect -> negotiate -> commit -> RE-SCREEN -> repeat.

This is the verify-and-repair core. It owns:
  - stepping the sim and screening for conjunctions (via the PhysicsCore referee),
  - waking the involved agents and running bounded negotiation (via a Negotiator),
  - applying committed maneuvers and RE-SCREENING — if a fix created a new
    conjunction, it loops and re-negotiates,
  - graceful failure: swarm that doesn't converge falls back to the hierarchical
    coordinator, then to a flagged safe no-op,
  - emitting the Timeline the viz plays back.

It depends only on the PhysicsCore and Negotiator interfaces, so WS1's real core
and WS2's real agents drop in unchanged. Until then it uses the reference doubles.
"""

from __future__ import annotations

import json
import pathlib
from dataclasses import dataclass, field
from typing import Optional

from ..contracts import Scenario, Timeline, TimelineEvent
from ..physics import PhysicsCore
from ..scenario import generate_scenario
from ._doubles import MIN_FUEL_DV, KeplerPhysics, ReferenceHierarchical, ReferenceSwarm
from .emit import build_timeline
from .interfaces import NegotiationContext, Negotiator, Topology

DEFAULT_OUTPUT = "web/public/timeline.json"


@dataclass
class RunResult:
    """Outcome of a run, plus the artifact and metrics WS4/WS5 consume."""

    timeline: Timeline
    converged: bool                 # whole scene provably clear at the end?
    iterations: int
    total_dv_km_s: float
    rounds_total: int
    topology: Topology
    output_path: Optional[str]
    events: list[TimelineEvent] = field(default_factory=list)
    note: str = ""


def _negotiator_for(topology: Topology) -> Negotiator:
    return ReferenceSwarm() if topology == "swarm" else ReferenceHierarchical()


def run(
    scenario: Optional[Scenario] = None,
    *,
    topology: Topology = "hierarchical",
    negotiator: Optional[Negotiator] = None,
    physics: Optional[PhysicsCore] = None,
    max_iterations: int = 8,
    max_rounds: int = 5,
    dt_seconds: float = 20.0,
    output_path: Optional[str] = DEFAULT_OUTPUT,
) -> RunResult:
    """Run the verify-and-repair loop and emit a Timeline.

    Args:
        scenario: world to run (defaults to the forced-trade ``generate_scenario()``).
        topology: "hierarchical" (the safe floor) or "swarm" (peer negotiation,
            falls back to hierarchical if it can't converge).
        negotiator / physics: inject WS2 / WS1 implementations; default to the
            reference doubles so the pipeline runs standalone.
        max_iterations: hard cap on verify-repair iterations (loop backstop).
        max_rounds: hard cap on negotiation rounds per conjunction (passed to the
            negotiator).
        dt_seconds: Timeline frame cadence.
        output_path: where to write the Timeline JSON (None to skip writing).
    """
    physics = physics or KeplerPhysics()
    negotiator = negotiator or _negotiator_for(topology)
    fallback = ReferenceHierarchical()
    scenario = scenario or generate_scenario()

    original = scenario
    current = scenario
    window = scenario.screen_window_s
    threshold = scenario.conjunction_threshold_km

    burns: dict[str, list[tuple[float, tuple[float, float, float]]]] = {}
    events: list[TimelineEvent] = []
    all_tca: list[float] = []
    seen_pairs: set[frozenset] = set()

    total_dv = 0.0
    rounds_total = 0
    last_commit_t = 0.0
    iteration = 0
    converged_scene = False
    note = ""

    while iteration < max_iterations:
        conjs = physics.screen_conjunctions(current, window)
        # Only consider conjunctions that are still in the future relative to the
        # last committed burn. Burns are baked into the epoch state, so positions
        # for t < t_burn don't reflect reality; and a conjunction before the last
        # burn is already in the committed past and can't be maneuvered away.
        conjs = [c for c in conjs if c.tca > last_commit_t + 1e-6]
        if not conjs:
            converged_scene = True
            break

        c = conjs[0]  # resolve the earliest; re-screen picks up the rest
        pair = frozenset((c.a_id, c.b_id))
        detect_t = 0.0 if iteration == 0 else last_commit_t
        all_tca.append(c.tca)

        # Defensive deep copy: the negotiator (WS2) must not mutate the loop's
        # working scenario; hand it an isolated copy so a buggy agent can't
        # corrupt `current`.
        ctx_scenario = current.model_copy(deep=True)
        involved = [o for o in ctx_scenario.objects if o.id in (c.a_id, c.b_id)]
        immobile = [o.id for o in involved if o.fuel_budget_dv <= MIN_FUEL_DV]
        is_retry = pair in seen_pairs
        etype = "new_conjunction" if (iteration > 0 and not is_retry) else "conjunction_detected"
        seen_pairs.add(pair)
        events.append(
            TimelineEvent(
                t=detect_t,
                type=etype,
                data={
                    "a_id": c.a_id,
                    "b_id": c.b_id,
                    "tca": c.tca,
                    "miss_distance_km": c.miss_distance_km,
                    "rel_speed": c.rel_speed,
                    "immobile": immobile,
                    "retry": is_retry,
                    "note": (
                        f"{immobile[0]} is out of fuel and cannot maneuver — the "
                        f"naive 'lowest-priority yields' rule is impossible here."
                        if immobile
                        else ""
                    ),
                },
            )
        )

        ctx = NegotiationContext(
            scenario=ctx_scenario,
            conjunction=c,
            involved=involved,
            physics=physics,
            threshold_km=threshold,
            max_rounds=max_rounds,
            topology=topology,
        )
        result = negotiator.negotiate(ctx)
        rounds_total += result.rounds_used

        # Graceful fallback: swarm that can't converge -> hierarchical coordinator.
        if (not result.converged or not result.committed) and topology == "swarm":
            events.append(
                TimelineEvent(
                    t=detect_t,
                    type="proposal",
                    data={"fallback": True, "note": "swarm did not converge; falling back to hierarchical coordinator"},
                )
            )
            result = fallback.negotiate(ctx)
            rounds_total += result.rounds_used

        if not result.converged or not result.committed:
            # Safe no-op + flag for an operator (graceful failure).
            note = f"unresolved conjunction {c.a_id}/{c.b_id}: {result.note}"
            events.append(
                TimelineEvent(
                    t=detect_t,
                    type="proposal",
                    data={"unresolved": True, "a_id": c.a_id, "b_id": c.b_id, "note": note},
                )
            )
            break

        # Negotiation trace -> proposal events (incl. recipient_id from payload).
        for m in result.messages:
            if m.type == "propose":
                events.append(
                    TimelineEvent(t=detect_t, type="proposal", data={**m.payload, "from_id": m.from_id, "to_id": m.to_id})
                )

        # Apply committed maneuvers via the referee, then loop to RE-SCREEN.
        for prop in result.committed:
            current = physics.apply_maneuver(current, prop.proposer_id, prop.dv_vector, prop.t_burn)
            burns.setdefault(prop.proposer_id, []).append((prop.t_burn, tuple(prop.dv_vector)))
            total_dv += prop.est_dv_cost
            last_commit_t = max(last_commit_t, prop.t_burn)
            events.append(
                TimelineEvent(
                    t=prop.t_burn,
                    type="maneuver_committed",
                    data={
                        "obj_id": prop.proposer_id,
                        "dv_vector": list(prop.dv_vector),
                        "est_dv_cost": prop.est_dv_cost,
                        "t_burn": prop.t_burn,
                        "rationale": prop.rationale,
                    },
                )
            )
        iteration += 1

    if converged_scene:
        resolved_t = (max(all_tca) if all_tca else 0.0) + 2 * dt_seconds
        events.append(
            TimelineEvent(
                t=resolved_t,
                type="resolved",
                data={
                    "all_clear": True,
                    "iterations": iteration,
                    "total_dv_km_s": round(total_dv, 6),
                    "rounds": rounds_total,
                    "note": "No conjunctions remain over the screen window.",
                },
            )
        )
        note = note or "scene resolved"
    else:
        note = note or f"halted after {iteration} iterations (cap or no-op)"

    # Stable sort by event time for playback (preserves insertion order on ties).
    events.sort(key=lambda e: e.t)

    horizon = min(float(window), max([e.t for e in events] + all_tca + [last_commit_t, dt_seconds]) + 4 * dt_seconds)
    timeline = build_timeline(
        original,
        burns,
        events,
        physics,
        dt_seconds,
        horizon,
        meta_extra={
            "topology": topology,
            "converged": converged_scene,
            "total_dv_km_s": round(total_dv, 6),
            "rounds_total": rounds_total,
            "iterations": iteration,
            "scenario": "forced-trade demo",
        },
    )

    if output_path:
        out = pathlib.Path(output_path)
        out.parent.mkdir(parents=True, exist_ok=True)
        out.write_text(json.dumps(timeline.model_dump(), indent=2) + "\n")

    return RunResult(
        timeline=timeline,
        converged=converged_scene,
        iterations=iteration,
        total_dv_km_s=total_dv,
        rounds_total=rounds_total,
        topology=topology,
        output_path=output_path,
        events=events,
        note=note,
    )
