import { SiteHeader } from "./components/sections/SiteHeader";
import { Hero } from "./components/sections/Hero";
import { TrustBar } from "./components/sections/TrustBar";
import { Products } from "./components/sections/Products";
import { Pillars } from "./components/sections/Pillars";
import { Industries } from "./components/sections/Industries";
import { Compatibility } from "./components/sections/Compatibility";
import { Materials } from "./components/sections/Materials";
import { ClientLogos } from "./components/sections/ClientLogos";
import { SocialProof } from "./components/sections/SocialProof";
import { Coverage } from "./components/sections/Coverage";
import { ClosingCta } from "./components/sections/ClosingCta";
import { SiteFooter } from "./components/sections/SiteFooter";
import { FloatingWhatsApp } from "./components/FloatingWhatsApp";

/* LP Campaña 1 · General · Industrial — conversion-first lead-capture landing
   for La Capital. Block order (per the campaign spec):
   1 header · 2 hero+form · 3 trust bar · 4 productos/catálogo · 5 diferenciadores ·
   6 industrias · 7 compatibilidad · 8 materiales · 9 logos de clientes ·
   10 respaldo de calidad · 11 cobertura nacional · 12 CTA cierre+form · 13 footer.
   Plus floating WhatsApp. (Chatbot HubSpot widget pending integration.) */
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
        <Compatibility />
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
