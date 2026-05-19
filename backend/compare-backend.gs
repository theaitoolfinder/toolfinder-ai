/**
 * MyAI ToolsFinder — Compare System Backend
 * Google Apps Script Web App
 *
 * SETUP INSTRUCTIONS (one-time, ~5 minutes):
 * ─────────────────────────────────────────────────────────────
 * 1. Go to https://script.google.com  →  New project
 * 2. Paste this entire file into the editor (replace the default code)
 * 3. Click "Deploy" → "New deployment" → Type: Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 4. Click "Deploy" → copy the Web App URL
 * 5. In index.html, add this ONE line before </body>:
 *    <script>window.COMPARE_GAS_URL = "PASTE_YOUR_URL_HERE";</script>
 * 6. Commit & push — done! User registrations will flow into a
 *    Google Sheet automatically created in your Drive.
 * ─────────────────────────────────────────────────────────────
 */

const SHEET_NAME = "Users";

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheet = getOrCreateSheet();

    if (data.action === "register") return register(sheet, data);
    if (data.action === "login")    return login(sheet, data);

    return respond({ ok: false, error: "Unknown action" });
  } catch (err) {
    return respond({ ok: false, error: err.message });
  }
}

/* Allow CORS preflight */
function doGet(e) {
  return respond({ ok: true, status: "MyAI ToolsFinder Compare API" });
}

function register(sheet, data) {
  const { name, email, location, mobile } = data;
  if (!email) return respond({ ok: false, error: "Email is required" });

  const rows = sheet.getDataRange().getValues();

  /* Check for duplicate email */
  for (let i = 1; i < rows.length; i++) {
    if (rows[i][1] === email) {
      return respond({ ok: false, error: "Email already registered. Please log in." });
    }
  }

  /* Append new user row */
  sheet.appendRow([
    name || "",
    email,
    location || "",
    mobile || "",
    new Date().toISOString(),
    ""          // notes column (reserved)
  ]);

  return respond({
    ok: true,
    user: { name: name || "", email, location: location || "" }
  });
}

function login(sheet, data) {
  const { email } = data;
  if (!email) return respond({ ok: false, error: "Email is required" });

  const rows = sheet.getDataRange().getValues();
  for (let i = 1; i < rows.length; i++) {
    if (rows[i][1] === email) {
      return respond({
        ok: true,
        user: { name: rows[i][0], email: rows[i][1], location: rows[i][2] }
      });
    }
  }

  return respond({ ok: false, error: "Email not found. Please register first." });
}

/* ── Helpers ── */

function getOrCreateSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    /* Add header row */
    sheet.appendRow(["Name", "Email", "Location", "Mobile", "RegisteredAt", "Notes"]);
    sheet.setFrozenRows(1);
    /* Style header */
    sheet.getRange(1, 1, 1, 6)
      .setBackground("#4f46e5")
      .setFontColor("#ffffff")
      .setFontWeight("bold");
    sheet.setColumnWidth(2, 220);
    sheet.setColumnWidth(3, 160);
    sheet.setColumnWidth(5, 180);
  }
  return sheet;
}

function respond(obj) {
  const output = ContentService.createTextOutput(JSON.stringify(obj));
  output.setMimeType(ContentService.MimeType.JSON);
  return output;
}
