'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Pencil, Download, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { templateRegistry, getTemplateDefinition } from '@/lib/templates/engine/definitions';
import type { EventData, EventType } from '@/lib/events/event-data';
import { getDefaultEventData } from '@/lib/events/defaults';
import { EditorForm } from '@/app/editor/[templateId]/EditorForm';
import { CheckoutFlow, PlanType } from '@/app/components/checkout/CheckoutFlow';
import EventPageRenderer from '@/app/components/event-page/EventPageRenderer';
import { LOGO_IMAGE } from '@/lib/images/paths';
import Image from 'next/image';

export function EditorWorkspace({ initialTemplateId }: { initialTemplateId: string }) {
  const initialTemplate = getTemplateDefinition(initialTemplateId);
  const initialEventType = (initialTemplate.tags?.[0] as EventType) || 'wedding';

  const router = useRouter();
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeTemplateId, setActiveTemplateId] = useState(initialTemplateId);
  const [eventType, setEventType] = useState<EventType>(initialEventType);
  const [data, setData] = useState<Partial<EventData>>(() => getDefaultEventData(initialEventType));
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const saved = localStorage.getItem('invitehub-draft-2.0');
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as Partial<EventData>;
        setData(parsed);
        if (parsed.eventType) setEventType(parsed.eventType as EventType);
      } catch { /* ignore */ }
    }
  }, []);

  useEffect(() => {
    if (isMounted) {
      window.history.replaceState(null, '', `/editor/${activeTemplateId}`);
    }
  }, [activeTemplateId, isMounted]);

  const handleDataChange = (newData: Partial<EventData>) => {
    const withEvent = { ...newData, eventType };
    setData(withEvent);
    localStorage.setItem('invitehub-draft-2.0', JSON.stringify(withEvent));
  };

  const handleTemplateSwitch = (templateId: string) => {
    const template = getTemplateDefinition(templateId);
    if (!template) return;
    const newEventType = (template.tags?.[0] as EventType) || 'wedding';
    setActiveTemplateId(templateId);
    
    if (newEventType !== eventType) {
      setEventType(newEventType);
      const defaults = getDefaultEventData(newEventType);
      setData(defaults);
      localStorage.setItem('invitehub-draft-2.0', JSON.stringify(defaults));
    }
  };

  const carouselTemplates = Object.values(templateRegistry)
    .filter((t) => t.tags?.includes(eventType));

  const handleCheckoutSuccess = useCallback((plan: PlanType, slug?: string) => {
    setIsCheckoutOpen(false);
    if (plan === 'digital-suite' && slug) {
      localStorage.removeItem('invitehub-draft-2.0');
      router.push(`/e/${slug}`);
    }
  }, [router]);

  const scrollCarousel = (dir: 'left' | 'right') => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: dir === 'left' ? -200 : 200, behavior: 'smooth' });
    }
  };

  if (!isMounted) return null;

  const activeTemplateDef = getTemplateDefinition(activeTemplateId);
  const safeData = data as EventData; // Cast for renderer props

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-[#f0f2f5]">

      {/* ── Top Bar ── */}
      <div className="shrink-0 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between z-10 shadow-sm">
        <div className="flex items-center gap-2">
          <Image src={LOGO_IMAGE} alt="InviteHub" width={160} height={40} className="h-8 w-auto object-contain" />
          <span className="hidden sm:inline text-gray-400 text-sm ml-2">/ Editor</span>
        </div>
        <div className="flex items-center gap-2">
          {isDownloading && <span className="text-xs text-blue-500 font-medium mr-2 animate-pulse">Preparing...</span>}
          <span className="text-xs text-gray-400 hidden sm:block">Changes auto-saved</span>
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
        </div>
      </div>

      {/* ── Preview Area ── */}
      <div className="flex-1 overflow-hidden flex items-center justify-center p-4 sm:p-6 min-h-0 bg-[#e5e7eb]">
        <div
          className="relative shadow-2xl rounded-xl overflow-hidden bg-white w-full max-w-[400px] h-full max-h-[850px]"
        >
          <div className="w-full h-full overflow-y-auto no-scrollbar relative">
            <EventPageRenderer event={safeData} template={activeTemplateDef} />
          </div>

          {/* Watermark overlay */}
          <div className="absolute inset-x-0 bottom-0 py-2.5 bg-gradient-to-t from-black/80 to-transparent flex items-end justify-center pb-3 z-50 pointer-events-none">
            <span className="text-white/90 text-xs font-semibold tracking-wide flex items-center gap-1.5 bg-black/40 px-3 py-1.5 rounded-full backdrop-blur-sm">
              <span className="text-amber-400">✨</span> Publish to share link
            </span>
          </div>
        </div>
      </div>

      {/* ── Bottom Panel ── */}
      <div className="shrink-0 bg-white border-t border-gray-200 shadow-[0_-8px_30px_rgba(0,0,0,0.07)] z-20">

        {/* Template Carousel */}
        <div className="relative border-b border-gray-100">
          <button
            onClick={() => scrollCarousel('left')}
            className="absolute left-0 top-0 bottom-0 z-10 px-1.5 bg-gradient-to-r from-white to-transparent text-gray-500 hover:text-gray-800 flex items-center"
          >
            <ChevronLeft size={20} />
          </button>

          <div
            ref={carouselRef}
            className="flex gap-3 p-3 overflow-x-auto no-scrollbar px-8"
            style={{ scrollbarWidth: 'none' }}
          >
            {carouselTemplates.map((t) => {
              const isSelected = activeTemplateId === t.id;
              // Very mini preview via zooming out the renderer 
              const previewData = getDefaultEventData(eventType) as EventData;
              
              return (
                <button
                  key={t.id}
                  onClick={() => handleTemplateSwitch(t.id)}
                  className={`group relative flex flex-col items-center gap-1.5 shrink-0 transition-all duration-200 ${
                    isSelected ? 'opacity-100' : 'opacity-50 hover:opacity-80'
                  }`}
                >
                  <div className={`relative w-16 h-24 rounded-lg overflow-hidden border-2 transition-all duration-200 bg-white ${
                    isSelected
                      ? 'border-blue-600 shadow-lg shadow-blue-500/20 scale-105'
                      : 'border-transparent hover:border-gray-300'
                  }`}>
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{ transform: 'scale(0.12)', transformOrigin: 'top left', width: '830%', height: '830%' }}
                    >
                       <EventPageRenderer event={previewData} template={t} />
                    </div>
                    {isSelected && (
                      <div className="absolute inset-0 bg-blue-600/15 flex items-center justify-center">
                        <div className="bg-blue-600 text-white rounded-full p-0.5 shadow-md">
                          <Check size={12} />
                        </div>
                      </div>
                    )}
                  </div>
                  <span className="text-[10px] font-medium text-gray-600 whitespace-nowrap max-w-[64px] truncate">
                    {t.name}
                  </span>
                </button>
              );
            })}
          </div>

          <button
            onClick={() => scrollCarousel('right')}
            className="absolute right-0 top-0 bottom-0 z-10 px-1.5 bg-gradient-to-l from-white to-transparent text-gray-500 hover:text-gray-800 flex items-center"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Action Buttons */}
        <div className="p-3 sm:p-4 flex items-center justify-center gap-2 max-w-lg mx-auto">
          <button
            onClick={() => setIsFormOpen(true)}
            className="flex-1 flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-gray-900 hover:bg-gray-800 text-white font-semibold text-sm transition-all shadow-md hover:shadow-lg active:scale-95"
          >
            <Pencil size={16} />
            Edit
          </button>

          <button
            onClick={() => setIsCheckoutOpen(true)}
            className="flex-[2] flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold text-sm transition-all shadow-md shadow-orange-400/30 hover:shadow-lg active:scale-95"
          >
            <Download size={16} />
            Publish / Share
          </button>
        </div>
      </div>

      {/* ── Editor Form Modal ── */}
      {isFormOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={(e) => { if (e.target === e.currentTarget) setIsFormOpen(false); }}
        >
          <div className="w-full max-w-xl bg-white rounded-t-3xl sm:rounded-2xl shadow-2xl max-h-[92vh] flex flex-col animate-in slide-in-from-bottom-10 sm:zoom-in-95 duration-300">
            <EditorForm
              data={data}
              eventType={eventType}
              onDataChange={handleDataChange}
              onClose={() => setIsFormOpen(false)}
            />
          </div>
        </div>
      )}

      {/* ── Checkout Flow ── */}
      {isCheckoutOpen && (
        <CheckoutFlow
          templateId={activeTemplateId}
          invitationData={data}
          onClose={() => setIsCheckoutOpen(false)}
          onSuccess={handleCheckoutSuccess}
        />
      )}

      {/* ── Hidden render for download (used by html-to-image) ── */}
      <div style={{ position: 'absolute', left: '-9999px', top: '-9999px', pointerEvents: 'none', zIndex: -1 }}>
        <div id="download-container" className="w-[400px] h-[850px] bg-white">
          <EventPageRenderer event={safeData} template={activeTemplateDef} />
        </div>
      </div>
    </div>
  );
}
