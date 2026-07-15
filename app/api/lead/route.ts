import {
  FIELD_LIMITS,
  FORM_TYPES,
  LANDING_ORIGENES,
  SELLO_OPTIONS,
} from "../../lib/leads";

/* Single lead endpoint for both forms (LeadForm + FabricacionForm),
   differentiated by `formType`. Sends a transactional email via Brevo to the
   sales inbox(es). Honeypot + server-side validation + HTML escaping. Never
   exposes Brevo errors to the client. Credentials come from env
   (BREVO_API_KEY, LEADS_TO_EMAIL); the file itself is NOT sent — the email only
   notes whether one was attached. */
export const runtime = "nodejs";

const BREVO_ENDPOINT = "https://api.brevo.com/v3/smtp/email";
const SENDER = {
  name: "Leads La Capital",
  email: "leads@cotiza.selloslacapital.com",
};
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function str(v: unknown): string {
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

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return Response.json({ ok: false }, { status: 400 });
  }

  // Honeypot: a filled hidden field means a bot. Pretend success, send nothing,
  // and tell the client to skip the generate_lead event.
  if (str(body.website).trim() !== "") {
    return Response.json({ ok: true, skipped: true });
  }

  const formType = str(body.formType);
  const origen = str(body.origen).trim();
  const nombre = str(body.nombre).trim();
  const empresa = str(body.empresa).trim();
  const telefono = str(body.telefono).trim();
  const correo = str(body.correo).trim();
  const sello = str(body.sello).trim();
  const describe = str(body.describe).trim();
  const adjuntoNombre = str(body.adjuntoNombre).trim();

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
  if (adjuntoNombre.length > FIELD_LIMITS.adjuntoNombre)
    invalid.push("adjuntoNombre");
  if (invalid.length) {
    return Response.json({ ok: false }, { status: 400 });
  }

  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    console.error("[lead] BREVO_API_KEY is not set");
    return Response.json({ ok: false }, { status: 500 });
  }
  const recipients = str(process.env.LEADS_TO_EMAIL)
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
    rows.push([
      "Adjuntó archivo",
      adjuntoNombre ? `Sí — ${adjuntoNombre}` : "No",
    ]);
  }

  // Attribution — only add rows that carry a value.
  const attribution: Array<[string, string]> = [
    ["utm_source", str(body.utm_source).trim()],
    ["utm_medium", str(body.utm_medium).trim()],
    ["utm_campaign", str(body.utm_campaign).trim()],
    ["gclid", str(body.gclid).trim()],
    ["fbclid", str(body.fbclid).trim()],
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

  let brevoRes: Response;
  try {
    brevoRes = await fetch(BREVO_ENDPOINT, {
      method: "POST",
      headers: {
        "api-key": apiKey,
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        sender: SENDER,
        to: recipients,
        replyTo: { email: correo, name: nombre },
        subject,
        htmlContent,
      }),
    });
  } catch (err) {
    console.error("[lead] Brevo request failed", err);
    return Response.json({ ok: false }, { status: 502 });
  }

  if (!brevoRes.ok) {
    const detail = await brevoRes.text().catch(() => "");
    console.error(`[lead] Brevo responded ${brevoRes.status}: ${detail}`);
    return Response.json({ ok: false }, { status: 502 });
  }

  return Response.json({ ok: true });
}
