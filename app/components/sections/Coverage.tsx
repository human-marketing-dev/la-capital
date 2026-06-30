import { Button } from "../Button";
import { waLink, WA_MESSAGES } from "../../lib/site";

/* National coverage. On the NACIONAL landing we avoid the interactive 12-pin
   Google Map (that's the branch-landing differentiator) — this is a STATIC
   silhouette of México (CSS-masked SVG) with a decorative marker per sucursal.
   Marker positions are approximate, not a literal geo-map. */
const BRANCHES = [
  { t: 20, l: 9 }, // NW (Baja norte)
  { t: 36, l: 14 }, // Baja sur
  { t: 27, l: 42 }, // norte
  { t: 33, l: 62 }, // NE (Monterrey)
  { t: 35, l: 52 }, // centro-norte
  { t: 44, l: 54 }, // Bajío
  { t: 48, l: 46 }, // occidente
  { t: 50, l: 55 }, // centro (CDMX)
  { t: 46, l: 58 }, // centro-este
  { t: 52, l: 64 }, // costa golfo
  { t: 54, l: 80 }, // Yucatán
  { t: 58, l: 60 }, // sur
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
            minHeight: 380,
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
            style={{
              position: "absolute",
              top: "46%",
              left: "50%",
              transform: "translate(-50%,-50%)",
              width: "min(80%, 360px)",
              aspectRatio: "1 / 1",
            }}
          >
            {/* México silhouette (yellow-filled SVG as a subtle background) */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage: "url(/mexico.svg)",
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                opacity: 0.5,
              }}
            />
            {/* One marker per sucursal */}
            {BRANCHES.map((b, i) => (
              <span
                key={i}
                aria-hidden
                style={{
                  position: "absolute",
                  top: `${b.t}%`,
                  left: `${b.l}%`,
                  width: 10,
                  height: 10,
                  marginLeft: -5,
                  marginTop: -5,
                  borderRadius: "50%",
                  background: "var(--brand)",
                  boxShadow: "0 0 0 4px rgba(248,184,32,.18)",
                }}
              />
            ))}
          </div>
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
                "linear-gradient(180deg, transparent, rgba(14,15,16,.9) 60%)",
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
