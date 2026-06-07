'use client';

import { useState, useRef } from 'react';
import { X, Upload, Loader2 } from 'lucide-react';
import { InvitationData } from '@/app/templates/traditional-indian-004/components/TraditionalIndianTemplate';
import { supabase } from '@/lib/supabase/client';

interface EditorFormProps {
  data: InvitationData;
  onDataChange: (data: InvitationData) => void;
  onClose: () => void;
}

const Input = ({ label, value, onChange, placeholder, type = 'text' }: { label: string, value: string, onChange: (val: string) => void, placeholder?: string, type?: string }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-sm font-medium text-gray-700">{label}</label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="px-4 py-2.5 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-gray-900 bg-gray-50/50"
    />
  </div>
);

export function EditorForm({ data, onDataChange, onClose }: EditorFormProps) {
  const [activeTab, setActiveTab] = useState<'names' | 'event' | 'extra'>('names');
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (field: keyof InvitationData, value: string) => {
    onDataChange({ ...data, [field]: value });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }

    setIsUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
      const filePath = `uploads/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('invitations')
        .upload(filePath, file, { cacheControl: '3600', upsert: false });

      if (uploadError) throw uploadError;

      const { data: publicUrlData } = supabase.storage
        .from('invitations')
        .getPublicUrl(filePath);

      handleChange('couplePhotoUrl', publicUrlData.publicUrl);
    } catch (error: any) {
      console.error('Upload error:', error);
      alert(error.message || 'Error uploading image. Please try again.');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };



  return (
    <div className="flex flex-col h-full max-h-[90vh]">
      {/* Header */}
      <div className="flex items-center justify-between p-5 border-b border-gray-200 shrink-0">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Edit Details</h2>
          <p className="text-sm text-gray-500">Live preview updates instantly</p>
        </div>
        <button onClick={onClose} className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors text-gray-600">
          <X size={20} />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 px-5 shrink-0 pt-2">
        {(['names', 'event', 'extra'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors capitalize ${
              activeTab === tab ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Form Content */}
      <div className="flex-1 overflow-y-auto p-5 sm:p-6 no-scrollbar">
        <div className="space-y-6 max-w-lg mx-auto">
          {activeTab === 'names' && (
            <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="grid grid-cols-2 gap-4">
                <Input label="Bride / Partner 1 Name" value={data.brideName || ''} onChange={(val) => handleChange('brideName', val)} placeholder="e.g. Priya" />
                <Input label="Groom / Partner 2 Name" value={data.groomName || ''} onChange={(val) => handleChange('groomName', val)} placeholder="e.g. Rahul" />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-700">Couple Photo (Optional)</label>
                <div className="flex items-center gap-4">
                  {data.couplePhotoUrl && (
                    <div className="w-16 h-16 rounded-full overflow-hidden shrink-0 border border-gray-200">
                      <img src={data.couplePhotoUrl} alt="Couple" className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div className="flex-1">
                    <input type="file" accept="image/jpeg, image/png, image/webp" className="hidden" ref={fileInputRef} onChange={handleImageUpload} />
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isUploading}
                      className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg border-2 border-dashed border-gray-300 hover:border-blue-500 hover:bg-blue-50 text-gray-600 font-medium transition-all"
                    >
                      {isUploading ? <Loader2 size={18} className="animate-spin text-blue-600" /> : <Upload size={18} />}
                      {isUploading ? 'Uploading...' : 'Upload Photo'}
                    </button>
                    <p className="text-xs text-gray-500 mt-2 text-center">JPG, PNG up to 5MB. Clear background works best.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'event' && (
            <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="grid grid-cols-2 gap-4">
                <Input label="Date" value={data.weddingDate || ''} onChange={(val) => handleChange('weddingDate', val)} placeholder="e.g. 24th Nov 2026" />
                <Input label="Time" value={data.weddingTime || ''} onChange={(val) => handleChange('weddingTime', val)} placeholder="e.g. 7:00 PM Onwards" />
              </div>
              <Input label="Venue Name" value={data.venueName || ''} onChange={(val) => handleChange('venueName', val)} placeholder="e.g. The Grand Taj Palace" />
              <Input label="Venue Full Address" value={data.venueAddress || ''} onChange={(val) => handleChange('venueAddress', val)} placeholder="e.g. Diplomatic Enclave, Chanakyapuri, New Delhi" />
            </div>
          )}

          {activeTab === 'extra' && (
            <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-700">Additional Message</label>
                <textarea
                  value={data.additionalMessage || ''}
                  onChange={(e) => handleChange('additionalMessage', e.target.value)}
                  placeholder="e.g. Join us to celebrate our new beginning."
                  rows={3}
                  className="px-4 py-2.5 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-gray-900 bg-gray-50/50 resize-none"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-700">Family Details (Optional)</label>
                <textarea
                  value={data.familyDetails || ''}
                  onChange={(e) => handleChange('familyDetails', e.target.value)}
                  placeholder="e.g. Son of Mr. Sharma & Mrs. Sharma"
                  rows={2}
                  className="px-4 py-2.5 rounded-lg border border-gray-300 focus:border-blue-500 outline-none transition-all text-gray-900 bg-gray-50/50 resize-none"
                />
              </div>
              <Input label="Contact Number (for Map/Uber)" value={data.contactNumber || ''} onChange={(val) => handleChange('contactNumber', val)} placeholder="e.g. +91 98765 43210" />
              <Input label="RSVP Details" value={data.rsvpDetails || ''} onChange={(val) => handleChange('rsvpDetails', val)} placeholder="e.g. RSVP by 10th Nov" />
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="p-5 border-t border-gray-200 bg-gray-50 shrink-0 flex justify-end rounded-b-2xl">
        <button onClick={onClose} className="py-2.5 px-8 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors shadow-sm">
          Done
        </button>
      </div>
    </div>
  );
}
