// /api/contact.js — Besztweb contact & quote request handler (Vercel Serverless Function)
// Sends inquiry emails via Resend (https://resend.com) to szia.besztweb@gmail.com
// and sends an automatic confirmation email to the user.

function escapeHtml(str) {
  return String(str == null ? '' : str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'method_not_allowed' });
  }

  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch (e) { body = {}; }
  }
  body = body || {};

  const { name, email, phone, service, message, botcheck, lang } = body;

  // Honeypot spam check: hidden field for automated bots
  if (botcheck) {
    return res.status(200).json({ ok: true });
  }

  // Validate required fields
  if (!name || !email || !message) {
    return res.status(400).json({ ok: false, error: 'missing_fields' });
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(String(email).trim())) {
    return res.status(400).json({ ok: false, error: 'invalid_email' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toAddress = process.env.CONTACT_TO_EMAIL || 'szia.besztweb@gmail.com';
  
  // Format and sanitize fromAddress to avoid Resend 422 validation errors
  let rawFrom = (process.env.CONTACT_FROM_EMAIL || '').trim();
  let fromAddress = 'Besztweb Ajánlatkérés <onboarding@resend.dev>';
  if (rawFrom) {
    if (rawFrom.startsWith('<') && rawFrom.endsWith('>')) {
      fromAddress = `Besztweb ${rawFrom}`;
    } else if (!rawFrom.includes('<') && rawFrom.includes('@')) {
      fromAddress = `Besztweb <${rawFrom}>`;
    } else {
      fromAddress = rawFrom;
    }
  }

  // Demo / preview mode if RESEND_API_KEY is not yet set in Vercel
  if (!apiKey) {
    console.warn(
      'RESEND_API_KEY is not configured in Vercel environment variables. Running in demo mode:',
      { name, email, phone, service, message }
    );
    return res.status(200).json({ ok: true, demo: true });
  }

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safePhone = escapeHtml(phone || 'Nincs megadva');
  const safeService = escapeHtml(service || 'Nincs megadva');
  const safeMessage = escapeHtml(message).replace(/\n/g, '<br>');
  const dateFormatted = new Date().toLocaleString('hu-HU', { timeZone: 'Europe/Budapest' });

  // 1. Notification email to Kristóf (szia.besztweb@gmail.com)
  const notifyHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; background-color: #0e1116; color: #f2f0ea; margin: 0; padding: 24px; }
        .card { max-width: 600px; margin: 0 auto; background-color: #14171c; border: 1px solid #2a2f3a; border-radius: 12px; overflow: hidden; }
        .header { background: linear-gradient(135deg, #1b1f27 0%, #14171c 100%); padding: 28px; border-bottom: 3px solid #3e7bff; }
        .badge { display: inline-block; padding: 4px 10px; border-radius: 4px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; background: #e8384f; color: #fff; margin-bottom: 12px; }
        h1 { margin: 0; font-size: 22px; color: #f2f0ea; font-weight: 700; }
        .content { padding: 28px; }
        .meta-table { width: 100%; border-collapse: collapse; margin-bottom: 24px; }
        .meta-table td { padding: 10px 0; border-bottom: 1px solid #2a2f3a; font-size: 14px; }
        .meta-label { color: #9aa0ac; width: 140px; font-weight: 500; }
        .meta-val { color: #f2f0ea; font-weight: 600; }
        .meta-val a { color: #3e7bff; text-decoration: none; }
        .message-box { background: #1b1f27; border-left: 3px solid #3e7bff; border-radius: 6px; padding: 18px; margin-top: 20px; }
        .message-title { font-size: 13px; font-weight: 600; color: #9aa0ac; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 8px; }
        .message-text { color: #f2f0ea; font-size: 15px; line-height: 1.6; margin: 0; }
        .footer { padding: 20px 28px; background: #0e1116; font-size: 12px; color: #6b7280; border-top: 1px solid #2a2f3a; text-align: center; }
      </style>
    </head>
    <body>
      <div class="card">
        <div class="header">
          <div class="badge">Új ajánlatkérés</div>
          <h1>${safeName} ajánlatot kért a Besztweben</h1>
        </div>
        <div class="content">
          <table class="meta-table">
            <tr>
              <td class="meta-label">Ügyfél neve:</td>
              <td class="meta-val">${safeName}</td>
            </tr>
            <tr>
              <td class="meta-label">E-mail cím:</td>
              <td class="meta-val"><a href="mailto:${safeEmail}">${safeEmail}</a></td>
            </tr>
            <tr>
              <td class="meta-label">Telefonszám:</td>
              <td class="meta-val">${phone ? `<a href="tel:${safePhone}">${safePhone}</a>` : safePhone}</td>
            </tr>
            <tr>
              <td class="meta-label">Szolgáltatás:</td>
              <td class="meta-val" style="color:#3e7bff;">${safeService}</td>
            </tr>
            <tr>
              <td class="meta-label">Időpont:</td>
              <td class="meta-val" style="color:#9aa0ac;font-weight:normal;">${dateFormatted}</td>
            </tr>
          </table>

          <div class="message-box">
            <div class="message-title">Projekt leírása / Üzenet:</div>
            <p class="message-text">${safeMessage}</p>
          </div>
        </div>
        <div class="footer">
          Beszterczey Web — beszterczey.com | Válaszolj közvetlenül erre az e-mailre a feladó eléréséhez.
        </div>
      </div>
    </body>
    </html>
  `;

  // 2. Confirmation auto-reply to the client
  const isEnglish = lang === 'en';
  const confirmSubject = isEnglish
    ? `Thank you for reaching out! — Besztweb`
    : `Köszönöm a megkeresést! — Besztweb`;

  const confirmHtml = isEnglish ? `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; background-color: #0e1116; color: #f2f0ea; margin: 0; padding: 24px; }
        .card { max-width: 600px; margin: 0 auto; background-color: #14171c; border: 1px solid #2a2f3a; border-radius: 12px; overflow: hidden; }
        .header { background: linear-gradient(135deg, #1b1f27 0%, #14171c 100%); padding: 28px; border-bottom: 3px solid #3e7bff; }
        .brand { font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.15em; color: #3e7bff; margin-bottom: 8px; }
        h1 { margin: 0; font-size: 22px; color: #f2f0ea; font-weight: 700; }
        .content { padding: 28px; line-height: 1.6; font-size: 15px; color: #cfd4dc; }
        .lead { font-size: 16px; color: #f2f0ea; margin-bottom: 16px; }
        .details-box { background: #1b1f27; border-left: 3px solid #3e7bff; border-radius: 6px; padding: 16px; margin: 20px 0; font-size: 14px; }
        .contact-box { background: #14171c; border: 1px solid #2a2f3a; border-radius: 8px; padding: 16px; margin-top: 24px; font-size: 14px; }
        .contact-box a { color: #3e7bff; text-decoration: none; }
        .footer { padding: 20px 28px; background: #0e1116; font-size: 12px; color: #6b7280; border-top: 1px solid #2a2f3a; text-align: center; }
      </style>
    </head>
    <body>
      <div class="card">
        <div class="header">
          <div class="brand">Besztweb</div>
          <h1>I received your message!</h1>
        </div>
        <div class="content">
          <p class="lead">Hi ${safeName},</p>
          <p>Thank you for reaching out through my website regarding <strong>${safeService}</strong>. I've received your project details and will review them carefully.</p>
          <p>I usually respond within <strong>24 hours</strong> with an initial estimate or follow-up questions.</p>
          <div class="details-box">
            <strong>Your inquiry:</strong><br>
            <span style="color:#9aa0ac;">${safeMessage}</span>
          </div>
          <div class="contact-box">
            If anything urgent comes up, feel free to reply directly to this email or call me:<br>
            📞 <a href="tel:+36204119117">+36 20 411 9117</a> · ✉️ <a href="mailto:szia.besztweb@gmail.com">szia.besztweb@gmail.com</a>
          </div>
          <p style="margin-top:24px;margin-bottom:0;">Best regards,<br><strong>Kristóf Beszterczey</strong><br><span style="color:#9aa0ac;font-size:13px;">Beszterczey Web — bespoke web development</span></p>
        </div>
        <div class="footer">
          <a href="https://beszterczey.com" style="color:#9aa0ac;text-decoration:none;">beszterczey.com</a>
        </div>
      </div>
    </body>
    </html>
  ` : `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; background-color: #0e1116; color: #f2f0ea; margin: 0; padding: 24px; }
        .card { max-width: 600px; margin: 0 auto; background-color: #14171c; border: 1px solid #2a2f3a; border-radius: 12px; overflow: hidden; }
        .header { background: linear-gradient(135deg, #1b1f27 0%, #14171c 100%); padding: 28px; border-bottom: 3px solid #3e7bff; }
        .brand { font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.15em; color: #3e7bff; margin-bottom: 8px; }
        h1 { margin: 0; font-size: 22px; color: #f2f0ea; font-weight: 700; }
        .content { padding: 28px; line-height: 1.6; font-size: 15px; color: #cfd4dc; }
        .lead { font-size: 16px; color: #f2f0ea; margin-bottom: 16px; }
        .details-box { background: #1b1f27; border-left: 3px solid #3e7bff; border-radius: 6px; padding: 16px; margin: 20px 0; font-size: 14px; }
        .contact-box { background: #14171c; border: 1px solid #2a2f3a; border-radius: 8px; padding: 16px; margin-top: 24px; font-size: 14px; }
        .contact-box a { color: #3e7bff; text-decoration: none; }
        .footer { padding: 20px 28px; background: #0e1116; font-size: 12px; color: #6b7280; border-top: 1px solid #2a2f3a; text-align: center; }
      </style>
    </head>
    <body>
      <div class="card">
        <div class="header">
          <div class="brand">Besztweb</div>
          <h1>Megkaptam az ajánlatkérésedet!</h1>
        </div>
        <div class="content">
          <p class="lead">Kedves ${safeName}!</p>
          <p>Köszönöm a megkeresésedet a <strong>${safeService}</strong> témájában! Az elküldött projektleírást és igényeket megkaptam.</p>
          <p>Általában <strong>24 órán belül</strong> átnézem a részleteket, és jelentkezem a válaszommal vagy a konkrét ajánlattal.</p>
          <div class="details-box">
            <strong>Az elküldött üzeneted:</strong><br>
            <span style="color:#9aa0ac;">${safeMessage}</span>
          </div>
          <div class="contact-box">
            Ha addig is bármilyen sürgős kérdésed merülne fel, válaszolhatsz közvetlenül erre az e-mailre, vagy elérsz telefonon is:<br>
            📞 <a href="tel:+36204119117">+36 20 411 9117</a> · ✉️ <a href="mailto:szia.besztweb@gmail.com">szia.besztweb@gmail.com</a>
          </div>
          <p style="margin-top:24px;margin-bottom:0;">Üdvözlettel,<br><strong>Beszterczey Kristóf</strong><br><span style="color:#9aa0ac;font-size:13px;">Beszterczey Web — egyedi webfejlesztés</span></p>
        </div>
        <div class="footer">
          <a href="https://beszterczey.com" style="color:#9aa0ac;text-decoration:none;">beszterczey.com</a>
        </div>
      </div>
    </body>
    </html>
  `;

  try {
    // 1. Send notification to Kristóf
    const notifyResp = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: fromAddress,
        to: [toAddress],
        reply_to: email,
        subject: `Új ajánlatkérés: ${name} (${service || 'Általános'})`,
        html: notifyHtml
      })
    });

    if (!notifyResp.ok) {
      const errText = await resendResp.text();
      console.error('Resend API error:', resendResp.status, errText);
      return res.status(502).json({ ok: false, error: 'email_send_failed' });
    }

    // 2. Best-effort confirmation email to the client
    try {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: fromAddress,
          to: [email],
          reply_to: 'szia.besztweb@gmail.com',
          subject: confirmSubject,
          html: confirmHtml
        })
      });
    } catch (confirmErr) {
      console.warn('Auto-reply confirmation failed (non-blocking):', confirmErr);
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Contact handler error:', err);
    return res.status(500).json({ ok: false, error: 'server_error' });
  }
};
