import { notFound } from 'next/navigation';
import { getEventBySlug } from '@/lib/db/events';
import { getTemplateDefinition } from '@/lib/templates/engine/definitions';
import EventPageRenderer from '@/app/components/event-page/EventPageRenderer';
import { Metadata } from 'next';
import Script from 'next/script';

interface EventPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata(props: EventPageProps): Promise<Metadata> {
  const params = await props.params;
  const event = await getEventBySlug(params.slug);
  
  if (!event) {
    return {
      title: 'Event Not Found',
    };
  }

  const title = event.title;
  const description = event.message 
    ? event.message.substring(0, 150) + (event.message.length > 150 ? '...' : '') 
    : `You are invited to ${event.title}`;

  return {
    title: `${title} | InviteHub`,
    description,
    openGraph: {
      title,
      description,
      images: event.coverImageUrl ? [event.coverImageUrl] : [],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: event.coverImageUrl ? [event.coverImageUrl] : [],
    },
  };
}

export default async function EventPage(props: EventPageProps) {
  const params = await props.params;
  const event = await getEventBySlug(params.slug);

  if (!event || event.status !== 'published') {
    notFound();
  }

  const template = getTemplateDefinition(event.templateId || 'modern-minimal');

  return (
    <>
      <EventPageRenderer event={event} template={template} />
      
      {/* View count tracking / PostHog script could go here */}
      <Script id="event-view-tracker" strategy="afterInteractive">
        {`
          // Example of simple analytics ping
          // fetch('/api/analytics/view', { method: 'POST', body: JSON.stringify({ eventId: '${event.id}' }) })
        `}
      </Script>
    </>
  );
}
