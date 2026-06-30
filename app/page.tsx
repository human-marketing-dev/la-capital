import { SiteHeader } from "./components/sections/SiteHeader";
import { Hero } from "./components/sections/Hero";
import { TrustBar } from "./components/sections/TrustBar";
import { Products } from "./components/sections/Products";
import { Pillars } from "./components/sections/Pillars";
import { Industries } from "./components/sections/Industries";
import { Materials } from "./components/sections/Materials";
import { ClientLogos } from "./components/sections/ClientLogos";
import { SocialProof } from "./components/sections/SocialProof";
import { Coverage } from "./components/sections/Coverage";
import { ClosingCta } from "./components/sections/ClosingCta";
import { SiteFooter } from "./components/sections/SiteFooter";
import { FloatingWhatsApp } from "./components/FloatingWhatsApp";

/* LP Campaña 1 · General · Industrial — conversion-first lead-capture landing
   for La Capital. Block order:
   header · hero+form · trust bar · productos/catálogo · diferenciadores ·
   industrias · materiales · empresas que ya sellan (logos) · respaldo de calidad ·
   cobertura nacional · CTA cierre+form · footer. Plus floating WhatsApp.
   (Compatibilidad removed per client; chatbot HubSpot widget pending.) */
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
        <Materials />
        <ClientLogos />
        <SocialProof />
        <Coverage />
        <ClosingCta />
      </main>
      <SiteFooter />
      <FloatingWhatsApp />
    </>
  );
}
