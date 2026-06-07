-- Phase 9: Add event type support to invitations table
-- Run in Supabase SQL Editor

ALTER TABLE invitations
ADD COLUMN IF NOT EXISTS eventType TEXT DEFAULT 'wedding';

COMMENT ON COLUMN invitations.eventType IS 'Event type: wedding, birthday, engagement, baby-shower, housewarming, anniversary, corporate';
