import { Stat } from "../Stat";

/* Trust band. Rendered on brand yellow (not dark) so it reads as a distinct,
   high-visibility layer between the dark hero and the white catalog below.
   Hard numbers are brand currency. */
const STATS = [
  { value: "+40,000", label: "Productos en stock" },
  { value: "+20", label: "Años en el mercado industrial" },
  { value: "12", label: "Sucursales en México" },
  { value: "ISO 9001", label: "Certificación de calidad" },
];

export function TrustBar() {
  return (
    <section style={{ background: "var(--brand)", color: "var(--ink-900)" }}>
      <div className="lc-container lc-grid-4" style={{ paddingBlock: 34 }}>
        {STATS.map((s) => (
          <Stat key={s.label} value={s.value} label={s.label} tone="brand" />
        ))}
      </div>
    </section>
  );
}
