import type { Metadata } from "next";

import { LandingPage } from "./components/landing-page";

const title = "Invitation Card Maker — Wedding, Birthday, Corporate & More | InviteHub.in";
const description =
  "Create stunning digital invitations for any occasion — weddings, birthdays, corporate events, baby showers, anniversaries, engagements & more. Live preview, WhatsApp sharing, and premium HD downloads.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/",
  },
  keywords: [
    // Primary — broad invitation maker
    "invitation card maker",
    "digital invitation maker India",
    "online invitation card maker",
    "free invitation maker",
    // Birthday
    "birthday invitation card maker",
    "online birthday invitation",
    "digital birthday card maker",
    // Corporate
    "corporate event invitation",
    "business event invitation card",
    "corporate party invitation maker",
    // Wedding
    "wedding invitation card maker",
    "digital wedding invitation India",
    "online wedding card maker",
    // Other events
    "baby shower invitation card",
    "engagement invitation card maker",
    "anniversary invitation card",
    "housewarming invitation card",
    // Brand
    "InviteHub",
    "InviteHub.in",
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
  potentialAction: {
    "@type": "SearchAction",
    target: "https://invitehub.in/templates?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "InviteHub.in",
  applicationCategory: "DesignApplication",
  operatingSystem: "Web",
  url: "https://invitehub.in",
  description,
  offers: [
    {
      "@type": "Offer",
      price: "0",
      priceCurrency: "INR",
      description: "Free plan with watermark",
    },
    {
      "@type": "Offer",
      price: "49",
      priceCurrency: "INR",
      description: "Premium — HD PNG, no watermark",
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
  // TODO: Replace with real phone number before enabling
  // telephone: "+91-XXXXXXXXXX",
  address: {
    "@type": "PostalAddress",
    addressLocality: "India",
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
      name: "What types of invitations can I create on InviteHub.in?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "InviteHub.in supports invitations for all occasions — weddings, birthdays, corporate events, baby showers, engagements, anniversaries, housewarmings, and more. Browse 40+ premium templates across all categories.",
      },
    },
    {
      "@type": "Question",
      name: "Can I create a birthday invitation card online for free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. InviteHub.in offers free birthday invitation card templates with live preview and WhatsApp sharing. Free downloads include a subtle watermark; upgrade to \u20b949 for HD downloads without watermark.",
      },
    },
    {
      "@type": "Question",
      name: "Can I create a corporate event or office party invitation?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. InviteHub.in has professional corporate invitation templates for conferences, product launches, team parties, and business events. Fully customizable with your company details and branding.",
      },
    },
    {
      "@type": "Question",
      name: "How much does it cost?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "InviteHub.in is free to use with a subtle watermark. Premium plans start at \u20b949 for HD PNG downloads without watermark, and \u20b999 for HD PNG, PDF, and envelope design.",
      },
    },
    {
      "@type": "Question",
      name: "Can I share my invitation on WhatsApp?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. After creating your invitation, you get a unique shareable link (invitehub.in/i/yourname) and a one-tap WhatsApp share button to instantly send invitations to all your guests.",
      },
    },
    {
      "@type": "Question",
      name: "Can I create a wedding invitation online?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. InviteHub.in offers beautiful wedding invitation templates including Traditional Indian, Elegant Gold, Royal Purple, Romantic Vintage, and more — with live preview, couple photo upload, and shareable pages.",
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
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
