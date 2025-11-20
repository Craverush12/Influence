import { createClient } from '@/lib/supabase/server'
import { Sparkles } from 'lucide-react'
import Link from 'next/link'
import CreatorsGrid from './creators-grid'
import { redirect } from 'next/navigation'
import { getCurrentUser } from '@/lib/auth-service'
import KarmaBalance from '@/components/karma-balance'
import { ThemeToggle } from '@/components/theme-toggle'

export default async function ExplorePage({
  searchParams,
}: {
  searchParams: { q?: string; location?: string }
}) {
  const user = await getCurrentUser()

  if (!user) {
    redirect('/auth/login')
  }

  const supabase = await createClient()
  const query = searchParams?.q || ''
  const location = searchParams?.location || ''

  let dbQuery = supabase
    .from('users')
    .select('*')
    .limit(50)

  if (query) {
    dbQuery = dbQuery.or(`display_name.ilike.%${query}%,username.ilike.%${query}%,bio.ilike.%${query}%`)
  }

  if (location) {
    dbQuery = dbQuery.ilike('location', `%${location}%`)
  }

  const { data: creators } = await dbQuery

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-primary" />
            </div>
            <span className="text-lg font-bold tracking-tight">Creator Hub</span>
          </Link>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            <KarmaBalance />
            <Link
              href="/dashboard"
              className="btn-secondary text-sm py-2 px-4 h-auto"
            >
              Dashboard
            </Link>
            <Link href="/profile/setup" className="w-9 h-9 rounded-full bg-muted overflow-hidden border border-border">
              {user.profile_image_url ? (
                <img src={user.profile_image_url} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground font-bold text-sm">
                  {user.display_name?.[0] || user.email?.[0]}
                </div>
              )}
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12 relative z-10">
        <CreatorsGrid initialCreators={creators || []} />
      </div>
    </div>
  )
}
