'use client';

import { BaseEventTemplate } from './BaseEventTemplate';
import type { TemplateProps } from '@/lib/invitations/types';

export function CorporateMinimalTemplate(props: TemplateProps) {
  return (
    <BaseEventTemplate
      {...props}
      theme={{
        headerLabel: 'Corporate Event Invitation',
        accent: '#2d3436',
        accentLight: '#636e72',
        bg: '#f5f6f7',
        textOnAccent: '#ffffff',
        showAmpersand: false,
        decorativeEmoji: '🏢',
      }}
    />
  );
}
