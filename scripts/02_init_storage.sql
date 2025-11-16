-- Create storage bucket for creator uploads
-- Note: In Supabase, buckets are typically created via the dashboard or API
-- This script documents the bucket structure needed

-- The bucket 'creator-uploads' should be created with:
-- - Name: creator-uploads
-- - Public: true
-- - File size limit: 52857600 (50MB)

-- To create this bucket via API or CLI, use:
-- INSERT INTO storage.buckets (id, name, public) VALUES ('creator-uploads', 'creator-uploads', true);

-- Public read policy for the bucket
-- CREATE POLICY "Public Read Access" ON storage.objects
--   FOR SELECT USING (bucket_id = 'creator-uploads');

-- Allow authenticated users to upload
-- CREATE POLICY "Authenticated Upload" ON storage.objects
--   FOR INSERT WITH CHECK (bucket_id = 'creator-uploads' AND auth.role() = 'authenticated');
