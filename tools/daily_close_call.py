"""Build today's Close Call puzzle from a real conjunction on CelesTrak SOCRATES.

    uv run python tools/daily_close_call.py            # today's puzzle
    uv run python tools/daily_close_call.py --dry-run  # pick + run, don't write

Picks the highest-probability SOCRATES conjunction that (a) our two-body
referee independently re-confirms with today's TLEs and (b) is playable —
at least one of the two objects can steer. Runs the AI agents on it (Claude
if ANTHROPIC_API_KEY is set, the deterministic offline brain otherwise),
writes the Timeline to web/public/puzzles/<date>.json, and appends it to
web/public/puzzles/index.json, which the site reads.

Idempotent per UTC day: if today's puzzle exists it does nothing (use --force).
"""

from __future__ import annotations

import argparse
import json
import pathlib
import re
import sys
from datetime import datetime, timezone

ROOT = pathlib.Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT))

from row.orchestrator import run  # noqa: E402
from row.orchestrator._doubles import KeplerPhysics  # noqa: E402
from row.scenario_live import (  # noqa: E402
    SOCRATES_URL,
    _get,
    _is_maneuverable,
    fetch_top_conjunctions,
    generate_live_scenario,
)

PUZZLES = ROOT / "web" / "public" / "puzzles"


def describe(name: str, status: str) -> str:
    """A plain-language label for a catalogued object, from its name + status."""
    n = name.upper()
    if " DEB" in n or n.endswith("DEB"):
        parent = re.sub(r"\s*DEB.*$", "", name).strip()
        return f"a piece of debris from {parent}" if parent else "a piece of space debris"
    if "R/B" in n:
        return "a spent rocket stage"
    launch = re.match(r"^(.*?)\s+OBJECT\s+[A-Z]+$", n)
    if launch:
        name_l = launch.group(1).title()
        if name_l.startswith("Transporter"):
            return f"an unidentified object from SpaceX’s {name_l} rideshare launch"
        return f"an unidentified object from the {name_l} launch"
    for key, label in (
        ("STARLINK", "a SpaceX Starlink internet satellite"),
        ("ONEWEB", "a OneWeb internet satellite"),
        ("KUIPER", "an Amazon Kuiper internet satellite"),
        ("COSMOS", "a Russian Cosmos satellite"),
        ("IRIDIUM", "an Iridium phone satellite"),
        ("FLOCK", "a Planet Earth-imaging cubesat"),
        ("LEMUR", "a Spire weather cubesat"),
        ("YAOGAN", "a Chinese Yaogan satellite"),
    ):
        if key in n:
            return label
    return "a satellite"


def agents_brain() -> str:
    """Which brain the agents will actually use. ClaudeBrain falls back to the
    offline brain silently on API errors, so probe once and record the truth."""
    import os

    if os.environ.get("ROW_FORCE_MOCK_BRAIN") or not os.environ.get("ANTHROPIC_API_KEY"):
        return "offline"
    try:
        import anthropic

        from row.agents.llm import ClaudeBrain

        model = ClaudeBrain().model
        anthropic.Anthropic().messages.create(
            model=model, max_tokens=1, messages=[{"role": "user", "content": "ok"}]
        )
        return model
    except Exception as err:
        print(f"warning: Claude unavailable ({str(err)[:120]}) — agents run on the offline brain")
        os.environ["ROW_FORCE_MOCK_BRAIN"] = "1"
        return "offline"


def main() -> None:
    p = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    p.add_argument("--dry-run", action="store_true")
    p.add_argument("--force", action="store_true", help="rebuild today's puzzle")
    p.add_argument("--topology", default="swarm", choices=["swarm", "hierarchical"])
    args = p.parse_args()

    today = datetime.now(timezone.utc).strftime("%Y-%m-%d")
    PUZZLES.mkdir(parents=True, exist_ok=True)
    index_path = PUZZLES / "index.json"
    index = json.loads(index_path.read_text()) if index_path.exists() else []
    if any(e["date"] == today and e["kind"] == "daily" for e in index) and not args.force:
        print(f"{today}: puzzle already exists — nothing to do")
        return

    html = _get(SOCRATES_URL)
    conjs = fetch_top_conjunctions(html)
    ph = KeplerPhysics()
    chosen = None
    for i, c in enumerate(conjs):
        if not (_is_maneuverable(c.name_a, c.status_a) or _is_maneuverable(c.name_b, c.status_b)):
            print(f"[{i}] {c.name_a} / {c.name_b}: neither can steer — skipping")
            continue
        try:
            scn = generate_live_scenario(pick=i, html=html)
        except Exception as err:  # e.g. a fresh object with no published TLE yet
            print(f"[{i}] {c.name_a} / {c.name_b}: could not build ({err}) — skipping")
            continue
        if not ph.screen_conjunctions(scn, scn.screen_window_s):
            print(f"[{i}] {c.name_a} / {c.name_b}: not re-confirmed with today's TLEs — skipping")
            continue
        chosen = (c, scn)
        print(f"[{i}] picked {c.name_a} / {c.name_b}")
        break
    if chosen is None:
        raise SystemExit("no playable conjunction today; try after the next SOCRATES update")
    conj, scenario = chosen

    brain = agents_brain()
    res = run(scenario, topology=args.topology, output_path=None)
    tl = json.loads(res.timeline.model_dump_json())

    ids = [o.id for o in scenario.objects]
    raw = [(conj.catnr_a, conj.name_a, conj.status_a), (conj.catnr_b, conj.name_b, conj.status_b)]
    daily_count = sum(1 for e in index if e["kind"] == "daily" and e["date"] != today)
    number = daily_count + 1
    tl["meta"]["puzzle"] = {
        "number": number,
        "date": today,
        "kind": "daily",
        "title": f"{conj.name_a} vs. {conj.name_b}",
        "agents_brain": brain,
        "source": {
            "name": "CelesTrak SOCRATES",
            "url": "https://celestrak.org/SOCRATES/",
            "tca_utc": conj.tca_utc.strftime("%Y-%m-%dT%H:%M:%SZ"),
            "predicted_miss_m": round(conj.min_range_km * 1000),
            "max_probability": conj.max_prob,
        },
        "objects": {
            oid: {
                "name": name,
                "norad": catnr,
                "label": describe(name, status),
                "operational": status in {"+", "P", "B", "S"},
            }
            for oid, (catnr, name, status) in zip(ids, raw)
        },
    }
    print(f"agents: converged={res.converged} total_dv={res.total_dv_km_s * 1000:.1f} m/s "
          f"(Close Call #{number})")
    if args.dry_run:
        return

    out = PUZZLES / f"{today}.json"
    out.write_text(json.dumps(tl, separators=(",", ":")))
    index = [e for e in index if not (e["date"] == today and e["kind"] == "daily")]
    index.append({"id": today, "number": number, "date": today, "kind": "daily",
                  "title": tl["meta"]["puzzle"]["title"], "file": out.name})
    index_path.write_text(json.dumps(index, indent=2) + "\n")
    print(f"wrote {out.relative_to(ROOT)} and updated index.json")


if __name__ == "__main__":
    main()
