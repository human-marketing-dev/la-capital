import type { ReactNode } from "react";

/* Pillar / benefit card — the "3 pilares" blocks. Industrial card: squared
   corners, hairline border, 4px yellow top accent, hover lift (CSS). The
   oversized brand-yellow number, left-aligned, is the signature on these cards. */
export function PillarCard({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="lc-card lc-card--accent lc-card--hover" style={{ padding: 32 }}>
      <span
        style={{
          display: "block",
          fontFamily: "var(--font-display)",
          fontWeight: 700,
          fontSize: "3.6rem",
          lineHeight: 1,
          letterSpacing: "-0.02em",
          color: "var(--brand)",
        }}
      >
        {number}
      </span>
      <h3
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 600,
          fontSize: "1.4rem",
          lineHeight: 1.1,
          textTransform: "uppercase",
          color: "var(--ink-900)",
          marginTop: 14,
        }}
      >
        {title}
      </h3>
      <p
        style={{
          fontSize: "1rem",
          lineHeight: 1.55,
          color: "var(--text-body)",
          marginTop: 12,
        }}
      >
        {children}
      </p>
    </div>
  );
}
