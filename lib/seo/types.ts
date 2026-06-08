export type SEOPageSlug =
  | 'wedding-invitation-card-maker'
  | 'marriage-invitation-card'
  | 'digital-wedding-card'
  | 'online-wedding-invitation'
  | 'wedding-card-maker'
  // Event pages — existing
  | 'birthday-invitation-card'
  | 'engagement-invitation'
  | 'baby-shower-invitation'
  | 'housewarming-invitation'
  | 'anniversary-invitation'
  | 'corporate-event-invitation'
  // Birthday sub-pages
  | 'kids-birthday-invitation'
  | '1st-birthday-invitation'
  // Corporate sub-pages
  | 'office-party-invitation'
  | 'farewell-invitation-card'
  | 'team-event-invitation'
  // Baby shower / Indian equivalent
  | 'godh-bharai-invitation'
  // Casual party pages
  | 'party-invitation-card'
  | 'kitty-party-invitation'
  | 'get-together-invitation';

export interface SEOPageContent {
  slug: SEOPageSlug;
  title: string;
  description: string;
  keywords: string[];
  mainKeyword: string;
  ogTitle: string;
  ogDescription: string;
  ogImage?: string;
  heroImage?: string;
  highlights?: PageHighlight[];
  sections: ContentSection[];
  faqs: FAQ[];
  relatedPages?: RelatedPage[];
}

export interface PageHighlight {
  icon: string;
  label: string;
  desc: string;
}

export interface ContentSection {
  id: string;
  title: string;
  heading?: string;
  content: string;
  icon?: string;
  cta?: {
    text: string;
    href: string;
  };
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface RelatedPage {
  title: string;
  href: string;
}
