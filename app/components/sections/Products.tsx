import Image from "next/image";
import { Button } from "../Button";
import { WhatsAppIcon } from "../icons";
import { waLink, WA_MESSAGES } from "../../lib/site";

type Product = {
  title: string;
  body: string;
  image: string;
  objectPosition?: string;
};

/* Catalog answers the visitor's first question — "¿tienen lo mío?" — so it
   sits right after the hero + trust bar. Fabricación a medida (CNC) is just
   one more card in the grid, with NO special treatment: it's the protagonist
   of the C1|G2 landing, a support argument here. */
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
    image: "/mecanizado_cnc.webp",
  },
];

function ProductCard({ title, body, image, objectPosition }: Product) {
  return (
    <div className="lc-card lc-card--hover" style={{ overflow: "hidden" }}>
      <div
        style={{
          position: "relative",
          aspectRatio: "16 / 10",
          borderBottom: "1.5px solid var(--gray-200)",
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
      <div style={{ padding: 24, background: "var(--brand)" }}>
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            fontSize: "1.25rem",
            textTransform: "uppercase",
            color: "var(--ink-900)",
          }}
        >
          {title}
        </h3>
        <p
          style={{
            fontSize: "0.97rem",
            lineHeight: 1.5,
            color: "var(--ink-800)",
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
    <section style={{ background: "#fff" }}>
      <div className="lc-container lc-section">
        <div
          style={{ textAlign: "center", maxWidth: 760, margin: "0 auto 44px" }}
        >
          <p className="lc-eyebrow" style={{ color: "var(--brand-press)" }}>
            Catálogo · +40,000 productos
          </p>
          <h2 className="lc-h2">Todo el sellado de fluidos, en un solo lugar</h2>
          <p
            style={{
              color: "var(--text-muted)",
              marginTop: 12,
              fontSize: "1.05rem",
            }}
          >
            Líneas completas en inventario o fabricadas a la medida. Encuentra tu
            sello por tipo o envíanos tu número de parte.
          </p>
        </div>

        <div className="lc-grid-3">
          {PRODUCTS.map((p) => (
            <ProductCard key={p.title} {...p} />
          ))}
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 14,
            alignItems: "center",
            justifyContent: "center",
            marginTop: 44,
          }}
        >
          <Button
            variant="ink-yellow"
            href="https://selloslacapital.com/productos"
            target="_blank"
            rel="noopener noreferrer"
          >
            Ver catálogo completo
          </Button>
          <Button
            variant="wa"
            href={waLink(WA_MESSAGES.product)}
            target="_blank"
            rel="noopener noreferrer"
            icon={<WhatsAppIcon size={18} />}
          >
            Cotizar mi sello
          </Button>
        </div>
      </div>
    </section>
  );
}
