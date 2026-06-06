'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Crown, Sparkles } from 'lucide-react';
import type { Template } from '@/lib/templates/types';
import { TEMPLATE_TIERS } from '@/lib/templates/data';

interface TemplateCardProps {
  template: Template;
  index?: number;
}

export function TemplateCard({ template, index = 0 }: TemplateCardProps) {
  const tier = TEMPLATE_TIERS[template.tier];
  const tierColors = {
    free: 'bg-gray-100 text-gray-800',
    premium: 'bg-blue-100 text-blue-800',
    'premium-plus': 'bg-purple-100 text-purple-800',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group h-full"
    >
      <Link href={`/templates/${template.id}`}>
        <div className="h-full rounded-lg overflow-hidden bg-white border border-gray-200 hover:border-blue-300 transition-all duration-300 hover:shadow-lg cursor-pointer">
          {/* Image Container */}
          <div className="relative w-full aspect-[3/4] overflow-hidden bg-gray-100">
            <Image
              src={template.thumbnailUrl}
              alt={template.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />

            {/* Badges */}
            <div className="absolute top-3 left-3 flex gap-2">
              {template.isNew && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
                  <Sparkles size={14} />
                  New
                </span>
              )}
              {template.isPopular && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-semibold">
                  <Crown size={14} />
                  Popular
                </span>
              )}
            </div>

            {/* Tier Badge */}
            <div className={`absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-semibold ${tierColors[template.tier]}`}>
              {tier.label}
            </div>
          </div>

          {/* Content */}
          <div className="p-4">
            <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
              {template.name}
            </h3>
            <p className="text-sm text-gray-600 mb-3 line-clamp-2">{template.description}</p>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mb-3">
              {template.tags.slice(0, 2).map((tag) => (
                <span key={tag} className="inline-block px-2 py-0.5 rounded bg-gray-100 text-gray-600 text-xs">
                  {tag}
                </span>
              ))}
              {template.tags.length > 2 && (
                <span className="inline-block px-2 py-0.5 rounded bg-gray-100 text-gray-600 text-xs">
                  +{template.tags.length - 2}
                </span>
              )}
            </div>

            {/* CTA */}
            <button className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition-colors">
              Use Template
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
