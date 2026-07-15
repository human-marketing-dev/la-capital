"use client";

import { useState, type CSSProperties } from "react";
import {
  PERSIST_KEYS,
  normalizeEmail,
  normalizePhoneMX,
  pushEvent,
  sha256,
  usePersistedAttribution,
} from "../lib/tracking";

/* Lead-capture form for the a-medida / CNC campaign (C1|G2). Styled placeholder
   for the real HubSpot embed (pending). The operational differentiator vs the
   national LeadForm is the file attachment (plano/muestra) + a free-text
   "describe tu sello" field — the form is oriented to a fabrication PROJECT, not
   a catalog product. PENDING: confirm HubSpot allows attachments on the embed. */
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

export function FabricacionForm({
  variant = "hero",
}: {
  variant?: "hero" | "cta";
}) {
  const isHero = variant === "hero";
  const [sent, setSent] = useState(false);
  const attribution = usePersistedAttribution();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const telefono = String(fd.get("telefono") ?? "");
    const correo = String(fd.get("correo") ?? "");
    const payload: Record<string, unknown> = {
      nombre: String(fd.get("nombre") ?? ""),
      empresa: String(fd.get("empresa") ?? ""),
      describe: String(fd.get("describe") ?? ""),
      sha256_phone_number: telefono
        ? await sha256(normalizePhoneMX(telefono))
        : "",
    };
    if (correo) {
      payload.sha256_email_address = await sha256(normalizeEmail(correo));
    }
    pushEvent("generate_lead", payload);
    setSent(true);
  }

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
      {isHero ? <span style={badgeStyle}>Cotiza tu fabricación</span> : null}

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
          Envíanos tu sello a fabricar y te cotizamos con asesoría de ingeniería.
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
          ¡Gracias! Revisamos tu plano y te contactamos con cotización y asesoría
          de ingeniería.
        </p>
      ) : (
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 14,
            marginTop: isHero ? 20 : 0,
          }}
        >
          {/* Attribution hidden fields — sent with the lead to its destination. */}
          {PERSIST_KEYS.map((k) => (
            <input
              key={k}
              type="hidden"
              name={k}
              value={attribution[k] ?? ""}
              readOnly
            />
          ))}
          <div>
            <label className="lc-label" htmlFor={`${variant}-fab-nombre`}>
              Nombre completo *
            </label>
            <input
              id={`${variant}-fab-nombre`}
              name="nombre"
              className="lc-input"
              type="text"
              required
              placeholder="Tu nombre"
            />
          </div>
          <div>
            <label className="lc-label" htmlFor={`${variant}-fab-empresa`}>
              Empresa *
            </label>
            <input
              id={`${variant}-fab-empresa`}
              name="empresa"
              className="lc-input"
              type="text"
              required
              placeholder="Nombre de tu empresa"
            />
          </div>
          <div>
            <label className="lc-label" htmlFor={`${variant}-fab-tel`}>
              Teléfono *
            </label>
            <input
              id={`${variant}-fab-tel`}
              name="telefono"
              className="lc-input"
              type="tel"
              required
              placeholder="10 dígitos"
            />
          </div>
          <div>
            <label className="lc-label" htmlFor={`${variant}-fab-correo`}>
              Correo electrónico *
            </label>
            <input
              id={`${variant}-fab-correo`}
              name="correo"
              className="lc-input"
              type="email"
              required
              placeholder="tucorreo@empresa.com"
            />
          </div>
          <div>
            <label className="lc-label" htmlFor={`${variant}-fab-desc`}>
              Describe tu sello *
            </label>
            <textarea
              id={`${variant}-fab-desc`}
              name="describe"
              className="lc-input"
              required
              rows={isHero ? 3 : 2}
              placeholder="Medidas (DI × DE × ancho), material, aplicación o número de parte descontinuado."
              style={{ resize: "vertical" }}
            />
          </div>
          <div>
            <label className="lc-label" htmlFor={`${variant}-fab-file`}>
              Adjuntar plano o foto de la muestra
            </label>
            <input
              id={`${variant}-fab-file`}
              name="adjunto"
              className="lc-input"
              type="file"
              accept=".pdf,.png,.jpg,.jpeg,.webp,.dwg,.dxf,.step,.stp"
              style={{ padding: "10px 12px", cursor: "pointer" }}
            />
            <p
              style={{
                fontSize: "0.76rem",
                color: "var(--gray-400)",
                marginTop: 6,
              }}
            >
              Recomendado. Acelera tu cotización.
            </p>
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
