'use client';

import { BaseEventTemplate } from './BaseEventTemplate';
import type { TemplateProps } from '@/lib/invitations/types';

export function AnniversaryHeartsTemplate(props: TemplateProps) {
  return (
    <BaseEventTemplate
      {...props}
      theme={{
        headerLabel: 'Anniversary Invitation',
        accent: '#d63031',
        accentLight: '#ff7675',
        bg: '#fff5f5',
        textOnAccent: '#ffffff',
        showAmpersand: true,
        decorativeEmoji: '❤️',
      }}
    />
  );
}
