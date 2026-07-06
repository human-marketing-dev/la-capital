import Image from "next/image";
import { Button } from "../Button";
import { PHONE_DISPLAY, PHONE_HREF } from "../../lib/site";

/* Sticky ink header. Logo left; phone button (primary) right. A 45° hazard
   stripe runs along the bottom edge — the recurring industrial motif. */
export function SiteHeader() {
  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "var(--ink-900)",
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
          icon={
            <span
              style={{
                fontSize: "1.75rem",
                lineHeight: 1,
                display: "inline-block",
                transform: "translateY(-0.135em)",
              }}
            >
              ✆
            </span>
          }
        >
          {PHONE_DISPLAY}
        </Button>
      </div>
      <div className="lc-hazard-rule" />
    </header>
  );
}
