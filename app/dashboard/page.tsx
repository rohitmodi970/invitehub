import { createServerClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import type { Metadata } from 'next';
import { getEventsByUser, getRsvpSummary } from '@/lib/db/events';
import DashboardShell from './components/DashboardShell';

export const metadata: Metadata = {
  title: 'Dashboard | InviteHub',
  description: 'Manage your events, view RSVPs, and track guest attendance.',
};

export default async function DashboardPage() {
  const supabase = await createServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Fallback: also accept legacy HMAC cookie
  let userId = user?.id;
  if (!userId) {
    // Check legacy cookie auth
    const { cookies } = await import('next/headers');
    const crypto = await import('crypto');
    const OTP_SECRET = process.env.OTP_SECRET || 'invitehub-secret-key-123';
    const cookieStore = await cookies();
    const authToken = cookieStore.get('invitehub_auth')?.value;
    if (!authToken) redirect('/?signin=1');
    const [email, signature] = (authToken ?? '').split('.');
    const expectedSig = crypto.createHmac('sha256', OTP_SECRET).update(email ?? '').digest('hex');
    if (expectedSig !== signature) redirect('/?signin=1');
    // Legacy users don't have a UUID userId, use null (events with no user_id won't load)
  }

  // Fetch events
  const events = userId ? await getEventsByUser(userId) : [];

  // Fetch RSVP summaries for each event in parallel
  const rsvpSummaries = await Promise.all(
    events.map(e => getRsvpSummary(e.id))
  );

  const eventsWithRsvp = events.map((e, i) => ({
    ...e,
    rsvpSummary: rsvpSummaries[i],
  }));

  return (
    <DashboardShell
      events={eventsWithRsvp}
      userEmail={user?.email ?? ''}
    />
  );
}
