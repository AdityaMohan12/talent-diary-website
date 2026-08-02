/** Shared form plumbing for every Talent Diary form.
 *
 *  All submissions POST to one Google Apps Script web app, which appends a row
 *  to the Talent Diary Sheet (a tab per `formType`) and, when a CV is attached,
 *  saves the file to the linked Drive folder. Swap SUBMIT_ENDPOINT in ONE place
 *  if the deployment URL ever changes.
 *
 *  Tabs: "founder" (hiring requirements) | "talent" (talent network + CV) |
 *        "coaching" (career-coaching enquiries + CV).
 */
import type { CSSProperties, FocusEvent } from "react";

export const SUBMIT_ENDPOINT =
  "https://script.google.com/macros/s/AKfycbzUhHCo3Z2As6Y1E0BapMnoT_dk4UgyTo9GxH5-48ygTht21kBO07mvzTSQG2EqgFeF/exec";

/* Field model shared by the talent + coaching forms. */
export type FieldKind = "text" | "email" | "url" | "tel" | "file";

export type FieldDef = {
  name: string;
  label: string;
  kind: FieldKind;
  placeholder?: string;
  required?: boolean;
  half?: boolean; // sits in a two-up row on wider screens
};

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result).split(",")[1] || "");
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/** Fire-and-forget POST. Apps Script does not send CORS headers, so we use
 *  no-cors and treat the response as opaque (the row still lands). */
export async function submitToSheet(
  formType: string,
  fields: Record<string, string>,
  file?: File | null,
) {
  if (!SUBMIT_ENDPOINT) return;
  const payload: Record<string, unknown> = { formType, fields };
  if (file) {
    payload.fileName = file.name;
    payload.fileMime = file.type || "application/octet-stream";
    payload.fileBase64 = await fileToBase64(file);
  }
  try {
    await fetch(SUBMIT_ENDPOINT, {
      method: "POST",
      mode: "no-cors",
      body: JSON.stringify(payload),
    });
  } catch {
    /* opaque no-cors response; nothing to read */
  }
}

/* Shared field styling: clean on the ruled paper, blue focus ring via
   onFocus/onBlur so we stay inside inline styles (no globals.css edits). */
export const fieldStyle: CSSProperties = {
  width: "100%",
  fontFamily: "var(--body)",
  fontSize: "1rem",
  color: "var(--ink)",
  background: "color-mix(in oklab, var(--paper) 55%, white)",
  border: "1.5px solid var(--hairline-strong)",
  borderRadius: "10px",
  padding: ".8rem .95rem",
  outline: "none",
  transition: "border-color .2s, box-shadow .2s",
};

export const labelStyle: CSSProperties = {
  display: "block",
  fontFamily: "var(--display)",
  fontWeight: 600,
  fontSize: ".82rem",
  letterSpacing: "-0.01em",
  color: "var(--ink)",
  marginBottom: ".4rem",
};

export function focusOn(e: FocusEvent<HTMLElement>) {
  e.currentTarget.style.borderColor = "var(--blue)";
  e.currentTarget.style.boxShadow = "0 0 0 3px var(--blue-tint-2)";
}
export function focusOff(e: FocusEvent<HTMLElement>) {
  e.currentTarget.style.borderColor = "var(--hairline-strong)";
  e.currentTarget.style.boxShadow = "none";
}
