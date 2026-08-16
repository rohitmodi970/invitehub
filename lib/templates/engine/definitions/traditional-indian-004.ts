import type { TemplateDefinition } from '../types';
import { buildSections } from '../types';

export const traditional_indian_004: TemplateDefinition = {
  id: 'traditional-indian-004',
  name: 'Traditional Indian',
  description: 'Authentic Indian wedding design with traditional motifs and colors. Celebrates Indian heritage.',
  category: 'personal',
  eventTypes: ['wedding', 'birthday', 'corporate', 'conference'], // Default generic
  tags: ["traditional","indian","cultural","motifs"],
  tier: 'free',
  previewImageUrl: '/images/templates/Traditional Indian wedding invitation design.png',
  thumbnailUrl: '/images/templates/Traditional Indian wedding invitation design.png',
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
