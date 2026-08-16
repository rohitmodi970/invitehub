import { notFound, redirect } from 'next/navigation';
import { createServerClient } from '@/lib/supabase/server';
import { getEventById, getRsvpSummary } from '@/lib/db/events';
import { getGuestsByEvent } from '@/lib/db/guests';
import EventDetailClient from './EventDetailClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Event Management | InviteHub',
  description: 'Manage RSVPs and guests for your event.',
};

export default async function EventDetailPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const eventId = params.id;

  const supabase = await createServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Basic auth check
  if (!user) {
    redirect('/?signin=1');
  }

  const event = await getEventById(eventId);

  // Not found or not owned by the user
  if (!event || event.userId !== user.id) {
    notFound();
  }

  // Fetch RSVP summary and all guests
  const [rsvpSummary, initialGuests] = await Promise.all([
    getRsvpSummary(eventId),
    getGuestsByEvent(eventId),
  ]);

  return (
    <div className="min-h-screen bg-[#0f1117]">
      <EventDetailClient 
        event={event} 
        rsvpSummary={rsvpSummary} 
        initialGuests={initialGuests} 
        userEmail={user.email || ''} 
      />
    </div>
  );
}
