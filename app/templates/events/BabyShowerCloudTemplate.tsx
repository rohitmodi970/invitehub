'use client';

import { BaseEventTemplate } from './BaseEventTemplate';
import type { TemplateProps } from '@/lib/invitations/types';

export function BabyShowerCloudTemplate(props: TemplateProps) {
  return (
    <BaseEventTemplate
      {...props}
      theme={{
        headerLabel: 'Baby Shower Invitation',
        accent: '#74b9ff',
        accentLight: '#a8d8ff',
        bg: '#f0f8ff',
        textOnAccent: '#ffffff',
        showAmpersand: false,
        decorativeEmoji: '👶',
      }}
    />
  );
}
