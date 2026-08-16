import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/server';
import { createEvent, generateUniqueSlug } from '@/lib/db/events';
import type { EventData } from '@/lib/events/event-data';

export async function POST(req: NextRequest) {
  try {
    const supabase = await createServerClient();
    const { data: { user } } = await supabase.auth.getUser();

    // Support anonymous event creation for free tier/trials, but if logged in, attach to user
    const userId = user?.id;

    const body = await req.json();
    const eventData = body as Partial<EventData> & { templateId: string };

    if (!eventData.title || !eventData.primaryName || !eventData.templateId || !eventData.eventType) {
      return NextResponse.json(
        { error: 'Missing required fields (title, primaryName, templateId, eventType)' },
        { status: 400 }
      );
    }

    // Generate a clean SEO-friendly slug
    const slug = await generateUniqueSlug(eventData.primaryName, eventData.secondaryName);

    const result = await createEvent({
      userId,
      slug,
      templateId: eventData.templateId,
      eventType: eventData.eventType,
      title: eventData.title,
      primaryName: eventData.primaryName,
      secondaryName: eventData.secondaryName,
      eventDate: eventData.eventDate || new Date().toISOString().split('T')[0],
      eventTime: eventData.eventTime,
      timezone: eventData.timezone,
      venueName: eventData.venueName,
      venueAddress: eventData.venueAddress,
      venueLat: eventData.venueLat,
      venueLng: eventData.venueLng,
      isVirtual: eventData.isVirtual,
      virtualLink: eventData.virtualLink,
      contactPhone: eventData.contactPhone,
      contactEmail: eventData.contactEmail,
      message: eventData.message,
      tagline: eventData.tagline,
      familyDetails: eventData.familyDetails,
      agenda: eventData.agenda,
      dressCode: eventData.dressCode,
      coverImageUrl: eventData.coverImageUrl,
    });

    if (!result) {
      return NextResponse.json({ error: 'Failed to create event in database' }, { status: 500 });
    }

    return NextResponse.json({ success: true, eventId: result.id, slug: result.slug }, { status: 201 });
  } catch (error) {
    console.error('[API] POST /api/events error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
