'use client';

import React from 'react';
import { InvitationData } from '@/app/templates/traditional-indian-004/components/TraditionalIndianTemplate';

interface Props { data: InvitationData; }

export function ModernGeometricEnvelope({ data }: Props) {
  return (
    <div style={{
      width: 560, height: 392,
      background: '#F9FAFB',
      border: '2px solid #374151',
      borderRadius: 8,
      position: 'relative',
      overflow: 'hidden',
      fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
    }}>
      {/* Geometric diagonal accent */}
      <div style={{
        position: 'absolute', top: 0, left: 0,
        width: 0, height: 0,
        borderTop: '392px solid transparent',
        borderLeft: '180px solid #1F2937',
      }} />
      <div style={{
        position: 'absolute', top: 0, left: 0,
        width: 0, height: 0,
        borderTop: '392px solid transparent',
        borderLeft: '150px solid #374151',
      }} />

      {/* Envelope flap */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 0,
        borderLeft: '280px solid transparent',
        borderRight: '280px solid transparent',
        borderTop: '140px solid rgba(55,65,81,0.06)',
      }} />

      {/* Central monogram circle */}
      <div style={{
        width: 76, height: 76, borderRadius: '50%',
        background: '#1F2937',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 4px 20px rgba(31,41,55,0.3)',
        marginBottom: 16, zIndex: 2,
      }}>
        <span style={{ color: 'white', fontSize: 22, fontWeight: 'bold' }}>
          {data.brideName?.[0]}{data.groomName?.[0]}
        </span>
      </div>

      <p style={{ color: '#1F2937', fontSize: 20, fontWeight: '600', letterSpacing: '0.04em', zIndex: 2, margin: '0 0 6px' }}>
        {data.brideName} &amp; {data.groomName}
      </p>
      <p style={{ color: '#6B7280', fontSize: 10, letterSpacing: '0.35em', textTransform: 'uppercase', zIndex: 2 }}>
        Wedding Invitation · {data.weddingDate}
      </p>

      <p style={{
        position: 'absolute', bottom: 14, right: 18,
        color: 'rgba(31,41,55,0.25)', fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase',
      }}>InviteHub.in</p>
    </div>
  );
}

export function RomanticVintageEnvelope({ data }: Props) {
  return (
    <div style={{
      width: 560, height: 392,
      background: 'linear-gradient(145deg, #fdf6f0 0%, #f9ede0 100%)',
      border: '2px solid #c9856a',
      borderRadius: 12,
      position: 'relative',
      overflow: 'hidden',
      fontFamily: 'Georgia, serif',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
    }}>
      {/* Rose-toned flap */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 0,
        borderLeft: '280px solid transparent',
        borderRight: '280px solid transparent',
        borderTop: '150px solid rgba(201,133,106,0.12)',
      }} />

      {/* Floral corner elements */}
      {[
        { top: 14, left: 14 }, { top: 14, right: 14 },
        { bottom: 14, left: 14 }, { bottom: 14, right: 14 },
      ].map((pos, i) => (
        <span key={i} style={{ position: 'absolute', ...pos, color: '#c9856a', fontSize: 20, opacity: 0.6 }}>🌹</span>
      ))}

      {/* Wax seal */}
      <div style={{
        width: 76, height: 76, borderRadius: '50%',
        background: 'radial-gradient(circle at 35% 35%, #f4a07a, #c9856a 50%, #9a5440)',
        border: '2px solid rgba(201,133,106,0.5)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 4px 16px rgba(201,133,106,0.5)',
        marginBottom: 14, zIndex: 2,
      }}>
        <span style={{ fontSize: 28 }}>💐</span>
      </div>

      <p style={{ color: '#7a4030', fontSize: 22, fontWeight: 'bold', letterSpacing: '0.06em', zIndex: 2, margin: '0 0 4px' }}>
        {data.brideName} &amp; {data.groomName}
      </p>
      <p style={{ color: '#c9856a', fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', zIndex: 2 }}>
        Together Forever · Wedding Invitation
      </p>

      <p style={{
        position: 'absolute', bottom: 14, right: 18,
        color: 'rgba(122,64,48,0.3)', fontSize: 9, letterSpacing: '0.15em', textTransform: 'uppercase',
      }}>InviteHub.in</p>
    </div>
  );
}

export function RoyalPurpleEnvelope({ data }: Props) {
  return (
    <div style={{
      width: 560, height: 392,
      background: 'linear-gradient(145deg, #1a0a2e 0%, #2d1b69 100%)',
      border: '2px solid #7c3aed',
      borderRadius: 12,
      position: 'relative',
      overflow: 'hidden',
      fontFamily: 'Georgia, serif',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
    }}>
      {/* Star field effect */}
      {Array.from({ length: 20 }).map((_, i) => (
        <div key={i} style={{
          position: 'absolute',
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          width: 2, height: 2, borderRadius: '50%',
          background: 'rgba(196,181,253,0.4)',
        }} />
      ))}

      {/* Royal flap */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 0,
        borderLeft: '280px solid transparent',
        borderRight: '280px solid transparent',
        borderTop: '150px solid rgba(124,58,237,0.15)',
      }} />

      {/* Crown seal */}
      <div style={{
        width: 76, height: 76, borderRadius: '50%',
        background: 'radial-gradient(circle at 35% 35%, #a78bfa, #7c3aed 50%, #4c1d95)',
        border: '2px solid rgba(167,139,250,0.5)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 4px 20px rgba(124,58,237,0.5)',
        marginBottom: 16, zIndex: 2,
      }}>
        <span style={{ fontSize: 28 }}>👑</span>
      </div>

      <p style={{ color: '#e9d5ff', fontSize: 22, fontWeight: 'bold', letterSpacing: '0.08em', zIndex: 2, margin: '0 0 4px' }}>
        {data.brideName} &amp; {data.groomName}
      </p>
      <p style={{ color: 'rgba(167,139,250,0.6)', fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', zIndex: 2 }}>
        Royal Wedding Invitation
      </p>

      <p style={{
        position: 'absolute', bottom: 14, right: 18,
        color: 'rgba(167,139,250,0.25)', fontSize: 9, letterSpacing: '0.15em', textTransform: 'uppercase',
      }}>InviteHub.in</p>
    </div>
  );
}
