import { SiteHeader } from "./components/sections/SiteHeader";
import { Hero } from "./components/sections/Hero";
import { TrustBar } from "./components/sections/TrustBar";
import { Products } from "./components/sections/Products";
import { Pillars } from "./components/sections/Pillars";
import { Industries } from "./components/sections/Industries";
import { ClientLogos } from "./components/sections/ClientLogos";
import { CoverageSlider } from "./components/sections/CoverageSlider";
import { ClosingCta } from "./components/sections/ClosingCta";
import { SiteFooter } from "./components/sections/SiteFooter";
import { FloatingWhatsApp } from "./components/FloatingWhatsApp";

/* LP Campaña 1 · General · Industrial — conversion-first lead-capture landing
   for La Capital. Block order:
   header · hero+form · trust bar · productos/catálogo · ¿por qué elegir La Capital?
   (con respaldo de calidad inline) · industrias (slider) · nuestros clientes (logos) ·
   sucursales (slider) · CTA cierre+form · footer. Plus floating WhatsApp.
   (Compatibilidad + Materiales removed per client; chatbot pending.) */
export default function Home() {
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
      <FloatingWhatsApp />
    </>
  );
}
