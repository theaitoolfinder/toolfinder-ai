#!/usr/bin/env python3
"""
fetch_ga4_audience.py — My AI Tools Finder
─────────────────────────────────────────────────────────────────────────────
Exports a compact audience summary from Google Analytics 4 into
data/audience.json so the admin "Audience" tab can show, without any
backend:

  • HOW people find the site   (channels + source/medium)
  • WHAT keeps them engaged    (engagement rate, time on site, pages/session,
                                landing pages, top pages, new vs returning,
                                device, country, key events)

Same pattern as sync_subscribers.py: a scheduled GitHub Action runs this,
commits the JSON, and admin.html reads it from the repo.

Required GitHub secrets (see the setup steps shown in Admin → Audience):
  GA4_PROPERTY_ID            numeric property ID, e.g. 412345678 (NOT the G-… ID)
  GA4_SERVICE_ACCOUNT_JSON   full JSON key of a service account that has
                             Viewer access to that GA4 property

Usage: python .github/scripts/fetch_ga4_audience.py
"""
import json
import os
import sys
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent.parent
OUT = ROOT / "data" / "audience.json"
RANGE_DAYS = 30


def fail(msg: str, code: int = 1):
    print(f"[ga4] {msg}", file=sys.stderr)
    sys.exit(code)


def main():
    prop = os.environ.get("GA4_PROPERTY_ID", "").strip()
    raw_key = os.environ.get("GA4_SERVICE_ACCOUNT_JSON", "").strip()
    if not prop or not raw_key:
        # Not configured yet: leave a marker so the admin tab can show the setup guide.
        OUT.parent.mkdir(exist_ok=True)
        OUT.write_text(json.dumps({"status": "not_configured",
                                   "updated_at": datetime.now(timezone.utc).isoformat()}, indent=1))
        print("[ga4] GA4_PROPERTY_ID / GA4_SERVICE_ACCOUNT_JSON not set — wrote setup marker.")
        return
    if not prop.isdigit():
        fail("GA4_PROPERTY_ID must be the NUMERIC property ID (Admin → Property settings), not the G-XXXX measurement ID.")

    try:
        from google.analytics.data_v1beta import BetaAnalyticsDataClient
        from google.analytics.data_v1beta.types import (DateRange, Dimension, Metric, OrderBy,
                                                        RunReportRequest)
        from google.oauth2 import service_account
        info = json.loads(raw_key)
        creds = service_account.Credentials.from_service_account_info(
            info, scopes=["https://www.googleapis.com/auth/analytics.readonly"])
    except Exception as e:  # noqa: BLE001
        fail(f"Could not initialise GA4 client: {e}")

    client = BetaAnalyticsDataClient(credentials=creds)
    prop_path = f"properties/{prop}"
    cur = DateRange(start_date=f"{RANGE_DAYS}daysAgo", end_date="yesterday")
    prev = DateRange(start_date=f"{RANGE_DAYS * 2}daysAgo", end_date=f"{RANGE_DAYS + 1}daysAgo")

    def run(dims, mets, ranges=None, limit=25, order_metric=None, order_dim=None):
        req = RunReportRequest(
            property=prop_path,
            dimensions=[Dimension(name=d) for d in dims],
            metrics=[Metric(name=m) for m in mets],
            date_ranges=ranges or [cur],
            limit=limit,
        )
        if order_metric:
            req.order_bys = [OrderBy(metric=OrderBy.MetricOrderBy(metric_name=order_metric), desc=True)]
        elif order_dim:
            req.order_bys = [OrderBy(dimension=OrderBy.DimensionOrderBy(dimension_name=order_dim))]
        try:
            return client.run_report(req)
        except Exception as e:  # noqa: BLE001
            fail(f"GA4 query failed ({','.join(dims) or 'totals'}): {e}")

    def f(v, nd=4):
        try:
            return round(float(v), nd)
        except Exception:  # noqa: BLE001
            return 0.0

    def rows(rep, dims, mets):
        out = []
        for r in rep.rows:
            d = {dims[i]: r.dimension_values[i].value for i in range(len(dims))}
            for i, m in enumerate(mets):
                d[m] = f(r.metric_values[i].value)
            out.append(d)
        return out

    def engage(d):
        """Add per-session derived fields."""
        s = d.get("sessions", 0) or 0
        d["avg_engagement_sec"] = round((d.get("userEngagementDuration", 0) or 0) / s, 1) if s else 0.0
        return d

    BASE = ["sessions", "engagedSessions", "engagementRate", "userEngagementDuration",
            "screenPageViewsPerSession", "bounceRate"]

    # ── Totals: current vs previous period ──────────────────────────────────
    tot_mets = ["sessions", "totalUsers", "newUsers", "engagedSessions", "engagementRate",
                "userEngagementDuration", "screenPageViewsPerSession", "bounceRate", "screenPageViews"]
    rep = run([], tot_mets, ranges=[cur, prev], limit=2)
    totals = {"current": {}, "previous": {}}
    for r in rep.rows:
        # With 2 date ranges GA4 adds an implicit dateRange dimension
        label = "previous" if (r.dimension_values and r.dimension_values[0].value == "date_range_1") else "current"
        totals[label] = {m: f(r.metric_values[i].value) for i, m in enumerate(tot_mets)}
    for k in ("current", "previous"):
        t = totals[k]
        s = t.get("sessions", 0)
        t["avg_engagement_sec"] = round(t.get("userEngagementDuration", 0) / s, 1) if s else 0.0

    # ── Channels / sources ──────────────────────────────────────────────────
    channels = [engage(d) for d in rows(
        run(["sessionDefaultChannelGroup"], BASE + ["newUsers"], order_metric="sessions"),
        ["sessionDefaultChannelGroup"], BASE + ["newUsers"])]
    sources = [engage(d) for d in rows(
        run(["sessionSourceMedium"], BASE, limit=20, order_metric="sessions"),
        ["sessionSourceMedium"], BASE)]

    # ── Landing pages (how they ENTER) & top pages (what they READ) ─────────
    landing = [engage(d) for d in rows(
        run(["landingPage"], BASE, limit=25, order_metric="sessions"), ["landingPage"], BASE)]
    pages = rows(
        run(["pagePath"], ["screenPageViews", "userEngagementDuration", "totalUsers"], limit=25,
            order_metric="screenPageViews"),
        ["pagePath"], ["screenPageViews", "userEngagementDuration", "totalUsers"])
    for p in pages:
        u = p.get("totalUsers", 0) or 0
        p["avg_engagement_sec"] = round(p.get("userEngagementDuration", 0) / u, 1) if u else 0.0

    # ── Audience makeup ─────────────────────────────────────────────────────
    new_vs_ret = [engage(d) for d in rows(
        run(["newVsReturning"], BASE, order_metric="sessions"), ["newVsReturning"], BASE)]
    devices = [engage(d) for d in rows(
        run(["deviceCategory"], BASE, order_metric="sessions"), ["deviceCategory"], BASE)]
    countries = [engage(d) for d in rows(
        run(["country"], BASE, limit=10, order_metric="sessions"), ["country"], BASE)]

    # ── Daily trend + key events ────────────────────────────────────────────
    daily = rows(run(["date"], ["sessions", "totalUsers", "engagedSessions"], limit=RANGE_DAYS + 2,
                     order_dim="date"), ["date"], ["sessions", "totalUsers", "engagedSessions"])
    events = rows(run(["eventName"], ["eventCount"], limit=20, order_metric="eventCount"),
                  ["eventName"], ["eventCount"])

    data = {
        "status": "ok",
        "updated_at": datetime.now(timezone.utc).isoformat(),
        "range_days": RANGE_DAYS,
        "totals": totals,
        "channels": channels,
        "sources": sources,
        "landing_pages": landing,
        "top_pages": pages,
        "new_vs_returning": new_vs_ret,
        "devices": devices,
        "countries": countries,
        "daily": daily,
        "events": events,
    }
    OUT.parent.mkdir(exist_ok=True)
    OUT.write_text(json.dumps(data, indent=1), encoding="utf-8")
    cur_s = int(totals["current"].get("sessions", 0))
    top = channels[0]["sessionDefaultChannelGroup"] if channels else "n/a"
    print(f"[ga4] OK — {cur_s:,} sessions in last {RANGE_DAYS}d; top channel: {top}")


if __name__ == "__main__":
    main()
