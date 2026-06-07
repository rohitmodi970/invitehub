# InviteHub.in - Implementation Roadmap

## Overview
This document outlines the phased implementation strategy for InviteHub.in, prioritizing a fast landing page launch with strong SEO, followed by core product features.

---

## Phase 1: Landing Page & SEO Foundation ⭐ (Priority 1)

**Timeline:** 1-2 weeks  
**Goal:** Publish a polished, SEO-optimized landing page to establish market presence and start attracting organic traffic.

### Deliverables:
- ✅ Modern, responsive landing page
- ✅ SEO-optimized metadata (title, meta description, OG tags)
- ✅ Structured data (Schema.org: Organization, WebSite, FAQ, LocalBusiness)
- ✅ Framer Motion animations for engagement
- ✅ Lucide React icons throughout
- ✅ Hero section with clear CTA
- ✅ 3-6 featured template previews
- ✅ How it works section
- ✅ Testimonials/social proof
- ✅ Pricing teaser
- ✅ FAQ section with schema
- ✅ Fast load times (optimized images, minimal JS)
- ✅ Mobile-first responsive design
- ✅ Canonical URLs and robots.txt
- ✅ Sitemap generation

### Tech Stack:
- Next.js 16 with App Router
- Tailwind CSS for styling
- Framer Motion for animations
- Lucide React for icons
- next-seo compatible structured data

### Post-Launch:
- Submit sitemap to Google Search Console
- Request indexation
- Monitor Core Web Vitals
- Track organic traffic

---

## Phase 2: Template Gallery & Browsing

**Timeline:** 2-3 weeks  
**Goal:** Let users browse and select from wedding invitation templates.

### Deliverables:
- Template categories (Wedding, Royal, Floral, Traditional Indian, Modern)
- Template preview cards
- Search and filter functionality
- "Use Template" action
- Template detail view

### Dependencies:
- Completed Phase 1 (users have a landing page to return to)

---

## Phase 3: Invitation Editor & Live Preview

**Timeline:** 3-4 weeks  
**Goal:** Build the core creation flow where users fill in event details and see real-time updates.

### Deliverables:
- Event detail form (bride/groom names, date, time, venue, contact, etc.)
- Live preview (mobile & desktop views)
- Photo upload for couple and family
- Form validation
- Session persistence (localStorage or cookies)

### Dependencies:
- Phase 2 (user selects template first)

---

## Phase 4: Public Invitation Pages & Sharing

**Timeline:** 2-3 weeks  
**Goal:** Generate unique shareable invitation URLs with full details, maps, countdown, and RSVP.

### Deliverables:
- Unique URL generation (`/i/name-combo`)
- Public invitation page template
- Google Maps integration for venue
- Countdown timer (Framer Motion animated)
- RSVP button (collects guest responses)
- WhatsApp share link generation
- Basic analytics (view count)

### Dependencies:
- Phase 3 (invitations must exist before sharing)
- Database setup (invitations table)

---

## Phase 5: Downloads, Watermarks & Monetization ⚠️ (Add Razorpay Here)

**Timeline:** 3-4 weeks  
**Goal:** Enable users to download cards and introduce premium monetization.

### Deliverables:
- PNG/JPG/PDF export functionality
- Client-side watermark rendering for free users
- Razorpay payment integration
  - Free tier: watermarked downloads + shareable link
  - Premium (₹49): HD PNG, no watermark
  - Premium Plus (₹99): HD PNG, PDF, envelope design, no watermark
- Subscription/one-time payment handling
- Payment status tracking
- Download history in user dashboard

### Tech Stack for Payments:
- **Frontend:** Razorpay Checkout embedded or redirect
- **Backend:** API route to create Razorpay orders
- **Database:** Orders table, user subscriptions table
- **Webhooks:** Razorpay webhook listener for payment verification

### Razorpay Configuration:
- Key ID and Secret from dashboard
- Environment variables: `NEXT_PUBLIC_RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`
- API endpoint: `/api/payments/create-order` (POST)
- Webhook endpoint: `/api/webhooks/razorpay` (POST)

### Dependencies:
- Phase 4 (users must have invitations to download)
- User authentication system
- Database schema for payments

---

## Phase 6: Envelope Design & Premium Assets

**Timeline:** 1-2 weeks  
**Goal:** Generate matching envelope designs and expand premium features.

### Deliverables:
- Template-matched envelope designs
- Envelope download and print options
- Premium-exclusive design variations
- Theme customization options

### Dependencies:
- Phase 5 (envelope features are premium-only)

---

## Phase 7: User Dashboard & Account Management

**Timeline:** 2-3 weeks  
**Goal:** Allow users to view, edit, and manage their invitations and purchases.

### Deliverables:
- Authentication system (email/Google OAuth)
- User dashboard with invitation list
- Edit existing invitations
- Download history
- Payment history and plan upgrade options
- Account settings
- Profile management

### Dependencies:
- Phase 3 (invitations exist)
- Phase 5 (payment history exists)

---

## Phase 8: SEO Landing Pages & Content

**Timeline:** 2-3 weeks  
**Goal:** Create dedicated SEO-targeted pages for organic search traffic.

### Pages to Create:
- `/wedding-invitation-card-maker`
- `/marriage-invitation-card`
- `/digital-wedding-card`
- `/online-wedding-invitation`
- `/wedding-card-maker`

### Each Page Should Include:
- Unique, keyword-optimized content
- FAQ schema with local relevance
- Structured data (BreadcrumbList, FAQPage)
- Strong internal linking to landing page and templates
- CTA buttons linking to Phase 2 (template gallery)
- Blog-style content on invitation trends and tips

### Tech:
- Next.js dynamic routes with metadata
- SEO-optimized copy
- Schema generation utility

### Dependencies:
- Phase 7 (full product should be live before scaling SEO)

---

## Future Phases (Post-MVP)

### Phase 9: Additional Event Types ✅
- Birthday invitation cards
- Engagement invitations
- Baby shower invitations
- Housewarming invitations
- Anniversary invitations
- Corporate event invitations

### Phase 10: Advanced Features
- AI-generated invitation text
- Multi-language support (English, Hindi, Bengali, Marathi, Gujarati)
- RSVP guest tracking and attendance management
- Wedding website themes
- QR code invitations
- Email invite sending
- Mobile app

### Phase 11: Analytics & Admin Dashboard
- User analytics
- Invitation creation trends
- Payment analytics
- Admin template management
- Admin user management
- Fraud detection

---

## Success Metrics (Phase 1)

| Metric | Target |
|--------|--------|
| Page Load Time (LCP) | < 2.5s |
| Cumulative Layout Shift (CLS) | < 0.1 |
| First Input Delay (FID) | < 100ms |
| Lighthouse SEO Score | ≥ 95 |
| Mobile Usability | No errors |
| Indexed Pages (Google) | ≥ 1 |
| Organic Impressions (after 2 weeks) | > 100 |

---

## Post-MVP Business Goals

1. Reach 1,000 invitation downloads in the first month
2. Achieve 10% premium conversion rate
3. Build organic SEO traffic to 500+ monthly visitors
4. Implement viral loop through shared invitation links (InviteHub branding)
5. Expand to additional event types based on user demand

---

## Notes

- **No hardcoded fallback data:** Dashboard and preview sections use null-first approach with skeleton loaders until real data is available
- **Payment deferral:** Razorpay is implemented in Phase 5, not Phase 1
- **Mobile-first:** All phases prioritize mobile responsiveness
- **Analytics:** Set up tracking early (Google Analytics, Vercel Analytics) for Phase 1 launch
