'use client';

import { useState, useRef } from 'react';
import { X, Upload, Loader2, User, CalendarDays, Sparkles, ChevronRight, ChevronLeft, Check } from 'lucide-react';
import type { EventData, EventType } from '@/lib/events/event-data';
import { EVENT_FIELD_CONFIG } from '@/lib/events/config';
import { getEventTypeDef } from '@/lib/events/types';
import { supabase } from '@/lib/supabase/client';

interface EditorFormProps {
  data: Partial<EventData>;
  eventType?: EventType;
  onDataChange: (data: Partial<EventData>) => void;
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
  const eventDef = getEventTypeDef(eventType) || getEventTypeDef('wedding');

  const handleChange = (field: keyof EventData, value: any) => {
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
      handleChange('coverImageUrl', publicUrlData.publicUrl);
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
            <h2 className="text-lg font-bold text-gray-900">Customize Event</h2>
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

        {/* Step 1: Core Names & Photo */}
        {step === 1 && (
          <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Input
                label={fields.primaryNameLabel}
                value={data.primaryName || ''}
                onChange={(val) => handleChange('primaryName', val)}
                placeholder={fields.primaryNamePlaceholder}
              />
              <Input
                label={fields.secondaryNameLabel || 'Secondary Name'}
                value={data.secondaryName || ''}
                onChange={(val) => handleChange('secondaryName', val)}
                placeholder={fields.secondaryNamePlaceholder || 'Optional'}
              />
            </div>
            
            <Input
              label="Event Title"
              value={data.title || ''}
              onChange={(val) => handleChange('title', val)}
              placeholder="e.g. Rohit's Birthday Bash"
            />

            {/* Photo Upload */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{fields.photoLabel || 'Cover Image'}</label>
              <div
                onClick={() => fileInputRef.current?.click()}
                className={`relative cursor-pointer rounded-xl border-2 border-dashed transition-all duration-200 ${
                  data.coverImageUrl
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
                  {data.coverImageUrl ? (
                    <>
                      <img
                        src={data.coverImageUrl}
                        alt="Cover"
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
              label={fields.familyDetailsLabel || 'Host Details'}
              value={data.familyDetails || ''}
              onChange={(val) => handleChange('familyDetails', val)}
              placeholder={fields.familyDetailsPlaceholder || 'Hosted by...'}
            />
          </div>
        )}

        {/* Step 2: Event Details */}
        {step === 2 && (
          <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="grid grid-cols-2 gap-3">
              <Input
                label={fields.dateLabel || 'Date'}
                value={data.eventDate || ''}
                onChange={(val) => handleChange('eventDate', val)}
                type="date"
              />
              <Input
                label="Time"
                value={data.eventTime || ''}
                onChange={(val) => handleChange('eventTime', val)}
                type="time"
              />
            </div>
            
            <div className="flex items-center gap-2 mb-2">
              <input
                type="checkbox"
                id="isVirtual"
                checked={data.isVirtual || false}
                onChange={(e) => handleChange('isVirtual', e.target.checked)}
                className="w-4 h-4 text-rose-500 rounded border-gray-300"
              />
              <label htmlFor="isVirtual" className="text-sm text-gray-700">This is a virtual event</label>
            </div>

            {data.isVirtual ? (
              <Input
                label="Virtual Meeting Link"
                value={data.virtualLink || ''}
                onChange={(val) => handleChange('virtualLink', val)}
                placeholder="e.g. Zoom or Google Meet URL"
              />
            ) : (
              <>
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
              </>
            )}

            <div className="grid grid-cols-2 gap-3">
              <Input
                label="Contact Number"
                value={data.contactPhone || ''}
                onChange={(val) => handleChange('contactPhone', val)}
                placeholder="e.g. +91 98765 43210"
              />
              <Input
                label="Contact Email"
                value={data.contactEmail || ''}
                onChange={(val) => handleChange('contactEmail', val)}
                placeholder="e.g. hello@example.com"
              />
            </div>
          </div>
        )}

        {/* Step 3: Extras */}
        {step === 3 && (
          <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
            <Input
              label="Tagline"
              value={data.tagline || ''}
              onChange={(val) => handleChange('tagline', val)}
              placeholder="e.g. Join us for an evening of joy"
            />
            
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Additional Message / Story</label>
              <textarea
                value={data.message || ''}
                onChange={(e) => handleChange('message', e.target.value)}
                placeholder="Tell your story or provide more details..."
                rows={3}
                className="px-4 py-3 rounded-xl border border-gray-200 focus:border-rose-400 focus:ring-2 focus:ring-rose-100 outline-none transition-all text-gray-900 bg-white placeholder:text-gray-300 text-sm resize-none"
              />
            </div>

            <Input
              label="Dress Code / Agenda"
              value={data.dressCode || data.agenda || ''}
              onChange={(val) => handleChange(eventType === 'wedding' ? 'dressCode' : 'agenda', val)}
              placeholder="e.g. Formal Attire"
            />

            <div className="space-y-2 mt-4 pt-4 border-t border-gray-100">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Event Features</label>
              
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <div>
                  <p className="text-sm font-medium text-gray-800">Collect RSVPs</p>
                  <p className="text-xs text-gray-500">Allow guests to confirm attendance</p>
                </div>
                <input
                  type="checkbox"
                  checked={data.rsvpEnabled !== false}
                  onChange={(e) => handleChange('rsvpEnabled', e.target.checked)}
                  className="w-5 h-5 text-rose-500 rounded border-gray-300"
                />
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <div>
                  <p className="text-sm font-medium text-gray-800">Add to Calendar</p>
                  <p className="text-xs text-gray-500">Show Google/Outlook calendar buttons</p>
                </div>
                <input
                  type="checkbox"
                  checked={data.calendarEnabled !== false}
                  onChange={(e) => handleChange('calendarEnabled', e.target.checked)}
                  className="w-5 h-5 text-rose-500 rounded border-gray-300"
                />
              </div>
            </div>

            {/* Summary Card */}
            <div className="bg-gradient-to-br from-rose-50 to-orange-50 rounded-2xl p-4 border border-rose-100 mt-4">
              <p className="text-xs font-semibold text-rose-700 uppercase tracking-wider mb-3">Preview Summary</p>
              <div className="space-y-1.5 text-sm text-gray-700">
                <p>{eventDef.emoji} <span className="font-medium">{data.primaryName || '—'}</span> {fields.summaryConnector} <span className="font-medium">{data.secondaryName || ''}</span></p>
                <p>📅 {data.eventDate || '—'} at {data.eventTime || '—'}</p>
                <p>📍 {data.isVirtual ? 'Virtual' : (data.venueName || '—')}</p>
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
