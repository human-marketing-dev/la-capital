import {
  ATTACHMENT_EXTENSIONS,
  ATTACHMENT_MAX_BYTES,
  ATTACHMENT_MIME_TYPES,
  FIELD_LIMITS,
  FORM_TYPES,
  LANDING_ORIGEN,
  LANDING_ORIGENES,
  SELLO_OPTIONS,
  sheetTabFor,
} from "../../lib/leads";
import { enviarLeadASheets } from "../../lib/sheets";

/* Single lead endpoint for both forms (LeadForm + FabricacionForm),
   differentiated by `formType`. Both post multipart/form-data (one code path),
   so the fabricación form can carry its plano/muestra file. Sends a
   transactional email via Brevo to the sales inbox(es), attaching the file when
   present. Honeypot + server-side validation + HTML escaping. Never exposes
   Brevo errors to the client. Credentials come from env (BREVO_API_KEY,
   LEADS_TO_EMAIL).

   The lead is ALSO mirrored to a Google Sheet, in parallel with the email. The
   email stays the critical path: the client's success/error depends only on
   Brevo, and a failed spreadsheet write is logged and swallowed. */
export const runtime = "nodejs";

const BREVO_ENDPOINT = "https://api.brevo.com/v3/smtp/email";
const SENDER = {
  name: "Leads La Capital",
  email: "leads@cotiza.selloslacapital.com",
};
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function str(v: FormDataEntryValue | null): string {
  return typeof v === "string" ? v : "";
}

function esc(v: unknown): string {
  return String(v ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function cell(value: string): string {
  return esc(value).replace(/\n/g, "<br>");
}

/* Brevo send, extracted so it can race the Sheets mirror in Promise.allSettled.
   Throws on both network failure and a non-2xx reply — the caller maps either to
   a 502, exactly as before. */
async function sendBrevo(
  apiKey: string,
  payload: Record<string, unknown>,
): Promise<void> {
  let res: Response;
  try {
    res = await fetch(BREVO_ENDPOINT, {
      method: "POST",
      headers: {
        "api-key": apiKey,
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify(payload),
    });
  } catch (err) {
    console.error("[lead] Brevo request failed", err);
    throw new Error("brevo-network");
  }

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    console.error(`[lead] Brevo responded ${res.status}: ${detail}`);
    throw new Error("brevo-status");
  }
}

export async function POST(request: Request) {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return Response.json({ ok: false }, { status: 400 });
  }

  // Honeypot: a filled hidden field means a bot. Pretend success, send nothing,
  // and tell the client to skip the generate_lead event.
  if (str(form.get("website")).trim() !== "") {
    return Response.json({ ok: true, skipped: true });
  }

  const formType = str(form.get("formType"));
  const origen = str(form.get("origen")).trim();
  const nombre = str(form.get("nombre")).trim();
  const empresa = str(form.get("empresa")).trim();
  const telefono = str(form.get("telefono")).trim();
  const correo = str(form.get("correo")).trim();
  const sello = str(form.get("sello")).trim();
  const describe = str(form.get("describe")).trim();
  /* Landing slug, used for the Sheets tab + a `Pagina` column. Deliberately NOT
     validated into `invalid`: a browser running stale JS posts without it, and
     that must still deliver the lead (sheetTabFor falls back to formType/origen).
     Whitelisted against the known landings so an arbitrary string can never
     create a junk tab. */
  const paginaRaw = str(form.get("pagina")).trim();
  const pagina = Object.hasOwn(LANDING_ORIGEN, paginaRaw) ? paginaRaw : "";

  const invalid: string[] = [];
  if (!(FORM_TYPES as readonly string[]).includes(formType))
    invalid.push("formType");
  if (!LANDING_ORIGENES.includes(origen)) invalid.push("origen");
  if (!nombre || nombre.length > FIELD_LIMITS.nombre) invalid.push("nombre");
  if (!empresa || empresa.length > FIELD_LIMITS.empresa) invalid.push("empresa");
  if (!telefono || telefono.length > FIELD_LIMITS.telefono)
    invalid.push("telefono");
  if (!correo || correo.length > FIELD_LIMITS.correo || !EMAIL_RE.test(correo))
    invalid.push("correo");
  if (formType === "lead") {
    if (!SELLO_OPTIONS.includes(sello)) invalid.push("sello");
  } else if (formType === "fabricacion") {
    if (!describe || describe.length > FIELD_LIMITS.describe)
      invalid.push("describe");
  }

  // Optional attachment (fabricación only in practice). Validated the same way
  // as any other field: anything present but invalid is a 400.
  const uploaded = form.get("adjunto");
  const file =
    uploaded instanceof File && uploaded.size > 0 ? uploaded : null;
  if (file) {
    const name = file.name ?? "";
    const dot = name.lastIndexOf(".");
    const ext = dot >= 0 ? name.slice(dot).toLowerCase() : "";
    if (file.size > ATTACHMENT_MAX_BYTES) invalid.push("adjunto:size");
    if (!ATTACHMENT_MIME_TYPES.includes(file.type)) invalid.push("adjunto:type");
    if (!ATTACHMENT_EXTENSIONS.includes(ext)) invalid.push("adjunto:ext");
    if (!name || name.length > FIELD_LIMITS.adjuntoNombre)
      invalid.push("adjunto:name");
  }

  if (invalid.length) {
    return Response.json({ ok: false }, { status: 400 });
  }

  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    console.error("[lead] BREVO_API_KEY is not set");
    return Response.json({ ok: false }, { status: 500 });
  }
  const recipients = (process.env.LEADS_TO_EMAIL ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
    .map((email) => ({ email }));
  if (!recipients.length) {
    console.error("[lead] LEADS_TO_EMAIL is not set / empty");
    return Response.json({ ok: false }, { status: 500 });
  }

  const tipoLabel = formType === "fabricacion" ? "Fabricación" : "Cotización";
  const subject = `Lead ${origen} — ${tipoLabel}`;

  const rows: Array<[string, string]> = [
    ["Origen", origen],
    ["Tipo", tipoLabel],
    ["Nombre", nombre],
    ["Empresa", empresa],
    ["Teléfono", telefono],
    ["Correo", correo],
  ];
  if (formType === "lead") {
    rows.push(["¿Qué sello necesita?", sello]);
  } else {
    rows.push(["Describe su sello", describe]);
    rows.push(["Adjuntó archivo", file ? `Sí — ${file.name}` : "No"]);
  }

  // Attribution — read once; the email adds only the rows that carry a value,
  // the Sheets mirror always sends all of them (fixed columns).
  const utmSource = str(form.get("utm_source")).trim();
  const utmMedium = str(form.get("utm_medium")).trim();
  const utmCampaign = str(form.get("utm_campaign")).trim();
  const gclid = str(form.get("gclid")).trim();
  const fbclid = str(form.get("fbclid")).trim();

  const attribution: Array<[string, string]> = [
    ["utm_source", utmSource],
    ["utm_medium", utmMedium],
    ["utm_campaign", utmCampaign],
    ["gclid", gclid],
    ["fbclid", fbclid],
  ];
  for (const [label, value] of attribution) {
    if (value) rows.push([label, value]);
  }

  rows.push([
    "Fecha",
    new Date().toLocaleString("es-MX", { timeZone: "America/Mexico_City" }),
  ]);

  const rowsHtml = rows
    .map(
      ([k, v]) =>
        `<tr><td style="padding:8px 12px;border:1px solid #e5e7eb;background:#f9fafb;font-weight:600;white-space:nowrap;vertical-align:top">${esc(
          k,
        )}</td><td style="padding:8px 12px;border:1px solid #e5e7eb;vertical-align:top">${cell(
          v,
        )}</td></tr>`,
    )
    .join("");
  const htmlContent = `<!doctype html><html><body style="font-family:Arial,Helvetica,sans-serif;color:#111;line-height:1.4"><h2 style="margin:0 0 14px;font-size:18px">${esc(
    subject,
  )}</h2><table style="border-collapse:collapse;width:100%;max-width:660px;font-size:14px">${rowsHtml}</table></body></html>`;

  const payload: Record<string, unknown> = {
    sender: SENDER,
    to: recipients,
    replyTo: { email: correo, name: nombre },
    subject,
    htmlContent,
  };
  // Only include `attachment` when a file actually came through.
  if (file) {
    const content = Buffer.from(await file.arrayBuffer()).toString("base64");
    payload.attachment = [{ name: file.name, content }];
  }

  /* Google Sheets mirror. One tab per landing/form; the KEY ORDER below becomes
     the column order the first time a tab is written, and the key set is fixed
     from then on — so every key is always present, "" when empty, and a key is
     never added conditionally. The two form types write to disjoint tabs, so
     their column sets can differ. Attachments send only the filename, never the
     file. `Fecha` is added by the Apps Script itself. */
  const sheetTab = sheetTabFor(pagina, formType, origen);
  const sheetFields: Record<string, string> =
    formType === "fabricacion"
      ? {
          Nombre: nombre,
          Empresa: empresa,
          Telefono: telefono,
          Correo: correo,
          Mensaje: describe,
          Archivo: file ? file.name : "",
          Pagina: pagina,
          utm_source: utmSource,
          utm_medium: utmMedium,
          utm_campaign: utmCampaign,
          gclid,
          fbclid,
        }
      : {
          Nombre: nombre,
          Empresa: empresa,
          Telefono: telefono,
          Correo: correo,
          Sello: sello,
          Pagina: pagina,
          utm_source: utmSource,
          utm_medium: utmMedium,
          utm_campaign: utmCampaign,
          gclid,
          fbclid,
        };

  /* Both sends race. Only Brevo decides the client's outcome: enviarLeadASheets
     never throws and logs its own failures, so its settled result is ignored on
     purpose. */
  const [brevoResult] = await Promise.allSettled([
    sendBrevo(apiKey, payload),
    enviarLeadASheets(sheetTab, sheetFields),
  ]);

  if (brevoResult.status === "rejected") {
    return Response.json({ ok: false }, { status: 502 });
  }

  return Response.json({ ok: true });
}
