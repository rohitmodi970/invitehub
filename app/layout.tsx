import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Footer } from "@/app/components/Footer";

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
    default: "Wedding Invitation Card Maker | InviteHub.in",
    template: "%s | InviteHub.in",
  },
  description:
    "Create elegant wedding invitation cards in minutes with live preview, share invitations online, and download premium cards powered by InviteHub.in.",
  applicationName: "InviteHub.in",
  authors: [{ name: "InviteHub.in", url: "https://invitehub.in" }],
  creator: "InviteHub.in",
  publisher: "InviteHub.in",
  verification: {
    google: "google-site-verification-code-here",
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
    title: "Wedding Invitation Card Maker | InviteHub.in",
    description:
      "Create elegant wedding invitation cards in minutes with live preview, share invitations online, and download premium cards powered by InviteHub.in.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "InviteHub.in - Wedding Invitation Card Maker",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Wedding Invitation Card Maker | InviteHub.in",
    description:
      "Create elegant wedding invitation cards in minutes with live preview, share invitations online, and download premium cards powered by InviteHub.in.",
    creator: "@invitehubin",
    images: ["/twitter-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
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
        <Footer />
      </body>
    </html>
  );
}
