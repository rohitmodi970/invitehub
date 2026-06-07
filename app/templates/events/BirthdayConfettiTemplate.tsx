'use client';

import { BaseEventTemplate } from './BaseEventTemplate';
import type { TemplateProps } from '@/lib/invitations/types';

export function BirthdayConfettiTemplate(props: TemplateProps) {
  return (
    <BaseEventTemplate
      {...props}
      theme={{
        headerLabel: 'Birthday Invitation',
        accent: '#e84393',
        accentLight: '#fd79a8',
        bg: '#fff5f8',
        textOnAccent: '#ffffff',
        showAmpersand: false,
        decorativeEmoji: '🎂',
      }}
    />
  );
}
