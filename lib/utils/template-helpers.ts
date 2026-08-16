import { TEMPLATES } from '@/lib/templates/data';
import type { EventType } from '@/lib/events/types';
import { getDefaultEventData } from '@/lib/events/defaults';
import type { Template, TemplateCategory } from '@/lib/templates/types';
import type { EventData } from '@/lib/events/event-data';

export function getTemplateEventType(template: Template): EventType {
  return template.eventType ?? 'wedding';
}

export function getTemplatesByEventType(eventType: EventType): Template[] {
  return TEMPLATES.filter((t) => getTemplateEventType(t) === eventType);
}

export function getSampleDataForTemplate(template: Template): Partial<EventData> {
  return getDefaultEventData(getTemplateEventType(template));
}

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

  const eventType = getTemplateEventType(template);
  const sameEvent = TEMPLATES.filter(
    (t) => t.id !== templateId && getTemplateEventType(t) === eventType
  );
  if (sameEvent.length >= limit) {
    return sameEvent.slice(0, limit);
  }
  const sameCategory = TEMPLATES.filter(
    (t) => t.id !== templateId && t.category === template.category
  );
  return [...sameEvent, ...sameCategory.filter((t) => !sameEvent.includes(t))].slice(0, limit);
}
