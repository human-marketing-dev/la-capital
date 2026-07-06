"use client";

import { useRef, type ReactNode } from "react";

/* Industrias que atendemos — black section, horizontal slider of industry
   items (Lucide-style icon + name, brand-yellow, no card container).
   Communicates breadth of coverage. List is a PROPUESTA from the brief. */
function Svg({ children }: { children: ReactNode }) {
  return (
    <svg
      width={40}
      height={40}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

const INDUSTRIES: { name: string; icon: ReactNode }[] = [
  {
    name: "Manufactura y plantas industriales",
    icon: (
      <Svg>
        <path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
        <path d="M7 18h.01M12 18h.01M17 18h.01" />
      </Svg>
    ),
  },
  {
    name: "Maquinaria pesada y construcción",
    icon: (
      <Svg>
        <path d="M2 18a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1z" />
        <path d="M10 10V5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5" />
        <path d="M4 15a8 8 0 0 1 16 0" />
      </Svg>
    ),
  },
  {
    name: "Agricultura y agroindustria",
    icon: (
      <Svg>
        <path d="M7 20h10" />
        <path d="M10 20c5.5-2.5.8-6.4 3-10" />
        <path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-3.2 2.7-.3 4.4 0 5.5.8z" />
        <path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z" />
      </Svg>
    ),
  },
  {
    name: "Transporte y autotransporte",
    icon: (
      <Svg>
        <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
        <path d="M15 18H9" />
        <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
        <circle cx="7" cy="18" r="2" />
        <circle cx="17" cy="18" r="2" />
      </Svg>
    ),
  },
  {
    name: "Minería",
    icon: (
      <Svg>
        <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
      </Svg>
    ),
  },
  {
    name: "Metalmecánica y OEM",
    icon: (
      <Svg>
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </Svg>
    ),
  },
  {
    name: "Petróleo, gas y energía",
    icon: (
      <Svg>
        <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z" />
      </Svg>
    ),
  },
  {
    name: "Alimentos y bebidas",
    icon: (
      <Svg>
        <path d="M3 2v7c0 1.1.9 2 2 2a2 2 0 0 0 2-2V2" />
        <path d="M7 2v20" />
        <path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
      </Svg>
    ),
  },
];

function Arrow({
  dir,
  onClick,
}: {
  dir: "prev" | "next";
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      className="lc-slider-arrow"
      aria-label={dir === "prev" ? "Anterior" : "Siguiente"}
      onClick={onClick}
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
        <path d={dir === "prev" ? "M15 18l-6-6 6-6" : "M9 18l6-6-6-6"} />
      </svg>
    </button>
  );
}

export function Industries() {
  const trackRef = useRef<HTMLDivElement>(null);
  const scrollBy = (d: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const item = el.querySelector<HTMLElement>(".lc-slider-ind");
    const step = item ? item.getBoundingClientRect().width + 20 : el.clientWidth;
    el.scrollBy({ left: d * step, behavior: "smooth" });
  };

  return (
    <section style={{ background: "var(--ink-900)", color: "#fff" }}>
      <div className="lc-container lc-section">
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 20,
            alignItems: "flex-end",
            justifyContent: "space-between",
            marginBottom: 40,
          }}
        >
          <h2 className="lc-h2" style={{ color: "#fff", margin: 0 }}>
            Industrias que atendemos
          </h2>
          <div style={{ display: "flex", gap: 10 }}>
            <Arrow dir="prev" onClick={() => scrollBy(-1)} />
            <Arrow dir="next" onClick={() => scrollBy(1)} />
          </div>
        </div>

        <div ref={trackRef} className="lc-slider-track">
          {INDUSTRIES.map((ind) => (
            <div
              key={ind.name}
              className="lc-slider-ind"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 16,
                textAlign: "center",
                color: "var(--brand)",
                padding: "8px 4px",
              }}
            >
              {ind.icon}
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 600,
                  fontSize: "1.02rem",
                  lineHeight: 1.15,
                  textTransform: "uppercase",
                  letterSpacing: "0.02em",
                  color: "var(--brand)",
                }}
              >
                {ind.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
