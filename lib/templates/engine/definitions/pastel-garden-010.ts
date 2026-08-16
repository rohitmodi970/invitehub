import type { TemplateDefinition } from '../types';
import { buildSections } from '../types';

export const pastel_garden_010: TemplateDefinition = {
  id: 'pastel-garden-010',
  name: 'Pastel Garden',
  description: 'Soft pastel flowers with garden theme. Perfect for spring and outdoor celebrations.',
  category: 'personal',
  eventTypes: ['wedding', 'birthday', 'corporate', 'conference'], // Default generic
  tags: ["floral","pastel","garden","spring"],
  tier: 'premium-plus',
  previewImageUrl: '/images/templates/pastel-garden.png',
  thumbnailUrl: '/images/templates/pastel-garden-thumb.png',
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
