import type { Metadata } from "next";

import { LandingPage } from "./components/landing-page";

const title = "Wedding Invitation Card Maker | InviteHub.in";
const description =
  "Create elegant wedding invitation cards with live preview, SEO-friendly invitation pages, and premium downloads.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/",
  },
  keywords: [
    "wedding invitation card maker",
    "digital wedding invitation",
    "online wedding invitation",
    "InviteHub",
    "wedding card maker",
  ],
  openGraph: {
    title,
    description,
    url: "/",
    siteName: "InviteHub.in",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "InviteHub.in",
  url: "https://invitehub.in",
  description,
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Can I create a wedding invitation online?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. InviteHub.in is being built as a wedding invitation card maker with live preview and shareable invitation pages.",
      },
    },
    {
      "@type": "Question",
      name: "Will the free plan include a watermark?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Free downloads will keep subtle InviteHub branding until the user upgrades.",
      },
    },
  ],
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "InviteHub.in",
  url: "https://invitehub.in",
  description,
  logo: "https://invitehub.in/logo.png",
  sameAs: [
    "https://twitter.com/invitehubin",
    "https://instagram.com/invitehubin",
    "https://facebook.com/invitehubin",
  ],
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "InviteHub.in",
  image: "https://invitehub.in/logo.png",
  description,
  url: "https://invitehub.in",
  telephone: "+91-XXXXXXXXXX",
  address: {
    "@type": "PostalAddress",
    streetAddress: "India",
    addressLocality: "India",
    postalCode: "",
    addressCountry: "IN",
  },
  areaServed: "IN",
  priceRange: "₹0-₹99",
};

const faqSchema_extended = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Can I create a wedding invitation online?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. InviteHub.in is a digital wedding invitation card maker where you can create beautiful invitations with live preview, personalized details, couple photos, and shareable invitation pages in minutes.",
      },
    },
    {
      "@type": "Question",
      name: "What templates do you offer?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "InviteHub.in currently focuses on wedding invitations with five main styles: wedding, royal wedding, floral wedding, traditional Indian wedding, and modern wedding templates.",
      },
    },
    {
      "@type": "Question",
      name: "How much does it cost?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "InviteHub.in is free to use with a subtle watermark. Premium plans start at ₹49 for HD PNG downloads without watermark, and ₹99 for HD PNG, PDF, and envelope design.",
      },
    },
    {
      "@type": "Question",
      name: "Will the free plan include a watermark?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Free downloads will keep subtle 'Created with InviteHub.in' branding until the user upgrades to a premium plan.",
      },
    },
    {
      "@type": "Question",
      name: "Can I share my invitation?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. After creating your invitation, you get a unique shareable link (invitehub.in/i/names) and a WhatsApp share option to send invitations instantly to your guests.",
      },
    },
  ],
};

export default function Home() {
  return (
    <>
      <LandingPage />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema_extended) }}
      />
    </>
  );
}
