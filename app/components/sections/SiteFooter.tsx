import Image from "next/image";
import type { CSSProperties } from "react";
import { TrackedLink } from "../TrackedLink";
import {
  PHONE_DISPLAY,
  PHONE_HREF,
  EMAIL,
  WHATSAPP_DISPLAY,
  WHATSAPP_NUMBER,
} from "../../lib/site";

const link: CSSProperties = {
  color: "var(--gray-300)",
  textDecoration: "none",
  fontSize: "0.95rem",
};
const heading: CSSProperties = {
  fontFamily: "var(--font-display)",
  textTransform: "uppercase",
  letterSpacing: "0.14em",
  fontSize: "0.78rem",
  fontWeight: 600,
  color: "var(--gray-400)",
  marginBottom: 16,
};
const colList: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 10,
};

const NATIONAL_COVERAGE = [
  "12 sucursales en México",
  "Envío nacional e internacional",
  "Visita técnica en sitio",
];

export function SiteFooter({
  coverageLines = NATIONAL_COVERAGE,
}: {
  coverageLines?: string[];
}) {
  return (
    <footer style={{ background: "var(--ink-900)", color: "var(--gray-300)" }}>
      <div
        className="lc-container"
        style={{
          paddingBlock: "clamp(56px,7vw,80px)",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "44px 32px",
        }}
      >
        {/* Brand */}
        <div style={{ maxWidth: 320 }}>
          <Image
            src="/logo-la-capital.png"
            alt="La Capital"
            width={893}
            height={228}
            style={{ height: 50, width: "auto" }}
          />
          <p
            style={{
              marginTop: 18,
              fontSize: "0.95rem",
              lineHeight: 1.6,
              color: "var(--gray-400)",
            }}
          >
            La Capital — Sellos Hidráulicos, Neumáticos y Retenes
          </p>
        </div>

        {/* Contacto */}
        <div>
          <div style={heading}>Contacto</div>
          <div style={colList}>
            <TrackedLink event="phone_number_click" href={PHONE_HREF} style={link}>
              ✆ {PHONE_DISPLAY}
            </TrackedLink>
            <TrackedLink
              event="whatsapp_click"
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              style={link}
            >
              WhatsApp {WHATSAPP_DISPLAY}
            </TrackedLink>
            <a href={`mailto:${EMAIL}`} style={link}>
              {EMAIL}
            </a>
          </div>
        </div>

        {/* Cobertura */}
        <div>
          <div style={heading}>Cobertura</div>
          <div style={colList}>
            {coverageLines.map((line) => (
              <span key={line} style={link}>
                {line}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div style={{ borderTop: "1px solid rgba(255,255,255,.08)" }}>
        <div
          className="lc-container"
          style={{
            paddingBlock: 22,
            display: "flex",
            flexWrap: "wrap",
            gap: "8px 18px",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: "0.8rem",
            color: "var(--gray-500)",
          }}
        >
          <span>
            © La Capital — Sellos hidráulicos, neumáticos y retenes. Todos los
            derechos reservados.
          </span>
          <span>ISO 9001:2015 · CSM180313.QMS</span>
        </div>
      </div>
    </footer>
  );
}
