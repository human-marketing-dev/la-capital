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
  WHATSAPP_E164,
  PHONE_AGS_DISPLAY,
  PHONE_AGS_HREF,
} from "../lib/site";

export const metadata: Metadata = {
  title:
    "Sellos hidráulicos en Aguascalientes | La Capital — +45,000 en stock",
  description:
    "Sellos hidráulicos, neumáticos, empaques y retenes industriales en Aguascalientes. +45,000 en inventario o fabricación a medida. Cotiza con asesoría técnica. Sucursal en Santa Elena.",
};

/* Campaña · Sucursal Aguascalientes — local variant of the national landing.
   One sucursal (LocalBranches renders the wide single-branch layout). Same
   structure/components; geo-localized copy + Google Maps "Cómo llegar".
   Domicilio y teléfono salen de `lib/branches.ts`; WhatsApp y correo los
   confirmó el cliente el 2026-10-21.
   El WhatsApp flotante y los CTA van al número NACIONAL, como todas las
   landings salvo Puebla — es la decisión vigente, no es un olvido.
   PENDIENTE (cliente): fotos de producto locales. */
const AGS_BRANCHES = [
  {
    name: "La Capital Aguascalientes (Santa Elena)",
    addr: "Convención de 1914 Sur #1017, Fracc. Santa Elena, Aguascalientes, Ags.",
    phone: "(449) 913-4535",
    whatsapp: "(449) 461-6213",
    email: "aguascalientes@la-capital.com.mx",
  },
];

const AGS_STATS = [
  { value: "+45,000", label: "Sellos y empaques en inventario" },
  { value: "+20", suffix: "años", label: "Líderes en el mercado" },
  { value: "Sucursal", label: "en Aguascalientes" },
];

export default function AguascalientesLanding() {
  return (
    <>
      <SiteHeader phoneDisplay={PHONE_AGS_DISPLAY} phoneHref={PHONE_AGS_HREF} />
      <main>
        <Hero
          eyebrow="Sellos industriales · hidráulicos · neumáticos · empaques · retenes · o-rings en Aguascalientes"
          titleLead="Sellos hidráulicos en Aguascalientes: el que tu equipo necesita,"
          subtitle="Más de 45,000 sellos industriales de marcas premium, listos para entregar en Aguascalientes. Cotización con asesoría técnica, sin compromiso. Y si tu medida es especial, también la fabricamos."
          phoneDisplay={PHONE_AGS_DISPLAY}
          phoneHref={PHONE_AGS_HREF}
        />
        <TrustBar stats={AGS_STATS} />
        <Products title="+45,000 sellos, empaques y retenes industriales en Aguascalientes" />
        <Pillars />
        <Industries />
        <ClientLogos />
        <LocalBranches
          title="Visítanos en Aguascalientes"
          subtitle="Inventario local y entrega inmediata. Llega por tu sello o pídelo por WhatsApp."
          branches={AGS_BRANCHES}
        />
        <ClosingCta
          title="¿Listo para resolver tu sellado en Aguascalientes? Cotiza ahora."
          subtitle="Envíanos tu número de parte, medidas o aplicación y te respondemos con asesoría técnica. O visita nuestra sucursal."
          phoneDisplay={PHONE_AGS_DISPLAY}
          phoneHref={PHONE_AGS_HREF}
        />
      </main>
      <SiteFooter
        coverageLines={[
          "Sucursal en Aguascalientes",
          "Envío nacional e internacional",
          "Visita técnica en sitio",
        ]}
        phoneDisplay={PHONE_AGS_DISPLAY}
        phoneHref={PHONE_AGS_HREF}
      />
      <WhatsAppWidget
        phone={WHATSAPP_E164}
        message="Hola, necesito cotizar sellos en Aguascalientes"
        businessName="La Capital"
        logoSrc="/logo-la-capital.png"
        welcomeText="¡Hola! 👋 ¿Buscas tu sello en Aguascalientes? Escríbenos qué necesitas y te atendemos con inventario local y asesoría técnica."
      />
    </>
  );
}
