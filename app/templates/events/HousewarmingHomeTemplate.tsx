'use client';

import { BaseEventTemplate } from './BaseEventTemplate';
import type { TemplateProps } from '@/lib/invitations/types';

export function HousewarmingHomeTemplate(props: TemplateProps) {
  return (
    <BaseEventTemplate
      {...props}
      theme={{
        headerLabel: 'Housewarming Invitation',
        accent: '#00b894',
        accentLight: '#55efc4',
        bg: '#f0fff8',
        textOnAccent: '#ffffff',
        showAmpersand: false,
        decorativeEmoji: '🏠',
      }}
    />
  );
}
