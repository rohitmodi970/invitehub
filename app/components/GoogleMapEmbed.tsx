export function GoogleMapEmbed({ address }: { address: string }) {
  const encodedAddress = encodeURIComponent(address);

  return (
    <div className="w-full max-w-lg mx-auto">
      <div
        className="rounded-3xl overflow-hidden"
        style={{
          background: 'rgba(255,255,255,0.05)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.10)',
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
        }}
      >
        {/* Map iframe */}
        <div className="relative w-full" style={{ height: '240px' }}>
          <iframe
            width="100%"
            height="100%"
            style={{ border: 0, display: 'block' }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            src={`https://www.google.com/maps?q=${encodedAddress}&output=embed`}
          />
          {/* Gradient overlay at bottom for seamless blend */}
          <div
            className="absolute bottom-0 left-0 right-0 h-12 pointer-events-none"
            style={{ background: 'linear-gradient(to bottom, transparent, rgba(15,12,41,0.6))' }}
          />
        </div>

        {/* Footer */}
        <div className="px-6 py-4 flex items-center justify-between">
          <div>
            <p className="text-white/80 text-sm font-medium truncate max-w-[220px]">{address}</p>
            <p className="text-white/30 text-xs mt-0.5">Tap to navigate</p>
          </div>
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all hover:scale-105 active:scale-95"
            style={{ background: 'rgba(201,168,76,0.25)', border: '1px solid rgba(201,168,76,0.4)', color: '#c9a84c' }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
            Open
          </a>
        </div>
      </div>
    </div>
  );
}
