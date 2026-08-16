/**
 * Guests DB layer — Milestone 2
 *
 * Manages the `guests` table for pre-invited guest lists.
 * Distinct from `rsvps` (which captures guest responses on the event page).
 *
 * Flow:
 *   Host uploads CSV → guests table
 *   Guest opens event page → submits RSVP → rsvps table
 *   Dashboard shows both: invited guests + their RSVP status
 */
import { createServerClient } from '@/lib/supabase/server';

export interface Guest {
  id: string;
  eventId: string;
  name: string;
  email?: string;
  phone?: string;
  group?: string;       // e.g. "Family", "Work", "College"
  plusOnes: number;     // Number of additional guests allowed
  notes?: string;
  rsvpStatus?: 'accepted' | 'declined' | 'maybe' | 'pending';
  rsvpId?: string;      // linked rsvp row if they responded
  createdAt: string;
}

export interface GuestImportRow {
  name: string;
  email?: string;
  phone?: string;
  group?: string;
  plusOnes?: number;
  notes?: string;
}

// ── Read ──────────────────────────────────────────────────────────────

export async function getGuestsByEvent(eventId: string): Promise<Guest[]> {
  const supabase = await createServerClient();

  const { data, error } = await supabase
    .from('guests')
    .select(`
      *,
      rsvps (
        id,
        status
      )
    `)
    .eq('event_id', eventId)
    .order('created_at', { ascending: true });

  if (error || !data) return [];
  return data.map(mapRowToGuest);
}

export async function getGuestCount(eventId: string): Promise<number> {
  const supabase = await createServerClient();
  const { count } = await supabase
    .from('guests')
    .select('id', { count: 'exact', head: true })
    .eq('event_id', eventId);
  return count ?? 0;
}

// ── Write ─────────────────────────────────────────────────────────────

export async function addGuest(eventId: string, guest: GuestImportRow): Promise<Guest | null> {
  const supabase = await createServerClient();

  const { data, error } = await supabase
    .from('guests')
    .insert({
      event_id: eventId,
      name: guest.name,
      email: guest.email || null,
      phone: guest.phone || null,
      group_name: guest.group || null,
      plus_ones: guest.plusOnes ?? 0,
      notes: guest.notes || null,
    })
    .select('*')
    .single();

  if (error || !data) return null;
  return mapRowToGuest(data);
}

export async function bulkAddGuests(
  eventId: string,
  guests: GuestImportRow[]
): Promise<{ added: number; errors: number }> {
  const supabase = await createServerClient();

  const rows = guests.map(g => ({
    event_id: eventId,
    name: g.name,
    email: g.email || null,
    phone: g.phone || null,
    group_name: g.group || null,
    plus_ones: g.plusOnes ?? 0,
    notes: g.notes || null,
  }));

  const { data, error } = await supabase
    .from('guests')
    .insert(rows)
    .select('id');

  if (error) {
    console.error('[DB] bulkAddGuests error:', error);
    return { added: 0, errors: guests.length };
  }

  return { added: data?.length ?? 0, errors: 0 };
}

export async function deleteGuest(guestId: string): Promise<boolean> {
  const supabase = await createServerClient();
  const { error } = await supabase.from('guests').delete().eq('id', guestId);
  return !error;
}

export async function deleteAllGuests(eventId: string): Promise<boolean> {
  const supabase = await createServerClient();
  const { error } = await supabase.from('guests').delete().eq('event_id', eventId);
  return !error;
}

// ── CSV Export ────────────────────────────────────────────────────────

export function guestsToCSV(guests: Guest[]): string {
  const header = ['Name', 'Email', 'Phone', 'Group', 'Plus Ones', 'RSVP Status', 'Notes'];
  const rows = guests.map(g => [
    csvCell(g.name),
    csvCell(g.email ?? ''),
    csvCell(g.phone ?? ''),
    csvCell(g.group ?? ''),
    String(g.plusOnes),
    csvCell(g.rsvpStatus ?? 'pending'),
    csvCell(g.notes ?? ''),
  ]);
  return [header, ...rows].map(r => r.join(',')).join('\n');
}

/** Merged RSVP + guest list export (all RSVPs even if not pre-invited) */
export async function getFullGuestExport(eventId: string): Promise<string> {
  const supabase = await createServerClient();

  // Get pre-invited guests with their RSVP status joined
  const guestsPromise = supabase
    .from('guests')
    .select('*, rsvps(id, status, guest_count, dietary_preference, message, created_at)')
    .eq('event_id', eventId);

  // Get RSVPs from people who weren't pre-invited
  const rsvpsPromise = supabase
    .from('rsvps')
    .select('*')
    .eq('event_id', eventId);

  const [{ data: guestData }, { data: rsvpData }] = await Promise.all([guestsPromise, rsvpsPromise]);

  const preInvitedGuestIds = new Set(
    (guestData ?? []).flatMap(g => g.rsvps?.map((r: { id: string }) => r.id) ?? [])
  );

  const header = [
    'Name', 'Email', 'Phone', 'Group', 'Plus Ones Allowed',
    'RSVP Status', 'Attending Count', 'Dietary Preference', 'Message',
    'RSVP Date', 'Source', 'Notes'
  ];

  // Pre-invited guests
  const invitedRows = (guestData ?? []).map(g => {
    const rsvp = g.rsvps?.[0];
    return [
      csvCell(g.name),
      csvCell(g.email ?? ''),
      csvCell(g.phone ?? ''),
      csvCell(g.group_name ?? ''),
      String(g.plus_ones ?? 0),
      csvCell(rsvp?.status ?? 'pending'),
      String(rsvp?.guest_count ?? ''),
      csvCell(rsvp?.dietary_preference ?? ''),
      csvCell(rsvp?.message ?? ''),
      rsvp?.created_at ? new Date(rsvp.created_at).toLocaleDateString() : '',
      'Invited',
      csvCell(g.notes ?? ''),
    ].join(',');
  });

  // Walk-in RSVPs (not pre-invited)
  const walkInRows = (rsvpData ?? [])
    .filter(r => !preInvitedGuestIds.has(r.id))
    .map(r => [
      csvCell(r.guest_name ?? ''),
      csvCell(r.email ?? ''),
      csvCell(r.phone ?? ''),
      '',
      '',
      csvCell(r.status ?? 'pending'),
      String(r.guest_count ?? 1),
      csvCell(r.dietary_preference ?? ''),
      csvCell(r.message ?? ''),
      r.created_at ? new Date(r.created_at).toLocaleDateString() : '',
      'Self-RSVP',
      '',
    ].join(','));

  return [header.join(','), ...invitedRows, ...walkInRows].join('\n');
}

// ── CSV Parser ────────────────────────────────────────────────────────

/**
 * Parse a CSV string into GuestImportRow[].
 * Supports headers: name, email, phone, group, plus_ones, notes (case-insensitive).
 */
export function parseGuestCSV(csvText: string): { rows: GuestImportRow[]; errors: string[] } {
  const lines = csvText.trim().split(/\r?\n/);
  if (lines.length < 2) return { rows: [], errors: ['CSV must have a header row and at least one data row.'] };

  const headers = lines[0].split(',').map(h => h.trim().toLowerCase().replace(/\s+/g, '_'));
  const nameIdx = headers.indexOf('name');
  if (nameIdx === -1) return { rows: [], errors: ['CSV must have a "name" column.'] };

  const emailIdx = headers.indexOf('email');
  const phoneIdx = headers.indexOf('phone');
  const groupIdx = headers.findIndex(h => h === 'group' || h === 'group_name');
  const plusOnesIdx = headers.findIndex(h => h === 'plus_ones' || h === 'plus ones' || h === 'plusones');
  const notesIdx = headers.indexOf('notes');

  const rows: GuestImportRow[] = [];
  const errors: string[] = [];

  for (let i = 1; i < lines.length; i++) {
    const cols = parseCSVLine(lines[i]);
    const name = cols[nameIdx]?.trim();
    if (!name) {
      errors.push(`Row ${i + 1}: missing name, skipped.`);
      continue;
    }
    rows.push({
      name,
      email: emailIdx >= 0 ? cols[emailIdx]?.trim() || undefined : undefined,
      phone: phoneIdx >= 0 ? cols[phoneIdx]?.trim() || undefined : undefined,
      group: groupIdx >= 0 ? cols[groupIdx]?.trim() || undefined : undefined,
      plusOnes: plusOnesIdx >= 0 ? parseInt(cols[plusOnesIdx] ?? '0', 10) || 0 : 0,
      notes: notesIdx >= 0 ? cols[notesIdx]?.trim() || undefined : undefined,
    });
  }

  return { rows, errors };
}

// ── Helpers ───────────────────────────────────────────────────────────

function csvCell(value: string): string {
  if (value.includes(',') || value.includes('"') || value.includes('\n')) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') { current += '"'; i++; }
      else inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current);
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current);
  return result;
}

function mapRowToGuest(row: Record<string, unknown>): Guest {
  // Handle joined rsvps array
  const rsvpRows = Array.isArray(row.rsvps) ? row.rsvps : [];
  const rsvp = rsvpRows[0] as { id?: string; status?: string } | undefined;

  return {
    id: row.id as string,
    eventId: row.event_id as string,
    name: row.name as string,
    email: (row.email as string) ?? undefined,
    phone: (row.phone as string) ?? undefined,
    group: (row.group_name as string) ?? undefined,
    plusOnes: (row.plus_ones as number) ?? 0,
    notes: (row.notes as string) ?? undefined,
    rsvpStatus: (rsvp?.status as Guest['rsvpStatus']) ?? 'pending',
    rsvpId: rsvp?.id ?? undefined,
    createdAt: row.created_at as string,
  };
}
