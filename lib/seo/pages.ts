import type { SEOPageContent, SEOPageSlug } from './types';

export const SEO_PAGES: Record<SEOPageSlug, SEOPageContent> = {
  'wedding-invitation-card-maker': {
    slug: 'wedding-invitation-card-maker',
    title: 'Wedding Invitation Card Maker - Create Digital Invitations Online | InviteHub.in',
    description: 'Create beautiful wedding invitation cards online in minutes. Design, customize, and share your digital wedding invitations.',
    keywords: ['wedding invitation card maker', 'online invitation maker', 'digital wedding invitation', 'create wedding invitation'],
    mainKeyword: 'wedding invitation card maker',
    ogTitle: 'Wedding Invitation Card Maker | InviteHub.in',
    ogDescription: 'Create and share beautiful wedding invitation cards in minutes.',
    sections: [
      { id: 'hero', title: 'Create Your Perfect Wedding Invitation Card Online', content: 'InviteHub.in is the fastest way to create beautiful wedding invitation cards. Choose templates, customize, and share in minutes.', cta: { text: 'Browse Templates', href: '/templates' } },
      { id: 'features', title: 'Powerful Features for Your Wedding Invitations', content: 'Live Preview, Multiple Templates, Photo Upload, Instant Sharing, Premium Downloads' },
      { id: 'cta', title: 'Ready to Create Your Wedding Invitation Cards?', content: 'Start creating your beautiful invitation card today.', cta: { text: 'Create Now', href: '/templates' } },
    ],
    faqs: [
      { question: 'Can I create for free?', answer: 'Yes! Create and share free invitations with subtle watermark.' },
      { question: 'Can I download as PDF?', answer: 'PDF downloads available with Premium Plus plan.' },
    ],
  },
  'marriage-invitation-card': {
    slug: 'marriage-invitation-card',
    title: 'Marriage Invitation Card - Design Your Unique Wedding Card | InviteHub.in',
    description: 'Design beautiful marriage invitation cards with elegant templates.',
    keywords: ['marriage invitation card', 'marriage invitation design', 'wedding card design'],
    mainKeyword: 'marriage invitation card',
    ogTitle: 'Marriage Invitation Card Designer | InviteHub.in',
    ogDescription: 'Create beautiful marriage invitation cards online.',
    sections: [
      { id: 'hero', title: 'Design Beautiful Marriage Invitation Cards in Minutes', content: 'Create elegant marriage invitation cards for all types of ceremonies - traditional, modern, royal, and floral.', cta: { text: 'Browse Templates', href: '/templates' } },
      { id: 'templates', title: 'Marriage Card Templates for Every Style', content: 'Traditional Indian, Modern, Royal, Floral, Romantic templates' },
      { id: 'cta', title: 'Create Your Marriage Invitation Card Today', content: 'Start with our marriage card maker now.', cta: { text: 'Design Now', href: '/templates' } },
    ],
    faqs: [
      { question: 'What is a digital marriage card?', answer: 'An electronic version of wedding invitation that can be shared instantly.' },
      { question: 'Can I customize the text?', answer: 'Yes, all templates are fully editable.' },
    ],
  },
  'digital-wedding-card': {
    slug: 'digital-wedding-card',
    title: 'Digital Wedding Card - Create & Share Online | InviteHub.in',
    description: 'Create stunning digital wedding cards and instantly share with guests.',
    keywords: ['digital wedding card', 'online wedding card', 'digital invitation', 'e-invitation'],
    mainKeyword: 'digital wedding card',
    ogTitle: 'Digital Wedding Card Creator | InviteHub.in',
    ogDescription: 'Create beautiful digital wedding cards and share instantly.',
    sections: [
      { id: 'hero', title: 'Create Stunning Digital Wedding Cards', content: 'Digital wedding cards are modern, eco-friendly, and easy to track. Create beautiful, interactive cards that stand out.', cta: { text: 'Create Now', href: '/templates' } },
      { id: 'features', title: 'Interactive Features in Digital Cards', content: 'Countdown Timer, Google Maps Integration, RSVP System, Photo Gallery, Analytics' },
      { id: 'cta', title: 'Transform Your Invitations to Digital', content: 'Make your guests feel special with memorable digital invitations.', cta: { text: 'Start Now', href: '/templates' } },
    ],
    faqs: [
      { question: 'What is a digital wedding card?', answer: 'Online invitation that can be shared via link, WhatsApp, or email with interactive features.' },
      { question: 'Can I still print?', answer: 'Yes, download as PDF and print copies for guests who prefer physical invitations.' },
    ],
  },
  'online-wedding-invitation': {
    slug: 'online-wedding-invitation',
    title: 'Online Wedding Invitation - Send & Share Instantly | InviteHub.in',
    description: 'Create and send online wedding invitations instantly with easy sharing.',
    keywords: ['online wedding invitation', 'wedding invitation online', 'e-invitation wedding', 'send invitation online'],
    mainKeyword: 'online wedding invitation',
    ogTitle: 'Online Wedding Invitation Service | InviteHub.in',
    ogDescription: 'Create and send beautiful online wedding invitations instantly.',
    sections: [
      { id: 'hero', title: 'Send Beautiful Online Wedding Invitations Instantly', content: 'Create and send online invitations to hundreds of guests in seconds.', cta: { text: 'Create Now', href: '/templates' } },
      { id: 'benefits', title: 'Why Send Online Wedding Invitations?', content: 'Instant Delivery, Real-time Responses, Personalized, Eco-conscious, Cost Savings' },
      { id: 'cta', title: 'Ready to Send Your Online Invitations?', content: 'Start creating your online invitation today.', cta: { text: 'Create Invitation', href: '/templates' } },
    ],
    faqs: [
      { question: 'How do I send?', answer: 'Create on InviteHub, get unique link, share via WhatsApp, email, or social media.' },
      { question: 'Can guests RSVP?', answer: 'Yes, guests can RSVP directly from invitation. Track responses in dashboard.' },
    ],
  },
  'wedding-card-maker': {
    slug: 'wedding-card-maker',
    title: 'Wedding Card Maker - Design Beautiful Cards Online | InviteHub.in',
    description: 'Use our wedding card maker to design professional wedding cards easily.',
    keywords: ['wedding card maker', 'create wedding cards', 'wedding card designer', 'design wedding cards'],
    mainKeyword: 'wedding card maker',
    ogTitle: 'Wedding Card Maker | InviteHub.in',
    ogDescription: 'Design beautiful wedding cards with our easy-to-use card maker.',
    sections: [
      { id: 'hero', title: 'Professional Wedding Card Maker for Everyone', content: 'No design skills needed - choose template, customize, create professional cards in minutes.', cta: { text: 'Start Making', href: '/templates' } },
      { id: 'features', title: 'Powerful Customization in Our Card Maker', content: 'Edit Text, Add Photos, Change Colors, Font Selection, Layout Options, Live Preview' },
      { id: 'cta', title: 'Make Your First Wedding Card Today', content: 'Design a beautiful card in minutes without experience.', cta: { text: 'Make Card Now', href: '/templates' } },
    ],
    faqs: [
      { question: 'Is it free?', answer: 'Yes, create unlimited cards for free. Premium downloads available for ₹49-₹99.' },
      { question: 'Do I need design skills?', answer: 'No, pre-made templates and simple customization for everyone.' },
    ],
  },
};

export function getSEOPageBySlug(slug: SEOPageSlug): SEOPageContent | undefined {
  return SEO_PAGES[slug];
}

export function getAllSEOPages(): SEOPageContent[] {
  return Object.values(SEO_PAGES);
}

export function getSEOPageSlugs(): SEOPageSlug[] {
  return Object.keys(SEO_PAGES) as SEOPageSlug[];
}
