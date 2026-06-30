import type { CSSProperties } from "react";

/* Trust-bar statistic — "+40,000 / Productos en stock". The value uses the
   condensed display font; hard numbers are brand currency. */
export function Stat({
  value,
  label,
  tone = "dark",
  accent = false,
}: {
  value: string;
  label: string;
  tone?: "dark" | "light" | "brand";
  accent?: boolean;
}) {
  const onDark = tone === "dark";
  const onBrand = tone === "brand";
  const valueStyle: CSSProperties = {
    fontFamily: "var(--font-display)",
    fontWeight: 700,
    fontSize: "var(--text-stat)",
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
    marginTop: 6,
    color: onBrand
      ? "rgba(14,15,16,.72)"
      : onDark
        ? "var(--gray-300)"
        : "var(--text-muted)",
  };

  return (
    <div style={{ minWidth: 0 }}>
      <div style={valueStyle}>{value}</div>
      <div style={labelStyle}>{label}</div>
    </div>
  );
}
