import { Button } from "../Button";
import { mapsLink } from "../../lib/branches";

/* Local branch block (used by city/branch landings). Replaces the national
   12-branch slider with a focused view of the local sucursales: embedded map +
   address + contact + a "Cómo llegar" button (conversion event to drive foot
   traffic). Layout adapts to count: a single branch gets a wide map|info card;
   2+ branches get a grid of stacked cards.
   PENDING: exact Google Business links + horarios. */
type LocalBranch = {
  name: string;
  addr: string;
  phone: string;
  email: string;
  whatsapp?: string;
};

function Pin() {
  return (
    <svg
      width={18}
      height={18}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function mapSrc(addr: string) {
  return `https://maps.google.com/maps?q=${encodeURIComponent(addr)}&z=15&output=embed`;
}

function BranchBody({ b }: { b: LocalBranch }) {
  return (
    <div
      style={{
        padding: "clamp(24px,2.6vw,36px)",
        display: "flex",
        flexDirection: "column",
        gap: 10,
        flex: 1,
      }}
    >
      <h3
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 600,
          fontSize: "1.3rem",
          lineHeight: 1.1,
          textTransform: "uppercase",
          color: "var(--ink-900)",
        }}
      >
        {b.name}
      </h3>
      <p
        style={{
          fontSize: "0.95rem",
          lineHeight: 1.45,
          color: "var(--text-body)",
        }}
      >
        {b.addr}
      </p>
      <div
        style={{ fontSize: "0.92rem", color: "var(--text-muted)", lineHeight: 1.6 }}
      >
        <div>✆ {b.phone}</div>
        {b.whatsapp ? <div>WhatsApp: {b.whatsapp}</div> : null}
        <div style={{ wordBreak: "break-all" }}>✉ {b.email}</div>
        <div>Horario: 8:30 am - 6:00 pm</div>
      </div>
      <div style={{ marginTop: "auto", paddingTop: 8 }}>
        <Button
          variant="dark"
          full
          href={mapsLink(b.addr)}
          target="_blank"
          rel="noopener noreferrer"
          icon={<Pin />}
          track="Como_Llegar"
        >
          Cómo llegar
        </Button>
      </div>
    </div>
  );
}

export function LocalBranches({
  eyebrow = "Sucursales cerca de ti",
  title = "Visítanos",
  subtitle,
  branches,
}: {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  branches: LocalBranch[];
}) {
  const solo = branches.length === 1;

  return (
    <section style={{ background: "var(--gray-50)" }}>
      <div className="lc-container lc-section">
        <div
          style={{ textAlign: "center", maxWidth: 720, margin: "0 auto 44px" }}
        >
          <p className="lc-eyebrow" style={{ color: "var(--brand-press)" }}>
            {eyebrow}
          </p>
          <h2 className="lc-h2">{title}</h2>
          {subtitle ? (
            <p
              style={{
                color: "var(--text-muted)",
                marginTop: 12,
                fontSize: "1.05rem",
              }}
            >
              {subtitle}
            </p>
          ) : null}
        </div>

        {solo ? (
          <div
            className="lc-card lc-card--accent lc-branch-solo"
            style={{ overflow: "hidden" }}
          >
            <iframe
              title={`Mapa — ${branches[0].name}`}
              src={mapSrc(branches[0].addr)}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              style={{
                border: 0,
                width: "100%",
                height: "100%",
                minHeight: 340,
                display: "block",
              }}
            />
            <BranchBody b={branches[0]} />
          </div>
        ) : (
          <div className="lc-grid-cta" style={{ alignItems: "stretch" }}>
            {branches.map((b) => (
              <div
                key={b.email}
                className="lc-card lc-card--accent"
                style={{
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <iframe
                  title={`Mapa — ${b.name}`}
                  src={mapSrc(b.addr)}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  style={{
                    border: 0,
                    width: "100%",
                    height: 230,
                    display: "block",
                  }}
                />
                <BranchBody b={b} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
