import type { Metadata } from "next";
import { SiteHeader } from "../components/sections/SiteHeader";
import { Hero } from "../components/sections/Hero";
import { TrustBar } from "../components/sections/TrustBar";
import { Products } from "../components/sections/Products";
import { Pillars } from "../components/sections/Pillars";
import { Industries } from "../components/sections/Industries";
import { ClientLogos } from "../components/sections/ClientLogos";
import { CoverageSlider } from "../components/sections/CoverageSlider";
import { ClosingCta } from "../components/sections/ClosingCta";
import { SiteFooter } from "../components/sections/SiteFooter";
import { WhatsAppWidget } from "../components/landing/WhatsAppWidget";
import { WHATSAPP_E164, WA_MESSAGES } from "../lib/site";

export const metadata: Metadata = {
  title: "Sellos hidráulicos y neumáticos — La Capital",
  description:
    "El sello que tu equipo necesita: lo tenemos o lo fabricamos. +45,000 sellos industriales de marcas premium, con asesoría técnica. Sellos hidráulicos, neumáticos, retenes y O-rings.",
};

/* LP Campaña 1 · General · Industrial — conversion-first lead-capture landing
   for La Capital. Lives at /general (the home "/" is a brand placeholder; each
   campaign gets its own route). Block order:
   header · hero+form · trust bar · productos/catálogo · ¿por qué elegir La Capital?
   (con respaldo de calidad inline) · industrias (slider) · nuestros clientes (logos) ·
   sucursales (slider) · CTA cierre+form · footer. Plus floating WhatsApp. */
export default function GeneralLanding() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <TrustBar />
        <Products />
        <Pillars />
        <Industries />
        <ClientLogos />
        <CoverageSlider />
        <ClosingCta />
      </main>
      <SiteFooter />
      <WhatsAppWidget
        phone={WHATSAPP_E164}
        message={WA_MESSAGES.quote}
        businessName="La Capital"
        logoSrc="/logo-la-capital.png"
        welcomeText="¡Hola! 👋 ¿Buscas un sello específico? Cuéntanos qué necesitas (número de parte, medida o aplicación) y te cotizamos con asesoría técnica."
      />
    </>
  );
}
