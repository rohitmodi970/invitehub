// Auto-generated registry
import type { TemplateRegistry } from '../types';

import { elegant_gold_001 } from './elegant-gold-001';
import { modern_geometric_002 } from './modern-geometric-002';
import { romantic_vintage_003 } from './romantic-vintage-003';
import { traditional_indian_004 } from './traditional-indian-004';
import { royal_purple_005 } from './royal-purple-005';
import { floral_bloom_006 } from './floral-bloom-006';
import { modern_blush_007 } from './modern-blush-007';
import { traditional_maroon_008 } from './traditional-maroon-008';
import { luxury_black_009 } from './luxury-black-009';
import { pastel_garden_010 } from './pastel-garden-010';

export const templateRegistry: TemplateRegistry = {
  'elegant-gold-001': elegant_gold_001,
  'modern-geometric-002': modern_geometric_002,
  'romantic-vintage-003': romantic_vintage_003,
  'traditional-indian-004': traditional_indian_004,
  'royal-purple-005': royal_purple_005,
  'floral-bloom-006': floral_bloom_006,
  'modern-blush-007': modern_blush_007,
  'traditional-maroon-008': traditional_maroon_008,
  'luxury-black-009': luxury_black_009,
  'pastel-garden-010': pastel_garden_010,
};

export function getTemplateDefinition(id: string) {
  return templateRegistry[id] || Object.values(templateRegistry)[0];
}
