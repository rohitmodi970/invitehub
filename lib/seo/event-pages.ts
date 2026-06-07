import type { SEOPageContent } from './types';

export const EVENT_SEO_PAGES: Record<string, SEOPageContent> = {
  'birthday-invitation-card': {
    slug: 'birthday-invitation-card' as SEOPageContent['slug'],
    title: 'Birthday Invitation Card Maker – Design Online Free | InviteHub.in',
    description:
      'Create beautiful birthday invitation cards online in minutes. Free templates, live preview, HD downloads. Perfect for kids and adult birthday parties across India.',
    keywords: [
      'birthday invitation card',
      'birthday invitation card maker',
      'online birthday invitation',
      'birthday party invitation design',
      'digital birthday invitation India',
    ],
    mainKeyword: 'birthday invitation card',
    ogTitle: 'Birthday Invitation Card Maker | InviteHub.in',
    ogDescription: 'Design festive birthday invitation cards free. HD downloads from ₹49.',
    heroImage: '/Modern geometric wedding invitation design.png',
    highlights: [
      { icon: '🎂', label: 'Birthday Templates', desc: 'Festive designs for all ages' },
      { icon: '⚡', label: 'Ready in 2 Minutes', desc: 'Fill details, preview live' },
      { icon: '📱', label: 'WhatsApp Ready', desc: 'Share instantly with guests' },
      { icon: '💰', label: 'Free to Start', desc: 'Upgrade from ₹49 for HD' },
    ],
    sections: [
      {
        id: 'hero',
        title: 'Birthday Invitation Card Maker — Free & Festive',
        content:
          'Create a stunning birthday invitation card in minutes. Add the guest of honor\'s name, age, party date, venue, and a personal message — then download or share instantly.',
        cta: { text: 'Browse Birthday Templates', href: '/templates?event=birthday' },
      },
      {
        id: 'how',
        title: 'How to Make a Birthday Invitation Card',
        content:
          '**Step 1** — Pick a birthday template from our gallery.\n\n**Step 2** — Enter the birthday person\'s name, age or tagline, date, time, and venue.\n\n**Step 3** — Download a watermarked preview free, or upgrade for HD PNG/PDF and a shareable invitation link.',
      },
      {
        id: 'cta',
        title: 'Start Your Birthday Invitation Today',
        content: 'Free to design. No account needed to begin.',
        cta: { text: 'Create Birthday Card', href: '/templates?event=birthday' },
      },
    ],
    faqs: [
      {
        question: 'Can I make a birthday invitation card for free?',
        answer: 'Yes! Design and preview your birthday card free. Download a watermarked PNG at no cost, or upgrade from ₹49 for HD without watermark.',
      },
      {
        question: 'Can I add the birthday person\'s photo?',
        answer: 'Yes. Upload a photo directly in the editor and it appears on your invitation card.',
      },
      {
        question: 'Can I share the birthday invitation on WhatsApp?',
        answer: 'Absolutely. Upgrade to the Digital Suite plan to get a shareable link you can send on WhatsApp, email, or social media.',
      },
    ],
    relatedPages: [
      { title: 'Engagement Invitation', href: '/engagement-invitation' },
      { title: 'Baby Shower Invitation', href: '/baby-shower-invitation' },
      { title: 'Wedding Card Maker', href: '/wedding-card-maker' },
    ],
  },

  'engagement-invitation': {
    slug: 'engagement-invitation' as SEOPageContent['slug'],
    title: 'Engagement Invitation Card – Ring Ceremony Designs | InviteHub.in',
    description:
      'Design elegant engagement invitation cards online. Beautiful templates for ring ceremonies and engagement parties. Free preview, HD downloads from ₹49.',
    keywords: [
      'engagement invitation',
      'engagement invitation card',
      'ring ceremony invitation',
      'engagement card maker online',
      'digital engagement invitation India',
    ],
    mainKeyword: 'engagement invitation',
    ogTitle: 'Engagement Invitation Designer | InviteHub.in',
    ogDescription: 'Create elegant engagement invitations in minutes. Free to start.',
    heroImage: '/Romantic vintage wedding invitation design.png',
    highlights: [
      { icon: '💍', label: 'Ring Ceremony Ready', desc: 'Elegant couple-focused designs' },
      { icon: '👨‍👩‍👧', label: 'Family Details', desc: 'Add parents\' names & blessings' },
      { icon: '📲', label: 'Instant Sharing', desc: 'WhatsApp & social media ready' },
      { icon: '🖨️', label: 'Print Quality', desc: 'HD PNG & PDF exports' },
    ],
    sections: [
      {
        id: 'hero',
        title: 'Engagement Invitation Cards — Elegant & Easy',
        content:
          'Celebrate your engagement with a beautifully designed invitation. Add couple names, ceremony date, venue, family details, and share with loved ones instantly.',
        cta: { text: 'Browse Engagement Templates', href: '/templates?event=engagement' },
      },
      {
        id: 'cta',
        title: 'Design Your Engagement Invitation Now',
        content: 'Professional results in under 2 minutes. Free to preview.',
        cta: { text: 'Start Designing', href: '/templates?event=engagement' },
      },
    ],
    faqs: [
      {
        question: 'Can I use InviteHub for engagement ring ceremonies?',
        answer: 'Yes! Our engagement templates are designed for ring ceremonies, engagement parties, and sagai celebrations.',
      },
      {
        question: 'Can I include family details on the engagement card?',
        answer: 'Yes. The editor includes a family details field for parents\' names and blessings.',
      },
    ],
    relatedPages: [
      { title: 'Birthday Invitation Card', href: '/birthday-invitation-card' },
      { title: 'Wedding Invitation Maker', href: '/wedding-invitation-card-maker' },
      { title: 'Marriage Invitation Card', href: '/marriage-invitation-card' },
    ],
  },

  'baby-shower-invitation': {
    slug: 'baby-shower-invitation' as SEOPageContent['slug'],
    title: 'Baby Shower Invitation Card – Soft & Beautiful Designs | InviteHub.in',
    description:
      'Create adorable baby shower invitation cards online. Soft blue designs, parent names, registry notes. Free preview, share instantly.',
    keywords: [
      'baby shower invitation',
      'baby shower invitation card',
      'baby shower card maker',
      'online baby shower invitation India',
      'digital baby shower invite',
    ],
    mainKeyword: 'baby shower invitation',
    ogTitle: 'Baby Shower Invitation Maker | InviteHub.in',
    ogDescription: 'Design sweet baby shower invitations in minutes. Free to start.',
    heroImage: '/Modern geometric wedding invitation design.png',
    highlights: [
      { icon: '👶', label: 'Soft Designs', desc: 'Gentle colors for baby showers' },
      { icon: '🎁', label: 'Registry Notes', desc: 'Add gift registry details' },
      { icon: '📱', label: 'Easy Sharing', desc: 'Send to all guests instantly' },
      { icon: '✨', label: 'Live Preview', desc: 'See changes as you type' },
    ],
    sections: [
      {
        id: 'hero',
        title: 'Baby Shower Invitation Cards — Sweet & Simple',
        content:
          'Welcome the little one with a beautiful baby shower invitation. Add parent names, shower date, venue, and optional registry details.',
        cta: { text: 'Browse Baby Shower Templates', href: '/templates?event=baby-shower' },
      },
      {
        id: 'cta',
        title: 'Create Your Baby Shower Invitation',
        content: 'Free to design. Share the joy with friends and family.',
        cta: { text: 'Start Free', href: '/templates?event=baby-shower' },
      },
    ],
    faqs: [
      {
        question: 'Can I add registry information to the baby shower card?',
        answer: 'Yes. Use the optional registry/gift note field in the editor to include Amazon, Babylist, or other registry details.',
      },
    ],
    relatedPages: [
      { title: 'Birthday Invitation Card', href: '/birthday-invitation-card' },
      { title: 'Housewarming Invitation', href: '/housewarming-invitation' },
      { title: 'Wedding Card Maker', href: '/wedding-card-maker' },
    ],
  },

  'housewarming-invitation': {
    slug: 'housewarming-invitation' as SEOPageContent['slug'],
    title: 'Housewarming Invitation Card – Griha Pravesh Designs | InviteHub.in',
    description:
      'Design housewarming and griha pravesh invitation cards online. Fresh green templates, host names, muhurat time. Free preview, HD downloads.',
    keywords: [
      'housewarming invitation',
      'griha pravesh invitation card',
      'housewarming card maker',
      'new home invitation India',
      'housewarming invitation online',
    ],
    mainKeyword: 'housewarming invitation',
    ogTitle: 'Housewarming Invitation Maker | InviteHub.in',
    ogDescription: 'Create griha pravesh invitations in minutes. Free to start.',
    heroImage: '/Traditional Indian wedding invitation design.png',
    highlights: [
      { icon: '🏠', label: 'Griha Pravesh Ready', desc: 'Traditional & modern styles' },
      { icon: '🕉️', label: 'Muhurat Time', desc: 'Add auspicious timing' },
      { icon: '📍', label: 'Full Address', desc: 'Help guests find your new home' },
      { icon: '💚', label: 'Fresh Design', desc: 'Green celebration theme' },
    ],
    sections: [
      {
        id: 'hero',
        title: 'Housewarming Invitation Cards — Bless Our New Home',
        content:
          'Invite friends and family to your griha pravesh or housewarming celebration. Add host names, event date, full address, and a warm welcome message.',
        cta: { text: 'Browse Housewarming Templates', href: '/templates?event=housewarming' },
      },
      {
        id: 'cta',
        title: 'Create Your Housewarming Invitation',
        content: 'Share your new home celebration with a beautiful digital invitation.',
        cta: { text: 'Start Designing', href: '/templates?event=housewarming' },
      },
    ],
    faqs: [
      {
        question: 'Can I use this for griha pravesh ceremonies?',
        answer: 'Yes! Our housewarming templates work perfectly for griha pravesh, new home parties, and flat warming celebrations.',
      },
    ],
    relatedPages: [
      { title: 'Baby Shower Invitation', href: '/baby-shower-invitation' },
      { title: 'Anniversary Invitation', href: '/anniversary-invitation' },
      { title: 'Wedding Templates', href: '/templates' },
    ],
  },

  'anniversary-invitation': {
    slug: 'anniversary-invitation' as SEOPageContent['slug'],
    title: 'Anniversary Invitation Card – Celebrate Years of Love | InviteHub.in',
    description:
      'Design romantic anniversary invitation cards online. Milestone celebrations, couple names, years together. Free preview, HD downloads.',
    keywords: [
      'anniversary invitation',
      'anniversary invitation card',
      'anniversary party invitation',
      'anniversary card maker online',
      '25th anniversary invitation India',
    ],
    mainKeyword: 'anniversary invitation',
    ogTitle: 'Anniversary Invitation Maker | InviteHub.in',
    ogDescription: 'Celebrate milestones with beautiful anniversary invitations.',
    heroImage: '/Romantic vintage wedding invitation design.png',
    highlights: [
      { icon: '❤️', label: 'Romantic Design', desc: 'Celebrate years of love' },
      { icon: '🎉', label: 'Milestone Ready', desc: '25th, 50th & more' },
      { icon: '📸', label: 'Couple Photo', desc: 'Add your favorite photo' },
      { icon: '🔗', label: 'Shareable Link', desc: 'Send to all guests' },
    ],
    sections: [
      {
        id: 'hero',
        title: 'Anniversary Invitation Cards — Celebrate Your Journey',
        content:
          'Mark your milestone anniversary with an elegant invitation. Add couple names, years together, celebration date, and venue details.',
        cta: { text: 'Browse Anniversary Templates', href: '/templates?event=anniversary' },
      },
      {
        id: 'cta',
        title: 'Design Your Anniversary Invitation',
        content: 'Honor your years together with a beautiful invitation card.',
        cta: { text: 'Start Free', href: '/templates?event=anniversary' },
      },
    ],
    faqs: [
      {
        question: 'Can I mention the anniversary milestone on the card?',
        answer: 'Yes. Use the milestone field to display "Celebrating 25 Years Together" or any milestone you prefer.',
      },
    ],
    relatedPages: [
      { title: 'Engagement Invitation', href: '/engagement-invitation' },
      { title: 'Wedding Invitation Maker', href: '/wedding-invitation-card-maker' },
      { title: 'Housewarming Invitation', href: '/housewarming-invitation' },
    ],
  },

  'corporate-event-invitation': {
    slug: 'corporate-event-invitation' as SEOPageContent['slug'],
    title: 'Corporate Event Invitation – Professional Designs | InviteHub.in',
    description:
      'Create professional corporate event invitation cards online. Conferences, summits, team events. Clean minimal templates, free preview.',
    keywords: [
      'corporate event invitation',
      'business event invitation card',
      'conference invitation maker',
      'corporate invitation design online',
      'company event invitation India',
    ],
    mainKeyword: 'corporate event invitation',
    ogTitle: 'Corporate Event Invitation Maker | InviteHub.in',
    ogDescription: 'Professional event invitations for business gatherings.',
    heroImage: '/Modern geometric wedding invitation design.png',
    highlights: [
      { icon: '🏢', label: 'Professional Look', desc: 'Clean corporate styling' },
      { icon: '📅', label: 'Agenda Notes', desc: 'Dress code & schedule' },
      { icon: '🖼️', label: 'Logo Upload', desc: 'Add company branding' },
      { icon: '📧', label: 'Easy Distribution', desc: 'Share via email or link' },
    ],
    sections: [
      {
        id: 'hero',
        title: 'Corporate Event Invitations — Professional & Polished',
        content:
          'Invite attendees to your conference, summit, or company event with a clean professional invitation. Add event title, company name, date, venue, and agenda notes.',
        cta: { text: 'Browse Corporate Templates', href: '/templates?event=corporate' },
      },
      {
        id: 'cta',
        title: 'Create Your Corporate Invitation',
        content: 'Professional invitations in minutes. Free to preview.',
        cta: { text: 'Start Designing', href: '/templates?event=corporate' },
      },
    ],
    faqs: [
      {
        question: 'Can I add my company logo to the invitation?',
        answer: 'Yes. Upload your company logo or event banner using the photo field in the editor.',
      },
      {
        question: 'Is InviteHub suitable for large corporate events?',
        answer: 'Yes. Create one invitation and share the link with unlimited attendees at no extra per-guest cost.',
      },
    ],
    relatedPages: [
      { title: 'Birthday Invitation Card', href: '/birthday-invitation-card' },
      { title: 'Anniversary Invitation', href: '/anniversary-invitation' },
      { title: 'All Templates', href: '/templates' },
    ],
  },
};
