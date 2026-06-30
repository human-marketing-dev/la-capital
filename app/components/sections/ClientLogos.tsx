import Image from "next/image";

/* Institutional social proof — auto-scrolling grayscale logo marquee.
   PLACEHOLDER set: 6 client logos in /public (black on transparent). The track
   renders the set twice so the CSS animation loops seamlessly at -50%.
   PENDING from client: final logos + written authorization to display each
   brand. With <8 logos a static centered row also reads fine (reduced-motion
   falls back to exactly that). */
const LOGO_H = 46;
const LOGOS = [
  { src: "/Logo_cliente_1.webp", w: 1294, h: 232 },
  { src: "/Logo_cliente_2.webp", w: 1289, h: 232 },
  { src: "/Logo_cliente_3.webp", w: 1316, h: 415 },
  { src: "/Logo_cliente_4.webp", w: 1304, h: 334 },
  { src: "/Logo_cliente_5.webp", w: 1294, h: 432 },
  { src: "/Logo_cliente_6.webp", w: 1305, h: 419 },
];

export function ClientLogos() {
  const loop = [...LOGOS, ...LOGOS];
  return (
    <section style={{ background: "#fff" }}>
      <div className="lc-container lc-section-tight">
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <p className="lc-eyebrow" style={{ color: "var(--gray-400)" }}>
            Confían en nosotros
          </p>
          <h3 className="lc-h3" style={{ marginTop: 10 }}>
            Empresas que ya sellan con La Capital
          </h3>
        </div>

        <div className="lc-marquee">
          <div className="lc-marquee__track">
            {loop.map((logo, i) => (
              <div
                key={`${logo.src}-${i}`}
                className="lc-marquee__item"
                aria-hidden={i >= LOGOS.length ? true : undefined}
              >
                <Image
                  src={logo.src}
                  alt="Logotipo de cliente de La Capital"
                  width={Math.round(LOGO_H * (logo.w / logo.h))}
                  height={LOGO_H}
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
