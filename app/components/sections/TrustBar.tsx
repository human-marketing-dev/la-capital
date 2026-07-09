import Image from "next/image";
import { Stat } from "../Stat";

/* Trust band. Rendered on brand yellow (not dark) so it reads as a distinct,
   high-visibility layer between the dark hero and the white catalog below.
   Hard numbers are brand currency. `stats` (3 items) can be overridden per
   landing (e.g. the Guadalajara variant swaps stat 3 for a local one); the
   fourth cell is always the ISO 9001:2015 certification mark. */
type StatItem = { value: string; suffix?: string; label: string };

const NATIONAL_STATS: StatItem[] = [
  { value: "+45,000", label: "Sellos y empaques en inventario" },
  { value: "+20", suffix: "años", label: "Líderes en el mercado" },
  { value: "12", label: "Sucursales en México" },
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
        <div style={{ minWidth: 0, display: "grid", placeItems: "center" }}>
          <Image
            src="/logo-iso-la-capital.webp"
            alt="Certificación ISO 9001:2015"
            title="ISO 9001:2015"
            width={150}
            height={150}
            style={{ height: 92, width: "auto", objectFit: "contain" }}
          />
        </div>
      </div>
    </section>
  );
}
