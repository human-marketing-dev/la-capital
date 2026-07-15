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
  PHONE_SLP_DISPLAY,
  PHONE_SLP_HREF,
} from "../lib/site";

export const metadata: Metadata = {
  title: "Sellos hidráulicos en San Luis Potosí | La Capital — +45,000 en stock",
  description:
    "Sellos hidráulicos, neumáticos, empaques y retenes industriales en San Luis Potosí. +45,000 en inventario o fabricación a medida. Cotiza con asesoría técnica. Sucursal en Col. Industrias.",
};

/* Campaña 3 · Sucursal San Luis Potosí — local variant of the national landing.
   One sucursal (LocalBranches renders the wide single-branch layout). Same
   structure/components; geo-localized copy + Google Maps "Cómo llegar". */
const SLP_BRANCHES = [
  {
    name: "La Capital San Luis Potosí (Col. Industrias)",
    addr: "Boulevard Rocha Cordero #14 (antes #345), Col. Industrias, San Luis Potosí, S.L.P.",
    phone: "(44) 4476-8767",
    whatsapp: "(44) 4578-9524",
    email: "sanluispotosi@la-capital.com.mx",
  },
];

const SLP_STATS = [
  { value: "+45,000", label: "Sellos y empaques en inventario" },
  { value: "+20", suffix: "años", label: "Líderes en el mercado" },
  { value: "Sucursal", label: "en San Luis Potosí" },
];

export default function SanLuisPotosiLanding() {
  return (
    <>
      <SiteHeader
        phoneDisplay={PHONE_SLP_DISPLAY}
        phoneHref={PHONE_SLP_HREF}
      />
      <main>
        <Hero
          eyebrow="Sellos industriales · hidráulicos · neumáticos · empaques · retenes · o-rings en San Luis Potosí"
          titleLead="Sellos hidráulicos en San Luis Potosí: el que tu equipo necesita,"
          subtitle="Más de 45,000 sellos industriales de marcas premium, listos para entregar en San Luis Potosí. Cotización con asesoría técnica, sin compromiso. Y si tu medida es especial, también la fabricamos."
          phoneHref={PHONE_SLP_HREF}
        />
        <TrustBar stats={SLP_STATS} />
        <Products title="+45,000 sellos, empaques y retenes industriales en San Luis Potosí" />
        <Pillars />
        <Industries />
        <ClientLogos />
        <LocalBranches
          title="Visítanos en San Luis Potosí"
          subtitle="Inventario local y entrega inmediata. Llega por tu sello o pídelo por WhatsApp."
          branches={SLP_BRANCHES}
        />
        <ClosingCta
          title="¿Listo para resolver tu sellado en San Luis Potosí? Cotiza ahora."
          subtitle="Envíanos tu número de parte, medidas o aplicación y te respondemos con asesoría técnica. O visita nuestra sucursal."
          phoneDisplay={PHONE_SLP_DISPLAY}
          phoneHref={PHONE_SLP_HREF}
        />
      </main>
      <SiteFooter
        coverageLines={[
          "Sucursal en San Luis Potosí",
          "Envío nacional e internacional",
          "Visita técnica en sitio",
        ]}
        phoneDisplay={PHONE_SLP_DISPLAY}
        phoneHref={PHONE_SLP_HREF}
      />
      <WhatsAppWidget
        phone={WHATSAPP_E164}
        message="Hola, necesito cotizar sellos en San Luis Potosí"
        businessName="La Capital"
        logoSrc="/logo-la-capital.png"
        welcomeText="¡Hola! 👋 ¿Buscas tu sello en San Luis Potosí? Escríbenos qué necesitas y te atendemos con inventario local y asesoría técnica."
      />
    </>
  );
}
