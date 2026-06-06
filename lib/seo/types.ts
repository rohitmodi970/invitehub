export type SEOPageSlug =
  | 'wedding-invitation-card-maker'
  | 'marriage-invitation-card'
  | 'digital-wedding-card'
  | 'online-wedding-invitation'
  | 'wedding-card-maker';

export interface SEOPageContent {
  slug: SEOPageSlug;
  title: string;
  description: string;
  keywords: string[];
  mainKeyword: string;
  ogTitle: string;
  ogDescription: string;
  ogImage?: string;
  sections: ContentSection[];
  faqs: FAQ[];
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
