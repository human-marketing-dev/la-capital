/* La Capital — central site data. Contact channels are conversion-critical
   (WhatsApp is always the primary CTA), so they live in one place. */

export const PHONE_DISPLAY = "(81) 8331-6346";
export const PHONE_HREF = "tel:+528183316346";

// Per-landing phone CTAs (national + fabricación use the default above).
export const PHONE_GDL_DISPLAY = "(33) 2469-8034";
export const PHONE_GDL_HREF = "tel:+523324698034";
export const PHONE_SLP_DISPLAY = "(44) 4476-8767";
export const PHONE_SLP_HREF = "tel:+524444768767";
export const PHONE_SALTILLO_DISPLAY = "(844) 430-1250";
export const PHONE_SALTILLO_HREF = "tel:+528444301250";
export const PHONE_QRO_DISPLAY = "(442) 732-1312";
export const PHONE_QRO_HREF = "tel:+524427321312";
export const PHONE_CDMX_DISPLAY = "(55) 4633-0014";
export const PHONE_CDMX_HREF = "tel:+525546330014";
// León: PENDIENTE — no hay sucursal en León todavía. La landing usa el teléfono
// nacional (PHONE_DISPLAY/PHONE_HREF) hasta que el cliente confirme el local.

export const WHATSAPP_NUMBER = "528115826194";
export const WHATSAPP_E164 = "+528115826194";
export const WHATSAPP_DISPLAY = "811 582 6194";
export const EMAIL = "ventas@la-capital.com.mx";

/** Build a wa.me deep-link with a prefilled, URL-encoded message. */
export function waLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/** Same as waLink but for a specific number (any format; non-digits stripped) —
    used by local landings that route WhatsApp to a branch number. */
export function waLinkTo(number: string, message: string): string {
  return `https://wa.me/${number.replace(/\D/g, "")}?text=${encodeURIComponent(
    message,
  )}`;
}

export const WA_MESSAGES = {
  quote: "Hola, necesito cotizar sellos",
  product: "Hola, busco un producto específico",
  visit: "Hola, quiero agendar una visita técnica",
  partNumber: "Hola, tengo un número de parte y necesito el equivalente",
  application: "Hola, quiero contarles mi aplicación para encontrar el sello",
  fabricacion:
    "Hola, quiero enviar mi plano/muestra para fabricar un sello a la medida",
} as const;
