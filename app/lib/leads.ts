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
