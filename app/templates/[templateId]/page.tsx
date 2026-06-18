import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTemplateById } from '@/lib/utils/template-helpers';
import { TemplateDetailClient } from './TemplateDetailClient';

interface Props {
  params: Promise<{ templateId: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { templateId } = await params;
  const template = getTemplateById(templateId);

  if (!template) {
    return {
      title: 'Template Not Found',
    };
  }

  // Build a keyword-rich title: e.g. "Elegant Gold — Wedding Invitation Template | InviteHub.in"
  const categoryLabel = template.category
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

  const title = `${template.name} — ${categoryLabel} Invitation Template`;
  const description = `${template.description} Create and share your personalised ${template.name.toLowerCase()} invitation online with InviteHub.in. Live preview, HD download, WhatsApp sharing.`;
  const canonical = `/templates/${templateId}`;

  return {
    title,
    description,
    alternates: { canonical },
    keywords: [
      ...template.tags,
      `${template.name.toLowerCase()} invitation`,
      `${categoryLabel.toLowerCase()} invitation template`,
      'digital invitation card maker',
      'InviteHub',
    ],
    openGraph: {
      title,
      description,
      url: canonical,
      type: 'website',
      images: [
        {
          url: template.previewUrl.startsWith('/')
            ? template.previewUrl
            : '/og-image.png',
          width: 1200,
          height: 630,
          alt: `${template.name} invitation template preview`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default function TemplateDetailPage({ params }: Props) {
  return <TemplateDetailClient params={params} />;
}
