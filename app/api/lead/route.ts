import {
  ATTACHMENT_EXTENSIONS,
  ATTACHMENT_MAX_BYTES,
  ATTACHMENT_MIME_TYPES,
  FIELD_LIMITS,
  FORM_TYPES,
  LANDING_ORIGENES,
  SELLO_OPTIONS,
} from "../../lib/leads";

/* Single lead endpoint for both forms (LeadForm + FabricacionForm),
   differentiated by `formType`. Both post multipart/form-data (one code path),
   so the fabricación form can carry its plano/muestra file. Sends a
   transactional email via Brevo to the sales inbox(es), attaching the file when
   present. Honeypot + server-side validation + HTML escaping. Never exposes
   Brevo errors to the client. Credentials come from env (BREVO_API_KEY,
   LEADS_TO_EMAIL). */
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

  // Attribution — only add rows that carry a value.
  const attribution: Array<[string, string]> = [
    ["utm_source", str(form.get("utm_source")).trim()],
    ["utm_medium", str(form.get("utm_medium")).trim()],
    ["utm_campaign", str(form.get("utm_campaign")).trim()],
    ["gclid", str(form.get("gclid")).trim()],
    ["fbclid", str(form.get("fbclid")).trim()],
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

  let brevoRes: Response;
  try {
    brevoRes = await fetch(BREVO_ENDPOINT, {
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
    return Response.json({ ok: false }, { status: 502 });
  }

  if (!brevoRes.ok) {
    const detail = await brevoRes.text().catch(() => "");
    console.error(`[lead] Brevo responded ${brevoRes.status}: ${detail}`);
    return Response.json({ ok: false }, { status: 502 });
  }

  return Response.json({ ok: true });
}
