import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

/* ─────────────────────────────────────────────
   In-memory rate limiter
   • 3 requests per IP per WINDOW_MS (15 min)
   • Map is cleaned up on each request to avoid
     unbounded growth in long-running processes
───────────────────────────────────────────── */
const WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_REQUESTS = 3;

interface RateLimitEntry {
  count: number;
  windowStart: number;
}

const rateLimitMap = new Map<string, RateLimitEntry>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();

  // Purge expired entries on every call
  for (const [key, entry] of rateLimitMap.entries()) {
    if (now - entry.windowStart > WINDOW_MS) rateLimitMap.delete(key);
  }

  const entry = rateLimitMap.get(ip);

  if (!entry || now - entry.windowStart > WINDOW_MS) {
    rateLimitMap.set(ip, { count: 1, windowStart: now });
    return false;
  }

  if (entry.count >= MAX_REQUESTS) return true;

  entry.count++;
  return false;
}

/* ─────────────────────────────────────────────
   Route handler
───────────────────────────────────────────── */
export async function POST(req: NextRequest) {
  // Resolve IP (works on Vercel and standard Next.js)
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please wait a few minutes and try again." },
      { status: 429 }
    );
  }

  try {
    const { name, email, company, projectType, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    // Fire both emails in parallel
    await Promise.all([
      // 1. Internal notification to Far Out Media
      resend.emails.send({
        from: "Far Out Media <onboarding@resend.dev>", // ← your verified sender
        to: ["anthonytij3@gmail.com"],                   // ← your receiving address
        replyTo: email,
        subject: `New Quote Request from ${name}${company ? ` · ${company}` : ""}`,
        html: buildInternalEmail({ name, email, company, projectType, message }),
      }),

      // 2. Auto-reply confirmation to the user
      resend.emails.send({
        from: "Far Out Media <onboarding@resend.dev>", // ← your verified sender
        to: [email],
        subject: "We received your quote request! · Far Out Media",
        html: buildAutoReplyEmail({ name, projectType }),
      }),
    ]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[contact] Resend error:", error);
    return NextResponse.json(
      { error: "Failed to send message. Please try again." },
      { status: 500 }
    );
  }
}

/* ─────────────────────────────────────────────
   Email templates
───────────────────────────────────────────── */
function buildInternalEmail({
  name,
  email,
  company,
  projectType,
  message,
}: {
  name: string;
  email: string;
  company: string;
  projectType: string;
  message: string;
}) {
  return `<!DOCTYPE html>
<html>
  <head><meta charset="utf-8" /><meta name="viewport" content="width=device-width,initial-scale=1" /></head>
  <body style="margin:0;padding:0;background:#09090b;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#09090b;padding:48px 24px;">
      <tr><td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;">
          <tr><td style="padding-bottom:32px;border-bottom:1px solid #27272a;">
            <p style="margin:0;font-size:11px;letter-spacing:0.4em;text-transform:uppercase;color:#C2B280;font-weight:700;">Far Out Media</p>
            <h1 style="margin:12px 0 0;font-size:28px;font-weight:900;color:#ffffff;letter-spacing:-0.03em;">New Quote Request</h1>
          </td></tr>
          <tr><td style="padding-top:32px;">
            ${renderField("Name", name)}
            ${renderField("Email", email)}
            ${company ? renderField("Company / Brand", company) : ""}
            ${projectType ? renderField("Project Type", projectType) : ""}
            ${renderField("Message", message, true)}
          </td></tr>
          <tr><td style="padding-top:40px;border-top:1px solid #27272a;">
            <p style="margin:0;font-size:11px;color:#52525b;letter-spacing:0.3em;text-transform:uppercase;">
              Sent via faroutmedia.com · Charlotte, NC &amp; Worldwide
            </p>
          </td></tr>
        </table>
      </td></tr>
    </table>
  </body>
</html>`;
}

function buildAutoReplyEmail({
  name,
  projectType,
}: {
  name: string;
  projectType: string;
}) {
  return `<!DOCTYPE html>
<html>
  <head><meta charset="utf-8" /><meta name="viewport" content="width=device-width,initial-scale=1" /></head>
  <body style="margin:0;padding:0;background:#09090b;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#09090b;padding:48px 24px;">
      <tr><td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;">

          <!-- Logo / Brand -->
          <tr><td style="padding-bottom:40px;border-bottom:1px solid #27272a;">
            <p style="margin:0;font-size:13px;letter-spacing:0.45em;text-transform:uppercase;color:#C2B280;font-weight:900;">
              FAR OUT MEDIA
            </p>
          </td></tr>

          <!-- Headline -->
          <tr><td style="padding:48px 0 32px;">
            <h1 style="margin:0 0 16px;font-size:32px;font-weight:900;color:#ffffff;letter-spacing:-0.03em;line-height:1.15;">
              We got your request,<br />${name}.
            </h1>
            <p style="margin:0;font-size:16px;color:#a1a1aa;line-height:1.7;">
              Thanks for reaching out${projectType ? ` about <span style="color:#C2B280;font-weight:600;">${projectType}</span>` : ""}.
              Our team will review your project details and get back to you
              <span style="color:#ffffff;font-weight:600;">within 24 hours</span> with a custom plan.
            </p>
          </td></tr>

          <!-- Divider -->
          <tr><td style="padding-bottom:32px;">
            <div style="height:1px;background:linear-gradient(to right,#C2B280,#27272a,transparent);"></div>
          </td></tr>

          <!-- What happens next -->
          <tr><td style="padding-bottom:40px;">
            <p style="margin:0 0 20px;font-size:10px;letter-spacing:0.4em;text-transform:uppercase;color:#C2B280;font-weight:700;">
              What Happens Next
            </p>
            ${renderStep("01", "Review", "We'll look over your project details and start thinking through the best approach.")}
            ${renderStep("02", "Strategy Call", "We'll reach out to schedule a quick call to align on vision, timeline, and budget.")}
            ${renderStep("03", "Custom Proposal", "You'll receive a tailored proposal with everything mapped out — no surprises.")}
          </td></tr>

          <!-- Divider -->
          <tr><td style="padding-bottom:32px;">
            <div style="height:1px;background:#27272a;"></div>
          </td></tr>

          <!-- Footer -->
          <tr><td>
            <p style="margin:0 0 8px;font-size:13px;color:#ffffff;font-weight:700;">Far Out Media</p>
            <p style="margin:0;font-size:12px;color:#52525b;line-height:1.7;">
              Charlotte, NC &amp; Worldwide<br />
              <a href="https://faroutmedia.com" style="color:#C2B280;text-decoration:none;">faroutmedia.com</a>
            </p>
            <p style="margin:16px 0 0;font-size:11px;color:#3f3f46;">
              You're receiving this because you submitted a quote request on our website.
            </p>
          </td></tr>

        </table>
      </td></tr>
    </table>
  </body>
</html>`;
}

/* ─────────────────────────────────────────────
   Helpers
───────────────────────────────────────────── */
function renderField(label: string, value: string, multiline = false) {
  return `
    <div style="margin-bottom:24px;">
      <p style="margin:0 0 6px;font-size:10px;letter-spacing:0.35em;text-transform:uppercase;color:#C2B280;font-weight:700;">${label}</p>
      <p style="margin:0;font-size:15px;color:#e4e4e7;line-height:${multiline ? "1.7" : "1.4"};">
        ${multiline ? value.replace(/\n/g, "<br/>") : value}
      </p>
    </div>`;
}

function renderStep(number: string, title: string, description: string) {
  return `
    <div style="display:flex;gap:16px;margin-bottom:20px;">
      <div style="min-width:28px;">
        <p style="margin:0;font-size:10px;letter-spacing:0.2em;color:#C2B280;font-weight:700;padding-top:2px;">${number}</p>
      </div>
      <div>
        <p style="margin:0 0 4px;font-size:13px;font-weight:700;color:#ffffff;">${title}</p>
        <p style="margin:0;font-size:13px;color:#71717a;line-height:1.6;">${description}</p>
      </div>
    </div>`;
}