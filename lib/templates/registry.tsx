import { ElegantGoldTemplate } from '@/app/templates/elegant-gold-001/components/ElegantGoldTemplate';
import { ModernGeometricTemplate } from '@/app/templates/modern-geometric-002/components/ModernGeometricTemplate';
import { RomanticVintageTemplate } from '@/app/templates/romantic-vintage-003/components/RomanticVintageTemplate';
import { TraditionalIndianTemplate } from '@/app/templates/traditional-indian-004/components/TraditionalIndianTemplate';
import { RoyalPurpleTemplate } from '@/app/templates/royal-purple-005/components/RoyalPurpleTemplate';
import { WhiteEleganceTemplate } from '@/app/templates/wedding/WhiteEleganceTemplate';
import { BotanicalGardenTemplate } from '@/app/templates/wedding/BotanicalGardenTemplate';
import { MidnightRomanceTemplate } from '@/app/templates/wedding/MidnightRomanceTemplate';
import { ArcMinimalistTemplate } from '@/app/templates/modern/ArcMinimalistTemplate';
import { InkBlushTemplate } from '@/app/templates/modern/InkBlushTemplate';
import { TypewriterNeoBrutalTemplate } from '@/app/templates/modern/TypewriterNeoBrutalTemplate';
import { GoldenPaisleyTemplate } from '@/app/templates/traditional/GoldenPaisleyTemplate';
import { MarigoldFiestaTemplate } from '@/app/templates/traditional/MarigoldFiestaTemplate';
import { KeralaTempleTemplate } from '@/app/templates/traditional/KeralaTempleTemplate';
import { ModernFloralGeometricTemplate } from '@/app/templates/modern/Modern_geometric_wedding_invitation';
import { FloralBloomTemplate } from '@/app/templates/wedding/FloralBloomTemplate';
import { ModernBlushTemplate } from '@/app/templates/modern/ModernBlushTemplate';
import { TraditionalMaroonTemplate } from '@/app/templates/traditional/TraditionalMaroonTemplate';
import { LuxuryBlackTemplate } from '@/app/templates/modern/LuxuryBlackTemplate';
import { PastelGardenTemplate } from '@/app/templates/wedding/PastelGardenTemplate';
import { BirthdayConfettiTemplate } from '@/app/templates/events/BirthdayConfettiTemplate';
import { EngagementRingsTemplate } from '@/app/templates/events/EngagementRingsTemplate';
import { BabyShowerCloudTemplate } from '@/app/templates/events/BabyShowerCloudTemplate';
import { HousewarmingHomeTemplate } from '@/app/templates/events/HousewarmingHomeTemplate';
import { AnniversaryHeartsTemplate } from '@/app/templates/events/AnniversaryHeartsTemplate';
import { CorporateMinimalTemplate } from '@/app/templates/events/CorporateMinimalTemplate';
import { BirthdayNeonGlowTemplate } from '@/app/templates/events/birthday/BirthdayNeonGlowTemplate';
import { BirthdayBalloonBurstTemplate } from '@/app/templates/events/birthday/BirthdayBalloonBurstTemplate';
import { BirthdayGoldGlamTemplate } from '@/app/templates/events/birthday/BirthdayGoldGlamTemplate';
import { BirthdayGardenPartyTemplate } from '@/app/templates/events/birthday/BirthdayGardenPartyTemplate';
import { BirthdayRetroDiscoTemplate } from '@/app/templates/events/birthday/BirthdayRetroDiscoTemplate';
import { BabyShowerSafariTemplate } from '@/app/templates/events/baby-shower/BabyShowerSafariTemplate';
import { BabyShowerPastelRainbowTemplate } from '@/app/templates/events/baby-shower/BabyShowerPastelRainbowTemplate';
import { BabyShowerMoonStarsTemplate } from '@/app/templates/events/baby-shower/BabyShowerMoonStarsTemplate';
import { BabyShowerFloralPinkTemplate } from '@/app/templates/events/baby-shower/BabyShowerFloralPinkTemplate';
import { BabyShowerMinimalNurseryTemplate } from '@/app/templates/events/baby-shower/BabyShowerMinimalNurseryTemplate';
import { CorporateExecutiveNavyTemplate } from '@/app/templates/events/corporate/CorporateExecutiveNavyTemplate';
import { CorporateTechSummitTemplate } from '@/app/templates/events/corporate/CorporateTechSummitTemplate';
import type { InvitationData, TemplateProps } from '@/lib/invitations/types';

export type { InvitationData, TemplateProps };

// Fallback empty component for missing ones
const PlaceholderTemplate = ({ data }: TemplateProps) => (
  <div className="w-full max-w-[420px] min-h-[640px] bg-gray-200 flex items-center justify-center text-gray-500">
    <p>Template coming soon: {data.brideName} & {data.groomName}</p>
  </div>
);

export const TEMPLATE_COMPONENTS: Record<string, React.FC<TemplateProps>> = {
  'elegant-gold-001': ElegantGoldTemplate,
  'modern-geometric-002': ModernGeometricTemplate,
  'romantic-vintage-003': RomanticVintageTemplate,
  'traditional-indian-004': TraditionalIndianTemplate,
  'royal-purple-005': RoyalPurpleTemplate,
  'floral-bloom-006': FloralBloomTemplate,
  'modern-blush-007': ModernBlushTemplate,
  'traditional-maroon-008': TraditionalMaroonTemplate,
  'luxury-black-009': LuxuryBlackTemplate,
  'pastel-garden-010': PastelGardenTemplate,
  'white-elegance-011': WhiteEleganceTemplate,
  'botanical-garden-012': BotanicalGardenTemplate,
  'midnight-romance-013': MidnightRomanceTemplate,
  'arc-minimalist-014': ArcMinimalistTemplate,
  'ink-blush-015': InkBlushTemplate,
  'neo-brutal-016': TypewriterNeoBrutalTemplate,
  'golden-paisley-017': GoldenPaisleyTemplate,
  'marigold-fiesta-018': MarigoldFiestaTemplate,
  'kerala-temple-019': KeralaTempleTemplate,
  'modern-floral-020': ModernFloralGeometricTemplate,
  'birthday-confetti-021': BirthdayConfettiTemplate,
  'engagement-rings-022': EngagementRingsTemplate,
  'baby-shower-cloud-023': BabyShowerCloudTemplate,
  'housewarming-home-024': HousewarmingHomeTemplate,
  'anniversary-hearts-025': AnniversaryHeartsTemplate,
  'corporate-minimal-026': CorporateMinimalTemplate,
  'birthday-neon-glow-027': BirthdayNeonGlowTemplate,
  'birthday-balloon-burst-028': BirthdayBalloonBurstTemplate,
  'birthday-gold-glam-029': BirthdayGoldGlamTemplate,
  'birthday-garden-party-030': BirthdayGardenPartyTemplate,
  'birthday-retro-disco-031': BirthdayRetroDiscoTemplate,
  'baby-shower-safari-032': BabyShowerSafariTemplate,
  'baby-shower-pastel-rainbow-033': BabyShowerPastelRainbowTemplate,
  'baby-shower-moon-stars-034': BabyShowerMoonStarsTemplate,
  'baby-shower-floral-pink-035': BabyShowerFloralPinkTemplate,
  'baby-shower-minimal-nursery-036': BabyShowerMinimalNurseryTemplate,
  'corporate-executive-navy-037': CorporateExecutiveNavyTemplate,
  'corporate-tech-summit-038': CorporateTechSummitTemplate,
};

export function getTemplateComponent(id: string): React.FC<TemplateProps> {
  return TEMPLATE_COMPONENTS[id] || PlaceholderTemplate;
}
