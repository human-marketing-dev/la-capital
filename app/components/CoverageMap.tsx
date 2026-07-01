"use client";

import { useState } from "react";
import { BRANCHES } from "../lib/branches";

/* Interactive national-coverage map. México silhouette (yellow-filled SVG as a
   background) with one marker per sucursal; hovering/focusing a marker shows its
   address in the panel footer. Marker x/y (in lib/branches) are percentages of
   the square map stage, derived from each branch's real lat/lng. */
export function CoverageMap() {
  const [active, setActive] = useState<number | null>(null);
  const branch = active != null ? BRANCHES[active] : null;

  return (
    <div
      style={{
        position: "relative",
        minHeight: 460,
        border: "1.5px solid var(--ink-700)",
        borderRadius: 14,
        background: "var(--ink-900)",
        overflow: "hidden",
        boxShadow: "var(--shadow-md)",
      }}
    >
      {/* Blueprint grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "repeating-linear-gradient(0deg,rgba(255,255,255,.05) 0 1px,transparent 1px 40px),repeating-linear-gradient(90deg,rgba(255,255,255,.05) 0 1px,transparent 1px 40px)",
        }}
      />
      {/* Map stage (square) — silhouette + markers share this box. */}
      <div
        onMouseLeave={() => setActive(null)}
        style={{
          position: "absolute",
          top: "42%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          width: "min(84%, 400px)",
          aspectRatio: "1 / 1",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "url(/mexico.svg)",
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            opacity: 0.42,
          }}
        />
        {BRANCHES.map((b, i) => {
          const on = active === i;
          return (
            <button
              key={b.name}
              type="button"
              aria-label={`${b.name} — ${b.addr}`}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              style={{
                position: "absolute",
                top: `${b.y}%`,
                left: `${b.x}%`,
                width: on ? 20 : 13,
                height: on ? 20 : 13,
                margin: on ? -10 : -6.5,
                padding: 0,
                border: "none",
                borderRadius: "50%",
                cursor: "pointer",
                background: "var(--brand)",
                boxShadow: on
                  ? "0 0 0 6px rgba(248,184,32,.28), 0 0 14px rgba(248,184,32,.7)"
                  : "0 0 0 4px rgba(248,184,32,.18)",
                transition: "all .12s ease",
                zIndex: on ? 3 : 2,
              }}
            />
          );
        })}
      </div>

      {/* Footer info — updates on hover/focus */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          padding: "20px 22px",
          minHeight: 96,
          background:
            "linear-gradient(180deg, transparent, rgba(14,15,16,.92) 45%)",
        }}
      >
        {branch ? (
          <>
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "1.35rem",
                lineHeight: 1.05,
                textTransform: "uppercase",
                color: "var(--brand)",
              }}
            >
              {branch.name}
            </div>
            <div
              style={{
                color: "#fff",
                fontSize: "0.9rem",
                lineHeight: 1.45,
                marginTop: 6,
              }}
            >
              {branch.addr}
            </div>
            <div
              style={{ color: "var(--gray-300)", fontSize: "0.85rem", marginTop: 4 }}
            >
              ✆ {branch.phone}
            </div>
          </>
        ) : (
          <>
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "1.6rem",
                lineHeight: 1,
                color: "var(--brand)",
              }}
            >
              12 sucursales
            </div>
            <div
              style={{ color: "var(--gray-300)", fontSize: "0.9rem", marginTop: 8 }}
            >
              Toca un punto (o pasa el cursor) para ver su dirección.
            </div>
          </>
        )}
      </div>
    </div>
  );
}
