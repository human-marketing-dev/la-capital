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
  title: "Sellos hidráulicos en Puebla | La Capital — +45,000 en stock",
  description:
    "Sellos hidráulicos, neumáticos, empaques y retenes industriales en Puebla. +45,000 en inventario o fabricación a medida. Cotiza con asesoría técnica y recibe en Puebla.",
};

/* Campaña · Puebla — local variant of the national landing. Misma estructura y
   mismos componentes que las demás ciudades; solo cambia el copy geo-localizado.

   PENDIENTE (cliente) — DATOS DE CONTACTO. No hay sucursal de Puebla en
   `lib/branches.ts` ni teléfono local, así que por ahora esta landing:
     1. NO incluye el bloque <LocalBranches /> (no inventamos una dirección), y
     2. usa el teléfono nacional (PHONE_DISPLAY / PHONE_HREF).
   Cuando lleguen domicilio + teléfono + WhatsApp + correo locales:
     - agrega PHONE_PUEBLA_DISPLAY / PHONE_PUEBLA_HREF en `lib/site.ts` y
       sustituye aquí las 8 apariciones de PHONE_DISPLAY / PHONE_HREF,
     - agrega PUEBLA_BRANCHES y monta <LocalBranches /> después de <ClientLogos />
       (copia tal cual el patrón de /sellos-hidraulicos-queretaro),
     - cambia el 3er stat a { value: "Sucursal", label: "en Puebla" } y la
       primera coverageLine del footer a "Sucursal en Puebla",
     - en <ClosingCta> cierra el subtitle con "O visita nuestra sucursal.".
   El WhatsApp flotante se queda en el número nacional a propósito: es la
   decisión vigente para TODAS las landings. */
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
        <ClosingCta
          title="¿Listo para resolver tu sellado en Puebla? Cotiza ahora."
          subtitle="Envíanos tu número de parte, medidas o aplicación y te respondemos con asesoría técnica y tiempo de entrega a Puebla."
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
        phoneDisplay={PHONE_DISPLAY}
        phoneHref={PHONE_HREF}
      />
      <WhatsAppWidget
        phone={WHATSAPP_E164}
        message="Hola, necesito cotizar sellos en Puebla"
        businessName="La Capital"
        logoSrc="/logo-la-capital.png"
        welcomeText="¡Hola! 👋 ¿Buscas tu sello en Puebla? Escríbenos qué necesitas y te atendemos con asesoría técnica y entrega en Puebla."
      />
    </>
  );
}
