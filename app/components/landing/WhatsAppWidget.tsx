"use client";

import { useEffect, useId, useState } from "react";
import Image from "next/image";
import { WhatsAppIcon } from "../icons";
import { pushEvent } from "../../lib/tracking";

/* Floating WhatsApp chat widget for the landing pages. Everything is prop-driven
   (no hardcoded number/copy) so each landing can pass its own message. Replaces
   the simpler FloatingWhatsApp FAB. The CTA — not the FAB — pushes the
   `whatsapp_click` event to the dataLayer; the FAB only toggles the card. */
type WhatsAppWidgetProps = {
  phone: string; // international format, e.g. "+528115826194"
  message: string; // plain-text prefilled message
  businessName: string;
  logoSrc: string;
  welcomeText: string;
};

export function WhatsAppWidget({
  phone,
  message,
  businessName,
  logoSrc,
  welcomeText,
}: WhatsAppWidgetProps) {
  const [open, setOpen] = useState(false);
  // The FAB stays hidden for the first 3s, then fades/scales in (the delay
  // applies even under reduced motion; only the transition is dropped there).
  const [revealed, setRevealed] = useState(false);
  const panelId = useId();

  useEffect(() => {
    const timer = setTimeout(() => setRevealed(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  // api.whatsapp.com wants digits only; a literal "+" in the query would be
  // decoded as a space. Keep the "+" for display, strip it for the link.
  const digits = phone.replace(/\D/g, "");
  const href = `https://api.whatsapp.com/send/?phone=${digits}&text=${encodeURIComponent(
    message,
  )}&type=phone_number&app_absent=0`;

  const handleCtaClick = () => {
    pushEvent("whatsapp_click");
  };

  return (
    <div
      className={`wa-widget${revealed ? " wa-widget--revealed" : ""}${
        open ? " is-open" : ""
      }`}
    >
      <div className="wa-chat" id={panelId} role="dialog" aria-label={`Chat de ${businessName}`}>
        <div className="wa-chat-header">
          <div className="wa-chat-avatar">
            <Image
              src={logoSrc}
              alt={businessName}
              width={96}
              height={96}
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
          </div>
          <div className="wa-chat-header-info">
            <span className="wa-chat-name">{businessName}</span>
            <span className="wa-chat-status">
              <span className="wa-chat-status-dot" aria-hidden="true" />
              En línea
            </span>
          </div>
          <button
            type="button"
            className="wa-chat-close"
            onClick={() => setOpen(false)}
            aria-label="Cerrar chat"
          >
            ×
          </button>
        </div>

        <div className="wa-chat-body">
          <div className="wa-chat-bubble">{welcomeText}</div>
          <a
            className="wa-chat-cta"
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleCtaClick}
          >
            <WhatsAppIcon size={20} />
            Abrir WhatsApp
          </a>
        </div>
      </div>

      <button
        type="button"
        className="wa-fab"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? "Cerrar chat de WhatsApp" : "Abrir chat de WhatsApp"}
      >
        <WhatsAppIcon size={34} />
      </button>
    </div>
  );
}
