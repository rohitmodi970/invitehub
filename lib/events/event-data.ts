/**
 * EventData — The single, canonical data shape for every event on InviteHub.
 *
 * ALL templates consume this exact interface. The Template Engine passes this
 * to every section component. Adding new templates requires zero changes here.
 *
 * Migration: replaces InvitationData (which used brideName/groomName — wedding-only fields).
 */

export type EventCategory = 'personal' | 'professional';

export type EventType =
  // ── Personal ──────────────────────────────────────
  | 'wedding'
  | 'birthday'
  | 'engagement'
  | 'baby-shower'
  | 'housewarming'
  | 'anniversary'
  | 'farewell'
  // ── Professional ──────────────────────────────────
  | 'conference'
  | 'corporate'
  | 'product-launch'
  | 'retirement'
  | 'webinar'
  | 'networking'
  | 'townhall'
  | 'workshop'
  | 'school'
  | 'community';

export interface EventData {
  // ── Identity ────────────────────────────────────────
  id: string;
  slug: string;
  userId?: string;
  eventCategory: EventCategory;
  eventType: EventType;
  status: 'draft' | 'published' | 'archived';
  templateId?: string;
  templateTier?: string;

  // ── Core Content (every template reads these) ───────
  /** Event headline. e.g. "Rohit's 25th Birthday" / "Annual Tech Summit 2026" */
  title: string;
  /** Primary person/entity. e.g. "Rohit" (birthday) / "Annual Tech Summit" (conference) */
  primaryName: string;
  /** Secondary person/entity. e.g. "Priya" (wedding partner) / "Acme Corp" (organizer) */
  secondaryName?: string;
  /** Short event tagline. e.g. "Join us for an evening of celebration" */
  tagline?: string;
  /** Personal message, wedding story, or additional details */
  message?: string;

  // ── Date & Time ─────────────────────────────────────
  /** ISO date string: "2026-09-20" */
  eventDate: string;
  /** 24-hour time string: "18:00" */
  eventTime?: string;
  /** ISO date string for multi-day events */
  eventEndDate?: string;
  /** 24-hour time string: "21:00" */
  eventEndTime?: string;
  /** IANA timezone identifier: "Asia/Kolkata" | "America/New_York" */
  timezone: string;

  // ── Venue ────────────────────────────────────────────
  venueName?: string;
  venueAddress?: string;
  venueCity?: string;
  venueCountry?: string;
  /** For Google Maps embed. Requires both lat + lng. */
  venueLat?: number;
  venueLng?: number;
  /** If true, show virtual link section instead of map */
  isVirtual: boolean;
  /** Zoom / Meet / Teams / YouTube Live URL */
  virtualLink?: string;

  // ── Contact ──────────────────────────────────────────
  contactPhone?: string;
  contactEmail?: string;
  contactWebsite?: string;

  // ── Media ────────────────────────────────────────────
  /** Main event image: couple photo / company logo / event banner */
  coverImageUrl?: string;
  /** Additional photos for gallery section */
  galleryImages?: string[];

  // ── Event-Type-Specific Content ──────────────────────
  /** For personal events: family details, hostedBy, parents' names, etc. */
  familyDetails?: string;
  /** For professional events: agenda, schedule, speaker list */
  agenda?: string;
  /** Dress code for any event type */
  dressCode?: string;
  /** Escape hatch for truly unique per-event-type fields */
  customFields?: Record<string, string>;

  // ── Feature Flags (per-event overrides) ─────────────
  rsvpEnabled: boolean;
  calendarEnabled: boolean;
  mapEnabled: boolean;

  // ── Branding ─────────────────────────────────────────
  /** Custom logo URL (Pro/Business tier). Overrides template default. */
  customLogoUrl?: string;
  /** Custom primary accent color hex (Pro/Business tier) */
  customPrimaryColor?: string;
  /** Custom secondary color hex (Pro/Business tier) */
  customSecondaryColor?: string;
  /** Hide the InviteHub "Made with" badge (paid tiers) */
  hideBranding: boolean;

  // ── Analytics (read-only, populated by system) ───────
  viewCount: number;
  shareCount: number;
  calendarAdds: number;

  // ── Tier ────────────────────────────────────────────
  isPremium: boolean;
  paidTier?: 'starter' | 'pro' | 'premium' | 'business-starter' | 'business-pro' | 'enterprise';
}

/**
 * Minimal EventData for creating a new event before it has an ID/slug.
 * Used in the creation wizard before the event is saved to the database.
 */
export type NewEventData = Omit<EventData,
  | 'id'
  | 'slug'
  | 'status'
  | 'viewCount'
  | 'shareCount'
  | 'calendarAdds'
  | 'isPremium'
>;

/**
 * Maps old InvitationData field names to new EventData field names.
 * Used during the database migration to transform existing data.
 */
export function migrateInvitationToEventData(old: {
  id: string;
  slug: string;
  templateId: string;
  eventType?: string;
  isPremium?: boolean;
  brideName: string;
  groomName?: string;
  weddingDate?: string;
  weddingTime?: string;
  venueName?: string;
  venueAddress?: string;
  contactNumber?: string;
  additionalMessage?: string;
  couplePhotoUrl?: string;
  familyDetails?: string;
  rsvpDetails?: string;
}): Partial<EventData> {
  const eventType = (old.eventType as EventType) ?? 'wedding';

  return {
    id: old.id,
    slug: old.slug,
    eventCategory: getEventCategory(eventType),
    eventType,
    status: 'published',
    title: buildTitle(eventType, old.brideName, old.groomName),
    primaryName: old.brideName,
    secondaryName: old.groomName,
    eventDate: old.weddingDate ?? '',
    eventTime: old.weddingTime,
    timezone: 'Asia/Kolkata',
    venueName: old.venueName,
    venueAddress: old.venueAddress,
    contactPhone: old.contactNumber,
    message: old.additionalMessage,
    coverImageUrl: old.couplePhotoUrl,
    familyDetails: old.familyDetails,
    isVirtual: false,
    rsvpEnabled: true,
    calendarEnabled: true,
    mapEnabled: true,
    hideBranding: old.isPremium ?? false,
    viewCount: 0,
    shareCount: 0,
    calendarAdds: 0,
    isPremium: old.isPremium ?? false,
  };
}

function getEventCategory(eventType: EventType): EventCategory {
  const professionalTypes: EventType[] = [
    'conference', 'corporate', 'product-launch', 'retirement',
    'webinar', 'networking', 'townhall', 'workshop', 'school', 'community',
  ];
  return professionalTypes.includes(eventType) ? 'professional' : 'personal';
}

function buildTitle(eventType: EventType, primaryName: string, secondaryName?: string): string {
  switch (eventType) {
    case 'wedding':
    case 'engagement':
    case 'anniversary':
      return secondaryName
        ? `${primaryName} & ${secondaryName}`
        : primaryName;
    case 'birthday':
      return secondaryName
        ? `${primaryName}'s Birthday — ${secondaryName}`
        : `${primaryName}'s Birthday`;
    case 'baby-shower':
      return `${primaryName}'s Baby Shower`;
    case 'housewarming':
      return `${primaryName}'s Housewarming`;
    case 'farewell':
      return `Farewell, ${primaryName}!`;
    default:
      // Professional events: primaryName = event title, secondaryName = organizer
      return secondaryName
        ? `${primaryName} — ${secondaryName}`
        : primaryName;
  }
}
