/**
 * Resend Email Client
 *
 * Replaces the Gmail SMTP / Nodemailer setup (lib/email.ts).
 * Uses Resend's REST API directly — no deprecated packages, proper deliverability.
 *
 * Setup required:
 *  1. Add RESEND_API_KEY to .env.local
 *  2. Configure DNS: SPF, DKIM, DMARC for invitehub.in in Resend dashboard
 *  3. Verify domain at resend.com/domains
 *
 * Free tier: 100 emails/day, 3,000/month
 * Paid: $20/month for 50,000 emails
 */
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// ── Sender addresses ──────────────────────────────────────────────────
const FROM_TRANSACTIONAL = 'InviteHub <noreply@invitehub.in>';
const FROM_EVENTS = 'InviteHub Events <events@invitehub.in>';

// ── OTP Verification Email ────────────────────────────────────────────
export async function sendOtpEmail(to: string, otp: string) {
  const { error } = await resend.emails.send({
    from: FROM_TRANSACTIONAL,
    to,
    subject: `${otp} is your InviteHub verification code`,
    html: getOtpEmailHtml(otp),
  });

  if (error) {
    console.error('[Resend] Failed to send OTP email:', error);
    throw new Error(`Failed to send OTP email: ${error.message}`);
  }
}

// ── RSVP Notification to Event Host ──────────────────────────────────
export async function sendRsvpNotificationToHost({
  hostEmail,
  hostName,
  guestName,
  guestStatus,
  guestCount,
  eventTitle,
  eventSlug,
}: {
  hostEmail: string;
  hostName: string;
  guestName: string;
  guestStatus: 'accepted' | 'declined' | 'maybe';
  guestCount: number;
  eventTitle: string;
  eventSlug: string;
}) {
  const statusEmoji = { accepted: '✅', declined: '❌', maybe: '🤔' }[guestStatus];
  const statusText = { accepted: 'accepted', declined: 'declined', maybe: 'responded maybe to' }[guestStatus];

  const { error } = await resend.emails.send({
    from: FROM_EVENTS,
    to: hostEmail,
    subject: `${statusEmoji} ${guestName} ${statusText} your invitation to "${eventTitle}"`,
    html: getRsvpNotificationHtml({ hostName, guestName, guestStatus, guestCount, eventTitle, eventSlug }),
  });

  if (error) {
    console.error('[Resend] Failed to send RSVP notification:', error);
    // Don't throw — RSVP is already saved, email is best-effort
  }
}

// ── RSVP Confirmation to Guest ────────────────────────────────────────
export async function sendRsvpConfirmationToGuest({
  guestEmail,
  guestName,
  status,
  eventTitle,
  eventDate,
  eventSlug,
}: {
  guestEmail: string;
  guestName: string;
  status: 'accepted' | 'declined' | 'maybe';
  eventTitle: string;
  eventDate: string;
  eventSlug: string;
}) {
  if (status === 'declined') return; // Don't spam declined guests

  const { error } = await resend.emails.send({
    from: FROM_EVENTS,
    to: guestEmail,
    subject: `You're on the list! "${eventTitle}" — InviteHub`,
    html: getRsvpConfirmationHtml({ guestName, eventTitle, eventDate, eventSlug }),
  });

  if (error) {
    console.error('[Resend] Failed to send RSVP confirmation:', error);
    // Don't throw — best-effort
  }
}

// ── Welcome Email ─────────────────────────────────────────────────────
export async function sendWelcomeEmail(to: string, name?: string) {
  const { error } = await resend.emails.send({
    from: FROM_TRANSACTIONAL,
    to,
    subject: 'Welcome to InviteHub — Create your first event',
    html: getWelcomeEmailHtml(name),
  });

  if (error) {
    console.error('[Resend] Failed to send welcome email:', error);
  }
}

// ═══════════════════════════════════════════════════════════════════════
// HTML Email Templates (inline styles for email client compatibility)
// ═══════════════════════════════════════════════════════════════════════

const emailBase = (content: string) => `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"></head>
<body style="margin:0;padding:0;background:#0f0c0a;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0f0c0a;padding:40px 0;">
    <tr><td align="center">
      <table width="520" style="background:#1a1208;border-radius:20px;border:1px solid rgba(201,168,76,0.2);overflow:hidden;max-width:520px;">
        <!-- Header -->
        <tr>
          <td style="padding:28px 36px 20px;border-bottom:1px solid rgba(255,255,255,0.06);">
            <p style="margin:0;font-size:22px;">💌</p>
            <p style="margin:4px 0 0;color:#c9a84c;font-size:11px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;">InviteHub.in</p>
            <p style="margin:2px 0 0;color:rgba(255,255,255,0.3);font-size:10px;letter-spacing:0.1em;">The easiest way to create, send and manage beautiful event invitations</p>
          </td>
        </tr>
        <!-- Body -->
        <tr>
          <td style="padding:28px 36px;">
            ${content}
          </td>
        </tr>
        <!-- Footer -->
        <tr>
          <td style="padding:16px 36px;border-top:1px solid rgba(255,255,255,0.06);text-align:center;">
            <p style="margin:0;color:rgba(255,255,255,0.2);font-size:11px;">
              © ${new Date().getFullYear()} InviteHub.in · Made with ❤️ in India
            </p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

function getOtpEmailHtml(otp: string): string {
  return emailBase(`
    <h2 style="margin:0 0 8px;color:white;font-size:20px;font-weight:700;">Your verification code</h2>
    <p style="margin:0 0 24px;color:rgba(255,255,255,0.45);font-size:14px;line-height:1.6;">
      Use this code to sign in. Valid for <strong style="color:rgba(255,255,255,0.7);">10 minutes</strong>.
    </p>
    <div style="background:rgba(201,168,76,0.1);border:2px solid rgba(201,168,76,0.4);border-radius:14px;padding:20px;text-align:center;margin-bottom:24px;">
      <p style="margin:0;font-size:40px;font-weight:900;letter-spacing:0.25em;color:#c9a84c;font-family:monospace;">${otp}</p>
    </div>
    <p style="margin:0;color:rgba(255,255,255,0.3);font-size:12px;line-height:1.6;">
      If you didn't request this code, you can safely ignore this email.
    </p>
  `);
}

function getRsvpNotificationHtml({
  hostName, guestName, guestStatus, guestCount, eventTitle, eventSlug,
}: {
  hostName: string; guestName: string; guestStatus: string;
  guestCount: number; eventTitle: string; eventSlug: string;
}): string {
  const statusColors = { accepted: '#22c55e', declined: '#ef4444', maybe: '#f59e0b' };
  const color = statusColors[guestStatus as keyof typeof statusColors] || '#c9a84c';
  const statusLabel = { accepted: '✅ Accepted', declined: '❌ Declined', maybe: '🤔 Maybe' }[guestStatus] || guestStatus;

  return emailBase(`
    <h2 style="margin:0 0 8px;color:white;font-size:20px;font-weight:700;">New RSVP for "${eventTitle}"</h2>
    <p style="margin:0 0 24px;color:rgba(255,255,255,0.5);font-size:14px;">Hi ${hostName},</p>
    <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:20px;margin-bottom:24px;">
      <p style="margin:0 0 8px;color:rgba(255,255,255,0.5);font-size:12px;text-transform:uppercase;letter-spacing:0.1em;">Guest</p>
      <p style="margin:0 0 16px;color:white;font-size:18px;font-weight:700;">${guestName}</p>
      <p style="margin:0 0 8px;color:rgba(255,255,255,0.5);font-size:12px;text-transform:uppercase;letter-spacing:0.1em;">Response</p>
      <p style="margin:0 0 16px;font-size:16px;font-weight:700;color:${color};">${statusLabel}</p>
      ${guestCount > 1 ? `<p style="margin:0;color:rgba(255,255,255,0.5);font-size:13px;">Attending with ${guestCount - 1} guest${guestCount > 2 ? 's' : ''}</p>` : ''}
    </div>
    <a href="https://invitehub.in/e/${eventSlug}" style="display:inline-block;background:linear-gradient(135deg,#c9a84c,#f0d080);color:#1a0e00;padding:12px 24px;border-radius:50px;font-weight:700;font-size:13px;text-decoration:none;">
      View Event Dashboard →
    </a>
  `);
}

function getRsvpConfirmationHtml({
  guestName, eventTitle, eventDate, eventSlug,
}: {
  guestName: string; eventTitle: string; eventDate: string; eventSlug: string;
}): string {
  return emailBase(`
    <h2 style="margin:0 0 8px;color:white;font-size:20px;font-weight:700;">You're on the list! 🎉</h2>
    <p style="margin:0 0 20px;color:rgba(255,255,255,0.5);font-size:14px;line-height:1.6;">
      Hi ${guestName},<br><br>
      Your RSVP for <strong style="color:white;">"${eventTitle}"</strong> has been confirmed.
      We can't wait to see you on <strong style="color:#c9a84c;">${eventDate}</strong>!
    </p>
    <a href="https://invitehub.in/e/${eventSlug}" style="display:inline-block;background:linear-gradient(135deg,#c9a84c,#f0d080);color:#1a0e00;padding:12px 24px;border-radius:50px;font-weight:700;font-size:13px;text-decoration:none;margin-bottom:20px;">
      View Invitation →
    </a>
    <p style="margin:16px 0 0;color:rgba(255,255,255,0.3);font-size:12px;">
      Changed your mind? Visit the event page to update your RSVP.
    </p>
  `);
}

function getWelcomeEmailHtml(name?: string): string {
  return emailBase(`
    <h2 style="margin:0 0 8px;color:white;font-size:20px;font-weight:700;">Welcome to InviteHub! 👋</h2>
    <p style="margin:0 0 20px;color:rgba(255,255,255,0.5);font-size:14px;line-height:1.6;">
      ${name ? `Hi ${name},<br><br>` : ''}
      You're all set to create beautiful event invitations. Whether it's a wedding, birthday,
      conference, or product launch — InviteHub has you covered.
    </p>
    <a href="https://invitehub.in/templates" style="display:inline-block;background:linear-gradient(135deg,#c9a84c,#f0d080);color:#1a0e00;padding:12px 24px;border-radius:50px;font-weight:700;font-size:13px;text-decoration:none;">
      Browse Templates →
    </a>
  `);
}
