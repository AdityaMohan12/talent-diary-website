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

/* Lean founder requirements. Lands in the "founder" tab of the Sheet. */
const FOUNDER_FIELDS: FieldDef[] = [
  { name: "Name", label: "Name", kind: "text", placeholder: "Your name", required: true, half: true },
  { name: "Work email", label: "Work email", kind: "email", placeholder: "you@company.com", required: true, half: true },
  { name: "Company", label: "Company", kind: "text", placeholder: "Company name" },
  { name: "Role(s) you are hiring for", label: "Role(s) you are hiring for", kind: "text", placeholder: "e.g. Founding Engineer, GTM Lead" },
  { name: "Timeline", label: "Timeline", kind: "text", placeholder: "e.g. within 30 days" },
];

const INITIAL = FOUNDER_FIELDS.reduce<Record<string, string>>((acc, f) => {
  acc[f.name] = "";
  return acc;
}, {});

export function FounderForm() {
  const [values, setValues] = useState<Record<string, string>>(INITIAL);
  const [sent, setSent] = useState(false);

  function update(name: string, value: string) {
    setValues((v) => ({ ...v, [name]: value }));
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
    void submitToSheet("founder", values);
  }

  if (sent) {
    return (
      <p
        style={{
          marginTop: "1.4rem",
          fontFamily: "var(--display)",
          fontWeight: 600,
          fontSize: "1.05rem",
          color: "var(--blue-deep)",
        }}
      >
        Thanks, we have got your role. We will be in touch shortly.
      </p>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      style={{ marginTop: "1.3rem", display: "grid", gap: ".85rem" }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 150px), 1fr))",
          gap: ".85rem",
        }}
      >
        {FOUNDER_FIELDS.filter((f) => f.half).map((f) => (
          <div key={f.name}>
            <label style={labelStyle} htmlFor={`fnd-${f.name}`}>
              {f.label}
              {f.required ? <span style={{ color: "var(--blue)" }}> *</span> : null}
            </label>
            <input
              id={`fnd-${f.name}`}
              type={f.kind === "email" ? "email" : "text"}
              style={fieldStyle}
              value={values[f.name]}
              onChange={(e) => update(f.name, e.target.value)}
              onFocus={focusOn}
              onBlur={focusOff}
              placeholder={f.placeholder}
              required={f.required}
            />
          </div>
        ))}
      </div>
      {FOUNDER_FIELDS.filter((f) => !f.half).map((f) => (
        <div key={f.name}>
          <label style={labelStyle} htmlFor={`fnd-${f.name}`}>
            {f.label}
          </label>
          <input
            id={`fnd-${f.name}`}
            style={fieldStyle}
            value={values[f.name]}
            onChange={(e) => update(f.name, e.target.value)}
            onFocus={focusOn}
            onBlur={focusOff}
            placeholder={f.placeholder}
          />
        </div>
      ))}
      <button
        type="submit"
        className="btn btn-primary"
        style={{ marginTop: ".3rem", justifySelf: "start" }}
      >
        Send requirements
      </button>
    </form>
  );
}
