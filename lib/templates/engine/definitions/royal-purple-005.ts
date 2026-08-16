import type { TemplateDefinition } from '../types';
import { buildSections } from '../types';

export const royal_purple_005: TemplateDefinition = {
  id: 'royal-purple-005',
  name: 'Royal Purple',
  description: 'Luxurious purple and gold royal design. Perfect for grand celebrations and royal affairs.',
  category: 'personal',
  eventTypes: ['wedding', 'birthday', 'corporate', 'conference'], // Default generic
  tags: ["royal","purple","luxurious","grand"],
  tier: 'premium',
  previewImageUrl: '/images/templates/royal-purple.png',
  thumbnailUrl: '/images/templates/royal-purple-thumb.png',
  isPopular: false,
  isNew: true,
  design: {
    headingFont: 'Playfair Display',
    bodyFont: 'Inter',
    headingWeight: 700,
    backgroundColor: '#ffffff',
    textColor: '#111827',
    accentColor: '#C9A84C', // Generic gold accent
    secondaryColor: '#f0d080',
    surfaceColor: '#f3f4f6',
    mutedTextColor: '#6b7280',
    borderColor: '#e5e7eb',
    backgroundEffect: 'none',
    entranceAnimation: 'fade-up',
    scrollAnimation: 'fade-sections',
    layout: 'centered',
    borderRadius: '16px',
    cardStyle: 'solid',
    maxWidth: '600px',
    useDividers: true
  },
  sections: buildSections([])
};
