'use client';

import { ScrollSection } from '../EventPageRenderer';
import type { EventData } from '@/lib/events/event-data';
import type { TemplateDesign } from '@/lib/templates/engine/types';

interface AgendaSectionProps {
  event: EventData;
  design: TemplateDesign;
  sectionIndex?: number;
}

export default function AgendaSection({ event, design }: AgendaSectionProps) {
  if (!event.agenda) return null;

  // Parse agenda: each line is an agenda item. Supports "HH:MM - Item" format.
  const lines = event.agenda.split('\n').filter(l => l.trim());

  return (
    <ScrollSection className="w-full px-6 py-16" animation={design.entranceAnimation}>
      <div className="mx-auto" style={{ maxWidth: design.maxWidth }}>
        <p
          className="text-center text-xs font-semibold tracking-[0.2em] uppercase mb-6"
          style={{ color: 'var(--accent-color)', fontFamily: 'var(--body-font)' }}
        >
          Agenda
        </p>

        <div
          className="rounded-3xl overflow-hidden"
          style={{ border: '1px solid var(--border-color)', borderRadius: design.borderRadius }}
        >
          {lines.map((line, i) => {
            const parts = line.match(/^(\d{1,2}:\d{2}(?:\s*(?:AM|PM|am|pm))?)\s*[-–]\s*(.+)$/);
            const time = parts?.[1];
            const text = parts?.[2] ?? line;

            return (
              <div
                key={i}
                className="flex items-start gap-4 p-4 sm:p-5"
                style={{
                  background: i % 2 === 0 ? 'var(--surface-color)' : 'transparent',
                  borderBottom: i < lines.length - 1 ? '1px solid var(--border-color)' : 'none',
                }}
              >
                {/* Time column */}
                {time && (
                  <span
                    className="shrink-0 text-xs font-semibold tabular-nums pt-0.5 w-14"
                    style={{ color: 'var(--accent-color)', fontFamily: 'var(--body-font)' }}
                  >
                    {time}
                  </span>
                )}

                {/* Dot */}
                <div
                  className="shrink-0 w-2 h-2 rounded-full mt-1.5"
                  style={{ background: 'var(--accent-color)' }}
                />

                {/* Item text */}
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: 'var(--text-color)', fontFamily: 'var(--body-font)' }}
                >
                  {text}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </ScrollSection>
  );
}
