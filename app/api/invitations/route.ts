import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import crypto from 'crypto';
import { supabase } from '@/lib/supabase/client';
import { generateUniqueSlug } from '@/lib/db/invitations';

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

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { templateId, data } = body;

    if (!templateId || !data || !data.brideName || !data.groomName) {
      return NextResponse.json(
        { error: 'Missing required fields (templateId, brideName, groomName)' },
        { status: 400 }
      );
    }

    // Get the authenticated user's email
    const userEmail = await getAuthEmail();

    // Generate a unique slug based on their names
    const slug = await generateUniqueSlug(data.brideName, data.groomName);

    // Insert into Supabase
    const { error } = await supabase
      .from('invitations')
      .insert({
        slug,
        templateId,
        userEmail: userEmail || null,
        brideName: data.brideName,
        groomName: data.groomName,
        weddingDate: data.weddingDate,
        weddingTime: data.weddingTime,
        venueName: data.venueName,
        venueAddress: data.venueAddress,
        contactNumber: data.contactNumber,
        additionalMessage: data.additionalMessage,
        couplePhotoUrl: data.couplePhotoUrl,
        familyDetails: data.familyDetails,
        rsvpDetails: data.rsvpDetails,
        isPremium: false,
      });

    if (error) {
      console.error('Supabase Insert Error:', error);
      return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }

    return NextResponse.json({ success: true, slug });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
