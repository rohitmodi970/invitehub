/**
 * Template Engine Type System
 *
 * A TemplateDefinition is a pure configuration object — NOT a React component.
 * The EventPageRenderer reads a TemplateDefinition + EventData and renders the event page.
 *
 * Benefits:
 *  - Adding 100 templates = writing 100 config objects (~30 lines each)
 *  - Bug fixes apply to ALL templates (no per-template patching)
 *  - Consistent feature support across all templates
 *  - Easy A/B testing of section order/layout
 */

import type { EventCategory, EventType } from '@/lib/events/event-data';

// ── Section Types ─────────────────────────────────────────────────────

export type SectionType =
  | 'hero'
  | 'countdown'
  | 'details'
  | 'venue-map'
  | 'virtual-link'
  | 'agenda'
  | 'gallery'
  | 'calendar'
  | 'rsvp'
  | 'contact'
  | 'footer';

export interface TemplateSectionConfig {
  type: SectionType;
  /** If false, section never renders even if event has data for it */
  enabled: boolean;
  /** Lower = appears first on the page */
  order: number;
  /** Visual variant within this section type */
  variant?: 'default' | 'minimal' | 'full' | 'split' | 'centered' | 'side';
}

// ── Background Effects ────────────────────────────────────────────────

export type BackgroundEffect =
  | 'none'
  | 'stars'           // Twinkling star particles — dark, romantic templates
  | 'confetti'        // Floating colored dots — birthday, celebratory templates
  | 'particles'       // Subtle geometric shapes — professional templates
  | 'gradient-mesh'   // Animated gradient blobs — modern templates
  | 'bokeh'           // Soft light circles — elegant templates
  | 'petals';         // Falling flower petals — traditional Indian templates

// ── Layout Options ────────────────────────────────────────────────────

export type TemplateLayout =
  | 'centered'        // Single column centered content (most templates)
  | 'split'           // Left: visual, Right: details (editorial style)
  | 'editorial'       // Full-width sections with alternating layouts
  | 'fullbleed';      // Full-viewport hero sections

export type CardStyle =
  | 'glass'           // backdrop-blur + transparent border
  | 'solid'           // opaque background card
  | 'outline'         // border only, transparent background
  | 'none';           // no card styling, content flows freely

// ── Design Tokens ────────────────────────────────────────────────────

export interface TemplateDesign {
  // ── Typography ────────────────────────────────────────────────────
  /** Google Font name for headings: "Playfair Display" | "Space Grotesk" | "Cormorant Garamond" */
  headingFont: string;
  /** Google Font name for body text: "Inter" | "Outfit" | "Lato" */
  bodyFont: string;
  headingWeight: 400 | 500 | 600 | 700 | 800 | 900;

  // ── Color System ──────────────────────────────────────────────────
  /** Main page background — can be solid color or CSS gradient */
  backgroundColor: string;
  /** Primary text color */
  textColor: string;
  /** Main accent / brand color (for buttons, headings, highlights) */
  accentColor: string;
  /** Supporting accent color */
  secondaryColor: string;
  /** Card/surface backgrounds */
  surfaceColor: string;
  /** Muted text (secondary content) */
  mutedTextColor: string;
  /** Border color for cards and dividers */
  borderColor: string;

  // ── Effects & Motion ─────────────────────────────────────────────
  backgroundEffect: BackgroundEffect;
  /** How each section enters the viewport */
  entranceAnimation: 'fade-up' | 'scale-in' | 'slide-left' | 'fade' | 'none';
  /** Scroll behavior for the overall page */
  scrollAnimation: 'parallax' | 'fade-sections' | 'none';

  // ── Layout & Shape ────────────────────────────────────────────────
  layout: TemplateLayout;
  borderRadius: string;            // e.g., "16px" | "0px" | "50%"
  cardStyle: CardStyle;
  /** Content max-width: "480px" | "640px" | "800px" */
  maxWidth: string;

  // ── Decorative Elements ───────────────────────────────────────────
  /** Emoji or icon to show in hero section */
  heroIcon?: string;               // e.g., "💒" | "🎂" | "🎤"
  /** Show a decorative divider between sections */
  useDividers: boolean;

  // ── Raw CSS escape hatch for truly unique templates ───────────────
  customCSS?: string;
}

// ── Template Definition ───────────────────────────────────────────────

export interface TemplateDefinition {
  // ── Identity ──────────────────────────────────────────────────────
  /** e.g., "midnight-romance-013" */
  id: string;
  /** e.g., "Midnight Romance" */
  name: string;
  description: string;

  // ── Classification ────────────────────────────────────────────────
  /** Which engine this template belongs to */
  category: EventCategory;
  /** Which event types this template supports */
  eventTypes: EventType[];
  /** Searchable tags */
  tags: string[];
  /** Pricing tier */
  tier: 'free' | 'premium' | 'premium-plus';

  // ── Discovery ─────────────────────────────────────────────────────
  previewImageUrl: string;
  thumbnailUrl: string;
  isPopular?: boolean;
  isNew?: boolean;
  sortOrder?: number;

  // ── Design ────────────────────────────────────────────────────────
  design: TemplateDesign;

  // ── Section Configuration ─────────────────────────────────────────
  /**
   * Which sections appear and in what order.
   * Missing sections default to enabled=false.
   * Sections only render if both enabled=true AND the event has data for them.
   */
  sections: TemplateSectionConfig[];
}

// ── Registry types ───────────────────────────────────────────────────

export type TemplateRegistry = Record<string, TemplateDefinition>;

// ── Default section order (used for new templates) ───────────────────

export const DEFAULT_SECTIONS: TemplateSectionConfig[] = [
  { type: 'hero',        enabled: true,  order: 1 },
  { type: 'countdown',   enabled: true,  order: 2 },
  { type: 'details',     enabled: true,  order: 3 },
  { type: 'venue-map',   enabled: true,  order: 4 },
  { type: 'virtual-link',enabled: true,  order: 4 }, // mutually exclusive with venue-map
  { type: 'agenda',      enabled: true,  order: 5 },
  { type: 'gallery',     enabled: true,  order: 6 },
  { type: 'calendar',    enabled: true,  order: 7 },
  { type: 'rsvp',        enabled: true,  order: 8 },
  { type: 'contact',     enabled: true,  order: 9 },
  { type: 'footer',      enabled: true,  order: 10 },
];

/** Merge custom sections with defaults */
export function buildSections(overrides: Partial<TemplateSectionConfig>[]): TemplateSectionConfig[] {
  const sectionMap = new Map<SectionType, TemplateSectionConfig>();
  for (const s of DEFAULT_SECTIONS) {
    sectionMap.set(s.type, { ...s });
  }
  for (const o of overrides) {
    if (o.type) {
      const existing = sectionMap.get(o.type);
      if (existing) {
        sectionMap.set(o.type, { ...existing, ...o });
      }
    }
  }
  return Array.from(sectionMap.values()).sort((a, b) => a.order - b.order);
}
