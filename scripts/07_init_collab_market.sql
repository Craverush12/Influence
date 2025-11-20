-- Create collab_proposals table (The "Marketplace" Listings)
create table if not exists collab_proposals (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) not null,
  title text not null,
  description text not null,
  budget integer not null, -- In Karma
  required_vibe text, -- e.g., "Cyberpunk", "Minimalist" (Matches Reel Analysis)
  status text not null default 'open' check (status in ('open', 'closed', 'filled')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table collab_proposals enable row level security;

-- Policies
create policy "Anyone can view open proposals"
  on collab_proposals for select
  using (true);

create policy "Users can create proposals"
  on collab_proposals for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own proposals"
  on collab_proposals for update
  using (auth.uid() = user_id);
