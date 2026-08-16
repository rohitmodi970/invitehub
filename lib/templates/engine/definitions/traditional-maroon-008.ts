import type { TemplateDefinition } from '../types';
import { buildSections } from '../types';

export const traditional_maroon_008: TemplateDefinition = {
  id: 'traditional-maroon-008',
  name: 'Traditional Maroon',
  description: 'Rich maroon and gold traditional design. Timeless choice for Indian wedding celebrations.',
  category: 'personal',
  eventTypes: ['wedding', 'birthday', 'corporate', 'conference'], // Default generic
  tags: ["traditional","maroon","indian","cultural"],
  tier: 'premium',
  previewImageUrl: '/images/templates/traditional-maroon.png',
  thumbnailUrl: '/images/templates/traditional-maroon-thumb.png',
  isPopular: false,
  isNew: false,
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
