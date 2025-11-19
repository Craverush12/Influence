import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { getCurrentUser } from '@/lib/auth-service'
import Link from 'next/link'
import { Sparkles, ArrowRight } from 'lucide-react'
import SocialsList from './socials-list'

export default async function SocialsPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect('/auth/login')
  }

  const supabase = await createClient()

  const { data: socials } = await supabase
    .from('user_socials')
    .select('*')
    .eq('user_id', user.id)

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
            <span className="text-xl font-bold gradient-text hidden sm:inline">Creator Hub</span>
          </Link>
          <Link href="/dashboard" className="text-white/70 hover:text-white transition-colors text-sm md:text-base">
            Back to Dashboard
          </Link>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 relative z-10">
        {/* Header */}
        <div className="mb-12 fade-in">
          <h1 className="text-4xl md:text-5xl font-black mb-4 gradient-text">
            Connect Your Socials
          </h1>
          <p className="text-lg md:text-xl text-white/60">
            Link your social media accounts to showcase your reach and connect with collaborators
          </p>
        </div>

        <SocialsList initialSocials={socials || []} />
      </div>
    </div>
  )
}
