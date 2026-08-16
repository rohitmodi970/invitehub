'use client';

import { useState } from 'react';
import { Check, Copy, Share2 } from 'lucide-react';
import type { EventData } from '@/lib/events/event-data';
import type { TemplateDesign } from '@/lib/templates/engine/types';

interface FooterSectionProps {
  event: EventData;
  design: TemplateDesign;
}

export default function FooterSection({ event, design }: FooterSectionProps) {
  const [copied, setCopied] = useState(false);
  const eventUrl = `https://invitehub.in/e/${event.slug}`;

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(eventUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  const shareWhatsApp = () => {
    const text = `You're invited to ${event.title}! ${eventUrl}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  const shareNative = async () => {
    if (navigator.share) {
      await navigator.share({ title: event.title, url: eventUrl });
    } else {
      copyLink();
    }
  };

  return (
    <footer
      className="w-full px-6 py-12"
      style={{ borderTop: '1px solid var(--border-color)' }}
    >
      <div className="mx-auto text-center" style={{ maxWidth: design.maxWidth }}>
        {/* Share buttons */}
        <p
          className="text-xs font-semibold tracking-[0.2em] uppercase mb-4"
          style={{ color: 'var(--accent-color)', fontFamily: 'var(--body-font)' }}
        >
          Share this event
        </p>

        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {/* WhatsApp */}
          <button
            onClick={shareWhatsApp}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all hover:scale-105"
            style={{
              background: '#25D366',
              color: 'white',
              fontFamily: 'var(--body-font)',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            WhatsApp
          </button>

          {/* Copy Link */}
          <button
            onClick={copyLink}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all hover:scale-105"
            style={{
              background: 'var(--surface-color)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-color)',
              fontFamily: 'var(--body-font)',
            }}
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
            {copied ? 'Copied!' : 'Copy Link'}
          </button>

          {/* Native Share (mobile) */}
          {typeof navigator !== 'undefined' && 'share' in navigator && (
            <button
              onClick={shareNative}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all hover:scale-105"
              style={{
                background: 'var(--surface-color)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-color)',
                fontFamily: 'var(--body-font)',
              }}
            >
              <Share2 size={14} />
              Share
            </button>
          )}
        </div>

        {/* InviteHub branding (free tier only) */}
        {!event.hideBranding && (
          <a
            href="https://invitehub.in"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs transition-opacity hover:opacity-80"
            style={{ color: 'var(--muted-text)', fontFamily: 'var(--body-font)' }}
          >
            Made with
            <span style={{ color: 'var(--accent-color)' }}>❤️</span>
            <span style={{ color: 'var(--accent-color)', fontWeight: 700 }}>InviteHub.in</span>
          </a>
        )}
      </div>
    </footer>
  );
}
