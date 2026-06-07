'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  LayoutGrid, CreditCard, LogOut, ExternalLink,
  Crown, Eye, Calendar, ChevronRight, Loader2,
  Download, Sparkles
} from 'lucide-react';
import Image from 'next/image';

interface Invitation {
  id: string;
  slug: string;
  templateId: string;
  brideName: string;
  groomName: string;
  weddingDate: string;
  venueName: string;
  isPremium: boolean;
  created_at: string;
  viewCount: number;
}

interface Payment {
  id: string;
  planType: string;
  amountPaid: number;
  status: string;
  razorpayOrderId: string;
  created_at: string;
}

type Tab = 'invitations' | 'payments';

const PLAN_LABELS: Record<string, string> = {
  'basic': 'Basic',
  'print-ready': 'Print-Ready',
  'digital-suite': 'Digital Suite',
};

const PLAN_COLORS: Record<string, string> = {
  'basic': 'rgba(107,114,128,0.2)',
  'print-ready': 'rgba(201,168,76,0.2)',
  'digital-suite': 'rgba(124,58,237,0.2)',
};

export default function DashboardClient({ userEmail }: { userEmail: string }) {
  const [activeTab, setActiveTab] = useState<Tab>('invitations');
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);

  const userName = typeof window !== 'undefined'
    ? localStorage.getItem('invitehub-user-name') || userEmail.split('@')[0]
    : userEmail.split('@')[0];

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const [invRes, payRes] = await Promise.all([
          fetch('/api/dashboard/invitations', { cache: 'no-store' }),
          fetch('/api/dashboard/payments', { cache: 'no-store' }),
        ]);
        if (invRes.ok) {
          const d = await invRes.json();
          setInvitations(d.invitations || []);
        }
        if (payRes.ok) {
          const d = await payRes.json();
          setPayments(d.payments || []);
        }
      } catch {
        /* silent fail */
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    localStorage.removeItem('invitehub-user-name');
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #0a0a0f 0%, #12101a 50%, #0d0b15 100%)' }}>
      {/* Ambient blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-15%] left-[-5%] w-[500px] h-[500px] rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #c9a84c 0%, transparent 70%)' }} />
        <div className="absolute bottom-[-10%] right-[-5%] w-[400px] h-[400px] rounded-full opacity-8"
          style={{ background: 'radial-gradient(circle, #7c3aed 0%, transparent 70%)' }} />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 py-8">

        {/* Top Nav */}
        <div className="flex items-center justify-between mb-10">
          <Link href="/">
            <Image src="/elegant_logo_with_domain_written.png" alt="InviteHub.in" width={160} height={40} className="h-8 w-auto object-contain opacity-90" />
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/editor/elegant-gold-001"
              className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all"
              style={{ background: 'rgba(201,168,76,0.15)', color: '#c9a84c', border: '1px solid rgba(201,168,76,0.3)' }}>
              <Sparkles size={14} />
              New Invitation
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-white/50 hover:text-white/80 transition-colors"
            >
              <LogOut size={14} />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>

        {/* Welcome hero */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <p className="text-white/40 text-sm tracking-widest uppercase mb-2">Welcome back</p>
          <h1 className="text-3xl sm:text-4xl font-black text-white mb-1">
            {userName} <span style={{ color: '#c9a84c' }}>✨</span>
          </h1>
          <p className="text-white/40 text-sm">{userEmail}</p>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10"
        >
          {[
            { label: 'Invitations', value: invitations.length, icon: LayoutGrid, color: '#c9a84c' },
            { label: 'Premium', value: invitations.filter(i => i.isPremium).length, icon: Crown, color: '#f59e0b' },
            { label: 'Total Views', value: invitations.reduce((s, i) => s + (i.viewCount || 0), 0), icon: Eye, color: '#60a5fa' },
            { label: 'Payments', value: payments.length, icon: CreditCard, color: '#a78bfa' },
          ].map(({ label, value, icon: Icon, color }) => (
            <div key={label}
              className="rounded-2xl p-4"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
              <div className="flex items-center gap-2 mb-2">
                <Icon size={14} style={{ color }} />
                <span className="text-white/40 text-xs uppercase tracking-wider">{label}</span>
              </div>
              <p className="text-white font-black text-2xl">{loading ? '–' : value}</p>
            </div>
          ))}
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {(['invitations', 'payments'] as Tab[]).map(tab => (
            <button key={tab}
              onClick={() => setActiveTab(tab)}
              className="px-5 py-2.5 rounded-xl text-sm font-semibold transition-all capitalize"
              style={activeTab === tab ? {
                background: 'rgba(201,168,76,0.15)',
                color: '#c9a84c',
                border: '1px solid rgba(201,168,76,0.3)',
              } : {
                color: 'rgba(255,255,255,0.4)',
                border: '1px solid rgba(255,255,255,0.07)',
              }}>
              {tab === 'invitations' ? <><LayoutGrid size={13} className="inline mr-1.5" />My Invitations</> : <><CreditCard size={13} className="inline mr-1.5" />Payment History</>}
            </button>
          ))}
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="flex items-center justify-center py-24">
              <Loader2 size={28} className="animate-spin text-white/20" />
            </motion.div>
          ) : activeTab === 'invitations' ? (
            <motion.div key="invitations" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              {invitations.length === 0 ? (
                <div className="text-center py-24">
                  <p className="text-4xl mb-4">💌</p>
                  <p className="text-white/40 text-sm mb-6">You haven&apos;t created any invitations yet.</p>
                  <Link href="/editor/elegant-gold-001"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-[#1a0e00]"
                    style={{ background: 'linear-gradient(135deg, #c9a84c 0%, #f0d080 100%)' }}>
                    <Sparkles size={16} /> Create Your First Invitation
                  </Link>
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 gap-4">
                  {invitations.map((inv, i) => (
                    <motion.div key={inv.id}
                      initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                      className="rounded-2xl p-5 flex flex-col gap-3"
                      style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            {inv.isPremium && (
                              <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
                                style={{ background: 'rgba(201,168,76,0.2)', color: '#c9a84c', border: '1px solid rgba(201,168,76,0.3)' }}>
                                <Crown size={9} /> Premium
                              </span>
                            )}
                          </div>
                          <h3 className="text-white font-bold text-base">
                            {inv.brideName} &amp; {inv.groomName}
                          </h3>
                          <p className="text-white/40 text-xs flex items-center gap-1 mt-0.5">
                            <Calendar size={10} /> {inv.weddingDate}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-white/25 text-[10px] flex items-center gap-1 justify-end">
                            <Eye size={10} /> {inv.viewCount || 0} views
                          </p>
                        </div>
                      </div>

                      <p className="text-white/30 text-xs">{inv.venueName}</p>

                      <div className="flex gap-2 mt-1">
                        <Link href={`/i/${inv.slug}`} target="_blank"
                          className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold transition-all"
                          style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.6)', border: '1px solid rgba(255,255,255,0.1)' }}>
                          <ExternalLink size={11} /> View
                        </Link>
                        <Link href={`/editor/${inv.templateId}`}
                          className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold transition-all"
                          style={{ background: 'rgba(201,168,76,0.12)', color: '#c9a84c', border: '1px solid rgba(201,168,76,0.25)' }}>
                          <Download size={11} /> Edit &amp; Download
                        </Link>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div key="payments" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              {payments.length === 0 ? (
                <div className="text-center py-24">
                  <p className="text-4xl mb-4">🧾</p>
                  <p className="text-white/40 text-sm">No payments yet. Download a premium invitation to get started.</p>
                </div>
              ) : (
                <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
                  <table className="w-full text-sm">
                    <thead>
                      <tr style={{ background: 'rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                        {['Plan', 'Amount', 'Status', 'Order ID', 'Date'].map(h => (
                          <th key={h} className="text-left px-5 py-3 text-white/30 text-xs uppercase tracking-wider font-semibold">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {payments.map((p, i) => (
                        <tr key={p.id}
                          style={{
                            borderBottom: i < payments.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                            background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.015)',
                          }}>
                          <td className="px-5 py-4">
                            <span className="px-2.5 py-1 rounded-lg text-xs font-semibold"
                              style={{ background: PLAN_COLORS[p.planType] || 'rgba(255,255,255,0.08)', color: 'white' }}>
                              {PLAN_LABELS[p.planType] || p.planType}
                            </span>
                          </td>
                          <td className="px-5 py-4 text-[#c9a84c] font-bold">₹{p.amountPaid}</td>
                          <td className="px-5 py-4">
                            <span className={`text-xs font-medium ${p.status === 'paid' || p.status === 'captured' ? 'text-green-400' : 'text-yellow-400'}`}>
                              {p.status === 'captured' ? 'Completed' : p.status === 'paid' ? 'Paid' : p.status}
                            </span>
                          </td>
                          <td className="px-5 py-4 text-white/30 text-xs font-mono">
                            {p.razorpayOrderId?.slice(-8) || '—'}
                          </td>
                          <td className="px-5 py-4 text-white/40 text-xs">
                            {new Date(p.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: '2-digit' })}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* New invitation CTA */}
        {!loading && invitations.length > 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
            className="mt-8 rounded-2xl p-6 flex items-center justify-between"
            style={{ background: 'rgba(201,168,76,0.07)', border: '1px solid rgba(201,168,76,0.2)' }}>
            <div>
              <p className="text-white font-bold mb-1">Create another invitation?</p>
              <p className="text-white/40 text-sm">Pick a new template and make someone feel special.</p>
            </div>
            <Link href="/editor/elegant-gold-001"
              className="shrink-0 flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm text-[#1a0e00]"
              style={{ background: 'linear-gradient(135deg, #c9a84c 0%, #f0d080 100%)' }}>
              Start <ChevronRight size={14} />
            </Link>
          </motion.div>
        )}

        {/* Footer */}
        <p className="text-center text-white/15 text-xs mt-12 tracking-widest uppercase">
          InviteHub.in · Made with ❤️ in India
        </p>
      </div>
    </div>
  );
}
