"use client";

import { useRef } from "react";
import { BRANCHES } from "../../lib/branches";

/* Alternative coverage UX: a horizontal slider of sucursal cards. Each card
   shows only sucursal · dirección · teléfono · correo (no action buttons).
   Native scroll-snap drives swipe/drag; the arrows scroll programmatically. */
function Pin() {
  return (
    <svg
      width={20}
      height={20}
      viewBox="0 0 24 24"
      fill="none"
      stroke="var(--brand-press)"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={{ flexShrink: 0 }}
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

export function CoverageSlider() {
  const trackRef = useRef<HTMLDivElement>(null);

  // Advance exactly one card (card width + 20px gap) per click.
  const scrollBy = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>(".lc-slider-card");
    const step = card ? card.getBoundingClientRect().width + 20 : el.clientWidth;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <section style={{ background: "var(--gray-50)" }}>
      <div className="lc-container lc-section">
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 20,
            alignItems: "flex-end",
            justifyContent: "space-between",
            marginBottom: 36,
          }}
        >
          <div style={{ maxWidth: 620 }}>
            <p className="lc-eyebrow" style={{ color: "var(--brand-press)" }}>
              Cobertura Nacional
            </p>
            <h2 className="lc-h2">12 Sucursales</h2>
            <p
              style={{
                color: "var(--text-muted)",
                marginTop: 12,
                fontSize: "1.05rem",
              }}
            >
              Envío nacional e internacional desde cualquiera de nuestras
              sucursales. Encuentra la más cercana.
            </p>
          </div>

          <div style={{ display: "flex", gap: 10 }}>
            <button
              type="button"
              className="lc-slider-arrow"
              aria-label="Anterior"
              onClick={() => scrollBy(-1)}
            >
              <svg
                width={20}
                height={20}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              type="button"
              className="lc-slider-arrow"
              aria-label="Siguiente"
              onClick={() => scrollBy(1)}
            >
              <svg
                width={20}
                height={20}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>

        <div ref={trackRef} className="lc-slider-track">
          {BRANCHES.map((b) => (
            <div
              key={b.name}
              className="lc-card lc-card--accent lc-slider-card"
              style={{
                padding: 24,
                display: "flex",
                flexDirection: "column",
                gap: 12,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <Pin />
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 600,
                    fontSize: "1.2rem",
                    textTransform: "uppercase",
                    color: "var(--ink-900)",
                  }}
                >
                  {b.name}
                </h3>
              </div>

              <p
                style={{
                  fontSize: "0.92rem",
                  lineHeight: 1.45,
                  color: "var(--text-body)",
                  minHeight: "2.6em",
                }}
              >
                {b.addr}
              </p>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 4,
                  marginTop: "auto",
                  fontSize: "0.9rem",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    color: "var(--ink-900)",
                    fontWeight: 600,
                  }}
                >
                  <span
                    style={{
                      fontSize: "1.75rem",
                      lineHeight: 1,
                      flexShrink: 0,
                      transform: "translateY(-0.135em)",
                    }}
                  >
                    ✆
                  </span>
                  {b.phone}
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    color: "var(--text-muted)",
                    wordBreak: "break-all",
                  }}
                >
                  <span
                    style={{
                      fontSize: "1.75rem",
                      lineHeight: 1,
                      flexShrink: 0,
                      transform: "translateY(-0.194em)",
                    }}
                  >
                    ✉
                  </span>
                  {b.email}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
