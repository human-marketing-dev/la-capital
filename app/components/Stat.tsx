import type { CSSProperties } from "react";

/* Trust-bar statistic. Centered value + label. On the yellow band (tone
   "brand") the label is near-black for legibility. `suffix` renders a smaller
   unit inline with the value (e.g. "+20 años"); `compact` shrinks long values
   (e.g. "ISO 9001:2015"). */
export function Stat({
  value,
  suffix,
  label,
  tone = "dark",
  accent = false,
  compact = false,
}: {
  value: string;
  suffix?: string;
  label: string;
  tone?: "dark" | "light" | "brand";
  accent?: boolean;
  compact?: boolean;
}) {
  const onDark = tone === "dark";
  const onBrand = tone === "brand";
  const valueStyle: CSSProperties = {
    fontFamily: "var(--font-display)",
    fontWeight: 700,
    fontSize: compact ? "clamp(1.5rem, 2.6vw, 2rem)" : "var(--text-stat)",
    lineHeight: 1,
    letterSpacing: "-0.01em",
    color: onBrand
      ? "var(--ink-900)"
      : accent
        ? "var(--brand)"
        : onDark
          ? "#fff"
          : "var(--ink-900)",
  };
  const labelStyle: CSSProperties = {
    fontWeight: onBrand ? 600 : 500,
    fontSize: "0.92rem",
    lineHeight: 1.25,
    marginTop: 8,
    color: onBrand
      ? "var(--ink-900)"
      : onDark
        ? "var(--gray-300)"
        : "var(--text-muted)",
  };

  return (
    <div style={{ minWidth: 0, textAlign: "center" }}>
      <div style={valueStyle}>
        {value}
        {suffix ? (
          <span style={{ fontSize: "0.42em", fontWeight: 700, marginLeft: 6 }}>
            {suffix}
          </span>
        ) : null}
      </div>
      <div style={labelStyle}>{label}</div>
    </div>
  );
}
