import type { SEOPageContent, FAQ } from './types';
import { OG_IMAGE, SITE_LOGO, absoluteImage } from '@/lib/images/paths';

export interface SchemaConfig {
  name: string;
  url: string;
  description: string;
  mainKeyword: string;
}

export function generateFAQSchema(faqs: FAQ[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function generateBreadcrumbSchema(slug: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://invitehub.in',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Templates',
        item: 'https://invitehub.in/templates',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: slug.replace(/-/g, ' ').toUpperCase(),
        item: `https://invitehub.in/${slug}`,
      },
    ],
  };
}

export function generateArticleSchema(page: SEOPageContent) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: page.title,
    description: page.description,
    image: page.ogImage || OG_IMAGE,
    datePublished: new Date().toISOString(),
    author: {
      '@type': 'Organization',
      name: 'InviteHub.in',
      url: 'https://invitehub.in',
    },
    publisher: {
      '@type': 'Organization',
      name: 'InviteHub.in',
      logo: {
        '@type': 'ImageObject',
        url: absoluteImage(SITE_LOGO),
      },
    },
  };
}
