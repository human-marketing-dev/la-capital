/* Google Sheets lead mirror — SERVER ONLY. Never import this from a client
   component: it reads SHEETS_WEBHOOK_URL / SHEETS_SECRET (no NEXT_PUBLIC_
   prefix, so they would be undefined in the browser anyway, but the secret must
   never reach a bundle).

   The destination is a Google Apps Script Web App acting as a webhook. Contract:
     POST { secret, landing, fields } → text/plain "ok" | "unauthorized"
   `landing` is the sheet TAB name (created on demand). On the first write to an
   empty tab the KEYS of `fields` become the column headers (plus an automatic
   `Fecha` column); after that, a key with no matching header is SILENTLY
   DROPPED. So callers must always send the same complete key set for a tab, in
   the same order, using "" for missing values — never a conditional key.

   This mirror is best-effort: the transactional email is the critical path, so
   every failure here is logged and swallowed. Nothing in this module throws. */

type LeadFields = Record<string, string>;

/* Google Sheets evaluates a cell that starts with =, +, - or @ as a formula, so
   a phone like "+52 81..." becomes a broken formula and a crafted value becomes
   formula injection. A leading apostrophe forces Sheets to treat the whole cell
   as text (and is not shown in the UI). Tested against the TRIMMED value so
   leading whitespace/tabs can't sneak a formula past the check. */
function sanitize(value: unknown): string {
  const s = value == null ? "" : String(value);
  return /^[=+\-@]/.test(s.trim()) ? `'${s}` : s;
}

export async function enviarLeadASheets(
  landing: string,
  fields: LeadFields,
): Promise<void> {
  const url = process.env.SHEETS_WEBHOOK_URL;
  const secret = process.env.SHEETS_SECRET;
  if (!url || !secret) {
    console.error("[sheets] Faltan SHEETS_WEBHOOK_URL o SHEETS_SECRET");
    return;
  }

  const safeFields: LeadFields = {};
  for (const [key, value] of Object.entries(fields)) {
    safeFields[key] = sanitize(value);
  }

  try {
    // Apps Script answers with a 302 to script.googleusercontent.com; fetch
    // follows it automatically, so the body arrives on the redirected response.
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ secret, landing, fields: safeFields }),
      cache: "no-store",
      signal: AbortSignal.timeout(8000),
    });

    const text = await res.text();
    if (text.trim() !== "ok") {
      console.error("[sheets] Respuesta inesperada:", text.slice(0, 200));
    }
  } catch (err) {
    // Network error, DNS failure or the 8s timeout. The lead is already on its
    // way by email; losing the spreadsheet row must not fail the request.
    console.error("[sheets] Envío falló", err);
  }
}
