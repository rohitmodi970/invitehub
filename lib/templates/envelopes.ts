import { ElegantGoldEnvelope } from '@/app/components/envelopes/ElegantGoldEnvelope';
import { TraditionalIndianEnvelope } from '@/app/components/envelopes/TraditionalIndianEnvelope';
import {
  ModernGeometricEnvelope,
  RomanticVintageEnvelope,
  RoyalPurpleEnvelope,
} from '@/app/components/envelopes/OtherEnvelopes';
import { InvitationData } from '@/app/templates/traditional-indian-004/components/TraditionalIndianTemplate';
import React from 'react';

export type EnvelopeFC = React.ComponentType<{ data: InvitationData }>;

const envelopeRegistry: Record<string, EnvelopeFC> = {
  'elegant-gold-001': ElegantGoldEnvelope,
  'modern-geometric-002': ModernGeometricEnvelope,
  'romantic-vintage-003': RomanticVintageEnvelope,
  'traditional-indian-004': TraditionalIndianEnvelope,
  'royal-purple-005': RoyalPurpleEnvelope,
};

export function getEnvelopeComponent(templateId: string): EnvelopeFC | null {
  return envelopeRegistry[templateId] ?? ElegantGoldEnvelope;
}
