-- Create transactions table
CREATE TABLE IF NOT EXISTS transactions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  amount INTEGER NOT NULL, -- Positive for deposit/receive, negative for spend/send
  type TEXT NOT NULL CHECK (type IN ('deposit', 'tip', 'withdrawal', 'job_payment')),
  description TEXT,
  recipient_id UUID REFERENCES auth.users(id) ON DELETE SET NULL, -- For tips/transfers
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can view their own transactions"
  ON transactions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own transactions"
  ON transactions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create a view for user balances
CREATE OR REPLACE VIEW user_balances AS
SELECT 
  user_id,
  SUM(amount) as balance
FROM transactions
GROUP BY user_id;
