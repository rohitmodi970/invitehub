import type { Metadata } from 'next';
import { AboutPageClient } from './AboutPageClient';

export const metadata: Metadata = {
  title: 'About InviteHub — Digital Invitation Card Maker for India',
  description:
    'Learn about InviteHub.in — India\'s fast-growing digital invitation card maker. Create wedding, birthday, baby shower, and corporate invitations with live preview and WhatsApp sharing.',
  alternates: { canonical: '/about' },
  keywords: [
    'about InviteHub',
    'digital invitation maker India',
    'online wedding invitation platform',
    'invitation card maker story',
  ],
  openGraph: {
    title: 'About InviteHub — Digital Invitation Card Maker for India',
    description:
      'Learn how InviteHub.in is redefining digital invitations in India — beautiful templates, live preview, and instant WhatsApp sharing.',
    url: '/about',
    type: 'website',
  },
};

export default function AboutPage() {
  return <AboutPageClient />;
}
