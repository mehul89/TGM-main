import 'dotenv/config';
import express from 'express';
import type { Request, Response } from 'express';
import nodemailer from 'nodemailer';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT) || 3000;
const HOST = '0.0.0.0';
const IS_PROD = process.env.NODE_ENV === 'production';

interface ContactPayload {
  contactName?: string;
  contactEmail?: string;
  contactPhone?: string;
  businessType?: string;
  turnover?: string;
  software?: string;
  promptReason?: string;
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

function getSmtpConfig() {
  const user = (process.env.SMTP_USER || '').trim();
  const pass = (process.env.SMTP_APP_PASSWORD || process.env.SMTP_PASS || '')
    .replace(/\s+/g, '')
    .trim();
  const host = (process.env.SMTP_HOST || 'smtp.gmail.com').trim();
  const port = Number(process.env.SMTP_PORT) || 465;
  const secure =
    process.env.SMTP_SECURE !== undefined
      ? process.env.SMTP_SECURE.toLowerCase() === 'true'
      : port === 465;
  const recipient = (process.env.CONTACT_RECIPIENT_EMAIL || user || 'info@tgmauditing.com').trim();
  const fromName = sanitizeSingleLine(process.env.SMTP_FROM_NAME || 'TGM Accounting & Auditing', 100);

  return {
    host,
    port,
    secure,
    user,
    pass,
    recipient,
    fromName,
    isConfigured: Boolean(user && pass),
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
    const body = (req.body || {}) as ContactPayload;

    // Honeypot anti-spam trap
    if (typeof body.website === 'string' && body.website.trim().length > 0) {
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
          'SMTP email is not configured on the server yet. Please set SMTP_USER and SMTP_APP_PASSWORD in your .env file (or hosting environment variables).',
      });
      return;
    }

    try {
      const transporter = nodemailer.createTransport({
        host: smtp.host,
        port: smtp.port,
        secure: smtp.secure,
        auth: {
          user: smtp.user,
          pass: smtp.pass,
        },
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

      await transporter.sendMail({
        from: `"${smtp.fromName}" <${smtp.user}>`,
        to: smtp.recipient,
        replyTo: `"${contactName}" <${contactEmail}>`,
        subject: `New Consultation Enquiry: ${contactName} — TGM`,
        text: plainText,
        html: htmlBody,
      });

      res.status(200).json({
        ok: true,
        message: 'Thank you. Your consultation enquiry has been sent to our advisory team.',
      });
    } catch (error) {
      console.error('[SMTP] Failed to send contact enquiry email:', error);
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
    app.use((_req: Request, res: Response) => {
      res.sendFile(path.join(distDir, 'index.html'));
    });
  }

  app.listen(PORT, HOST, () => {
    console.log(`TGM server listening on http://${HOST}:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Fatal server startup error:', err);
  process.exit(1);
});
