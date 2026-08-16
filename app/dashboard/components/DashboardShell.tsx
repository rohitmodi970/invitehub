'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import type { EventData } from '@/lib/events/event-data';

interface RsvpSummary {
  accepted: number;
  declined: number;
  maybe: number;
  pending: number;
  total: number;
  totalAttending: number;
}

interface EventWithRsvp extends EventData {
  rsvpSummary: RsvpSummary;
}

interface DashboardShellProps {
  events: EventWithRsvp[];
  userEmail: string;
}

const EVENT_TYPE_EMOJI: Record<string, string> = {
  wedding: '💍', birthday: '🎂', engagement: '💍', 'baby-shower': '🍼',
  housewarming: '🏠', anniversary: '❤️', farewell: '👋',
  conference: '🎤', corporate: '🏢', 'product-launch': '🚀',
  retirement: '🌅', webinar: '💻', networking: '🤝',
  townhall: '🏛️', workshop: '🛠️', school: '🎓', community: '🌍',
};

export default function DashboardShell({ events, userEmail }: DashboardShellProps) {
  const [filter, setFilter] = useState<'all' | 'personal' | 'professional'>('all');
  const [search, setSearch] = useState('');

  const filtered = events.filter(e => {
    if (filter !== 'all' && e.eventCategory !== filter) return false;
    if (search && !e.title.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const totalRsvps = events.reduce((s, e) => s + e.rsvpSummary.total, 0);
  const totalAttending = events.reduce((s, e) => s + e.rsvpSummary.totalAttending, 0);

  return (
    <div className="dashboard-shell">
      {/* ── Header ─────────────────────────── */}
      <header className="dashboard-header">
        <div className="dashboard-header-inner">
          <div>
            <Link href="/" className="dashboard-logo">InviteHub</Link>
            <span className="dashboard-badge">Dashboard</span>
          </div>
          <div className="dashboard-user">
            <span className="dashboard-email">{userEmail}</span>
            <Link href="/api/auth/logout" className="dashboard-logout">Sign out</Link>
          </div>
        </div>
      </header>

      <main className="dashboard-main">
        {/* ── Stats Bar ─────────────────────── */}
        <motion.div
          className="dashboard-stats"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <StatCard label="Total Events" value={events.length} icon="📅" color="blue" />
          <StatCard label="Total RSVPs" value={totalRsvps} icon="✉️" color="purple" />
          <StatCard label="Attending" value={totalAttending} icon="✅" color="green" />
          <StatCard
            label="Published"
            value={events.filter(e => e.status === 'published').length}
            icon="🌐"
            color="orange"
          />
        </motion.div>

        {/* ── Toolbar ───────────────────────── */}
        <div className="dashboard-toolbar">
          <div className="dashboard-search-wrap">
            <span className="dashboard-search-icon">🔍</span>
            <input
              id="dashboard-search"
              className="dashboard-search"
              placeholder="Search events..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>

          <div className="dashboard-filters">
            {(['all', 'personal', 'professional'] as const).map(f => (
              <button
                key={f}
                id={`filter-${f}`}
                className={`dashboard-filter-btn ${filter === f ? 'active' : ''}`}
                onClick={() => setFilter(f)}
              >
                {f === 'all' ? 'All' : f === 'personal' ? '💝 Personal' : '💼 Professional'}
              </button>
            ))}
          </div>

          <Link href="/templates" id="create-event-btn" className="dashboard-create-btn">
            + Create Event
          </Link>
        </div>

        {/* ── Event Grid ────────────────────── */}
        {filtered.length === 0 ? (
          <EmptyState hasEvents={events.length > 0} />
        ) : (
          <div className="dashboard-grid">
            {filtered.map((event, i) => (
              <EventCard key={event.id} event={event} index={i} />
            ))}
          </div>
        )}
      </main>

      <style>{dashboardCSS}</style>
    </div>
  );
}

// ── Sub-components ────────────────────────────────────────────────────

function StatCard({ label, value, icon, color }: {
  label: string; value: number; icon: string; color: string;
}) {
  return (
    <div className={`stat-card stat-card--${color}`}>
      <span className="stat-icon">{icon}</span>
      <div>
        <div className="stat-value">{value.toLocaleString()}</div>
        <div className="stat-label">{label}</div>
      </div>
    </div>
  );
}

function EventCard({ event, index }: { event: EventWithRsvp; index: number }) {
  const emoji = EVENT_TYPE_EMOJI[event.eventType] ?? '📋';
  const { rsvpSummary: rsvp } = event;
  const acceptedPct = rsvp.total > 0 ? Math.round((rsvp.accepted / rsvp.total) * 100) : 0;

  const dateStr = event.eventDate
    ? new Date(event.eventDate).toLocaleDateString('en-IN', {
        day: 'numeric', month: 'short', year: 'numeric'
      })
    : 'TBD';

  return (
    <motion.div
      className="event-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.06 }}
    >
      {/* Cover / Banner */}
      <div
        className="event-card-banner"
        style={{
          background: event.coverImageUrl
            ? `url(${event.coverImageUrl}) center/cover`
            : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        }}
      >
        <span className="event-card-emoji">{emoji}</span>
        <span className={`event-card-status status--${event.status}`}>{event.status}</span>
      </div>

      {/* Body */}
      <div className="event-card-body">
        <h3 className="event-card-title">{event.title}</h3>
        <p className="event-card-meta">
          📅 {dateStr}
          {event.venueName && <> · 📍 {event.venueName}</>}
        </p>

        {/* RSVP Bar */}
        <div className="rsvp-bar-wrap">
          <div className="rsvp-bar-track">
            <div className="rsvp-bar-fill rsvp-bar-accepted" style={{ width: `${acceptedPct}%` }} />
            <div
              className="rsvp-bar-fill rsvp-bar-declined"
              style={{ width: `${rsvp.total > 0 ? Math.round((rsvp.declined / rsvp.total) * 100) : 0}%` }}
            />
          </div>
          <div className="rsvp-counts">
            <span className="rsvp-count rsvp-accepted">✅ {rsvp.accepted}</span>
            <span className="rsvp-count rsvp-declined">❌ {rsvp.declined}</span>
            <span className="rsvp-count rsvp-maybe">🤔 {rsvp.maybe}</span>
            <span className="rsvp-count rsvp-pending">⏳ {rsvp.pending}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="event-card-actions">
          <Link href={`/e/${event.slug}`} className="event-action event-action--view" target="_blank">
            View Page ↗
          </Link>
          <Link href={`/dashboard/events/${event.id}`} className="event-action event-action--manage">
            Manage
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

function EmptyState({ hasEvents }: { hasEvents: boolean }) {
  return (
    <div className="empty-state">
      <div className="empty-icon">🎉</div>
      <h2>{hasEvents ? 'No events match your search' : 'Create your first event'}</h2>
      <p>{hasEvents
        ? 'Try adjusting your search or filter.'
        : 'Build a beautiful invitation in under 3 minutes.'
      }</p>
      {!hasEvents && (
        <Link href="/templates" className="empty-cta">Browse Templates →</Link>
      )}
    </div>
  );
}

// ── CSS ───────────────────────────────────────────────────────────────
const dashboardCSS = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

  .dashboard-shell {
    min-height: 100vh;
    background: #0f1117;
    color: #f0f0f0;
    font-family: 'Inter', system-ui, sans-serif;
  }

  /* Header */
  .dashboard-header {
    background: rgba(255,255,255,0.04);
    border-bottom: 1px solid rgba(255,255,255,0.08);
    padding: 0 24px;
    position: sticky;
    top: 0;
    z-index: 10;
    backdrop-filter: blur(12px);
  }
  .dashboard-header-inner {
    max-width: 1200px;
    margin: 0 auto;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .dashboard-logo {
    font-weight: 700;
    font-size: 1.2rem;
    color: #fff;
    text-decoration: none;
    letter-spacing: -0.5px;
  }
  .dashboard-badge {
    margin-left: 10px;
    font-size: 0.72rem;
    background: rgba(255,255,255,0.1);
    border-radius: 4px;
    padding: 2px 8px;
    color: #aaa;
  }
  .dashboard-user { display: flex; align-items: center; gap: 16px; }
  .dashboard-email { font-size: 0.85rem; color: #888; }
  .dashboard-logout { font-size: 0.82rem; color: #6c9eff; text-decoration: none; }
  .dashboard-logout:hover { color: #fff; }

  /* Main */
  .dashboard-main {
    max-width: 1200px;
    margin: 0 auto;
    padding: 32px 24px 80px;
  }

  /* Stats */
  .dashboard-stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 16px;
    margin-bottom: 32px;
  }
  .stat-card {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 20px;
    border-radius: 16px;
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.08);
  }
  .stat-icon { font-size: 1.8rem; }
  .stat-value { font-size: 1.75rem; font-weight: 700; line-height: 1; }
  .stat-label { font-size: 0.78rem; color: #888; margin-top: 2px; }
  .stat-card--blue { border-color: rgba(108,158,255,0.3); }
  .stat-card--purple { border-color: rgba(167,139,250,0.3); }
  .stat-card--green { border-color: rgba(52,211,153,0.3); }
  .stat-card--orange { border-color: rgba(251,146,60,0.3); }

  /* Toolbar */
  .dashboard-toolbar {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 24px;
    flex-wrap: wrap;
  }
  .dashboard-search-wrap {
    flex: 1;
    min-width: 200px;
    position: relative;
  }
  .dashboard-search-icon {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 0.9rem;
  }
  .dashboard-search {
    width: 100%;
    padding: 10px 12px 10px 36px;
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 10px;
    color: #fff;
    font-size: 0.9rem;
    outline: none;
    transition: border-color 0.2s;
  }
  .dashboard-search:focus { border-color: rgba(108,158,255,0.5); }

  .dashboard-filters { display: flex; gap: 6px; }
  .dashboard-filter-btn {
    padding: 8px 14px;
    border-radius: 8px;
    background: transparent;
    border: 1px solid rgba(255,255,255,0.1);
    color: #888;
    font-size: 0.82rem;
    cursor: pointer;
    transition: all 0.2s;
  }
  .dashboard-filter-btn:hover,
  .dashboard-filter-btn.active {
    background: rgba(108,158,255,0.15);
    border-color: rgba(108,158,255,0.4);
    color: #fff;
  }

  .dashboard-create-btn {
    padding: 10px 20px;
    background: linear-gradient(135deg, #6c9eff, #a78bfa);
    border-radius: 10px;
    color: #fff;
    font-weight: 600;
    font-size: 0.88rem;
    text-decoration: none;
    white-space: nowrap;
    transition: opacity 0.2s, transform 0.1s;
  }
  .dashboard-create-btn:hover { opacity: 0.9; transform: translateY(-1px); }

  /* Grid */
  .dashboard-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 20px;
  }

  /* Event Card */
  .event-card {
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 18px;
    overflow: hidden;
    transition: transform 0.2s, border-color 0.2s;
  }
  .event-card:hover {
    transform: translateY(-3px);
    border-color: rgba(108,158,255,0.3);
  }

  .event-card-banner {
    height: 120px;
    position: relative;
    display: flex;
    align-items: flex-end;
    padding: 12px;
  }
  .event-card-emoji { font-size: 2rem; }
  .event-card-status {
    position: absolute;
    top: 12px;
    right: 12px;
    font-size: 0.7rem;
    padding: 3px 10px;
    border-radius: 20px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
  .status--published { background: rgba(52,211,153,0.2); color: #34d399; }
  .status--draft { background: rgba(251,146,60,0.2); color: #fb923c; }
  .status--archived { background: rgba(255,255,255,0.1); color: #888; }

  .event-card-body { padding: 16px 18px 18px; }
  .event-card-title {
    font-size: 1.05rem;
    font-weight: 600;
    margin: 0 0 6px;
    color: #fff;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .event-card-meta { font-size: 0.8rem; color: #666; margin: 0 0 14px; }

  /* RSVP bar */
  .rsvp-bar-wrap { margin-bottom: 14px; }
  .rsvp-bar-track {
    height: 4px;
    background: rgba(255,255,255,0.08);
    border-radius: 4px;
    overflow: hidden;
    display: flex;
    margin-bottom: 8px;
  }
  .rsvp-bar-fill { height: 100%; transition: width 0.6s; }
  .rsvp-bar-accepted { background: #34d399; }
  .rsvp-bar-declined { background: #f87171; }
  .rsvp-counts { display: flex; gap: 10px; }
  .rsvp-count { font-size: 0.75rem; color: #888; }
  .rsvp-accepted { color: #34d399; }
  .rsvp-declined { color: #f87171; }
  .rsvp-maybe { color: #fbbf24; }

  /* Actions */
  .event-card-actions { display: flex; gap: 8px; }
  .event-action {
    flex: 1;
    text-align: center;
    padding: 8px;
    border-radius: 8px;
    font-size: 0.82rem;
    font-weight: 500;
    text-decoration: none;
    transition: all 0.2s;
  }
  .event-action--view {
    background: rgba(255,255,255,0.06);
    color: #aaa;
    border: 1px solid rgba(255,255,255,0.08);
  }
  .event-action--view:hover { color: #fff; border-color: rgba(255,255,255,0.2); }
  .event-action--manage {
    background: rgba(108,158,255,0.15);
    color: #6c9eff;
    border: 1px solid rgba(108,158,255,0.25);
  }
  .event-action--manage:hover { background: rgba(108,158,255,0.25); }

  /* Empty state */
  .empty-state {
    text-align: center;
    padding: 80px 24px;
    color: #555;
  }
  .empty-icon { font-size: 4rem; margin-bottom: 16px; }
  .empty-state h2 { color: #ccc; font-size: 1.4rem; margin: 0 0 8px; }
  .empty-state p { margin: 0 0 24px; }
  .empty-cta {
    display: inline-block;
    padding: 12px 28px;
    background: linear-gradient(135deg, #6c9eff, #a78bfa);
    border-radius: 12px;
    color: #fff;
    font-weight: 600;
    text-decoration: none;
  }

  @media (max-width: 640px) {
    .dashboard-toolbar { flex-direction: column; align-items: stretch; }
    .dashboard-filters { flex-wrap: wrap; }
  }
`;
