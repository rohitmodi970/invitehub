import { Footer } from '@/app/components/Footer';

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #1a0a0a 100%)' }}>
      <div className="relative z-10 flex-1 max-w-3xl mx-auto w-full px-4 sm:px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 tracking-tight">Terms of Service</h1>
          <p className="text-white/50 text-lg">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
        </div>
        
        <div className="rounded-3xl p-8 sm:p-12 text-white/70 space-y-8 leading-relaxed" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', backdropFilter: 'blur(20px)' }}>
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
            <p>By accessing or using InviteHub, you agree to be bound by these Terms of Service and all applicable laws and regulations.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. Use License</h2>
            <p>Permission is granted to temporarily download one copy of the materials (information or software) on InviteHub for personal, non-commercial transitory viewing only.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. User Content</h2>
            <p>You retain all rights to any content you submit, post or display on or through the Service. By submitting content, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, and adapt such content in connection with providing the Service.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. Disclaimer</h2>
            <p>The materials on InviteHub are provided on an &apos;as is&apos; basis. InviteHub makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">5. Limitations</h2>
            <p>In no event shall InviteHub or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on InviteHub.</p>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
}
