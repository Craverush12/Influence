import { createClient } from '@/lib/supabase/server'
import CreatorsGrid from './creators-grid'
import { redirect } from 'next/navigation'
import { getCurrentUser } from '@/lib/auth-service'
import { AppLayout } from '@/components/layout/app-layout'
import { Breadcrumbs } from '@/components/navigation/breadcrumbs'

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
    <AppLayout user={user}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 relative z-10">
        <Breadcrumbs items={[{ label: 'Explore' }]} className="mb-6" />
        <CreatorsGrid initialCreators={creators || []} />
      </div>
    </AppLayout>
  )
}
