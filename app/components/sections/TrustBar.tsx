import { Stat } from "../Stat";

/* Trust band. Rendered on brand yellow (not dark) so it reads as a distinct,
   high-visibility layer between the dark hero and the white catalog below.
   Hard numbers are brand currency. */
const STATS: { value: string; suffix?: string; label: string }[] = [
  { value: "+40,000", label: "Productos en inventario" },
  { value: "+20", suffix: "años", label: "Líderes en el mercado" },
  { value: "12", label: "Sucursales en México" },
  { value: "ISO 9001", label: "Empresa certificada" },
];

export function TrustBar() {
  return (
    <section style={{ background: "var(--brand)", color: "var(--ink-900)" }}>
      <div className="lc-container lc-grid-stats" style={{ paddingBlock: 34 }}>
        {STATS.map((s) => (
          <Stat
            key={s.label}
            value={s.value}
            suffix={s.suffix}
            label={s.label}
            tone="brand"
          />
        ))}
      </div>
    </section>
  );
}
