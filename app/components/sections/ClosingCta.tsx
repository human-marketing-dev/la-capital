import type { ReactNode } from "react";
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
   stripe at the top, last lead-capture form on the right. Title/subtitle are
   overridable per landing; `directionsHref` adds a "Cómo llegar" button (used by
   the local/branch variants to drive foot traffic). `buttons` and `form` slots
   let a campaign swap the channels + form (e.g. the a-medida/CNC variant uses a
   "Enviar plano" form). */
type ClosingCtaProps = {
  title?: string;
  subtitle?: string;
  directionsHref?: string;
  buttons?: ReactNode;
  form?: ReactNode;
};

export function ClosingCta({
  title = "¿Listo para resolver tu sellado? Cotiza ahora.",
  subtitle = "Envíanos tu número de parte, medidas o aplicación y te respondemos con asesoría técnica.",
  directionsHref,
  buttons,
  form = <LeadForm variant="cta" />,
}: ClosingCtaProps) {
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
            {title}
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
            {subtitle}
          </p>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 12,
              marginTop: 24,
            }}
          >
            {buttons ?? (
              <>
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
                {directionsHref ? (
                  <Button
                    variant="dark"
                    href={directionsHref}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Cómo llegar
                  </Button>
                ) : null}
              </>
            )}
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

        {form}
      </div>
    </section>
  );
}
