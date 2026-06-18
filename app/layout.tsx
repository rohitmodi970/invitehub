import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Footer } from "@/app/components/Footer";
import { Analytics } from "@vercel/analytics/next"
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
  metadataBase: new URL("https://invitehub.in"),
  title: {
    default: "Invitation Card Maker — Wedding, Birthday, Corporate & More | InviteHub.in",
    template: "%s | InviteHub.in",
  },
  description:
    "Create beautiful digital invitations for weddings, birthdays, corporate events, baby showers, anniversaries, engagements & more. Live preview, WhatsApp sharing, and premium downloads — InviteHub.in.",
  applicationName: "InviteHub.in",
  authors: [{ name: "InviteHub.in", url: "https://invitehub.in" }],
  creator: "InviteHub.in",
  publisher: "InviteHub.in",
  verification: {
    // TODO: Replace with your real GSC token from:
    // https://search.google.com/search-console → Add property → HTML tag
    google: "REPLACE_WITH_REAL_GSC_TOKEN",
  },
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
    url: "https://invitehub.in",
    siteName: "InviteHub.in",
    title: "Invitation Card Maker — Wedding, Birthday, Corporate & More | InviteHub.in",
    description:
      "Create beautiful digital invitations for weddings, birthdays, corporate events, baby showers, anniversaries & more. Live preview, WhatsApp sharing, premium downloads.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "InviteHub.in - Digital Invitation Card Maker for Every Occasion",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Invitation Card Maker — Wedding, Birthday, Corporate & More | InviteHub.in",
    description:
      "Create beautiful digital invitations for weddings, birthdays, corporate events, baby showers & more. Live preview, WhatsApp sharing, premium downloads.",
    creator: "@invitehubin",
    images: ["/twitter-image.png"],
  },
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
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
        {children}
        <Analytics />
        <Footer />
      </body>
    </html>
  );
}
