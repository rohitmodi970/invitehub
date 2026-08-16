import { NextResponse } from 'next/server';
import { getEventById } from '@/lib/db/events';
import { generateICS } from '@/lib/calendar/ics';

/**
 * GET /api/events/[id]/calendar.ics
 *
 * Returns a downloadable ICS file for the event.
 * Works with Apple Calendar, any ICS-compatible calendar app, and the "Download .ics" button.
 *
 * Also tracks the calendar add in PostHog (client-side) and DB (via the
 * Add to Calendar component tracking the API call).
 */
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const event = await getEventById(id);

  if (!event) {
    return new NextResponse('Event not found', { status: 404 });
  }

  const icsContent = generateICS(event);
  const filename = `${event.slug}.ics`;

  return new NextResponse(icsContent, {
    status: 200,
    headers: {
      'Content-Type': 'text/calendar; charset=utf-8',
      'Content-Disposition': `attachment; filename="${filename}"`,
      // Allow CORS for calendar apps that need it
      'Access-Control-Allow-Origin': '*',
      // Don't cache — event details may change
      'Cache-Control': 'no-cache, no-store, must-revalidate',
    },
  });
}
