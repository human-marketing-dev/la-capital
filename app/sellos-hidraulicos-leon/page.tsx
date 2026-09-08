import type { Metadata } from "next";
import { SiteHeader } from "../components/sections/SiteHeader";
import { Hero } from "../components/sections/Hero";
import { TrustBar } from "../components/sections/TrustBar";
import { Products } from "../components/sections/Products";
import { Pillars } from "../components/sections/Pillars";
import { Industries } from "../components/sections/Industries";
import { ClientLogos } from "../components/sections/ClientLogos";
import { ClosingCta } from "../components/sections/ClosingCta";
import { SiteFooter } from "../components/sections/SiteFooter";
import { WhatsAppWidget } from "../components/landing/WhatsAppWidget";
import { WHATSAPP_E164, PHONE_DISPLAY, PHONE_HREF } from "../lib/site";

export const metadata: Metadata = {
  title: "Sellos hidráulicos en León | La Capital — +45,000 en stock",
  description:
    "Sellos hidráulicos, neumáticos, empaques y retenes industriales en León, Gto. +45,000 en inventario o fabricación a medida. Cotiza con asesoría técnica y recibe en el Bajío.",
};

/* Campaña · León — local variant of the national landing.
   PENDIENTE (cliente): no hay sucursal de La Capital en León dentro de
   `lib/branches.ts`, así que esta landing:
     1. NO incluye el bloque <LocalBranches /> (no inventamos una dirección), y
     2. usa el teléfono nacional (PHONE_DISPLAY/PHONE_HREF).
   Cuando el cliente confirme domicilio + teléfono + WhatsApp locales:
     - agrega PHONE_LEON_* en lib/site.ts y úsalos aquí,
     - agrega LEON_BRANCHES y monta <LocalBranches /> después de <ClientLogos />
       (copia el patrón de /sellos-hidraulicos-queretaro),
     - cambia las coverageLines del footer y el 3er stat del TrustBar.
   PENDIENTE también: fotos de producto locales. */
const LEON_STATS = [
  { value: "+45,000", label: "Sellos y empaques en inventario" },
  { value: "+20", suffix: "años", label: "Líderes en el mercado" },
  { value: "Cobertura", label: "en León y el Bajío" },
];

export default function LeonLanding() {
  return (
    <>
      <SiteHeader phoneDisplay={PHONE_DISPLAY} phoneHref={PHONE_HREF} />
      <main>
        <Hero
          eyebrow="Sellos industriales · hidráulicos · neumáticos · empaques · retenes · o-rings en León"
          titleLead="Sellos hidráulicos en León: el que tu equipo necesita,"
          subtitle="Más de 45,000 sellos industriales de marcas premium, listos para enviar a León y todo el Bajío. Cotización con asesoría técnica, sin compromiso. Y si tu medida es especial, también la fabricamos."
          phoneDisplay={PHONE_DISPLAY}
          phoneHref={PHONE_HREF}
        />
        <TrustBar stats={LEON_STATS} />
        <Products title="+45,000 sellos, empaques y retenes industriales para León" />
        <Pillars />
        <Industries />
        <ClientLogos />
        <ClosingCta
          title="¿Listo para resolver tu sellado en León? Cotiza ahora."
          subtitle="Envíanos tu número de parte, medidas o aplicación y te respondemos con asesoría técnica y tiempo de entrega a León."
          phoneDisplay={PHONE_DISPLAY}
          phoneHref={PHONE_HREF}
        />
      </main>
      <SiteFooter
        coverageLines={[
          "Cobertura en León y el Bajío",
          "Envío nacional e internacional",
          "Visita técnica en sitio",
        ]}
        phoneDisplay={PHONE_DISPLAY}
        phoneHref={PHONE_HREF}
      />
      <WhatsAppWidget
        phone={WHATSAPP_E164}
        message="Hola, necesito cotizar sellos en León"
        businessName="La Capital"
        logoSrc="/logo-la-capital.png"
        welcomeText="¡Hola! 👋 ¿Buscas tu sello en León? Escríbenos qué necesitas y te atendemos con asesoría técnica y entrega al Bajío."
      />
    </>
  );
}
