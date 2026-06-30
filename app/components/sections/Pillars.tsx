import Image from "next/image";
import { PillarCard } from "../PillarCard";

/* Differentiators (Por qué La Capital), over a dimmed fulfillment-warehouse
   photo. Aligned to lead-gen — no Capital GO / "mismo día" promise. Pillar 03
   is the technical-advisory differentiator. The quality certifications (moved
   here from the old "Respaldo de calidad" section) sit inline below the cards. */
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

const CERTS = [
  { src: "/logo-iso-la-capital.webp", alt: "ISO 9001:2015" },
  { src: "/logo-duns-la-capital.webp", alt: "D-U-N-S" },
  { src: "/logo-hallite-la-capital.webp", alt: "Hallite" },
  { src: "/logo-skf-la-capital.webp", alt: "SKF" },
  { src: "/logo-kastas-la-capital.webp", alt: "Kastaş" },
];

export function Pillars() {
  return (
    <section
      style={{ position: "relative", overflow: "hidden", color: "#fff" }}
    >
      {/* Fulfillment-warehouse photography in the background. */}
      <Image
        src="/bodega-la-capital.webp"
        alt=""
        aria-hidden
        fill
        sizes="100vw"
        style={{ objectFit: "cover", objectPosition: "center", zIndex: 0 }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          background:
            "radial-gradient(120% 90% at 50% 0%, rgba(248,184,32,.12), transparent 55%), linear-gradient(180deg, rgba(14,15,16,.86), rgba(16,18,20,.92))",
        }}
      />

      <div
        className="lc-container lc-section"
        style={{ position: "relative", zIndex: 2 }}
      >
        <div
          style={{ textAlign: "center", maxWidth: 760, margin: "0 auto 44px" }}
        >
          <p className="lc-eyebrow" style={{ color: "var(--brand)" }}>
            Por qué La Capital
          </p>
          <h2 className="lc-h2" style={{ color: "#fff" }}>
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

        {/* Quality certifications — inline */}
        <div style={{ marginTop: 52, textAlign: "center" }}>
          <p
            className="lc-eyebrow"
            style={{ color: "var(--brand)", marginBottom: 20 }}
          >
            Respaldo de calidad
          </p>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 16,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {CERTS.map((c) => (
              <div
                key={c.src}
                title={c.alt}
                style={{
                  display: "grid",
                  placeItems: "center",
                  width: 84,
                  height: 84,
                  borderRadius: 12,
                  background: "#fff",
                  padding: 12,
                  boxShadow: "var(--shadow-sm)",
                }}
              >
                <Image
                  src={c.src}
                  alt={c.alt}
                  width={60}
                  height={60}
                  style={{ width: 60, height: 60, objectFit: "contain" }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
