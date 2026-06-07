'use client';

import { useState } from 'react';
import { Search, X } from 'lucide-react';
import { TEMPLATE_CATEGORIES } from '@/lib/templates/data';
import type { TemplateCategory } from '@/lib/templates/types';

interface TemplateFiltersProps {
  selectedCategory: TemplateCategory | null;
  searchQuery: string;
  onCategoryChange: (category: TemplateCategory | null) => void;
  onSearchChange: (query: string) => void;
}

export function TemplateFilters({
  selectedCategory,
  searchQuery,
  onCategoryChange,
  onSearchChange,
}: TemplateFiltersProps) {
  const [localSearch, setLocalSearch] = useState(searchQuery);

  const handleSearchChange = (value: string) => {
    setLocalSearch(value);
    onSearchChange(value);
  };

  const handleClearSearch = () => {
    setLocalSearch('');
    onSearchChange('');
  };

  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search templates by name or style..."
          value={localSearch}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
        />
        {localSearch && (
          <button
            onClick={handleClearSearch}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X size={20} />
          </button>
        )}
      </div>

      {/* Categories */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-3">Categories</h3>
        <div className="space-y-2">
          {/* All Templates */}
          <button
            onClick={() => onCategoryChange(null)}
            className={`w-full text-left px-4 py-2 rounded-lg transition-all ${
              selectedCategory === null
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All Templates
          </button>

          {/* Category Buttons */}
          {TEMPLATE_CATEGORIES.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id as TemplateCategory)}
              className={`w-full text-left px-4 py-2 rounded-lg transition-all ${
                selectedCategory === category.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <span className="font-medium">{category.label}</span>
              <span className="text-sm opacity-75 ml-2">({category.description})</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
