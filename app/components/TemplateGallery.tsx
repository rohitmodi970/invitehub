'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { LayoutTemplate } from 'lucide-react';
import { TEMPLATES, TEMPLATE_CATEGORIES } from '@/lib/templates/data';
import { searchTemplates, getTemplatesByCategory } from '@/lib/utils/template-helpers';
import { TemplateCard } from '@/app/components/TemplateCard';
import { TemplateFilters } from '@/app/components/TemplateFilters';
import type { TemplateCategory } from '@/lib/templates/types';

export function TemplateGallery() {
  const [selectedCategory, setSelectedCategory] = useState<TemplateCategory | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTemplates = useMemo(() => {
    let results = TEMPLATES;

    // Apply search filter
    if (searchQuery.trim()) {
      results = searchTemplates(searchQuery);
    }

    // Apply category filter
    if (selectedCategory) {
      results = results.filter((t) => t.category === selectedCategory);
    }

    return results;
  }, [searchQuery, selectedCategory]);

  const categoryCount = selectedCategory
    ? getTemplatesByCategory(selectedCategory).length
    : TEMPLATES.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 mb-2"
          >
            <LayoutTemplate className="text-blue-600" size={32} />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Wedding Invitation Templates</h1>
              <p className="text-gray-600">Browse and select from our beautiful collection</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Filters */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="sticky top-24 bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <TemplateFilters
                selectedCategory={selectedCategory}
                searchQuery={searchQuery}
                onCategoryChange={setSelectedCategory}
                onSearchChange={setSearchQuery}
              />
            </div>
          </motion.div>

          {/* Main Content - Templates Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-3"
          >
            {/* Results Header */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                {searchQuery ? 'Search Results' : selectedCategory ? TEMPLATE_CATEGORIES.find((c) => c.id === selectedCategory)?.label : 'All Templates'}
              </h2>
              <p className="text-gray-600">
                {filteredTemplates.length} {filteredTemplates.length === 1 ? 'template' : 'templates'} found
              </p>
            </div>

            {/* Templates Grid */}
            {filteredTemplates.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTemplates.map((template, index) => (
                  <TemplateCard key={template.id} template={template} index={index} />
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full text-center py-16"
              >
                <LayoutTemplate className="mx-auto mb-4 text-gray-400" size={48} />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No templates found</h3>
                <p className="text-gray-600 mb-6">Try adjusting your search or category filters</p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory(null);
                  }}
                  className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors"
                >
                  Clear Filters
                </button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
