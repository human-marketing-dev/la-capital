/* Shared lead-pipeline config, imported by the lead forms (client) AND
   /api/lead (server) so form + server validation stay in sync. No "use client":
   plain values, safe on both sides.
   - Landing → origen label (+ whitelist used for server validation).
   - The "¿qué sello necesitas?" dropdown options.
   - Field length limits. */

export const LANDING_ORIGEN: Record<string, string> = {
  "/sellos-hidraulicos-y-neumaticos": "Nacional",
  "/sellos-hidraulicos-guadalajara": "Guadalajara",
  "/sellos-hidraulicos-san-luis-potosi": "San Luis Potosí",
  "/sellos-hidraulicos-leon": "León",
  "/sellos-hidraulicos-saltillo": "Saltillo",
  "/sellos-hidraulicos-queretaro": "Querétaro",
  "/sellos-hidraulicos-cdmx": "CDMX",
  "/fabricacion-de-sellos-hidraulicos": "Nacional",
};

/** Distinct origen labels — the server-side whitelist. */
export const LANDING_ORIGENES: string[] = Array.from(
  new Set(Object.values(LANDING_ORIGEN)),
);

/** Resolve the origen label for a pathname; falls back to "Nacional". */
export function origenForPath(pathname: string): string {
  return LANDING_ORIGEN[pathname] ?? "Nacional";
}

/* Landing → Google Sheets TAB name (one tab per form). Keyed by pathname, NOT
   by `origen`, because /fabricacion-de-sellos-hidraulicos reports origen
   "Nacional" and would otherwise collide with the national catalog landing.
   Accent-free, like the field keys, to keep tab names stable and typo-proof.
   Keep this in sync with LANDING_ORIGEN above — same keys. */
export const SHEET_TAB: Record<string, string> = {
  "/sellos-hidraulicos-y-neumaticos": "Nacional",
  "/sellos-hidraulicos-guadalajara": "Guadalajara",
  "/sellos-hidraulicos-san-luis-potosi": "San Luis Potosi",
  "/sellos-hidraulicos-leon": "Leon",
  "/sellos-hidraulicos-saltillo": "Saltillo",
  "/sellos-hidraulicos-queretaro": "Queretaro",
  "/sellos-hidraulicos-cdmx": "CDMX",
  "/fabricacion-de-sellos-hidraulicos": "Fabricacion",
};

export const UNCLASSIFIED_TAB = "Sin clasificar";

/** Strip diacritics so an `origen` label matches its accent-free tab name
    ("San Luis Potosí" → "San Luis Potosi"). Every origen in LANDING_ORIGEN
    de-accents to exactly its SHEET_TAB value, which is what makes the
    origen-based fallback below agree with the pathname map. */
function deaccent(value: string): string {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

/** Resolve the sheet tab for a submission, most precise source first:
      1. the landing pathname (the normal case),
      2. formType — a fabricación lead always belongs in "Fabricacion",
      3. the origen label, de-accented,
      4. UNCLASSIFIED_TAB, so a row is never silently lost.
    `pagina` is optional on purpose: a client running stale JS posts without it
    and must still succeed. */
export function sheetTabFor(
  pagina: string,
  formType: string,
  origen: string,
): string {
  const byPath = SHEET_TAB[pagina];
  if (byPath) return byPath;
  if (formType === "fabricacion") return "Fabricacion";
  const byOrigen = origen.trim() ? deaccent(origen.trim()) : "";
  return byOrigen || UNCLASSIFIED_TAB;
}

export const SELLO_OPTIONS = [
  "Sellos Hidráulicos",
  "Sellos Neumáticos",
  "O-Rings",
  "Retenes",
  "Fabricación a Medida",
  "Otro",
];

export const FORM_TYPES = ["lead", "fabricacion"] as const;
export type FormType = (typeof FORM_TYPES)[number];

export const FIELD_LIMITS = {
  nombre: 120,
  empresa: 160,
  telefono: 40,
  correo: 160,
  describe: 2000,
  sello: 60,
  adjuntoNombre: 260,
} as const;

/* Attachment rules for the fabricación form (plano/muestra), shared by the
   client (immediate feedback) and /api/lead (authoritative check).
   3 MB because Brevo documents ~4 MB per attachment but does NOT state whether
   that ceiling is the raw file or the base64 payload (~+33%) — so we stay under
   it either way. Formats limited to Brevo's supported list (webp and CAD
   formats like dwg/dxf/step are NOT supported by Brevo). */
export const ATTACHMENT_MAX_BYTES = 3 * 1024 * 1024;
export const ATTACHMENT_MAX_LABEL = "3 MB";
export const ATTACHMENT_MIME_TYPES = [
  "application/pdf",
  "image/jpeg",
  "image/png",
];
export const ATTACHMENT_EXTENSIONS = [".pdf", ".jpg", ".jpeg", ".png"];
export const ATTACHMENT_ACCEPT =
  ".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png";
