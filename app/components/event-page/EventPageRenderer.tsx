'use client';

/**
 * EventPageRenderer — THE core component of InviteHub 2.0.
 *
 * Takes a TemplateDefinition (visual config) + EventData (event content)
 * and renders a stunning, fully interactive event page.
 *
 * Every template shares this renderer. Visual differences come entirely
 * from the TemplateDefinition's design tokens.
 */
import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { TemplateDefinition } from '@/lib/templates/engine/types';
import type { EventData } from '@/lib/events/event-data';
import HeroSection from './sections/HeroSection';
import CountdownSection from './sections/CountdownSection';
import DetailsSection from './sections/DetailsSection';
import VenueMapSection from './sections/VenueMapSection';
import VirtualLinkSection from './sections/VirtualLinkSection';
import AgendaSection from './sections/AgendaSection';
import GallerySection from './sections/GallerySection';
import AddToCalendarSection from './sections/AddToCalendarSection';
import RSVPSection from './sections/RSVPSection';
import ContactSection from './sections/ContactSection';
import FooterSection from './sections/FooterSection';
import BackgroundEffect from './backgrounds/BackgroundEffect';

interface EventPageRendererProps {
  event: EventData;
  template: TemplateDefinition;
}

export default function EventPageRenderer({ event, template }: EventPageRendererProps) {
  const { design, sections } = template;

  // Apply design tokens as CSS variables on the root element
  const cssVars = {
    '--heading-font': `'${design.headingFont}', Georgia, serif`,
    '--body-font': `'${design.bodyFont}', system-ui, sans-serif`,
    '--heading-weight': String(design.headingWeight),
    '--bg-color': event.customPrimaryColor
      ? adjustBgForColor(event.customPrimaryColor)
      : design.backgroundColor,
    '--text-color': design.textColor,
    '--accent-color': event.customPrimaryColor || design.accentColor,
    '--secondary-color': event.customSecondaryColor || design.secondaryColor,
    '--surface-color': design.surfaceColor,
    '--muted-text': design.mutedTextColor,
    '--border-color': design.borderColor,
    '--border-radius': design.borderRadius,
    '--max-width': design.maxWidth,
  } as React.CSSProperties;

  // Sort sections by order, filter disabled
  const activeSections = [...sections]
    .filter(s => s.enabled)
    .sort((a, b) => a.order - b.order);

  return (
    <div
      className="event-page min-h-screen w-full overflow-x-hidden"
      style={{ background: design.backgroundColor, ...cssVars }}
    >
      {/* Load Google Fonts dynamically */}
      <GoogleFontsLoader headingFont={design.headingFont} bodyFont={design.bodyFont} />

      {/* Template's custom CSS injection */}
      {design.customCSS && (
        <style dangerouslySetInnerHTML={{ __html: design.customCSS }} />
      )}

      {/* Background visual effects */}
      <BackgroundEffect effect={design.backgroundEffect} accentColor={design.accentColor} />

      {/* Render all active sections */}
      <div className="relative z-10">
        {activeSections.map((section, index) => {
          const props = { event, design, variant: section.variant, sectionIndex: index };

          switch (section.type) {
            case 'hero':
              return <HeroSection key="hero" {...props} />;

            case 'countdown':
              return <CountdownSection key="countdown" {...props} />;

            case 'details':
              return <DetailsSection key="details" {...props} />;

            case 'venue-map':
              return !event.isVirtual && event.venueLat ? (
                <VenueMapSection key="venue-map" {...props} />
              ) : null;

            case 'virtual-link':
              return event.isVirtual && event.virtualLink ? (
                <VirtualLinkSection key="virtual-link" {...props} />
              ) : null;

            case 'agenda':
              return event.agenda ? (
                <AgendaSection key="agenda" {...props} />
              ) : null;

            case 'gallery':
              return event.galleryImages && event.galleryImages.length > 0 ? (
                <GallerySection key="gallery" {...props} />
              ) : null;

            case 'calendar':
              return event.calendarEnabled ? (
                <AddToCalendarSection key="calendar" {...props} />
              ) : null;

            case 'rsvp':
              return event.rsvpEnabled ? (
                <RSVPSection key="rsvp" {...props} />
              ) : null;

            case 'contact':
              return (event.contactPhone || event.contactEmail || event.contactWebsite) ? (
                <ContactSection key="contact" {...props} />
              ) : null;

            case 'footer':
              return <FooterSection key="footer" event={event} design={design} />;

            default:
              return null;
          }
        })}
      </div>
    </div>
  );
}

// ── Google Fonts Dynamic Loader ───────────────────────────────────────

function GoogleFontsLoader({ headingFont, bodyFont }: { headingFont: string; bodyFont: string }) {
  const loadedRef = useRef(new Set<string>());

  useEffect(() => {
    const fonts = [headingFont, bodyFont].filter(
      f => f && !loadedRef.current.has(f) && !document.querySelector(`link[data-font="${f}"]`)
    );

    for (const font of fonts) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(font)}:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400&display=swap`;
      link.setAttribute('data-font', font);
      document.head.appendChild(link);
      loadedRef.current.add(font);
    }
  }, [headingFont, bodyFont]);

  return null;
}

// ── Shared Section Wrapper with scroll animations ────────────────────

interface ScrollSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  animation?: 'fade-up' | 'scale-in' | 'slide-left' | 'fade' | 'none';
}

export function ScrollSection({
  children,
  className = '',
  delay = 0,
  animation = 'fade-up',
}: ScrollSectionProps) {
  const variants = {
    'fade-up': {
      initial: { opacity: 0, y: 40 },
      animate: { opacity: 1, y: 0 },
    },
    'scale-in': {
      initial: { opacity: 0, scale: 0.92 },
      animate: { opacity: 1, scale: 1 },
    },
    'slide-left': {
      initial: { opacity: 0, x: -40 },
      animate: { opacity: 1, x: 0 },
    },
    'fade': {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
    },
    'none': {
      initial: {},
      animate: {},
    },
  };

  const v = variants[animation];

  return (
    <motion.section
      className={className}
      initial={v.initial}
      whileInView={v.animate}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.section>
  );
}

// ── Helper: adjust background luminance for custom brand colors ───────
function adjustBgForColor(hex: string): string {
  // For now, just darken the custom color significantly to use as background
  return hex;
}
