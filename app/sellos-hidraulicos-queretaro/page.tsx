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
  PHONE_QRO_DISPLAY,
  PHONE_QRO_HREF,
} from "../lib/site";

export const metadata: Metadata = {
  title: "Sellos hidráulicos en Querétaro | La Capital — +45,000 en stock",
  description:
    "Sellos hidráulicos, neumáticos, empaques y retenes industriales en Querétaro. +45,000 en inventario o fabricación a medida. Cotiza con asesoría técnica. Sucursal en Los Molinos.",
};

/* Campaña · Sucursal Querétaro — local variant of the national landing.
   One sucursal (LocalBranches renders the wide single-branch layout). Same
   structure/components; geo-localized copy + Google Maps "Cómo llegar".
   PENDIENTE (cliente): fotos de producto locales y datos de contacto finales. */
const QRO_BRANCHES = [
  {
    name: "La Capital Querétaro (Los Molinos)",
    addr: "Epigmenio González #1009, Los Molinos, Santiago de Querétaro, Qro.",
    phone: "(442) 732-1312",
    whatsapp: "(446) 120-0343",
    email: "queretaro@la-capital.com.mx",
  },
];

const QRO_STATS = [
  { value: "+45,000", label: "Sellos y empaques en inventario" },
  { value: "+20", suffix: "años", label: "Líderes en el mercado" },
  { value: "Sucursal", label: "en Querétaro" },
];

export default function QueretaroLanding() {
  return (
    <>
      <SiteHeader phoneDisplay={PHONE_QRO_DISPLAY} phoneHref={PHONE_QRO_HREF} />
      <main>
        <Hero
          eyebrow="Sellos industriales · hidráulicos · neumáticos · empaques · retenes · o-rings en Querétaro"
          titleLead="Sellos hidráulicos en Querétaro: el que tu equipo necesita,"
          subtitle="Más de 45,000 sellos industriales de marcas premium, listos para entregar en Querétaro. Cotización con asesoría técnica, sin compromiso. Y si tu medida es especial, también la fabricamos."
          phoneDisplay={PHONE_QRO_DISPLAY}
          phoneHref={PHONE_QRO_HREF}
        />
        <TrustBar stats={QRO_STATS} />
        <Products title="+45,000 sellos, empaques y retenes industriales en Querétaro" />
        <Pillars />
        <Industries />
        <ClientLogos />
        <LocalBranches
          title="Visítanos en Querétaro"
          subtitle="Inventario local y entrega inmediata. Llega por tu sello o pídelo por WhatsApp."
          branches={QRO_BRANCHES}
        />
        <ClosingCta
          title="¿Listo para resolver tu sellado en Querétaro? Cotiza ahora."
          subtitle="Envíanos tu número de parte, medidas o aplicación y te respondemos con asesoría técnica. O visita nuestra sucursal."
          phoneDisplay={PHONE_QRO_DISPLAY}
          phoneHref={PHONE_QRO_HREF}
        />
      </main>
      <SiteFooter
        coverageLines={[
          "Sucursal en Querétaro",
          "Envío nacional e internacional",
          "Visita técnica en sitio",
        ]}
        phoneDisplay={PHONE_QRO_DISPLAY}
        phoneHref={PHONE_QRO_HREF}
      />
      <WhatsAppWidget
        phone={WHATSAPP_E164}
        message="Hola, necesito cotizar sellos en Querétaro"
        businessName="La Capital"
        logoSrc="/logo-la-capital.png"
        welcomeText="¡Hola! 👋 ¿Buscas tu sello en Querétaro? Escríbenos qué necesitas y te atendemos con inventario local y asesoría técnica."
      />
    </>
  );
}
