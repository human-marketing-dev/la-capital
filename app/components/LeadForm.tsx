"use client";

import { useState, type CSSProperties } from "react";

/* Lead-capture form. Styled placeholder for the real HubSpot embed (pending
   from client) — captures nothing server-side yet; on submit it shows a local
   confirmation. Fields (both variants): Nombre completo · Empresa · Teléfono ·
   ¿Qué sello necesitas? (dropdown). The "Fabricación a Medida" option is the
   routing signal toward the C1|G2 (a-medida) flow. "hero" adds a badge + title. */
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

const SELLO_OPTIONS = [
  "Sellos Hidráulicos",
  "Sellos Neumáticos",
  "O-Rings",
  "Retenes",
  "Fabricación a Medida",
  "Otro",
];

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
              Nombre completo *
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
            <label className="lc-label" htmlFor={`${variant}-empresa`}>
              Empresa *
            </label>
            <input
              id={`${variant}-empresa`}
              className="lc-input"
              type="text"
              required
              placeholder="Nombre de tu empresa"
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
          <div>
            <label className="lc-label" htmlFor={`${variant}-sello`}>
              ¿Qué sello necesitas? *
            </label>
            <select
              id={`${variant}-sello`}
              className="lc-input"
              required
              defaultValue=""
              style={{ cursor: "pointer" }}
            >
              <option value="" disabled>
                Selecciona una opción
              </option>
              {SELLO_OPTIONS.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </div>

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
