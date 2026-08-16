'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { ArrowLeft, Users, Mail, Download, Upload, Trash2, Plus, RefreshCw, FileText } from 'lucide-react';
import type { EventData } from '@/lib/events/event-data';
import type { Guest } from '@/lib/db/guests';

interface RsvpSummary {
  accepted: number;
  declined: number;
  maybe: number;
  pending: number;
  total: number;
  totalAttending: number;
}

interface EventDetailClientProps {
  event: EventData;
  rsvpSummary: RsvpSummary;
  initialGuests: Guest[];
  userEmail: string;
}

export default function EventDetailClient({ event, rsvpSummary, initialGuests, userEmail }: EventDetailClientProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'guests'>('overview');
  const [guests, setGuests] = useState<Guest[]>(initialGuests);
  const [isImporting, setIsImporting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsImporting(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch(`/api/guests?eventId=${event.id}`, {
        method: 'POST',
        body: formData,
      });
      
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Import failed');

      alert(`Successfully added ${json.added} guests!`);
      // Refresh list
      const listRes = await fetch(`/api/guests?eventId=${event.id}`);
      const listJson = await listRes.json();
      setGuests(listJson.guests || []);
    } catch (err: any) {
      alert(`Import error: ${err.message}`);
    } finally {
      setIsImporting(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleDeleteGuest = async (guestId: string) => {
    if (!confirm('Are you sure you want to remove this guest?')) return;
    
    setIsDeleting(guestId);
    try {
      const res = await fetch(`/api/guests/${guestId}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');
      setGuests(prev => prev.filter(g => g.id !== guestId));
    } catch (err) {
      alert('Failed to delete guest.');
    } finally {
      setIsDeleting(null);
    }
  };

  return (
    <div className="event-detail-page">
      {/* ── Header ── */}
      <header className="ed-header">
        <div className="ed-header-inner">
          <Link href="/dashboard" className="ed-back-link">
            <ArrowLeft size={16} /> Back to Dashboard
          </Link>
          <div className="ed-header-actions">
            <a href={`/e/${event.slug}`} target="_blank" rel="noreferrer" className="ed-btn ed-btn-outline">
              View Event Page
            </a>
          </div>
        </div>
      </header>

      <main className="ed-main">
        {/* Event Banner */}
        <div className="ed-banner" style={{
          background: event.coverImageUrl
            ? `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.8)), url(${event.coverImageUrl}) center/cover`
            : 'linear-gradient(135deg, #1e1e2f 0%, #0f1117 100%)'
        }}>
          <h1>{event.title}</h1>
          <p className="ed-meta">
            📅 {new Date(event.eventDate).toLocaleDateString()} 
            {event.venueName && ` · 📍 ${event.venueName}`}
          </p>
        </div>

        {/* Tabs */}
        <div className="ed-tabs">
          <button 
            className={`ed-tab ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button 
            className={`ed-tab ${activeTab === 'guests' ? 'active' : ''}`}
            onClick={() => setActiveTab('guests')}
          >
            Guest List ({guests.length})
          </button>
        </div>

        {/* Tab Content */}
        <div className="ed-content">
          {activeTab === 'overview' ? (
            <div className="ed-overview">
              <h2 className="ed-section-title">RSVP Summary</h2>
              
              <div className="ed-stats-grid">
                <div className="ed-stat-card">
                  <div className="ed-stat-icon text-blue-400"><Users size={24} /></div>
                  <div className="ed-stat-val">{rsvpSummary.total}</div>
                  <div className="ed-stat-label">Total Invited</div>
                </div>
                <div className="ed-stat-card">
                  <div className="ed-stat-icon text-green-400"><CheckCircle /></div>
                  <div className="ed-stat-val">{rsvpSummary.accepted}</div>
                  <div className="ed-stat-label">Accepted ({rsvpSummary.totalAttending} attending)</div>
                </div>
                <div className="ed-stat-card">
                  <div className="ed-stat-icon text-red-400"><XCircle /></div>
                  <div className="ed-stat-val">{rsvpSummary.declined}</div>
                  <div className="ed-stat-label">Declined</div>
                </div>
                <div className="ed-stat-card">
                  <div className="ed-stat-icon text-orange-400"><HelpCircle /></div>
                  <div className="ed-stat-val">{rsvpSummary.pending}</div>
                  <div className="ed-stat-label">Awaiting Reply</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="ed-guests">
              <div className="ed-guests-toolbar">
                <h2 className="ed-section-title mb-0">Guest Management</h2>
                <div className="ed-toolbar-actions">
                  <input 
                    type="file" 
                    accept=".csv" 
                    className="hidden" 
                    ref={fileInputRef} 
                    onChange={handleImport}
                  />
                  <button 
                    className="ed-btn ed-btn-outline"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isImporting}
                  >
                    {isImporting ? <RefreshCw size={14} className="animate-spin" /> : <Upload size={14} />}
                    Import CSV
                  </button>
                  <a 
                    href={`/api/guests?eventId=${event.id}&format=csv`}
                    className="ed-btn ed-btn-outline"
                  >
                    <Download size={14} /> Export CSV
                  </a>
                  <button className="ed-btn ed-btn-primary">
                    <Plus size={14} /> Add Guest
                  </button>
                </div>
              </div>

              <div className="ed-table-wrap">
                {guests.length === 0 ? (
                  <div className="ed-empty">
                    <FileText size={48} className="ed-empty-icon" />
                    <h3>No guests added yet</h3>
                    <p>Import a CSV or add guests manually to start tracking RSVPs.</p>
                  </div>
                ) : (
                  <table className="ed-table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Contact</th>
                        <th>Group</th>
                        <th>Status</th>
                        <th>Attending</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {guests.map(g => (
                        <tr key={g.id}>
                          <td>{g.name}</td>
                          <td>
                            <div className="ed-contact-cell">
                              {g.email && <span>{g.email}</span>}
                              {g.phone && <span>{g.phone}</span>}
                              {!g.email && !g.phone && <span className="text-gray-500">—</span>}
                            </div>
                          </td>
                          <td>
                            {g.group ? (
                              <span className="ed-badge">{g.group}</span>
                            ) : '—'}
                          </td>
                          <td>
                            <span className={`ed-status-badge status-${g.rsvpStatus}`}>
                              {g.rsvpStatus}
                            </span>
                          </td>
                          <td>{g.rsvpStatus === 'accepted' ? 'Yes' : '—'}</td>
                          <td>
                            <button 
                              className="ed-action-btn delete"
                              onClick={() => handleDeleteGuest(g.id)}
                              disabled={isDeleting === g.id}
                            >
                              {isDeleting === g.id ? <RefreshCw size={14} className="animate-spin" /> : <Trash2 size={14} />}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          )}
        </div>
      </main>

      <style>{`
        .event-detail-page {
          color: #f0f0f0;
          font-family: 'Inter', system-ui, sans-serif;
        }

        /* Header */
        .ed-header {
          background: rgba(255,255,255,0.04);
          border-bottom: 1px solid rgba(255,255,255,0.08);
          padding: 0 24px;
        }
        .ed-header-inner {
          max-width: 1200px;
          margin: 0 auto;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .ed-back-link {
          display: flex;
          align-items: center;
          gap: 6px;
          color: #aaa;
          text-decoration: none;
          font-size: 0.85rem;
          transition: color 0.2s;
        }
        .ed-back-link:hover { color: #fff; }

        /* Buttons */
        .ed-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 8px 16px;
          border-radius: 8px;
          font-size: 0.85rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
          text-decoration: none;
        }
        .ed-btn-outline {
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          color: #fff;
        }
        .ed-btn-outline:hover:not(:disabled) {
          background: rgba(255,255,255,0.1);
          border-color: rgba(255,255,255,0.2);
        }
        .ed-btn-primary {
          background: #6c9eff;
          border: 1px solid #6c9eff;
          color: #000;
        }
        .ed-btn-primary:hover:not(:disabled) {
          background: #5b8dee;
        }
        .ed-btn:disabled { opacity: 0.5; cursor: not-allowed; }

        /* Main */
        .ed-main {
          max-width: 1200px;
          margin: 0 auto;
          padding: 32px 24px 80px;
        }

        .ed-banner {
          padding: 40px;
          border-radius: 16px;
          margin-bottom: 32px;
          border: 1px solid rgba(255,255,255,0.1);
        }
        .ed-banner h1 {
          font-size: 2rem;
          margin: 0 0 8px;
          font-weight: 700;
        }
        .ed-meta { color: #aaa; font-size: 0.9rem; margin: 0; }

        /* Tabs */
        .ed-tabs {
          display: flex;
          gap: 24px;
          border-bottom: 1px solid rgba(255,255,255,0.1);
          margin-bottom: 32px;
        }
        .ed-tab {
          background: none;
          border: none;
          color: #888;
          font-size: 0.95rem;
          font-weight: 500;
          padding: 0 4px 12px;
          cursor: pointer;
          position: relative;
        }
        .ed-tab.active { color: #fff; }
        .ed-tab.active::after {
          content: '';
          position: absolute;
          bottom: -1px;
          left: 0;
          right: 0;
          height: 2px;
          background: #6c9eff;
        }

        .ed-section-title { font-size: 1.2rem; font-weight: 600; margin: 0 0 20px; }

        /* Stats */
        .ed-stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 16px;
        }
        .ed-stat-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.06);
          padding: 24px;
          border-radius: 12px;
        }
        .ed-stat-icon { margin-bottom: 12px; }
        .ed-stat-val { font-size: 2rem; font-weight: 700; line-height: 1; margin-bottom: 4px; }
        .ed-stat-label { font-size: 0.8rem; color: #888; }

        /* Guests */
        .ed-guests-toolbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }
        .ed-toolbar-actions { display: flex; gap: 12px; }
        .mb-0 { margin-bottom: 0; }

        .ed-table-wrap {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 12px;
          overflow: hidden;
        }
        .ed-table { width: 100%; border-collapse: collapse; }
        .ed-table th {
          text-align: left;
          padding: 14px 20px;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #888;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          background: rgba(255,255,255,0.02);
        }
        .ed-table td {
          padding: 16px 20px;
          font-size: 0.85rem;
          border-bottom: 1px solid rgba(255,255,255,0.04);
        }
        .ed-table tr:last-child td { border-bottom: none; }
        .ed-table tr:hover td { background: rgba(255,255,255,0.015); }

        .ed-contact-cell { display: flex; flex-direction: column; gap: 2px; font-size: 0.8rem; color: #aaa; }
        
        .ed-badge {
          background: rgba(255,255,255,0.1);
          padding: 2px 8px;
          border-radius: 4px;
          font-size: 0.75rem;
          color: #ccc;
        }

        .ed-status-badge {
          padding: 4px 10px;
          border-radius: 12px;
          font-size: 0.7rem;
          font-weight: 600;
          text-transform: uppercase;
        }
        .status-pending { background: rgba(255,255,255,0.1); color: #aaa; }
        .status-accepted { background: rgba(52,211,153,0.15); color: #34d399; }
        .status-declined { background: rgba(248,113,113,0.15); color: #f87171; }
        .status-maybe { background: rgba(251,191,36,0.15); color: #fbbf24; }

        .ed-action-btn {
          background: none;
          border: none;
          color: #666;
          cursor: pointer;
          padding: 6px;
          border-radius: 4px;
          transition: all 0.2s;
        }
        .ed-action-btn:hover { background: rgba(255,255,255,0.1); color: #fff; }
        .ed-action-btn.delete:hover { background: rgba(248,113,113,0.15); color: #f87171; }

        .ed-empty {
          text-align: center;
          padding: 60px 20px;
          color: #666;
        }
        .ed-empty-icon { margin: 0 auto 16px; opacity: 0.5; }
        .ed-empty h3 { color: #ccc; margin: 0 0 8px; font-size: 1.1rem; }
      `}</style>
    </div>
  );
}

// Missing icons for stats
const CheckCircle = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>;
const XCircle = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>;
const HelpCircle = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>;
