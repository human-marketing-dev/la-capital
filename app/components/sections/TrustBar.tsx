import { Stat } from "../Stat";

/* Trust band. Rendered on brand yellow (not dark) so it reads as a distinct,
   high-visibility layer between the dark hero and the white catalog below.
   Hard numbers are brand currency. `stats` can be overridden per landing
   (e.g. the Guadalajara variant swaps stat 3 for a local one). */
type StatItem = { value: string; suffix?: string; label: string };

const NATIONAL_STATS: StatItem[] = [
  { value: "+40,000", label: "Sellos y empaques en inventario" },
  { value: "+20", suffix: "años", label: "Líderes en el mercado" },
  { value: "12", label: "Sucursales en México" },
  { value: "ISO", label: "9001:2015" },
];

export function TrustBar({ stats = NATIONAL_STATS }: { stats?: StatItem[] }) {
  return (
    <section style={{ background: "var(--brand)", color: "var(--ink-900)" }}>
      <div className="lc-container lc-grid-stats" style={{ paddingBlock: 34 }}>
        {stats.map((s) => (
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
