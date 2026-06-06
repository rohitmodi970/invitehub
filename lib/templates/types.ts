export type TemplateCategory = 'wedding' | 'royal' | 'floral' | 'traditional-indian' | 'modern';
export type TemplateTier = 'free' | 'premium' | 'premium-plus';

export interface Template {
  id: string;
  name: string;
  description: string;
  category: TemplateCategory;
  previewUrl: string;
  thumbnailUrl: string;
  tier: TemplateTier;
  tags: string[];
  features: string[];
  isNew?: boolean;
  isPopular?: boolean;
}

export interface TemplateCategoryDef {
  id: TemplateCategory;
  label: string;
  description: string;
  count?: number;
}
