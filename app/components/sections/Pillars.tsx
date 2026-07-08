import Image from "next/image";
import { PillarCard } from "../PillarCard";

/* Differentiators (Por qué La Capital), over a dimmed fulfillment-warehouse
   photo. Aligned to lead-gen — no Capital GO / "mismo día" promise. Pillar 03
   is the technical-advisory differentiator. The quality certifications (moved
   here from the old "Respaldo de calidad" section) sit inline below the cards. */
type Pillar = { number: string; title: string; body: string };

const NATIONAL_PILLARS: Pillar[] = [
  {
    number: "01",
    title: "+40,000 sellos disponibles",
    body: "Inventario inmediato de marcas premium — listo para enviar.",
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
  { src: "/logo-iso-la-capital-blanco.webp", alt: "ISO 9001:2015" },
  { src: "/logo-duns-la-capital-blanco.webp", alt: "D-U-N-S" },
  { src: "/logo-hallite-la-capital-blanco.webp", alt: "Hallite" },
  { src: "/logo-skf-la-capital-blanco.webp", alt: "SKF" },
  { src: "/logo-kastas-la-capital-blanco.webp", alt: "Kastaş" },
];

export function Pillars({
  eyebrow = "¿Por qué elegir La Capital?",
  title = "Tu aliado en soluciones de sellado",
  pillars = NATIONAL_PILLARS,
}: {
  eyebrow?: string;
  title?: string;
  pillars?: Pillar[];
}) {
  return (
    <section
      style={{ position: "relative", overflow: "hidden", color: "#fff" }}
    >
      {/* Fulfillment-warehouse photography in the background. */}
      <Image
        src="/La-Capital-Sellos-Hidraulicos-bodega.webp"
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
            "radial-gradient(120% 90% at 50% 0%, rgba(248,184,32,.1), transparent 55%), linear-gradient(180deg, rgba(14,15,16,.88), rgba(16,18,20,.94))",
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
            {eyebrow}
          </p>
          <h2 className="lc-h2" style={{ color: "#fff" }}>
            {title}
          </h2>
        </div>

        <div className="lc-grid-3">
          {pillars.map((p) => (
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
              gap: "24px 40px",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {CERTS.map((c) => (
              <Image
                key={c.src}
                src={c.src}
                alt={c.alt}
                title={c.alt}
                width={1080}
                height={1080}
                style={{ height: 120, width: "auto", objectFit: "contain" }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
