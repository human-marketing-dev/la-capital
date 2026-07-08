/* "Cómo trabajamos" — exclusive to the a-medida / CNC landing (C1|G2). For a
   custom-fabrication lead, spelling out the 4-step process removes uncertainty
   and shows there's engineering hand-holding. Light section between the yellow
   trust bar and the gray capacity block. */
const STEPS = [
  {
    number: "01",
    title: "Envías tu plano o muestra",
    body: "Mándanos el dibujo, las medidas o la pieza física. Si no tienes plano, la tomamos nosotros.",
  },
  {
    number: "02",
    title: "Cotizamos con ingeniería",
    body: "Definimos material, perfil y tolerancias con asesoría técnica. Te enviamos cotización y tiempo de entrega.",
  },
  {
    number: "03",
    title: "Fabricamos en CNC",
    body: "Producimos tu sello en nuestra planta CNC, desde una sola pieza y en el material que tu aplicación requiere.",
  },
  {
    number: "04",
    title: "Entregamos y damos seguimiento",
    body: "Recibes tu sello con entrega rápida, envío nacional e internacional. Acompañamiento post-venta.",
  },
];

export function Proceso() {
  return (
    <section style={{ background: "#fff" }}>
      <div className="lc-container lc-section">
        <div style={{ textAlign: "center", maxWidth: 760, margin: "0 auto 44px" }}>
          <p className="lc-eyebrow" style={{ color: "var(--brand-press)" }}>
            Cómo trabajamos
          </p>
          <h2 className="lc-h2">De tu plano a tu sello, en 4 pasos</h2>
        </div>

        <div className="lc-grid-4">
          {STEPS.map((s) => (
            <div
              key={s.number}
              className="lc-card lc-card--accent"
              style={{
                padding: 28,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                gap: 10,
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: "3.2rem",
                  lineHeight: 1,
                  color: "var(--brand)",
                }}
              >
                {s.number}
              </span>
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 600,
                  fontSize: "1.2rem",
                  lineHeight: 1.12,
                  textTransform: "uppercase",
                  color: "var(--ink-900)",
                }}
              >
                {s.title}
              </h3>
              <p
                style={{
                  fontSize: "0.95rem",
                  lineHeight: 1.5,
                  color: "var(--text-muted)",
                }}
              >
                {s.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
