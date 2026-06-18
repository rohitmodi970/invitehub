import type { Metadata } from 'next';
import { CategoryPageClient } from '../CategoryPageClient';

export const metadata: Metadata = {
  title: 'Housewarming Invitation Card Maker | InviteHub.in',
  description: 'Create traditional and modern housewarming (Griha Pravesh) invitations. Customize with your new home details and share easily on WhatsApp.',
  alternates: { canonical: '/templates/housewarming' },
  keywords: ['housewarming invitation card', 'griha pravesh invitation maker', 'digital housewarming invitation'],
  openGraph: {
    title: 'Housewarming Invitation Card Maker | InviteHub.in',
    description: 'Create traditional and modern housewarming (Griha Pravesh) invitations. Customize with your new home details and share easily on WhatsApp.',
    url: '/templates/housewarming',
  },
};

export default function HousewarmingTemplatesPage() {
  return (
    <>
      <div className="sr-only">
        <h1>Housewarming Invitation Templates</h1>
        <p>Browse our beautiful collection of housewarming and Griha Pravesh invitation cards.</p>
      </div>
      <CategoryPageClient eventType="housewarming" />
    </>
  );
}
