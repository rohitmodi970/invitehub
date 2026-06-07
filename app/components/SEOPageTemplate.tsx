'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown, CheckCircle2, ChevronRight, HelpCircle } from 'lucide-react';
import React, { useState } from 'react';
import type { SEOPageContent } from '@/lib/seo/types';

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.55 },
  viewport: { once: true, margin: '-40px' },
};

interface SEOPageTemplateProps {
  page: SEOPageContent;
}

export function SEOPageTemplate({ page }: SEOPageTemplateProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  // We assume the first section is always the hero content
  const heroSection = page.sections[0];
  const ctaSection = page.sections[page.sections.length - 1];
  const contentSections = page.sections.slice(1, -1);

  return (
    <div className="min-h-screen bg-[#faf8f5] text-[#1a0e00] font-sans selection:bg-[#c9a84c] selection:text-white overflow-hidden">
      
      {/* ── Navbar Spacer ── */}
      <div className="h-20 w-full" />

      {/* ── Hero Section ── */}
      <section className="relative pt-10 pb-20 px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto">
        {/* Background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[400px] bg-[#c9a84c]/10 blur-[100px] rounded-full pointer-events-none -z-10" />

        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
          <motion.div {...fadeUp} className="max-w-2xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-[#c9a84c] bg-[#c9a84c]/10 border border-[#c9a84c]/20 mb-6 uppercase tracking-widest">
              ✨ Premium Wedding Invitations
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.1] mb-6 text-[#1a0e00]">
              {heroSection.title}
            </h1>
            <p className="text-lg sm:text-xl text-[#1a0e00]/70 mb-8 leading-relaxed">
              {heroSection.content}
            </p>
            
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href={heroSection.cta?.href || '/templates'}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-[#c9a84c] to-[#f0d080] text-[#1a0e00] font-bold shadow-[0_8px_24px_rgba(201,168,76,0.25)] hover:shadow-[0_12px_32px_rgba(201,168,76,0.35)] hover:-translate-y-0.5 transition-all"
              >
                {heroSection.cta?.text || 'Browse Templates'}
                <ArrowRight size={18} />
              </Link>
            </div>

            {/* Trust markers */}
            <div className="mt-10 flex items-center gap-6 pt-6 border-t border-[#1a0e00]/10">
              <div className="flex -space-x-3">
                {[1,2,3,4].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-[#faf8f5] bg-[#e6dbcc] overflow-hidden relative">
                    <Image src={`https://i.pravatar.cc/100?img=${i+10}`} alt="User" fill className="object-cover" />
                  </div>
                ))}
              </div>
              <div>
                <div className="flex text-[#c9a84c] text-sm mb-1">
                  {'★★★★★'}
                </div>
                <p className="text-xs text-[#1a0e00]/60 font-medium">Trusted by 5,000+ couples in India</p>
              </div>
            </div>
          </motion.div>

          {/* Hero Image */}
          {page.heroImage && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, rotate: -2 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
              className="relative mx-auto w-full max-w-md lg:max-w-full"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-[#1a0e00]/5 to-transparent rounded-[2rem] transform rotate-3 scale-105 -z-10" />
              <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white bg-white">
                <Image 
                  src={page.heroImage} 
                  alt={page.title} 
                  width={600} 
                  height={800} 
                  className="w-full h-auto object-cover"
                  priority
                />
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* ── Highlights Bar ── */}
      {page.highlights && (
        <section className="bg-white border-y border-[#1a0e00]/5 py-12">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {page.highlights.map((highlight, idx) => (
                <motion.div 
                  key={idx} 
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-4"
                >
                  <div className="w-12 h-12 rounded-2xl bg-[#faf8f5] border border-[#1a0e00]/5 flex items-center justify-center text-2xl shrink-0 shadow-sm">
                    {highlight.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-[#1a0e00] mb-1">{highlight.label}</h3>
                    <p className="text-sm text-[#1a0e00]/60 leading-snug">{highlight.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Content Sections ── */}
      <section className="py-20 px-6 sm:px-10 lg:px-16 max-w-4xl mx-auto">
        <div className="space-y-24">
          {contentSections.map((section, index) => (
            <motion.div key={section.id} {...fadeUp} className="prose prose-lg prose-amber max-w-none">
              <h2 className="text-3xl sm:text-4xl font-black text-[#1a0e00] mb-6 leading-tight">
                {section.title}
              </h2>
              {/* Parse simple markdown (bold and bullets) */}
              <div className="space-y-4 text-[#1a0e00]/80">
                {section.content.split('\n\n').map((paragraph, pIdx) => {
                  if (paragraph.startsWith('• ') || paragraph.startsWith('✅ ')) {
                    return (
                      <ul key={pIdx} className="list-none space-y-3 pl-0 my-6">
                        {paragraph.split('\n').map((item, iIdx) => (
                          <li key={iIdx} className="flex items-start gap-3">
                            <CheckCircle2 className="w-6 h-6 text-[#c9a84c] shrink-0 mt-0.5" />
                            <span dangerouslySetInnerHTML={{ 
                              __html: item.replace(/^[•✅]\s*/, '').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                            }} />
                          </li>
                        ))}
                      </ul>
                    );
                  }
                  
                  if (paragraph.startsWith('|')) {
                    // Very basic table rendering for the vs-traditional section
                    const rows = paragraph.split('\n').filter(r => r.trim() && !r.includes('---'));
                    return (
                      <div key={pIdx} className="overflow-x-auto my-8 rounded-2xl border border-[#1a0e00]/10 shadow-sm">
                        <table className="w-full text-left border-collapse">
                          <tbody>
                            {rows.map((row, rIdx) => {
                              const cells = row.split('|').filter(c => c.trim() !== '');
                              const isHeader = rIdx === 0;
                              return (
                                <tr key={rIdx} className={isHeader ? 'bg-[#faf8f5] border-b border-[#1a0e00]/10' : 'border-b border-[#1a0e00]/5 last:border-0'}>
                                  {cells.map((cell, cIdx) => (
                                    <td key={cIdx} className={`p-4 ${isHeader ? 'font-bold' : ''} ${cIdx === 1 ? 'bg-[#c9a84c]/5 font-semibold text-[#c9a84c]' : ''}`}>
                                      {cell.trim()}
                                    </td>
                                  ))}
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    );
                  }

                  return (
                    <p key={pIdx} dangerouslySetInnerHTML={{
                      __html: paragraph.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                    }} />
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── FAQ Section ── */}
      <section className="py-20 bg-white border-t border-[#1a0e00]/5">
        <div className="max-w-3xl mx-auto px-6 sm:px-10">
          <motion.div {...fadeUp} className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-black text-[#1a0e00] mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-[#1a0e00]/60">
              Everything you need to know about InviteHub.in
            </p>
          </motion.div>

          <div className="space-y-4">
            {page.faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="rounded-2xl border border-[#1a0e00]/10 overflow-hidden bg-white shadow-sm hover:shadow-md transition-all"
              >
                <button
                  onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left"
                >
                  <div className="flex items-center gap-4 pr-4">
                    <HelpCircle size={20} className="text-[#c9a84c] shrink-0" />
                    <span className="font-bold text-[#1a0e00] text-[15px] sm:text-base">
                      {faq.question}
                    </span>
                  </div>
                  <ChevronDown
                    size={20}
                    className={`text-[#1a0e00]/40 shrink-0 transition-transform duration-300 ${
                      expandedIndex === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                <div 
                  className={`grid transition-all duration-300 ease-in-out ${
                    expandedIndex === index ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-6 pt-1 text-[#1a0e00]/70 leading-relaxed ml-9 border-t border-[#1a0e00]/5 pt-4 mt-1">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Related Pages ── */}
      {page.relatedPages && (
        <section className="py-20 px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto">
          <motion.div {...fadeUp} className="mb-10">
            <h2 className="text-2xl font-bold text-[#1a0e00]">Explore More</h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {page.relatedPages.map((link, idx) => (
              <Link 
                key={idx} 
                href={link.href}
                className="group flex items-center justify-between p-5 rounded-2xl bg-white border border-[#1a0e00]/10 hover:border-[#c9a84c]/50 hover:shadow-lg transition-all"
              >
                <span className="font-semibold text-[#1a0e00]/80 group-hover:text-[#c9a84c] transition-colors">{link.title}</span>
                <ChevronRight size={18} className="text-[#1a0e00]/30 group-hover:text-[#c9a84c] transition-colors group-hover:translate-x-1" />
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ── Final CTA ── */}
      {ctaSection && (
        <section className="py-24 px-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-[#1a0e00] -z-20" />
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#c9a84c]/20 blur-[100px] rounded-full -z-10 translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-500/20 blur-[100px] rounded-full -z-10 -translate-x-1/2 translate-y-1/2" />
          
          <div className="max-w-3xl mx-auto text-center">
            <motion.div {...fadeUp}>
              <h2 className="text-4xl sm:text-5xl font-black text-white mb-6 leading-tight">
                {ctaSection.title}
              </h2>
              <p className="text-lg text-white/70 mb-10 max-w-xl mx-auto">
                {ctaSection.content}
              </p>
              <Link
                href={ctaSection.cta?.href || '/templates'}
                className="inline-flex items-center gap-2 px-10 py-5 rounded-full bg-white text-[#1a0e00] font-bold shadow-[0_8px_30px_rgba(255,255,255,0.2)] hover:shadow-[0_12px_40px_rgba(255,255,255,0.3)] hover:scale-105 transition-all text-lg"
              >
                {ctaSection.cta?.text || 'Start Designing Now'}
                <ArrowRight size={20} />
              </Link>
              <p className="mt-6 text-white/40 text-sm font-medium">
                No credit card required to start • Free live preview
              </p>
            </motion.div>
          </div>
        </section>
      )}
    </div>
  );
}
