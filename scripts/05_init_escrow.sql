-- Create projects table
create table if not exists projects (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  description text,
  client_id uuid references auth.users(id) not null,
  freelancer_id uuid references auth.users(id) not null,
  budget integer not null, -- In Karma
  status text not null default 'pending' check (status in ('pending', 'active', 'completed', 'disputed', 'cancelled')),
  escrow_status text not null default 'unfunded' check (escrow_status in ('unfunded', 'funded', 'released', 'refunded')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table projects enable row level security;

-- Policies
create policy "Users can view projects they are involved in"
  on projects for select
  using (auth.uid() = client_id or auth.uid() = freelancer_id);

create policy "Users can create projects"
  on projects for insert
  with check (auth.uid() = client_id);

create policy "Users can update projects they are involved in"
  on projects for update
  using (auth.uid() = client_id or auth.uid() = freelancer_id);
