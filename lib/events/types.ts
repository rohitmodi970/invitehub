export type EventType =
  | 'wedding'
  | 'birthday'
  | 'engagement'
  | 'baby-shower'
  | 'housewarming'
  | 'anniversary'
  | 'corporate';

export interface EventTypeDef {
  id: EventType;
  label: string;
  description: string;
  emoji: string;
  seoSlug?: string;
}

export const EVENT_TYPES: EventTypeDef[] = [
  { id: 'wedding', label: 'Wedding', description: 'Wedding & marriage invitations', emoji: '💍' },
  { id: 'birthday', label: 'Birthday', description: 'Birthday party invitations', emoji: '🎂', seoSlug: 'birthday-invitation-card' },
  { id: 'engagement', label: 'Engagement', description: 'Engagement & ring ceremony', emoji: '💎', seoSlug: 'engagement-invitation' },
  { id: 'baby-shower', label: 'Baby Shower', description: 'Baby shower celebrations', emoji: '👶', seoSlug: 'baby-shower-invitation' },
  { id: 'housewarming', label: 'Housewarming', description: 'Griha pravesh & new home', emoji: '🏠', seoSlug: 'housewarming-invitation' },
  { id: 'anniversary', label: 'Anniversary', description: 'Wedding & milestone anniversaries', emoji: '❤️', seoSlug: 'anniversary-invitation' },
  { id: 'corporate', label: 'Corporate', description: 'Business events & conferences', emoji: '🏢', seoSlug: 'corporate-event-invitation' },
];

export function getEventTypeDef(id: EventType): EventTypeDef {
  return EVENT_TYPES.find((e) => e.id === id) ?? EVENT_TYPES[0];
}
