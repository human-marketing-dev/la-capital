import { Button } from "../Button";
import { waLink, WA_MESSAGES } from "../../lib/site";

/* Sectores — communicates breadth of coverage (replaces the closed list of
   machine logos). Industry names only; the per-industry rationale stays
   internal. List is a PROPUESTA from the brief — validate with client. */
const INDUSTRIES = [
  "Manufactura y plantas industriales",
  "Maquinaria pesada y construcción",
  "Agricultura y agroindustria",
  "Transporte y autotransporte",
  "Minería",
  "Metalmecánica y OEM",
  "Petróleo, gas y energía",
  "Alimentos y bebidas",
];

export function Industries() {
  return (
    <section style={{ background: "#fff" }}>
      <div className="lc-container lc-section">
        <div
          style={{ textAlign: "center", maxWidth: 760, margin: "0 auto 44px" }}
        >
          <p className="lc-eyebrow" style={{ color: "var(--brand-press)" }}>
            Sectores
          </p>
          <h2 className="lc-h2">Sellado para prácticamente cualquier industria</h2>
          <p
            style={{
              color: "var(--text-muted)",
              marginTop: 12,
              fontSize: "1.05rem",
            }}
          >
            Atendemos desde mantenimiento de planta hasta maquinaria pesada y
            transporte. Si trabaja con fluidos a presión, tenemos el sello.
          </p>
        </div>

        <div className="lc-grid-4">
          {INDUSTRIES.map((name) => (
            <div key={name} className="lc-industry">
              <span className="lc-industry__name">{name}</span>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", justifyContent: "center", marginTop: 44 }}>
          <Button
            variant="outline-ink"
            href={waLink(WA_MESSAGES.application)}
            target="_blank"
            rel="noopener noreferrer"
          >
            ¿No ves tu industria? Cuéntanos tu aplicación
          </Button>
        </div>
      </div>
    </section>
  );
}
