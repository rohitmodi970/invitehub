'use client';

import { BaseEventTemplate } from './BaseEventTemplate';
import type { TemplateProps } from '@/lib/invitations/types';

export function EngagementRingsTemplate(props: TemplateProps) {
  return (
    <BaseEventTemplate
      {...props}
      theme={{
        headerLabel: 'Engagement Invitation',
        accent: '#6c5ce7',
        accentLight: '#a29bfe',
        bg: '#f8f7ff',
        textOnAccent: '#ffffff',
        showAmpersand: true,
        decorativeEmoji: '💍',
      }}
    />
  );
}
