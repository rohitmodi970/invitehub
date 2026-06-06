'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown, HelpCircle } from 'lucide-react';
import type { SEOPageContent } from '@/lib/seo/types';

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.55 },
};

interface SEOPageTemplateProps {
  page: SEOPageContent;
}

export function SEOPageTemplate({ page }: SEOPageTemplateProps) {
  const [expandedIndex, setExpandedIndex] = React.useState<number | null>(null);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-50 px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div {...fadeUp}>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
              {page.sections[0]?.title}
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              {page.sections[0]?.content}
            </p>
            {page.sections[0]?.cta && (
              <Link
                href={page.sections[0].cta.href}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors"
              >
                {page.sections[0].cta.text}
                <ArrowRight size={20} />
              </Link>
            )}
          </motion.div>
        </div>
      </section>

      {/* Main Content Sections */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="space-y-16">
          {page.sections.slice(1, -1).map((section, index) => (
            <motion.div key={section.id} {...fadeUp} className="space-y-4">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                {section.title}
              </h2>
              <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {section.content}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      {page.sections[page.sections.length - 1] && (
        <motion.section
          {...fadeUp}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-16 sm:px-6 lg:px-8"
        >
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              {page.sections[page.sections.length - 1].title}
            </h2>
            <p className="text-lg mb-8">
              {page.sections[page.sections.length - 1].content}
            </p>
            {page.sections[page.sections.length - 1].cta && (
              <Link
                href={page.sections[page.sections.length - 1].cta?.href || '/templates'}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white hover:bg-gray-100 text-blue-600 font-semibold transition-colors"
              >
                {page.sections[page.sections.length - 1].cta?.text}
                <ArrowRight size={20} />
              </Link>
            )}
          </div>
        </motion.section>
      )}

      {/* FAQ Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <motion.div {...fadeUp}>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-12">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            {page.faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="rounded-lg border border-gray-200 overflow-hidden hover:border-blue-300 transition-colors"
              >
                <button
                  onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <HelpCircle size={20} className="text-blue-600 flex-shrink-0" />
                    <span className="text-left font-semibold text-gray-900">
                      {faq.question}
                    </span>
                  </div>
                  <ChevronDown
                    size={20}
                    className={`text-gray-400 transition-transform ${
                      expandedIndex === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {expandedIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="px-6 py-4 bg-gray-50 border-t border-gray-200"
                  >
                    <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Internal Links */}
      <section className="bg-gray-50 px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Link
              href="/templates"
              className="p-6 rounded-lg bg-white hover:shadow-lg border border-gray-200 transition-all"
            >
              <h3 className="font-semibold text-gray-900 mb-2">Browse All Templates</h3>
              <p className="text-gray-600 text-sm mb-4">
                Explore our complete collection of wedding invitation templates.
              </p>
              <span className="text-blue-600 font-medium text-sm flex items-center gap-1">
                View Templates <ArrowRight size={16} />
              </span>
            </Link>

            <Link
              href="/"
              className="p-6 rounded-lg bg-white hover:shadow-lg border border-gray-200 transition-all"
            >
              <h3 className="font-semibold text-gray-900 mb-2">Back to Home</h3>
              <p className="text-gray-600 text-sm mb-4">
                Learn more about InviteHub.in and our services.
              </p>
              <span className="text-blue-600 font-medium text-sm flex items-center gap-1">
                Go Home <ArrowRight size={16} />
              </span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

import React from 'react';
