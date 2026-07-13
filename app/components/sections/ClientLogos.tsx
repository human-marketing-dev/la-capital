import Image from "next/image";

/* Institutional social proof — "Empresas que ya sellan con La Capital".
   Auto-scrolling logo marquee; the set is rendered twice so the CSS animation
   loops seamlessly at -50%. Logos are client brand marks on a 300×300 square
   canvas in /public. PENDING from client: written authorization to display each. */
const LOGO_H = 160;
const LOGO_SIZE = 300; // all logos share a 300×300 canvas
const LOGOS = [
  { src: "/aceros-del-toro-logo.webp", alt: "Aceros del Toro" },
  { src: "/acs-internacional-logo.webp", alt: "ACS Internacional" },
  { src: "/agmex-logo.webp", alt: "Agmex" },
  { src: "/bridgestone-logo.webp", alt: "Bridgestone" },
  { src: "/can-am-brp-logo.webp", alt: "Can-Am (BRP)" },
  { src: "/cuprum-logo.webp", alt: "Cuprum" },
  { src: "/dacomsa-logo.webp", alt: "Dacomsa" },
  { src: "/fluidmaster-logo.webp", alt: "Fluidmaster" },
  { src: "/general-electric-grid-solutions-logo.webp", alt: "General Electric Grid Solutions" },
  { src: "/grote-industries-logo.webp", alt: "Grote Industries" },
  { src: "/haldex-logo.webp", alt: "Haldex" },
  { src: "/ilpea-logo.webp", alt: "Ilpea" },
  { src: "/indalum-logo.webp", alt: "Indalum" },
  { src: "/mysapsa-logo.webp", alt: "Mysapsa" },
  { src: "/pinturas-berel-logo.webp", alt: "Pinturas Berel" },
  { src: "/plastiexports-logo.webp", alt: "Plastiexports" },
  { src: "/prolamsa-logo.webp", alt: "Prolamsa" },
  { src: "/prosankin-logo.webp", alt: "Prosankin" },
  { src: "/swissmex-logo.webp", alt: "Swissmex" },
  { src: "/techint-logo.webp", alt: "Techint" },
  { src: "/ternium-logo.webp", alt: "Ternium" },
  { src: "/thermo-fisher-logo.webp", alt: "Thermo Fisher" },
  { src: "/vitro-logo.webp", alt: "Vitro" },
  { src: "/whirlpool-logo.webp", alt: "Whirlpool" },
];

export function ClientLogos({
  background = "brand",
}: {
  background?: "brand" | "white";
}) {
  const onBrand = background === "brand";
  const loop = [...LOGOS, ...LOGOS];
  return (
    <section style={{ background: onBrand ? "var(--brand)" : "#fff" }}>
      <div className="lc-container lc-section-tight">
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <p
            className="lc-eyebrow"
            style={{ color: onBrand ? "rgba(14,15,16,.62)" : "var(--brand-press)" }}
          >
            Nuestros Clientes
          </p>
          <h3 className="lc-h3" style={{ marginTop: 10 }}>
            Empresas que ya sellan con La Capital
          </h3>
        </div>

        <div className={onBrand ? "lc-marquee lc-marquee--on-brand" : "lc-marquee"}>
          <div className="lc-marquee__track">
            {loop.map((logo, i) => (
              <div
                key={`${logo.src}-${i}`}
                className="lc-marquee__item"
                aria-hidden={i >= LOGOS.length ? true : undefined}
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  title={logo.alt}
                  width={LOGO_SIZE}
                  height={LOGO_SIZE}
                  style={{ height: LOGO_H, width: "auto" }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
