import dotenv from 'dotenv';
import express from 'express';
import type { Request, Response } from 'express';
import nodemailer from 'nodemailer';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const entryName = path.basename(__filename);

// Load .env from project root (not cwd) so SMTP works regardless of start directory.
// On Hostinger, panel env vars are already injected into process.env.
const envPath = path.resolve(__dirname, '.env');
const envResult = dotenv.config({ path: envPath });
if (envResult.error) {
  console.warn(`[env] Could not load ${envPath}: ${envResult.error.message}`);
} else {
  console.log(`[env] Loaded ${envPath}`);
}

const PORT = Number(process.env.PORT) || 3000;
const HOST = '0.0.0.0';
// Hostinger runs the entry file with `node server.mjs` and may omit NODE_ENV.
// Treat the compiled entry as production so we serve `dist/` instead of loading Vite.
const IS_PROD =
  process.env.NODE_ENV === 'production' ||
  entryName === 'server.mjs' ||
  entryName === 'server.js';

interface ContactPayload {
  contactName?: string;
  contactEmail?: string;
  contactPhone?: string;
  businessType?: string;
  turnover?: string;
  software?: string;
  promptReason?: string;
  /** Honeypot — must stay empty. Prefer tgm_hp; website kept for older clients. */
  tgm_hp?: string;
  website?: string;
}

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function sanitizeSingleLine(value: unknown, maxLength: number): string {
  if (typeof value !== 'string') return '';
  return value.replace(/[\r\n]+/g, ' ').trim().slice(0, maxLength);
}

function sanitizeMultiline(value: unknown, maxLength: number): string {
  if (typeof value !== 'string') return '';
  return value.trim().slice(0, maxLength);
}

const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 10;
const contactRateLimit = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(clientKey: string): boolean {
  const now = Date.now();
  const entry = contactRateLimit.get(clientKey);
  if (!entry || now > entry.resetAt) {
    contactRateLimit.set(clientKey, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > RATE_LIMIT_MAX_REQUESTS;
}

function getSmtpConfig() {
  const host = (process.env.SMTP_HOST || 'smtppro.zoho.com').trim();
  const user = (process.env.SMTP_USER || '').trim();
  const rawPass = process.env.SMTP_APP_PASSWORD || process.env.SMTP_PASS || '';
  const pass = host.toLowerCase().includes('gmail')
    ? rawPass.replace(/\s+/g, '').trim()
    : rawPass.trim();
  const port = Number(process.env.SMTP_PORT) || 465;
  const secure =
    process.env.SMTP_SECURE !== undefined && process.env.SMTP_SECURE.trim() !== ''
      ? process.env.SMTP_SECURE.trim().toLowerCase() === 'true'
      : port === 465;
  const fromEmail = (process.env.SMTP_FROM_EMAIL || user).trim();
  const recipient = (process.env.CONTACT_RECIPIENT_EMAIL || user || 'info@tgmauditing.com').trim();
  const fromName = sanitizeSingleLine(process.env.SMTP_FROM_NAME || 'TGM Accounting & Auditing', 100);

  return {
    host,
    port,
    secure,
    user,
    pass,
    fromEmail,
    recipient,
    fromName,
    isConfigured: Boolean(host && user && pass),
  };
}

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '100kb' }));

  app.get('/api/health', (_req: Request, res: Response) => {
    const smtp = getSmtpConfig();
    res.json({ ok: true, smtpConfigured: smtp.isConfigured });
  });

  app.post('/api/contact', async (req: Request, res: Response) => {
    const forwardedFor = req.headers['x-forwarded-for'];
    const clientIp =
      (Array.isArray(forwardedFor) ? forwardedFor[0] : forwardedFor)?.split(',')[0]?.trim() ||
      req.ip ||
      'unknown';

    if (isRateLimited(clientIp)) {
      res.status(429).json({
        error: 'Too many enquiries submitted recently. Please wait a few minutes or contact us on WhatsApp.',
      });
      return;
    }

    const body = (req.body || {}) as ContactPayload;

    // Honeypot anti-spam trap (must stay empty).
    // Note: older clients used `website`, which browsers often autofill — that caused
    // false "success" with no email. Prefer `tgm_hp`; only treat clearly bot-like website values.
    const honeypotHp = typeof body.tgm_hp === 'string' ? body.tgm_hp.trim() : '';
    const honeypotWebsite = typeof body.website === 'string' ? body.website.trim() : '';
    const websiteLooksLikeBot =
      honeypotWebsite.length > 0 &&
      (/https?:\/\//i.test(honeypotWebsite) ||
        honeypotWebsite.includes('.') ||
        honeypotWebsite.length > 40);
    if (honeypotHp || websiteLooksLikeBot) {
      console.warn('[contact] Honeypot triggered — enquiry discarded (no email sent)');
      res.status(200).json({ ok: true, message: 'Enquiry received.' });
      return;
    }

    const contactName = sanitizeSingleLine(body.contactName, 120);
    const contactEmail = sanitizeSingleLine(body.contactEmail, 160);
    const contactPhone = sanitizeSingleLine(body.contactPhone, 40);
    const businessType = sanitizeSingleLine(body.businessType, 200);
    const turnover = sanitizeSingleLine(body.turnover, 120);
    const software = sanitizeSingleLine(body.software, 120);
    const promptReason = sanitizeMultiline(body.promptReason, 3000);

    if (!contactName) {
      res.status(400).json({ error: 'Please enter your name or organization.' });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!contactEmail || !emailRegex.test(contactEmail)) {
      res.status(400).json({ error: 'Please provide a valid email address so we can reply.' });
      return;
    }

    if (!promptReason) {
      res.status(400).json({ error: 'Please share a brief note on how we can assist.' });
      return;
    }

    const smtp = getSmtpConfig();
    if (!smtp.isConfigured) {
      res.status(503).json({
        error:
          'SMTP email is not configured on the server yet. Please set SMTP_HOST, SMTP_USER, and SMTP_APP_PASSWORD (or SMTP_PASS) in your environment variables.',
      });
      return;
    }

    try {
      const transporter = nodemailer.createTransport({
        host: smtp.host,
        port: smtp.port,
        secure: smtp.secure,
        requireTLS: !smtp.secure,
        auth: {
          user: smtp.user,
          pass: smtp.pass,
        },
        connectionTimeout: 15000,
        greetingTimeout: 15000,
        socketTimeout: 20000,
      });

      const submittedAt = new Date().toISOString();
      const plainText = [
        'New Consultation Enquiry — TGM Accounting & Auditing',
        '====================================================',
        `Name / Organization : ${contactName}`,
        `Email               : ${contactEmail}`,
        `Phone / WhatsApp    : ${contactPhone || 'Not provided'}`,
        `Industry & Countries: ${businessType || 'Not specified'}`,
        `Turnover / Entities : ${turnover || 'Not specified'}`,
        `Accounting Software : ${software || 'Not specified'}`,
        '',
        'Enquiry / Prompt:',
        promptReason,
        '',
        `Submitted (UTC): ${submittedAt}`,
      ].join('\n');

      const htmlBody = `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; color: #18251F; max-width: 640px; margin: 0 auto; border: 1px solid #E5E8E1; border-radius: 6px; overflow: hidden;">
          <div style="background: #0B3024; padding: 24px 28px; border-bottom: 3px solid #C59F5A;">
            <p style="margin: 0 0 6px; font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: #DFBA79; font-weight: 700;">
              TGM Accounting &amp; Auditing
            </p>
            <h1 style="margin: 0; font-size: 22px; font-weight: 600; color: #FFF2DF;">
              New Consultation Enquiry
            </h1>
          </div>
          <div style="padding: 26px 28px; background: #FFFFFF;">
            <table style="width: 100%; border-collapse: collapse; font-size: 14px; line-height: 1.55;">
              <tr>
                <td style="padding: 8px 0; color: #64736A; width: 170px; vertical-align: top;">Name / Organization</td>
                <td style="padding: 8px 0; font-weight: 600; color: #18251F;">${escapeHtml(contactName)}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64736A; vertical-align: top;">Reply Email</td>
                <td style="padding: 8px 0;"><a href="mailto:${escapeHtml(contactEmail)}" style="color: #174A36; font-weight: 600;">${escapeHtml(contactEmail)}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64736A; vertical-align: top;">Phone / WhatsApp</td>
                <td style="padding: 8px 0;">${escapeHtml(contactPhone || 'Not provided')}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64736A; vertical-align: top;">Industry &amp; Countries</td>
                <td style="padding: 8px 0;">${escapeHtml(businessType || 'Not specified')}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64736A; vertical-align: top;">Turnover / Entities</td>
                <td style="padding: 8px 0;">${escapeHtml(turnover || 'Not specified')}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64736A; vertical-align: top;">Accounting Software</td>
                <td style="padding: 8px 0;">${escapeHtml(software || 'Not specified')}</td>
              </tr>
            </table>
            <div style="margin-top: 20px; padding: 16px 18px; background: #F7F3EA; border-left: 3px solid #C59F5A; border-radius: 2px;">
              <p style="margin: 0 0 6px; font-size: 11px; text-transform: uppercase; letter-spacing: 0.14em; color: #174A36; font-weight: 700;">
                Enquiry Details
              </p>
              <p style="margin: 0; font-size: 14px; line-height: 1.65; white-space: pre-wrap; color: #18251F;">${escapeHtml(promptReason)}</p>
            </div>
            <p style="margin: 20px 0 0; font-size: 12px; color: #64736A;">
              Submitted via tgmauditing.com contact form · ${escapeHtml(submittedAt)}
            </p>
          </div>
        </div>
      `;

      const info = await transporter.sendMail({
        from: { name: smtp.fromName, address: smtp.fromEmail },
        to: smtp.recipient,
        replyTo: { name: contactName, address: contactEmail },
        subject: `New Consultation Enquiry: ${contactName} — TGM`,
        text: plainText,
        html: htmlBody,
      });

      console.log('[contact] Enquiry email sent', {
        to: smtp.recipient,
        from: smtp.fromEmail,
        messageId: info.messageId,
        accepted: info.accepted,
        response: info.response,
      });

      res.status(200).json({
        ok: true,
        message: 'Thank you. Your consultation enquiry has been sent to our advisory team.',
      });
    } catch (error) {
      const errMeta = error as { code?: string; responseCode?: number; message?: string };
      console.error('[SMTP] Failed to send contact enquiry email:', {
        host: smtp.host,
        port: smtp.port,
        code: errMeta?.code,
        responseCode: errMeta?.responseCode,
        message: errMeta?.message || 'Unknown SMTP error',
      });
      res.status(500).json({
        error:
          'We could not deliver your email right now. Please try again or reach us directly via WhatsApp.',
      });
    }
  });

  if (!IS_PROD) {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.resolve(__dirname, 'dist');
    app.use(express.static(distDir));
    app.use((req: Request, res: Response) => {
      if (req.path.startsWith('/api/')) {
        res.status(404).json({ error: 'API route not found.' });
        return;
      }
      res.sendFile(path.join(distDir, 'index.html'));
    });
  }

  app.listen(PORT, HOST, () => {
    const smtp = getSmtpConfig();
    console.log(`TGM server listening on http://${HOST}:${PORT}`);
    console.log(
      `[SMTP] configured=${smtp.isConfigured} host=${smtp.host} user=${smtp.user || '(missing)'} recipient=${smtp.recipient}`
    );
  });
}

startServer().catch((err) => {
  console.error('Fatal server startup error:', err);
  process.exit(1);
});
