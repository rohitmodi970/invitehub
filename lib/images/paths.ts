import type { EventType } from '@/lib/events/types';

/** Public URL prefix for template preview / thumbnail assets */
export const TEMPLATE_IMAGES = '/images/templates';

export const SITE_ORIGIN = 'https://invitehub.in';

export function templateImage(filename: string): string {
  return `${TEMPLATE_IMAGES}/${filename}`;
}

export function absoluteImage(path: string): string {
  return `${SITE_ORIGIN}${path}`;
}

export const LOGO_IMAGE = templateImage('elegant_logo_with_domain_written.png');
export const SITE_LOGO = templateImage('logo.png');
export const OG_IMAGE = templateImage('og-image.png');
export const TWITTER_IMAGE = templateImage('twitter-image.png');

/** Hero images for event-category SEO pages (must exist under public/images/templates/) */
export const EVENT_HERO_IMAGES: Record<EventType, string> = {
  // Personal
  wedding: templateImage('Elegant gold wedding invitation design.png'),
  birthday: templateImage('birthday-confetti.png'),
  engagement: templateImage('engagement-rings.png'),
  'baby-shower': templateImage('baby-shower-cloud.png'),
  housewarming: templateImage('housewarming-home.png'),
  anniversary: templateImage('anniversary-hearts.png'),
  farewell: templateImage('farewell-wave.png'),
  // Professional
  corporate: templateImage('corporate-minimal.png'),
  conference: templateImage('corporate-minimal.png'),
  'product-launch': templateImage('corporate-minimal.png'),
  retirement: templateImage('corporate-minimal.png'),
  webinar: templateImage('corporate-minimal.png'),
  networking: templateImage('corporate-minimal.png'),
  townhall: templateImage('corporate-minimal.png'),
  workshop: templateImage('corporate-minimal.png'),
  school: templateImage('corporate-minimal.png'),
  community: templateImage('corporate-minimal.png'),
};
