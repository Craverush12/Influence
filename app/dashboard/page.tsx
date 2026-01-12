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
import { ThemeToggle } from '@/components/theme-toggle'
import { ProfileCompletionCard } from '@/components/profile-completion-card'
import { DashboardGamification } from '@/components/dashboard-gamification'
import { VariableRewards } from '@/components/variable-rewards'

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
            <Link href="/profile/setup" className="btn-secondary text-sm py-2 px-4 h-auto">
              Edit Profile
            </Link>
            <Link
              href="/explore"
              className="flex items-center gap-2 px-4 py-2 text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted"
            >
              <Search className="w-5 h-5" />
              <span className="hidden md:inline">Explore</span>
            </Link>
            <Link
              href="/messages"
              className="flex items-center gap-2 px-4 py-2 text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted"
            >
              <MessageSquare className="w-5 h-5" />
              <span className="hidden md:inline">Messages</span>
            </Link>
            <form action={logout}>
              <button
                type="submit"
                className="flex items-center gap-2 px-4 py-2 text-muted-foreground hover:text-destructive transition-colors rounded-lg hover:bg-muted"
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
        <div className="mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <h1 className="text-4xl md:text-6xl font-display font-extrabold mb-3 tracking-tight">
            Welcome back, <span className="text-gradient-aurora">{userProfile?.display_name || user.email}</span>
          </h1>
          <p className="text-lg text-muted-foreground">Ready to create something amazing today?</p>
        </div>

        {/* Profile Completion - Zeigarnik Effect */}
        <div className="mb-8">
          <ProfileCompletionCard />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            {
              icon: Users,
              value: stats.connections,
              label: 'Connections',
              sublabel: 'Collaborators found',
              color: 'text-blue-500',
              bg: 'bg-blue-500/10',
            },
            {
              icon: MessageSquare,
              value: stats.messages,
              label: 'Messages',
              sublabel: 'Unread messages',
              color: 'text-purple-500',
              bg: 'bg-purple-500/10',
            },
            {
              icon: Star,
              value: stats.rating,
              label: 'Rating',
              sublabel: 'Community score',
              color: 'text-yellow-500',
              bg: 'bg-yellow-500/10',
            },
          ].map((stat, i) => {
            const Icon = stat.icon
            return (
              <div
                key={i}
                className="glass-card p-6 hover:scale-[1.02] transition-all duration-300 bg-card border-border"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl ${stat.bg} flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-foreground">
                      {stat.value}
                    </div>
                  </div>
                </div>
                <h3 className="font-bold text-foreground mb-1">{stat.label}</h3>
                <p className="text-sm text-muted-foreground">{stat.sublabel}</p>
              </div>
            )
          })}
        </div>

        {/* Gamification Section */}
        <div className="mb-8">
          <DashboardGamification />
        </div>

        {/* Variable Rewards - Recommendations */}
        <div className="mb-8">
          <VariableRewards />
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {[
            {
              href: '/explore',
              icon: Search,
              title: 'Discover Creators',
              desc: 'Find talented collaborators and professionals',
              color: 'text-blue-500',
              bg: 'bg-blue-500/10',
            },
            {
              href: '/messages',
              icon: MessageSquare,
              title: 'Messages',
              desc: 'Chat with your collaborators',
              color: 'text-purple-500',
              bg: 'bg-purple-500/10',
            },
            {
              href: '/profile/setup',
              icon: Users,
              title: 'My Profile',
              desc: 'View and edit your creator profile',
              color: 'text-green-500',
              bg: 'bg-green-500/10',
            },
            {
              href: '/profile/socials',
              icon: Sparkles,
              title: 'Connect Socials',
              desc: 'Link your Instagram, TikTok, YouTube & more',
              color: 'text-pink-500',
              bg: 'bg-pink-500/10',
            },
            {
              href: '/settings',
              icon: Settings,
              title: 'Settings',
              desc: 'Manage your account preferences',
              color: 'text-gray-500',
              bg: 'bg-gray-500/10',
            },
          ].map((action, i) => {
            const Icon = action.icon
            return (
              <Link
                key={i}
                href={action.href}
                className="glass-card p-8 hover:scale-[1.01] transition-all group cursor-pointer bg-card border-border hover:border-primary/20"
              >
                <div className={`w-14 h-14 rounded-2xl ${action.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`w-7 h-7 ${action.color}`} />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{action.title}</h3>
                <p className="text-muted-foreground mb-4">{action.desc}</p>
                <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground group-hover:text-foreground transition-colors">
                  <span>Open</span>
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
