-- Create trends table
create table if not exists trends (
  id uuid default gen_random_uuid() primary key,
  topic text not null,
  platform text not null,
  volume integer not null,
  growth_rate integer not null,
  category text not null,
  description text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table trends enable row level security;

-- Create policy to allow everyone to read trends
create policy "Trends are viewable by everyone"
  on trends for select
  using (true);

-- Insert some mock data
insert into trends (topic, platform, volume, growth_rate, category, description) values
  ('AI Art Tutorials', 'YouTube', 450000, 125, 'Tech', 'Deep dive tutorials on Stable Diffusion and Midjourney are exploding.'),
  ('Silent Vlogs', 'TikTok', 890000, 85, 'Lifestyle', 'Aesthetic, ASMR-style day in the life videos without spoken words.'),
  ('Sustainable Fashion', 'Instagram', 1200000, 45, 'Fashion', 'Thrifting hauls and upcycling tutorials gaining massive traction.'),
  ('Retro Gaming', 'Twitch', 340000, 60, 'Gaming', 'Speedruns of classic NES and SNES games.'),
  ('Micro-Learning', 'TikTok', 2500000, 150, 'Education', 'Quick 30-second educational snippets on history and science.'),
  ('Plant-Based Comfort Food', 'Instagram', 670000, 95, 'Food', 'Vegan versions of classic comfort foods like mac & cheese.');
