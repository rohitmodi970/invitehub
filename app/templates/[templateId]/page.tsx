'use client';

import { use } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Download, Share2 } from 'lucide-react';
import { getTemplateById, getRelatedTemplates } from '@/lib/utils/template-helpers';
import { TemplateCard } from '@/app/components/TemplateCard';
import { TEMPLATE_TIERS } from '@/lib/templates/data';

interface TemplateDetailPageProps {
  params: Promise<{ templateId: string }>;
}

export default function TemplateDetailPage({ params }: TemplateDetailPageProps) {
  const { templateId } = use(params);
  const template = getTemplateById(templateId);

  if (!template) {
    notFound();
  }

  const relatedTemplates = getRelatedTemplates(templateId);
  const tier = TEMPLATE_TIERS[template.tier];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link
            href="/templates"
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Back to Templates</span>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Preview Image */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="relative w-full aspect-[3/4] rounded-lg overflow-hidden bg-gray-100 shadow-lg">
              <Image
                src={template.previewUrl}
                alt={template.name}
                fill
                className="object-cover"
                priority
              />
            </div>
          </motion.div>

          {/* Details */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
            {/* Title Section */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold">
                  {template.category.replace('-', ' ').toUpperCase()}
                </span>
                <span className="inline-block px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-sm font-semibold">
                  {tier.label}
                </span>
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">{template.name}</h1>
              <p className="text-lg text-gray-600">{template.description}</p>
            </div>

            {/* Features */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Features</h2>
              <ul className="space-y-2">
                {template.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-gray-700">
                    <ArrowRight size={18} className="text-blue-600 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tier Info */}
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-6 border border-blue-200">
              <h3 className="font-semibold text-gray-900 mb-2">{tier.label} Plan</h3>
              <p className="text-gray-700 mb-4">{tier.description}</p>
              {tier.price > 0 && <p className="text-2xl font-bold text-blue-600">₹{tier.price}</p>}
            </div>

            {/* Tags */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {template.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1 rounded-full bg-gray-200 text-gray-700 text-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="space-y-3 pt-6 border-t border-gray-200">
              <button className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors">
                <ArrowRight size={20} />
                Use This Template
              </button>
              <div className="grid grid-cols-2 gap-3">
                <button className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium transition-colors">
                  <Download size={18} />
                  Download
                </button>
                <button className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium transition-colors">
                  <Share2 size={18} />
                  Share
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Related Templates */}
        {relatedTemplates.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-20">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Templates</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedTemplates.map((relatedTemplate) => (
                <TemplateCard key={relatedTemplate.id} template={relatedTemplate} />
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
