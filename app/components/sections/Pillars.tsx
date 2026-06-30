import { PillarCard } from "../PillarCard";

/* Differentiators (Por qué La Capital). Aligned to lead-gen — no Capital GO /
   "mismo día" promise in this campaign. Pillar 03 is the technical-advisory
   differentiator. */
const PILLARS = [
  {
    number: "01",
    title: "+40,000 sellos disponibles",
    body: "Inventario inmediato de marcas premium — Hallite, SKF y Kastaş — listo para enviar.",
  },
  {
    number: "02",
    title: "Si no lo tenemos, lo fabricamos",
    body: "Maquinaria CNC propia para medidas especiales y sellos descontinuados, desde una sola pieza.",
  },
  {
    number: "03",
    title: "Asesoría técnica experta",
    body: "Te ayudamos a identificar el sello correcto por número de parte, medida o aplicación. Acompañamiento real, no solo venta.",
  },
];

export function Pillars() {
  return (
    <section style={{ background: "var(--gray-50)" }}>
      <div className="lc-container lc-section">
        <div
          style={{ textAlign: "center", maxWidth: 760, margin: "0 auto 44px" }}
        >
          <p className="lc-eyebrow" style={{ color: "var(--brand-press)" }}>
            Por qué La Capital
          </p>
          <h2 className="lc-h2">
            Más que sellos: tu aliado en soluciones de sellado
          </h2>
        </div>
        <div className="lc-grid-3">
          {PILLARS.map((p) => (
            <PillarCard key={p.number} number={p.number} title={p.title}>
              {p.body}
            </PillarCard>
          ))}
        </div>
      </div>
    </section>
  );
}
