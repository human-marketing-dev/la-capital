import Image from "next/image";
import type { CSSProperties } from "react";
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

export function SiteFooter() {
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
            width={157}
            height={40}
            style={{ height: 40, width: "auto" }}
          />
          <p
            style={{
              marginTop: 18,
              fontSize: "0.95rem",
              lineHeight: 1.6,
              color: "var(--gray-400)",
            }}
          >
            Soluciones para la industria. Con La Capital, tu maquinaria nunca se
            detiene.
          </p>
          <div style={{ display: "flex", gap: 12, marginTop: 18 }}>
            <a
              href="https://www.linkedin.com/company/la-capital-del-sello/"
              target="_blank"
              rel="noopener noreferrer"
              style={link}
            >
              LinkedIn
            </a>
            <a href="#" style={link}>
              Facebook
            </a>
            <a href="#" style={link}>
              Instagram
            </a>
          </div>
        </div>

        {/* Contacto */}
        <div>
          <div style={heading}>Contacto</div>
          <div style={colList}>
            <a href={PHONE_HREF} style={link}>
              ✆ {PHONE_DISPLAY}
            </a>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              style={link}
            >
              WhatsApp {WHATSAPP_DISPLAY}
            </a>
            <a href={`mailto:${EMAIL}`} style={link}>
              {EMAIL}
            </a>
          </div>
        </div>

        {/* Cobertura */}
        <div>
          <div style={heading}>Cobertura</div>
          <div style={colList}>
            <span style={link}>12 sucursales en México</span>
            <span style={link}>Envío nacional e internacional</span>
            <span style={link}>Visita técnica en sitio</span>
          </div>
        </div>

        {/* Enlaces */}
        <div>
          <div style={heading}>Enlaces</div>
          <div style={colList}>
            <a
              href="https://selloslacapital.com/productos"
              target="_blank"
              rel="noopener noreferrer"
              style={link}
            >
              Catálogo de productos
            </a>
            <a
              href="https://selloslacapital.com/sucursales"
              target="_blank"
              rel="noopener noreferrer"
              style={link}
            >
              Sucursales
            </a>
            <a
              href="https://selloslacapital.com/calidad"
              target="_blank"
              rel="noopener noreferrer"
              style={link}
            >
              Calidad · ISO 9001
            </a>
            <a href="#" style={link}>
              Aviso de privacidad
            </a>
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
