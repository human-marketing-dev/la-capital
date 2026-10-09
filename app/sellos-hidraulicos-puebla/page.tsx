import type { Metadata } from "next";
import { SiteHeader } from "../components/sections/SiteHeader";
import { Hero } from "../components/sections/Hero";
import { TrustBar } from "../components/sections/TrustBar";
import { Products } from "../components/sections/Products";
import { Pillars } from "../components/sections/Pillars";
import { Industries } from "../components/sections/Industries";
import { ClientLogos } from "../components/sections/ClientLogos";
import { LocalBranches } from "../components/sections/LocalBranches";
import { ClosingCta } from "../components/sections/ClosingCta";
import { SiteFooter } from "../components/sections/SiteFooter";
import { WhatsAppWidget } from "../components/landing/WhatsAppWidget";
import {
  PHONE_DISPLAY,
  PHONE_HREF,
  WHATSAPP_PUEBLA_CARD,
  WHATSAPP_PUEBLA_DISPLAY,
  WHATSAPP_PUEBLA_E164,
  WHATSAPP_PUEBLA_NUMBER,
} from "../lib/site";

export const metadata: Metadata = {
  title: "Sellos hidráulicos en Puebla | La Capital — +45,000 en stock",
  description:
    "Sellos hidráulicos, neumáticos, empaques y retenes industriales en Puebla. +45,000 en inventario o fabricación a medida. Cotiza con asesoría técnica y recibe en Puebla.",
};

/* Campaña · Puebla — local variant of the national landing. Misma estructura y
   mismos componentes que las demás ciudades; solo cambia el copy geo-localizado.

   WhatsApp: ÚNICA landing con número local (221 354 5309). Widget flotante, CTA
   de cierre y footer van a ese número; las demás landings siguen en el nacional.

   PENDIENTE (cliente) — DATOS DE LA SUCURSAL. El bloque <LocalBranches /> ya
   está montado, pero dirección, teléfono y correo son marcadores de posición
   VISIBLES ("Por confirmar"). NO publicar así. Cuando lleguen los datos:
     - rellena PUEBLA_BRANCHES (addr real, phone, email),
     - agrega PHONE_PUEBLA_DISPLAY / PHONE_PUEBLA_HREF en `lib/site.ts` y
       sustituye las 8 apariciones de PHONE_DISPLAY / PHONE_HREF de abajo,
     - cambia el 3er stat a { value: "Sucursal", label: "en Puebla" } y la
       primera coverageLine del footer a "Sucursal en Puebla",
     - cierra el subtitle de <ClosingCta> con "O visita nuestra sucursal.".
   Los stats y el footer dicen "Cobertura" y no "Sucursal" justamente porque la
   dirección todavía no está confirmada. */
const PUEBLA_BRANCHES = [
  {
    name: "La Capital Puebla",
    // El mapa embebido y el botón "Cómo llegar" buscan este texto en Google
    // Maps: así centra en la ciudad en vez de mostrar un resultado roto.
    addr: "Puebla, Pue. — dirección por confirmar",
    phone: "Por confirmar",
    whatsapp: WHATSAPP_PUEBLA_CARD,
    email: "Por confirmar",
  },
];

const PUEBLA_STATS = [
  { value: "+45,000", label: "Sellos y empaques en inventario" },
  { value: "+20", suffix: "años", label: "Líderes en el mercado" },
  { value: "Cobertura", label: "en Puebla" },
];

export default function PueblaLanding() {
  return (
    <>
      <SiteHeader phoneDisplay={PHONE_DISPLAY} phoneHref={PHONE_HREF} />
      <main>
        <Hero
          eyebrow="Sellos industriales · hidráulicos · neumáticos · empaques · retenes · o-rings en Puebla"
          titleLead="Sellos hidráulicos en Puebla: el que tu equipo necesita,"
          subtitle="Más de 45,000 sellos industriales de marcas premium, listos para entregar en Puebla. Cotización con asesoría técnica, sin compromiso. Y si tu medida es especial, también la fabricamos."
          phoneDisplay={PHONE_DISPLAY}
          phoneHref={PHONE_HREF}
        />
        <TrustBar stats={PUEBLA_STATS} />
        <Products title="+45,000 sellos, empaques y retenes industriales en Puebla" />
        <Pillars />
        <Industries />
        <ClientLogos />
        <LocalBranches
          title="Visítanos en Puebla"
          subtitle="Inventario local y entrega inmediata. Llega por tu sello o pídelo por WhatsApp."
          branches={PUEBLA_BRANCHES}
        />
        <ClosingCta
          title="¿Listo para resolver tu sellado en Puebla? Cotiza ahora."
          subtitle="Envíanos tu número de parte, medidas o aplicación y te respondemos con asesoría técnica y tiempo de entrega a Puebla."
          waNumber={WHATSAPP_PUEBLA_NUMBER}
          phoneDisplay={PHONE_DISPLAY}
          phoneHref={PHONE_HREF}
        />
      </main>
      <SiteFooter
        coverageLines={[
          "Cobertura en Puebla",
          "Envío nacional e internacional",
          "Visita técnica en sitio",
        ]}
        waNumber={WHATSAPP_PUEBLA_NUMBER}
        waDisplay={WHATSAPP_PUEBLA_DISPLAY}
        phoneDisplay={PHONE_DISPLAY}
        phoneHref={PHONE_HREF}
      />
      <WhatsAppWidget
        phone={WHATSAPP_PUEBLA_E164}
        message="Hola, necesito cotizar sellos en Puebla"
        businessName="La Capital"
        logoSrc="/logo-la-capital.png"
        welcomeText="¡Hola! 👋 ¿Buscas tu sello en Puebla? Escríbenos qué necesitas y te atendemos con asesoría técnica y entrega en Puebla."
      />
    </>
  );
}
