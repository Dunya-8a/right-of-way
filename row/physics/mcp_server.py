"""Right of Way — PhysicsCore exposed as a real MCP server (WS1 stretch).

This is an **additive** wrapper: it re-exposes the exact same deterministic
``PhysicsCore`` over the Model Context Protocol so agents can call the referee as
tools. The plain Python API (``from row.physics import PhysicsCore``) remains the
primary path and has *zero* dependency on the MCP SDK — this module is imported
only when you actually run the server, and ``row.physics.__init__`` never imports
it.

Run it (stdio transport, the usual way an MCP client launches a server):

    uv run python -m row.physics.mcp_server

Tools exposed (1:1 with the PhysicsCore methods, same units — km, km/s, seconds):
  * ``propagate(scenario, t)            -> {object_id: State}``
  * ``screen_conjunctions(scenario, window) -> [Conjunction]``
  * ``apply_maneuver(scenario, obj_id, dv_vector, t_burn) -> Scenario``

Requires the ``mcp`` package (``uv pip install mcp``); importing this module
without it raises a clear ImportError.
"""

from __future__ import annotations

from mcp.server.fastmcp import FastMCP

from ..contracts import Conjunction, Scenario, State, Vec3
from .core import PhysicsCore

_core = PhysicsCore()


def build_server() -> FastMCP:
    """Construct the FastMCP server with the three physics tools registered."""
    mcp = FastMCP("right-of-way-physics")

    @mcp.tool()
    def propagate(scenario: Scenario, t: float) -> dict[str, State]:
        """Two-body Keplerian state of every object at ``t`` seconds after epoch.

        Deterministic; treats the scenario as read-only. Returns a mapping of
        ``object_id -> State`` (position km, velocity km/s, ECI frame).
        """
        return _core.propagate(scenario, t)

    @mcp.tool()
    def screen_conjunctions(scenario: Scenario, window: int) -> list[Conjunction]:
        """All pairwise close approaches within the next ``window`` seconds.

        One Conjunction per offending pair (its deepest approach) with refined
        ``tca``, ``miss_distance_km``, and ``rel_speed``. Empty list => provably
        clear over the window. This is the ground-truth referee — no LLM.
        """
        return _core.screen_conjunctions(scenario, window)

    @mcp.tool()
    def apply_maneuver(
        scenario: Scenario, obj_id: str, dv_vector: Vec3, t_burn: float
    ) -> Scenario:
        """Apply an impulsive ``dv_vector`` (km/s, ECI) to ``obj_id`` at ``t_burn``
        and return a NEW post-burn Scenario.

        Charges fuel: ``fuel_budget_dv`` drops by ``|dv_vector|``; the burn is
        refused (error) if it exceeds the object's remaining budget. Does not
        mutate the input scenario.
        """
        return _core.apply_maneuver(scenario, obj_id, dv_vector, t_burn)

    return mcp


# Module-level instance so `python -m row.physics.mcp_server` and MCP clients
# that import `mcp_server:mcp` both work.
mcp = build_server()


if __name__ == "__main__":
    mcp.run()
