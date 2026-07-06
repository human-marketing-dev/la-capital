import Image from "next/image";
import { Button } from "../Button";

type Product = {
  title: string;
  body: string;
  image: string;
  objectPosition?: string;
};

/* Catalog answers the visitor's first question — "¿tienen lo mío?" — so it
   sits right after the hero + trust bar. Fabricación a medida (CNC) is just
   one more card in the grid. Card info area is dark with the yellow accent line
   (consistent with the pillar cards). */
const PRODUCTS: Product[] = [
  {
    title: "Sellos para vástago y émbolo",
    body: "Sellos hidráulicos y neumáticos para todo tipo de cilindro.",
    image: "/sellos-hidraulicos.webp",
  },
  {
    title: "Limpiadores y guardapolvos",
    body: "Protección contra contaminación para alargar la vida del cilindro.",
    image: "/sellos-neumaticos.webp",
  },
  {
    title: "Retenes",
    body: "Sellado rotativo en nitrilo o vitón, para baja, media y alta presión.",
    image: "/retenes-la-capital.webp",
  },
  {
    title: "O-rings y respaldos",
    body: "Estándar AS568 y métrico, en todos los materiales y medidas.",
    image: "/o-rings.webp",
  },
  {
    title: "Guías y bandas de desgaste",
    body: "Soporte y guía para un funcionamiento sin metal contra metal.",
    image: "/cordon-nitrilo-70-la-capital.webp",
  },
  {
    title: "Fabricación a medida (CNC)",
    body: "¿Medida especial o descontinuada? La fabricamos en CNC, desde 1 pieza.",
    image: "/La-Capital-Sellos-Hidraulicos-fabricacion-cnc.webp",
  },
];

function ProductCard({ title, body, image, objectPosition }: Product) {
  return (
    <div className="lc-card lc-card--hover" style={{ overflow: "hidden" }}>
      <div
        style={{
          position: "relative",
          aspectRatio: "16 / 10",
          background: "#fff",
        }}
      >
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 600px) 100vw, (max-width: 920px) 50vw, 33vw"
          style={{
            objectFit: "contain",
            objectPosition: objectPosition ?? "center",
            padding: 18,
          }}
        />
      </div>
      <div
        style={{
          padding: 24,
          background: "var(--ink-900)",
          borderTop: "4px solid var(--brand)",
        }}
      >
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            fontSize: "1.25rem",
            textTransform: "uppercase",
            color: "#fff",
          }}
        >
          {title}
        </h3>
        <p
          style={{
            fontSize: "0.97rem",
            lineHeight: 1.5,
            color: "var(--gray-300)",
            marginTop: 8,
          }}
        >
          {body}
        </p>
      </div>
    </div>
  );
}

export function Products() {
  return (
    <section style={{ background: "var(--gray-50)" }}>
      <div className="lc-container lc-section">
        <div
          style={{ textAlign: "center", maxWidth: 820, margin: "0 auto 44px" }}
        >
          <p className="lc-eyebrow" style={{ color: "var(--brand-press)" }}>
            Nuestro Catálogo
          </p>
          <h2 className="lc-h2">
            +40,000 soluciones de sellado, en un solo lugar
          </h2>
        </div>

        <div className="lc-grid-3">
          {PRODUCTS.map((p) => (
            <ProductCard key={p.title} {...p} />
          ))}
        </div>

        <div
          style={{ display: "flex", justifyContent: "center", marginTop: 44 }}
        >
          <Button variant="dark" size="lg" href="#cotizar">
            Cotizar mi sello
          </Button>
        </div>
      </div>
    </section>
  );
}
