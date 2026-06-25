import type { SEOPageContent } from './types';
import { EVENT_HERO_IMAGES } from '@/lib/images/paths';

export const EVENT_SEO_PAGES: Record<string, SEOPageContent> = {
  // ─────────────────────────────────────────────────────────────────────────────
  // BIRTHDAY
  // ─────────────────────────────────────────────────────────────────────────────
  'birthday-invitation-card': {
    slug: 'birthday-invitation-card' as SEOPageContent['slug'],
    title: 'Birthday Invitation Card Maker – Free Online Designer',
    description:
      'Create beautiful birthday invitation cards online in minutes. Festive templates for kids & adult birthdays. Free preview, HD downloads from ₹49. Share on WhatsApp instantly.',
    keywords: [
      'birthday invitation card',
      'birthday invitation card maker',
      'online birthday invitation',
      'kids birthday invitation card',
      '1st birthday invitation card',
      'birthday party invitation design',
      'digital birthday invitation India',
      'birthday card maker free',
    ],
    mainKeyword: 'birthday invitation card',
    ogTitle: 'Birthday Invitation Card Maker | InviteHub.in',
    ogDescription: 'Design festive birthday invitation cards free. Kids & adult themes, HD downloads from ₹49.',
    heroImage: EVENT_HERO_IMAGES.birthday,
    highlights: [
      { icon: '🎂', label: 'Kids & Adult Themes', desc: 'Superhero, princess, elegant & more' },
      { icon: '⚡', label: 'Ready in 2 Minutes', desc: 'Fill details, preview live, download' },
      { icon: '📱', label: 'WhatsApp Ready', desc: 'Share instantly with all guests' },
      { icon: '💰', label: 'Free to Start', desc: 'Upgrade from ₹49 for HD, no watermark' },
    ],
    sections: [
      {
        id: 'hero',
        title: 'Birthday Invitation Card Maker — Free, Festive & Instant',
        content:
          'Plan the perfect birthday party with a stunning invitation card. InviteHub.in lets you design a birthday invitation in under 2 minutes — add the guest of honor\'s name, age, party details, and a personal message, then share it with everyone in one tap.',
        cta: { text: 'Browse Birthday Templates', href: '/templates?event=birthday' },
      },
      {
        id: 'how-it-works',
        title: 'How to Make a Birthday Invitation Card in 3 Steps',
        content:
          '**Step 1 — Choose Your Theme:**\nPick from our festive birthday template collection. Whether it\'s a princess theme for your daughter\'s 5th birthday, a superhero bash, a 1st birthday milestone, or an elegant adult birthday dinner — we have a template for every vibe.\n\n**Step 2 — Fill in the Birthday Details:**\nEnter the birthday person\'s name, their age or a fun tagline ("Turning 1!", "Finally 18!", "Celebrating 30 🎉"), party date and time, venue, and RSVP contact. Optionally upload their photo for a personal touch.\n\n**Step 3 — Download & Share:**\nDownload a free watermarked preview, or upgrade for an HD PNG (₹49) or shareable digital invitation page with a unique link, countdown timer, and guest RSVP (₹99).',
      },
      {
        id: 'kids-vs-adult',
        title: 'Kids Birthday vs. Adult Birthday — We Cover Both',
        content:
          '**Kids Birthday Invitations:**\nBright, playful, emoji-filled designs perfect for 1st birthdays, 5th birthdays, and teen parties. Parents love our templates for how easy they are to customize with a child\'s name and age. Popular themes: balloons, stars, princess, dinosaurs, superheroes.\n\n**Adult Birthday Invitations:**\nElegant, minimal designs for milestone birthdays — 21st, 30th, 40th, 50th, and beyond. Clean typography, gold accents, and sophisticated layouts that feel premium, not childish.\n\n**1st Birthday Celebrations:**\nIndia\'s first birthday (पहला जन्मदिन) is a huge family event. Our 1st birthday templates are designed to match the scale of these celebrations — bright, festive, and full of joy.',
      },
      {
        id: 'pricing',
        title: 'Simple, Transparent Pricing',
        content:
          '**Free** — Design your card, live preview, watermarked PNG download.\n\n**Basic (₹49)** — HD PNG without watermark. Perfect for digital sharing on WhatsApp and Instagram.\n\n**Print-Ready (₹99)** — HD PNG + print-quality PDF + matching envelope design. Take it to any local printer.\n\n**Digital Suite (₹99)** — HD PNG + PDF + dedicated invitation page with live countdown timer, RSVP form, and shareable link.',
      },
      {
        id: 'cta',
        title: 'Start Your Birthday Invitation Today',
        content: 'Free to design. No account needed. Create a birthday invitation that gets everyone excited for the party!',
        cta: { text: 'Create Birthday Card', href: '/templates?event=birthday' },
      },
    ],
    faqs: [
      {
        question: 'Can I make a birthday invitation card for free?',
        answer: 'Yes! Design and preview your birthday card completely free. Download a watermarked PNG at no cost. Upgrade from ₹49 for HD downloads without watermark or ₹99 for a printable PDF.',
      },
      {
        question: 'Do you have birthday invitation templates for kids?',
        answer: 'Yes! We have cheerful, colorful templates designed specifically for kids\' birthdays — from 1st birthday milestones to fun themed parties. You can also visit /kids-birthday-invitation for dedicated kids templates.',
      },
      {
        question: 'Can I add the birthday person\'s photo to the card?',
        answer: 'Absolutely. Upload a photo directly in the editor — it appears on your invitation card automatically resized to fit beautifully within the design.',
      },
      {
        question: 'Is there a template for 1st birthday invitations?',
        answer: 'Yes! We have special first birthday templates designed for India\'s milestone first birthday celebrations. Visit /1st-birthday-invitation for dedicated designs.',
      },
      {
        question: 'Can I share the birthday invitation on WhatsApp?',
        answer: 'Yes. Upgrade to the Digital Suite plan (₹99) to get a unique shareable link you can send on WhatsApp, email, or social media. All guests can view the full invitation on any device.',
      },
      {
        question: 'Can I print the birthday invitation card?',
        answer: 'Yes. The Print-Ready plan (₹99) includes a print-quality PDF optimized for A5 size at 300 DPI — ready to take to any local printer.',
      },
      {
        question: 'How do I write a good birthday invitation message?',
        answer: 'Keep it short and joyful: include the birthday person\'s name, age (if comfortable), date, time, venue, and RSVP contact. A fun tagline like "Join us to celebrate!" or "The party can\'t start without you!" makes it memorable.',
      },
    ],
    relatedPages: [
      { title: 'Kids Birthday Invitation', href: '/kids-birthday-invitation' },
      { title: '1st Birthday Invitation', href: '/1st-birthday-invitation' },
      { title: 'Engagement Invitation', href: '/engagement-invitation' },
      { title: 'Baby Shower Invitation', href: '/baby-shower-invitation' },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // ENGAGEMENT
  // ─────────────────────────────────────────────────────────────────────────────
  'engagement-invitation': {
    slug: 'engagement-invitation' as SEOPageContent['slug'],
    title: 'Engagement Invitation Card – Sagai & Ring Ceremony Designs',
    description:
      'Design elegant engagement invitation cards online. Beautiful templates for ring ceremonies, sagai, and engagement parties. Free preview, HD downloads from ₹49. Share on WhatsApp.',
    keywords: [
      'engagement invitation',
      'engagement invitation card',
      'ring ceremony invitation',
      'sagai invitation card',
      'sagai invitation',
      'engagement card maker online',
      'digital engagement invitation India',
      'ring ceremony invitation card',
    ],
    mainKeyword: 'engagement invitation',
    ogTitle: 'Engagement Invitation Designer | InviteHub.in',
    ogDescription: 'Create elegant engagement & sagai invitations in minutes. Ring ceremony designs. Free to start.',
    heroImage: EVENT_HERO_IMAGES.engagement,
    highlights: [
      { icon: '💍', label: 'Ring Ceremony Ready', desc: 'Elegant couple-focused designs' },
      { icon: '👨‍👩‍👧', label: 'Family Details', desc: 'Add parents\' names & blessings' },
      { icon: '📲', label: 'Instant Sharing', desc: 'WhatsApp & social media ready' },
      { icon: '🖨️', label: 'Print Quality', desc: 'HD PNG & PDF exports' },
    ],
    sections: [
      {
        id: 'hero',
        title: 'Engagement Invitation Cards — Elegant, Easy & Instant',
        content:
          'Celebrate the start of your forever with a beautifully designed engagement invitation. Add couple names, ceremony date and time, venue, family details, and a heartfelt message — then share with loved ones instantly.',
        cta: { text: 'Browse Engagement Templates', href: '/templates?event=engagement' },
      },
      {
        id: 'sagai-invitation',
        title: 'Sagai Invitation Cards — Traditional Indian Engagement',
        content:
          'In India, the engagement is often called a **Sagai** (सगाई) — a beautiful ceremony where families formally exchange rings and blessings. Our sagai invitation templates are designed to honor this tradition:\n\n• **Traditional motifs** — floral borders, gold accents, deep red and maroon tones\n• **Bilingual support** — add Hindi text alongside English for a traditional feel\n• **Family-first layout** — prominent space for both families\' names and blessings\n• **Auspicious timing** — include muhurat time and pandit blessing line\n\nWhether your sagai is a small family gathering or a grand celebration, InviteHub has a template that matches your vision.',
      },
      {
        id: 'ring-ceremony-invitation',
        title: 'Ring Ceremony Invitation — Modern & Romantic',
        content:
          'The **ring ceremony** is the modern, urban version of the engagement — often a cocktail-style event with close friends and family. Our ring ceremony invitation templates lean modern:\n\n• **Romantic color palettes** — dusty rose, champagne gold, navy, ivory\n• **Couple photo ready** — upload your photo to personalize the card\n• **Clean typography** — bold couple names, elegant event details\n• **Social-media optimized** — looks stunning shared on Instagram and WhatsApp Status\n\nThese designs pair perfectly with a destination engagement, hotel venue celebration, or intimate home gathering.',
      },
      {
        id: 'cta',
        title: 'Design Your Engagement Invitation Now',
        content: 'Professional results in under 2 minutes. Free to preview. Upgrade when you\'re ready to share.',
        cta: { text: 'Start Designing', href: '/templates?event=engagement' },
      },
    ],
    faqs: [
      {
        question: 'Can I use InviteHub for sagai (Indian engagement) invitations?',
        answer: 'Yes! Our engagement templates are designed for sagai ceremonies, ring ceremonies, and engagement parties. Traditional templates include Hindi blessings, mandala motifs, and space for both families\' names.',
      },
      {
        question: 'Can I include family details on the engagement card?',
        answer: 'Yes. The editor includes a family details field for both families\' names, parents\' names, and optional blessings or a family message.',
      },
      {
        question: 'Is there a difference between a sagai invitation and a ring ceremony invitation?',
        answer: 'Culturally, sagai (सगाई) is the traditional North Indian engagement ceremony with family rituals and exchange of gifts, while a ring ceremony is the modern version focused on the couple exchanging rings. InviteHub templates work beautifully for both — just choose the style that matches your event\'s vibe.',
      },
      {
        question: 'Can I add both bride and groom family names to the card?',
        answer: 'Yes. Our engagement templates have dedicated sections for both families. You can add the bride\'s parents\' names, groom\'s parents\' names, and a combined family blessing message.',
      },
      {
        question: 'Can I get a bilingual (Hindi + English) engagement invitation?',
        answer: 'Our Traditional Indian template includes Hindi text support. Full bilingual customization across all templates is on our roadmap. For now, you can add Hindi text in the custom message field.',
      },
      {
        question: 'How far in advance should I send engagement invitations?',
        answer: 'Digital invitations can be sent 1–2 weeks before the ceremony. For formal events, 2–3 weeks is ideal. The beauty of digital invitations is you can send them instantly — even a few days before without worry.',
      },
    ],
    relatedPages: [
      { title: 'Birthday Invitation Card', href: '/birthday-invitation-card' },
      { title: 'Wedding Invitation Maker', href: '/wedding-invitation-card-maker' },
      { title: 'Marriage Invitation Card', href: '/marriage-invitation-card' },
      { title: 'Anniversary Invitation', href: '/anniversary-invitation' },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // BABY SHOWER
  // ─────────────────────────────────────────────────────────────────────────────
  'baby-shower-invitation': {
    slug: 'baby-shower-invitation' as SEOPageContent['slug'],
    title: 'Baby Shower Invitation Card – Godh Bharai & Baby Shower Designs',
    description:
      'Create adorable baby shower and godh bharai invitation cards online. Beautiful designs for Indian families, parent names, gift registry notes. Free preview, share instantly on WhatsApp.',
    keywords: [
      'baby shower invitation',
      'baby shower invitation card',
      'godh bharai invitation',
      'baby shower card maker',
      'online baby shower invitation India',
      'digital baby shower invite',
      'godh bharai card online',
    ],
    mainKeyword: 'baby shower invitation',
    ogTitle: 'Baby Shower Invitation Maker | InviteHub.in',
    ogDescription: 'Design sweet baby shower & godh bharai invitations in minutes. Free to start, share on WhatsApp.',
    heroImage: EVENT_HERO_IMAGES['baby-shower'],
    highlights: [
      { icon: '👶', label: 'Baby & Godh Bharai Ready', desc: 'Warm designs for Indian families' },
      { icon: '🎁', label: 'Registry Notes', desc: 'Add Amazon India wishlist details' },
      { icon: '📱', label: 'Easy Sharing', desc: 'Send to all guests via WhatsApp' },
      { icon: '✨', label: 'Live Preview', desc: 'See your invitation as you type' },
    ],
    sections: [
      {
        id: 'hero',
        title: 'Baby Shower Invitation Cards — Sweet, Warm & Instant',
        content:
          'Welcome the little one with a beautiful baby shower invitation. Add parent names, shower date, venue, and optional gift registry details — then share with family and friends in seconds.',
        cta: { text: 'Browse Baby Shower Templates', href: '/templates?event=baby-shower' },
      },
      {
        id: 'godh-bharai',
        title: 'Godh Bharai Invitations — Indian Baby Shower Tradition',
        content:
          '**Godh Bharai (गोद भराई)** is the traditional Indian equivalent of a baby shower — a joyful ceremony where family and friends bless the expecting mother and shower her with gifts and love. It\'s a deeply personal celebration rooted in Indian culture.\n\nOur godh bharai invitation templates are designed specifically for this occasion:\n• **Warm, auspicious color palettes** — saffron, mauve, deep rose, and gold tones\n• **Traditional blessing text** — add a shubh sandesh (auspicious message) for the mother-to-be\n• **Family-forward design** — space for the mother\'s name, expected arrival date, and host family names\n• **Ceremony details** — include puja time, venue address, and dress code\n\nFor dedicated godh bharai designs, visit our [Godh Bharai Invitation](/godh-bharai-invitation) page.',
      },
      {
        id: 'gift-registry',
        title: 'Adding Gift Registry & Wishlist to Your Invitation',
        content:
          'Many families include gift registry or wishlist information on their baby shower invitation. InviteHub makes this easy:\n\n• **Amazon India wishlist** — paste your wishlist link in the gift note field\n• **Flipkart wishlist** — include Flipkart Baby Store or a curated list\n• **Custom registry note** — add any text like "No gifts needed, just your blessings" or "Diapers & essentials most welcome!"\n\nThe gift information appears as a subtle note at the bottom of the card — visible but not overwhelming.',
      },
      {
        id: 'cta',
        title: 'Create Your Baby Shower Invitation',
        content: 'Free to design. Share the joy with friends and family. Beautiful cards ready in under 2 minutes.',
        cta: { text: 'Start Free', href: '/templates?event=baby-shower' },
      },
    ],
    faqs: [
      {
        question: 'Can I add registry information to the baby shower card?',
        answer: 'Yes. Use the optional registry/gift note field in the editor to include your Amazon India wishlist, Flipkart registry, or a custom message like "Diapers & wipes most appreciated!"',
      },
      {
        question: 'Is InviteHub suitable for godh bharai (Indian baby shower) invitations?',
        answer: 'Yes! We have designs that work beautifully for godh bharai ceremonies. For dedicated godh bharai invitation templates with traditional Indian motifs, visit our Godh Bharai Invitation page.',
      },
      {
        question: 'What details should I include in a baby shower invitation?',
        answer: 'Include the expecting mother\'s name, the date and time of the celebration, the venue address, RSVP contact, and optionally a gift registry note or dress code. A short warm message ("Join us as we celebrate the arrival of our little one!") adds a personal touch.',
      },
      {
        question: 'Can I share the baby shower invitation on WhatsApp?',
        answer: 'Absolutely. Download an HD image to share directly, or upgrade to the Digital Suite (₹99) for a unique shareable link with a full invitation page that works on any device.',
      },
      {
        question: 'Do you have gender-neutral baby shower designs?',
        answer: 'Yes. While we offer classic pink and blue-toned designs, we also have warm neutral designs in ivory, gold, and soft green that work perfectly for surprise-gender baby showers.',
      },
    ],
    relatedPages: [
      { title: 'Godh Bharai Invitation', href: '/godh-bharai-invitation' },
      { title: 'Birthday Invitation Card', href: '/birthday-invitation-card' },
      { title: 'Housewarming Invitation', href: '/housewarming-invitation' },
      { title: 'Wedding Card Maker', href: '/wedding-card-maker' },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // HOUSEWARMING
  // ─────────────────────────────────────────────────────────────────────────────
  'housewarming-invitation': {
    slug: 'housewarming-invitation' as SEOPageContent['slug'],
    title: 'Housewarming Invitation Card – Griha Pravesh Designs',
    description:
      'Design housewarming and griha pravesh invitation cards online. Traditional Indian and modern templates, host names, muhurat time. Free preview, HD downloads.',
    keywords: [
      'housewarming invitation',
      'griha pravesh invitation card',
      'housewarming card maker',
      'new home invitation India',
      'housewarming invitation online',
    ],
    mainKeyword: 'housewarming invitation',
    ogTitle: 'Housewarming Invitation Maker | InviteHub.in',
    ogDescription: 'Create griha pravesh & housewarming invitations in minutes. Free to start.',
    heroImage: EVENT_HERO_IMAGES.housewarming,
    highlights: [
      { icon: '🏠', label: 'Griha Pravesh Ready', desc: 'Traditional & modern styles' },
      { icon: '🕉️', label: 'Muhurat Time', desc: 'Add auspicious timing' },
      { icon: '📍', label: 'Full Address', desc: 'Help guests find your new home' },
      { icon: '💚', label: 'Fresh Design', desc: 'New beginnings celebration theme' },
    ],
    sections: [
      {
        id: 'hero',
        title: 'Housewarming Invitation Cards — Bless Our New Home',
        content:
          'Invite friends and family to your griha pravesh or housewarming celebration. Add host names, event date, full address with landmarks, muhurat time, and a warm welcome message.',
        cta: { text: 'Browse Housewarming Templates', href: '/templates?event=housewarming' },
      },
      {
        id: 'cta',
        title: 'Create Your Housewarming Invitation',
        content: 'Share your new home celebration with a beautiful digital invitation. Free to design and preview.',
        cta: { text: 'Start Designing', href: '/templates?event=housewarming' },
      },
    ],
    faqs: [
      {
        question: 'Can I use this for griha pravesh ceremonies?',
        answer: 'Yes! Our housewarming templates work perfectly for griha pravesh, new home parties, and flat warming celebrations. You can add muhurat time and puja details.',
      },
    ],
    relatedPages: [
      { title: 'Baby Shower Invitation', href: '/baby-shower-invitation' },
      { title: 'Anniversary Invitation', href: '/anniversary-invitation' },
      { title: 'Wedding Templates', href: '/templates' },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // ANNIVERSARY
  // ─────────────────────────────────────────────────────────────────────────────
  'anniversary-invitation': {
    slug: 'anniversary-invitation' as SEOPageContent['slug'],
    title: 'Anniversary Invitation Card – Celebrate Years of Love',
    description:
      'Design romantic anniversary invitation cards online. Milestone celebrations — 25th, 50th & beyond. Couple names, years together. Free preview, HD downloads from ₹49.',
    keywords: [
      'anniversary invitation',
      'anniversary invitation card',
      'anniversary party invitation',
      'anniversary card maker online',
      '25th anniversary invitation India',
    ],
    mainKeyword: 'anniversary invitation',
    ogTitle: 'Anniversary Invitation Maker | InviteHub.in',
    ogDescription: 'Celebrate milestones with beautiful anniversary invitations. Free to start.',
    heroImage: EVENT_HERO_IMAGES.anniversary,
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
          'Mark your milestone anniversary with an elegant invitation. Add couple names, years together, celebration date, venue details, and a heartfelt message.',
        cta: { text: 'Browse Anniversary Templates', href: '/templates?event=anniversary' },
      },
      {
        id: 'cta',
        title: 'Design Your Anniversary Invitation',
        content: 'Honor your years together with a beautiful invitation card. Free to preview.',
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

  // ─────────────────────────────────────────────────────────────────────────────
  // CORPORATE
  // ─────────────────────────────────────────────────────────────────────────────
  'corporate-event-invitation': {
    slug: 'corporate-event-invitation' as SEOPageContent['slug'],
    title: 'Corporate Event Invitation – Professional Designs Online',
    description:
      'Create professional corporate event invitation cards online. Conferences, office parties, team outings, farewell events. Clean minimal templates, free preview, HD downloads.',
    keywords: [
      'corporate event invitation',
      'business event invitation card',
      'conference invitation maker',
      'corporate invitation design online',
      'company event invitation India',
      'office party invitation',
      'farewell invitation card',
      'team outing invitation',
    ],
    mainKeyword: 'corporate event invitation',
    ogTitle: 'Corporate Event Invitation Maker | InviteHub.in',
    ogDescription: 'Professional event invitations for conferences, office parties & team events. Free to start.',
    heroImage: EVENT_HERO_IMAGES.corporate,
    highlights: [
      { icon: '🏢', label: 'Professional Look', desc: 'Clean corporate styling' },
      { icon: '📅', label: 'Agenda Notes', desc: 'Dress code & schedule details' },
      { icon: '🖼️', label: 'Logo Upload', desc: 'Add your company branding' },
      { icon: '📧', label: 'Easy Distribution', desc: 'Share via email or WhatsApp link' },
    ],
    sections: [
      {
        id: 'hero',
        title: 'Corporate Event Invitations — Professional & Polished',
        content:
          'Invite attendees to your conference, summit, office party, or company event with a clean professional invitation. Add event title, company name, date, venue, agenda notes, and dress code.',
        cta: { text: 'Browse Corporate Templates', href: '/templates?event=corporate' },
      },
      {
        id: 'event-types',
        title: 'Types of Corporate Events We Support',
        content:
          '**🏢 Annual Day & Company Celebrations** — Invite employees and stakeholders to your annual day, foundation day, or milestone celebration with a branded, professional invitation.\n\n**🎤 Conferences & Summits** — Clean, information-dense templates for industry conferences, product launches, and business summits.\n\n**🎉 Office Parties** — Keep it fun but professional. Our office party templates strike the right balance for annual parties and team celebrations.\n\n**👋 Farewell Events** — Honor a colleague\'s departure with a warm farewell invitation. Emotional but tasteful designs that celebrate the relationship.\n\n**🏕️ Team Outings & Offsites** — Rally the team with a fun, energetic invitation for picnics, team-building days, and off-site retreats.',
      },
      {
        id: 'cta',
        title: 'Create Your Corporate Invitation',
        content: 'Professional invitations in minutes. Free to preview. Impress your team and guests.',
        cta: { text: 'Start Designing', href: '/templates?event=corporate' },
      },
    ],
    faqs: [
      {
        question: 'Can I add my company logo to the invitation?',
        answer: 'Yes. Upload your company logo or event banner using the photo/logo field in the editor. It appears prominently at the top of the card.',
      },
      {
        question: 'Is InviteHub suitable for large corporate events?',
        answer: 'Yes. Create one invitation and share the link with unlimited attendees at no extra per-guest cost. The Digital Suite plan provides a dedicated invitation page with RSVP tracking.',
      },
      {
        question: 'Can I create a farewell invitation card on InviteHub?',
        answer: 'Absolutely. Our corporate templates work well for farewell events. You can also visit our dedicated Farewell Invitation page for designs tailored specifically for sending off a beloved colleague.',
      },
      {
        question: 'Can I add dress code and agenda to the invitation?',
        answer: 'Yes. Use the additional details or agenda field in the editor to mention dress code (e.g., "Business Casual"), event schedule, or any special instructions for attendees.',
      },
      {
        question: 'Can I use this for an office party invitation?',
        answer: 'Yes! We have templates that work for office parties and annual day celebrations. For dedicated office party designs, check out our Office Party Invitation page.',
      },
    ],
    relatedPages: [
      { title: 'Office Party Invitation', href: '/office-party-invitation' },
      { title: 'Farewell Invitation Card', href: '/farewell-invitation-card' },
      { title: 'Team Event Invitation', href: '/team-event-invitation' },
      { title: 'Birthday Invitation Card', href: '/birthday-invitation-card' },
    ],
  },

  // =============================================================================
  // NEW PAGES — BIRTHDAY SUB-PAGES
  // =============================================================================

  'kids-birthday-invitation': {
    slug: 'kids-birthday-invitation' as SEOPageContent['slug'],
    title: 'Kids Birthday Invitation Card – Fun & Colorful Designs',
    description:
      'Create fun, colorful birthday invitation cards for kids online. Superhero, princess, unicorn, and cartoon themes. Free to design, HD download from ₹49. Share on WhatsApp instantly.',
    keywords: [
      'kids birthday invitation card',
      'kids birthday invitation',
      'children birthday invitation card',
      'birthday card for kids online',
      'cartoon birthday invitation India',
      'kids party invitation maker',
      'superhero birthday invitation',
      'princess birthday invitation card',
    ],
    mainKeyword: 'kids birthday invitation card',
    ogTitle: 'Kids Birthday Invitation Card Maker | InviteHub.in',
    ogDescription: 'Fun, colorful birthday invitations for kids. Superhero, princess, unicorn themes. Free to start.',
    heroImage: EVENT_HERO_IMAGES.birthday,
    highlights: [
      { icon: '🦸', label: 'Fun Themes', desc: 'Superhero, princess, unicorn & more' },
      { icon: '🎈', label: 'Bright & Colorful', desc: 'Kids love the festive designs' },
      { icon: '⚡', label: 'Ready in 2 Minutes', desc: 'Fill details, download instantly' },
      { icon: '📱', label: 'WhatsApp Ready', desc: 'Share with parents instantly' },
    ],
    sections: [
      {
        id: 'hero',
        title: 'Kids Birthday Invitation Cards — Fun, Colorful & Instant',
        content:
          'Plan the most exciting kids\' birthday party with an invitation that gets everyone pumped! Choose from our bright, themed designs, add the birthday child\'s name and details, and share with all the little guests\' parents in seconds.',
        cta: { text: 'Browse Kids Birthday Templates', href: '/templates?event=birthday' },
      },
      {
        id: 'themes',
        title: 'Popular Kids Birthday Themes We Support',
        content:
          '**🦸 Superhero Party** — Bold, action-packed designs for the little hero in your life. Perfect for ages 3–10.\n\n**👸 Princess Party** — Sparkly, pink, and magical. Every little girl\'s dream birthday card.\n\n**🦄 Unicorn Theme** — Rainbow colors, glitter vibes, and all the magic a birthday deserves.\n\n**🦕 Dinosaur Party** — Fun and prehistoric. Boys love it!\n\n**🚀 Space Adventure** — For the little astronauts who reach for the stars.\n\n**🎂 Classic Birthday** — Balloons, streamers, and confetti — the timeless birthday design that never goes out of style.',
      },
      {
        id: 'tips',
        title: 'Tips for a Perfect Kids Birthday Invitation',
        content:
          '🎯 **Include all key info** — Date, time, venue with address, RSVP contact (usually the parent\'s number).\n\n📸 **Add a photo** — A cute photo of the birthday child makes the invitation personal and adorable.\n\n🎁 **Mention party theme** — If there\'s a theme (dress up as superheroes!), mention it so guests can come prepared.\n\n⏰ **Send early** — Kids\' party RSVPs require parents to plan. Send the invitation at least 10–14 days in advance.\n\n📋 **Keep venue directions clear** — Add a landmark or the building name alongside the address.',
      },
      {
        id: 'cta',
        title: 'Create Your Kids Birthday Invitation Now',
        content: 'Free to design. No account needed. Your little one\'s birthday invitation is ready in 2 minutes!',
        cta: { text: 'Make Kids Birthday Card', href: '/templates?event=birthday' },
      },
    ],
    faqs: [
      {
        question: 'What age groups are your kids birthday templates suitable for?',
        answer: 'Our kids birthday templates are designed for children aged 1 to 12. From first birthday milestones to fun 5th birthdays to pre-teen parties, we have designs for every age.',
      },
      {
        question: 'Can I add the child\'s photo to the birthday invitation?',
        answer: 'Yes! Upload the birthday child\'s photo directly in the editor. It appears beautifully on the card — parents love personalizing with a cute baby or child photo.',
      },
      {
        question: 'Can I make a themed invitation (superhero, princess, etc.)?',
        answer: 'Yes. Our templates include festive, colorful designs suited for themed birthday parties. Choose the design closest to your theme and customize the text to match.',
      },
      {
        question: 'How do I share the kids birthday invitation with other parents?',
        answer: 'Download the HD image and share it in your WhatsApp class group, or upgrade to the Digital Suite (₹99) for a shareable link with RSVP — perfect for collecting attendance confirmations from parents.',
      },
      {
        question: 'Can I write a fun birthday message for kids on the card?',
        answer: 'Absolutely! Use the custom message field to add a fun line like "Come party with the birthday superhero!" or "It\'s a unicorn party — wear your best sparkles!"',
      },
    ],
    relatedPages: [
      { title: '1st Birthday Invitation', href: '/1st-birthday-invitation' },
      { title: 'Birthday Invitation Card', href: '/birthday-invitation-card' },
      { title: 'Party Invitation Card', href: '/party-invitation-card' },
      { title: 'Baby Shower Invitation', href: '/baby-shower-invitation' },
    ],
  },

  '1st-birthday-invitation': {
    slug: '1st-birthday-invitation' as SEOPageContent['slug'],
    title: '1st Birthday Invitation Card – First Birthday Designs India',
    description:
      'Create beautiful first birthday invitation cards online. Milestone 1st birthday designs for the most special celebration. Free preview, HD downloads from ₹49. WhatsApp ready.',
    keywords: [
      '1st birthday invitation card',
      'first birthday invitation',
      '1st birthday invitation',
      'one year birthday invitation card',
      'first birthday invitation card online India',
      'baby first birthday card maker',
      '1st birthday invitation design',
    ],
    mainKeyword: '1st birthday invitation card',
    ogTitle: '1st Birthday Invitation Card Maker | InviteHub.in',
    ogDescription: 'Beautiful first birthday invitations for the most special milestone. Free to start.',
    heroImage: EVENT_HERO_IMAGES.birthday,
    highlights: [
      { icon: '🎂', label: 'Milestone Designs', desc: 'Celebrating turning 1!' },
      { icon: '👶', label: 'Baby Photo Ready', desc: 'Add baby\'s photo to the card' },
      { icon: '🎊', label: 'Grand Celebration', desc: 'India\'s biggest birthday event' },
      { icon: '📱', label: 'Share Instantly', desc: 'WhatsApp & social media ready' },
    ],
    sections: [
      {
        id: 'hero',
        title: '1st Birthday Invitation Cards — Celebrate the Most Special Year',
        content:
          'The first birthday is one of the most celebrated events in Indian families — a milestone for both baby and parents. Create a stunning 1st birthday invitation that matches the grandeur of this special occasion. Add baby\'s name, the magical "1" age milestone, party details, and that adorable baby photo.',
        cta: { text: 'Browse 1st Birthday Templates', href: '/templates?event=birthday' },
      },
      {
        id: 'why-first-birthday',
        title: 'Why the 1st Birthday Is Extra Special in India',
        content:
          'In Indian culture, a baby\'s first birthday is far more than just a celebration — it\'s a milestone event that families plan for months. The first birthday often includes:\n\n• **Annaprasana ceremony** (first rice feeding) for some communities\n• **Mundan** (first haircut ceremony) in many traditions\n• **Family reunion** — relatives from across the country come together\n• **Grand venue** — many families book banquet halls, resorts, or community halls\n• **Professional photography** — first birthday photos are cherished forever\n\nYour 1st birthday invitation needs to match this energy — grand, warm, and personal. InviteHub\'s first birthday templates are designed specifically for India\'s grand first birthday celebrations.',
      },
      {
        id: 'what-to-include',
        title: 'What to Include in a 1st Birthday Invitation',
        content:
          '✅ **Baby\'s full name** — Bold, prominent, center stage\n✅ **The milestone** — "Turning 1!" or "Our little one is 1!" or "पहला जन्मदिन"\n✅ **Date, time, and venue** — With full address and landmark\n✅ **Parents\' names** — "Hosted by [Parent Names]"\n✅ **RSVP contact** — Parents\' phone number or WhatsApp\n✅ **Baby\'s photo** — An adorable recent photo\n✅ **Dress code** (optional) — Theme colors if you have a party theme\n✅ **Registry info** (optional) — If you prefer specific gifts',
      },
      {
        id: 'cta',
        title: 'Start Your Baby\'s 1st Birthday Invitation',
        content: 'Free to design and preview. Create a first birthday invitation as magical as the day itself.',
        cta: { text: 'Create 1st Birthday Card', href: '/templates?event=birthday' },
      },
    ],
    faqs: [
      {
        question: 'Can I add a baby photo to the 1st birthday invitation?',
        answer: 'Yes! All templates support photo uploads. A cute baby photo makes the first birthday invitation personal and unforgettable. Simply upload from your phone in the editor.',
      },
      {
        question: 'Can I write Hindi text on the 1st birthday invitation?',
        answer: 'Yes. You can type Hindi text in the custom message or name fields. For a bilingual card, add the English details in the main fields and add Hindi blessings or the baby\'s name in Hindi in the message field.',
      },
      {
        question: 'What makes a first birthday invitation different from a regular birthday card?',
        answer: 'A first birthday invitation typically places more emphasis on the milestone ("Turning 1!"), includes the baby\'s photo prominently, and often has a warmer, more celebratory tone since it\'s a major family event in India.',
      },
      {
        question: 'How early should I send first birthday invitations?',
        answer: 'For a large family event, send invitations 2–3 weeks in advance so relatives can make travel arrangements. For local guests, 1–2 weeks is usually sufficient.',
      },
      {
        question: 'Can I get a printable version of the 1st birthday invitation?',
        answer: 'Yes. The Print-Ready plan (₹99) includes a print-quality PDF optimized for A5 size at 300 DPI, perfect for physical invitations to distribute to family.',
      },
    ],
    relatedPages: [
      { title: 'Kids Birthday Invitation', href: '/kids-birthday-invitation' },
      { title: 'Birthday Invitation Card', href: '/birthday-invitation-card' },
      { title: 'Baby Shower Invitation', href: '/baby-shower-invitation' },
      { title: 'Party Invitation Card', href: '/party-invitation-card' },
    ],
  },

  // =============================================================================
  // NEW PAGES — CORPORATE SUB-PAGES
  // =============================================================================

  'office-party-invitation': {
    slug: 'office-party-invitation' as SEOPageContent['slug'],
    title: 'Office Party Invitation – Annual Day & Work Party Designs',
    description:
      'Create professional yet fun office party invitation cards online. Annual day, year-end party, team celebrations. Clean templates, company branding, free preview.',
    keywords: [
      'office party invitation',
      'office party invitation card',
      'annual day invitation',
      'company party invitation',
      'work party invitation India',
      'corporate party invitation card maker',
      'office celebration invitation',
    ],
    mainKeyword: 'office party invitation',
    ogTitle: 'Office Party Invitation Card Maker | InviteHub.in',
    ogDescription: 'Professional office party invitations for annual day, year-end parties & team events.',
    heroImage: EVENT_HERO_IMAGES.corporate,
    highlights: [
      { icon: '🎉', label: 'Party-Ready Designs', desc: 'Fun yet professional look' },
      { icon: '🏢', label: 'Company Branding', desc: 'Add your company logo' },
      { icon: '📅', label: 'Event Details', desc: 'Time, venue, dress code' },
      { icon: '📧', label: 'Easy Distribution', desc: 'Email & WhatsApp friendly' },
    ],
    sections: [
      {
        id: 'hero',
        title: 'Office Party Invitation Cards — Professional Meets Celebration',
        content:
          'Make your office party the most anticipated event of the year with a stunning invitation. Add your company name, event details, venue, dress code, and share it across your organization in seconds.',
        cta: { text: 'Browse Office Party Templates', href: '/templates?event=corporate' },
      },
      {
        id: 'event-types',
        title: 'Perfect for Every Type of Office Party',
        content:
          '**🏆 Annual Day Celebrations** — The biggest office event of the year deserves an invitation that builds excitement. Bold designs with your company colors.\n\n**🎄 Year-End / Christmas Party** — Festive designs that work across all communities and cultures.\n\n**🎂 Company Anniversary or Milestone** — Mark your company\'s founding day or major milestone with an elegant corporate invitation.\n\n**🎊 Project Success Celebration** — Reward the team with a fun party invitation that acknowledges the win.\n\n**🌿 Team Lunch or Breakfast** — Even a simple team lunch deserves a thoughtful invitation to make everyone feel valued.',
      },
      {
        id: 'cta',
        title: 'Create Your Office Party Invitation',
        content: 'Free to preview. Professional quality in 2 minutes. Your team will love it.',
        cta: { text: 'Design Office Party Card', href: '/templates?event=corporate' },
      },
    ],
    faqs: [
      {
        question: 'Can I add our company logo to the office party invitation?',
        answer: 'Yes. Upload your company logo using the logo/photo field in the editor. It appears at the top of the card for brand-consistent communication.',
      },
      {
        question: 'Can I include dress code on the invitation?',
        answer: 'Yes. Add dress code, theme, and any other instructions in the additional details field. For example: "Dress code: Ethnic Wear" or "Theme: Bollywood Night."',
      },
      {
        question: 'Is the invitation suitable for sharing via company email?',
        answer: 'Yes. Download the HD image to attach to email, or use the Digital Suite plan to get a shareable link that can be shared via email, Slack, or Teams.',
      },
    ],
    relatedPages: [
      { title: 'Corporate Event Invitation', href: '/corporate-event-invitation' },
      { title: 'Farewell Invitation Card', href: '/farewell-invitation-card' },
      { title: 'Team Event Invitation', href: '/team-event-invitation' },
      { title: 'Party Invitation Card', href: '/party-invitation-card' },
    ],
  },

  'farewell-invitation-card': {
    slug: 'farewell-invitation-card' as SEOPageContent['slug'],
    title: 'Farewell Invitation Card – Say Goodbye in Style',
    description:
      'Create heartfelt farewell invitation cards online for colleagues, friends, and coworkers. Warm designs for farewell parties. Free preview, HD downloads from ₹49. Share on WhatsApp.',
    keywords: [
      'farewell invitation card',
      'farewell party invitation',
      'farewell card maker online',
      'goodbye party invitation India',
      'office farewell invitation',
      'farewell invitation design',
      'colleague farewell card',
    ],
    mainKeyword: 'farewell invitation card',
    ogTitle: 'Farewell Invitation Card Maker | InviteHub.in',
    ogDescription: 'Beautiful farewell party invitations for colleagues & friends. Heartfelt designs. Free to start.',
    heroImage: EVENT_HERO_IMAGES.birthday,
    highlights: [
      { icon: '👋', label: 'Heartfelt Designs', desc: 'Warm farewell templates' },
      { icon: '💼', label: 'Office-Appropriate', desc: 'Professional yet emotional' },
      { icon: '📸', label: 'Photo Ready', desc: 'Add a team or personal photo' },
      { icon: '📱', label: 'Easy Sharing', desc: 'WhatsApp & email friendly' },
    ],
    sections: [
      {
        id: 'hero',
        title: 'Farewell Invitation Cards — Honor Every Goodbye',
        content:
          'A farewell is a celebration of someone\'s journey and a warm send-off for the road ahead. Create a beautiful farewell invitation card that captures the emotion and warmth of the moment.',
        cta: { text: 'Browse Farewell Templates', href: '/templates?event=corporate' },
      },
      {
        id: 'types',
        title: 'Types of Farewell Events We Support',
        content:
          '**💼 Colleague Farewell** — When a teammate moves to a new job, city, or country. Acknowledge their contribution with a thoughtful farewell gathering.\n\n**🎓 Retirement Send-Off** — Celebrate decades of dedicated service with a grand retirement farewell party.\n\n**🏫 School / College Farewell** — The classic farewell party at the end of the academic year. Create memories with a beautiful invitation.\n\n**👥 Friend Group Farewell** — When someone from your close circle moves away. Make the goodbye memorable.',
      },
      {
        id: 'cta',
        title: 'Create a Farewell Invitation They\'ll Remember',
        content: 'A beautiful farewell invitation sets the tone for an unforgettable send-off. Free to design and preview.',
        cta: { text: 'Design Farewell Card', href: '/templates?event=corporate' },
      },
    ],
    faqs: [
      {
        question: 'Can I add a photo to the farewell invitation card?',
        answer: 'Yes! Upload a team photo or a photo of the person being farewelled. It makes the invitation personal and memorable.',
      },
      {
        question: 'Can I use farewell invitation templates for retirement parties?',
        answer: 'Absolutely. Our farewell templates work well for retirement parties, colleague farewells, school farewell parties, and any send-off celebration.',
      },
      {
        question: 'Can I add a heartfelt message on the farewell card?',
        answer: 'Yes. Use the custom message field to add a personal note like "Thank you for being an incredible colleague" or a quote that reflects your relationship.',
      },
    ],
    relatedPages: [
      { title: 'Corporate Event Invitation', href: '/corporate-event-invitation' },
      { title: 'Office Party Invitation', href: '/office-party-invitation' },
      { title: 'Get Together Invitation', href: '/get-together-invitation' },
      { title: 'Party Invitation Card', href: '/party-invitation-card' },
    ],
  },

  'team-event-invitation': {
    slug: 'team-event-invitation' as SEOPageContent['slug'],
    title: 'Team Outing Invitation – Corporate Team Event Designs',
    description:
      'Create fun team outing invitation cards online. Team picnics, off-sites, team-building events, and corporate outings. Free preview, HD downloads. Share instantly.',
    keywords: [
      'team outing invitation',
      'team event invitation',
      'team outing invitation card',
      'corporate outing invitation',
      'team building invitation India',
      'office outing invitation card maker',
    ],
    mainKeyword: 'team outing invitation',
    ogTitle: 'Team Outing Invitation Card Maker | InviteHub.in',
    ogDescription: 'Fun team outing invitations for picnics, off-sites & team-building events. Free to start.',
    heroImage: EVENT_HERO_IMAGES.corporate,
    highlights: [
      { icon: '🏕️', label: 'Outing Ready', desc: 'Fun designs for team outings' },
      { icon: '🎯', label: 'Team Building', desc: 'Rally the whole team' },
      { icon: '📍', label: 'Location Details', desc: 'Clear venue & meetup info' },
      { icon: '📱', label: 'Share Instantly', desc: 'WhatsApp & Slack friendly' },
    ],
    sections: [
      {
        id: 'hero',
        title: 'Team Outing Invitation Cards — Rally Your Crew',
        content:
          'Build team spirit with a fun, well-designed outing invitation. Add event details, pickup points, dress code, and activities — then share with the whole team in seconds.',
        cta: { text: 'Browse Team Event Templates', href: '/templates?event=corporate' },
      },
      {
        id: 'event-types',
        title: 'Team Events We Cover',
        content:
          '**🏕️ Team Picnics & Outings** — Day trips to resorts, parks, or outdoor venues. Fun and casual designs.\n\n**🏋️ Team Building Activities** — Sports days, workshops, hackathons, and collaborative activities.\n\n**✈️ Off-Site Retreats** — Overnight or multi-day company retreats. More formal and detailed invitations.\n\n**🎳 Fun Activities** — Bowling, bowling, go-karting, escape rooms — lighthearted designs that set the fun tone.',
      },
      {
        id: 'cta',
        title: 'Create Your Team Event Invitation',
        content: 'Get your team excited with a well-designed invitation. Free to preview.',
        cta: { text: 'Design Team Outing Card', href: '/templates?event=corporate' },
      },
    ],
    faqs: [
      {
        question: 'Can I include activity details on the team outing invitation?',
        answer: 'Yes. Use the agenda or additional details field to list activities, dress code, what to bring, and meeting point information.',
      },
      {
        question: 'Can I share the team event invitation on WhatsApp or Slack?',
        answer: 'Yes. Download the HD image for sharing anywhere, or use the Digital Suite for a shareable link. The link works perfectly in Slack, Teams, WhatsApp groups, and email.',
      },
    ],
    relatedPages: [
      { title: 'Corporate Event Invitation', href: '/corporate-event-invitation' },
      { title: 'Office Party Invitation', href: '/office-party-invitation' },
      { title: 'Farewell Invitation Card', href: '/farewell-invitation-card' },
      { title: 'Get Together Invitation', href: '/get-together-invitation' },
    ],
  },

  // =============================================================================
  // NEW PAGES — GODH BHARAI (INDIAN BABY SHOWER)
  // =============================================================================

  'godh-bharai-invitation': {
    slug: 'godh-bharai-invitation' as SEOPageContent['slug'],
    title: 'Godh Bharai Invitation Card – गोद भराई Invitation Designs',
    description:
      'Create beautiful godh bharai invitation cards online. Traditional Indian baby shower ceremony designs — warm colors, auspicious text, family details. Free preview, share on WhatsApp.',
    keywords: [
      'godh bharai invitation card',
      'godh bharai invitation',
      'godh bharai card maker',
      'goad bharai invitation online',
      'indian baby shower invitation',
      'godh bharai card design',
      'baby shower godh bharai invitation India',
      'गोद भराई invitation card',
    ],
    mainKeyword: 'godh bharai invitation card',
    ogTitle: 'Godh Bharai Invitation Card Maker | InviteHub.in',
    ogDescription: 'Design beautiful godh bharai (Indian baby shower) invitations. Warm, traditional designs. Free to start.',
    heroImage: EVENT_HERO_IMAGES['baby-shower'],
    highlights: [
      { icon: '🌸', label: 'Traditional Design', desc: 'Auspicious colors & motifs' },
      { icon: '🙏', label: 'Blessings Ready', desc: 'Add shubh sandesh & puja details' },
      { icon: '👨‍👩‍👧', label: 'Family-Forward', desc: 'Host family names & details' },
      { icon: '📱', label: 'Share Instantly', desc: 'WhatsApp the whole family' },
    ],
    sections: [
      {
        id: 'hero',
        title: 'Godh Bharai Invitation Cards — Celebrate the Blessing of New Life',
        content:
          'Godh Bharai (गोद भराई) is one of the most joyful and sacred ceremonies in Indian culture — a beautiful ritual blessing the expecting mother before her baby arrives. Create an invitation that honors this tradition with warmth, auspiciousness, and love.',
        cta: { text: 'Browse Godh Bharai Templates', href: '/templates?event=baby-shower' },
      },
      {
        id: 'what-is-godh-bharai',
        title: 'What Is Godh Bharai? (गोद भराई)',
        content:
          'Godh Bharai literally means "filling the lap" — the ceremony where the expecting mother\'s lap is filled with flowers, fruits, gifts, and blessings as a symbol of abundance and prosperity for the coming child.\n\nThis traditional ceremony, observed widely across North India, Rajasthan, UP, MP, Gujarat, and Haryana, typically includes:\n\n• **Puja and prayers** for the health of mother and child\n• **Elders blessing** the expecting mother with gifts, sweets, and gold\n• **Mehendi and music** — festive celebrations among women\n• **Feast** — traditional food prepared by the host family\n• **Gift-giving** — clothes, jewelry, and household items for the baby\n\nA Godh Bharai invitation sets the tone for this sacred and joyful occasion.',
      },
      {
        id: 'design-details',
        title: 'What Goes Into a Godh Bharai Invitation',
        content:
          '✅ **Expecting mother\'s name** — The guest of honor, prominently displayed\n✅ **Expected arrival month** — "Baby arriving [Month Year]"\n✅ **Ceremony date, time, and venue** — With full address and landmarks\n✅ **Host family names** — Mother-in-law, mother, sisters, or the couple\'s names\n✅ **Puja timing / muhurat** — Auspicious time for the ceremony\n✅ **Dress code** — Often ethnic wear; specify if there\'s a color theme\n✅ **RSVP contact** — For food planning and seating arrangement\n✅ **Warm message** — "Join us in blessing our little one" or "आपके आशीर्वाद की प्रतीक्षा है"',
      },
      {
        id: 'why-digital',
        title: 'Why Use a Digital Godh Bharai Invitation?',
        content:
          'Traditional printed Godh Bharai cards take days to print and are hard to update. With InviteHub, you get:\n\n**📲 Instant sharing** — Send to family WhatsApp groups the moment it\'s ready\n**🔄 Easy updates** — Change venue or timing without reprinting\n**💰 Cost savings** — No printing cost for digital invites; ₹49–₹99 for HD download vs. ₹500+ for printing\n**🌍 Reach relatives everywhere** — Share the same link with relatives in different cities instantly\n**📸 Photo option** — Add a pregnancy photoshoot image for a beautiful personalized card',
      },
      {
        id: 'cta',
        title: 'Create Your Godh Bharai Invitation Card',
        content: 'Honor this sacred tradition with a beautiful, personalized invitation. Free to design and preview. Ready in 2 minutes.',
        cta: { text: 'Design Godh Bharai Card', href: '/templates?event=baby-shower' },
      },
    ],
    faqs: [
      {
        question: 'What is godh bharai and how is it different from a baby shower?',
        answer: 'Godh Bharai (गोद भराई) is the traditional Indian ceremony equivalent to a Western baby shower. While a baby shower focuses on gifts and games, Godh Bharai includes religious rituals, elder blessings, mehendi, and a community feast. It\'s a more formal, spiritual celebration rooted in Indian tradition.',
      },
      {
        question: 'Can I add Hindi text to the godh bharai invitation?',
        answer: 'Yes. You can type Hindi text in the name, message, and additional details fields. Add Sanskrit blessings, Hindi shlokas, or a warm message in Hindi like "आपके आशीर्वाद की प्रतीक्षा है" to make the invitation feel authentically Indian.',
      },
      {
        question: 'What colors are traditional for godh bharai invitations?',
        answer: 'Traditional Godh Bharai invitations use warm, auspicious colors — saffron orange, mauve pink, deep rose, gold, and warm cream. Our Traditional Indian template works beautifully for this ceremony.',
      },
      {
        question: 'Can I mention puja details and muhurat on the invitation?',
        answer: 'Yes. Use the additional details or event time field to include the muhurat (auspicious timing), puja details, and any ceremony-specific instructions.',
      },
      {
        question: 'Who hosts a godh bharai ceremony?',
        answer: 'Godh Bharai is traditionally hosted by the expecting mother\'s in-laws (sasuraal) or her maternal family (maika) — sometimes both. You can mention both families\' names as hosts on the invitation.',
      },
      {
        question: 'How early should I send godh bharai invitations?',
        answer: 'Send godh bharai invitations 2–3 weeks before the ceremony. Since relatives may need to travel, giving enough advance notice ensures maximum attendance.',
      },
    ],
    relatedPages: [
      { title: 'Baby Shower Invitation', href: '/baby-shower-invitation' },
      { title: 'Birthday Invitation Card', href: '/birthday-invitation-card' },
      { title: '1st Birthday Invitation', href: '/1st-birthday-invitation' },
      { title: 'Housewarming Invitation', href: '/housewarming-invitation' },
    ],
  },

  // =============================================================================
  // NEW PAGES — CASUAL PARTY PAGES
  // =============================================================================

  'party-invitation-card': {
    slug: 'party-invitation-card' as SEOPageContent['slug'],
    title: 'Party Invitation Card – Design Online Free',
    description:
      'Create fun party invitation cards online in minutes. Birthday parties, get-togethers, kitty parties, house parties. Free templates, live preview, HD downloads from ₹49.',
    keywords: [
      'party invitation card',
      'party invitation card maker',
      'online party invitation',
      'party invite design India',
      'digital party invitation card',
      'party invitation card free',
      'make party invitation online',
    ],
    mainKeyword: 'party invitation card',
    ogTitle: 'Party Invitation Card Maker | InviteHub.in',
    ogDescription: 'Design beautiful party invitation cards online. Free templates, HD downloads from ₹49.',
    heroImage: EVENT_HERO_IMAGES.birthday,
    highlights: [
      { icon: '🎉', label: 'Any Party Type', desc: 'Birthday, kitty, house party & more' },
      { icon: '⚡', label: 'Ready in 2 Minutes', desc: 'Fast and easy party planning' },
      { icon: '📱', label: 'WhatsApp Ready', desc: 'Share with all your guests' },
      { icon: '💰', label: 'Free to Start', desc: 'Upgrade from ₹49 for HD' },
    ],
    sections: [
      {
        id: 'hero',
        title: 'Party Invitation Cards — Make Your Party Unmissable',
        content:
          'A great party starts with a great invitation. Design a party invitation card that gets your guests excited, fills them in on all the details, and makes them feel included — before the fun even begins.',
        cta: { text: 'Browse Party Templates', href: '/templates' },
      },
      {
        id: 'party-types',
        title: 'Any Party, Any Occasion',
        content:
          '**🎂 Birthday Parties** — From kids\' parties to milestone adult birthdays.\n\n**🐱 Kitty Parties** — Regular ladies\' get-togethers that deserve a fun, themed invitation.\n\n**🏠 House Parties** — Casual home gatherings with friends and family.\n\n**🎊 Get-Together Parties** — Reunion parties, college group meetups, friend circles.\n\n**🌟 Theme Parties** — Bollywood night, retro theme, festive party — any theme works!\n\n**🎉 Surprise Parties** — Shhh! Create a secret party invitation for the ultimate surprise.',
      },
      {
        id: 'cta',
        title: 'Create Your Party Invitation Card Now',
        content: 'Free to design. Your perfect party invitation is ready in 2 minutes — no design skills needed!',
        cta: { text: 'Make Party Card', href: '/templates' },
      },
    ],
    faqs: [
      {
        question: 'Can I make a party invitation card for free?',
        answer: 'Yes! Design your party invitation, preview it live, and download a watermarked PNG for free. Upgrade from ₹49 for a high-quality HD download without watermark.',
      },
      {
        question: 'What types of parties can I make invitations for?',
        answer: 'Any type! Birthday parties, kitty parties, house parties, get-togethers, theme parties, surprise parties, festive parties — InviteHub works for all of them.',
      },
      {
        question: 'Can I add a theme or dress code to the party invitation?',
        answer: 'Yes. Use the additional details field to specify a party theme (e.g., "Bollywood Night!") or dress code (e.g., "All black attire"). It appears as a note on the card.',
      },
      {
        question: 'Can I share my party invitation on Instagram?',
        answer: 'Absolutely. Download the HD PNG (₹49) and share it directly as an Instagram post or story. The portrait orientation works perfectly for IG stories.',
      },
    ],
    relatedPages: [
      { title: 'Birthday Invitation Card', href: '/birthday-invitation-card' },
      { title: 'Kitty Party Invitation', href: '/kitty-party-invitation' },
      { title: 'Get Together Invitation', href: '/get-together-invitation' },
      { title: 'Kids Birthday Invitation', href: '/kids-birthday-invitation' },
    ],
  },

  'kitty-party-invitation': {
    slug: 'kitty-party-invitation' as SEOPageContent['slug'],
    title: 'Kitty Party Invitation Card – Ladies Get-Together Designs',
    description:
      'Create stylish kitty party invitation cards online. Ladies\' get-together, monthly kitty, theme party designs. Free preview, HD downloads from ₹49. Share on WhatsApp instantly.',
    keywords: [
      'kitty party invitation',
      'kitty party invitation card',
      'kitty party invitation card maker',
      'ladies kitty party invitation',
      'kitty party invite online India',
      'monthly kitty party card',
      'ladies get together invitation',
    ],
    mainKeyword: 'kitty party invitation',
    ogTitle: 'Kitty Party Invitation Card Maker | InviteHub.in',
    ogDescription: 'Stylish kitty party invitations for ladies\' get-togethers. Free to design, share on WhatsApp.',
    heroImage: EVENT_HERO_IMAGES.birthday,
    highlights: [
      { icon: '👑', label: 'Stylish Designs', desc: 'Gold, floral & chic themes' },
      { icon: '🌸', label: 'Ladies Ready', desc: 'Feminine, elegant templates' },
      { icon: '📅', label: 'Monthly Meets', desc: 'Easy to update for each party' },
      { icon: '📱', label: 'WhatsApp Perfect', desc: 'Share in your kitty group' },
    ],
    sections: [
      {
        id: 'hero',
        title: 'Kitty Party Invitation Cards — Styled for the Ladies',
        content:
          'Your monthly kitty party deserves a fabulous invitation! Create a stylish, fun kitty party card with the party details, theme, and dress code — then share it in your ladies\' group with one tap.',
        cta: { text: 'Browse Kitty Party Templates', href: '/templates' },
      },
      {
        id: 'what-is-kitty',
        title: 'What Is a Kitty Party?',
        content:
          'A kitty party is a regular ladies\' get-together — monthly or weekly — where a group of women meet for food, fun, games, and a rotating "kitty" (pot money). It\'s one of the most popular social traditions among Indian women, especially in cities like Delhi, Mumbai, Jaipur, Chandigarh, and Lucknow.\n\n**Why kitty parties love digital invitations:**\n• They happen every month — a fresh digital invite each time is easy and fun\n• WhatsApp groups make sharing instant — paste the link or image and done!\n• Themed parties (Rajasthani night, Bollywood theme, Saree party) need matching invites\n• It sets the tone and builds excitement before the party',
      },
      {
        id: 'themes',
        title: 'Popular Kitty Party Themes & Matching Invitations',
        content:
          '**🏮 Rajasthani Night** — Rich maroon and gold designs with traditional motifs\n\n**🎬 Bollywood Night** — Film-poster style designs, bold typography\n\n**🌸 Garden Party** — Soft floral designs, pastel tones\n\n**👗 Saree Party** — Elegant, silk-texture designs\n\n**💄 Glamour Night** — Sparkly, glittery designs for a dressy affair\n\n**🥘 Potluck Party** — Fun, food-themed designs\n\n**🪔 Festive Kitty (Diwali, Holi, Navratri)** — Seasonal festive designs',
      },
      {
        id: 'cta',
        title: 'Create Your Kitty Party Invitation',
        content: 'Your ladies\' group will love a beautiful invitation! Free to design, ready in 2 minutes.',
        cta: { text: 'Design Kitty Party Card', href: '/templates' },
      },
    ],
    faqs: [
      {
        question: 'Can I make a themed kitty party invitation?',
        answer: 'Yes! Our templates work well for themed kitty parties. Choose a template that matches your theme (Traditional Indian for ethnic nights, Elegant Gold for glamour parties), customize the text and details, and download.',
      },
      {
        question: 'Can I reuse the template for monthly kitty parties?',
        answer: 'Yes. Each time you want to create a new invitation, start fresh in the editor, pick the same template, and update the date and theme details. It takes less than 5 minutes for repeat parties.',
      },
      {
        question: 'Can I add dress code and theme to the kitty party invitation?',
        answer: 'Absolutely. Use the additional details field to mention the dress code (e.g., "Saree mandatory!"), theme, potluck assignment, or any fun instruction for the ladies.',
      },
      {
        question: 'Can I share the kitty party invitation on WhatsApp status?',
        answer: 'Yes. Download the HD PNG (₹49) and share it as your WhatsApp status or in your kitty party group. The vertical card format is perfect for WhatsApp status.',
      },
    ],
    relatedPages: [
      { title: 'Party Invitation Card', href: '/party-invitation-card' },
      { title: 'Get Together Invitation', href: '/get-together-invitation' },
      { title: 'Birthday Invitation Card', href: '/birthday-invitation-card' },
      { title: 'Anniversary Invitation', href: '/anniversary-invitation' },
    ],
  },

  'get-together-invitation': {
    slug: 'get-together-invitation' as SEOPageContent['slug'],
    title: 'Get Together Invitation Card – Reunion & Gathering Designs',
    description:
      'Create warm get-together invitation cards online. Family reunions, friend gatherings, college reunions, and casual get-togethers. Free to design, HD downloads from ₹49.',
    keywords: [
      'get together invitation card',
      'get together invitation',
      'family reunion invitation',
      'friend get together invitation',
      'casual gathering invitation India',
      'reunion party invitation card',
      'get together card maker online',
    ],
    mainKeyword: 'get together invitation card',
    ogTitle: 'Get Together Invitation Card Maker | InviteHub.in',
    ogDescription: 'Warm get-together invitations for family reunions & friend gatherings. Free to start.',
    heroImage: EVENT_HERO_IMAGES.birthday,
    highlights: [
      { icon: '🤝', label: 'Reunion Ready', desc: 'Warm designs for get-togethers' },
      { icon: '👨‍👩‍👧‍👦', label: 'Family & Friends', desc: 'Any gathering, any occasion' },
      { icon: '😊', label: 'Casual & Fun', desc: 'Relaxed, friendly tone' },
      { icon: '📱', label: 'Share in Groups', desc: 'WhatsApp group ready' },
    ],
    sections: [
      {
        id: 'hero',
        title: 'Get Together Invitation Cards — Bring Everyone Together',
        content:
          'Life gets busy — a good get-together invitation is the perfect nudge to bring everyone together again. Whether it\'s a family reunion, college batch meetup, or a casual friends\' gathering, create an invitation that makes it easy to say yes.',
        cta: { text: 'Browse Get Together Templates', href: '/templates' },
      },
      {
        id: 'occasion-types',
        title: 'Get-Togethers We Cover',
        content:
          '**👨‍👩‍👧‍👦 Family Reunion** — Annual or special occasion family gatherings. Multi-generational celebrations.\n\n**🎓 College / School Reunion** — Batch reunions, alumni meetups, and school anniversary get-togethers.\n\n**👯 Friends\' Get-Together** — Casual weekend plans, birthday dinners, house parties.\n\n**🍽️ Potluck Parties** — Everyone brings a dish — the most fun way to host!\n\n**🌃 Diwali / Holi / Festival Gathering** — Festive get-togethers with close ones.\n\n**🏠 Neighbourhood / Society Events** — Building society parties, colony get-togethers.',
      },
      {
        id: 'cta',
        title: 'Create Your Get Together Invitation',
        content: 'Bring everyone together with a beautiful invitation. Free to design, ready in minutes.',
        cta: { text: 'Make Get Together Card', href: '/templates' },
      },
    ],
    faqs: [
      {
        question: 'Can I make a casual get-together invitation for free?',
        answer: 'Yes! Design and preview your invitation completely free. Download a watermarked PNG at no cost or upgrade from ₹49 for an HD version without watermark.',
      },
      {
        question: 'Can I use InviteHub for a family reunion invitation?',
        answer: 'Absolutely. Our templates work well for family reunions — add the family name, reunion date, venue, and a warm welcome message. Share the link in your family WhatsApp group.',
      },
      {
        question: 'Can I include potluck or dish assignments on the invitation?',
        answer: 'Yes. Use the additional details field to mention potluck instructions — for example, "Please bring a main course or dessert" or assign dishes to families/friend groups.',
      },
      {
        question: 'Can I share a get-together invitation in a WhatsApp group?',
        answer: 'Yes. Share the HD image directly in any WhatsApp group, or upgrade to the Digital Suite (₹99) for a shareable link that anyone can open on any device.',
      },
    ],
    relatedPages: [
      { title: 'Party Invitation Card', href: '/party-invitation-card' },
      { title: 'Kitty Party Invitation', href: '/kitty-party-invitation' },
      { title: 'Birthday Invitation Card', href: '/birthday-invitation-card' },
      { title: 'Anniversary Invitation', href: '/anniversary-invitation' },
    ],
  },
};
