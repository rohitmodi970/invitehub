import type { Metadata } from 'next';
import { CategoryPageClient } from '../CategoryPageClient';

export const metadata: Metadata = {
  title: 'Corporate Event Invitation Maker | InviteHub.in',
  description: 'Create professional corporate event invitations, business party invites, and conference invitations with customizable templates and instant sharing.',
  alternates: { canonical: '/templates/corporate' },
  keywords: ['corporate event invitation', 'business event invitation card', 'corporate party invitation maker'],
  openGraph: {
    title: 'Corporate Event Invitation Maker | InviteHub.in',
    description: 'Create professional corporate event invitations, business party invites, and conference invitations with customizable templates and instant sharing.',
    url: '/templates/corporate',
  },
};

export default function CorporateTemplatesPage() {
  return (
    <>
      <div className="sr-only">
        <h1>Corporate Event Invitation Templates</h1>
        <p>Browse our professional collection of corporate event invitation cards.</p>
      </div>
      <CategoryPageClient eventType="corporate" />
    </>
  );
}
