import type { ReactNode } from "react";
import Image from "next/image";
import { Button } from "../Button";
import { LeadForm } from "../LeadForm";
import { PHONE_HREF } from "../../lib/site";

function HeroBadge({ children }: { children: ReactNode }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 7,
        padding: "7px 14px",
        borderRadius: 999,
        background: "var(--brand)",
        color: "var(--ink-900)",
        fontWeight: 700,
        fontSize: "0.82rem",
      }}
    >
      <span style={{ fontWeight: 800 }}>✓</span>
      {children}
    </span>
  );
}

export function Hero() {
  return (
    <section style={{ position: "relative", color: "#fff", overflow: "hidden" }}>
      {/* Industrial photography in the background (O-rings close-up). */}
      <Image
        src="/La-Capital-Sellos-Hidraulicos-bakcground-hero.webp"
        alt=""
        aria-hidden
        fill
        priority
        sizes="100vw"
        style={{ objectFit: "cover", objectPosition: "center", zIndex: 0 }}
      />
      {/* Strong dark scrim (no yellow tint) so the photo stays subtle. */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          background:
            "linear-gradient(180deg, rgba(14,15,16,.92), rgba(20,22,24,.95))",
        }}
      />
      <div
        className="lc-container lc-grid-split"
        style={{ position: "relative", zIndex: 2, paddingBlock: "clamp(44px,6vw,84px)" }}
      >
        <div>
          <p
            className="lc-eyebrow"
            style={{ color: "var(--brand)", marginBottom: 18 }}
          >
            Sellos hidráulicos · neumáticos · retenes · O-rings
          </p>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "clamp(2.5rem,5vw,4.3rem)",
              lineHeight: 1.02,
              letterSpacing: "-0.01em",
              textTransform: "uppercase",
              color: "#fff",
              textWrap: "balance",
            }}
          >
            El sello que tu equipo necesita:{" "}
            <span style={{ color: "var(--brand)" }}>lo tenemos o lo fabricamos</span>
          </h1>
          <p
            style={{
              fontSize: "1.18rem",
              lineHeight: 1.5,
              color: "#fff",
              maxWidth: "48ch",
              marginTop: 18,
            }}
          >
            Más de 40,000 sellos en inventario de marcas premium, listos para
            enviar. Cotización con asesoría técnica, sin compromiso. Y si tu medida
            es especial, también la fabricamos.
          </p>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 10,
              marginTop: 22,
            }}
          >
            <HeroBadge>+40,000 en stock</HeroBadge>
            <HeroBadge>Desde 1 pieza</HeroBadge>
            <HeroBadge>Asesoría técnica</HeroBadge>
            <HeroBadge>ISO 9001:2015</HeroBadge>
          </div>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 12,
              marginTop: 28,
              alignItems: "center",
            }}
          >
            <Button variant="outline-light" size="lg" href={PHONE_HREF}>
              Llamar ahora
            </Button>
          </div>
        </div>

        <LeadForm variant="hero" />
      </div>
    </section>
  );
}
