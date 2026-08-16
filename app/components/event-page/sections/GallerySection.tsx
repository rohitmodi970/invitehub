'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrollSection } from '../EventPageRenderer';
import type { EventData } from '@/lib/events/event-data';
import type { TemplateDesign } from '@/lib/templates/engine/types';
import { X } from 'lucide-react';

interface GallerySectionProps {
  event: EventData;
  design: TemplateDesign;
  sectionIndex?: number;
}

export default function GallerySection({ event, design }: GallerySectionProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const images = event.galleryImages ?? [];
  if (images.length === 0) return null;

  return (
    <ScrollSection className="w-full px-6 py-16" animation={design.entranceAnimation}>
      <div className="mx-auto" style={{ maxWidth: design.maxWidth }}>
        <p
          className="text-center text-xs font-semibold tracking-[0.2em] uppercase mb-6"
          style={{ color: 'var(--accent-color)', fontFamily: 'var(--body-font)' }}
        >
          Gallery
        </p>

        {/* Photo grid */}
        <div
          className={`grid gap-3 ${images.length === 1 ? 'grid-cols-1' : images.length === 2 ? 'grid-cols-2' : 'grid-cols-2 sm:grid-cols-3'}`}
        >
          {images.map((src, i) => (
            <motion.button
              key={i}
              className="relative overflow-hidden rounded-2xl aspect-square cursor-pointer"
              style={{ borderRadius: design.borderRadius }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setLightboxIndex(i)}
            >
              <Image
                src={src}
                alt={`${event.title} gallery photo ${i + 1}`}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors duration-200" />
            </motion.button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: 'rgba(0,0,0,0.95)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxIndex(null)}
          >
            <motion.div
              className="relative max-w-3xl max-h-[85vh] w-full h-full"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={e => e.stopPropagation()}
            >
              <Image
                src={images[lightboxIndex]}
                alt={`Gallery photo ${lightboxIndex + 1}`}
                fill
                className="object-contain"
              />
            </motion.div>
            <button
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              onClick={() => setLightboxIndex(null)}
            >
              <X size={20} color="white" />
            </button>
            {/* Navigation */}
            {images.length > 1 && (
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                {images.map((_, i) => (
                  <button
                    key={i}
                    className="w-2 h-2 rounded-full transition-all"
                    style={{ background: i === lightboxIndex ? 'white' : 'rgba(255,255,255,0.3)' }}
                    onClick={() => setLightboxIndex(i)}
                  />
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </ScrollSection>
  );
}
