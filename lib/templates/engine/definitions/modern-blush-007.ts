import type { TemplateDefinition } from '../types';
import { buildSections } from '../types';

export const modern_blush_007: TemplateDefinition = {
  id: 'modern-blush-007',
  name: 'Modern Blush',
  description: 'Contemporary blush pink and white design. Trendy and Instagram-ready for modern couples.',
  category: 'professional',
  eventTypes: ['wedding', 'birthday', 'corporate', 'conference'], // Default generic
  tags: ["modern","blush","minimalist","trendy"],
  tier: 'premium',
  previewImageUrl: '/images/templates/modern-blush.png',
  thumbnailUrl: '/images/templates/modern-blush-thumb.png',
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
