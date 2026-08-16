-- ═══════════════════════════════════════════════════════════════
-- InviteHub 2.0 — Database Migration
-- Run in Supabase SQL Editor (supabase.com/dashboard → SQL Editor)
-- ═══════════════════════════════════════════════════════════════
-- SAFE: Uses IF NOT EXISTS / ADD COLUMN IF NOT EXISTS throughout.
-- Run order matters. Run this entire file in one go.
-- ═══════════════════════════════════════════════════════════════

-- ─────────────────────────────────────────────
-- STEP 1: Create `events` table
-- (replaces the `invitations` table conceptually)
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS events (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Owner (Supabase Auth user) — NULL for anonymous event creators (free tier)
  user_id         UUID REFERENCES auth.users(id) ON DELETE SET NULL,

  -- Future: B2B workspace (Milestone 4)
  workspace_id    UUID,

  -- Unique shareable slug: invitehub.in/e/{slug}
  slug            TEXT UNIQUE NOT NULL,
  status          TEXT NOT NULL DEFAULT 'published'
                  CHECK (status IN ('draft','published','archived')),

  -- Classification
  event_category  TEXT NOT NULL DEFAULT 'personal'
                  CHECK (event_category IN ('personal','professional')),
  event_type      TEXT NOT NULL DEFAULT 'wedding'
                  CHECK (event_type IN (
                    'wedding','birthday','engagement','baby-shower',
                    'housewarming','anniversary','farewell',
                    'conference','corporate','product-launch','retirement',
                    'webinar','networking','townhall','workshop',
                    'school','community'
                  )),

  -- Core Content (replaces brideName/groomName/etc.)
  title           TEXT NOT NULL,
  primary_name    TEXT NOT NULL,
  secondary_name  TEXT,
  tagline         TEXT,
  message         TEXT,

  -- Date & Time
  event_date      DATE NOT NULL,
  event_time      TIME,
  event_end_date  DATE,
  event_end_time  TIME,
  timezone        TEXT NOT NULL DEFAULT 'Asia/Kolkata',

  -- Venue
  venue_name      TEXT,
  venue_address   TEXT,
  venue_city      TEXT,
  venue_country   TEXT DEFAULT 'India',
  venue_lat       DECIMAL(10, 7),
  venue_lng       DECIMAL(10, 7),
  is_virtual      BOOLEAN NOT NULL DEFAULT FALSE,
  virtual_link    TEXT,

  -- Contact
  contact_phone   TEXT,
  contact_email   TEXT,
  contact_website TEXT,

  -- Media
  cover_image_url TEXT,
  gallery_images  TEXT[] DEFAULT '{}',

  -- Event-type-specific content
  family_details  TEXT,
  agenda          TEXT,
  dress_code      TEXT,

  -- Template
  template_id     TEXT NOT NULL,
  template_tier   TEXT NOT NULL DEFAULT 'free'
                  CHECK (template_tier IN ('free','premium','premium-plus')),

  -- Branding (Pro/Business tier)
  custom_logo_url       TEXT,
  custom_primary_color  TEXT,
  custom_secondary_color TEXT,
  hide_branding         BOOLEAN NOT NULL DEFAULT FALSE,

  -- Feature flags
  rsvp_enabled        BOOLEAN NOT NULL DEFAULT TRUE,
  calendar_enabled    BOOLEAN NOT NULL DEFAULT TRUE,
  map_enabled         BOOLEAN NOT NULL DEFAULT TRUE,
  qr_checkin_enabled  BOOLEAN NOT NULL DEFAULT FALSE,
  max_rsvps           INT NOT NULL DEFAULT 25,

  -- Analytics
  view_count      INT NOT NULL DEFAULT 0,
  share_count     INT NOT NULL DEFAULT 0,
  calendar_adds   INT NOT NULL DEFAULT 0,
  email_sends     INT NOT NULL DEFAULT 0,

  -- Payment
  is_premium      BOOLEAN NOT NULL DEFAULT FALSE,
  paid_tier       TEXT CHECK (paid_tier IN (
                    'starter','pro','premium',
                    'business-starter','business-pro','enterprise'
                  )),
  payment_id      UUID,

  -- Flexible extra data
  custom_data     JSONB NOT NULL DEFAULT '{}',

  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_events_user ON events(user_id);
CREATE INDEX IF NOT EXISTS idx_events_slug ON events(slug);
CREATE INDEX IF NOT EXISTS idx_events_type ON events(event_type, event_category);
CREATE INDEX IF NOT EXISTS idx_events_status ON events(status);

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS events_updated_at ON events;
CREATE TRIGGER events_updated_at
  BEFORE UPDATE ON events
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ─────────────────────────────────────────────
-- STEP 2: Create `profiles` table
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS profiles (
  id            UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email         TEXT UNIQUE NOT NULL,
  name          TEXT,
  phone         TEXT,
  avatar_url    TEXT,
  country       TEXT DEFAULT 'IN',
  currency      TEXT DEFAULT 'INR',
  plan          TEXT DEFAULT 'free'
                CHECK (plan IN ('free','starter','pro','premium')),
  workspace_id  UUID,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

DROP TRIGGER IF EXISTS profiles_updated_at ON profiles;
CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ─────────────────────────────────────────────
-- STEP 3: Update `rsvps` table (add new fields)
-- Keep existing data intact.
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS rsvps (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id      UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  guest_id      UUID,
  name          TEXT NOT NULL,
  email         TEXT,
  phone         TEXT,
  status        TEXT NOT NULL DEFAULT 'pending'
                CHECK (status IN ('accepted','declined','maybe','pending')),
  guest_count   INT NOT NULL DEFAULT 1,
  message       TEXT,
  dietary_notes TEXT,
  is_checked_in BOOLEAN NOT NULL DEFAULT FALSE,
  checked_in_at TIMESTAMPTZ,
  responded_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_rsvps_event ON rsvps(event_id);
CREATE INDEX IF NOT EXISTS idx_rsvps_status ON rsvps(status);

-- ─────────────────────────────────────────────
-- STEP 4: Create `guests` table (for Milestone 2)
-- Create now — will be populated in Milestone 2.
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS guests (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id      UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  name          TEXT NOT NULL,
  email         TEXT,
  phone         TEXT,
  group_tag     TEXT DEFAULT 'General',
  plus_ones     INT NOT NULL DEFAULT 0,
  dietary_notes TEXT,
  notes         TEXT,
  is_vip        BOOLEAN NOT NULL DEFAULT FALSE,
  qr_token      TEXT UNIQUE,
  qr_url        TEXT,
  invitation_sent_at TIMESTAMPTZ,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_guests_event ON guests(event_id);
CREATE INDEX IF NOT EXISTS idx_guests_email ON guests(email);

-- ─────────────────────────────────────────────
-- STEP 5: Create `payments` table (for Milestone 3)
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS payments (
  id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id               UUID REFERENCES auth.users(id),
  workspace_id          UUID,
  event_id              UUID REFERENCES events(id),
  amount                INT NOT NULL,
  currency              TEXT NOT NULL DEFAULT 'INR',
  status                TEXT NOT NULL DEFAULT 'pending'
                        CHECK (status IN ('pending','completed','failed','refunded')),
  provider              TEXT NOT NULL CHECK (provider IN ('razorpay','stripe')),
  provider_order_id     TEXT,
  provider_payment_id   TEXT,
  provider_subscription_id TEXT,
  plan                  TEXT,
  billing_type          TEXT NOT NULL DEFAULT 'one_time'
                        CHECK (billing_type IN ('one_time','monthly','annual')),
  metadata              JSONB NOT NULL DEFAULT '{}',
  created_at            TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_payments_user ON payments(user_id);
CREATE INDEX IF NOT EXISTS idx_payments_event ON payments(event_id);

-- ─────────────────────────────────────────────
-- STEP 6: Row Level Security Policies
-- ─────────────────────────────────────────────

-- Events: owners control their events
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can read published events" ON events;
CREATE POLICY "Anyone can read published events" ON events
  FOR SELECT USING (status = 'published');

DROP POLICY IF EXISTS "Owners can CRUD their events" ON events;
CREATE POLICY "Owners can CRUD their events" ON events
  FOR ALL USING (user_id = auth.uid());

DROP POLICY IF EXISTS "Anyone can insert events" ON events;
CREATE POLICY "Anyone can insert events" ON events
  FOR INSERT WITH CHECK (true);

-- RSVPs: public write, owner reads
ALTER TABLE rsvps ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can submit RSVP" ON rsvps;
CREATE POLICY "Anyone can submit RSVP" ON rsvps
  FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Event owners read RSVPs" ON rsvps;
CREATE POLICY "Event owners read RSVPs" ON rsvps
  FOR SELECT USING (
    event_id IN (SELECT id FROM events WHERE user_id = auth.uid())
  );

-- Guests: only event owners
ALTER TABLE guests ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Event owners manage guests" ON guests;
CREATE POLICY "Event owners manage guests" ON guests
  FOR ALL USING (
    event_id IN (SELECT id FROM events WHERE user_id = auth.uid())
  );

-- Profiles: users own their profile
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users own their profile" ON profiles;
CREATE POLICY "Users own their profile" ON profiles
  FOR ALL USING (id = auth.uid());

-- ─────────────────────────────────────────────
-- STEP 7: Data migration from invitations → events
-- Run AFTER the events table is created.
-- ─────────────────────────────────────────────
-- NOTE: The invitations table columns were created via Supabase UI
-- so they are quoted camelCase (e.g. "brideName").
-- The "eventType" column doesn't exist in the current db schema,
-- so we default all old data to 'wedding' and 'personal'.
-- ─────────────────────────────────────────────

-- Create a temporary helper function to safely cast free-text dates 
-- (e.g. "25th Nov 2026" or "TBD") without crashing the migration.
CREATE OR REPLACE FUNCTION public.safe_cast_date(d text) RETURNS date AS $$
BEGIN
    -- Remove ordinals (st, nd, rd, th) and try to cast 
    RETURN regexp_replace(d, '([0-9]+)(st|nd|rd|th)', '\1', 'i')::date;
EXCEPTION WHEN OTHERS THEN
    RETURN CURRENT_DATE;
END;
$$ LANGUAGE plpgsql;

-- Create a temporary helper function to safely cast free-text times 
-- (e.g. "8:00 PM Onwards") without crashing the migration.
CREATE OR REPLACE FUNCTION public.safe_cast_time(t text) RETURNS time AS $$
BEGIN
    -- Remove words like "onwards" and try to cast
    RETURN regexp_replace(t, '(?i)\s*onwards?', '')::time;
EXCEPTION WHEN OTHERS THEN
    BEGIN
        RETURN t::time;
    EXCEPTION WHEN OTHERS THEN
        RETURN NULL;
    END;
END;
$$ LANGUAGE plpgsql;

INSERT INTO events (
  slug,
  user_id,
  status,
  event_category,
  event_type,
  title,
  primary_name,
  secondary_name,
  event_date,
  event_time,
  timezone,
  venue_name,
  venue_address,
  contact_phone,
  message,
  cover_image_url,
  family_details,
  template_id,
  template_tier,
  is_premium,
  hide_branding,
  rsvp_enabled,
  calendar_enabled,
  map_enabled,
  created_at
)
SELECT
  slug,
  NULL::UUID AS user_id,
  'published'::TEXT AS status,
  'personal' AS event_category,
  'wedding' AS event_type,
  COALESCE("brideName", '') || CASE WHEN "groomName" IS NOT NULL AND "groomName" <> '' THEN ' & ' || "groomName" ELSE '' END AS title,
  COALESCE("brideName", '') AS primary_name,
  NULLIF("groomName", '') AS secondary_name,
  CASE WHEN "weddingDate" IS NOT NULL AND "weddingDate" <> '' THEN public.safe_cast_date("weddingDate") ELSE CURRENT_DATE END AS event_date,
  CASE WHEN "weddingTime" IS NOT NULL AND "weddingTime" <> '' THEN public.safe_cast_time("weddingTime") ELSE NULL END AS event_time,
  'Asia/Kolkata' AS timezone,
  "venueName" AS venue_name,
  "venueAddress" AS venue_address,
  "contactNumber" AS contact_phone,
  "additionalMessage" AS message,
  "couplePhotoUrl" AS cover_image_url,
  "familyDetails" AS family_details,
  "templateId" AS template_id,
  CASE WHEN "isPremium" = TRUE THEN 'premium' ELSE 'free' END AS template_tier,
  COALESCE("isPremium", FALSE) AS is_premium,
  COALESCE("isPremium", FALSE) AS hide_branding,
  TRUE AS rsvp_enabled,
  TRUE AS calendar_enabled,
  TRUE AS map_enabled,
  COALESCE("createdAt", NOW()) AS created_at
FROM invitations
WHERE slug NOT IN (SELECT slug FROM events)
ON CONFLICT (slug) DO NOTHING;

-- Cleanup helper function
DROP FUNCTION IF EXISTS public.safe_cast_date(text);

-- ─────────────────────────────────────────────
-- STEP 8: Migrate existing RSVPs if they exist
-- (invitations table's existing RSVP table, if any)
-- ─────────────────────────────────────────────
-- Only run if you have a separate rsvps table from old schema:
-- INSERT INTO rsvps (event_id, name, attending, guest_count, message, created_at)
-- SELECT e.id, r.name, r.attending::TEXT, r.guests::INT, r.message, r.created_at
-- FROM old_rsvps r
-- JOIN events e ON e.slug = (SELECT slug FROM invitations WHERE id = r.invitation_id)
-- ON CONFLICT DO NOTHING;

-- ─────────────────────────────────────────────
-- STEP 9: Helpful views
-- ─────────────────────────────────────────────
CREATE OR REPLACE VIEW event_rsvp_summary AS
SELECT
  e.id,
  e.slug,
  e.title,
  e.event_date,
  COUNT(r.id) FILTER (WHERE r.status = 'accepted') AS accepted_count,
  COUNT(r.id) FILTER (WHERE r.status = 'declined') AS declined_count,
  COUNT(r.id) FILTER (WHERE r.status = 'maybe') AS maybe_count,
  COUNT(r.id) FILTER (WHERE r.status = 'pending') AS pending_count,
  COUNT(r.id) AS total_rsvps,
  SUM(r.guest_count) FILTER (WHERE r.status = 'accepted') AS total_attending
FROM events e
LEFT JOIN rsvps r ON r.event_id = e.id
GROUP BY e.id, e.slug, e.title, e.event_date;

-- ═══════════════════════════════════════════════════════════════
-- Migration complete.
-- After running, verify with:
--   SELECT COUNT(*) FROM events;   -- should match invitations count
--   SELECT * FROM event_rsvp_summary LIMIT 10;
-- ═══════════════════════════════════════════════════════════════
