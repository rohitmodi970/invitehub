import type { SEOPageContent, SEOPageSlug } from './types';
import { EVENT_SEO_PAGES } from './event-pages';

const WEDDING_SEO_PAGES: Record<string, SEOPageContent> = {
  'wedding-invitation-card-maker': {
    slug: 'wedding-invitation-card-maker',
    title: 'Wedding Invitation Card Maker – Design Beautiful Cards Online | InviteHub.in',
    description:
      'Create stunning wedding invitation cards online in minutes. Choose from 5+ elegant templates, add your details, and download HD PNG or PDF. Free to start. Trusted by couples across India.',
    keywords: [
      'wedding invitation card maker',
      'online wedding invitation maker',
      'digital wedding invitation card maker',
      'create wedding invitation card online',
      'wedding card maker free',
      'wedding invitation design online',
    ],
    mainKeyword: 'wedding invitation card maker',
    ogTitle: 'Wedding Invitation Card Maker | InviteHub.in',
    ogDescription:
      'Design and share beautiful wedding invitation cards in minutes. Free to start. Premium HD downloads from ₹49.',

    heroImage: '/Wedding invitation on modern desk setup.png',

    highlights: [
      { icon: '🎨', label: '5+ Premium Templates', desc: 'Traditional, Modern, Royal, Vintage & more' },
      { icon: '⚡', label: 'Ready in 2 Minutes', desc: 'Fill details, preview live, download instantly' },
      { icon: '📱', label: 'Mobile Friendly', desc: 'Shareable link works on all devices' },
      { icon: '💰', label: 'Free to Start', desc: 'Upgrade from ₹49 for HD, no watermark' },
    ],

    sections: [
      {
        id: 'hero',
        title: 'Wedding Invitation Card Maker — Free, Elegant & Instant',
        content:
          'InviteHub.in is India\'s simplest wedding invitation card maker. Choose a beautiful template, enter your event details, and get a stunning digital or printable card in under 2 minutes — no design skills needed.',
        cta: { text: 'Start Making Your Card', href: '/templates' },
      },
      {
        id: 'how-it-works',
        title: 'How to Make a Wedding Invitation Card in 3 Steps',
        content:
          '**Step 1 — Choose Your Template:**\nBrowse our curated collection of wedding templates — Elegant Gold, Royal Purple, Traditional Indian, Modern Geometric, and Romantic Vintage. Each template is designed by professionals.\n\n**Step 2 — Fill in Your Details:**\nAdd bride & groom names, wedding date and time, venue name and address, contact number, and an optional couple photo. See every change update live in your preview.\n\n**Step 3 — Download & Share:**\nDownload your card as a watermark-free HD PNG (₹49), print-quality PDF (₹99), or get a full digital invitation page with RSVP, countdown timer, and Google Maps integration (₹99).',
      },
      {
        id: 'features',
        title: 'Everything You Need in a Wedding Invitation Maker',
        content:
          '✅ **Live Preview** — See every change instantly as you type. No waiting, no reloads.\n✅ **5+ Professionally Designed Templates** — From traditional Indian to minimalist modern.\n✅ **Couple Photo Upload** — Add your photo directly to the invitation card.\n✅ **Free Watermarked Download** — Download instantly, upgrade to remove watermark.\n✅ **HD PNG & PDF Downloads** — Print-quality exports for physical invitations.\n✅ **Matching Envelope Design** — Premium plans include a template-matched envelope.\n✅ **Digital Invitation Page** — Shareable URL with countdown timer, Google Maps & RSVP.\n✅ **WhatsApp & Social Sharing** — Share your invitation link with one tap.',
      },
      {
        id: 'why',
        title: 'Why Choose InviteHub.in for Your Wedding Invitation?',
        content:
          'Traditional invitation printing takes days and costs thousands. InviteHub gives you professional-quality results in minutes, at a fraction of the cost.\n\nOur cards look premium — clean typography, elegant color palettes, ornamental borders — designed specifically for Indian weddings across Hindu, Muslim, Christian, Sikh, and other communities.\n\nMore than 500+ couples have already trusted InviteHub to share their big day. The platform is built to be simple: no sign-up required to start, no design experience needed, and instant delivery after payment.',
      },
      {
        id: 'pricing',
        title: 'Simple, Transparent Pricing',
        content:
          '**Free** — Create your invitation, live preview, watermarked download, shareable link.\n\n**Basic (₹49)** — HD PNG download with no watermark. Ideal for sharing digitally.\n\n**Print-Ready (₹99)** — HD PNG + print-quality PDF + matching envelope design. Perfect for printing.\n\n**Digital Suite (₹99)** — HD PNG + PDF + dedicated invitation page with RSVP, countdown timer, Google Maps, and analytics.',
      },
      {
        id: 'cta',
        title: 'Start Creating Your Wedding Invitation Card Today',
        content:
          'Join hundreds of couples who have used InviteHub.in to create memorable, beautiful wedding invitations. Free to start — no credit card, no account needed.',
        cta: { text: 'Browse All Templates', href: '/templates' },
      },
    ],

    faqs: [
      {
        question: 'Is the wedding invitation card maker really free?',
        answer:
          'Yes! You can create your invitation, preview it live, and download a watermarked version completely free. To get HD downloads without watermarks or a PDF version, plans start from ₹49.',
      },
      {
        question: 'Do I need to create an account to use InviteHub?',
        answer:
          'No account is required to start designing. You only need to verify your email with a one-time OTP when you download a premium version, so we can send your download link.',
      },
      {
        question: 'Can I add my couple photo to the invitation card?',
        answer:
          'Yes! All templates support couple photo uploads. Your photo is displayed beautifully within the card design. Simply click the photo field in the editor and upload your image.',
      },
      {
        question: 'How long does it take to create a wedding invitation card?',
        answer:
          'Most couples complete their invitation in under 2 minutes. You choose a template, fill in your details, and download — it\'s that fast.',
      },
      {
        question: 'What file formats can I download my invitation in?',
        answer:
          'Free: Watermarked PNG. Basic (₹49): HD PNG without watermark. Print-Ready (₹99): HD PNG + print-quality PDF + envelope design. All downloads are high resolution.',
      },
      {
        question: 'Can I download a PDF for printing physical invitations?',
        answer:
          'Yes. PDF downloads are available with the Print-Ready (₹99) and Digital Suite (₹99) plans. The PDF is optimized for A5 paper at print quality.',
      },
      {
        question: 'Do you have templates for traditional Indian weddings?',
        answer:
          'Yes! We have a dedicated Traditional Indian template with Hindi text (शुभ विवाह), deep red and gold colors, and ornamental mandala designs. More Indian regional templates are coming soon.',
      },
      {
        question: 'Can I share my invitation online via WhatsApp?',
        answer:
          'Absolutely. Every invitation gets a unique shareable link (e.g., invitehub.in/i/priya-rahul) that you can share on WhatsApp, Instagram, email, or any platform. The Digital Suite plan includes a premium page with RSVP, countdown timer, and Google Maps integration.',
      },
    ],

    relatedPages: [
      { title: 'Digital Wedding Card', href: '/digital-wedding-card' },
      { title: 'Marriage Invitation Card', href: '/marriage-invitation-card' },
      { title: 'Online Wedding Invitation', href: '/online-wedding-invitation' },
      { title: 'Wedding Card Maker', href: '/wedding-card-maker' },
    ],
  },

  'marriage-invitation-card': {
    slug: 'marriage-invitation-card',
    title: 'Marriage Invitation Card – Elegant Digital & Printable Designs | InviteHub.in',
    description:
      'Design a beautiful marriage invitation card online. Traditional Indian, modern, royal, and floral styles. Free to preview, download from ₹49. Share instantly on WhatsApp.',
    keywords: [
      'marriage invitation card',
      'marriage invitation card design',
      'marriage invitation card online',
      'indian marriage invitation card',
      'marriage card design online',
      'create marriage invitation card',
    ],
    mainKeyword: 'marriage invitation card',
    ogTitle: 'Marriage Invitation Card Designer | InviteHub.in',
    ogDescription:
      'Create elegant marriage invitation cards for every style — Traditional, Royal, Modern, Vintage. Free preview. Download from ₹49.',

    heroImage: '/Traditional Indian wedding invitation design.png',

    highlights: [
      { icon: '🕉️', label: 'Traditional Indian Style', desc: 'Red, gold, Sanskrit text designs' },
      { icon: '👑', label: 'Royal & Modern Styles', desc: 'Purple, geometric, vintage options' },
      { icon: '📲', label: 'WhatsApp Ready', desc: 'One link to share with all guests' },
      { icon: '🖨️', label: 'Print Quality PDF', desc: 'Export for physical printing' },
    ],

    sections: [
      {
        id: 'hero',
        title: 'Beautiful Marriage Invitation Cards for Every Culture & Style',
        content:
          'Create and share your marriage invitation card in minutes. InviteHub.in offers elegant designs for Hindu, Muslim, Christian, and Sikh weddings — traditional or modern, your choice.',
        cta: { text: 'Design Your Card Now', href: '/templates' },
      },
      {
        id: 'styles',
        title: 'Marriage Card Styles Available on InviteHub',
        content:
          '**Traditional Indian** — Deep red and gold tones, Sanskrit blessings (शुभ विवाह), ornamental mandala borders. Perfect for Hindu and traditional ceremonies.\n\n**Royal Purple** — Rich jewel tones, regal typography, and gold flourishes. Ideal for grand celebrations.\n\n**Elegant Gold** — Timeless black and gold design, clean and classy. Works for all communities.\n\n**Modern Geometric** — Clean lines, contemporary layout. Great for urban couples.\n\n**Romantic Vintage** — Soft florals, antique paper tones, handwritten-style fonts. Perfect for intimate weddings.',
      },
      {
        id: 'customization',
        title: 'Fully Customizable Marriage Invitation Content',
        content:
          'Every marriage invitation card on InviteHub is 100% editable:\n\n• Bride & Groom names in your chosen style\n• Family details (parents\' names, family blessings)\n• Wedding date, time, and muhurat\n• Venue name and full address\n• Contact number for RSVPs\n• Couple photo (optional)\n• Additional message or poem\n• RSVP details',
      },
      {
        id: 'sharing',
        title: 'Share Your Marriage Invitation Instantly',
        content:
          'Once your card is ready, share it in seconds:\n\n📱 **WhatsApp** — One tap to send to individuals or groups\n📧 **Email** — Professional invitation link\n📸 **Instagram Stories & Posts** — Download and post directly\n🔗 **Unique URL** — A clean link like invitehub.in/i/your-names that guests can access anytime',
      },
      {
        id: 'cta',
        title: 'Create Your Marriage Invitation Card Today',
        content:
          'Free to start. No design experience needed. Your beautiful marriage card is just 2 minutes away.',
        cta: { text: 'Start Designing Free', href: '/templates' },
      },
    ],

    faqs: [
      {
        question: 'What is the difference between a marriage card and a wedding invitation?',
        answer:
          'Marriage card and wedding invitation refer to the same thing — a formal communication sent to guests inviting them to your wedding ceremony. In India, "marriage card" is the more commonly used term.',
      },
      {
        question: 'Can I create a marriage card in Hindi or regional languages?',
        answer:
          'Our Traditional Indian template includes Hindi text (शुभ विवाह). Support for more regional languages including Marathi, Gujarati, Bengali, and Telugu is coming soon.',
      },
      {
        question: 'How many guests can I share the digital marriage invitation with?',
        answer:
          'Unlimited! Once you have your shareable link, you can share it with as many guests as you want via WhatsApp, email, or social media at no extra cost.',
      },
      {
        question: 'Can I include family details in the marriage invitation card?',
        answer:
          'Yes. There is a dedicated Family Details field in the editor where you can add parents\' names, family blessings, and any other family-related content you want displayed on the card.',
      },
      {
        question: 'Is the marriage card design customizable after I download it?',
        answer:
          'You can re-edit and re-download your card anytime by returning to the editor. Changes are auto-saved in your browser session.',
      },
      {
        question: 'What size should I print the marriage invitation card?',
        answer:
          'Our PDF downloads are optimized for A5 size (148mm × 210mm), which is the standard for Indian wedding invitation cards. The resolution is 300+ DPI, suitable for professional printing.',
      },
      {
        question: 'Can I get a matching envelope design for my marriage card?',
        answer:
          'Yes! Our Print-Ready (₹99) and Digital Suite (₹99) plans include a template-matched envelope design that coordinates perfectly with your marriage invitation card.',
      },
      {
        question: 'How do I add a couple photo to the marriage invitation card?',
        answer:
          'In the editor, click the "Couple Photo" field and upload any image from your device. The photo is automatically cropped and styled to fit beautifully within the template.',
      },
    ],

    relatedPages: [
      { title: 'Wedding Invitation Card Maker', href: '/wedding-invitation-card-maker' },
      { title: 'Digital Wedding Card', href: '/digital-wedding-card' },
      { title: 'Online Wedding Invitation', href: '/online-wedding-invitation' },
      { title: 'Wedding Card Maker', href: '/wedding-card-maker' },
    ],
  },

  'digital-wedding-card': {
    slug: 'digital-wedding-card',
    title: 'Digital Wedding Card – Interactive Online Invitations | InviteHub.in',
    description:
      'Create stunning digital wedding cards with countdown timer, RSVP, Google Maps, and WhatsApp sharing. Eco-friendly, instant, and beautiful. Free to start.',
    keywords: [
      'digital wedding card',
      'digital wedding invitation',
      'online wedding card',
      'e-invitation wedding',
      'digital wedding invitation India',
      'whatsapp wedding invitation',
    ],
    mainKeyword: 'digital wedding card',
    ogTitle: 'Digital Wedding Card Creator | InviteHub.in',
    ogDescription:
      'Create interactive digital wedding cards with countdown, RSVP, and Google Maps. Share on WhatsApp instantly.',

    heroImage: '/Modern geometric wedding invitation design.png',

    highlights: [
      { icon: '⏳', label: 'Live Countdown Timer', desc: 'Days, hours, minutes to your big day' },
      { icon: '📍', label: 'Google Maps Link', desc: 'Guests find the venue instantly' },
      { icon: '💌', label: 'Built-in RSVP', desc: 'Collect responses without WhatsApp chaos' },
      { icon: '🌿', label: 'Eco-Friendly', desc: 'Zero paper waste, 100% digital' },
    ],

    sections: [
      {
        id: 'hero',
        title: 'Create Interactive Digital Wedding Cards in Minutes',
        content:
          'Digital wedding cards are the modern way to invite guests — instant, interactive, and beautiful. InviteHub lets you create a professional digital wedding card with a shareable URL, countdown timer, RSVP system, and Google Maps integration.',
        cta: { text: 'Create Your Digital Card', href: '/templates' },
      },
      {
        id: 'why-digital',
        title: 'Why Digital Wedding Cards Are Better',
        content:
          '**⚡ Instant Delivery** — Share with thousands of guests the moment your card is ready. No printing delays, no courier costs.\n\n**💸 Cost-Effective** — Traditional printed cards cost ₹15–₹50 per card. Digital invitations cost a flat ₹49–₹99 for unlimited sharing.\n\n**🌿 Eco-Friendly** — No paper, no ink, no waste. Perfect for environmentally conscious couples.\n\n**📊 Track Responses** — Know who opened your invitation and who has RSVP\'d. No more manual follow-ups.\n\n**🔄 Easy to Update** — Change the venue or time? Update your digital card instantly — all guests see the change automatically.\n\n**📱 Works on All Devices** — Your guests can view the invitation on any smartphone, tablet, or computer.',
      },
      {
        id: 'features',
        title: 'Interactive Features in Your Digital Wedding Card',
        content:
          '**🃏 Beautiful Invitation Card** — A full-screen template card designed for your wedding style, displayed at the top of your invitation page.\n\n**⏳ Countdown Timer** — A live countdown (days, hours, minutes, seconds) to your wedding day, keeping guests excited.\n\n**📍 Google Maps Integration** — Interactive map showing your venue location. Guests can tap to get directions directly.\n\n**💌 RSVP System** — Guests can confirm their attendance with name and response, right from the invitation page.\n\n**🔗 Shareable Link** — A clean, memorable URL like invitehub.in/i/priya-rahul that you can share anywhere.\n\n**📢 Social Sharing** — Built-in share buttons for WhatsApp, copy link, and social media.',
      },
      {
        id: 'vs-traditional',
        title: 'Digital Wedding Card vs. Traditional Printed Card',
        content:
          '| Feature | Digital Card (InviteHub) | Printed Card |\n|---|---|---|\n| Cost | ₹49–₹99 flat | ₹15–₹50 per card |\n| Delivery | Instant | 3–7 days |\n| Update after print | ✅ Yes | ❌ No |\n| RSVP tracking | ✅ Built-in | ❌ Manual |\n| Google Maps | ✅ Yes | ❌ No |\n| Eco-friendly | ✅ Zero paper | ❌ Paper + ink |\n| Reach | Unlimited guests | Limited by print qty |',
      },
      {
        id: 'cta',
        title: 'Make Your Wedding Invitation Digital Today',
        content:
          'Modern couples choose digital. Create your interactive digital wedding card free and upgrade when you\'re ready to share.',
        cta: { text: 'Create Digital Card Free', href: '/templates' },
      },
    ],

    faqs: [
      {
        question: 'What is a digital wedding card?',
        answer:
          'A digital wedding card is an online invitation that you share via a link instead of printing. It can include your invitation design, countdown timer, venue map, and RSVP button — all accessible on any device.',
      },
      {
        question: 'How do I share a digital wedding card on WhatsApp?',
        answer:
          'After creating your card, you get a unique shareable URL (like invitehub.in/i/your-names). Simply paste this link into any WhatsApp chat, group, or status. Recipients can tap to open the full interactive invitation.',
      },
      {
        question: 'Can guests RSVP directly on the digital wedding card?',
        answer:
          'Yes! The Digital Suite plan includes an RSVP form on your invitation page. Guests can submit their name and attendance confirmation directly from the link.',
      },
      {
        question: 'Does the digital wedding card have a countdown timer?',
        answer:
          'Yes. When you publish your invitation page (Digital Suite plan), it automatically includes a live countdown timer showing days, hours, minutes, and seconds remaining until your wedding day.',
      },
      {
        question: 'Can I still get a printed version of my digital wedding card?',
        answer:
          'Absolutely. Download your invitation as a high-resolution PNG or PDF and take it to any local print shop. The Print-Ready plan (₹99) includes a print-optimized PDF.',
      },
      {
        question: 'How is a digital wedding card different from a WhatsApp image?',
        answer:
          'A WhatsApp image is just a static picture. A digital wedding card is a full web page with interactive features — countdown timer, venue map, RSVP, and shareable link — that provides a much richer experience for your guests.',
      },
      {
        question: 'Is the shareable invitation link permanent?',
        answer:
          'Your invitation page stays live throughout your wedding period. We do not delete invitation pages, so guests can refer back to the link anytime for venue details.',
      },
      {
        question: 'What happens to the digital card after the wedding?',
        answer:
          'Your invitation page remains accessible unless you choose to delete it. Many couples keep it as a memento of their big day.',
      },
    ],

    relatedPages: [
      { title: 'Wedding Invitation Card Maker', href: '/wedding-invitation-card-maker' },
      { title: 'Marriage Invitation Card', href: '/marriage-invitation-card' },
      { title: 'Online Wedding Invitation', href: '/online-wedding-invitation' },
      { title: 'Wedding Card Maker', href: '/wedding-card-maker' },
    ],
  },

  'online-wedding-invitation': {
    slug: 'online-wedding-invitation',
    title: 'Online Wedding Invitation – Send & Share Instantly | InviteHub.in',
    description:
      'Create and send beautiful online wedding invitations to unlimited guests. RSVP tracking, Google Maps, countdown timer. Free to start, premium from ₹49.',
    keywords: [
      'online wedding invitation',
      'send wedding invitation online',
      'wedding invitation online free',
      'e-invitation wedding India',
      'digital wedding invitation card',
      'online wedding card maker',
    ],
    mainKeyword: 'online wedding invitation',
    ogTitle: 'Online Wedding Invitation Service | InviteHub.in',
    ogDescription:
      'Send beautiful online wedding invitations to unlimited guests in seconds. RSVP tracking included.',

    heroImage: '/Romantic vintage wedding invitation design.png',

    highlights: [
      { icon: '📨', label: 'Unlimited Guests', desc: 'Share with everyone at no extra cost' },
      { icon: '✅', label: 'RSVP Tracking', desc: 'Know who\'s coming, no follow-ups' },
      { icon: '🗺️', label: 'Venue on Maps', desc: 'Interactive directions for every guest' },
      { icon: '🔒', label: 'Secure & Private', desc: 'Your data stays safe with us' },
    ],

    sections: [
      {
        id: 'hero',
        title: 'Send Beautiful Online Wedding Invitations to All Your Guests Instantly',
        content:
          'Create your online wedding invitation once and share it with hundreds of guests in seconds — via WhatsApp, email, or social media. InviteHub makes it effortless, beautiful, and affordable.',
        cta: { text: 'Create Free Invitation', href: '/templates' },
      },
      {
        id: 'how-to-send',
        title: 'How to Send Your Online Wedding Invitation',
        content:
          '**1. Design Your Invitation (2 minutes)**\nChoose from 5 premium templates. Fill in your wedding details — names, date, time, venue, and optional couple photo.\n\n**2. Get Your Shareable Link**\nAfter checkout, your invitation gets a unique URL (e.g., invitehub.in/i/anjali-karan). This link never expires.\n\n**3. Share Everywhere**\n📱 WhatsApp individual and group messages\n📧 Email with a one-line invite and the link\n📸 Instagram bio or story\n💬 Any other messaging app\n\n**4. Track Responses**\nGuests who visit your invitation page can RSVP directly. You\'ll see who responded from your dashboard.',
      },
      {
        id: 'benefits',
        title: 'Benefits of Sending Wedding Invitations Online',
        content:
          '**📦 No Courier Costs** — Physical cards can cost ₹30–₹100 per guest including printing and shipping. Online invitations: ₹99 total for unlimited guests.\n\n**⚡ Instant Delivery** — Traditional cards take 5–7 days to deliver. Online invitations reach guests the moment you send them.\n\n**🔄 Update Anytime** — Venue changed? Time adjusted? Update your online invitation and all guests see the latest details immediately.\n\n**📊 Real-time Analytics** — See how many guests viewed your invitation, when they viewed it, and who RSVP\'d.\n\n**💚 Zero Environmental Impact** — No paper, no printing, no waste. Every invitation sent digitally saves paper and energy.',
      },
      {
        id: 'for-whom',
        title: 'Who Uses Online Wedding Invitations?',
        content:
          'Online invitations are perfect for:\n\n• **Large weddings** — Manage hundreds of guests without printing chaos\n• **Out-of-town guests** — International guests get invitations instantly\n• **Quick planning** — Wedding in 2 weeks? Digital invitations are ready in 2 minutes\n• **Tech-forward couples** — Add countdown timers, maps, RSVP all in one place\n• **Budget-conscious couples** — Save significantly compared to printing',
      },
      {
        id: 'cta',
        title: 'Send Your Online Wedding Invitation Today',
        content:
          'Start for free. No account needed. Create your invitation and share it with everyone who matters.',
        cta: { text: 'Create Your Invitation', href: '/templates' },
      },
    ],

    faqs: [
      {
        question: 'How do I send a wedding invitation online?',
        answer:
          'Create your invitation on InviteHub.in, choose a template, fill in your details, and checkout. You\'ll receive a shareable link that you can send via WhatsApp, email, or any messaging app.',
      },
      {
        question: 'Is it free to send wedding invitations online?',
        answer:
          'Creating and sharing your invitation is free. Premium plans (₹49–₹99) unlock HD downloads without watermarks, PDF exports, and a dedicated invitation page with RSVP and maps.',
      },
      {
        question: 'How many people can I invite using the online invitation?',
        answer:
          'Unlimited! Once you have your shareable link, you can send it to any number of guests at no extra cost. There are no per-guest or per-message charges.',
      },
      {
        question: 'Can I collect RSVPs from my online wedding invitation?',
        answer:
          'Yes. The Digital Suite plan includes a built-in RSVP form on your invitation page. Guests can confirm their attendance, and you can see all responses in your dashboard.',
      },
      {
        question: 'What if a guest doesn\'t have internet access?',
        answer:
          'For guests who prefer physical invitations, download your card as a high-resolution PNG or PDF and print it locally. InviteHub supports both digital and print use cases.',
      },
      {
        question: 'Can I send the invitation via email automatically?',
        answer:
          'Currently, InviteHub provides a shareable link that you paste into emails manually. Automated email sending to guest lists is on our roadmap for a future update.',
      },
      {
        question: 'Is my invitation data secure?',
        answer:
          'Yes. Your invitation data is stored securely in an encrypted database. We do not sell or share your personal data. You can request deletion of your data at any time.',
      },
      {
        question: 'How long will my online wedding invitation link stay active?',
        answer:
          'Your invitation link stays active indefinitely. Guests can revisit it anytime to check venue details, RSVP, or access the map — even after the wedding if they want to share memories.',
      },
    ],

    relatedPages: [
      { title: 'Wedding Invitation Card Maker', href: '/wedding-invitation-card-maker' },
      { title: 'Digital Wedding Card', href: '/digital-wedding-card' },
      { title: 'Marriage Invitation Card', href: '/marriage-invitation-card' },
      { title: 'Wedding Card Maker', href: '/wedding-card-maker' },
    ],
  },

  'wedding-card-maker': {
    slug: 'wedding-card-maker',
    title: 'Wedding Card Maker – Design Professional Cards Instantly | InviteHub.in',
    description:
      'Use InviteHub\'s free wedding card maker to design professional wedding invitation cards. Live preview, 5+ templates, HD download, PDF export. From ₹49.',
    keywords: [
      'wedding card maker',
      'free wedding card maker',
      'wedding card maker online',
      'design wedding card',
      'make wedding card',
      'wedding card maker India',
    ],
    mainKeyword: 'wedding card maker',
    ogTitle: 'Free Wedding Card Maker | InviteHub.in',
    ogDescription:
      'Design beautiful wedding cards with our easy-to-use maker. 5+ templates, live preview, HD downloads. Free to start.',

    heroImage: '/Elegant gold wedding invitation design.png',

    highlights: [
      { icon: '✏️', label: 'Easy Editor', desc: 'No design skills required' },
      { icon: '👁️', label: 'Live Preview', desc: 'See changes in real time' },
      { icon: '🖼️', label: 'HD Quality', desc: 'Print-ready 300 DPI exports' },
      { icon: '📦', label: '5+ Templates', desc: 'For every style and tradition' },
    ],

    sections: [
      {
        id: 'hero',
        title: 'Professional Wedding Card Maker — No Design Skills Needed',
        content:
          'InviteHub.in is the easiest wedding card maker in India. Choose a professionally designed template, add your details with our simple form, and instantly get a beautiful, print-ready wedding card.',
        cta: { text: 'Make Your Card Now', href: '/templates' },
      },
      {
        id: 'templates',
        title: 'Wedding Card Templates for Every Style',
        content:
          '**🏆 Elegant Gold** — Sophisticated black and gold design. Perfect for formal, upscale weddings. Clean typography with gold accents.\n\n**🕉️ Traditional Indian** — Red and saffron color palette with mandala motifs and Hindi blessings. Authentic Indian wedding feel.\n\n**👑 Royal Purple** — Deep jewel tones with regal flourishes. Ideal for grand ceremonies and destination weddings.\n\n**📐 Modern Geometric** — Clean lines and contemporary layout. For the modern minimalist couple.\n\n**🌹 Romantic Vintage** — Soft florals and warm antique tones. Beautiful for intimate garden weddings.',
      },
      {
        id: 'editor',
        title: 'What You Can Customize in the Wedding Card Maker',
        content:
          '**Names** — Bride and groom names with elegant typography\n**Event Details** — Date, time, and venue with full address\n**Family Details** — Parents\' names, family blessings, family names\n**Photo** — Upload your couple photo directly to the card\n**Message** — Add a personal quote, poem, or wedding blessing\n**RSVP Info** — Include contact details for confirmations\n\nAll changes update live in the preview — what you see is exactly what you get.',
      },
      {
        id: 'output',
        title: 'Download & Use Your Wedding Card',
        content:
          '**Free Download (Watermarked)** — Test your design with a free watermarked PNG export.\n\n**Basic (₹49)** — HD PNG without watermark. Perfect for sharing digitally via WhatsApp, email, Instagram.\n\n**Print-Ready (₹99)** — HD PNG + print-quality PDF + matching envelope design. Take to any printer.\n\n**Digital Suite (₹99)** — HD PNG + PDF + live invitation page with RSVP, countdown, and Google Maps.\n\nAll premium downloads are delivered instantly after payment verification.',
      },
      {
        id: 'tips',
        title: 'Tips for Making the Perfect Wedding Card',
        content:
          '🎯 **Keep text concise** — Use full names, but keep addresses and messages brief for a clean look.\n\n📸 **Use a high-quality couple photo** — A clear, well-lit photo makes your card look professional.\n\n📅 **Double-check your date and time** — The most common mistake in wedding cards! Verify the date before downloading.\n\n🎨 **Choose the right template** — Traditional ceremony? Pick Traditional Indian or Elegant Gold. Modern couple? Try Geometric or Royal Purple.\n\n📏 **Test before printing** — Download the free watermarked version first to check the design, then upgrade for the clean version.',
      },
      {
        id: 'cta',
        title: 'Start Making Your Wedding Card for Free',
        content:
          'Design your dream wedding card in 2 minutes. No account needed, no credit card upfront. Try free today.',
        cta: { text: 'Open Card Maker', href: '/templates' },
      },
    ],

    faqs: [
      {
        question: 'Is InviteHub\'s wedding card maker really free?',
        answer:
          'Yes! You can design your wedding card, preview it live, and download a watermarked version for free. Upgrading to remove the watermark and get HD/PDF exports starts at ₹49.',
      },
      {
        question: 'Do I need any design experience to use the wedding card maker?',
        answer:
          'Not at all. Our card maker uses a simple fill-in-the-blanks form. You don\'t need Photoshop or Canva experience — just type your details and the template handles the design.',
      },
      {
        question: 'Can I see how my card looks before paying?',
        answer:
          'Yes! The live preview updates in real time as you type. You can see exactly how your final card will look before making any payment.',
      },
      {
        question: 'How many times can I edit my wedding card?',
        answer:
          'You can edit your card as many times as you want in the same session. Your draft is automatically saved in the browser. Each time you want to download the final version, a new payment is required.',
      },
      {
        question: 'What is the resolution of the downloaded wedding card?',
        answer:
          'Premium downloads are exported at 2x resolution (approximately 840×1200 pixels at full card size), which is suitable for high-quality digital sharing and standard printing.',
      },
      {
        question: 'Can I use InviteHub to make birthday or engagement invitation cards?',
        answer:
          'Yes! InviteHub supports birthday, engagement, baby shower, housewarming, anniversary, and corporate event invitations. Browse by event type in our template gallery.',
      },
      {
        question: 'What payment methods are accepted for premium downloads?',
        answer:
          'We accept all major UPI apps (GPay, PhonePe, Paytm), debit cards, credit cards, and net banking through Razorpay — India\'s most trusted payment gateway.',
      },
      {
        question: 'Can I download the wedding card multiple times after purchase?',
        answer:
          'After payment, your download begins immediately. If you need to re-download, you can access your invitation history from your dashboard by logging in with the same email.',
      },
    ],

    relatedPages: [
      { title: 'Wedding Invitation Card Maker', href: '/wedding-invitation-card-maker' },
      { title: 'Marriage Invitation Card', href: '/marriage-invitation-card' },
      { title: 'Digital Wedding Card', href: '/digital-wedding-card' },
      { title: 'Online Wedding Invitation', href: '/online-wedding-invitation' },
    ],
  },
};

export const SEO_PAGES: Record<SEOPageSlug, SEOPageContent> = {
  ...(WEDDING_SEO_PAGES as Record<SEOPageSlug, SEOPageContent>),
  ...(EVENT_SEO_PAGES as Record<SEOPageSlug, SEOPageContent>),
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
