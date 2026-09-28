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
  PHONE_CDMX_DISPLAY,
  PHONE_CDMX_HREF,
} from "../lib/site";

export const metadata: Metadata = {
  title: "Sellos hidráulicos en CDMX | La Capital — +45,000 en stock",
  description:
    "Sellos hidráulicos, neumáticos, empaques y retenes industriales en CDMX y zona metropolitana. +45,000 en inventario o fabricación a medida. Cotiza con asesoría técnica. 2 sucursales.",
};

/* Campaña · Sucursal CDMX — local variant of the national landing.
   Cubre el Valle de México con dos sucursales (Azcapotzalco + Tlalnepantla),
   igual que Guadalajara: LocalBranches renderiza el grid de 2 tarjetas.
   Datos de Azcapotzalco CONFIRMADOS por el cliente (2026-09-28).
   PENDIENTE (cliente): confirmar si Tlalnepantla entra en esta campaña (sus
   datos vienen del flyer de sucursales, no de una confirmación directa) y fotos
   de producto locales. */
const CDMX_BRANCHES = [
  {
    name: "La Capital Ciudad de México (Azcapotzalco)",
    addr: "Av. Cuitláhuac #2927, Col. Obrero Popular, Alcaldía de Azcapotzalco, CDMX",
    phone: "(55) 4633-0014",
    whatsapp: "(55) 2178-1267",
    email: "cdmx@la-capital.com.mx",
  },
  {
    name: "La Capital Tlalnepantla (Parque Ind. San Nicolás)",
    addr: "Roberto Fulton #24, Parque Ind. San Nicolás, Tlalnepantla de Baz, Méx.",
    phone: "(55) 9063-6857",
    whatsapp: "(55) 2110-8857",
    email: "tlalnepantla@la-capital.com.mx",
  },
];

const CDMX_STATS = [
  { value: "+45,000", label: "Sellos y empaques en inventario" },
  { value: "+20", suffix: "años", label: "Líderes en el mercado" },
  { value: "2", label: "Sucursales en el Valle de México" },
];

export default function CdmxLanding() {
  return (
    <>
      <SiteHeader
        phoneDisplay={PHONE_CDMX_DISPLAY}
        phoneHref={PHONE_CDMX_HREF}
      />
      <main>
        <Hero
          eyebrow="Sellos industriales · hidráulicos · neumáticos · empaques · retenes · o-rings en CDMX"
          titleLead="Sellos hidráulicos en CDMX: el que tu equipo necesita,"
          subtitle="Más de 45,000 sellos industriales de marcas premium, listos para entregar en CDMX y zona metropolitana. Cotización con asesoría técnica, sin compromiso. Y si tu medida es especial, también la fabricamos."
          phoneDisplay={PHONE_CDMX_DISPLAY}
          phoneHref={PHONE_CDMX_HREF}
        />
        <TrustBar stats={CDMX_STATS} />
        <Products title="+45,000 sellos, empaques y retenes industriales en CDMX" />
        <Pillars />
        <Industries />
        <ClientLogos />
        <LocalBranches
          title="Visítanos en CDMX y zona metropolitana"
          subtitle="Dos sucursales para atenderte con inventario local y entrega inmediata. Llega por tu sello o pídelo por WhatsApp."
          branches={CDMX_BRANCHES}
        />
        <ClosingCta
          title="¿Listo para resolver tu sellado en CDMX? Cotiza ahora."
          subtitle="Envíanos tu número de parte, medidas o aplicación y te respondemos con asesoría técnica. O visita cualquiera de nuestras dos sucursales."
          phoneDisplay={PHONE_CDMX_DISPLAY}
          phoneHref={PHONE_CDMX_HREF}
        />
      </main>
      <SiteFooter
        coverageLines={[
          "Sucursales en CDMX y Tlalnepantla",
          "Envío nacional e internacional",
          "Visita técnica en sitio",
        ]}
        phoneDisplay={PHONE_CDMX_DISPLAY}
        phoneHref={PHONE_CDMX_HREF}
      />
      <WhatsAppWidget
        phone={WHATSAPP_E164}
        message="Hola, necesito cotizar sellos en CDMX"
        businessName="La Capital"
        logoSrc="/logo-la-capital.png"
        welcomeText="¡Hola! 👋 ¿Buscas tu sello en CDMX? Escríbenos qué necesitas y te atendemos con inventario local y asesoría técnica."
      />
    </>
  );
}
