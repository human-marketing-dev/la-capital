import Image from "next/image";
import { Button } from "../Button";
import { WhatsAppIcon } from "../icons";
import { PHONE_DISPLAY, PHONE_HREF, waLink, WA_MESSAGES } from "../../lib/site";

/* Sticky ink header. Logo left; phone + WhatsApp (primary) right. */
export function SiteHeader() {
  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "var(--ink-900)",
        borderBottom: "1px solid rgba(255,255,255,.08)",
      }}
    >
      <div
        className="lc-container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 24,
          paddingBlock: 14,
        }}
      >
        <Image
          src="/logo-la-capital.png"
          alt="La Capital — Sellos hidráulicos, neumáticos y retenes"
          width={157}
          height={40}
          priority
          style={{ height: 40, width: "auto" }}
        />
        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          <a
            href={PHONE_HREF}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              color: "#fff",
              textDecoration: "none",
              fontWeight: 600,
              fontSize: "0.95rem",
            }}
          >
            <span style={{ color: "var(--brand)", fontSize: "1.05rem" }}>✆</span>
            <span style={{ whiteSpace: "nowrap" }}>{PHONE_DISPLAY}</span>
          </a>
          <Button
            variant="wa"
            size="sm"
            href={waLink(WA_MESSAGES.quote)}
            target="_blank"
            rel="noopener noreferrer"
            icon={<WhatsAppIcon size={16} />}
          >
            WhatsApp
          </Button>
        </div>
      </div>
    </header>
  );
}
