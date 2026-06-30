import { Chip } from "../Chip";

/* Materials we work with — from standard nitrile to compounds for aggressive
   fluids and extreme temperatures. */
const MATERIALS = [
  "Nitrilo",
  "Viton",
  "Teflón (PTFE)",
  "Poliuretano",
  "EPDM",
  "Silicón",
  "Nylon",
  "Poliacetal",
  "Uretano",
  "Aflas",
];

export function Materials() {
  return (
    <section
      style={{
        background: "var(--gray-50)",
        borderTop: "1px solid var(--gray-200)",
      }}
    >
      <div
        className="lc-container lc-section-tight"
        style={{ textAlign: "center" }}
      >
        <h3 className="lc-h3">Materiales que manejamos</h3>
        <p
          style={{
            color: "var(--text-muted)",
            marginTop: 10,
            fontSize: "1.02rem",
          }}
        >
          Del nitrilo estándar a compuestos para fluidos agresivos y temperaturas
          extremas.
        </p>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 12,
            justifyContent: "center",
            marginTop: 28,
          }}
        >
          {MATERIALS.map((m) => (
            <Chip key={m}>{m}</Chip>
          ))}
        </div>
      </div>
    </section>
  );
}
