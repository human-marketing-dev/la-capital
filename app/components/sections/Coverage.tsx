import { Button } from "../Button";
import { CoverageMap } from "../CoverageMap";
import { waLink, WA_MESSAGES } from "../../lib/site";

/* National coverage. Interactive branch map (CoverageMap) instead of an
   embedded Google Map: a static México silhouette with a hoverable marker per
   sucursal that reveals its address. */
export function Coverage() {
  return (
    <section style={{ background: "var(--gray-50)" }}>
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
            track="whatsapp_click"
          >
            Agendar visita técnica
          </Button>
        </div>

        <CoverageMap />
      </div>
    </section>
  );
}
