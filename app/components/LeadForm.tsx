"use client";

import { useState, type CSSProperties } from "react";

/* Lead-capture form. This is a styled placeholder for the real HubSpot embed
   (pending from client) — it captures nothing server-side yet; on submit it
   just shows a local confirmation. Two variants:
     - "hero": full form (Nombre, Teléfono, Correo, ¿Qué sello?) + CNC checkbox.
     - "cta":  compact closing form (Nombre, Teléfono, ¿Qué sello?), dark submit.
   The CNC checkbox is the routing mechanism toward the C1|G2 (a-medida) flow. */
const badgeStyle: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 8,
  background: "var(--brand-tint)",
  color: "var(--brand-press)",
  fontFamily: "var(--font-display)",
  textTransform: "uppercase",
  letterSpacing: "0.1em",
  fontSize: "0.68rem",
  fontWeight: 600,
  padding: "6px 12px",
  borderRadius: 999,
  marginBottom: 16,
};

export function LeadForm({ variant = "hero" }: { variant?: "hero" | "cta" }) {
  const isHero = variant === "hero";
  const [sent, setSent] = useState(false);

  const cardStyle: CSSProperties = {
    background: "#fff",
    borderRadius: 14,
    boxShadow: isHero
      ? "0 24px 60px rgba(0,0,0,.4)"
      : "0 20px 50px rgba(14,15,16,.2)",
    padding: "clamp(24px,2.5vw,34px)",
    color: "var(--text-body)",
  };

  return (
    <div style={cardStyle}>
      {isHero ? <span style={badgeStyle}>Cotiza tu sello</span> : null}

      {isHero ? (
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: "1.55rem",
            lineHeight: 1.08,
            textTransform: "uppercase",
            color: "var(--ink-900)",
          }}
        >
          ¿Qué sello necesitas? Te cotizamos con asesoría técnica.
        </h2>
      ) : null}

      {sent ? (
        <p
          role="status"
          style={{
            marginTop: isHero ? 20 : 0,
            padding: "16px 18px",
            borderRadius: 6,
            background: "var(--brand-tint)",
            color: "var(--ink-900)",
            fontWeight: 600,
          }}
        >
          ¡Gracias! Te contactamos con asesoría técnica para cotizar tu sello.
        </p>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 14,
            marginTop: isHero ? 20 : 0,
          }}
        >
          <div>
            <label className="lc-label" htmlFor={`${variant}-nombre`}>
              {isHero ? "Nombre completo *" : "Nombre *"}
            </label>
            <input
              id={`${variant}-nombre`}
              className="lc-input"
              type="text"
              required
              placeholder="Tu nombre"
            />
          </div>
          <div>
            <label className="lc-label" htmlFor={`${variant}-tel`}>
              Teléfono *
            </label>
            <input
              id={`${variant}-tel`}
              className="lc-input"
              type="tel"
              required
              placeholder="10 dígitos"
            />
          </div>
          {isHero ? (
            <div>
              <label className="lc-label" htmlFor="hero-email">
                Correo electrónico *
              </label>
              <input
                id="hero-email"
                className="lc-input"
                type="email"
                required
                placeholder="tucorreo@empresa.com"
              />
            </div>
          ) : null}
          <div>
            <label className="lc-label" htmlFor={`${variant}-msg`}>
              ¿Qué sello necesitas? *
            </label>
            <textarea
              id={`${variant}-msg`}
              className="lc-input"
              required
              rows={isHero ? 3 : 2}
              placeholder={
                isHero
                  ? "Número de parte, medidas (DI × DE × ancho) o aplicación"
                  : "Número de parte, medidas o aplicación"
              }
              style={{ resize: "vertical" }}
            />
          </div>

          {isHero ? (
            <label
              style={{
                display: "flex",
                gap: 10,
                alignItems: "flex-start",
                fontSize: "0.92rem",
                color: "var(--text-body)",
                cursor: "pointer",
              }}
            >
              <input
                type="checkbox"
                style={{
                  marginTop: 3,
                  width: 18,
                  height: 18,
                  accentColor: "var(--brand)",
                }}
              />
              <span>Necesito fabricación a medida o sello especial CNC</span>
            </label>
          ) : null}

          <button
            type="submit"
            className={
              isHero
                ? "lc-btn lc-btn--brand lc-btn--full"
                : "lc-btn lc-btn--dark lc-btn--full"
            }
          >
            Quiero mi cotización
          </button>

          {isHero ? (
            <p
              style={{
                fontSize: "0.76rem",
                color: "var(--gray-400)",
                textAlign: "center",
                margin: 0,
              }}
            >
              Al enviar aceptas nuestro aviso de privacidad.
            </p>
          ) : null}
        </form>
      )}
    </div>
  );
}
