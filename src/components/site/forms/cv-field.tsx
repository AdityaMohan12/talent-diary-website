"use client";

import { fieldStyle, labelStyle, focusOn, focusOff } from "@/lib/forms";

/** Styled, accessible CV upload. The native file input is visually hidden and
 *  driven by a labelled box that matches the other fields. */
export function CvField({
  id = "fld-cv",
  label = "Updated CV",
  fileName,
  onPick,
}: {
  id?: string;
  label?: string;
  fileName: string;
  onPick: (file: File | null) => void;
}) {
  return (
    <div style={{ gridColumn: "1 / -1", position: "relative" }}>
      <span style={labelStyle}>{label}</span>
      <label
        htmlFor={id}
        tabIndex={0}
        onFocus={focusOn}
        onBlur={focusOff}
        style={{
          ...fieldStyle,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1rem",
          cursor: "pointer",
          color: fileName ? "var(--ink)" : "var(--ink-soft)",
        }}
      >
        <span
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {fileName || "Attach your CV (PDF or DOC)"}
        </span>
        <span
          style={{
            flexShrink: 0,
            fontFamily: "var(--display)",
            fontWeight: 700,
            fontSize: ".82rem",
            color: "var(--blue-deep)",
            border: "1.5px solid var(--blue-tint-2)",
            borderRadius: "8px",
            padding: ".35rem .75rem",
            background: "var(--blue-tint)",
          }}
        >
          Choose file
        </span>
        <input
          id={id}
          name="cv"
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={(e) => onPick(e.target.files?.[0] ?? null)}
          style={{
            position: "absolute",
            width: 1,
            height: 1,
            padding: 0,
            margin: -1,
            overflow: "hidden",
            clip: "rect(0 0 0 0)",
            whiteSpace: "nowrap",
            border: 0,
          }}
        />
      </label>
    </div>
  );
}
