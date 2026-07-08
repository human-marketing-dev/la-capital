import { Button } from "../Button";

/* Fabrication capability — replaces the national catalog grid on the a-medida /
   CNC landing (C1|G2). Here we don't sell standard SKUs; we communicate WHAT can
   be fabricated, in which materials, and up to what size. The [XX mm] diameter
   is a placeholder pending César's confirmed CNC max. */
const CAPACIDADES = [
  {
    title: "Sellos para vástago y émbolo",
    body: "Perfiles hidráulicos y neumáticos a medida para cualquier cilindro.",
  },
  {
    title: "Limpiadores y guardapolvos",
    body: "Fabricados a la medida de tu cilindro y condiciones de trabajo.",
  },
  {
    title: "Sellos de gran diámetro",
    body: "Hasta [XX] mm Ø — para maquinaria pesada e industrial.",
  },
  {
    title: "Perfiles especiales y descontinuados",
    body: "Reproducimos sellos que ya no existen en el mercado, a partir de muestra.",
  },
];

const MATERIALES = [
  "Poliuretano",
  "Nitrilo",
  "Viton",
  "Teflón (PTFE)",
  "Teflón Bronce",
  "Nylon",
  "Poliacetal",
  "EPDM",
  "Silicón",
  "y más",
];

export function CapacidadFabricacion() {
  return (
    <section style={{ background: "var(--gray-50)" }}>
      <div className="lc-container lc-section">
        <div style={{ textAlign: "center", maxWidth: 820, margin: "0 auto 44px" }}>
          <p className="lc-eyebrow" style={{ color: "var(--brand-press)" }}>
            Qué fabricamos
          </p>
          <h2 className="lc-h2">
            Fabricación de sellos hidráulicos a medida para cualquier aplicación
          </h2>
          <p
            style={{
              color: "var(--text-muted)",
              marginTop: 12,
              fontSize: "1.05rem",
            }}
          >
            Perfiles hidráulicos y neumáticos, sellos especiales y descontinuados,
            en el material que tu operación exige.
          </p>
        </div>

        <div className="lc-grid-2">
          {CAPACIDADES.map((c) => (
            <div
              key={c.title}
              className="lc-card lc-card--accent"
              style={{
                padding: 28,
                display: "flex",
                flexDirection: "column",
                gap: 8,
              }}
            >
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 600,
                  fontSize: "1.25rem",
                  lineHeight: 1.12,
                  textTransform: "uppercase",
                  color: "var(--ink-900)",
                }}
              >
                {c.title}
              </h3>
              <p
                style={{
                  fontSize: "0.97rem",
                  lineHeight: 1.5,
                  color: "var(--text-muted)",
                }}
              >
                {c.body}
              </p>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 44, textAlign: "center" }}>
          <p
            className="lc-eyebrow"
            style={{ color: "var(--brand-press)", marginBottom: 18 }}
          >
            Materiales de fabricación
          </p>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 12,
              justifyContent: "center",
            }}
          >
            {MATERIALES.map((m) => (
              <span key={m} className="lc-chip">
                {m}
              </span>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "center", marginTop: 44 }}>
          <Button variant="dark" size="lg" href="#cotizar">
            Cotizar mi fabricación
          </Button>
        </div>
      </div>
    </section>
  );
}
