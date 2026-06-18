import { MetadataRoute } from 'next';
import { getSEOPageSlugs } from '@/lib/seo/pages';
import { TEMPLATES } from '@/lib/templates/data';

export default function sitemap(): MetadataRoute.Sitemap {
  const seoPages = getSEOPageSlugs().map((slug) => ({
    url: `https://invitehub.in/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.85,
  }));

  // Individual template detail pages
  const templatePages = TEMPLATES.map((template) => ({
    url: `https://invitehub.in/templates/${template.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.75,
  }));

  return [
    {
      url: 'https://invitehub.in',
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1.0,
    },
    {
      url: 'https://invitehub.in/templates',
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    ...seoPages,
    ...templatePages,
    {
      url: 'https://invitehub.in/about',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: 'https://invitehub.in/contact',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: 'https://invitehub.in/privacy',
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: 'https://invitehub.in/terms',
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
  ];
}
