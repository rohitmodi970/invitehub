import { TEMPLATES } from '@/lib/templates/data';
import type { Template, TemplateCategory } from '@/lib/templates/types';

export function getTemplatesByCategory(category: TemplateCategory): Template[] {
  return TEMPLATES.filter((t) => t.category === category);
}

export function searchTemplates(query: string): Template[] {
  const lowerQuery = query.toLowerCase();
  return TEMPLATES.filter(
    (t) =>
      t.name.toLowerCase().includes(lowerQuery) ||
      t.description.toLowerCase().includes(lowerQuery) ||
      t.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))
  );
}

export function getTemplateById(id: string): Template | undefined {
  return TEMPLATES.find((t) => t.id === id);
}

export function getPopularTemplates(limit: number = 6): Template[] {
  return TEMPLATES.filter((t) => t.isPopular).slice(0, limit);
}

export function getNewTemplates(limit: number = 6): Template[] {
  return TEMPLATES.filter((t) => t.isNew).slice(0, limit);
}

export function getTemplatesByTier(tier: 'free' | 'premium' | 'premium-plus'): Template[] {
  return TEMPLATES.filter((t) => t.tier === tier);
}

export function getRelatedTemplates(templateId: string, limit: number = 4): Template[] {
  const template = getTemplateById(templateId);
  if (!template) return [];

  return TEMPLATES.filter((t) => t.id !== templateId && t.category === template.category).slice(0, limit);
}
