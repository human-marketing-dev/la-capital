import { Button } from "../Button";
import { LeadForm } from "../LeadForm";
import { WhatsAppIcon } from "../icons";
import {
  PHONE_DISPLAY,
  PHONE_HREF,
  WHATSAPP_DISPLAY,
  waLink,
  WA_MESSAGES,
} from "../../lib/site";

/* Closing CTA — the one large flat yellow fill in the system. Dark hazard
   stripe at the top, last lead-capture form on the right. */
export function ClosingCta() {
  return (
    <section
      id="cotizar"
      style={{
        background: "var(--brand)",
        color: "var(--ink-900)",
        position: "relative",
        overflow: "hidden",
        scrollMarginTop: 80,
      }}
    >
      <div
        className="lc-hazard-rule"
        style={{ position: "absolute", top: 0, left: 0, right: 0 }}
      />

      <div className="lc-container lc-section lc-grid-cta">
        <div>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "clamp(2.2rem,4vw,3.2rem)",
              lineHeight: 1.02,
              textTransform: "uppercase",
            }}
          >
            ¿Listo para resolver tu sellado? Cotiza ahora.
          </h2>
          <p
            style={{
              fontSize: "1.18rem",
              lineHeight: 1.5,
              marginTop: 14,
              maxWidth: "44ch",
              color: "rgba(14,15,16,.78)",
            }}
          >
            Envíanos tu número de parte, medidas o aplicación y te respondemos con
            asesoría técnica.
          </p>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 12,
              marginTop: 24,
            }}
          >
            <Button
              variant="wa"
              href={waLink(WA_MESSAGES.quote)}
              target="_blank"
              rel="noopener noreferrer"
              icon={<WhatsAppIcon size={18} />}
            >
              WhatsApp
            </Button>
            <Button variant="outline-ink" href={PHONE_HREF}>
              Llamar {PHONE_DISPLAY}
            </Button>
          </div>
          <p
            style={{
              marginTop: 16,
              fontSize: "0.92rem",
              color: "rgba(14,15,16,.72)",
            }}
          >
            O escríbenos por WhatsApp al{" "}
            <a
              href={waLink(WA_MESSAGES.quote)}
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontWeight: 700, color: "var(--ink-900)" }}
            >
              {WHATSAPP_DISPLAY}
            </a>
            .
          </p>
        </div>

        <LeadForm variant="cta" />
      </div>
    </section>
  );
}
