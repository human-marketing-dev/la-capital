import type { Metadata } from "next";
import { SiteHeader } from "../components/sections/SiteHeader";
import { Hero } from "../components/sections/Hero";
import { TrustBar } from "../components/sections/TrustBar";
import { Proceso } from "../components/sections/Proceso";
import { CapacidadFabricacion } from "../components/sections/CapacidadFabricacion";
import { Pillars } from "../components/sections/Pillars";
import { RespaldoCatalogo } from "../components/sections/RespaldoCatalogo";
import { Industries } from "../components/sections/Industries";
import { ClientLogos } from "../components/sections/ClientLogos";
import { ClosingCta } from "../components/sections/ClosingCta";
import { SiteFooter } from "../components/sections/SiteFooter";
import { WhatsAppWidget } from "../components/landing/WhatsAppWidget";
import { FabricacionForm } from "../components/FabricacionForm";
import { Button } from "../components/Button";
import { WhatsAppIcon } from "../components/icons";
import {
  PHONE_DISPLAY,
  PHONE_HREF,
  waLink,
  WA_MESSAGES,
  WHATSAPP_E164,
} from "../lib/site";

export const metadata: Metadata = {
  title:
    "Fabricación de sellos hidráulicos a medida (CNC) | La Capital",
  description:
    "Fabricamos sellos hidráulicos a medida, especiales o descontinuados, en CNC desde 1 pieza. Envíanos tu plano o muestra y cotizamos con asesoría de ingeniería. Cobertura nacional.",
};

/* Campaña 1 · Grupo 2 (C1|G2) — Fabricación a medida (CNC), B2B nacional.
   Precision/conversion campaign: fabrication is the protagonist (hero, form,
   proceso, capacidad), the catalog is demoted to a trust signal (RespaldoCatalogo)
   with reverse-routing to /general. Reuses shared components via props; adds two
   G2-only blocks (Proceso, CapacidadFabricacion) and a fabrication form with file
   upload. PENDING (César): CNC max diameter [XX] mm; typical fabrication lead
   time; HubSpot attachment support. */
const G2_STATS = [
  { value: "[XX] mm", label: "Diámetro máximo de fabricación" },
  { value: "+20", suffix: "años", label: "Fabricando sellos especiales" },
  { value: "Desde 1", label: "Pieza mínima de fabricación" },
];

const G2_PILLARS = [
  {
    number: "01",
    title: "Asesoría técnica",
    body: "Te ayudamos a definir material, perfil y tolerancias para que el sello funcione a la primera. No solo fabricamos: resolvemos.",
  },
  {
    number: "02",
    title: "Maquinaria CNC propia",
    body: "Planta CNC para fabricar desde una pieza hasta grandes diámetros, con tiempos rápidos y control de calidad.",
  },
  {
    number: "03",
    title: "Respaldo de +45,000 productos",
    body: "No somos un taller improvisado: somos la empresa de sellado más completa de México, con +20 años e ISO 9001:2015.",
  },
];

export default function FabricacionLanding() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero
          eyebrow="Fabricación de sellos a medida · CNC · desde 1 pieza"
          titleLead="Fabricamos tu sello hidráulico"
          titleHighlight="a la medida"
          titleTail=", aunque ya no exista en el mercado."
          subtitle="¿Sello descontinuado, medida especial o pieza única? Lo fabricamos en CNC a partir de tu plano o muestra física. Ingeniería, materiales premium y entrega rápida. Desde una sola pieza y hasta [XX] mm de diámetro."
          chips={[
            "Desde tu plano o muestra",
            "Hasta [XX] mm Ø",
            "Desde 1 pieza",
            "Entrega rápida",
          ]}
          cta={
            <Button variant="brand" size="lg" href="#cotizar">
              Cotizar mi sello a medida
            </Button>
          }
          form={<FabricacionForm variant="hero" />}
        />
        <TrustBar stats={G2_STATS} />
        <Proceso />
        <CapacidadFabricacion />
        <Pillars
          eyebrow="¿Por qué fabricar con La Capital?"
          title="Ingeniería, maquinaria propia y respaldo"
          pillars={G2_PILLARS}
        />
        <RespaldoCatalogo />
        <Industries />
        <ClientLogos background="white" />
        <ClosingCta
          title="Envíanos tu plano y fabricamos tu sello a medida."
          subtitle="Cuéntanos qué necesitas —medidas, material, aplicación o el sello descontinuado que buscas— y te respondemos con cotización y asesoría de ingeniería."
          buttons={
            <>
              <Button
                variant="wa"
                href={waLink(WA_MESSAGES.fabricacion)}
                target="_blank"
                rel="noopener noreferrer"
                icon={<WhatsAppIcon size={18} />}
                track="whatsapp_click"
              >
                Enviar plano por WhatsApp
              </Button>
              <Button
                variant="outline-ink"
                href={PHONE_HREF}
                track="phone_number_click"
              >
                Llamar {PHONE_DISPLAY}
              </Button>
            </>
          }
          form={<FabricacionForm variant="cta" />}
        />
      </main>
      <SiteFooter />
      <WhatsAppWidget
        phone={WHATSAPP_E164}
        message={WA_MESSAGES.fabricacion}
        businessName="La Capital"
        logoSrc="/logo-la-capital.png"
        welcomeText="¡Hola! 👋 ¿Necesitas fabricar un sello a medida? Envíanos tu plano, muestra o medidas y te cotizamos con asesoría de ingeniería."
      />
    </>
  );
}
