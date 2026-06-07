import { supabase } from '@/lib/supabase/client';
import type { InvitationData } from '@/lib/invitations/types';
import type { EventType } from '@/lib/events/types';

export async function getInvitationBySlug(slug: string) {
  const { data, error } = await supabase
    .from('invitations')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !data) {
    return null;
  }

  return {
    id: data.id,
    templateId: data.templateId,
    eventType: (data.eventType as EventType) ?? 'wedding',
    isPremium: data.isPremium,
    data: {
      eventType: (data.eventType as EventType) ?? 'wedding',
      brideName: data.brideName,
      groomName: data.groomName,
      weddingDate: data.weddingDate,
      weddingTime: data.weddingTime,
      venueName: data.venueName,
      venueAddress: data.venueAddress,
      contactNumber: data.contactNumber || undefined,
      additionalMessage: data.additionalMessage || undefined,
      couplePhotoUrl: data.couplePhotoUrl || undefined,
      familyDetails: data.familyDetails || undefined,
      rsvpDetails: data.rsvpDetails || undefined,
    } as InvitationData,
  };
}

export async function generateUniqueSlug(primaryName: string, secondaryName: string): Promise<string> {
  const baseSlug = `${primaryName.toLowerCase().trim()}-${secondaryName.toLowerCase().trim()}`.replace(/[^a-z0-9-]/g, '-');
  let slug = baseSlug;
  let counter = 1;

  while (true) {
    const { data } = await supabase.from('invitations').select('slug').eq('slug', slug).single();
    if (!data) break;
    slug = `${baseSlug}-${counter}`;
    counter++;
  }

  return slug;
}

export async function incrementViewCount(slug: string) {
  try {
    const { data } = await supabase.from('invitations').select('viewCount').eq('slug', slug).single();
    if (data) {
      await supabase.from('invitations').update({ viewCount: (data.viewCount || 0) + 1 }).eq('slug', slug);
    }
  } catch {
    // Ignore analytics errors silently
  }
}

function getInvitationTitle(eventType: EventType, data: InvitationData): string {
  switch (eventType) {
    case 'birthday':
      return `${data.brideName}'s Birthday Invitation 🎂`;
    case 'engagement':
      return `${data.brideName} & ${data.groomName}'s Engagement 💍`;
    case 'baby-shower':
      return `${data.brideName} — Baby Shower 👶`;
    case 'housewarming':
      return `${data.brideName} — Housewarming 🏠`;
    case 'anniversary':
      return `${data.brideName} & ${data.groomName}'s Anniversary ❤️`;
    case 'corporate':
      return `${data.brideName} | ${data.groomName} 🏢`;
    default:
      return `${data.brideName} & ${data.groomName}'s Wedding Invitation 💍`;
  }
}

export { getInvitationTitle };
