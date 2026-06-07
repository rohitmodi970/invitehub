'use client';

import React from 'react';
import { InvitationData } from '@/app/templates/traditional-indian-004/components/TraditionalIndianTemplate';

interface Props { data: InvitationData; }

export function ElegantGoldEnvelope({ data }: Props) {
  return (
    <div
      style={{
        width: 560,
        height: 392,
        background: 'linear-gradient(145deg, #1a1208 0%, #0f0c0a 100%)',
        border: '2px solid #c9a84c',
        borderRadius: 16,
        position: 'relative',
        overflow: 'hidden',
        fontFamily: 'Georgia, serif',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Flap (top triangle) */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0,
        height: 0,
        borderLeft: '280px solid transparent',
        borderRight: '280px solid transparent',
        borderTop: '160px solid rgba(201,168,76,0.15)',
      }} />
      {/* Flap border lines */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0,
        height: 0,
        borderLeft: '280px solid transparent',
        borderRight: '280px solid transparent',
        borderTop: '2px solid rgba(201,168,76,0.4)',
      }} />

      {/* Gold corner ornaments */}
      {['top-3 left-3', 'top-3 right-3', 'bottom-3 left-3', 'bottom-3 right-3'].map((pos, i) => (
        <span key={i} style={{
          position: 'absolute',
          [pos.includes('top') ? 'top' : 'bottom']: 12,
          [pos.includes('left') ? 'left' : 'right']: 12,
          color: 'rgba(201,168,76,0.6)', fontSize: 18,
        }}>✦</span>
      ))}

      {/* Wax seal center */}
      <div style={{
        width: 80, height: 80, borderRadius: '50%',
        background: 'radial-gradient(circle at 35% 35%, #f0d080, #c9a84c 50%, #8b6914)',
        border: '2px solid rgba(201,168,76,0.5)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 4px 20px rgba(201,168,76,0.4)',
        marginBottom: 16,
        zIndex: 2,
      }}>
        <span style={{ fontSize: 28 }}>💍</span>
      </div>

      {/* Names */}
      <p style={{ color: '#c9a84c', fontSize: 22, fontWeight: 'bold', letterSpacing: '0.08em', zIndex: 2, margin: '0 0 4px' }}>
        {data.brideName} &amp; {data.groomName}
      </p>
      <p style={{ color: 'rgba(201,168,76,0.5)', fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase', zIndex: 2 }}>
        Wedding Invitation
      </p>

      {/* Bottom lining */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        height: 0,
        borderLeft: '280px solid transparent',
        borderRight: '280px solid transparent',
        borderBottom: '120px solid rgba(201,168,76,0.08)',
      }} />

      {/* InviteHub branding */}
      <p style={{
        position: 'absolute', bottom: 10, right: 16,
        color: 'rgba(201,168,76,0.3)', fontSize: 9,
        letterSpacing: '0.15em', textTransform: 'uppercase',
      }}>InviteHub.in</p>
    </div>
  );
}
