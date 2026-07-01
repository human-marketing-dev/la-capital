/* La Capital — the 12 sucursales (from the client's "Nuestras Sucursales" flyer).
   `x`/`y` are percentages on the México silhouette used by CoverageMap (derived
   from each branch's real lat/lng). `whatsapp` is the 10-digit local number
   (prefix 52 for wa.me). Shared by CoverageMap + CoverageSlider. */
export type Branch = {
  name: string;
  addr: string;
  phone: string;
  whatsapp?: string;
  email: string;
  x: number;
  y: number;
};

export const BRANCHES: Branch[] = [
  {
    name: "Apodaca (CEDIS)",
    addr: "Boulevard TLC #2015, Parque Industrial Finsa Monterrey, Apodaca, N.L.",
    phone: "(81) 8331-6346",
    whatsapp: "8115826194",
    email: "sellos@la-capital.com.mx",
    x: 54,
    y: 40.5,
  },
  {
    name: "Monterrey",
    addr: "Félix U. Gómez #2950, Col. Moderna, Monterrey, N.L.",
    phone: "(81) 1739-2200",
    whatsapp: "8123518113",
    email: "monterrey@la-capital.com.mx",
    x: 57,
    y: 42,
  },
  {
    name: "Apodaca",
    addr: "Carr. Miguel Alemán #512, Col. El Milagro, Apodaca, N.L.",
    phone: "(81) 2525-9192",
    whatsapp: "8123518120",
    email: "apodaca@la-capital.com.mx",
    x: 53.5,
    y: 43,
  },
  {
    name: "Saltillo",
    addr: "Blvd. Fundadores No. 2615 Local A y B, Avícola, 25015 Saltillo, Coah.",
    phone: "844 430 1250",
    whatsapp: "8446763921",
    email: "saltillo@la-capital.com.mx",
    x: 50,
    y: 43.5,
  },
  {
    name: "San Luis Potosí",
    addr: "Boulevard Rocha Cordero #14 (antes #345), Col. Industrias, S.L.P.",
    phone: "(44) 4476-8767",
    whatsapp: "4445789524",
    email: "sanluispotosi@la-capital.com.mx",
    x: 53,
    y: 55.5,
  },
  {
    name: "Aguascalientes",
    addr: "Convención de 1914 Sur #1017, Fracc. Santa Elena, Ags.",
    phone: "(449) 913-4535",
    whatsapp: "4492411102",
    email: "aguascalientes@la-capital.com.mx",
    x: 48.5,
    y: 56.5,
  },
  {
    name: "Guadalajara",
    addr: "Av. 8 de Julio #2686, Zona Industrial, Guadalajara, Jal.",
    phone: "(33) 2469-8034",
    whatsapp: "7223255349",
    email: "guadalajara@la-capital.com.mx",
    x: 45,
    y: 61,
  },
  {
    name: "Guadalajara 2",
    addr: "Av. Circunvalación Agustín Yáñez 379-A, Ferrocarril, 44440, Guadalajara, Jal.",
    phone: "(33) 3619-0205",
    email: "guadalajara2@la-capital.com.mx",
    x: 42,
    y: 62.5,
  },
  {
    name: "Querétaro",
    addr: "Epigmenio González #1009, Los Molinos, Santiago de Querétaro, Qro.",
    phone: "(442) 732-1312",
    whatsapp: "4461200343",
    email: "queretaro@la-capital.com.mx",
    x: 55.5,
    y: 61.5,
  },
  {
    name: "Toluca",
    addr: "Blvd. Miguel Alemán #217, Reforma, Álvaro Obregón, San Mateo Atenco, Méx.",
    phone: "(722) 325-5342",
    whatsapp: "7223255349",
    email: "toluca@la-capital.com.mx",
    x: 55.5,
    y: 66.5,
  },
  {
    name: "Tlalnepantla",
    addr: "Roberto Fulton #24, Parque Ind. San Nicolás, Tlalnepantla de Baz, Méx.",
    phone: "(55) 9063-6857",
    whatsapp: "5521108857",
    email: "tlalnepantla@la-capital.com.mx",
    x: 60.5,
    y: 65,
  },
  {
    name: "Ciudad de México",
    addr: "Av. Cuitláhuac #2927, Col. Obrero Popular, Azcapotzalco, CDMX",
    phone: "(55) 4633-0014",
    whatsapp: "5521781267",
    email: "cdmx@la-capital.com.mx",
    x: 58.5,
    y: 67,
  },
];

/** "Cómo llegar" — Google Maps search for the branch address. */
export function mapsLink(addr: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `La Capital ${addr}`,
  )}`;
}

/** Strip the local phone to digits and prefix 52 for wa.me. */
export function branchWa(whatsapp: string): string {
  return `https://wa.me/52${whatsapp.replace(/\D/g, "")}`;
}
