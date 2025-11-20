-- Enable the pgvector extension to work with embeddings
create extension if not exists vector;

-- Create a table to store reel analysis data
create table if not exists reel_analysis (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  video_url text not null,
  -- Store the raw analysis from the AI (e.g., {"mood": "dark", "pacing": "fast"})
  analysis_json jsonb not null default '{}'::jsonb,
  -- Store the vector embedding for similarity search (assuming 1536 dims for OpenAI)
  embedding vector(1536),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table reel_analysis enable row level security;

-- Policies
create policy "Users can insert their own reels"
  on reel_analysis for insert
  with check (auth.uid() = user_id);

create policy "Users can view their own reels"
  on reel_analysis for select
  using (auth.uid() = user_id);

create policy "Everyone can view reels (for matching)"
  on reel_analysis for select
  using (true);
