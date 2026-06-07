import nodemailer from 'nodemailer';

let transporter: nodemailer.Transporter | null = null;

function getTransporter() {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD, // Gmail App Password (not account password)
      },
    });
  }
  return transporter;
}

export async function sendOtpEmail(to: string, otp: string) {
  const mail = getTransporter();
  await mail.sendMail({
    from: `"InviteHub.in" <${process.env.GMAIL_USER}>`,
    to,
    subject: `${otp} is your InviteHub verification code`,
    html: `
      <!DOCTYPE html>
      <html>
      <head><meta charset="utf-8"></head>
      <body style="margin:0;padding:0;background:#0f0c0a;font-family:'Segoe UI',sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background:#0f0c0a;padding:40px 0;">
          <tr><td align="center">
            <table width="480" style="background:#1a1208;border-radius:20px;border:1px solid rgba(201,168,76,0.25);overflow:hidden;">
              
              <!-- Header -->
              <tr>
                <td style="padding:32px 40px 24px;border-bottom:1px solid rgba(255,255,255,0.05);">
                  <p style="margin:0;font-size:24px;">💍</p>
                  <p style="margin:6px 0 0;color:#c9a84c;font-size:13px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;">InviteHub.in</p>
                </td>
              </tr>

              <!-- Body -->
              <tr>
                <td style="padding:32px 40px;">
                  <h2 style="margin:0 0 8px;color:white;font-size:22px;font-weight:700;">Your verification code</h2>
                  <p style="margin:0 0 28px;color:rgba(255,255,255,0.45);font-size:14px;line-height:1.6;">
                    Use this code to complete your secure sign-in. Valid for <strong style="color:rgba(255,255,255,0.7);">10 minutes</strong>.
                  </p>

                  <!-- OTP Box -->
                  <div style="background:rgba(201,168,76,0.1);border:2px solid rgba(201,168,76,0.4);border-radius:16px;padding:24px;text-align:center;margin-bottom:28px;">
                    <p style="margin:0;font-size:42px;font-weight:900;letter-spacing:0.2em;color:#c9a84c;font-family:monospace;">${otp}</p>
                  </div>

                  <p style="margin:0;color:rgba(255,255,255,0.3);font-size:12px;line-height:1.6;">
                    If you didn't request this code, you can safely ignore this email.<br>
                    This code will expire in 10 minutes.
                  </p>
                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td style="padding:20px 40px;border-top:1px solid rgba(255,255,255,0.05);text-align:center;">
                  <p style="margin:0;color:rgba(255,255,255,0.2);font-size:11px;">
                    © ${new Date().getFullYear()} InviteHub.in · Made with ❤️ in India
                  </p>
                </td>
              </tr>

            </table>
          </td></tr>
        </table>
      </body>
      </html>
    `,
  });
}
