import type { CSSProperties } from "react";

/* Quality-backing row. No testimonials / client logos yet (pending) — proof
   uses certifications and premium brand names only. */
const badge: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 8,
  padding: "10px 18px",
  border: "1.5px solid var(--gray-200)",
  borderRadius: 8,
  fontWeight: 700,
  color: "var(--ink-900)",
  fontFamily: "var(--font-display)",
};

export function SocialProof() {
  return (
    <section
      style={{
        background: "var(--gray-50)",
        borderTop: "1px solid var(--gray-200)",
      }}
    >
      <div
        className="lc-container"
        style={{
          paddingBlock: "clamp(40px,5vw,64px)",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
          gap: "18px 28px",
        }}
      >
        <span className="lc-eyebrow" style={{ color: "var(--gray-400)" }}>
          Respaldo de calidad
        </span>
        <span style={badge}>
          ISO 9001:2015{" "}
          <span
            style={{
              fontWeight: 500,
              color: "var(--gray-400)",
              fontSize: "0.8rem",
              fontFamily: "var(--font-body)",
            }}
          >
            CSM180313.QMS
          </span>
        </span>
        <span style={badge}>D-U-N-S</span>
        <span style={badge}>Hallite</span>
        <span style={badge}>SKF</span>
        <span style={badge}>Kastaş</span>
      </div>
    </section>
  );
}
