"""Minimal HTTP API for the Right of Way demo.

Exposes one endpoint:
    POST /run?topology=hierarchical|swarm  →  Timeline JSON

The viz calls this when the user clicks "RUN SIMULATION", loads the
returned Timeline, and plays it back immediately.

Run with:
    uv run python -m row.api          # default port 8000
    uv run python -m row.api --port 8080
"""

from __future__ import annotations

import asyncio
import threading
from typing import Literal

import uvicorn
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

app = FastAPI(title="Right of Way API", version="0.1.0")

# Allow the Vite dev server (any localhost origin) to call us
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)

# Track whether a run is in progress so the UI can show a spinner
_lock = threading.Lock()
_running = False


@app.get("/health")
def health() -> dict:
    return {"status": "ok", "running": _running}


@app.post("/run")
def run_simulation(
    topology: Literal["hierarchical", "swarm"] = "hierarchical",
) -> JSONResponse:
    """Run the WS3 verify-and-repair loop and return Timeline JSON.

    Takes ~1-3 s with the reference doubles. With real LLM agents it may
    take longer depending on API latency.
    """
    global _running
    with _lock:
        if _running:
            raise HTTPException(status_code=409, detail="A simulation is already running.")
        _running = True

    try:
        from row.orchestrator import run

        result = run(topology=topology, output_path=None)
        return JSONResponse(content=result.timeline.model_dump())
    except Exception as exc:
        raise HTTPException(status_code=500, detail=str(exc)) from exc
    finally:
        with _lock:
            _running = False


if __name__ == "__main__":
    import argparse

    p = argparse.ArgumentParser()
    p.add_argument("--port", type=int, default=8000)
    p.add_argument("--host", default="127.0.0.1")
    args = p.parse_args()

    uvicorn.run(app, host=args.host, port=args.port)
