import type { Metadata } from 'next';
import { CategoryPageClient } from '../CategoryPageClient';

export const metadata: Metadata = {
  title: 'Wedding Invitation Card Maker | InviteHub.in',
  description: 'Create elegant wedding invitation cards in minutes with live preview, share invitations online, and download premium cards.',
  alternates: { canonical: '/templates/wedding' },
  keywords: ['wedding invitation card maker', 'digital wedding invitation India', 'online wedding card maker'],
  openGraph: {
    title: 'Wedding Invitation Card Maker | InviteHub.in',
    description: 'Create elegant wedding invitation cards in minutes with live preview, share invitations online, and download premium cards.',
    url: '/templates/wedding',
  },
};

export default function WeddingTemplatesPage() {
  return (
    <>
      <div className="sr-only">
        <h1>Wedding Invitation Templates</h1>
        <p>Browse our beautiful collection of wedding invitation cards.</p>
      </div>
      <CategoryPageClient eventType="wedding" />
    </>
  );
}
