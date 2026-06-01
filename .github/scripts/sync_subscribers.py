#!/usr/bin/env python3
"""
sync_subscribers.py
-------------------
Fetches all active contacts from Brevo, SHA-256 hashes their emails,
and writes data/subscribers.json.

This file is served publicly at /data/subscribers.json and is used by
articles.html to check whether a visitor is a subscriber. Hashing means
raw emails are never exposed in the repo or to the browser.

Required env var: BREVO_API_KEY
"""
import os, json, hashlib, datetime
import urllib.request, urllib.error

BREVO_API_KEY = os.environ.get("BREVO_API_KEY", "").strip()
OUT_FILE = "data/subscribers.json"


def sha256(email: str) -> str:
    return hashlib.sha256(email.strip().lower().encode()).hexdigest()


def fetch_contacts() -> list:
    if not BREVO_API_KEY:
        print("⚠  BREVO_API_KEY not set — writing empty subscriber list.")
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
    contacts = fetch_contacts()

    # Only hash emails of active (not blacklisted/unsubscribed) contacts
    active = [c for c in contacts if not c.get("emailBlacklisted", False)]
    hashes = [sha256(c["email"]) for c in active if c.get("email")]

    os.makedirs("data", exist_ok=True)
    result = {
        "hashes": hashes,
        "count": len(hashes),
        "updated": datetime.datetime.utcnow().strftime("%Y-%m-%dT%H:%M:%SZ"),
    }

    with open(OUT_FILE, "w") as f:
        json.dump(result, f, separators=(",", ":"))

    print(f"✅ Wrote {len(hashes)} subscriber hashes → {OUT_FILE}")


if __name__ == "__main__":
    main()
