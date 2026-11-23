#!/usr/bin/env python3
"""
make_admin_2fa.py — creates the secret key for the admin login (Google Authenticator).

Writes ~/Documents/admin-2fa-setup.txt (readable only by you) containing:
  • the setup key to type into Google Authenticator
  • the two secrets to paste into the Cloudflare "admin-auth" Worker
It prints NOTHING secret to the screen. Delete the file once you've finished setup
(or keep it somewhere safe: it is also how you restore access on a new phone).

Usage: python3 scripts/make_admin_2fa.py
"""
import base64, os, secrets, stat
from pathlib import Path

OUT = Path.home() / "Documents" / "admin-2fa-setup.txt"
if OUT.exists():
    raise SystemExit(f"{OUT} already exists — not overwriting it. Move or delete it first if you really want a new key.")

totp_secret = base64.b32encode(secrets.token_bytes(20)).decode().rstrip("=")   # 160-bit, as Google Authenticator expects
session_secret = secrets.token_hex(32)
spaced = " ".join(totp_secret[i:i + 4] for i in range(0, len(totp_secret), 4))

OUT.write_text(f"""ADMIN LOGIN SETUP — keep private, never paste into chat
=========================================================

1) GOOGLE AUTHENTICATOR (on your phone)
   Open the app → tap "+" → "Enter a setup key"
     Account name : My AI Tools Finder
     Your key     : {spaced}
     Type of key  : Time based
   Tap Add. You will now see a 6-digit code that changes every 30 seconds.

2) CLOUDFLARE (Workers & Pages → admin-auth → Settings → Variables and Secrets)
   Add two secrets (type: Secret), then Deploy:

     Name  : TOTP_SECRET
     Value : {totp_secret}

     Name  : SESSION_SECRET
     Value : {session_secret}

3) LOST YOUR PHONE?
   Repeat step 1 on the new phone using the same key above. Keep this file somewhere safe
   (password manager / printed in a drawer). Anyone with this file can log in as you.
""", encoding="utf-8")
os.chmod(OUT, stat.S_IRUSR | stat.S_IWUSR)   # only you can read it
print(f"Created {OUT}  (secrets are inside — not shown here)")
