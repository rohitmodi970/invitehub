import type { EventType } from '@/lib/events/types';

export interface InvitationData {
  eventType?: EventType;
  brideName: string;
  groomName: string;
  weddingDate: string;
  weddingTime: string;
  venueName: string;
  venueAddress: string;
  contactNumber?: string;
  additionalMessage?: string;
  couplePhotoUrl?: string;
  familyDetails?: string;
  rsvpDetails?: string;
}

export interface TemplateProps {
  data: InvitationData;
  isPremium?: boolean;
}
