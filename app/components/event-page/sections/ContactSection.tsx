'use client';

import { ScrollSection } from '../EventPageRenderer';
import type { EventData } from '@/lib/events/event-data';
import type { TemplateDesign } from '@/lib/templates/engine/types';

interface ContactSectionProps {
  event: EventData;
  design: TemplateDesign;
  sectionIndex?: number;
}

export default function ContactSection({ event, design }: ContactSectionProps) {
  const hasContact = event.contactPhone || event.contactEmail || event.contactWebsite;
  if (!hasContact) return null;

  return (
    <ScrollSection className="w-full px-6 py-12" animation={design.entranceAnimation}>
      <div className="mx-auto" style={{ maxWidth: design.maxWidth }}>
        <div className="flex flex-wrap justify-center gap-3">
          {event.contactPhone && (
            <a
              href={`tel:${event.contactPhone}`}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all hover:scale-105"
              style={{
                background: 'var(--surface-color)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-color)',
                fontFamily: 'var(--body-font)',
              }}
            >
              📞 {event.contactPhone}
            </a>
          )}
          {event.contactEmail && (
            <a
              href={`mailto:${event.contactEmail}`}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all hover:scale-105"
              style={{
                background: 'var(--surface-color)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-color)',
                fontFamily: 'var(--body-font)',
              }}
            >
              ✉️ {event.contactEmail}
            </a>
          )}
          {event.contactWebsite && (
            <a
              href={event.contactWebsite}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all hover:scale-105"
              style={{
                background: 'var(--surface-color)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-color)',
                fontFamily: 'var(--body-font)',
              }}
            >
              🌐 Website
            </a>
          )}
        </div>
      </div>
    </ScrollSection>
  );
}
