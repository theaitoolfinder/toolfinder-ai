#!/usr/bin/env python3
"""
sync_subscribers.py — MyAI ToolsFinder
─────────────────────────────────────────────────────────────────────────────
Fetches all active contacts from Brevo, SHA-256 hashes their emails, and
maintains two output files:

  data/subscribers_db.json
      Accumulative internal database — hashes are ONLY EVER ADDED, never
      removed.  Survives Brevo list purges, unsubscribes, and account issues.
      This is the source of truth for who has ever subscribed.

  data/subscribers.json
      Derived from subscribers_db.json — the same set of hashes in the
      format that articles.html uses for the subscriber gate.

Required env var: BREVO_API_KEY
"""
import os, json, hashlib, datetime
import urllib.request, urllib.error

BREVO_API_KEY = os.environ.get("BREVO_API_KEY", "").strip()
DB_FILE  = "data/subscribers_db.json"   # internal accumulative DB
OUT_FILE = "data/subscribers.json"      # public gate file (derived from DB)


def sha256(email: str) -> str:
    return hashlib.sha256(email.strip().lower().encode()).hexdigest()


def load_db() -> dict:
    """Load the existing internal DB, or return a fresh empty one."""
    if os.path.exists(DB_FILE):
        try:
            with open(DB_FILE, "r") as f:
                data = json.load(f)
            if isinstance(data, dict) and "hashes" in data:
                return data
        except Exception:
            pass
    return {"v": 1, "hashes": [], "subscribers": [], "first_created": _now(), "last_updated": _now(), "count": 0}


def _now() -> str:
    return datetime.datetime.utcnow().strftime("%Y-%m-%dT%H:%M:%SZ")


def fetch_brevo_contacts() -> list:
    if not BREVO_API_KEY:
        print("⚠  BREVO_API_KEY not set — no Brevo contacts fetched.")
        return []

    all_contacts = []
    offset = 0
    limit = 500

    while True:
        url = (
            f"https://api.brevo.com/v3/contacts"
            f"?limit={limit}&offset={offset}&sort=desc"
        )
        req = urllib.request.Request(
            url,
            headers={"api-key": BREVO_API_KEY, "accept": "application/json"},
        )
        try:
            with urllib.request.urlopen(req, timeout=30) as resp:
                data = json.loads(resp.read().decode())
        except urllib.error.HTTPError as e:
            body = e.read().decode()[:300]
            print(f"✗ Brevo API error {e.code}: {body}")
            raise

        contacts = data.get("contacts", [])
        if not contacts:
            break

        all_contacts.extend(contacts)
        total = data.get("count", 0)
        offset += len(contacts)
        if offset >= total:
            break

    return all_contacts


def main():
    os.makedirs("data", exist_ok=True)

    # ── 1. Load the existing internal DB ──────────────────────────────────────
    db = load_db()
    existing_hashes: set = set(db.get("hashes", []))
    before_count = len(existing_hashes)

    # ── 2. Fetch Brevo contacts ───────────────────────────────────────────────
    contacts = fetch_brevo_contacts()
    active   = [c for c in contacts if not c.get("emailBlacklisted", False) and c.get("email")]
    print(f"[Brevo] {len(active)} active contacts fetched ({len(contacts)} total incl. unsubscribed).")

    # ── 3. Build existing email set from subscriber records ───────────────────
    if not isinstance(db.get("subscribers"), list):
        db["subscribers"] = []
    existing_emails = {s["email"].strip().lower() for s in db["subscribers"] if s.get("email")}

    # ── 4. Merge hashes AND subscriber records (accumulative) ─────────────────
    # Hash set uses active-only contacts (gate should only let active subs through)
    active_hashes = {sha256(c["email"]) for c in active}
    new_hashes    = active_hashes - existing_hashes
    if new_hashes:
        existing_hashes.update(new_hashes)

    # Subscriber records include everyone (active + unsubscribed) who ever signed up
    new_records = 0
    for c in contacts:
        if not c.get("email"):
            continue
        email_norm = c["email"].strip().lower()
        if email_norm in existing_emails:
            continue
        existing_emails.add(email_norm)
        attrs = c.get("attributes") or {}
        first = attrs.get("FIRSTNAME") or ""
        last  = attrs.get("LASTNAME")  or ""
        name  = (first + " " + last).strip()
        db["subscribers"].append({
            "email":  c["email"].strip(),
            "name":   name,
            "added":  c.get("createdAt") or _now(),
            "status": "unsubscribed" if c.get("emailBlacklisted") else "active",
        })
        new_records += 1

    added_count = max(len(new_hashes), new_records)
    if added_count:
        print(f"[DB] {added_count} new subscriber(s) added to internal database.")
    else:
        print(f"[DB] No new subscribers — database is already up to date.")

    # ── 5. Write updated DB (accumulative — never shrinks) ────────────────────
    all_hashes = sorted(existing_hashes)   # sorted for stable diffs
    db["hashes"]       = all_hashes
    db["count"]        = len(all_hashes)
    db["last_updated"] = _now()
    db["brevo_active"] = len(active)       # informational: current Brevo count

    with open(DB_FILE, "w") as f:
        json.dump(db, f, indent=2)
    print(f"[DB] {len(all_hashes)} hashes, {len(db['subscribers'])} subscriber records → {DB_FILE}")

    # ── 5. Write subscribers.json (gate file — derived from DB) ───────────────
    gate = {
        "hashes":  all_hashes,
        "count":   len(all_hashes),
        "updated": _now(),
    }
    with open(OUT_FILE, "w") as f:
        json.dump(gate, f, separators=(",", ":"))
    print(f"[Gate] {len(all_hashes)} hashes written → {OUT_FILE}")

    added = max(len(all_hashes) - before_count, new_records)
    print(f"✅ Sync complete — {added} new subscriber(s) added this run. {len(db['subscribers'])} total records.")


if __name__ == "__main__":
    main()
