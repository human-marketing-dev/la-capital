import { Button } from "../Button";
import { waLink, WA_MESSAGES } from "../../lib/site";

/* National coverage. On the NACIONAL landing we deliberately avoid the
   interactive 12-pin Google Map (that's the differentiator of the branch
   landings) — this is a STATIC coverage panel: a blueprint field with a marker
   per sucursal. No interactivity. */
const BRANCHES = [
  { t: 20, l: 30 },
  { t: 16, l: 47 },
  { t: 26, l: 63 },
  { t: 34, l: 39 },
  { t: 40, l: 56 },
  { t: 45, l: 71 },
  { t: 51, l: 47 },
  { t: 56, l: 63 },
  { t: 61, l: 77 },
  { t: 66, l: 57 },
  { t: 71, l: 72 },
  { t: 33, l: 21 },
];

export function Coverage() {
  return (
    <section style={{ background: "#fff" }}>
      <div className="lc-container lc-section lc-grid-map">
        <div>
          <p className="lc-eyebrow" style={{ color: "var(--brand-press)" }}>
            Cobertura nacional
          </p>
          <h2 className="lc-h2">Estés donde estés, te llega tu sello</h2>
          <p
            style={{
              fontSize: "1.05rem",
              lineHeight: 1.6,
              color: "var(--text-body)",
              marginTop: 18,
              maxWidth: "44ch",
            }}
          >
            12 sucursales en México con envío nacional e internacional. ¿Prefieres
            que vayamos a ti? Ofrecemos visita técnica en sitio para diagnóstico y
            toma de medidas.
          </p>
          <Button
            variant="dark"
            href={waLink(WA_MESSAGES.visit)}
            target="_blank"
            rel="noopener noreferrer"
            style={{ marginTop: 24 }}
          >
            Agendar visita técnica
          </Button>
        </div>

        <div
          style={{
            position: "relative",
            minHeight: 340,
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
          {/* Soft brand glow */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(60% 60% at 55% 45%, rgba(248,184,32,.12), transparent 70%)",
            }}
          />
          {/* One marker per sucursal (decorative, not a literal map) */}
          {BRANCHES.map((b, i) => (
            <span
              key={i}
              aria-hidden
              style={{
                position: "absolute",
                top: `${b.t}%`,
                left: `${b.l}%`,
                width: 11,
                height: 11,
                borderRadius: "50%",
                background: "var(--brand)",
                boxShadow: "0 0 0 4px rgba(248,184,32,.18)",
              }}
            />
          ))}
          {/* Caption */}
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 0,
              padding: "18px 22px",
              display: "flex",
              flexWrap: "wrap",
              alignItems: "baseline",
              gap: "6px 12px",
              background:
                "linear-gradient(180deg, transparent, rgba(14,15,16,.85) 55%)",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "1.6rem",
                lineHeight: 1,
                color: "var(--brand)",
              }}
            >
              12 sucursales
            </span>
            <span style={{ color: "var(--gray-300)", fontSize: "0.92rem" }}>
              · Envío nacional e internacional
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
