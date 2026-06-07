import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/client';
import { generateUniqueSlug } from '@/lib/db/invitations';

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

    // Generate a unique slug based on their names
    const slug = await generateUniqueSlug(data.brideName, data.groomName);

    // Insert into Supabase
    const { error } = await supabase
      .from('invitations')
      .insert({
        slug,
        templateId,
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
        isPremium: false, // Default for new creations until they pay
      });

    if (error) {
      console.error('Supabase Insert Error:', error);
      return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }

    // Return the generated slug so the client can redirect
    return NextResponse.json({ success: true, slug });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
