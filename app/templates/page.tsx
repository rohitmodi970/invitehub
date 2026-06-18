import type { Metadata } from 'next';
import { Suspense } from 'react';
import { TemplateGallery } from '@/app/components/TemplateGallery';
import { TEMPLATES } from '@/lib/templates/data';

const title = 'Invitation Templates – Wedding, Birthday & More';
const description =
  'Browse invitation templates for weddings, birthdays, engagements, baby showers, housewarmings, anniversaries, and corporate events. Fully customizable designs.';

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: '/templates',
  },
  keywords: [
    'invitation templates',
    'wedding invitation templates',
    'birthday invitation templates',
    'engagement invitation templates',
    'digital invitation designs',
  ],
  openGraph: {
    title,
    description,
    url: '/templates',
    type: 'website',
  },
};

const templateSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Invitation Templates',
  description,
  url: 'https://www.invitehub.in/templates',
  numberOfItems: TEMPLATES.length,
  mainEntity: {
    '@type': 'ItemList',
    itemListElement: TEMPLATES.map((template, index) => ({
      '@type': 'Product',
      position: index + 1,
      name: template.name,
      description: template.description,
      image: template.previewUrl,
      url: `https://www.invitehub.in/templates/${template.id}`,
    })),
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: 'https://www.invitehub.in',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Templates',
      item: 'https://www.invitehub.in/templates',
    },
  ],
};

export default function TemplatesPage() {
  return (
    <>
      <Suspense fallback={<div className="min-h-screen bg-gray-50" />}>
        <TemplateGallery />
      </Suspense>

      {/* SEO-only Static Template List */}
      <div className="sr-only">
        <h2>All Invitation Templates</h2>
        <ul>
          {TEMPLATES.map((template) => (
            <li key={template.id}>
              <a href={`/templates/${template.id}`}>{template.name}</a>
              <p>{template.description}</p>
            </li>
          ))}
        </ul>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(templateSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}
