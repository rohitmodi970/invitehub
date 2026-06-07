import { cookies } from 'next/headers';
import crypto from 'crypto';
import { redirect } from 'next/navigation';
import type { Metadata } from 'next';
import DashboardClient from './components/DashboardClient';

export const metadata: Metadata = {
  title: 'My Dashboard | InviteHub.in',
  description: 'Manage your wedding invitations, view download history, and track payment status.',
};

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

export default async function DashboardPage() {
  const userEmail = await getAuthEmail();

  // Double-check server-side even though proxy also guards this
  if (!userEmail) {
    redirect('/?signin=1');
  }

  return <DashboardClient userEmail={userEmail} />;
}
