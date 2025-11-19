import { createClient } from '@/lib/supabase/server'
import { getCurrentUser } from '@/lib/auth-service'
import CreatorProfileClient from './creator-profile-client'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default async function CreatorProfilePage({ params }: { params: { id: string } }) {
  const user = await getCurrentUser()
  const supabase = await createClient()

  const { data: creator } = await supabase
    .from('users')
    .select('*')
    .eq('id', params.id)
    .single()

  if (!creator) {
    return (
      <div className="min-h-screen hero-gradient flex items-center justify-center px-4">
        <div className="text-center glass-card p-8">
          <p className="text-white/60 mb-6 text-lg">Creator not found</p>
          <Link href="/explore" className="btn-primary inline-flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Explore
          </Link>
        </div>
      </div>
    )
  }

  const { data: socials } = await supabase
    .from('user_socials')
    .select('*')
    .eq('user_id', creator.id)

  return (
    <CreatorProfileClient
      creator={creator}
      socials={socials || []}
      currentUser={user}
    />
  )
}
