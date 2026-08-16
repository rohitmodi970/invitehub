'use client';

import { ScrollSection } from '../EventPageRenderer';
import type { EventData } from '@/lib/events/event-data';
import type { TemplateDesign } from '@/lib/templates/engine/types';

interface VirtualLinkSectionProps {
  event: EventData;
  design: TemplateDesign;
  sectionIndex?: number;
}

function getLinkIcon(url?: string): string {
  if (!url) return '💻';
  if (url.includes('zoom')) return '🎥';
  if (url.includes('meet.google')) return '📹';
  if (url.includes('teams.microsoft')) return '👥';
  if (url.includes('youtube')) return '▶️';
  if (url.includes('webex')) return '🔵';
  return '💻';
}

function getLinkLabel(url?: string): string {
  if (!url) return 'Join Online';
  if (url.includes('zoom')) return 'Join via Zoom';
  if (url.includes('meet.google')) return 'Join via Google Meet';
  if (url.includes('teams.microsoft')) return 'Join via Microsoft Teams';
  if (url.includes('youtube')) return 'Watch on YouTube';
  return 'Join the Online Event';
}

export default function VirtualLinkSection({ event, design }: VirtualLinkSectionProps) {
  if (!event.virtualLink) return null;

  const icon = getLinkIcon(event.virtualLink);
  const label = getLinkLabel(event.virtualLink);

  return (
    <ScrollSection className="w-full px-6 py-16" animation={design.entranceAnimation}>
      <div className="mx-auto" style={{ maxWidth: design.maxWidth }}>
        <div
          className="rounded-3xl p-6 sm:p-8 text-center"
          style={{
            background: 'var(--surface-color)',
            border: '1px solid var(--border-color)',
            borderRadius: design.borderRadius,
          }}
        >
          <span className="text-4xl block mb-3">{icon}</span>
          <h3
            className="text-xl font-bold mb-2"
            style={{ fontFamily: 'var(--heading-font)', color: 'var(--text-color)' }}
          >
            This is a Virtual Event
          </h3>
          <p
            className="text-sm mb-5"
            style={{ color: 'var(--muted-text)', fontFamily: 'var(--body-font)' }}
          >
            Join from anywhere — the link will be active at event time.
          </p>
          <a
            href={event.virtualLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-sm transition-all hover:scale-105 active:scale-95"
            style={{
              background: 'linear-gradient(135deg, var(--accent-color), var(--secondary-color))',
              color: '#1a0e00',
              fontFamily: 'var(--body-font)',
            }}
          >
            {label} →
          </a>
          <p
            className="mt-4 text-xs break-all"
            style={{ color: 'var(--muted-text)', opacity: 0.6 }}
          >
            {event.virtualLink}
          </p>
        </div>
      </div>
    </ScrollSection>
  );
}
