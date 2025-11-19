-- Enable Realtime for messages table
-- Run this in your Supabase SQL Editor

BEGIN;

-- Check if the publication exists (it usually does by default in Supabase)
-- If not, create it (commented out as it usually exists)
-- CREATE PUBLICATION supabase_realtime;

-- Add messages table to the publication
ALTER PUBLICATION supabase_realtime ADD TABLE messages;

COMMIT;
