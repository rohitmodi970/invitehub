import { createServerClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';
import { deleteGuest } from '@/lib/db/guests';

/**
 * DELETE /api/guests/[guestId] — remove a guest from the list
 */
export async function DELETE(
  _req: NextRequest,
  props: { params: Promise<{ guestId: string }> }
) {
  const { guestId } = await props.params;

  const supabase = await createServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  // Verify ownership via join
  const { data: guest } = await supabase
    .from('guests')
    .select('id, event_id, events(user_id)')
    .eq('id', guestId)
    .single();

  const eventOwner = (guest?.events as { user_id?: string } | null)?.user_id;
  if (!guest || eventOwner !== user.id) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const ok = await deleteGuest(guestId);
  if (!ok) return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });

  return NextResponse.json({ success: true });
}
