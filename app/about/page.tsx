'use client';

import { motion } from 'framer-motion';
import { Footer } from '@/app/components/Footer';
import { Sparkles, Users, Palette, Zap } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #1a0a0a 100%)' }}>
      {/* Ambient blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full opacity-20" style={{ background: 'radial-gradient(circle, #c9a84c 0%, transparent 70%)' }} />
        <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full opacity-15" style={{ background: 'radial-gradient(circle, #e11d48 0%, transparent 70%)' }} />
      </div>

      <div className="relative z-10 flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 py-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/60 text-xs mb-6 tracking-widest uppercase">
            <Sparkles size={14} className="text-amber-400" />
            Our Story
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            Redefining How You <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-rose-400">Celebrate</span>
          </h1>
          <p className="text-white/60 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
            InviteHub is your premier destination for creating stunning, personalized digital invitations that leave a lasting impression.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          {[
            { icon: Palette, title: 'Beautiful Designs', desc: 'Crafted by top designers to make your events stand out.' },
            { icon: Zap, title: 'Lightning Fast', desc: 'Create and send invitations in minutes, not hours.' },
            { icon: Users, title: 'Seamless Sharing', desc: 'Easily track RSVPs and share with guests on any platform.' },
            { icon: Sparkles, title: 'Uniquely Yours', desc: 'Endless customization options to match your exact vibe.' },
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 + 0.2 }}
              className="rounded-3xl p-8"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', backdropFilter: 'blur(20px)' }}
            >
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6" style={{ background: 'linear-gradient(135deg, rgba(225,29,72,0.2) 0%, rgba(201,168,76,0.2) 100%)' }}>
                <feature.icon size={24} className="text-amber-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-white/50 leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Our Mission Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-16 rounded-3xl p-8 sm:p-12 text-left"
          style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', backdropFilter: 'blur(20px)' }}
        >
          <h2 className="text-3xl font-bold text-white mb-6">Our Mission</h2>
          <div className="text-white/70 space-y-5 leading-relaxed text-lg">
            <p>
              At InviteHub, we believe that every great celebration begins with the perfect invitation. Traditionally, creating premium invitations meant dealing with expensive designers, long printing delays, and hidden costs. We built InviteHub to change that.
            </p>
            <p>
              Our mission is to democratize beautiful design. Whether you are planning a grand Indian wedding, an intimate birthday party, or a professional corporate summit, our platform empowers you to create stunning, personalized digital invitations in minutes. We provide the tools, you provide the vision.
            </p>
            <p>
              With features like live previews, HD downloads, built-in RSVP tracking, and instant WhatsApp sharing, we are bringing the invitation process into the digital age while maintaining the elegance and tradition of printed cards. Join thousands of happy customers who have trusted InviteHub to announce their most cherished moments.
            </p>
          </div>
        </motion.div>
      </div>
      
      <Footer />
    </div>
  );
}
