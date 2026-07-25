import { MetadataRoute } from 'next';
import { getSEOPageSlugs } from '@/lib/seo/pages';
import { TEMPLATES } from '@/lib/templates/data';
import { BLOG_POSTS } from '@/lib/blog/data';

export default function sitemap(): MetadataRoute.Sitemap {
  const seoPages = getSEOPageSlugs().map((slug) => ({
    url: `https://www.invitehub.in/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.85,
  }));

  // Category pages
  const categories = ['wedding', 'birthday', 'corporate', 'baby-shower', 'engagement', 'anniversary', 'housewarming'];
  const categoryPages = categories.map((category) => ({
    url: `https://www.invitehub.in/templates/${category}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  // Individual template detail pages
  const templatePages = TEMPLATES.map((template) => ({
    url: `https://www.invitehub.in/templates/${template.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.75,
  }));

  // Blog posts
  const blogPages = BLOG_POSTS.map((post) => ({
    url: `https://www.invitehub.in/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [
    {
      url: 'https://www.invitehub.in',
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1.0,
    },
    {
      url: 'https://www.invitehub.in/templates',
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    ...categoryPages,
    ...seoPages,
    ...templatePages,
    ...blogPages,
    {
      url: 'https://www.invitehub.in/blog',
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: 'https://www.invitehub.in/about',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: 'https://www.invitehub.in/contact',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: 'https://www.invitehub.in/privacy',
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: 'https://www.invitehub.in/terms',
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
  ];
}
