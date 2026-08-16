import { createServerClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';
import { getGuestsByEvent, bulkAddGuests, parseGuestCSV, getFullGuestExport } from '@/lib/db/guests';

/**
 * GET  /api/guests?eventId=xxx          — list all guests for an event
 * POST /api/guests?eventId=xxx          — add a single guest (JSON body)
 * POST /api/guests/import?eventId=xxx   — bulk import (CSV file upload)
 */

// GET: list guests
export async function GET(req: NextRequest) {
  const eventId = req.nextUrl.searchParams.get('eventId');
  if (!eventId) return NextResponse.json({ error: 'eventId required' }, { status: 400 });

  // Auth check
  const supabase = await createServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  // Verify event ownership
  const { data: event } = await supabase
    .from('events')
    .select('id, user_id')
    .eq('id', eventId)
    .single();
  if (!event || event.user_id !== user.id) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  // CSV export if requested
  if (req.nextUrl.searchParams.get('format') === 'csv') {
    const csv = await getFullGuestExport(eventId);
    return new NextResponse(csv, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="guests-${eventId}.csv"`,
      },
    });
  }

  const guests = await getGuestsByEvent(eventId);
  return NextResponse.json({ guests });
}

// POST: add single guest
export async function POST(req: NextRequest) {
  const eventId = req.nextUrl.searchParams.get('eventId');
  if (!eventId) return NextResponse.json({ error: 'eventId required' }, { status: 400 });

  const supabase = await createServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  // Ownership check
  const { data: event } = await supabase
    .from('events')
    .select('id, user_id')
    .eq('id', eventId)
    .single();
  if (!event || event.user_id !== user.id) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const contentType = req.headers.get('content-type') ?? '';

  // CSV bulk import
  if (contentType.includes('text/csv') || contentType.includes('multipart/form-data')) {
    let csvText = '';

    if (contentType.includes('multipart/form-data')) {
      const form = await req.formData();
      const file = form.get('file') as File | null;
      if (!file) return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
      csvText = await file.text();
    } else {
      csvText = await req.text();
    }

    const { rows, errors } = parseGuestCSV(csvText);
    if (rows.length === 0) {
      return NextResponse.json({ error: 'No valid rows found', details: errors }, { status: 400 });
    }

    const result = await bulkAddGuests(eventId, rows);
    return NextResponse.json({ ...result, parseWarnings: errors });
  }

  // Single guest JSON
  const body = await req.json();
  if (!body.name) return NextResponse.json({ error: 'name is required' }, { status: 400 });

  const { addGuest } = await import('@/lib/db/guests');
  const guest = await addGuest(eventId, body);
  if (!guest) return NextResponse.json({ error: 'Failed to add guest' }, { status: 500 });

  return NextResponse.json({ guest }, { status: 201 });
}
