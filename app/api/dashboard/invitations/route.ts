import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import crypto from 'crypto';
import { supabase } from '@/lib/supabase/client';

async function getAuthEmail(): Promise<string | null> {
  try {
    const OTP_SECRET = process.env.OTP_SECRET || 'invitehub-secret-key-123';
    const cookieStore = await cookies();
    const authToken = cookieStore.get('invitehub_auth')?.value;
    if (!authToken) return null;
    const [email, signature] = authToken.split('.');
    if (!email || !signature) return null;
    const expectedSig = crypto.createHmac('sha256', OTP_SECRET).update(email).digest('hex');
    return expectedSig === signature ? email : null;
  } catch {
    return null;
  }
}

export async function GET() {
  try {
    const userEmail = await getAuthEmail();
    if (!userEmail) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data, error } = await supabase
      .from('invitations')
      .select('id, slug, templateId, brideName, groomName, weddingDate, venueName, isPremium, created_at, viewCount')
      .eq('userEmail', userEmail)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Dashboard invitations error:', error);
      return NextResponse.json({ error: 'Failed to fetch invitations' }, { status: 500 });
    }

    return NextResponse.json({ invitations: data ?? [] });
  } catch (error) {
    console.error('Dashboard invitations error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
