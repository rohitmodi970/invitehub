'use client';

import { useState, useRef } from 'react';
import { X, Upload, Loader2, User, CalendarDays, Sparkles, ChevronRight, ChevronLeft, Check } from 'lucide-react';
import type { InvitationData } from '@/lib/invitations/types';
import type { EventType } from '@/lib/events/types';
import { EVENT_FIELD_CONFIG } from '@/lib/events/config';
import { getEventTypeDef } from '@/lib/events/types';
import { supabase } from '@/lib/supabase/client';

interface EditorFormProps {
  data: InvitationData;
  eventType?: EventType;
  onDataChange: (data: InvitationData) => void;
  onClose: () => void;
}

const Input = ({
  label, value, onChange, placeholder, type = 'text'
}: {
  label: string; value: string; onChange: (val: string) => void; placeholder?: string; type?: string;
}) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{label}</label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="px-4 py-3 rounded-xl border border-gray-200 focus:border-rose-400 focus:ring-2 focus:ring-rose-100 outline-none transition-all text-gray-900 bg-white placeholder:text-gray-300 text-sm"
    />
  </div>
);

const buildSteps = (eventType: EventType) => {
  const fields = EVENT_FIELD_CONFIG[eventType];
  return [
    { id: 1, label: fields.step1Label, icon: User, description: fields.step1Description },
    { id: 2, label: 'Event', icon: CalendarDays, description: 'Date, time & venue' },
    { id: 3, label: 'Extras', icon: Sparkles, description: 'Message & RSVP' },
  ];
};

export function EditorForm({ data, eventType = 'wedding', onDataChange, onClose }: EditorFormProps) {
  const [step, setStep] = useState(1);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const fields = EVENT_FIELD_CONFIG[eventType];
  const steps = buildSteps(eventType);
  const eventDef = getEventTypeDef(eventType);

  const handleChange = (field: keyof InvitationData, value: string) => {
    onDataChange({ ...data, [field]: value });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) { alert('File size must be less than 5MB'); return; }

    setIsUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}_${Math.random().toString(36).substring(2, 8)}.${fileExt}`;
      const filePath = `uploads/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('invitations')
        .upload(filePath, file, { cacheControl: '3600', upsert: false });

      if (uploadError) throw uploadError;

      const { data: publicUrlData } = supabase.storage.from('invitations').getPublicUrl(filePath);
      handleChange('couplePhotoUrl', publicUrlData.publicUrl);
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : 'Upload failed';
      alert(msg || 'Error uploading image. Please check your Supabase configuration.');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const canGoNext = step < 3;
  const canGoPrev = step > 1;

  return (
    <div className="flex flex-col h-full max-h-[92vh] select-none">

      {/* ── Header ── */}
      <div className="shrink-0 px-5 pt-5 pb-4 border-b border-gray-100">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Customize Invitation</h2>
            <p className="text-xs text-gray-400 mt-0.5">{eventDef.emoji} {eventDef.label} · Live preview updates as you type</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors text-gray-500"
          >
            <X size={18} />
          </button>
        </div>

        {/* Step Progress */}
        <div className="flex items-center gap-2">
          {steps.map((s, i) => {
            const Icon = s.icon;
            const isActive = s.id === step;
            const isDone = s.id < step;
            return (
              <div key={s.id} className="flex items-center gap-2 flex-1">
                <button
                  onClick={() => setStep(s.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl flex-1 transition-all duration-200 text-left ${
                    isActive
                      ? 'bg-rose-50 border border-rose-200'
                      : isDone
                      ? 'bg-green-50 border border-green-200'
                      : 'bg-gray-50 border border-gray-100 hover:bg-gray-100'
                  }`}
                >
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                    isActive ? 'bg-rose-500 text-white' : isDone ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-400'
                  }`}>
                    {isDone ? <Check size={14} /> : <Icon size={14} />}
                  </div>
                  <div className="hidden sm:block min-w-0">
                    <p className={`text-xs font-semibold truncate ${isActive ? 'text-rose-700' : isDone ? 'text-green-700' : 'text-gray-500'}`}>
                      {s.label}
                    </p>
                    <p className="text-[10px] text-gray-400 truncate">{s.description}</p>
                  </div>
                </button>
                {i < steps.length - 1 && (
                  <div className={`w-4 h-px shrink-0 ${isDone ? 'bg-green-300' : 'bg-gray-200'}`} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Form Content ── */}
      <div className="flex-1 overflow-y-auto px-5 py-5 space-y-4">

        {/* Step 1: Couple Names & Photo */}
        {step === 1 && (
          <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="grid grid-cols-2 gap-3">
              <Input
                label={fields.primaryNameLabel}
                value={data.brideName || ''}
                onChange={(val) => handleChange('brideName', val)}
                placeholder={fields.primaryNamePlaceholder}
              />
              <Input
                label={fields.secondaryNameLabel}
                value={data.groomName || ''}
                onChange={(val) => handleChange('groomName', val)}
                placeholder={fields.secondaryNamePlaceholder}
              />
            </div>

            {/* Photo Upload */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{fields.photoLabel}</label>
              <div
                onClick={() => fileInputRef.current?.click()}
                className={`relative cursor-pointer rounded-xl border-2 border-dashed transition-all duration-200 ${
                  data.couplePhotoUrl
                    ? 'border-green-300 bg-green-50'
                    : 'border-gray-200 bg-gray-50 hover:border-rose-300 hover:bg-rose-50'
                }`}
              >
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  className="hidden"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                />
                <div className="flex items-center gap-4 p-4">
                  {data.couplePhotoUrl ? (
                    <>
                      <img
                        src={data.couplePhotoUrl}
                        alt="Couple"
                        className="w-14 h-14 rounded-full object-cover border-2 border-green-400 shrink-0"
                      />
                      <div>
                        <p className="text-sm font-semibold text-green-700">Photo uploaded! ✓</p>
                        <p className="text-xs text-gray-400 mt-0.5">Click to change</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center shrink-0">
                        {isUploading
                          ? <Loader2 size={20} className="animate-spin text-rose-500" />
                          : <Upload size={20} className="text-gray-400" />
                        }
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-700">
                          {isUploading ? 'Uploading...' : `Upload Photo`}
                        </p>
                        <p className="text-xs text-gray-400 mt-0.5">JPG, PNG up to 5MB</p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            <Input
              label={fields.familyDetailsLabel}
              value={data.familyDetails || ''}
              onChange={(val) => handleChange('familyDetails', val)}
              placeholder={fields.familyDetailsPlaceholder}
            />
          </div>
        )}

        {/* Step 2: Event Details */}
        {step === 2 && (
          <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="grid grid-cols-2 gap-3">
              <Input
                label={fields.dateLabel}
                value={data.weddingDate || ''}
                onChange={(val) => handleChange('weddingDate', val)}
                placeholder="e.g. 24th Nov 2026"
              />
              <Input
                label="Time"
                value={data.weddingTime || ''}
                onChange={(val) => handleChange('weddingTime', val)}
                placeholder="e.g. 7:00 PM"
              />
            </div>
            <Input
              label="Venue Name"
              value={data.venueName || ''}
              onChange={(val) => handleChange('venueName', val)}
              placeholder="e.g. The Grand Taj Palace"
            />
            <Input
              label="Full Address"
              value={data.venueAddress || ''}
              onChange={(val) => handleChange('venueAddress', val)}
              placeholder="e.g. Diplomatic Enclave, New Delhi"
            />
            <Input
              label="Contact Number"
              value={data.contactNumber || ''}
              onChange={(val) => handleChange('contactNumber', val)}
              placeholder="e.g. +91 98765 43210"
            />
          </div>
        )}

        {/* Step 3: Extras */}
        {step === 3 && (
          <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Additional Message</label>
              <textarea
                value={data.additionalMessage || ''}
                onChange={(e) => handleChange('additionalMessage', e.target.value)}
                placeholder="e.g. Join us to celebrate our new beginning."
                rows={3}
                className="px-4 py-3 rounded-xl border border-gray-200 focus:border-rose-400 focus:ring-2 focus:ring-rose-100 outline-none transition-all text-gray-900 bg-white placeholder:text-gray-300 text-sm resize-none"
              />
            </div>
            <Input
              label="RSVP Details"
              value={data.rsvpDetails || ''}
              onChange={(val) => handleChange('rsvpDetails', val)}
              placeholder="e.g. RSVP by 10th November"
            />

            {/* Summary Card */}
            <div className="bg-gradient-to-br from-rose-50 to-orange-50 rounded-2xl p-4 border border-rose-100">
              <p className="text-xs font-semibold text-rose-700 uppercase tracking-wider mb-3">Preview Summary</p>
              <div className="space-y-1.5 text-sm text-gray-700">
                <p>{eventDef.emoji} <span className="font-medium">{data.brideName || '—'}</span> {fields.summaryConnector} <span className="font-medium">{data.groomName || '—'}</span></p>
                <p>📅 {data.weddingDate || '—'} at {data.weddingTime || '—'}</p>
                <p>📍 {data.venueName || '—'}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── Footer Navigation ── */}
      <div className="shrink-0 px-5 py-4 border-t border-gray-100 bg-gray-50 rounded-b-3xl sm:rounded-b-2xl flex items-center justify-between gap-3">
        <button
          onClick={() => canGoPrev ? setStep(s => s - 1) : onClose()}
          className="flex items-center gap-1.5 py-2.5 px-4 rounded-xl border border-gray-200 bg-white hover:bg-gray-100 text-gray-700 font-medium text-sm transition-all"
        >
          <ChevronLeft size={16} />
          {canGoPrev ? 'Back' : 'Cancel'}
        </button>

        <div className="flex items-center gap-1.5">
          {steps.map((s) => (
            <div
              key={s.id}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                s.id === step ? 'w-5 bg-rose-500' : s.id < step ? 'w-3 bg-green-400' : 'w-3 bg-gray-200'
              }`}
            />
          ))}
        </div>

        {canGoNext ? (
          <button
            onClick={() => setStep(s => s + 1)}
            className="flex items-center gap-1.5 py-2.5 px-5 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-semibold text-sm transition-all shadow-md shadow-rose-500/20 active:scale-95"
          >
            Next
            <ChevronRight size={16} />
          </button>
        ) : (
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 py-2.5 px-5 rounded-xl bg-gray-900 hover:bg-gray-800 text-white font-semibold text-sm transition-all shadow-md active:scale-95"
          >
            <Check size={16} />
            Done
          </button>
        )}
      </div>
    </div>
  );
}
