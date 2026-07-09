import Link from "next/link";

/* Secondary "respaldo" strip for the a-medida / CNC landing (C1|G2). The
   catalog/inventory is kept — but demoted from a conversion grid to a brief
   trust signal ("we also stock 40k+"). The link is reverse-routing: a G2
   visitor who actually wanted a standard part is sent to the general flow (G1),
   so the lead isn't lost. */
export function RespaldoCatalogo() {
  return (
    <section style={{ background: "#fff" }}>
      <div className="lc-container lc-section-tight">
        <div
          className="lc-card lc-card--accent"
          style={{
            maxWidth: 900,
            margin: "0 auto",
            padding: "clamp(28px,3vw,44px)",
            textAlign: "center",
          }}
        >
          <h3
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "clamp(1.5rem,2.4vw,2rem)",
              lineHeight: 1.1,
              textTransform: "uppercase",
              color: "var(--ink-900)",
            }}
          >
            Además de fabricar, tenemos +45,000 sellos en inventario
          </h3>
          <p
            style={{
              fontSize: "1.05rem",
              lineHeight: 1.5,
              color: "var(--text-muted)",
              marginTop: 12,
              maxWidth: "60ch",
              marginInline: "auto",
            }}
          >
            Si tu sello sí existe en catálogo, probablemente lo tenemos en stock
            listo para enviar. Fabricamos lo que no existe; surtimos lo que sí.
          </p>
          <p style={{ marginTop: 18 }}>
            <Link
              href="/general#cotizar"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.04em",
                color: "var(--brand-press)",
                textDecoration: "none",
              }}
            >
              ¿Buscas un sello de catálogo? Ver inventario general →
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
