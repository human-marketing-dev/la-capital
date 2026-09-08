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
  PHONE_SALTILLO_DISPLAY,
  PHONE_SALTILLO_HREF,
} from "../lib/site";

export const metadata: Metadata = {
  title: "Sellos hidráulicos en Saltillo | La Capital — +45,000 en stock",
  description:
    "Sellos hidráulicos, neumáticos, empaques y retenes industriales en Saltillo. +45,000 en inventario o fabricación a medida. Cotiza con asesoría técnica. Sucursal en Blvd. Fundadores.",
};

/* Campaña · Sucursal Saltillo — local variant of the national landing.
   One sucursal (LocalBranches renders the wide single-branch layout). Same
   structure/components; geo-localized copy + Google Maps "Cómo llegar".
   PENDIENTE (cliente): fotos de producto locales y datos de contacto finales. */
const SALTILLO_BRANCHES = [
  {
    name: "La Capital Saltillo (Blvd. Fundadores)",
    addr: "Blvd. Fundadores No. 2615 Local A y B, Avícola, 25015 Saltillo, Coah.",
    phone: "(844) 430-1250",
    whatsapp: "(844) 676-3921",
    email: "saltillo@la-capital.com.mx",
  },
];

const SALTILLO_STATS = [
  { value: "+45,000", label: "Sellos y empaques en inventario" },
  { value: "+20", suffix: "años", label: "Líderes en el mercado" },
  { value: "Sucursal", label: "en Saltillo" },
];

export default function SaltilloLanding() {
  return (
    <>
      <SiteHeader
        phoneDisplay={PHONE_SALTILLO_DISPLAY}
        phoneHref={PHONE_SALTILLO_HREF}
      />
      <main>
        <Hero
          eyebrow="Sellos industriales · hidráulicos · neumáticos · empaques · retenes · o-rings en Saltillo"
          titleLead="Sellos hidráulicos en Saltillo: el que tu equipo necesita,"
          subtitle="Más de 45,000 sellos industriales de marcas premium, listos para entregar en Saltillo. Cotización con asesoría técnica, sin compromiso. Y si tu medida es especial, también la fabricamos."
          phoneDisplay={PHONE_SALTILLO_DISPLAY}
          phoneHref={PHONE_SALTILLO_HREF}
        />
        <TrustBar stats={SALTILLO_STATS} />
        <Products title="+45,000 sellos, empaques y retenes industriales en Saltillo" />
        <Pillars />
        <Industries />
        <ClientLogos />
        <LocalBranches
          title="Visítanos en Saltillo"
          subtitle="Inventario local y entrega inmediata. Llega por tu sello o pídelo por WhatsApp."
          branches={SALTILLO_BRANCHES}
        />
        <ClosingCta
          title="¿Listo para resolver tu sellado en Saltillo? Cotiza ahora."
          subtitle="Envíanos tu número de parte, medidas o aplicación y te respondemos con asesoría técnica. O visita nuestra sucursal."
          phoneDisplay={PHONE_SALTILLO_DISPLAY}
          phoneHref={PHONE_SALTILLO_HREF}
        />
      </main>
      <SiteFooter
        coverageLines={[
          "Sucursal en Saltillo",
          "Envío nacional e internacional",
          "Visita técnica en sitio",
        ]}
        phoneDisplay={PHONE_SALTILLO_DISPLAY}
        phoneHref={PHONE_SALTILLO_HREF}
      />
      <WhatsAppWidget
        phone={WHATSAPP_E164}
        message="Hola, necesito cotizar sellos en Saltillo"
        businessName="La Capital"
        logoSrc="/logo-la-capital.png"
        welcomeText="¡Hola! 👋 ¿Buscas tu sello en Saltillo? Escríbenos qué necesitas y te atendemos con inventario local y asesoría técnica."
      />
    </>
  );
}
