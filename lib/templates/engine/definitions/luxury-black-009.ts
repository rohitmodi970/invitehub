import type { TemplateDefinition } from '../types';
import { buildSections } from '../types';

export const luxury_black_009: TemplateDefinition = {
  id: 'luxury-black-009',
  name: 'Luxury Black',
  description: 'Sleek black and white luxury design. Perfect for sophisticated and formal celebrations.',
  category: 'personal',
  eventTypes: ['wedding', 'birthday', 'corporate', 'conference'], // Default generic
  tags: ["luxury","black","formal","sophisticated"],
  tier: 'premium-plus',
  previewImageUrl: '/images/templates/luxury-black.png',
  thumbnailUrl: '/images/templates/luxury-black-thumb.png',
  isPopular: true,
  isNew: false,
  design: {
    headingFont: 'Playfair Display',
    bodyFont: 'Inter',
    headingWeight: 700,
    backgroundColor: '#111827',
    textColor: '#f9fafb',
    accentColor: '#C9A84C', // Generic gold accent
    secondaryColor: '#f0d080',
    surfaceColor: '#1f2937',
    mutedTextColor: '#9ca3af',
    borderColor: '#374151',
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
