import type { Metadata } from 'next';
import { AboutPageClient } from './AboutPageClient';

export const metadata: Metadata = {
  title: "About Us | InviteHub.in — India's Digital Invitation Maker",
  description:
    "Discover the story behind InviteHub.in. We are on a mission to redefine how India celebrates by making beautiful, premium digital invitations accessible to everyone.",
  alternates: { canonical: '/about' },
  keywords: [
    'about InviteHub',
    'digital invitation maker India',
    'online wedding invitation platform',
    'invitation card maker story',
  ],
  openGraph: {
    title: "About Us | InviteHub.in — India's Digital Invitation Maker",
    description:
      "Discover the story behind InviteHub.in. We are on a mission to redefine how India celebrates by making beautiful, premium digital invitations accessible to everyone.",
    url: '/about',
    type: 'website',
  },
};

export default function AboutPage() {
  return <AboutPageClient />;
}
