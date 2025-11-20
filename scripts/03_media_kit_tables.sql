-- Create creator_stats table
CREATE TABLE IF NOT EXISTS creator_stats (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    platform VARCHAR(50) NOT NULL,
    followers INTEGER DEFAULT 0,
    views INTEGER DEFAULT 0,
    engagement_rate DECIMAL(5,2) DEFAULT 0,
    recorded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, platform, recorded_at)
);

-- Create brand_deals table
CREATE TABLE IF NOT EXISTS brand_deals (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    brand_name VARCHAR(255) NOT NULL,
    campaign_name VARCHAR(255) NOT NULL,
    deal_date DATE,
    testimonial TEXT,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    logo_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE creator_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE brand_deals ENABLE ROW LEVEL SECURITY;

-- Policies for creator_stats
CREATE POLICY "Public stats are viewable by everyone" ON creator_stats
    FOR SELECT USING (true);

CREATE POLICY "Users can insert their own stats" ON creator_stats
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Policies for brand_deals
CREATE POLICY "Public deals are viewable by everyone" ON brand_deals
    FOR SELECT USING (true);

CREATE POLICY "Users can manage their own deals" ON brand_deals
    FOR ALL USING (auth.uid() = user_id);
