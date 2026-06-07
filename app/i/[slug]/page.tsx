import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getInvitationBySlug, incrementViewCount, getInvitationTitle } from '@/lib/db/invitations';
import { getTemplateComponent } from '@/lib/templates/registry';
import { CountdownTimer } from '@/app/components/CountdownTimer';
import { RSVPForm } from '@/app/components/RSVPForm';
import { ShareButtons } from '@/app/components/ShareButtons';
import { GoogleMapEmbed } from '@/app/components/GoogleMapEmbed';
import { getEventTypeDef } from '@/lib/events/types';
import type { EventType } from '@/lib/events/types';

interface PublicInvitePageProps {
  params: Promise<{ slug: string }>;
}

function getHeroHeading(eventType: EventType, data: { brideName: string; groomName: string }) {
  const eventDef = getEventTypeDef(eventType);
  if (eventType === 'wedding' || eventType === 'engagement' || eventType === 'anniversary') {
    return (
      <>
        {data.brideName}
        <span className="mx-3 text-3xl" style={{ color: '#c9a84c' }}>&amp;</span>
        {data.groomName}
      </>
    );
  }
  return (
    <>
      {data.brideName}
      <span className="block text-2xl mt-2 text-white/70 font-normal">{data.groomName}</span>
    </>
  );
}

export async function generateMetadata({ params }: PublicInvitePageProps): Promise<Metadata> {
  const { slug } = await params;
  const invite = await getInvitationBySlug(slug);
  if (!invite) return { title: 'Invitation Not Found' };

  const title = getInvitationTitle(invite.eventType, invite.data);
  const description = `Join us on ${invite.data.weddingDate} at ${invite.data.venueName}. Click to view details and RSVP!`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: `/i/${slug}/opengraph-image`, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`/i/${slug}/opengraph-image`],
    },
  };
}

export default async function PublicInvitePage({ params }: PublicInvitePageProps) {
  const { slug } = await params;
  const invite = await getInvitationBySlug(slug);
  if (!invite) notFound();

  // Increment analytics view count asynchronously
  incrementViewCount(slug);

  const TemplateComponent = getTemplateComponent(invite.templateId);
  const eventDef = getEventTypeDef(invite.eventType);

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)' }}>

      {/* Ambient background blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, #c9a84c 0%, transparent 70%)' }} />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full opacity-15"
          style={{ background: 'radial-gradient(circle, #a855f7 0%, transparent 70%)' }} />
        <div className="absolute top-[40%] left-[60%] w-[300px] h-[300px] rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #ec4899 0%, transparent 70%)' }} />
      </div>

      <div className="relative z-10">

        {/* ── Hero section ── */}
        <div className="pt-16 pb-8 text-center px-4">
          <p className="text-xs tracking-[0.4em] uppercase text-white/40 mb-4 font-light">
            {eventDef.emoji} You&apos;re Invited
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-3 tracking-tight">
            {getHeroHeading(invite.eventType, invite.data)}
          </h1>
          <p className="text-white/50 text-sm tracking-wider">{invite.data.weddingDate} &bull; {invite.data.venueName}</p>
        </div>

        {/* ── Invitation Card ── */}
        <div className="px-4 mb-6">
          <div className="max-w-[440px] mx-auto" style={{ filter: 'drop-shadow(0 30px 60px rgba(0,0,0,0.6))' }}>
            <TemplateComponent data={invite.data} isPremium={invite.isPremium} />
          </div>
        </div>

        {/* ── Section divider label ── */}
        <SectionLabel icon="⏳" text="Counting Down" />

        {/* ── Countdown ── */}
        <div className="px-4 pb-2">
          <CountdownTimer targetDateStr={invite.data.weddingDate} />
        </div>

        {/* ── Section divider label ── */}
        <SectionLabel icon="📍" text="Venue" />

        {/* ── Map ── */}
        <div className="px-4 pb-2">
          <GoogleMapEmbed address={`${invite.data.venueName}, ${invite.data.venueAddress}`} />
        </div>

        {/* ── Section divider label ── */}
        <SectionLabel icon="💌" text="RSVP" />

        {/* ── RSVP ── */}
        <div className="px-4 pb-2">
          <RSVPForm invitationId={invite.id} />
        </div>

        {/* ── Section divider label ── */}
        <SectionLabel icon="🔗" text="Share" />

        {/* ── Share ── */}
        <div className="px-4 pb-20">
          <ShareButtons
            brideName={invite.data.brideName}
            groomName={invite.data.groomName}
            slug={slug}
          />
        </div>

        {/* ── Footer ── */}
        <div className="text-center py-8 border-t border-white/10">
          <p className="text-white/25 text-xs tracking-widest uppercase">Made with ❤️ on InviteHub.in</p>
        </div>
      </div>
    </div>
  );
}

function SectionLabel({ icon, text }: { icon: string; text: string }) {
  return (
    <div className="flex items-center gap-4 max-w-lg mx-auto px-6 py-8">
      <div className="flex-1 h-px bg-white/10" />
      <div className="flex items-center gap-2">
        <span className="text-lg">{icon}</span>
        <span className="text-white/40 text-xs tracking-[0.25em] uppercase font-medium">{text}</span>
      </div>
      <div className="flex-1 h-px bg-white/10" />
    </div>
  );
}
