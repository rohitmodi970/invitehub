# InviteHub.in Phase 1 Launch Plan

## Goal

Ship the marketing landing page first, with SEO as the top priority, then layer in the build-out for template browsing and payments.

## Phase 1 Scope

### 1. SEO-first landing page

- Publish a fast, indexable homepage.
- Use one clear H1 and a tight heading hierarchy.
- Add metadata, Open Graph, Twitter cards, canonical URL, and robots settings.
- Include structured data for the website and FAQ sections.
- Keep all content server-rendered and avoid placeholder live data.
- Optimize for Core Web Vitals with light assets and minimal client-side code.

### 2. Visual system

- Use Framer Motion for subtle entrance and scroll animations.
- Use Lucide React for icons across hero, feature, pricing, and FAQ sections.
- Keep the design premium, warm, and wedding-focused.

### 3. Landing page content

- Hero with the main CTA: Create Your Invitation Card.
- Featured templates section.
- How it works section.
- Trust and testimonial section.
- Pricing preview section.
- FAQ section.
- Final CTA footer.

### 4. Razorpay payment foundation

- Add a server-side Razorpay order creation endpoint.
- Keep checkout UI for a later phase, but wire the backend contract now.
- Use environment variables for the Razorpay key pair.
- Support future premium plans: INR 49 and INR 99.

## Implementation Order

1. Finish the landing page and SEO metadata.
2. Add motion and icon polish.
3. Keep the Razorpay order API ready for the checkout flow.
4. Publish the homepage and submit it for indexing.

## Launch Checklist

- Homepage loads fast on mobile and desktop.
- Title and description are unique and keyword-focused.
- FAQ schema is present.
- Canonical URL is set.
- Internal links point to future invitation-builder routes.
- Razorpay secrets are documented for later checkout activation.
