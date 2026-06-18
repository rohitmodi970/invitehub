import type { Metadata } from 'next';
import { CategoryPageClient } from '../CategoryPageClient';

export const metadata: Metadata = {
  title: 'Anniversary Invitation Maker | InviteHub.in',
  description: 'Design beautiful wedding anniversary invitations. Choose from classic, elegant, and modern anniversary templates, personalize them, and share online.',
  alternates: { canonical: '/templates/anniversary' },
  keywords: ['anniversary invitation card', 'wedding anniversary invitation maker', 'digital anniversary invitation'],
  openGraph: {
    title: 'Anniversary Invitation Maker | InviteHub.in',
    description: 'Design beautiful wedding anniversary invitations. Choose from classic, elegant, and modern anniversary templates, personalize them, and share online.',
    url: '/templates/anniversary',
  },
};

export default function AnniversaryTemplatesPage() {
  return (
    <>
      <div className="sr-only">
        <h1>Anniversary Invitation Templates</h1>
        <p>Browse our beautiful collection of anniversary invitation cards.</p>
      </div>
      <CategoryPageClient eventType="anniversary" />
    </>
  );
}
