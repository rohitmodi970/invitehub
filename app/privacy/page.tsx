import { Footer } from '@/app/components/Footer';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #1a0a0a 100%)' }}>
      <div className="relative z-10 flex-1 max-w-3xl mx-auto w-full px-4 sm:px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 tracking-tight">Privacy Policy</h1>
          <p className="text-white/50 text-lg">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
        </div>
        
        <div className="rounded-3xl p-8 sm:p-12 text-white/70 space-y-8 leading-relaxed" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', backdropFilter: 'blur(20px)' }}>
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. Information We Collect</h2>
            <p>We collect information that you provide directly to us, such as when you create an account, design an invitation, or communicate with us. This may include your name, email address, and the content of your invitations.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. How We Use Your Information</h2>
            <p>We use the information we collect to provide, maintain, and improve our services, as well as to communicate with you about your account, new features, and updates.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. Information Sharing</h2>
            <p>We do not share your personal information with third parties except as necessary to provide our services, comply with the law, or protect our rights.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. Data Security</h2>
            <p>We take reasonable measures to help protect information about you from loss, theft, misuse, and unauthorized access, disclosure, alteration, and destruction.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">5. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us at invitehub001@gmail.com.</p>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
}
