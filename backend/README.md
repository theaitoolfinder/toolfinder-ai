# Compare Backend — Setup Guide

The compare system works **right now without any backend** (registrations stored in browser localStorage). To collect user registrations in a real Google Sheet, follow these 5 steps once.

---

## Step-by-step (takes ~5 minutes)

### 1. Create a Google Apps Script project
Go to → **https://script.google.com** → click **New project**

### 2. Paste the backend code
- Delete the default code in the editor
- Open `compare-backend.gs` (this folder) and copy everything
- Paste it into the Apps Script editor

### 3. Deploy as a Web App
- Click **Deploy** (top right) → **New deployment**
- Type: **Web app**
- Execute as: **Me**
- Who has access: **Anyone**
- Click **Deploy** → click **Authorize access** (sign in with your Google account)
- Copy the **Web App URL** (looks like `https://script.google.com/macros/s/AKfycb.../exec`)

### 4. Paste the URL into `js/compare-config.js`
Open `js/compare-config.js` in this repo and replace the empty string:
```js
window.COMPARE_GAS_URL = "PASTE_YOUR_URL_HERE";
```

### 5. Commit and push
```bash
git add js/compare-config.js
git commit -m "Connect compare backend"
git push
```

That's it. Registrations will now flow into a Google Sheet in your Drive automatically. The sheet is created on the first registration.

---

## What the sheet looks like

| Name | Email | Location | Mobile | RegisteredAt | Notes |
|------|-------|----------|--------|-------------|-------|
| Jane Smith | jane@example.com | Manila, PH | +63 912... | 2026-05-19T... | |

---

## If you skip this setup
No problem — the compare system still works fully. Users can register and log in; their data is stored in their own browser. You just won't have a central list of registrants.
