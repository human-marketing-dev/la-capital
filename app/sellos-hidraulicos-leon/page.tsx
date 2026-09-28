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
  PHONE_LEON_DISPLAY,
  PHONE_LEON_HREF,
} from "../lib/site";

export const metadata: Metadata = {
  title: "Sellos hidráulicos en León | La Capital — +45,000 en stock",
  description:
    "Sellos hidráulicos, neumáticos, empaques y retenes industriales en León, Gto. +45,000 en inventario o fabricación a medida. Cotiza con asesoría técnica. Sucursal en Blvd. Miguel Hidalgo.",
};

/* Campaña · Sucursal León — local variant of the national landing.
   One sucursal (LocalBranches renders the wide single-branch layout). Same
   structure/components; geo-localized copy + Google Maps "Cómo llegar".
   El teléfono de la sucursal también recibe WhatsApp, de ahí el mismo número en
   las dos líneas de la tarjeta.
   NOTA: esta sucursal NO está en `lib/branches.ts`, así que no aparece en el
   mapa/slider de cobertura nacional (que sigue diciendo "12 sucursales").
   PENDIENTE (cliente): fotos de producto locales. */
const LEON_BRANCHES = [
  {
    name: "La Capital León (Héroes de Chapultepec)",
    addr: "Blvrd Miguel Hidalgo 915, Héroes de Chapultepec, 37190 León de los Aldama, Gto.",
    phone: "(477) 717-0102",
    whatsapp: "(477) 717-0102",
    email: "leon@la-capital.com.mx",
  },
];

const LEON_STATS = [
  { value: "+45,000", label: "Sellos y empaques en inventario" },
  { value: "+20", suffix: "años", label: "Líderes en el mercado" },
  { value: "Sucursal", label: "en León" },
];

export default function LeonLanding() {
  return (
    <>
      <SiteHeader
        phoneDisplay={PHONE_LEON_DISPLAY}
        phoneHref={PHONE_LEON_HREF}
      />
      <main>
        <Hero
          eyebrow="Sellos industriales · hidráulicos · neumáticos · empaques · retenes · o-rings en León"
          titleLead="Sellos hidráulicos en León: el que tu equipo necesita,"
          subtitle="Más de 45,000 sellos industriales de marcas premium, listos para entregar en León. Cotización con asesoría técnica, sin compromiso. Y si tu medida es especial, también la fabricamos."
          phoneDisplay={PHONE_LEON_DISPLAY}
          phoneHref={PHONE_LEON_HREF}
        />
        <TrustBar stats={LEON_STATS} />
        <Products title="+45,000 sellos, empaques y retenes industriales en León" />
        <Pillars />
        <Industries />
        <ClientLogos />
        <LocalBranches
          title="Visítanos en León"
          subtitle="Inventario local y entrega inmediata. Llega por tu sello o pídelo por WhatsApp."
          branches={LEON_BRANCHES}
        />
        <ClosingCta
          title="¿Listo para resolver tu sellado en León? Cotiza ahora."
          subtitle="Envíanos tu número de parte, medidas o aplicación y te respondemos con asesoría técnica. O visita nuestra sucursal."
          phoneDisplay={PHONE_LEON_DISPLAY}
          phoneHref={PHONE_LEON_HREF}
        />
      </main>
      <SiteFooter
        coverageLines={[
          "Sucursal en León",
          "Envío nacional e internacional",
          "Visita técnica en sitio",
        ]}
        phoneDisplay={PHONE_LEON_DISPLAY}
        phoneHref={PHONE_LEON_HREF}
      />
      <WhatsAppWidget
        phone={WHATSAPP_E164}
        message="Hola, necesito cotizar sellos en León"
        businessName="La Capital"
        logoSrc="/logo-la-capital.png"
        welcomeText="¡Hola! 👋 ¿Buscas tu sello en León? Escríbenos qué necesitas y te atendemos con inventario local y asesoría técnica."
      />
    </>
  );
}
