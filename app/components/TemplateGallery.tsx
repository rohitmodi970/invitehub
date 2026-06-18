'use client';

import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { LayoutTemplate } from 'lucide-react';
import { TEMPLATES, TEMPLATE_CATEGORIES } from '@/lib/templates/data';
import { EVENT_TYPES, type EventType } from '@/lib/events/types';
import { searchTemplates, getTemplatesByCategory, getTemplateEventType } from '@/lib/utils/template-helpers';
import { TemplateCard } from '@/app/components/TemplateCard';
import { TemplateFilters } from '@/app/components/TemplateFilters';
import type { TemplateCategory } from '@/lib/templates/types';

export function TemplateGallery({ initialEvent }: { initialEvent?: string }) {
  const searchParams = useSearchParams();
  const eventParam = searchParams.get('event') as EventType | null;
  const categoryParam = searchParams.get('category') as TemplateCategory | null;

  const [selectedEvent, setSelectedEvent] = useState<EventType | null>(
    (initialEvent as EventType) || (eventParam && EVENT_TYPES.some((e) => e.id === eventParam) ? eventParam : null)
  );
  const [selectedCategory, setSelectedCategory] = useState<TemplateCategory | null>(
    categoryParam && TEMPLATE_CATEGORIES.some((c) => c.id === categoryParam) ? categoryParam : null
  );
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (eventParam && EVENT_TYPES.some((e) => e.id === eventParam)) {
      setSelectedEvent(eventParam);
    }
  }, [eventParam]);

  useEffect(() => {
    if (categoryParam && TEMPLATE_CATEGORIES.some((c) => c.id === categoryParam)) {
      setSelectedCategory(categoryParam);
    }
  }, [categoryParam]);

  const filteredTemplates = useMemo(() => {
    let results = TEMPLATES;

    if (searchQuery.trim()) {
      results = searchTemplates(searchQuery);
    }

    if (selectedEvent) {
      results = results.filter((t) => getTemplateEventType(t) === selectedEvent);
    }

    if (selectedCategory) {
      results = results.filter((t) => t.category === selectedCategory);
    }

    return results;
  }, [searchQuery, selectedCategory, selectedEvent]);

  const activeEventDef = selectedEvent ? EVENT_TYPES.find((e) => e.id === selectedEvent) : null;
  const pageTitle = activeEventDef
    ? `${activeEventDef.label} Invitation Templates`
    : 'Invitation Templates';
  const pageSubtitle = activeEventDef
    ? activeEventDef.description
    : 'Browse wedding, birthday, engagement, and more';

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 mb-4"
          >
            <LayoutTemplate className="text-blue-600" size={32} />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{pageTitle}</h1>
              <p className="text-gray-600">{pageSubtitle}</p>
            </div>
          </motion.div>

          {/* Event Type Tabs */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedEvent(null)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                selectedEvent === null
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              All Events
            </button>
            {EVENT_TYPES.map((event) => (
              <button
                key={event.id}
                onClick={() => setSelectedEvent(event.id)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                  selectedEvent === event.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {event.emoji} {event.label}
              </button>
            ))}
          </div>
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
            <div className="sticky top-36 bg-white rounded-lg shadow-sm p-6 border border-gray-200">
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
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                {searchQuery
                  ? 'Search Results'
                  : activeEventDef
                  ? `${activeEventDef.label} Templates`
                  : selectedCategory
                  ? TEMPLATE_CATEGORIES.find((c) => c.id === selectedCategory)?.label
                  : 'All Templates'}
              </h2>
              <p className="text-gray-600">
                {filteredTemplates.length} {filteredTemplates.length === 1 ? 'template' : 'templates'} found
              </p>
            </div>

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
                <p className="text-gray-600 mb-6">Try adjusting your search or filters</p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory(null);
                    setSelectedEvent(null);
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
