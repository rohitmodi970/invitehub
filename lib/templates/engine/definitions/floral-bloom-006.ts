import type { TemplateDefinition } from '../types';
import { buildSections } from '../types';

export const floral_bloom_006: TemplateDefinition = {
  id: 'floral-bloom-006',
  name: 'Floral Bloom',
  description: 'Beautiful floral design with watercolor flowers. Perfect for spring and garden weddings.',
  category: 'personal',
  eventTypes: ['wedding', 'birthday', 'corporate', 'conference'], // Default generic
  tags: ["floral","watercolor","flowers","garden"],
  tier: 'premium',
  previewImageUrl: '/images/templates/floral-bloom.png',
  thumbnailUrl: '/images/templates/floral-bloom-thumb.png',
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
    backgroundEffect: 'petals',
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
