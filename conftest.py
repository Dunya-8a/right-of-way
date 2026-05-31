"""Make the repo root importable so `from row import ...` works under pytest
regardless of cwd. (uv's editable install isn't reliably honored at runtime, so
WS1/WS4 test sessions get a stable import path here.)"""

import sys
from pathlib import Path

_REPO_ROOT = str(Path(__file__).resolve().parent)
if _REPO_ROOT not in sys.path:
    sys.path.insert(0, _REPO_ROOT)
