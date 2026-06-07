import { ImageResponse } from 'next/og';
import { getInvitationBySlug } from '@/lib/db/invitations';

// Route segment config
export const runtime = 'edge';

// Image metadata
export const alt = 'Wedding Invitation';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const invite = await getInvitationBySlug(slug);

  if (!invite) {
    return new ImageResponse(
      (
        <div
          style={{
            fontSize: 48,
            background: 'white',
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          Invitation Not Found
        </div>
      ),
      { ...size }
    );
  }

  const { data } = invite;

  // Simple, elegant layout for the OG image
  // It won't match the exact CSS of the templates because OG Image uses standard Satori HTML/CSS subset,
  // but we can make it look clean and premium.
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(to bottom right, #fdfbfb, #ebedee)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Decorative border */}
        <div
          style={{
            position: 'absolute',
            top: 20,
            left: 20,
            right: 20,
            bottom: 20,
            border: '4px solid #d4af37',
            opacity: 0.5,
          }}
        />
        
        {/* Subtitle */}
        <div
          style={{
            fontSize: 32,
            color: '#666',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            marginBottom: 20,
          }}
        >
          You are invited
        </div>

        {/* Names */}
        <div
          style={{
            fontSize: 90,
            fontWeight: 'bold',
            color: '#1a1a1a',
            marginBottom: 40,
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {data.brideName} <span style={{ color: '#d4af37', margin: '0 30px' }}>&</span> {data.groomName}
        </div>

        {/* Date & Time */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            background: 'white',
            padding: '20px 60px',
            borderRadius: '12px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
          }}
        >
          <div style={{ fontSize: 36, color: '#333', fontWeight: 'bold', marginBottom: 10 }}>
            {data.weddingDate}
          </div>
          <div style={{ fontSize: 24, color: '#666' }}>
            {data.venueName}
          </div>
        </div>

        {/* Watermark branding at bottom */}
        <div
          style={{
            position: 'absolute',
            bottom: 40,
            fontSize: 24,
            color: '#999',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          Created with InviteHub.in
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
