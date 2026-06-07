import { supabase } from '@/lib/supabase/client';
import { InvitationData } from '@/app/templates/traditional-indian-004/components/TraditionalIndianTemplate';

// We map our Supabase database schema back to the InvitationData interface
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
    isPremium: data.isPremium,
    data: {
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
    } as InvitationData
  };
}

// Function to generate a unique slug
export async function generateUniqueSlug(brideName: string, groomName: string): Promise<string> {
  const baseSlug = `${brideName.toLowerCase().trim()}-${groomName.toLowerCase().trim()}`.replace(/[^a-z0-9-]/g, '-');
  let slug = baseSlug;
  let counter = 1;

  while (true) {
    const { data } = await supabase.from('invitations').select('slug').eq('slug', slug).single();
    if (!data) break; // Slug is unique
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
  } catch (e) {
    // Ignore analytics errors silently
  }
}
