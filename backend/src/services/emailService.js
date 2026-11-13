import nodemailer from "nodemailer";
import { config } from "../config/index.js";

let transporter = null;

/**
 * Build and verify the nodemailer transporter once on startup.
 * Returns null (and logs a warning) if SMTP credentials are missing.
 */
async function buildTransporter() {
  const { user, pass } = config.smtp.auth;

  if (!user || !pass) {
    console.warn(
      "[EmailService] ⚠️  SMTP credentials not configured – emails will be logged to the console only.\n" +
      "               Set SMTP_USER and SMTP_PASS in backend/.env to enable real email delivery."
    );
    return null;
  }

  const t = nodemailer.createTransport({
    host: config.smtp.host,
    port: config.smtp.port,
    secure: config.smtp.secure, // true = TLS on port 465
    auth: { user, pass },
    // Increase timeouts for slow connections
    connectionTimeout: 10_000,
    greetingTimeout: 5_000,
    socketTimeout: 15_000,
  });

  // Verify credentials during startup so problems are caught immediately
  try {
    await t.verify();
    console.log(`[EmailService] ✅ SMTP connection verified – ready to send email via ${user}`);
  } catch (err) {
    console.error("[EmailService] ❌ SMTP verification FAILED:", err.message);
    console.error(
      "[EmailService] Common causes:\n" +
      "  1. Wrong App Password (must be 16 chars with no spaces).\n" +
      "  2. Gmail '2-Step Verification' is not enabled on the account.\n" +
      "  3. You are using your regular Gmail password instead of an App Password.\n" +
      "  4. The App Password was created for a different Gmail address.\n" +
      "  → Fix these in backend/.env then restart the server."
    );
    return null; // fall back to console logging
  }

  return t;
}

// Build the transporter immediately when the module loads
const transporterPromise = buildTransporter();

/**
 * Get the verified transporter (resolves after startup check)
 */
async function getTransporter() {
  return transporterPromise;
}

/* ─────────────────────────────────────────────────────────────────────────── */
/*  Admin Notification Email                                                    */
/* ─────────────────────────────────────────────────────────────────────────── */
export async function sendAdminNotification(contact) {
  const mailer = await getTransporter();

  const formattedDate = new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "full",
    timeStyle: "short",
  });

  const cleanPhone = (contact.phone || "").replace(/[^\d]/g, "");
  const whatsappUrl = cleanPhone ? `https://wa.me/${cleanPhone}` : null;

  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background:#F8FAFC; margin:0; padding:24px; color:#1E293B; }
    .wrap { max-width:600px; margin:0 auto; background:#fff; border-radius:12px; overflow:hidden; border:1px solid #E2E8F0; box-shadow:0 4px 12px rgba(0,0,0,.05); }
    .hdr  { background:#1C2752; padding:28px; text-align:center; }
    .hdr h1 { margin:0; font-size:20px; letter-spacing:.1em; text-transform:uppercase; font-weight:700; color:#fff; }
    .hdr p  { margin:6px 0 0; font-size:13px; color:#94A3B8; text-transform:uppercase; letter-spacing:.08em; }
    .badge  { display:inline-block; padding:4px 14px; background:#FEF3C7; color:#92400E; border-radius:9999px; font-size:11px; font-weight:700; text-transform:uppercase; margin-top:10px; }
    .body   { padding:32px 28px; }
    .row    { margin-bottom:18px; padding-bottom:14px; border-bottom:1px solid #F1F5F9; }
    .label  { font-size:12px; font-weight:700; color:#64748B; text-transform:uppercase; letter-spacing:.05em; margin-bottom:4px; }
    .val    { font-size:16px; font-weight:600; color:#0F172A; }
    .msgbox { background:#F8FAFC; border:1px solid #E2E8F0; border-left:4px solid #1C2752; padding:18px; border-radius:8px; margin-top:20px; }
    .msgtitle { font-size:13px; font-weight:700; color:#1C2752; text-transform:uppercase; margin-bottom:8px; }
    .msgtext  { font-size:15px; line-height:1.6; color:#334155; white-space:pre-wrap; }
    .btn-reply { display:inline-block; background:#1C2752; color:#fff !important; padding:12px 24px; border-radius:8px; text-decoration:none; font-weight:600; font-size:14px; margin-top:24px; }
    .btn-wa    { display:inline-block; background:#25D366; color:#fff !important; padding:12px 24px; border-radius:8px; text-decoration:none; font-weight:600; font-size:14px; margin-top:24px; margin-left:8px; }
    .ftr { background:#F8FAFC; padding:20px 28px; font-size:12px; color:#64748B; text-align:center; border-top:1px solid #E2E8F0; }
  </style>
</head>
<body>
  <div class="wrap">
    <div class="hdr">
      <h1>SS Production House</h1>
      <p>Design · Packaging · Visuals</p>
      <div class="badge">✨ New Client Inquiry</div>
    </div>
    <div class="body">
      <div class="row">
        <div class="label">Client Name</div>
        <div class="val">${contact.name}</div>
      </div>
      <div class="row">
        <div class="label">Email Address</div>
        <div class="val"><a href="mailto:${contact.email}" style="color:#1C2752;text-decoration:none;">${contact.email}</a></div>
      </div>
      <div class="row">
        <div class="label">Phone Number</div>
        <div class="val">${contact.phone || "Not provided"}</div>
      </div>
      <div class="row">
        <div class="label">Source / Page</div>
        <div class="val" style="font-size:14px;font-weight:normal;color:#475569;">${contact.source}</div>
      </div>
      <div class="row">
        <div class="label">Submitted At (IST)</div>
        <div class="val" style="font-size:13px;font-weight:normal;color:#64748B;">${formattedDate}</div>
      </div>
      <div class="msgbox">
        <div class="msgtitle">Message / What's in their mind:</div>
        <div class="msgtext">${contact.message ? contact.message : "(No message provided)"}</div>
      </div>
      <div>
        <a href="mailto:${contact.email}?subject=Re:%20Your%20Inquiry%20with%20SS%20Production%20House" class="btn-reply">Reply via Email</a>
        ${whatsappUrl ? `<a href="${whatsappUrl}" class="btn-wa">Chat on WhatsApp</a>` : ""}
      </div>
    </div>
    <div class="ftr">
      SS PRODUCTION HOUSE · E-GF-56, Capital Highstreet, Phoolbagh, Bhiwadi - 301019<br>
      Inquiry ID: ${contact.id} · IP: ${contact.ip}
    </div>
  </div>
</body>
</html>
  `.trim();

  // ── Fallback: log to console when mailer is unavailable ──────────────────
  if (!mailer) {
    console.log("\n══════════════ NEW INQUIRY (email not sent) ══════════════");
    console.log(`ID:      ${contact.id}`);
    console.log(`Name:    ${contact.name}`);
    console.log(`Email:   ${contact.email}`);
    console.log(`Phone:   ${contact.phone || "N/A"}`);
    console.log(`Source:  ${contact.source}`);
    console.log(`Message: ${contact.message || "(none)"}`);
    console.log("═══════════════════════════════════════════════════════════\n");
    return { status: "logged", simulated: true };
  }

  try {
    const info = await mailer.sendMail({
      from: config.smtp.from,
      to: config.notificationEmail,
      replyTo: contact.email,
      subject: `✨ New Inquiry from ${contact.name} – SS Production House`,
      html: htmlContent,
    });
    console.log(`[EmailService] ✅ Admin notification sent → ${config.notificationEmail} | msgId: ${info.messageId}`);
    return { status: "sent", messageId: info.messageId };
  } catch (err) {
    console.error("[EmailService] ❌ Failed to send admin notification:", err.message);
    return { status: "failed", error: err.message };
  }
}

/* ─────────────────────────────────────────────────────────────────────────── */
/*  Client Auto-Reply Email                                                     */
/* ─────────────────────────────────────────────────────────────────────────── */
export async function sendClientConfirmation(contact) {
  const mailer = await getTransporter();
  if (!mailer) return null;

  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family:'Helvetica Neue',Helvetica,Arial,sans-serif; background:#F8FAFC; margin:0; padding:24px; color:#1E293B; }
    .wrap { max-width:600px; margin:0 auto; background:#fff; border-radius:12px; overflow:hidden; border:1px solid #E2E8F0; }
    .hdr  { background:#1C2752; padding:28px; text-align:center; }
    .hdr h1 { margin:0; font-size:20px; letter-spacing:.1em; text-transform:uppercase; color:#fff; }
    .body { padding:32px 28px; line-height:1.7; }
    .ftr  { background:#F8FAFC; padding:20px; font-size:12px; color:#64748B; text-align:center; border-top:1px solid #E2E8F0; }
  </style>
</head>
<body>
  <div class="wrap">
    <div class="hdr"><h1>SS Production House</h1></div>
    <div class="body">
      <p>Hi <strong>${contact.name}</strong>,</p>
      <p>Thank you for reaching out to <strong>SS Production House</strong>. We have received your inquiry and our creative team will review your brief shortly.</p>
      <p>You can expect a response within <strong>24 business hours</strong>.</p>
      <p>If it's urgent, call or WhatsApp us directly:</p>
      <p>
        📞 <a href="tel:+919671445186" style="color:#1C2752;"><strong>+91 96714 45186</strong></a> &nbsp;|&nbsp;
        <a href="tel:+917230017677" style="color:#1C2752;"><strong>+91 72300 17677</strong></a><br>
        📍 E-GF-56, Capital Highstreet, Phoolbagh, Bhiwadi - 301019
      </p>
      <p style="margin-top:28px;">Warm regards,<br><strong>Yogesh Dahiya</strong><br>SS Production House</p>
    </div>
    <div class="ftr">© ${new Date().getFullYear()} SS Production House. All rights reserved.</div>
  </div>
</body>
</html>
  `.trim();

  try {
    const info = await mailer.sendMail({
      from: config.smtp.from,
      to: contact.email,
      subject: "Thank you for contacting SS Production House",
      html: htmlContent,
    });
    console.log(`[EmailService] ✅ Client auto-reply sent → ${contact.email} | msgId: ${info.messageId}`);
    return { status: "sent", messageId: info.messageId };
  } catch (err) {
    console.error("[EmailService] ❌ Failed to send client confirmation:", err.message);
    return { status: "failed", error: err.message };
  }
}
