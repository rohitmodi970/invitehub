'use client';

import { Suspense } from 'react';
import { TemplateGallery } from '@/app/components/TemplateGallery';

// We wrap TemplateGallery in Suspense because it uses useSearchParams
export function CategoryPageClient({ eventType }: { eventType: string }) {
  // We can pass an initial filter to TemplateGallery or just let the URL handle it.
  // Actually, TemplateGallery reads from URL search params.
  // Wait, if it's a static route, the URL won't have ?event=wedding, it will just be /templates/wedding.
  // So TemplateGallery needs to be updated or we pass props to it.
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center">Loading...</div>}>
      <TemplateGallery initialEvent={eventType} />
    </Suspense>
  );
}
