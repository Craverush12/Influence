import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { getCurrentUser } from '@/lib/auth-service'
import Link from 'next/link'
import {
  LayoutDashboard,
  Users,
  MessageSquare,
  Briefcase,
  Settings,
  LogOut,
  Bell,
  Search,
  TrendingUp,
  Star,
  Zap,
  Sparkles,
  ArrowRight
} from 'lucide-react'
import { logout } from '@/app/actions/auth'
import KarmaBalance from '@/components/karma-balance'

export default async function DashboardPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect('/auth/login')
  }

  const supabase = await createClient()

  // Fetch user profile details including role
  const { data: userProfile } = await supabase
    .from('users')
    .select('*, user_roles(role)')
    .eq('id', user.id)
    .single()

  const userRole = userProfile?.user_roles?.[0]?.role || 'creator'

  const stats = {
    connections: 125,
    messages: 3,
    rating: 4.9
  }

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

          <div className="flex items-center gap-4">
            <KarmaBalance />
            <Link href="/profile/setup" className="btn-secondary text-sm">
              Edit Profile
            </Link>
            <Link
              href="/explore"
              className="flex items-center gap-2 px-4 py-2 text-white/70 hover:text-white transition-colors rounded-lg hover:bg-white/5"
            >
              <Search className="w-5 h-5" />
              <span className="hidden md:inline">Explore</span>
            </Link>
            <Link
              href="/messages"
              className="flex items-center gap-2 px-4 py-2 text-white/70 hover:text-white transition-colors rounded-lg hover:bg-white/5"
            >
              <MessageSquare className="w-5 h-5" />
              <span className="hidden md:inline">Messages</span>
            </Link>
            <form action={logout}>
              <button
                type="submit"
                className="flex items-center gap-2 px-4 py-2 text-white/70 hover:text-red-400 transition-colors rounded-lg hover:bg-white/5"
              >
                <LogOut className="w-5 h-5" />
                <span className="hidden md:inline">Logout</span>
              </button>
            </form>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12 relative z-10">
        {/* Welcome Section */}
        <div className="mb-12 fade-in">
          <h1 className="text-4xl md:text-6xl font-black mb-3">
            <span className="text-white">Welcome back,</span>{' '}
            <span className="gradient-text">{userProfile?.display_name || user.email}</span>
          </h1>
          <p className="text-xl text-white/60">Ready to create something amazing today?</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            {
              icon: Users,
              value: stats.connections,
              label: 'Connections',
              sublabel: 'Collaborators found',
              gradient: 'from-white/20 to-white/10',
              delay: '0.1s'
            },
            {
              icon: MessageSquare,
              value: stats.messages,
              label: 'Messages',
              sublabel: 'Unread messages',
              gradient: 'from-white/20 to-white/10',
              delay: '0.2s'
            },
            {
              icon: Star,
              value: stats.rating,
              label: 'Rating',
              sublabel: 'Community score',
              gradient: 'from-white/20 to-white/10',
              delay: '0.3s'
            },
          ].map((stat, i) => {
            const Icon = stat.icon
            return (
              <div
                key={i}
                className="glass-card p-6 stagger-item group hover:scale-105 transition-all duration-300"
                style={{ animationDelay: stat.delay }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="text-right">
                    <div className={`text-3xl font-black bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>
                      {stat.value}
                    </div>
                  </div>
                </div>
                <h3 className="text-white font-bold mb-1">{stat.label}</h3>
                <p className="text-sm text-white/50">{stat.sublabel}</p>
              </div>
            )
          })}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              href: '/explore',
              icon: Search,
              title: 'Discover Creators',
              desc: 'Find talented collaborators and professionals',
              gradient: 'from-white/20 to-white/10',
              delay: '0.4s'
            },
            {
              href: '/messages',
              icon: MessageSquare,
              title: 'Messages',
              desc: 'Chat with your collaborators',
              gradient: 'from-white/20 to-white/10',
              delay: '0.5s'
            },
            {
              href: '/profile/setup',
              icon: Users,
              title: 'My Profile',
              desc: 'View and edit your creator profile',
              gradient: 'from-white/20 to-white/10',
              delay: '0.6s'
            },
            {
              href: '/profile/socials',
              icon: Sparkles,
              title: 'Connect Socials',
              desc: 'Link your Instagram, TikTok, YouTube & more',
              gradient: 'from-white/20 via-white/10 to-white/20',
              delay: '0.7s'
            },
            {
              href: '/settings',
              icon: Settings,
              title: 'Settings',
              desc: 'Manage your account preferences',
              gradient: 'from-white/20 via-white/10 to-white/20',
              delay: '0.7s'
            },
          ].map((action, i) => {
            const Icon = action.icon
            return (
              <Link
                key={i}
                href={action.href}
                className="floating-card p-8 stagger-item group cursor-pointer"
                style={{ animationDelay: action.delay }}
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${action.gradient} flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{action.title}</h3>
                <p className="text-white/60 mb-4">{action.desc}</p>
                <div className="flex items-center gap-2 text-sm font-semibold text-white/70 group-hover:text-white transition-colors">
                  <span>Explore</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
