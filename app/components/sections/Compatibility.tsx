import { Button } from "../Button";
import { Chip } from "../Chip";
import { WhatsAppIcon } from "../icons";
import { waLink, WA_MESSAGES } from "../../lib/site";

/* Dark compatibility band — now centered on part-number identification rather
   than a closed list of machine logos. Brands shown as a non-exhaustive
   example ("entre muchas otras"). */
const BRANDS = [
  "Caterpillar",
  "John Deere",
  "Komatsu",
  "Case",
  "Volvo",
  "JCB",
  "Parker",
  "Hyva",
];

export function Compatibility() {
  return (
    <section style={{ background: "var(--ink-900)", color: "#fff" }}>
      <div
        className="lc-container lc-section-tight"
        style={{ textAlign: "center" }}
      >
        <p className="lc-eyebrow" style={{ color: "var(--brand)" }}>
          Compatibilidad
        </p>
        <h3 className="lc-h3" style={{ color: "#fff", marginTop: 10 }}>
          Tengas la marca de máquina que tengas
        </h3>
        <p
          style={{
            color: "var(--gray-300)",
            marginTop: 12,
            maxWidth: "62ch",
            marginInline: "auto",
          }}
        >
          ¿Tienes el número de parte del fabricante? Lo identificamos y te
          entregamos el equivalente correcto. Trabajamos con todas las marcas
          líderes de maquinaria.
        </p>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 10,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 28,
          }}
        >
          {BRANDS.map((b) => (
            <Chip key={b} tone="dark">
              {b}
            </Chip>
          ))}
          <span
            style={{
              color: "var(--gray-400)",
              fontStyle: "italic",
              fontSize: "0.95rem",
            }}
          >
            entre muchas otras
          </span>
        </div>

        <div style={{ display: "flex", justifyContent: "center", marginTop: 30 }}>
          <Button
            variant="wa"
            href={waLink(WA_MESSAGES.partNumber)}
            target="_blank"
            rel="noopener noreferrer"
            icon={<WhatsAppIcon size={18} />}
          >
            Enviar mi número de parte
          </Button>
        </div>
      </div>
    </section>
  );
}
