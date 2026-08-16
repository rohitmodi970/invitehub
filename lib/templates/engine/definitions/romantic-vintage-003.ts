import type { TemplateDefinition } from '../types';
import { buildSections } from '../types';

export const romantic_vintage_003: TemplateDefinition = {
  id: 'romantic-vintage-003',
  name: 'Romantic Vintage',
  description: 'Vintage-inspired design with romantic elements. Perfect for couples who love classic aesthetics.',
  category: 'personal',
  eventTypes: ['wedding', 'birthday', 'corporate', 'conference'], // Default generic
  tags: ["vintage","romantic","classic","antique"],
  tier: 'free',
  previewImageUrl: '/images/templates/Romantic vintage wedding invitation design.png',
  thumbnailUrl: '/images/templates/Romantic vintage wedding invitation design.png',
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
