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
const recipient = (process.env.CONTACT_RECIPIENT_EMAIL || user).trim();
const fromName = (process.env.SMTP_FROM_NAME || 'TGM Accounting & Auditing').trim();
const sendMail = process.argv.includes('--send');

console.log('=== SMTP connection test ===');
console.log(
  JSON.stringify({ host, port, secure, user, recipient, passSet: Boolean(pass) }, null, 2)
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
  console.log('PASS: SMTP connected and authenticated.');
} catch (err) {
  console.error('FAIL: SMTP verify failed');
  console.error(err);
  process.exit(1);
}

if (!sendMail) {
  console.log('Tip: run with --send to deliver a test email.');
  process.exit(0);
}

console.log('\n=== Sending test email ===');
try {
  const info = await transporter.sendMail({
    from: `"${fromName}" <${user}>`,
    to: recipient,
    subject: `[TGM SMTP Test] ${new Date().toISOString()}`,
    text: [
      'This is a test email from the TGM SMTP verification script.',
      '',
      `Host: ${host}`,
      `Port: ${port}`,
      `Secure: ${secure}`,
      `From: ${user}`,
      `To: ${recipient}`,
      `Sent at: ${new Date().toISOString()}`,
    ].join('\n'),
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #1a1a1a;">
        <h2 style="color: #174A36;">TGM SMTP Test</h2>
        <p>This is a test email from the TGM SMTP verification script.</p>
        <ul>
          <li><strong>Host:</strong> ${host}</li>
          <li><strong>Port:</strong> ${port}</li>
          <li><strong>Secure:</strong> ${secure}</li>
          <li><strong>From:</strong> ${user}</li>
          <li><strong>To:</strong> ${recipient}</li>
          <li><strong>Sent at:</strong> ${new Date().toISOString()}</li>
        </ul>
      </div>
    `,
  });

  console.log('PASS: Test email accepted by SMTP server.');
  console.log(
    JSON.stringify(
      {
        messageId: info.messageId,
        accepted: info.accepted,
        rejected: info.rejected,
        response: info.response,
      },
      null,
      2
    )
  );
  console.log(`Check inbox: ${recipient}`);
  process.exit(0);
} catch (err) {
  console.error('FAIL: Could not send test email');
  console.error(err);
  process.exit(1);
}
