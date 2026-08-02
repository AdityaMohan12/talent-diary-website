"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import {
  submitToSheet,
  fieldStyle,
  labelStyle,
  focusOn,
  focusOff,
} from "@/lib/forms";
import { CvField } from "./cv-field";

const SERVICES = [
  "LinkedIn optimization",
  "Resume writing",
  "Career coaching",
  "Not sure yet",
];

type Vals = {
  Name: string;
  Email: string;
  LinkedIn: string;
  "Current role": string;
  Notes: string;
};

const INITIAL: Vals = {
  Name: "",
  Email: "",
  LinkedIn: "",
  "Current role": "",
  Notes: "",
};

export function CoachingForm() {
  const [values, setValues] = useState<Vals>(INITIAL);
  const [service, setService] = useState("");
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState("");
  const [sent, setSent] = useState(false);

  function update(name: keyof Vals, value: string) {
    setValues((v) => ({ ...v, [name]: value }));
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
    void submitToSheet("coaching", { Service: service, ...values }, cvFile);
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
          maxWidth: "40ch",
        }}
      >
        Thanks. We have got your details and will reach out shortly with the
        honest next step.
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
      <div style={{ gridColumn: "span 1" }}>
        <label htmlFor="co-name" style={labelStyle}>
          Name<span style={{ color: "var(--blue)" }}> *</span>
        </label>
        <input id="co-name" style={fieldStyle} value={values.Name} onChange={(e) => update("Name", e.target.value)} onFocus={focusOn} onBlur={focusOff} placeholder="Your full name" required />
      </div>
      <div style={{ gridColumn: "span 1" }}>
        <label htmlFor="co-email" style={labelStyle}>
          Email<span style={{ color: "var(--blue)" }}> *</span>
        </label>
        <input id="co-email" type="email" style={fieldStyle} value={values.Email} onChange={(e) => update("Email", e.target.value)} onFocus={focusOn} onBlur={focusOff} placeholder="you@email.com" required />
      </div>
      <div style={{ gridColumn: "span 1" }}>
        <label htmlFor="co-linkedin" style={labelStyle}>LinkedIn</label>
        <input id="co-linkedin" type="url" style={fieldStyle} value={values.LinkedIn} onChange={(e) => update("LinkedIn", e.target.value)} onFocus={focusOn} onBlur={focusOff} placeholder="linkedin.com/in/you" />
      </div>
      <div style={{ gridColumn: "span 1" }}>
        <label htmlFor="co-role" style={labelStyle}>Current role</label>
        <input id="co-role" style={fieldStyle} value={values["Current role"]} onChange={(e) => update("Current role", e.target.value)} onFocus={focusOn} onBlur={focusOff} placeholder="e.g. Product Manager, 4 yrs" />
      </div>

      <div style={{ gridColumn: "1 / -1" }}>
        <span style={labelStyle}>What do you need help with?</span>
        <div style={{ display: "flex", flexWrap: "wrap", gap: ".5rem" }}>
          {SERVICES.map((s) => {
            const on = service === s;
            return (
              <button
                type="button"
                key={s}
                onClick={() => setService(on ? "" : s)}
                aria-pressed={on}
                style={{
                  fontFamily: "var(--display)",
                  fontWeight: 600,
                  fontSize: ".86rem",
                  letterSpacing: "-0.01em",
                  padding: ".5rem .9rem",
                  borderRadius: 999,
                  cursor: "pointer",
                  transition: "background .15s, border-color .15s, color .15s",
                  border: on
                    ? "1.5px solid var(--blue)"
                    : "1.5px solid var(--hairline-strong)",
                  background: on ? "var(--blue)" : "color-mix(in oklab, var(--paper) 55%, white)",
                  color: on ? "white" : "var(--ink)",
                }}
              >
                {s}
              </button>
            );
          })}
        </div>
      </div>

      <div style={{ gridColumn: "1 / -1" }}>
        <label htmlFor="co-notes" style={labelStyle}>
          Anything else? (optional)
        </label>
        <textarea
          id="co-notes"
          rows={3}
          style={{ ...fieldStyle, resize: "vertical", minHeight: "5.5rem" }}
          value={values.Notes}
          onChange={(e) => update("Notes", e.target.value)}
          onFocus={focusOn}
          onBlur={focusOff}
          placeholder="Where you are, where you want to be."
        />
      </div>

      <CvField
        id="co-cv"
        label="Current CV (optional)"
        fileName={fileName}
        onPick={(f) => {
          setCvFile(f);
          setFileName(f?.name ?? "");
        }}
      />

      <div style={{ gridColumn: "1 / -1", marginTop: ".4rem" }}>
        <button type="submit" className="btn btn-primary">
          Send my details
        </button>
      </div>
    </form>
  );
}
