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
  PHONE_GDL_DISPLAY,
  PHONE_GDL_HREF,
} from "../lib/site";

export const metadata: Metadata = {
  title: "Sellos hidráulicos en Guadalajara | La Capital — +45,000 en stock",
  description:
    "Sellos hidráulicos, neumáticos, empaques y retenes industriales en Guadalajara. +45,000 en inventario o fabricación a medida. Cotiza con asesoría técnica. 2 sucursales.",
};

/* Campaña 4 · Sucursal Guadalajara — local variant of the national landing.
   Same structure/components; geo-localized copy + a local sucursales block with
   Google Maps ("Cómo llegar" as a conversion action). Only the geo-changing
   blocks receive props; the rest reuse national defaults. */
const GDL_BRANCHES = [
  {
    name: "La Capital Guadalajara (Zona Industrial)",
    addr: "Av. 8 de Julio #2686, Zona Industrial, Guadalajara, Jal.",
    phone: "(33) 2469-8034",
    whatsapp: "(33) 2154-5693",
    email: "guadalajara@la-capital.com.mx",
  },
  {
    name: "La Capital Guadalajara (Circunvalación)",
    addr: "Av. Circunvalación Agustín Yáñez 379-A, Ferrocarril, 44440, Guadalajara, Jal.",
    phone: "(33) 3619-0205 / (33) 3619-6528",
    whatsapp: "(33) 2925-7621",
    email: "guadalajara2@la-capital.com.mx",
  },
];

const GDL_STATS = [
  { value: "+45,000", label: "Sellos y empaques en inventario" },
  { value: "+20", suffix: "años", label: "Líderes en el mercado" },
  { value: "2", label: "Sucursales en Guadalajara" },
];

export default function GuadalajaraLanding() {
  return (
    <>
      <SiteHeader
        phoneDisplay={PHONE_GDL_DISPLAY}
        phoneHref={PHONE_GDL_HREF}
      />
      <main>
        <Hero
          eyebrow="Sellos industriales · hidráulicos · neumáticos · empaques · retenes · o-rings en Guadalajara"
          titleLead="Sellos hidráulicos en Guadalajara: el que tu equipo necesita,"
          subtitle="Más de 45,000 sellos industriales de marcas premium, listos para entregar en Guadalajara. Cotización con asesoría técnica, sin compromiso. Y si tu medida es especial, también la fabricamos."
          phoneHref={PHONE_GDL_HREF}
        />
        <TrustBar stats={GDL_STATS} />
        <Products title="+45,000 sellos, empaques y retenes industriales en Guadalajara" />
        <Pillars />
        <Industries />
        <ClientLogos />
        <LocalBranches
          title="Visítanos en Guadalajara"
          subtitle="Dos sucursales para atenderte con inventario local y entrega inmediata. Llega por tu sello o pídelo por WhatsApp."
          branches={GDL_BRANCHES}
        />
        <ClosingCta
          title="¿Listo para resolver tu sellado en Guadalajara? Cotiza ahora."
          subtitle="Envíanos tu número de parte, medidas o aplicación y te respondemos con asesoría técnica. O visita cualquiera de nuestras dos sucursales."
          phoneDisplay={PHONE_GDL_DISPLAY}
          phoneHref={PHONE_GDL_HREF}
        />
      </main>
      <SiteFooter
        coverageLines={[
          "Sucursales en Guadalajara",
          "Envío nacional e internacional",
          "Visita técnica en sitio",
        ]}
        phoneDisplay={PHONE_GDL_DISPLAY}
        phoneHref={PHONE_GDL_HREF}
      />
      <WhatsAppWidget
        phone={WHATSAPP_E164}
        message="Hola, necesito cotizar sellos en Guadalajara"
        businessName="La Capital"
        logoSrc="/logo-la-capital.png"
        welcomeText="¡Hola! 👋 ¿Buscas tu sello en Guadalajara? Escríbenos qué necesitas y te atendemos con inventario local y asesoría técnica."
      />
    </>
  );
}
