'use client';

import { ScrollSection } from '../EventPageRenderer';
import type { EventData } from '@/lib/events/event-data';
import type { TemplateDesign } from '@/lib/templates/engine/types';
import { getCalendarUrls } from '@/lib/calendar/ics';
import { usePostHog } from 'posthog-js/react';

interface AddToCalendarSectionProps {
  event: EventData;
  design: TemplateDesign;
  sectionIndex?: number;
}

export default function AddToCalendarSection({ event, design }: AddToCalendarSectionProps) {
  const posthog = usePostHog();
  const urls = getCalendarUrls(event);

  const trackAndOpen = (provider: 'google' | 'outlook' | 'apple' | 'ics', url?: string) => {
    posthog?.capture('calendar_add_clicked', {
      provider,
      event_id: event.id,
      event_type: event.eventType,
    });

    // Increment DB counter via API
    fetch(`/api/events/${event.id}/calendar-add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ provider }),
    }).catch(() => {}); // Silent — analytics is best-effort

    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const buttons = [
    {
      provider: 'google' as const,
      label: 'Google Calendar',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-2 .89-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2zm0 16H5V8h14v11z" fill="#4285F4"/>
          <path d="M12 10.5a2.5 2.5 0 100 5 2.5 2.5 0 000-5z" fill="#4285F4"/>
        </svg>
      ),
      url: urls.google,
    },
    {
      provider: 'outlook' as const,
      label: 'Outlook',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M7 12a5 5 0 1010 0A5 5 0 007 12z" fill="#0078D4"/>
          <path d="M2 6h9v12H2z" fill="#0078D4" opacity="0.8"/>
        </svg>
      ),
      url: urls.outlook,
    },
    {
      provider: 'apple' as const,
      label: 'Apple Calendar',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <rect x="3" y="3" width="18" height="18" rx="4" fill="#FF3B30"/>
          <rect x="3" y="7" width="18" height="14" rx="0" fill="white"/>
          <rect x="3" y="7" width="18" height="4" fill="#FF3B30"/>
          <text x="12" y="18" textAnchor="middle" fontSize="7" fontWeight="bold" fill="#FF3B30">
            {new Date().getDate()}
          </text>
        </svg>
      ),
      url: urls.icsDownload,
    },
    {
      provider: 'ics' as const,
      label: 'Download .ics',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M12 16l-6-6h4V4h4v6h4l-6 6z" fill="currentColor"/>
          <path d="M20 18H4v2h16v-2z" fill="currentColor"/>
        </svg>
      ),
      url: urls.icsDownload,
    },
  ];

  return (
    <ScrollSection
      className="w-full px-6 py-16"
      animation={design.entranceAnimation}
    >
      <div
        className="mx-auto"
        style={{ maxWidth: design.maxWidth }}
      >
        <div
          className="rounded-3xl p-6 sm:p-8"
          style={{
            background: 'var(--surface-color)',
            border: '1px solid var(--border-color)',
            borderRadius: design.borderRadius,
          }}
        >
          {/* Header */}
          <div className="text-center mb-6">
            <span className="text-3xl mb-2 block">📅</span>
            <h3
              className="text-xl font-bold mb-1"
              style={{ fontFamily: 'var(--heading-font)', color: 'var(--text-color)' }}
            >
              Save the Date
            </h3>
            <p
              className="text-sm"
              style={{ color: 'var(--muted-text)', fontFamily: 'var(--body-font)' }}
            >
              Add to your calendar so you don&apos;t miss it
            </p>
          </div>

          {/* Calendar buttons */}
          <div className="grid grid-cols-2 gap-3">
            {buttons.map(btn => (
              <button
                key={btn.provider}
                onClick={() => trackAndOpen(btn.provider, btn.url)}
                className="flex items-center gap-2.5 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] text-left"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-color)',
                  fontFamily: 'var(--body-font)',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.background = `rgba(var(--accent-color), 0.1)`;
                  (e.currentTarget as HTMLElement).style.borderColor = 'var(--accent-color)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)';
                  (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-color)';
                }}
              >
                {btn.icon}
                <span>{btn.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </ScrollSection>
  );
}
