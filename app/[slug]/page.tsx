import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SEOPageTemplate } from '@/app/components/SEOPageTemplate';
import { getSEOPageBySlug, getSEOPageSlugs } from '@/lib/seo/pages';
import { generateFAQSchema, generateBreadcrumbSchema, generateArticleSchema } from '@/lib/seo/schemas';
import type { SEOPageSlug } from '@/lib/seo/types';

interface SEOPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getSEOPageSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: SEOPageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getSEOPageBySlug(slug as SEOPageSlug);

  if (!page) {
    return {};
  }

  return {
    title: page.title,
    description: page.description,
    keywords: page.keywords,
    alternates: {
      canonical: `/${page.slug}`,
    },
    openGraph: {
      title: page.ogTitle,
      description: page.ogDescription,
      url: `/${page.slug}`,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: page.ogTitle,
      description: page.ogDescription,
    },
  };
}

export default async function SEOPage({ params }: SEOPageProps) {
  const { slug } = await params;
  const page = getSEOPageBySlug(slug as SEOPageSlug);

  if (!page) {
    notFound();
  }

  const faqSchema = generateFAQSchema(page.faqs);
  const breadcrumbSchema = generateBreadcrumbSchema(slug);
  const articleSchema = generateArticleSchema(page);

  return (
    <>
      <SEOPageTemplate page={page} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
    </>
  );
}
