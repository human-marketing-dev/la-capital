import Image from "next/image";
import { Button } from "../Button";
import { PHONE_DISPLAY, PHONE_HREF } from "../../lib/site";

/* Sticky ink header. Logo left; phone button (primary) right. */
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
          gap: 14,
          paddingBlock: 14,
        }}
      >
        <Image
          src="/logo-la-capital.png"
          alt="La Capital — Sellos hidráulicos, neumáticos y retenes"
          width={893}
          height={228}
          priority
          className="lc-header-logo"
        />
        <Button
          variant="brand"
          size="sm"
          href={PHONE_HREF}
          icon={<span style={{ fontSize: "1.05rem" }}>✆</span>}
        >
          {PHONE_DISPLAY}
        </Button>
      </div>
    </header>
  );
}
