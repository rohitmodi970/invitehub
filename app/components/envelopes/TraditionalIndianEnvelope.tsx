'use client';

import React from 'react';
import { InvitationData } from '@/app/templates/traditional-indian-004/components/TraditionalIndianTemplate';

interface Props { data: InvitationData; }

export function TraditionalIndianEnvelope({ data }: Props) {
  return (
    <div style={{
      width: 560, height: 392,
      background: 'linear-gradient(145deg, #FFF8F0 0%, #FEF0DC 100%)',
      border: '3px solid #D4A017',
      borderRadius: 12,
      position: 'relative',
      overflow: 'hidden',
      fontFamily: 'Georgia, serif',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
    }}>
      {/* Top border band */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 8,
        background: 'linear-gradient(90deg, #E8751A, #B3301A, #E8751A)',
      }} />
      {/* Bottom border band */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 8,
        background: 'linear-gradient(90deg, #E8751A, #B3301A, #E8751A)',
      }} />

      {/* Corner mandala decorations */}
      {[
        { top: 16, left: 16 }, { top: 16, right: 16 },
        { bottom: 16, left: 16 }, { bottom: 16, right: 16 },
      ].map((pos, i) => (
        <span key={i} style={{ position: 'absolute', ...pos, color: '#D4A017', fontSize: 22, opacity: 0.7 }}>🪷</span>
      ))}

      {/* Envelope flap lines */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 0,
        borderLeft: '280px solid transparent',
        borderRight: '280px solid transparent',
        borderTop: '140px solid rgba(212,160,23,0.1)',
      }} />

      {/* Wax seal */}
      <div style={{
        width: 72, height: 72, borderRadius: '50%',
        background: 'radial-gradient(circle at 35% 35%, #E8751A, #B3301A 60%, #8B1A1A)',
        border: '2px solid #D4A017',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 4px 16px rgba(139,26,26,0.4)',
        marginBottom: 14, zIndex: 2,
      }}>
        <span style={{ fontSize: 26 }}>🕉️</span>
      </div>

      {/* Names in Hindi style */}
      <p style={{ color: '#8B1A1A', fontSize: 22, fontWeight: 'bold', letterSpacing: '0.05em', zIndex: 2, margin: '0 0 4px' }}>
        {data.brideName} &amp; {data.groomName}
      </p>
      <p style={{ color: '#E8751A', fontSize: 10, letterSpacing: '0.35em', textTransform: 'uppercase', zIndex: 2 }}>
        शुभ विवाह · Wedding Invitation
      </p>

      <p style={{
        position: 'absolute', bottom: 18, right: 20,
        color: 'rgba(139,26,26,0.3)', fontSize: 9, letterSpacing: '0.15em', textTransform: 'uppercase',
      }}>InviteHub.in</p>
    </div>
  );
}
