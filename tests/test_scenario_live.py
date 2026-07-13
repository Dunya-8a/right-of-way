"""Offline tests for the SOCRATES live-conjunction bridge (no network).

Fixtures are a real SOCRATES results page and a real CelesTrak TLE, snapshotted
2026-07-12. If SOCRATES changes its table markup, refresh the fixture and fix
``_ROW_RE`` in row/scenario_live.py.
"""

from __future__ import annotations

import pathlib

from row.scenario_live import fetch_top_conjunctions, fetch_tle, _sgp4_state

FIXTURES = pathlib.Path(__file__).parent / "fixtures"


def test_parses_socrates_table():
    html = (FIXTURES / "socrates_sample.html").read_text()
    conjs = fetch_top_conjunctions(html=html)
    assert len(conjs) >= 3
    c = conjs[0]
    assert c.catnr_a == 57023 and c.catnr_b == 67744
    assert c.name_b == "STARLINK-36692"
    assert c.tca_utc.year == 2026
    assert 0 < c.min_range_km < 5.0
    assert 0 < c.max_prob <= 1.0
    assert c.rel_speed_kms > 1.0


def test_tle_fixture_propagates():
    name, l1, l2 = fetch_tle(57023, tle_text=(FIXTURES / "tle_57023.txt").read_text())
    assert name.startswith("OBJECT V")
    conjs = fetch_top_conjunctions(html=(FIXTURES / "socrates_sample.html").read_text())
    r, v = _sgp4_state(l1, l2, conjs[0].tca_utc)
    # LEO sanity: radius ~6900 km, speed ~7.6 km/s
    rmag = sum(x * x for x in r) ** 0.5
    vmag = sum(x * x for x in v) ** 0.5
    assert 6500 < rmag < 7500
    assert 6.5 < vmag < 8.5
