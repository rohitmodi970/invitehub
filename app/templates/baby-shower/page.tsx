import type { Metadata } from 'next';
import { CategoryPageClient } from '../CategoryPageClient';

export const metadata: Metadata = {
  title: 'Baby Shower Invitation Maker | InviteHub.in',
  description: 'Design beautiful baby shower invitations online. Customize premium templates with your details and share easily with friends and family via WhatsApp.',
  alternates: { canonical: '/templates/baby-shower' },
  keywords: ['baby shower invitation card', 'online baby shower invitation', 'digital baby shower card maker'],
  openGraph: {
    title: 'Baby Shower Invitation Maker | InviteHub.in',
    description: 'Design beautiful baby shower invitations online. Customize premium templates with your details and share easily with friends and family via WhatsApp.',
    url: '/templates/baby-shower',
  },
};

export default function BabyShowerTemplatesPage() {
  return (
    <>
      <div className="sr-only">
        <h1>Baby Shower Invitation Templates</h1>
        <p>Browse our lovely collection of baby shower invitation cards.</p>
      </div>
      <CategoryPageClient eventType="baby-shower" />
    </>
  );
}
