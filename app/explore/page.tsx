import { createClient } from '@/lib/supabase/server'
import { Sparkles } from 'lucide-react'
import Link from 'next/link'
import CreatorsGrid from './creators-grid'
import { redirect } from 'next/navigation'
import { getCurrentUser } from '@/lib/auth-service'

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
    <div className="min-h-screen hero-gradient relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/2 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/2 rounded-full blur-3xl"></div>
      </div>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 nav-glass">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold gradient-text">Creator Hub</span>
          </Link>
          <Link
            href="/dashboard"
            className="px-4 py-2 text-white/70 hover:text-white transition-colors rounded-lg hover:bg-white/5"
          >
            Dashboard
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12 relative z-10">
        <CreatorsGrid initialCreators={creators || []} />
      </div>
    </div>
  )
}
