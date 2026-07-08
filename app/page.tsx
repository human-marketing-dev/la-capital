import Image from "next/image";
import { PHONE_DISPLAY, PHONE_HREF } from "./lib/site";

/* Brand placeholder for the site root. The campaign landing pages each live on
   their own route (e.g. /general); this "/" is a holding page for now. */
export default function Home() {
  return (
    <main
      style={{
        position: "relative",
        minHeight: "100dvh",
        display: "grid",
        placeItems: "center",
        textAlign: "center",
        padding: "clamp(32px,6vw,72px)",
        color: "#fff",
        overflow: "hidden",
        background:
          "radial-gradient(120% 90% at 50% 0%, rgba(248,184,32,.12), transparent 55%), linear-gradient(180deg, #0e0f10, #16181a)",
      }}
    >
      <div
        className="lc-hazard-rule"
        style={{ position: "absolute", top: 0, left: 0, right: 0 }}
      />

      <div style={{ maxWidth: 560 }}>
        <Image
          src="/logo-la-capital.png"
          alt="La Capital — Sellos hidráulicos, neumáticos y retenes"
          width={893}
          height={228}
          priority
          style={{ height: 64, width: "auto", margin: "0 auto" }}
        />
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: "clamp(1.8rem,4.5vw,2.8rem)",
            lineHeight: 1.05,
            letterSpacing: "-0.01em",
            textTransform: "uppercase",
            marginTop: 32,
          }}
        >
          Soluciones para la industria
        </h1>
        <p
          style={{
            color: "var(--gray-300)",
            fontSize: "1.1rem",
            lineHeight: 1.5,
            marginTop: 14,
          }}
        >
          Sellos hidráulicos, neumáticos y retenes. Nuestro nuevo sitio está en
          construcción.
        </p>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: 30,
          }}
        >
          <a
            href={PHONE_HREF}
            className="lc-btn lc-btn--brand lc-btn--lg"
            style={{ textDecoration: "none" }}
          >
            <span style={{ fontSize: "1.4rem", lineHeight: 1 }}>✆</span>
            {PHONE_DISPLAY}
          </a>
        </div>
      </div>
    </main>
  );
}
