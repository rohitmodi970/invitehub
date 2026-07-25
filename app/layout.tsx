import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Footer } from "@/app/components/Footer";
import { Analytics } from "@vercel/analytics/react";
import { OG_IMAGE, SITE_LOGO, TWITTER_IMAGE } from "@/lib/images/paths";
import { PostHogProvider, PostHogPageView } from '@/app/providers';
import { Suspense } from 'react';
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.invitehub.in"),
  title: {
    default: "Invitation Card Maker — Corporate, Birthday, Wedding & More | InviteHub.in",
    template: "%s | InviteHub.in",
  },
  description:
    "Create beautiful digital invitations for corporate events, birthdays, weddings, baby showers, anniversaries & more. Live preview, WhatsApp sharing, and premium downloads.",
  applicationName: "InviteHub.in",
  authors: [{ name: "InviteHub.in", url: "https://invitehub.in" }],
  creator: "InviteHub.in",
  publisher: "InviteHub.in",
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://www.invitehub.in",
    siteName: "InviteHub.in",
    title: "Invitation Card Maker — Corporate, Birthday, Wedding & More | InviteHub.in",
    description:
      "Create beautiful digital invitations for corporate events, birthdays, weddings, baby showers, anniversaries & more. Live preview, WhatsApp sharing, premium downloads.",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "InviteHub.in - Digital Invitation Card Maker for Every Occasion",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Invitation Card Maker — Corporate, Birthday, Wedding & More | InviteHub.in",
    description:
      "Create beautiful digital invitations for corporate events, birthdays, weddings, baby showers & more. Live preview, WhatsApp sharing, premium downloads.",
    creator: "@invitehubin",
    images: [TWITTER_IMAGE],
  },
  icons: {
    icon: SITE_LOGO,
    apple: SITE_LOGO,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[var(--background)] text-[var(--foreground)]">
        <PostHogProvider>
          <Suspense fallback={null}>
            <PostHogPageView />
          </Suspense>
          {children}
          <Analytics />
          <Footer />
        </PostHogProvider>
      </body>
    </html>
  );
}
