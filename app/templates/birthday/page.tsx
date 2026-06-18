import type { Metadata } from 'next';
import { CategoryPageClient } from '../CategoryPageClient';

export const metadata: Metadata = {
  title: 'Birthday Invitation Card Maker | InviteHub.in',
  description: 'Create custom birthday invitation cards online. Choose from premium birthday templates, customize with your details, and share instantly via WhatsApp.',
  alternates: { canonical: '/templates/birthday' },
  keywords: ['birthday invitation card maker', 'online birthday invitation', 'digital birthday card maker'],
  openGraph: {
    title: 'Birthday Invitation Card Maker | InviteHub.in',
    description: 'Create custom birthday invitation cards online. Choose from premium birthday templates, customize with your details, and share instantly via WhatsApp.',
    url: '/templates/birthday',
  },
};

export default function BirthdayTemplatesPage() {
  return (
    <>
      <div className="sr-only">
        <h1>Birthday Invitation Templates</h1>
        <p>Browse our beautiful collection of birthday invitation cards.</p>
      </div>
      <CategoryPageClient eventType="birthday" />
    </>
  );
}
