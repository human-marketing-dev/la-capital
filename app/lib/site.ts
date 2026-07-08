/* La Capital — central site data. Contact channels are conversion-critical
   (WhatsApp is always the primary CTA), so they live in one place. */

export const PHONE_DISPLAY = "(81) 8331-6346";
export const PHONE_HREF = "tel:+528183316346";

export const WHATSAPP_NUMBER = "528115826194";
export const WHATSAPP_DISPLAY = "811 582 6194";
export const EMAIL = "ventas@la-capital.com.mx";

/** Build a wa.me deep-link with a prefilled, URL-encoded message. */
export function waLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
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
