import { WhatsAppIcon } from "./icons";
import { waLink, WA_MESSAGES } from "../lib/site";

/* Always-present primary action. The pulse is the single looping element in
   the system (disabled under prefers-reduced-motion via the .lc-pulse rule). */
export function FloatingWhatsApp() {
  return (
    <a
      href={waLink(WA_MESSAGES.quote)}
      aria-label="Cotizar por WhatsApp"
      target="_blank"
      rel="noopener noreferrer"
      className="lc-pulse"
      style={{
        position: "fixed",
        bottom: 24,
        right: 24,
        zIndex: 60,
        width: 62,
        height: 62,
        borderRadius: "50%",
        background: "var(--whatsapp)",
        color: "#fff",
        display: "grid",
        placeItems: "center",
        textDecoration: "none",
        boxShadow: "0 10px 28px rgba(37,211,102,.45)",
        animation: "lc-pulse 2.4s infinite",
      }}
    >
      <WhatsAppIcon size={34} />
    </a>
  );
}
