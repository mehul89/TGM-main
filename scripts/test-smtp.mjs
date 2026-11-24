import 'dotenv/config';
import nodemailer from 'nodemailer';

const host = (process.env.SMTP_HOST || '').trim();
const port = Number(process.env.SMTP_PORT) || 465;
const secure =
  process.env.SMTP_SECURE !== undefined
    ? process.env.SMTP_SECURE.toLowerCase() === 'true'
    : port === 465;
const user = (process.env.SMTP_USER || '').trim();
const pass = (process.env.SMTP_APP_PASSWORD || process.env.SMTP_PASS || '')
  .replace(/\s+/g, '')
  .trim();

console.log('Testing SMTP connection...');
console.log(
  JSON.stringify({ host, port, secure, user, passSet: Boolean(pass) }, null, 2)
);

if (!user || !pass) {
  console.error('FAIL: SMTP_USER or SMTP_APP_PASSWORD missing');
  process.exit(1);
}

const transporter = nodemailer.createTransport({
  host,
  port,
  secure,
  auth: { user, pass },
});

try {
  await transporter.verify();
  console.log('SUCCESS: SMTP is connected and authenticated.');
  process.exit(0);
} catch (err) {
  console.error('FAIL: SMTP verify failed');
  console.error(err);
  process.exit(1);
}
