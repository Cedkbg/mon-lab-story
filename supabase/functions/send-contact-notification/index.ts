import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

// Simple in-memory rate limiter (per cold-start instance)
const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute
const RATE_LIMIT_MAX = 3; // max 3 requests per IP per minute
const ipHits = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = ipHits.get(ip);
  if (!entry || entry.resetAt < now) {
    ipHits.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }
  if (entry.count >= RATE_LIMIT_MAX) return false;
  entry.count += 1;
  return true;
}

// HTML escape to prevent injection in email template
const esc = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface ContactNotificationRequest {
  name: string;
  email: string;
  subject: string;
  message: string;
}

function validate(body: any): { ok: true; data: ContactNotificationRequest } | { ok: false; error: string } {
  if (!body || typeof body !== "object") return { ok: false, error: "Invalid body" };
  const { name, email, subject, message } = body;
  if (typeof name !== "string" || name.trim().length === 0 || name.length > 100)
    return { ok: false, error: "Invalid name" };
  if (typeof email !== "string" || email.length > 255 || !EMAIL_RE.test(email))
    return { ok: false, error: "Invalid email" };
  if (typeof subject !== "string" || subject.trim().length === 0 || subject.length > 200)
    return { ok: false, error: "Invalid subject" };
  if (typeof message !== "string" || message.trim().length === 0 || message.length > 2000)
    return { ok: false, error: "Invalid message" };
  return { ok: true, data: { name: name.trim(), email: email.trim(), subject: subject.trim(), message: message.trim() } };
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }

  // Rate limiting by IP
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    req.headers.get("cf-connecting-ip") ||
    "unknown";
  if (!checkRateLimit(ip)) {
    return new Response(JSON.stringify({ error: "Too many requests" }), {
      status: 429,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }

  try {
    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return new Response(JSON.stringify({ error: "Invalid JSON" }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    const result = validate(body);
    if (!result.ok) {
      return new Response(JSON.stringify({ error: result.error }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }
    const { name, email, subject, message } = result.data;

    // Escape all user-controlled values before injecting into HTML
    const safeName = esc(name);
    const safeEmail = esc(email);
    const safeSubject = esc(subject);
    const safeMessage = esc(message).replace(/\n/g, "<br/>");

    const emailResponse = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: ["cedkbg07@gmail.com"],
      subject: `📬 Nouveau message: ${safeSubject}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #6366f1, #8b5cf6); color: white; padding: 30px; border-radius: 12px 12px 0 0; }
            .content { background: #f8fafc; padding: 30px; border: 1px solid #e2e8f0; }
            .footer { background: #1e293b; color: #94a3b8; padding: 20px; border-radius: 0 0 12px 12px; text-align: center; }
            .field { margin-bottom: 20px; }
            .label { font-weight: 600; color: #6366f1; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; }
            .value { margin-top: 5px; padding: 12px; background: white; border-radius: 8px; border: 1px solid #e2e8f0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0; font-size: 24px;">📬 Nouveau Message de Contact</h1>
              <p style="margin: 10px 0 0 0; opacity: 0.9;">Vous avez reçu un nouveau message via votre portfolio</p>
            </div>
            <div class="content">
              <div class="field"><div class="label">Nom</div><div class="value">${safeName}</div></div>
              <div class="field"><div class="label">Email</div><div class="value">${safeEmail}</div></div>
              <div class="field"><div class="label">Sujet</div><div class="value">${safeSubject}</div></div>
              <div class="field"><div class="label">Message</div><div class="value">${safeMessage}</div></div>
            </div>
            <div class="footer">
              <p style="margin: 0;">Ce message a été envoyé depuis votre formulaire de contact portfolio.</p>
            </div>
          </div>
        </body>
        </html>
      `,
      reply_to: email,
    });

    return new Response(JSON.stringify({ success: true, emailResponse }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error in send-contact-notification function:", error);
    return new Response(
      JSON.stringify({ error: "Internal error" }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
