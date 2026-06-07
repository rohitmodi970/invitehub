'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Pencil, Download, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { TEMPLATES } from '@/lib/templates/data';
import { getTemplateComponent } from '@/lib/templates/registry';
import { InvitationData } from '@/app/templates/traditional-indian-004/components/TraditionalIndianTemplate';
import { EditorForm } from '@/app/editor/[templateId]/EditorForm';
import { CheckoutFlow, PlanType } from '@/app/components/checkout/CheckoutFlow';

const defaultData: InvitationData = {
  brideName: 'Priya',
  groomName: 'Rahul',
  weddingDate: '24th November 2026',
  weddingTime: '7:00 PM Onwards',
  venueName: 'The Grand Taj Palace',
  venueAddress: 'Diplomatic Enclave, New Delhi',
  additionalMessage: 'Join us to celebrate our new beginning.',
};

export function EditorWorkspace({ initialTemplateId }: { initialTemplateId: string }) {
  const router = useRouter();
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeTemplateId, setActiveTemplateId] = useState(initialTemplateId);
  const [data, setData] = useState<InvitationData>(defaultData);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const saved = localStorage.getItem('invitehub-draft');
    if (saved) {
      try { setData(JSON.parse(saved)); } catch (e) { /* ignore */ }
    }
  }, []);

  useEffect(() => {
    if (isMounted) {
      window.history.replaceState(null, '', `/editor/${activeTemplateId}`);
    }
  }, [activeTemplateId, isMounted]);

  const handleDataChange = (newData: InvitationData) => {
    setData(newData);
    localStorage.setItem('invitehub-draft', JSON.stringify(newData));
  };

  const handleCheckoutSuccess = useCallback((plan: PlanType, slug?: string) => {
    setIsCheckoutOpen(false);
    localStorage.removeItem('invitehub-draft');
    if (plan === 'digital-suite' && slug) {
      router.push(`/i/${slug}`);
    } else {
      // For basic/print-ready: show a brief success state (download handled by backend/future)
      alert('Payment successful! Your invitation download will begin shortly. (Download feature coming soon — check your email)');
    }
  }, [router]);

  const scrollCarousel = (dir: 'left' | 'right') => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: dir === 'left' ? -200 : 200, behavior: 'smooth' });
    }
  };

  if (!isMounted) return null;

  const ActiveComponent = getTemplateComponent(activeTemplateId);

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-[#f0f2f5]">

      {/* ── Top Bar ── */}
      <div className="shrink-0 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between z-10 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="text-xl">💍</span>
          <span className="font-bold text-gray-900 text-base tracking-tight">InviteHub</span>
          <span className="hidden sm:inline text-gray-400 text-sm ml-2">/ Editor</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400 hidden sm:block">Changes auto-saved</span>
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
        </div>
      </div>

      {/* ── Preview Area ── */}
      <div className="flex-1 overflow-hidden flex items-center justify-center p-4 sm:p-6 min-h-0">
        <div
          className="relative shadow-2xl rounded-xl overflow-hidden"
          style={{
            /* Scale the preview so it fits perfectly in the available space */
            maxHeight: '100%',
            maxWidth: '100%',
          }}
        >
          {/* Scale wrapper — the template renders at its natural size, then we scale it down */}
          <div
            style={{
              transform: 'scale(var(--preview-scale, 0.72))',
              transformOrigin: 'top center',
              display: 'inline-block',
            }}
          >
            <ActiveComponent data={data} isPremium={false} />
          </div>

          {/* Watermark overlay at the bottom of the preview */}
          <div className="absolute inset-x-0 bottom-0 py-2.5 bg-gradient-to-t from-black/80 to-transparent flex items-end justify-center pb-3 z-50">
            <span className="text-white/90 text-xs font-semibold tracking-wide flex items-center gap-1.5 bg-black/40 px-3 py-1.5 rounded-full backdrop-blur-sm">
              <span className="text-amber-400">✨</span> Watermark removed on download
            </span>
          </div>
        </div>
      </div>

      {/* ── Bottom Panel ── */}
      <div className="shrink-0 bg-white border-t border-gray-200 shadow-[0_-8px_30px_rgba(0,0,0,0.07)] z-20">

        {/* Template Carousel */}
        <div className="relative border-b border-gray-100">
          {/* Left Arrow */}
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
            {TEMPLATES.map((t) => {
              const TplComponent = getTemplateComponent(t.id);
              return (
                <button
                  key={t.id}
                  onClick={() => setActiveTemplateId(t.id)}
                  className={`group relative flex flex-col items-center gap-1.5 shrink-0 transition-all duration-200 ${
                    activeTemplateId === t.id ? 'opacity-100' : 'opacity-50 hover:opacity-80'
                  }`}
                >
                  <div className={`relative w-16 h-24 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                    activeTemplateId === t.id
                      ? 'border-blue-600 shadow-lg shadow-blue-500/20 scale-105'
                      : 'border-transparent hover:border-gray-300'
                  }`}>
                    {/* Mini live render of the template */}
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{ transform: 'scale(0.13)', transformOrigin: 'top left', width: '770%', height: '770%' }}
                    >
                      <TplComponent data={defaultData} isPremium={false} />
                    </div>
                    {activeTemplateId === t.id && (
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

          {/* Right Arrow */}
          <button
            onClick={() => scrollCarousel('right')}
            className="absolute right-0 top-0 bottom-0 z-10 px-1.5 bg-gradient-to-l from-white to-transparent text-gray-500 hover:text-gray-800 flex items-center"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Action Buttons */}
        <div className="p-3 sm:p-4 flex items-center justify-center gap-3 max-w-md mx-auto">
          <button
            onClick={() => setIsFormOpen(true)}
            className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gray-900 hover:bg-gray-800 text-white font-semibold text-sm transition-all shadow-md hover:shadow-lg active:scale-95"
          >
            <Pencil size={16} />
            Edit Details
          </button>

          <button
            onClick={() => setIsCheckoutOpen(true)}
            className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold text-sm transition-all shadow-md shadow-orange-400/30 hover:shadow-lg active:scale-95"
          >
            <Download size={16} />
            Download / Share
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
    </div>
  );
}
