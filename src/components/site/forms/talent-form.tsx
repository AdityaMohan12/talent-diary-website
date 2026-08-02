"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import {
  submitToSheet,
  fieldStyle,
  labelStyle,
  focusOn,
  focusOff,
  type FieldDef,
} from "@/lib/forms";
import { CvField } from "./cv-field";

/* Talent network fields, in diary-entry order. Lands in the "talent" tab. */
const FIELDS: FieldDef[] = [
  { name: "Name", label: "Name", kind: "text", placeholder: "Your full name", required: true, half: true },
  { name: "Email ID", label: "Email ID", kind: "email", placeholder: "you@email.com", required: true, half: true },
  { name: "LinkedIn", label: "LinkedIn", kind: "url", placeholder: "linkedin.com/in/you", half: true },
  { name: "Contact number", label: "Contact number", kind: "tel", placeholder: "+91 ", half: true },
  { name: "Role interested in", label: "Role interested in", kind: "text", placeholder: "What you want to do next" },
  { name: "Current CTC, fixed", label: "Current CTC, fixed", kind: "text", placeholder: "e.g. 18 LPA", half: true },
  { name: "Current CTC, variable", label: "Current CTC, variable", kind: "text", placeholder: "e.g. 3 LPA", half: true },
  { name: "How soon can you join", label: "How soon can you join", kind: "text", placeholder: "e.g. 30 days", half: true },
  { name: "Current location", label: "Current location", kind: "text", placeholder: "City", half: true },
];

const INITIAL = FIELDS.reduce<Record<string, string>>((acc, f) => {
  acc[f.name] = "";
  return acc;
}, {});

export function TalentForm({
  submitLabel = "Join the talent network",
}: {
  submitLabel?: string;
}) {
  const [values, setValues] = useState<Record<string, string>>(INITIAL);
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState("");
  const [sent, setSent] = useState(false);

  function update(name: string, value: string) {
    setValues((v) => ({ ...v, [name]: value }));
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
    void submitToSheet("talent", values, cvFile);
  }

  if (sent) {
    return (
      <div
        style={{
          marginTop: "1.6rem",
          padding: "1.4rem 1.2rem",
          border: "1.5px solid var(--blue-tint-2)",
          borderRadius: "12px",
          background: "var(--blue-tint)",
          fontFamily: "var(--display)",
          fontWeight: 600,
          fontSize: "1.1rem",
          color: "var(--blue-deep)",
          maxWidth: "34ch",
        }}
      >
        Thanks, you are on our radar. We will reach out when the right role opens.
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      style={{
        marginTop: "1.5rem",
        display: "grid",
        gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
        gap: "1rem",
      }}
    >
      {FIELDS.map((f) => (
        <div key={f.name} style={{ gridColumn: f.half ? "span 1" : "1 / -1" }}>
          <label htmlFor={`tal-${f.name}`} style={labelStyle}>
            {f.label}
            {f.required ? <span style={{ color: "var(--blue)" }}> *</span> : null}
          </label>
          <input
            id={`tal-${f.name}`}
            type={f.kind}
            inputMode={f.kind === "tel" ? "tel" : undefined}
            placeholder={f.placeholder}
            required={f.required}
            value={values[f.name]}
            onChange={(e) => update(f.name, e.target.value)}
            onFocus={focusOn}
            onBlur={focusOff}
            style={fieldStyle}
          />
        </div>
      ))}

      <CvField
        id="tal-cv"
        fileName={fileName}
        onPick={(f) => {
          setCvFile(f);
          setFileName(f?.name ?? "");
        }}
      />

      <div style={{ gridColumn: "1 / -1", marginTop: ".4rem" }}>
        <button type="submit" className="btn btn-primary">
          {submitLabel}
        </button>
      </div>
    </form>
  );
}
