/* Bridge to open the floating WhatsApp chat widget from anywhere (the closing
   CTA button, the footer link). The buttons dispatch this window event; the
   mounted WhatsAppWidget listens for it and opens its chat card — so every
   "WhatsApp" entry point funnels into the same panel instead of jumping to
   wa.me directly. */
export const WHATSAPP_WIDGET_OPEN_EVENT = "lc:whatsapp-widget-open";

export function openWhatsAppWidget(): void {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(WHATSAPP_WIDGET_OPEN_EVENT));
  }
}
