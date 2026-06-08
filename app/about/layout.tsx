import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about InviteHub. We are redefining how you celebrate with premium digital invitations for weddings, birthdays, and corporate events.',
  alternates: {
    canonical: '/about',
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
