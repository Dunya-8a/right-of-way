"""Right of Way — WS4: Weave instrumentation (observability + evaluation).

Additive tracing layer. Nothing here edits the shared contracts, the run loop,
or the negotiator interface — it wraps the seams the loop already exposes.

  from row.eval import init_weave, traced_run, run_leaderboard

  init_weave("right-of-way")          # start logging to W&B Weave
  summary = traced_run("swarm")       # one full run, traced end-to-end
  run_leaderboard()                   # topology x brain evaluation + leaderboard

See ``python -m row.eval --help`` for the CLI.
"""

from __future__ import annotations

from ._env import have_anthropic_key, have_wandb_key, load_env
from .leaderboard import RowOrchestratorModel, run_leaderboard
from .scorers import ALL_SCORERS
from .tracing import (
    TracedNegotiator,
    TracedPhysics,
    budget_guardrail_probe,
    init_weave,
    summarize,
    traced_run,
)

__all__ = [
    "init_weave",
    "traced_run",
    "summarize",
    "TracedPhysics",
    "TracedNegotiator",
    "budget_guardrail_probe",
    "run_leaderboard",
    "RowOrchestratorModel",
    "ALL_SCORERS",
    "load_env",
    "have_wandb_key",
    "have_anthropic_key",
]
