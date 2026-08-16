/**
 * Events DB layer — replaces lib/db/invitations.ts
 *
 * All functions now use the `events` table with standardized field names.
 * The old `invitations` table is kept as backup during migration.
 */
import { createServerClient } from '@/lib/supabase/server';
import type { EventData, EventType } from '@/lib/events/event-data';

// ── Read ──────────────────────────────────────────────────────────────

export async function getEventBySlug(slug: string): Promise<EventData | null> {
  const supabase = await createServerClient();

  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single();

  if (error || !data) return null;

  return mapRowToEventData(data);
}

export async function getEventsByUser(userId: string): Promise<EventData[]> {
  const supabase = await createServerClient();

  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error || !data) return [];
  return data.map(mapRowToEventData);
}

export async function getEventById(id: string): Promise<EventData | null> {
  const supabase = await createServerClient();

  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !data) return null;
  return mapRowToEventData(data);
}

// ── Write ─────────────────────────────────────────────────────────────

export async function createEvent(input: {
  userId?: string;
  slug: string;
  templateId: string;
  eventType: EventType;
  primaryName: string;
  secondaryName?: string;
  title: string;
  eventDate: string;
  eventTime?: string;
  timezone?: string;
  venueName?: string;
  venueAddress?: string;
  venueLat?: number;
  venueLng?: number;
  isVirtual?: boolean;
  virtualLink?: string;
  contactPhone?: string;
  contactEmail?: string;
  message?: string;
  tagline?: string;
  familyDetails?: string;
  agenda?: string;
  dressCode?: string;
  coverImageUrl?: string;
}): Promise<{ id: string; slug: string } | null> {
  const supabase = await createServerClient();

  const eventCategory: 'personal' | 'professional' = [
    'conference', 'corporate', 'product-launch', 'retirement',
    'webinar', 'networking', 'townhall', 'workshop', 'school', 'community',
  ].includes(input.eventType) ? 'professional' : 'personal';

  const { data, error } = await supabase
    .from('events')
    .insert({
      user_id: input.userId || null,
      slug: input.slug,
      status: 'published',
      event_category: eventCategory,
      event_type: input.eventType,
      title: input.title,
      primary_name: input.primaryName,
      secondary_name: input.secondaryName || null,
      tagline: input.tagline || null,
      message: input.message || null,
      event_date: input.eventDate,
      event_time: input.eventTime || null,
      timezone: input.timezone || 'Asia/Kolkata',
      venue_name: input.venueName || null,
      venue_address: input.venueAddress || null,
      venue_lat: input.venueLat || null,
      venue_lng: input.venueLng || null,
      is_virtual: input.isVirtual || false,
      virtual_link: input.virtualLink || null,
      contact_phone: input.contactPhone || null,
      contact_email: input.contactEmail || null,
      cover_image_url: input.coverImageUrl || null,
      family_details: input.familyDetails || null,
      agenda: input.agenda || null,
      dress_code: input.dressCode || null,
      template_id: input.templateId,
      template_tier: 'free',
      is_premium: false,
      hide_branding: false,
      rsvp_enabled: true,
      calendar_enabled: true,
      map_enabled: true,
    })
    .select('id, slug')
    .single();

  if (error) {
    console.error('[DB] createEvent error:', error);
    return null;
  }

  return data;
}

export async function incrementViewCount(slug: string) {
  try {
    const supabase = await createServerClient();
    await supabase.rpc('increment_event_view', { event_slug: slug });
  } catch {
    // Analytics errors are silent — never block the page render
  }
}

export async function incrementCalendarAdd(slug: string) {
  try {
    const supabase = await createServerClient();
    const { data } = await supabase
      .from('events')
      .select('calendar_adds')
      .eq('slug', slug)
      .single();
    if (data) {
      await supabase
        .from('events')
        .update({ calendar_adds: (data.calendar_adds || 0) + 1 })
        .eq('slug', slug);
    }
  } catch {
    // Silent
  }
}

// ── Slug generation ────────────────────────────────────────────────────

export async function generateUniqueSlug(primaryName: string, secondaryName?: string): Promise<string> {
  const supabase = await createServerClient();

  const base = [primaryName, secondaryName]
    .filter(Boolean)
    .join('-')
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 40);

  let slug = base;
  let counter = 1;

  while (true) {
    const { data } = await supabase
      .from('events')
      .select('slug')
      .eq('slug', slug)
      .maybeSingle();
    if (!data) break;
    slug = `${base}-${counter++}`;
  }

  return slug;
}

// ── RSVP ──────────────────────────────────────────────────────────────

export async function getRsvpSummary(eventId: string) {
  const supabase = await createServerClient();

  const { data, error } = await supabase
    .from('rsvps')
    .select('status, guest_count')
    .eq('event_id', eventId);

  if (error || !data) return { accepted: 0, declined: 0, maybe: 0, pending: 0, total: 0, totalAttending: 0 };

  return {
    accepted: data.filter(r => r.status === 'accepted').length,
    declined: data.filter(r => r.status === 'declined').length,
    maybe: data.filter(r => r.status === 'maybe').length,
    pending: data.filter(r => r.status === 'pending').length,
    total: data.length,
    totalAttending: data
      .filter(r => r.status === 'accepted')
      .reduce((sum, r) => sum + (r.guest_count || 1), 0),
  };
}

// ── Mapper ───────────────────────────────────────────────────────────

function mapRowToEventData(row: Record<string, unknown>): EventData {
  return {
    id: row.id as string,
    slug: row.slug as string,
    userId: (row.user_id as string) ?? undefined,
    eventCategory: (row.event_category as 'personal' | 'professional') ?? 'personal',
    eventType: (row.event_type as EventType) ?? 'wedding',
    status: (row.status as 'draft' | 'published' | 'archived') ?? 'published',
    title: (row.title as string) ?? '',
    primaryName: (row.primary_name as string) ?? '',
    secondaryName: (row.secondary_name as string) ?? undefined,
    tagline: (row.tagline as string) ?? undefined,
    message: (row.message as string) ?? undefined,
    eventDate: (row.event_date as string) ?? '',
    eventTime: (row.event_time as string) ?? undefined,
    eventEndDate: (row.event_end_date as string) ?? undefined,
    eventEndTime: (row.event_end_time as string) ?? undefined,
    timezone: (row.timezone as string) ?? 'Asia/Kolkata',
    venueName: (row.venue_name as string) ?? undefined,
    venueAddress: (row.venue_address as string) ?? undefined,
    venueCity: (row.venue_city as string) ?? undefined,
    venueCountry: (row.venue_country as string) ?? undefined,
    venueLat: (row.venue_lat as number) ?? undefined,
    venueLng: (row.venue_lng as number) ?? undefined,
    isVirtual: (row.is_virtual as boolean) ?? false,
    virtualLink: (row.virtual_link as string) ?? undefined,
    contactPhone: (row.contact_phone as string) ?? undefined,
    contactEmail: (row.contact_email as string) ?? undefined,
    contactWebsite: (row.contact_website as string) ?? undefined,
    coverImageUrl: (row.cover_image_url as string) ?? undefined,
    galleryImages: (row.gallery_images as string[]) ?? [],
    familyDetails: (row.family_details as string) ?? undefined,
    agenda: (row.agenda as string) ?? undefined,
    dressCode: (row.dress_code as string) ?? undefined,
    customLogoUrl: (row.custom_logo_url as string) ?? undefined,
    customPrimaryColor: (row.custom_primary_color as string) ?? undefined,
    customSecondaryColor: (row.custom_secondary_color as string) ?? undefined,
    hideBranding: (row.hide_branding as boolean) ?? false,
    rsvpEnabled: (row.rsvp_enabled as boolean) ?? true,
    calendarEnabled: (row.calendar_enabled as boolean) ?? true,
    mapEnabled: (row.map_enabled as boolean) ?? true,
    viewCount: (row.view_count as number) ?? 0,
    shareCount: (row.share_count as number) ?? 0,
    calendarAdds: (row.calendar_adds as number) ?? 0,
    isPremium: (row.is_premium as boolean) ?? false,
    paidTier: (row.paid_tier as EventData['paidTier']) ?? undefined,
  };
}
