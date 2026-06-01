"""Tiny zero-dependency .env loader for the eval/tracing layer.

The Weave runs need ``WANDB_API_KEY`` (to log traces) and, for real-LLM runs,
``ANTHROPIC_API_KEY``. The repo keeps these in a ``.env`` one level above the
working tree (``../.env``) — load it without pulling in python-dotenv so the
core package stays dependency-light.

This is additive and best-effort: a missing file is fine, existing environment
variables always win (``setdefault``), and nothing here ever raises.
"""

from __future__ import annotations

import os
import pathlib

# Candidate .env locations, nearest first. ``row/eval/_env.py`` -> repo root is
# three parents up; the shared key file lives at the repo root or one above it.
_REPO_ROOT = pathlib.Path(__file__).resolve().parents[2]
_CANDIDATES = [
    _REPO_ROOT / ".env",
    _REPO_ROOT.parent / ".env",
]


def load_env() -> list[str]:
    """Load KEY=VALUE lines from the first ``.env`` files found into os.environ.

    Returns the list of files actually read (for logging). Never overwrites a
    variable already set in the environment.
    """
    loaded: list[str] = []
    for path in _CANDIDATES:
        if not path.is_file():
            continue
        try:
            for raw in path.read_text().splitlines():
                line = raw.strip()
                if not line or line.startswith("#") or "=" not in line:
                    continue
                key, _, val = line.partition("=")
                key = key.strip()
                val = val.strip().strip('"').strip("'")
                if key:
                    os.environ.setdefault(key, val)
            loaded.append(str(path))
        except Exception:
            # Best-effort: a malformed .env should never break a run.
            continue
    return loaded


def have_wandb_key() -> bool:
    return bool(os.environ.get("WANDB_API_KEY"))


def have_anthropic_key() -> bool:
    return bool(os.environ.get("ANTHROPIC_API_KEY"))
