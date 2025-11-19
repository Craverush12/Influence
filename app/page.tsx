import { createClient } from '@/lib/supabase/server'
import { getCurrentUser } from '@/lib/auth-service'
import LandingPage from '@/components/landing-page'
import HomeFeed from '@/components/home-feed'

export default async function Home() {
  const user = await getCurrentUser()

  if (!user) {
    return <LandingPage />
  }

  const supabase = await createClient()

  // Fetch Trending Creators (random 3 for now, or simple limit)
  const { data: creators } = await supabase
    .from('users')
    .select('*')
    .neq('id', user.id) // Don't show self
    .limit(3)

  // Fetch Recent Jobs
  const { data: jobs } = await supabase
    .from('creator_jobs')
    .select(`
      *,
      creator:users(display_name)
    `)
    .eq('status', 'open')
    .order('created_at', { ascending: false })
    .limit(4)

  return <HomeFeed user={user} creators={creators || []} jobs={jobs || []} />
}
