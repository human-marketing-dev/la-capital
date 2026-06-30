import type { ReactNode } from "react";

/* Pillar / benefit card — the "3 pilares" blocks. Industrial card: squared
   corners, hairline border, 4px yellow top accent, hover lift (CSS). The
   oversized ghost number is the brand signature on these cards. */
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
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span
          className="lc-eyebrow"
          style={{ color: "var(--brand-press)", letterSpacing: "0.14em" }}
        >
          La Capital
        </span>
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: "2.8rem",
            lineHeight: 1,
            color: "var(--gray-200)",
          }}
        >
          {number}
        </span>
      </div>
      <h3
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 600,
          fontSize: "1.4rem",
          lineHeight: 1.1,
          textTransform: "uppercase",
          color: "var(--ink-900)",
          marginTop: 16,
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
