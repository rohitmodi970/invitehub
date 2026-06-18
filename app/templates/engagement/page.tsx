import type { Metadata } from 'next';
import { CategoryPageClient } from '../CategoryPageClient';

export const metadata: Metadata = {
  title: 'Engagement Invitation Card Maker | InviteHub.in',
  description: 'Create elegant engagement and ring ceremony invitations online. Customize your favorite template, add couple photos, and share instantly.',
  alternates: { canonical: '/templates/engagement' },
  keywords: ['engagement invitation card maker', 'ring ceremony invitation card', 'digital engagement invitation'],
  openGraph: {
    title: 'Engagement Invitation Card Maker | InviteHub.in',
    description: 'Create elegant engagement and ring ceremony invitations online. Customize your favorite template, add couple photos, and share instantly.',
    url: '/templates/engagement',
  },
};

export default function EngagementTemplatesPage() {
  return (
    <>
      <div className="sr-only">
        <h1>Engagement Invitation Templates</h1>
        <p>Browse our beautiful collection of engagement and ring ceremony invitation cards.</p>
      </div>
      <CategoryPageClient eventType="engagement" />
    </>
  );
}
