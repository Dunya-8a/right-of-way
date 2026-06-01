"""Weave scorers for a Right of Way run.

Each scorer is a ``@weave.op`` that reads the dict returned by ``traced_run`` /
the model's ``predict`` (see ``tracing.summarize``) and returns a small dict of
metrics. Weave aggregates numeric values (mean) and booleans (true fraction)
across the dataset, which is what populates the evaluation comparison view and
the leaderboard.

The five metrics the spec asks for, plus the budget guardrail:
  - conjunctions_resolved      (did the scene converge / become provably clear?)
  - new_conjunctions_created   (did a fix spawn a fresh conjunction?)
  - total_dv                   (fuel spent, km/s and m/s)
  - rounds_to_converge         (negotiation rounds summed)
  - iterations                 (verify-repair iterations)
  - budget_respected           (guardrail: no over-budget burn slipped through)
"""

from __future__ import annotations

from typing import Any

import weave


@weave.op
def conjunctions_resolved(output: dict[str, Any]) -> dict[str, Any]:
    """Primary outcome: the whole scene is provably clear at the end."""
    return {"resolved": bool(output.get("converged", False))}


@weave.op
def new_conjunctions_created(output: dict[str, Any]) -> dict[str, Any]:
    """How many *new* conjunctions a committed fix introduced (lower is better)."""
    return {"count": int(output.get("new_conjunctions_created", 0))}


@weave.op
def total_dv(output: dict[str, Any]) -> dict[str, Any]:
    """Total delta-v spent resolving the scene (lower is better)."""
    return {
        "km_s": float(output.get("total_dv_km_s", 0.0)),
        "m_s": float(output.get("total_dv_m_s", 0.0)),
    }


@weave.op
def rounds_to_converge(output: dict[str, Any]) -> dict[str, Any]:
    """Negotiation rounds summed across all conjunctions (lower is better)."""
    return {"rounds": int(output.get("rounds_total", 0))}


@weave.op
def iterations(output: dict[str, Any]) -> dict[str, Any]:
    """Outer verify-repair iterations the loop needed (lower is better)."""
    return {"iterations": int(output.get("iterations", 0))}


@weave.op
def budget_respected(output: dict[str, Any]) -> dict[str, Any]:
    """Guardrail: no over-budget burn was ever committed (the referee held the
    line). True is good."""
    return {"respected": not bool(output.get("over_budget_rejected", False))}


ALL_SCORERS = [
    conjunctions_resolved,
    new_conjunctions_created,
    total_dv,
    rounds_to_converge,
    iterations,
    budget_respected,
]
