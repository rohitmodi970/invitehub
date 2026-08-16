import type { EventType } from './event-data';
export type { EventType };

export interface EventTypeDef {
  id: EventType;
  label: string;
  description: string;
  emoji: string;
  seoSlug?: string;
}

export const EVENT_TYPES: EventTypeDef[] = [
  // ── Personal ──────────────────────────────────────
  { id: 'wedding', label: 'Wedding', description: 'Wedding & marriage invitations', emoji: '💍' },
  { id: 'birthday', label: 'Birthday', description: 'Birthday party invitations', emoji: '🎂', seoSlug: 'birthday-invitation-card' },
  { id: 'engagement', label: 'Engagement', description: 'Engagement & ring ceremony', emoji: '💎', seoSlug: 'engagement-invitation' },
  { id: 'baby-shower', label: 'Baby Shower', description: 'Baby shower celebrations', emoji: '👶', seoSlug: 'baby-shower-invitation' },
  { id: 'housewarming', label: 'Housewarming', description: 'Griha pravesh & new home', emoji: '🏠', seoSlug: 'housewarming-invitation' },
  { id: 'anniversary', label: 'Anniversary', description: 'Wedding & milestone anniversaries', emoji: '❤️', seoSlug: 'anniversary-invitation' },
  { id: 'farewell', label: 'Farewell', description: 'Farewell & going away parties', emoji: '👋', seoSlug: 'farewell-invitation' },
  
  // ── Professional ──────────────────────────────────
  { id: 'conference', label: 'Conference', description: 'Large scale conferences & summits', emoji: '🎙️', seoSlug: 'conference-invitation' },
  { id: 'corporate', label: 'Corporate', description: 'Business events & corporate parties', emoji: '🏢', seoSlug: 'corporate-event-invitation' },
  { id: 'product-launch', label: 'Product Launch', description: 'Product reveals & launches', emoji: '🚀', seoSlug: 'product-launch-invitation' },
  { id: 'retirement', label: 'Retirement', description: 'Retirement parties & farewells', emoji: '🏖️', seoSlug: 'retirement-invitation' },
  { id: 'webinar', label: 'Webinar', description: 'Online seminars & workshops', emoji: '💻', seoSlug: 'webinar-invitation' },
  { id: 'networking', label: 'Networking', description: 'Professional networking mixers', emoji: '🤝', seoSlug: 'networking-event-invitation' },
  { id: 'townhall', label: 'Townhall', description: 'Company all-hands & townhalls', emoji: '📢', seoSlug: 'townhall-invitation' },
  { id: 'workshop', label: 'Workshop', description: 'Training & skill workshops', emoji: '🛠️', seoSlug: 'workshop-invitation' },
  { id: 'school', label: 'School', description: 'School functions & annual days', emoji: '🏫', seoSlug: 'school-event-invitation' },
  { id: 'community', label: 'Community', description: 'Local community drives & events', emoji: '🌍', seoSlug: 'community-event-invitation' },
];

export function getEventTypeDef(id: EventType): EventTypeDef {
  return EVENT_TYPES.find((e) => e.id === id) ?? EVENT_TYPES[0];
}
