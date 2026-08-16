/**
 * Calendar utilities for InviteHub event pages.
 *
 * Supports:
 *  - Google Calendar deep link
 *  - Outlook Calendar deep link
 *  - Apple Calendar / universal .ics file download
 *
 * All functions accept EventData and return ready-to-use URLs/strings.
 */
import type { EventData } from '@/lib/events/event-data';

// ── Date formatting helpers ────────────────────────────────────────────

/** Format a date+time for Google Calendar: "20260920T180000" */
function formatGoogleDate(date: string, time?: string): string {
  if (!date) return '';
  const d = date.replace(/-/g, '');
  if (!time) return d;
  const t = time.replace(/:/g, '').slice(0, 6).padEnd(6, '0');
  return `${d}T${t}`;
}

/** Format a date+time for Outlook: "2026-09-20T18:00:00" */
function formatOutlookDate(date: string, time?: string): string {
  if (!date) return '';
  if (!time) return `${date}T00:00:00`;
  return `${date}T${time}:00`;
}

/** Add hours to a time string: addHours("18:00", 2) → "20:00" */
function addHoursToTime(time: string, hours: number): string {
  const [h, m] = time.split(':').map(Number);
  const total = h + hours;
  return `${String(total % 24).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

/** Get a reasonable end time: event_end_time → event_time+2h → "23:59" */
function getEndTime(event: EventData): string {
  if (event.eventEndTime) return event.eventEndTime;
  if (event.eventTime) return addHoursToTime(event.eventTime, 2);
  return '23:59';
}

function getEndDate(event: EventData): string {
  return event.eventEndDate || event.eventDate;
}

// ── Google Calendar ────────────────────────────────────────────────────

export function getGoogleCalendarUrl(event: EventData): string {
  const start = formatGoogleDate(event.eventDate, event.eventTime);
  const end = formatGoogleDate(getEndDate(event), getEndTime(event));

  const details = [
    event.message,
    event.isVirtual && event.virtualLink ? `Join online: ${event.virtualLink}` : null,
    `\nRSVP & full details: https://invitehub.in/e/${event.slug}`,
  ].filter(Boolean).join('\n');

  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: event.title,
    dates: `${start}/${end}`,
    location: event.isVirtual
      ? (event.virtualLink || 'Online Event')
      : (event.venueAddress || event.venueName || ''),
    details,
    ...(event.timezone ? { ctz: event.timezone } : {}),
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

// ── Outlook Calendar ───────────────────────────────────────────────────

export function getOutlookCalendarUrl(event: EventData): string {
  const body = [
    event.message,
    event.isVirtual && event.virtualLink ? `Join online: ${event.virtualLink}` : null,
    `\nRSVP & full details: https://invitehub.in/e/${event.slug}`,
  ].filter(Boolean).join('\n');

  const params = new URLSearchParams({
    subject: event.title,
    startdt: formatOutlookDate(event.eventDate, event.eventTime),
    enddt: formatOutlookDate(getEndDate(event), getEndTime(event)),
    location: event.isVirtual
      ? (event.virtualLink || 'Online Event')
      : (event.venueAddress || event.venueName || ''),
    body,
  });

  return `https://outlook.live.com/calendar/0/deeplink/compose?${params.toString()}`;
}

// ── ICS File ───────────────────────────────────────────────────────────

/** Format a date+time for ICS format: "20260920T180000" or "20260920" for all-day */
function formatICSDateTime(date: string, time?: string, timezone?: string): string {
  const d = date.replace(/-/g, '');
  if (!time) return d;
  const t = time.replace(/:/g, '').slice(0, 6).padEnd(6, '0');
  return `${d}T${t}`;
}

/** Escape special characters in ICS text fields */
function escapeICS(text: string): string {
  return text
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\n/g, '\\n');
}

/** Fold long ICS lines to 75 chars as per RFC 5545 */
function foldICSLine(line: string): string {
  if (line.length <= 75) return line;
  let result = '';
  let current = line;
  while (current.length > 75) {
    result += current.slice(0, 75) + '\r\n ';
    current = current.slice(75);
  }
  return result + current;
}

export function generateICS(event: EventData): string {
  const now = new Date().toISOString().replace(/[-:]/g, '').slice(0, 15) + 'Z';
  const startDate = formatICSDateTime(event.eventDate, event.eventTime, event.timezone);
  const endDate = formatICSDateTime(getEndDate(event), getEndTime(event), event.timezone);

  const dtStartLine = event.eventTime
    ? `DTSTART;TZID=${event.timezone}:${startDate}`
    : `DTSTART;VALUE=DATE:${startDate}`;
  const dtEndLine = event.eventTime
    ? `DTEND;TZID=${event.timezone}:${endDate}`
    : `DTEND;VALUE=DATE:${endDate}`;

  const description = [
    event.message,
    event.isVirtual && event.virtualLink ? `Join online: ${event.virtualLink}` : null,
    `\nRSVP & full details: https://invitehub.in/e/${event.slug}`,
  ].filter(Boolean).join('\n');

  const location = event.isVirtual
    ? (event.virtualLink || 'Online Event')
    : [event.venueName, event.venueAddress, event.venueCity, event.venueCountry]
        .filter(Boolean).join(', ');

  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//InviteHub//InviteHub 2.0//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${event.id}@invitehub.in`,
    `DTSTAMP:${now}`,
    dtStartLine,
    dtEndLine,
    foldICSLine(`SUMMARY:${escapeICS(event.title)}`),
    location ? foldICSLine(`LOCATION:${escapeICS(location)}`) : null,
    description ? foldICSLine(`DESCRIPTION:${escapeICS(description)}`) : null,
    foldICSLine(`URL:https://invitehub.in/e/${event.slug}`),
    event.isVirtual && event.virtualLink
      ? foldICSLine(`CONFERENCE;VALUE=URI:${event.virtualLink}`)
      : null,
    'STATUS:CONFIRMED',
    'TRANSP:OPAQUE',
    'END:VEVENT',
    'END:VCALENDAR',
  ].filter(Boolean).join('\r\n');

  return lines;
}

// ── Convenience: All calendar URLs ────────────────────────────────────

export function getCalendarUrls(event: EventData) {
  return {
    google: getGoogleCalendarUrl(event),
    outlook: getOutlookCalendarUrl(event),
    icsDownload: `/api/events/${event.id}/calendar.ics`,
  };
}
