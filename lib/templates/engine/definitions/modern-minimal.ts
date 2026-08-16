import { TemplateDefinition } from '../types';

export const modernMinimalTemplate: TemplateDefinition = {
  id: 'modern-minimal',
  name: 'Modern Minimal',
  description: 'Clean, professional design suitable for any event type.',
  category: 'professional',
  eventTypes: ['corporate', 'conference', 'wedding', 'birthday', 'networking'],
  tags: ['minimal', 'clean', 'professional', 'modern'],
  tier: 'free',
  previewImageUrl: '/images/templates/modern-minimal.png',
  thumbnailUrl: '/images/templates/modern-minimal.png',
  design: {
    headingFont: 'Inter',
    bodyFont: 'Inter',
    headingWeight: 700,
    backgroundColor: '#ffffff',
    surfaceColor: '#f8f9fa',
    textColor: '#111827',
    mutedTextColor: '#6b7280',
    accentColor: '#000000',
    secondaryColor: '#f3f4f6',
    borderColor: '#e5e7eb',
    borderRadius: '16px',
    maxWidth: '600px',
    backgroundEffect: 'none',
    entranceAnimation: 'fade-up',
    scrollAnimation: 'fade-sections',
    layout: 'centered',
    cardStyle: 'solid',
    useDividers: true
  },
  sections: [
    { type: 'hero', variant: 'centered', order: 1, enabled: true },
    { type: 'details', variant: 'default', order: 2, enabled: true },
    { type: 'countdown', variant: 'default', order: 3, enabled: true },
    { type: 'agenda', variant: 'default', order: 4, enabled: true },
    { type: 'venue-map', variant: 'default', order: 5, enabled: true },
    { type: 'virtual-link', variant: 'default', order: 6, enabled: true },
    { type: 'gallery', variant: 'default', order: 7, enabled: true },
    { type: 'rsvp', variant: 'default', order: 8, enabled: true },
    { type: 'calendar', variant: 'default', order: 9, enabled: true },
    { type: 'contact', variant: 'default', order: 10, enabled: true },
    { type: 'footer', variant: 'default', order: 11, enabled: true }
  ]
};
