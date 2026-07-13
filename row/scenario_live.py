"""Right of Way — LIVE scenarios from CelesTrak SOCRATES.

SOCRATES Plus (https://celestrak.org/SOCRATES/) screens the real catalog three
times a day and publishes the predicted conjunctions for the next week: object
pairs, time of closest approach, minimum range, collision probability. This
module turns the current top entry into a ``Scenario`` so the agents negotiate
a close approach that is actually on the books right now:

    python -m row.orchestrator --scenario live --topology swarm

Pipeline: fetch the SOCRATES table -> pick a conjunction -> fetch both TLEs
from CelesTrak GP -> SGP4 both objects to (TCA - lead) -> seed a Scenario with
those state vectors -> the existing verify-and-repair loop runs unchanged.

Honesty notes (keep these true in public copy):
  * The PAIR, NAMES, and TCA are real (SOCRATES). Once seeded, propagation is
    our two-body core, so the miss distance the referee reports will differ
    from SOCRATES's SGP4 numbers (we seed close to TCA to keep the drift
    small). SGP4 states are TEME; we treat them as inertial for the demo.
  * Fuel budgets, priorities, and right-of-way policies are MODELED — real
    operators do not publish them. Operational payloads get fuel and a
    priority (the longer-catalogued object outranks: incumbents keep
    right-of-way); debris and non-operational objects get ~zero budget, which
    is physically honest. Each object's ``notes`` states this to its agent.

Network use: two small GET requests to celestrak.org (public, no key). Use
``fetch_*(html=..., tle_text=...)`` with canned text for offline tests.
"""

from __future__ import annotations

import math
import re
import urllib.request
from dataclasses import dataclass
from datetime import datetime, timedelta, timezone

from sgp4.api import Satrec, jday

from .contracts import Scenario, SpaceObject

SOCRATES_URL = (
    "https://celestrak.org/SOCRATES/table-socrates.php?NAME=,&ORDER=MAXPROB&MAX=20"
)
GP_TLE_URL = "https://celestrak.org/NORAD/elements/gp.php?CATNR={catnr}&FORMAT=TLE"

DEFAULT_LEAD_S = 600.0  # seed the scenario this long before the real TCA
SCREEN_WINDOW_S = 2400
CONJUNCTION_THRESHOLD_KM = 5.0

_UA = {"User-Agent": "right-of-way-demo (github.com/Dunya-8a/right-of-way)"}


@dataclass
class LiveConjunction:
    """One SOCRATES row-pair: a real predicted close approach."""

    catnr_a: int
    name_a: str
    status_a: str  # CelesTrak ops-status code, e.g. "+", "P", "-", "D"
    catnr_b: int
    name_b: str
    status_b: str
    tca_utc: datetime
    min_range_km: float
    rel_speed_kms: float
    max_prob: float


def _get(url: str) -> str:
    req = urllib.request.Request(url, headers=_UA)
    with urllib.request.urlopen(req, timeout=30) as resp:
        return resp.read().decode("utf-8", errors="replace")


_ROW_RE = re.compile(
    r"data\.php\?CATNR=(\d+),(\d+)'\)\">GP Data</a></td>\s*"
    r"<td>\d+</td>\s*<td>(?P<name_a>[^<]+?)\s*\[(?P<st_a>[^\]]*)\]</td>\s*"
    r"<td>[\d.]+</td>\s*<td rowspan=2>(?P<tca>[\d\- :.]+)</td>\s*"
    r"<td>(?P<range>[\d.]+)</td>\s*<td\s*>(?P<speed>[\d.]+)</td>.*?"
    r"<td>\d+</td>\s*<td>(?P<name_b>[^<]+?)\s*\[(?P<st_b>[^\]]*)\]</td>\s*"
    r"<td>[\d.]+</td>\s*<td>(?P<prob>[\dEe+\-.]+)</td>",
    re.S,
)


def fetch_top_conjunctions(html: str | None = None) -> list[LiveConjunction]:
    """Parse SOCRATES's 'top by max probability' table into LiveConjunctions."""
    html = html if html is not None else _get(SOCRATES_URL)
    out: list[LiveConjunction] = []
    for m in _ROW_RE.finditer(html):
        out.append(
            LiveConjunction(
                catnr_a=int(m.group(1)),
                name_a=m.group("name_a").strip(),
                status_a=m.group("st_a").strip(),
                catnr_b=int(m.group(2)),
                name_b=m.group("name_b").strip(),
                status_b=m.group("st_b").strip(),
                tca_utc=datetime.strptime(
                    m.group("tca").strip(), "%Y-%m-%d %H:%M:%S.%f"
                ).replace(tzinfo=timezone.utc),
                min_range_km=float(m.group("range")),
                rel_speed_kms=float(m.group("speed")),
                max_prob=float(m.group("prob")),
            )
        )
    if not out:
        raise RuntimeError(
            "no conjunctions parsed from SOCRATES — the page layout may have "
            "changed (see row/scenario_live.py _ROW_RE)"
        )
    return out


def fetch_tle(catnr: int, tle_text: str | None = None) -> tuple[str, str, str]:
    """Return (name, line1, line2) for a NORAD catalog number via CelesTrak GP."""
    text = tle_text if tle_text is not None else _get(GP_TLE_URL.format(catnr=catnr))
    lines = [ln.strip() for ln in text.strip().splitlines() if ln.strip()]
    if len(lines) < 3 or not lines[1].startswith("1 "):
        raise RuntimeError(f"no TLE returned for CATNR {catnr}: {text[:120]!r}")
    return lines[0], lines[1], lines[2]


def _sgp4_state(line1: str, line2: str, when: datetime) -> tuple[tuple, tuple]:
    """Propagate a TLE to ``when`` (UTC); returns (r_km, v_kms) in TEME."""
    sat = Satrec.twoline2rv(line1, line2)
    jd, fr = jday(
        when.year, when.month, when.day, when.hour, when.minute,
        when.second + when.microsecond / 1e6,
    )
    err, r, v = sat.sgp4(jd, fr)
    if err != 0:
        raise RuntimeError(f"SGP4 error {err} propagating TLE to {when.isoformat()}")
    return tuple(r), tuple(v)


def _is_maneuverable(name: str, status: str) -> bool:
    """Model whether an object can burn: operational payloads yes, debris no.

    CelesTrak ops-status: '+' operational, 'P' partially operational, 'B'
    backup, 'S' spare. Anything else — and anything named like debris or a
    rocket body — is treated as unable to maneuver, which is physically honest.
    """
    n = name.upper()
    if "DEB" in n or "R/B" in n or "AKM" in n:
        return False
    return status in {"+", "P", "B", "S"}


def generate_live_scenario(
    pick: int = 0,
    lead_s: float = DEFAULT_LEAD_S,
    html: str | None = None,
    tle_texts: dict[int, str] | None = None,
) -> Scenario:
    """Build a Scenario from the ``pick``-th top real conjunction on SOCRATES."""
    conj = fetch_top_conjunctions(html)[pick]
    epoch_dt = conj.tca_utc - timedelta(seconds=lead_s)

    objs: list[SpaceObject] = []
    for catnr, name, status in (
        (conj.catnr_a, conj.name_a, conj.status_a),
        (conj.catnr_b, conj.name_b, conj.status_b),
    ):
        tle_text = (tle_texts or {}).get(catnr)
        _, l1, l2 = fetch_tle(catnr, tle_text)
        r, v = _sgp4_state(l1, l2, epoch_dt)
        movable = _is_maneuverable(name, status)
        objs.append(
            SpaceObject(
                id=re.sub(r"[^A-Za-z0-9._+-]+", "-", name).strip("-") or str(catnr),
                type="sat" if movable else "debris",
                state={"r": r, "v": v},
                fuel_budget_dv=0.050 if movable else 0.0005,
                # Modeled right-of-way policy: the longer-catalogued object
                # (smaller NORAD number) outranks — incumbents keep right of way.
                priority=8 if catnr == min(conj.catnr_a, conj.catnr_b) else 4,
                notes=(
                    f"{name} (NORAD {catnr}, ops status '{status or '?'}'). This is a "
                    f"REAL predicted conjunction from CelesTrak SOCRATES: TCA "
                    f"{conj.tca_utc.strftime('%Y-%m-%d %H:%M UTC')}, predicted miss "
                    f"{conj.min_range_km * 1000:.0f} m, max collision probability "
                    f"{conj.max_prob:.1e}. Your fuel budget and priority are modeled "
                    f"assumptions (operators don't publish them)"
                    + (
                        "; you are operational and can maneuver."
                        if movable
                        else "; you are not an operational, maneuverable payload — "
                        "you physically cannot burn."
                    )
                ),
            )
        )

    return Scenario(
        name=(
            f"LIVE: {conj.name_a} / {conj.name_b} — real conjunction, "
            f"TCA {conj.tca_utc.strftime('%b %d %H:%M UTC')} (SOCRATES)"
        ),
        objects=objs,
        epoch=epoch_dt.strftime("%Y-%m-%dT%H:%M:%SZ"),
        screen_window_s=SCREEN_WINDOW_S,
        conjunction_threshold_km=CONJUNCTION_THRESHOLD_KM,
    )


if __name__ == "__main__":
    for i, c in enumerate(fetch_top_conjunctions()):
        print(
            f"[{i}] {c.name_a} [{c.status_a}] / {c.name_b} [{c.status_b}]  "
            f"TCA {c.tca_utc:%Y-%m-%d %H:%M} UTC  miss {c.min_range_km*1000:.0f} m  "
            f"Pc {c.max_prob:.1e}"
        )
