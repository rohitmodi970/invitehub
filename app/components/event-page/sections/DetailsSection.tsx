'use client';

import { ScrollSection } from '../EventPageRenderer';
import type { EventData } from '@/lib/events/event-data';
import type { TemplateDesign } from '@/lib/templates/engine/types';

interface DetailsSectionProps {
  event: EventData;
  design: TemplateDesign;
  sectionIndex?: number;
}

export default function DetailsSection({ event, design, sectionIndex = 0 }: DetailsSectionProps) {
  const hasDetails = event.message || event.dressCode || event.familyDetails || event.agenda;
  if (!hasDetails) return null;

  return (
    <ScrollSection
      className="w-full px-6 py-16"
      delay={0.1}
      animation={design.entranceAnimation}
    >
      <div
        className="mx-auto space-y-6"
        style={{ maxWidth: design.maxWidth }}
      >
        {/* Personal message */}
        {event.message && (
          <DetailCard design={design}>
            <p
              className="text-base sm:text-lg leading-relaxed text-center italic"
              style={{
                fontFamily: 'var(--heading-font)',
                color: 'var(--text-color)',
                opacity: 0.9,
              }}
            >
              &ldquo;{event.message}&rdquo;
            </p>
          </DetailCard>
        )}

        {/* Info chips row */}
        {(event.dressCode || event.venueCity || event.venueCountry) && (
          <div className="flex flex-wrap justify-center gap-3">
            {event.dressCode && (
              <InfoChip icon="👗" label="Dress Code" value={event.dressCode} design={design} />
            )}
            {event.venueCity && (
              <InfoChip
                icon="🌆"
                label="City"
                value={[event.venueCity, event.venueCountry].filter(Boolean).join(', ')}
                design={design}
              />
            )}
            {event.eventType === 'webinar' || event.isVirtual ? (
              <InfoChip icon="💻" label="Format" value="Virtual / Online" design={design} />
            ) : null}
          </div>
        )}

        {/* Family details (for personal events) */}
        {event.familyDetails && event.eventCategory === 'personal' && (
          <DetailCard design={design}>
            <p
              className="text-sm leading-relaxed text-center"
              style={{ color: 'var(--muted-text)', fontFamily: 'var(--body-font)' }}
            >
              {event.familyDetails}
            </p>
          </DetailCard>
        )}
      </div>
    </ScrollSection>
  );
}

function DetailCard({ children, design }: { children: React.ReactNode; design: TemplateDesign }) {
  const cardStyles = {
    glass: {
      background: 'rgba(255,255,255,0.05)',
      backdropFilter: 'blur(12px)',
      border: '1px solid var(--border-color)',
    },
    solid: {
      background: 'var(--surface-color)',
      border: '1px solid var(--border-color)',
    },
    outline: {
      background: 'transparent',
      border: '1px solid var(--border-color)',
    },
    none: {
      background: 'transparent',
    },
  }[design.cardStyle] || {};

  return (
    <div
      className="w-full rounded-2xl p-6 sm:p-8"
      style={{ borderRadius: design.borderRadius, ...cardStyles }}
    >
      {children}
    </div>
  );
}

function InfoChip({
  icon,
  label,
  value,
  design,
}: {
  icon: string;
  label: string;
  value: string;
  design: TemplateDesign;
}) {
  return (
    <div
      className="flex items-center gap-2 px-4 py-2.5 rounded-full"
      style={{
        background: 'var(--surface-color)',
        border: '1px solid var(--border-color)',
      }}
    >
      <span className="text-base">{icon}</span>
      <div className="flex flex-col">
        <span
          className="text-[10px] font-semibold tracking-widest uppercase leading-none"
          style={{ color: 'var(--accent-color)' }}
        >
          {label}
        </span>
        <span
          className="text-sm font-medium"
          style={{ color: 'var(--text-color)', fontFamily: 'var(--body-font)' }}
        >
          {value}
        </span>
      </div>
    </div>
  );
}
