"""Offline tests for the SOCRATES live-conjunction bridge (no network).

Fixtures are a real SOCRATES results page and a real CelesTrak TLE, snapshotted
2026-07-12. If SOCRATES changes its table markup, refresh the fixture and fix
``_ROW_RE`` in row/scenario_live.py.
"""

from __future__ import annotations

import pathlib
from datetime import datetime, timezone

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


def test_six_digit_catalog_number_uses_omm():
    # CelesTrak has no TLE for NORAD numbers >= 100000 (FORMAT=TLE is 404);
    # snapshot of its OMM JSON for SOYUZ-MS 29, 2026-10-23.
    from row.scenario_live import _propagate, fetch_satrec

    sat = fetch_satrec(100057, (FIXTURES / "omm_100057.json").read_text())
    assert sat.satnum == 100057
    r, v = _propagate(sat, datetime(2026, 10, 23, tzinfo=timezone.utc))
    rmag = sum(x * x for x in r) ** 0.5
    vmag = sum(x * x for x in v) ** 0.5
    assert 6500 < rmag < 7500
    assert 6.5 < vmag < 8.5


def test_five_digit_catalog_number_still_uses_tle():
    from row.scenario_live import fetch_satrec

    sat = fetch_satrec(57023, (FIXTURES / "tle_57023.txt").read_text())
    assert sat.satnum == 57023


def test_omm_epoch_without_fraction():
    import json

    from row.scenario_live import fetch_satrec

    rec = json.loads((FIXTURES / "omm_100057.json").read_text())
    for epoch in ("2026-10-22T23:36:04", "2026-10-22T23:36:04Z", "2026-10-22T23:36:04.39Z"):
        rec[0]["EPOCH"] = epoch
        assert fetch_satrec(100057, json.dumps(rec)).satnum == 100057


def test_six_digit_catalog_number_without_omm_raises():
    import pytest

    from row.scenario_live import fetch_satrec

    with pytest.raises(RuntimeError, match="no OMM"):
        fetch_satrec(100057, "No GP data found")


def test_live_scenario_builds_when_one_object_has_six_digit_number(monkeypatch):
    # The daily Close Call failed with "HTTP Error 404" whenever every top
    # conjunction involved an object numbered >= 100000. Fake CelesTrak the way
    # it behaves: FORMAT=TLE is 404 for such objects, FORMAT=JSON (OMM) works.
    import urllib.error

    import row.scenario_live as live

    omm_text = (FIXTURES / "omm_100057.json").read_text()

    def fake_get(url):
        if "CATNR=100057" in url and "FORMAT=JSON" in url:
            return omm_text
        raise urllib.error.HTTPError(url, 404, "Not Found", {}, None)

    monkeypatch.setattr(live, "_get", fake_get)
    html = (FIXTURES / "socrates_sample.html").read_text().replace("67744", "100057")
    scn = live.generate_live_scenario(
        pick=0, html=html, tle_texts={57023: (FIXTURES / "tle_57023.txt").read_text()}
    )
    assert len(scn.objects) == 2
    rmag = sum(x * x for x in scn.objects[1].state.r) ** 0.5
    assert 6500 < rmag < 7500
