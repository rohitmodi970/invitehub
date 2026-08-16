'use client';

import { ScrollSection } from '../EventPageRenderer';
import type { EventData } from '@/lib/events/event-data';
import type { TemplateDesign } from '@/lib/templates/engine/types';

interface VenueMapSectionProps {
  event: EventData;
  design: TemplateDesign;
  sectionIndex?: number;
}

export default function VenueMapSection({ event, design }: VenueMapSectionProps) {
  if (!event.venueLat || !event.venueLng) return null;

  const mapsUrl = `https://www.google.com/maps?q=${event.venueLat},${event.venueLng}`;
  const embedUrl = `https://maps.google.com/maps?q=${event.venueLat},${event.venueLng}&z=15&output=embed`;

  return (
    <ScrollSection className="w-full px-6 py-16" animation={design.entranceAnimation}>
      <div className="mx-auto" style={{ maxWidth: design.maxWidth }}>
        <div
          className="rounded-3xl overflow-hidden"
          style={{ border: '1px solid var(--border-color)', borderRadius: design.borderRadius }}
        >
          {/* Map embed */}
          <div className="relative h-64 sm:h-80 w-full">
            <iframe
              src={embedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`Map showing ${event.venueName || 'event venue'}`}
            />
          </div>

          {/* Venue details bar */}
          <div
            className="p-5 flex items-start justify-between gap-4"
            style={{ background: 'var(--surface-color)' }}
          >
            <div>
              <p
                className="text-xs font-semibold tracking-widest uppercase mb-1"
                style={{ color: 'var(--accent-color)', fontFamily: 'var(--body-font)' }}
              >
                📍 Venue
              </p>
              {event.venueName && (
                <p
                  className="font-bold text-base mb-0.5"
                  style={{ color: 'var(--text-color)', fontFamily: 'var(--heading-font)' }}
                >
                  {event.venueName}
                </p>
              )}
              {event.venueAddress && (
                <p className="text-sm" style={{ color: 'var(--muted-text)', fontFamily: 'var(--body-font)' }}>
                  {event.venueAddress}
                </p>
              )}
            </div>
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all hover:scale-105 active:scale-95"
              style={{
                background: 'var(--accent-color)',
                color: '#1a0e00',
                fontFamily: 'var(--body-font)',
              }}
            >
              Get Directions →
            </a>
          </div>
        </div>
      </div>
    </ScrollSection>
  );
}
