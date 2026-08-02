/**
 * Talent Diary — form sync (Google Apps Script web app)
 * --------------------------------------------------------------------------
 * Receives form submissions from the website and:
 *   1. appends a row to a tab in your Google Sheet (one tab per form type:
 *      "talent", "founder", "application")
 *   2. saves any uploaded CV/file to your Google Drive folder and links it
 *   3. emails a notification to NOTIFY_EMAIL
 *
 * Set SHEET_ID and FOLDER_ID below to your own. If left as the "PASTE_..."
 * placeholders, the script falls back to the Sheet it is attached to and a
 * "Talent Diary CVs" folder it creates automatically, so it keeps working.
 *
 * AFTER EDITING THIS CODE: Deploy > Manage deployments > (your deployment) >
 * pencil/Edit > Version: "New version" > Deploy. The Web app URL stays the same.
 */

// Set these to your Google Sheet ID and a Drive folder ID (see README).
// If left as "PASTE_..." the script falls back to the Sheet it is attached to
// and a "Talent Diary CVs" folder it creates automatically.
const SHEET_ID = "PASTE_YOUR_SHEET_ID_HERE";
const FOLDER_ID = "PASTE_YOUR_FOLDER_ID_HERE";
// Every submission also emails a notification here. Set "" to turn email off.
const NOTIFY_EMAIL = "contact@talentdiary.in";

function isSet_(v) {
  return v && v.indexOf("PASTE") === -1;
}

function getSheet_() {
  return isSet_(SHEET_ID)
    ? SpreadsheetApp.openById(SHEET_ID)
    : SpreadsheetApp.getActiveSpreadsheet();
}

function getFolder_() {
  if (isSet_(FOLDER_ID)) return DriveApp.getFolderById(FOLDER_ID);
  const found = DriveApp.getFoldersByName("Talent Diary CVs");
  return found.hasNext() ? found.next() : DriveApp.createFolder("Talent Diary CVs");
}

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const type = String(data.formType || "submission");
    const ss = getSheet_();
    const sheet = ss.getSheetByName(type) || ss.insertSheet(type);

    const row = Object.assign({}, data.fields || {});

    // Save an uploaded file (sent as base64) to Drive and link it.
    if (data.fileBase64 && data.fileName) {
      const blob = Utilities.newBlob(
        Utilities.base64Decode(data.fileBase64),
        data.fileMime || "application/octet-stream",
        data.fileName
      );
      row["CV"] = getFolder_().createFile(blob).getUrl();
    }

    row["Submitted"] = new Date();

    // Keep a header row in sync with the incoming keys, then append in order.
    let headers =
      sheet.getLastRow() > 0
        ? sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0].map(String).filter(String)
        : [];
    const newCols = Object.keys(row).filter((k) => headers.indexOf(k) === -1);
    if (newCols.length) {
      headers = headers.concat(newCols);
      const hr = sheet.getRange(1, 1, 1, headers.length);
      hr.setValues([headers]);
      hr.setFontWeight("bold");
    }
    sheet.appendRow(headers.map((h) => (row[h] !== undefined ? row[h] : "")));

    // Email a notification of the new submission.
    if (NOTIFY_EMAIL) {
      try {
        const labels = {
          talent: "New talent signup",
          founder: "New hiring requirement",
          application: "New job application",
        };
        const subject = (labels[type] || "New submission") + " - Talent Diary";
        const body = Object.keys(row).map((k) => k + ": " + row[k]).join("\n");
        const emailKey = Object.keys(row).filter((k) => /e-?mail/i.test(k))[0];
        const opts = { name: "Talent Diary site" };
        if (emailKey && row[emailKey]) opts.replyTo = String(row[emailKey]);
        MailApp.sendEmail(NOTIFY_EMAIL, subject, body, opts);
      } catch (mailErr) {
        // never fail the submission just because the email could not send
      }
    }

    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  }
}

function doGet() {
  return json({ ok: true, service: "talent-diary-sync" });
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}
