import type { TemplateDefinition } from '../types';
import { buildSections } from '../types';

export const modern_geometric_002: TemplateDefinition = {
  id: 'modern-geometric-002',
  name: 'Modern Geometric',
  description: 'Clean geometric patterns with modern minimalist design. Ideal for contemporary couples.',
  category: 'professional',
  eventTypes: ['wedding', 'birthday', 'corporate', 'conference'], // Default generic
  tags: ["geometric","modern","minimalist","clean"],
  tier: 'free',
  previewImageUrl: '/images/templates/Modern geometric wedding invitation design.png',
  thumbnailUrl: '/images/templates/Modern geometric wedding invitation design.png',
  isPopular: true,
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
