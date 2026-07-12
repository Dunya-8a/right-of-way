"""Right of Way — WS2 agent "brains" (the LLM, with a deterministic fallback).

An agent's *stance* in a negotiation — should I move, should I hold, do I trade —
is what the LLM reasons about. The concrete Δv numbers are computed by
``geometry`` and verified by the PhysicsCore; the brain only decides intent and
writes the natural-language rationale. That division is the whole thesis: the
model negotiates *priority and intent*; deterministic compute handles feasibility.

Two interchangeable brains implement the same ``AgentBrain`` protocol:

  - ``MockBrain`` — a deterministic local policy. It sees ONLY the agent's own
    context (its facts + what it has heard over A2A) and decides its next move.
    Crucially it has NO global view and NO hardcoded "if A is out of fuel then B
    moves" rule: each agent reasons from its own state and the messages it
    receives, so the forced-trade outcome *emerges* from the exchange. This makes
    the demo reproducible and runnable with zero network/keys.

  - ``ClaudeBrain`` — wraps the real Anthropic API (lazy-imported). Same context
    in, same ``Decision`` out, but the reasoning and rationale are genuinely the
    model's. Falls back to ``MockBrain`` on any import/API error so a flaky venue
    network can never break the demo.

``default_brain()`` returns ClaudeBrain when ``anthropic`` is importable AND
``ANTHROPIC_API_KEY`` is set (and ``ROW_FORCE_MOCK_BRAIN`` is not), else MockBrain.
"""

from __future__ import annotations

import os
from dataclasses import dataclass, field
from typing import Literal, Optional, Protocol, runtime_checkable

# Wire-level actions an agent can take. These map onto NegotiationMsg.type
# ("propose" | "counter" | "accept" | "yield") at the agent layer:
#   take_duty   -> emits a "yield" (concede right-of-way / accept the duty to
#                  maneuver) immediately followed by a "propose" (the burn).
#   cannot      -> emits a "counter" declaring physical incapacity (fuel ~0).
#   assert_row  -> emits a "counter" asserting right-of-way (you are lower
#                  priority; please give way).
#   accept      -> emits an "accept" for the proposal on the table.
#   wait        -> emits nothing this round (waiting on the counterpart).
DecisionAction = Literal["take_duty", "cannot", "assert_row", "accept", "wait"]

# Below this remaining Δv budget (km/s) an object is treated as unable to move.
IMMOBILE_DV = 0.001


@dataclass
class DecisionContext:
    """Everything an agent's brain may look at — strictly its LOCAL view.

    There is deliberately no global object list and no counterpart internals
    here beyond what this agent has legitimately observed (neighbors in range)
    or been told over A2A (the ``counterpart_*`` flags). That is the
    permissioned-context property: an agent decides from what it can see and
    what it has heard, nothing more.
    """

    self_id: str
    self_priority: int
    self_fuel: float
    can_maneuver: bool
    counterpart_id: str
    counterpart_priority: Optional[int]
    miss_distance_km: float
    tca: float
    rel_speed: float
    # Local situational awareness: (id, priority, distance_km) within range.
    neighbors: list[tuple[str, int, float]] = field(default_factory=list)
    # Facts accumulated from the A2A inbox over prior rounds:
    counterpart_cannot_maneuver: bool = False
    counterpart_asserted_row: bool = False
    counterpart_has_proposed: bool = False
    counterpart_accepted: bool = False
    # This agent's own history, so it doesn't repeat itself each round:
    i_have_proposed: bool = False
    i_declared_cannot: bool = False
    i_asserted_row: bool = False
    round: int = 0


@dataclass
class Decision:
    action: DecisionAction
    rationale: str


@runtime_checkable
class AgentBrain(Protocol):
    """The one method an agent's reasoning component must provide."""

    def decide(self, ctx: DecisionContext) -> Decision: ...


# ---------------------------------------------------------------------------
# Deterministic local policy (the default, offline, reproducible brain).
# ---------------------------------------------------------------------------


class MockBrain:
    """A local negotiation policy. No global state, no hardcoded trade rule.

    Each agent runs this independently. The forced-trade resolution is *not*
    written here as "if counterpart out of fuel, I move"; instead it falls out
    of two local rules applied by two agents exchanging facts:

      1. The right-of-way norm: the lower-priority party is expected to give way.
      2. Capability honesty: a party that cannot maneuver says so; a party that
         hears the other cannot maneuver knows the duty has fallen to it.

    Run by sat_A (low, no fuel) and sat_B (high, fuel), these two rules produce:
    A announces it cannot comply -> B, on hearing that, concedes its right-of-way
    and takes the burn. The trade emerges; nobody computed it centrally.
    """

    def decide(self, ctx: DecisionContext) -> Decision:
        # 1) A concrete proposal is on the table and I'm the counterpart: accept
        #    it (the duty-taker has committed; I have nothing to add).
        if ctx.counterpart_has_proposed and not ctx.i_have_proposed:
            return Decision(
                "accept",
                f"{ctx.counterpart_id}'s burn resolves our conjunction; I accept.",
            )

        # 2) I've already put my burn on the table: wait for acceptance rather
        #    than re-proposing every round.
        if ctx.i_have_proposed:
            return Decision("wait", f"{ctx.self_id} awaiting acknowledgment of its burn.")

        # 3) The counterpart has told me it physically cannot maneuver. Whatever
        #    the priority ordering says, the duty falls to me — *if* I can move.
        if ctx.counterpart_cannot_maneuver:
            if ctx.can_maneuver:
                higher = (
                    ctx.counterpart_priority is not None
                    and ctx.self_priority > ctx.counterpart_priority
                )
                why = (
                    f"{ctx.counterpart_id} has no fuel and cannot move. "
                    + (
                        "I outrank it, but right-of-way is moot against a sat that "
                        "physically can't yield — I'll trade and take the burn."
                        if higher
                        else "I can maneuver, so I'll take the burn."
                    )
                )
                return Decision("take_duty", why)
            # Neither party can move — deadlock. Declare once, then hold; the
            # orchestrator's round cap / fallback handles unresolvable geometry.
            if ctx.i_declared_cannot:
                return Decision("wait", f"{ctx.self_id} stuck — no fuel; awaiting fallback.")
            return Decision(
                "cannot",
                f"Neither {ctx.self_id} nor {ctx.counterpart_id} has fuel to "
                "maneuver — escalating; this needs the fallback coordinator.",
            )

        # 4) Decide my opening stance from the right-of-way norm + my capability.
        lower_priority = (
            ctx.counterpart_priority is not None
            and ctx.self_priority < ctx.counterpart_priority
        )
        if lower_priority:
            # Norm says I give way. Can I?
            if ctx.can_maneuver:
                return Decision(
                    "take_duty",
                    f"I'm lower priority than {ctx.counterpart_id}; per right-of-way "
                    "I give way and will burn.",
                )
            if ctx.i_declared_cannot:
                return Decision("wait", f"{ctx.self_id} awaiting {ctx.counterpart_id}'s move.")
            return Decision(
                "cannot",
                f"Right-of-way says I ({ctx.self_id}, priority {ctx.self_priority}) "
                f"should give way to {ctx.counterpart_id}, but my Δv budget is ~0 — "
                "I physically cannot maneuver. Requesting a trade.",
            )

        # 5) Higher-priority (or equal) and haven't heard the other can't move:
        #    assert right-of-way once, then wait for them to yield.
        if not ctx.i_asserted_row:
            return Decision(
                "assert_row",
                f"I ({ctx.self_id}) hold right-of-way (priority {ctx.self_priority} "
                f"vs {ctx.counterpart_id}); requesting {ctx.counterpart_id} give way.",
            )

        # 6) Mutual assert with no new info = stalemate (e.g. EQUAL priority —
        #    neither party is the lower one, so neither will yield by norm). Break
        #    it deterministically without coordination: the satellite with the
        #    lexicographically smaller id volunteers to maneuver. Each agent can
        #    compute this from its own local view, so the resolution stays
        #    emergent — and only one of the two ever volunteers, so we don't
        #    double-burn. (Asymmetric priorities never reach here.)
        if (
            ctx.counterpart_asserted_row
            and ctx.can_maneuver
            and ctx.self_id < ctx.counterpart_id
        ):
            return Decision(
                "take_duty",
                f"Stalemate with {ctx.counterpart_id} (equal standing); I volunteer "
                "to maneuver to break the deadlock.",
            )
        return Decision("wait", f"{ctx.self_id} holding, awaiting {ctx.counterpart_id}.")


# ---------------------------------------------------------------------------
# Real Claude brain (lazy, optional). Same contract, model-driven reasoning.
# ---------------------------------------------------------------------------

_SYSTEM_PROMPT = """You are an autonomous satellite agent negotiating a \
collision-avoidance maneuver with one other satellite over a peer-to-peer link. \
There is no central controller. You see ONLY your own state and what the other \
party tells you.

Priority convention (read carefully): priority is an integer where a HIGHER \
number means MORE right-of-way / more important. So priority 9 OUTRANKS priority \
1; the satellite with the SMALLER priority number is the lower-priority party. \
Do not assume "rank 1 is best" — it is the opposite here.

Right-of-way norm: the LOWER-priority satellite (the one with the smaller \
priority number) is normally expected to give way (maneuver). BUT a satellite \
with ~zero remaining fuel physically cannot maneuver — in that case the other \
satellite must trade and take the burn even if it outranks the one that can't \
move. Prefer the resolution that spends the least total delta-v. Be concise and \
honest about your own capability, and state priority comparisons correctly \
(remember: bigger number = higher priority).

Choose exactly one action:
- take_duty: you will give way / take the burn (you can maneuver).
- cannot: you cannot maneuver (fuel ~0); say so and ask the other to trade.
- assert_row: you hold right-of-way; ask the lower-priority party to give way.
- accept: accept the maneuver the other party has proposed.
- wait: take no action this round.

Respond by calling the `decide` tool with your action and a one-sentence \
rationale written in the first person as the satellite."""

_DECIDE_TOOL = {
    "name": "decide",
    "description": "Record this satellite's negotiation move for the round.",
    "input_schema": {
        "type": "object",
        "properties": {
            "action": {
                "type": "string",
                "enum": ["take_duty", "cannot", "assert_row", "accept", "wait"],
            },
            "rationale": {"type": "string"},
        },
        "required": ["action", "rationale"],
    },
}


class ClaudeBrain:
    """Anthropic-backed brain. Lazy import; falls back to MockBrain on any error.

    Model defaults to Sonnet (fast/cheap is right for frequent per-agent, per-round
    decisions in a live demo). The system prompt is marked for prompt caching so
    repeated round calls reuse it. Never raises: if the SDK is missing, the key is
    unset, or a call fails, it transparently uses the deterministic policy.
    """

    def __init__(
        self,
        model: str = "claude-sonnet-4-6",
        *,
        max_tokens: int = 400,
        api_key: Optional[str] = None,
    ) -> None:
        self.model = model
        self.max_tokens = max_tokens
        self._fallback = MockBrain()
        self._client = None
        try:
            import anthropic  # noqa: F401  (presence check)

            self._client = anthropic.Anthropic(
                api_key=api_key or os.environ.get("ANTHROPIC_API_KEY")
            )
        except Exception:
            self._client = None  # fall back silently

    def _user_prompt(self, ctx: DecisionContext) -> str:
        heard = []
        if ctx.counterpart_cannot_maneuver:
            heard.append(f"{ctx.counterpart_id} says it CANNOT maneuver (no fuel).")
        if ctx.counterpart_asserted_row:
            heard.append(f"{ctx.counterpart_id} asserted right-of-way over you.")
        if ctx.counterpart_has_proposed:
            heard.append(f"{ctx.counterpart_id} has proposed a burn to resolve it.")
        heard_str = " ".join(heard) or "Nothing yet from the other party."
        nb = (
            ", ".join(f"{i}(prio {p}, {d:.0f} km)" for i, p, d in ctx.neighbors)
            or "none in range"
        )
        return (
            f"You are {ctx.self_id} (priority {ctx.self_priority}, remaining Δv "
            f"{ctx.self_fuel:.4f} km/s, {'CAN' if ctx.can_maneuver else 'CANNOT'} "
            f"maneuver). Conjunction with {ctx.counterpart_id} (priority "
            f"{ctx.counterpart_priority}): miss {ctx.miss_distance_km:.2f} km, TCA "
            f"in {ctx.tca:.0f} s, closing {ctx.rel_speed:.1f} km/s. Nearby objects: "
            f"{nb}. Negotiation so far: {heard_str} Round {ctx.round}. "
            "Decide your next move."
        )

    def decide(self, ctx: DecisionContext) -> Decision:
        if self._client is None:
            return self._fallback.decide(ctx)
        try:
            resp = self._client.messages.create(
                model=self.model,
                max_tokens=self.max_tokens,
                system=[
                    {
                        "type": "text",
                        "text": _SYSTEM_PROMPT,
                        "cache_control": {"type": "ephemeral"},
                    }
                ],
                tools=[_DECIDE_TOOL],
                tool_choice={"type": "tool", "name": "decide"},
                messages=[{"role": "user", "content": self._user_prompt(ctx)}],
            )
            for block in resp.content:
                if getattr(block, "type", None) == "tool_use":
                    data = block.input
                    return Decision(data["action"], data["rationale"])
        except Exception:
            pass
        return self._fallback.decide(ctx)


def default_brain() -> AgentBrain:
    """Pick the best available brain: real Claude if usable, else deterministic."""
    if os.environ.get("ROW_FORCE_MOCK_BRAIN"):
        return MockBrain()
    if os.environ.get("ANTHROPIC_API_KEY"):
        try:
            import anthropic  # noqa: F401

            return ClaudeBrain()
        except Exception:
            return MockBrain()
    return MockBrain()
