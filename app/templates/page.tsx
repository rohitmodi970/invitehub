import type { Metadata } from 'next';
import { TemplateGallery } from '@/app/components/TemplateGallery';
import { TEMPLATES, TEMPLATE_CATEGORIES } from '@/lib/templates/data';

const title = 'Wedding Invitation Templates | InviteHub.in';
const description = 'Browse our collection of beautiful wedding invitation templates. Choose from modern, traditional, floral, and royal designs. All templates are fully customizable.';

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: '/templates',
  },
  keywords: [
    'wedding invitation templates',
    'invitation card designs',
    'digital wedding invitations',
    'customizable templates',
    'free templates',
    'premium templates',
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
  name: 'Wedding Invitation Templates',
  description,
  url: 'https://invitehub.in/templates',
  numberOfItems: TEMPLATES.length,
  mainEntity: {
    '@type': 'ItemList',
    itemListElement: TEMPLATES.map((template, index) => ({
      '@type': 'Product',
      position: index + 1,
      name: template.name,
      description: template.description,
      image: template.previewUrl,
      url: `https://invitehub.in/templates/${template.id}`,
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
      item: 'https://invitehub.in',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Templates',
      item: 'https://invitehub.in/templates',
    },
  ],
};

export default function TemplatesPage() {
  return (
    <>
      <TemplateGallery />
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
