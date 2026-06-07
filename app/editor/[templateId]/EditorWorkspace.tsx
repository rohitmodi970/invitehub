'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Pencil, Download, Check } from 'lucide-react';
import { TEMPLATES } from '@/lib/templates/data';
import { getTemplateComponent } from '@/lib/templates/registry';
import { InvitationData } from '@/app/templates/traditional-indian-004/components/TraditionalIndianTemplate';
import { EditorForm } from '@/app/editor/[templateId]/EditorForm';

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
  const [activeTemplateId, setActiveTemplateId] = useState(initialTemplateId);
  const [data, setData] = useState<InvitationData>(defaultData);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const saved = localStorage.getItem('invitehub-draft');
    if (saved) {
      try {
        setData(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse draft', e);
      }
    }
  }, []);

  // Sync active template change with URL without refreshing
  useEffect(() => {
    if (isMounted) {
      window.history.replaceState(null, '', `/editor/${activeTemplateId}`);
    }
  }, [activeTemplateId, isMounted]);

  const handleDataChange = (newData: InvitationData) => {
    setData(newData);
    localStorage.setItem('invitehub-draft', JSON.stringify(newData));
  };

  const handleSaveAndShare = async () => {
    setIsSaving(true);
    try {
      const response = await fetch('/api/invitations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          templateId: activeTemplateId,
          data
        })
      });

      if (!response.ok) throw new Error('Failed to save');
      const result = await response.json();
      
      // Clear draft and redirect to the public page (which leads to payment/share)
      localStorage.removeItem('invitehub-draft');
      router.push(`/i/${result.slug}`);
    } catch (error) {
      console.error(error);
      alert('There was an error saving your invitation. Please check your connection.');
      setIsSaving(false);
    }
  };

  if (!isMounted) return null;

  const ActiveComponent = getTemplateComponent(activeTemplateId);

  return (
    <div className="flex-1 flex flex-col h-screen overflow-hidden">
      
      {/* 1. Preview Area (Scrollable) */}
      <div className="flex-1 overflow-y-auto bg-[#f8f9fa] flex items-center justify-center p-4 relative">
        <div className="relative shadow-2xl rounded-lg overflow-hidden shrink-0 scale-90 sm:scale-100 origin-center transition-all duration-300">
          <ActiveComponent data={data} isPremium={false} />
          
          {/* Watermark Overlay (As per UI strategy) */}
          <div className="absolute inset-x-0 bottom-0 py-3 bg-black/60 backdrop-blur-md flex items-center justify-center border-t border-white/10 z-50">
            <span className="text-white/90 text-sm font-medium tracking-wide flex items-center gap-2">
              <span className="text-amber-400">✨</span> Watermark removed in download
            </span>
          </div>
        </div>
      </div>

      {/* 2. Bottom Controls (Fixed) */}
      <div className="bg-white border-t border-gray-200 shrink-0 shadow-[0_-10px_30px_rgba(0,0,0,0.05)] z-20">
        
        {/* Template Carousel */}
        <div className="w-full overflow-x-auto no-scrollbar border-b border-gray-100">
          <div className="flex gap-4 p-4 min-w-max mx-auto px-4 sm:px-8">
            {TEMPLATES.map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveTemplateId(t.id)}
                className={`group relative flex flex-col items-center gap-2 transition-all duration-200 ${
                  activeTemplateId === t.id ? 'opacity-100 scale-105' : 'opacity-60 hover:opacity-100'
                }`}
              >
                <div className={`relative w-20 h-28 rounded-md overflow-hidden shadow-sm border-2 transition-colors ${
                  activeTemplateId === t.id ? 'border-blue-600 shadow-md' : 'border-transparent'
                }`}>
                  <Image src={t.previewUrl} alt={t.name} fill className="object-cover" unoptimized />
                  {activeTemplateId === t.id && (
                    <div className="absolute inset-0 bg-blue-600/10 flex items-center justify-center">
                      <div className="bg-blue-600 text-white rounded-full p-1"><Check size={16} /></div>
                    </div>
                  )}
                </div>
                <span className="text-xs font-medium text-gray-700 whitespace-nowrap">{t.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-4 flex items-center justify-center gap-4 max-w-lg mx-auto">
          <button
            onClick={() => setIsFormOpen(true)}
            className="flex-1 flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-gray-900 hover:bg-gray-800 text-white font-semibold transition-all shadow-md hover:shadow-lg active:scale-95"
          >
            <Pencil size={18} />
            Edit Details
          </button>
          
          <button
            onClick={handleSaveAndShare}
            disabled={isSaving}
            className="flex-1 flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold transition-all shadow-md shadow-orange-500/20 hover:shadow-lg hover:shadow-orange-500/30 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSaving ? (
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Download size={18} />
            )}
            Download / Share
          </button>
        </div>
      </div>

      {/* Editor Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-sm p-0 sm:p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-2xl bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl max-h-[90vh] flex flex-col animate-in slide-in-from-bottom-10 sm:slide-in-from-bottom-4 duration-300">
            <EditorForm 
              data={data} 
              onDataChange={handleDataChange} 
              onClose={() => setIsFormOpen(false)} 
            />
          </div>
        </div>
      )}
    </div>
  );
}
