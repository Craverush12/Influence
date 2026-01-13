import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { getCurrentUser } from '@/lib/auth-service'
import Link from 'next/link'
import {
  DollarSign,
  Briefcase,
  Eye,
  Users,
  MessageSquare,
  Search,
  Plus,
  Star,
  Sparkles,
  Settings,
  LogOut,
  TrendingUp
} from 'lucide-react'
import { StatsCards } from '@/components/dashboard/stats-cards'
import { QuickActions } from '@/components/dashboard/quick-actions'
import { ActivityFeed } from '@/components/dashboard/activity-feed'
import { TopOpportunity } from '@/components/dashboard/top-opportunity'
import { EarningsChart } from '@/components/dashboard/earnings-chart'
import { ResponsiveGrid } from '@/components/responsive-grid'
import CreatorCardPremium from '@/components/creator-card-premium'
import { AppLayout } from '@/components/layout/app-layout'
import { Breadcrumbs } from '@/components/navigation/breadcrumbs'

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

  // Fetch recommended creators
  const { data: recommendedCreators } = await supabase
    .from('users')
    .select('*')
    .neq('id', user.id)
    .limit(3)

  // Fetch top opportunity (latest open job)
  const { data: topOpportunityData } = await supabase
    .from('creator_jobs')
    .select(`
      *,
      creator:users(display_name)
    `)
    .eq('status', 'open')
    .order('created_at', { ascending: false })
    .limit(1)
    .single()

  // Stats data
  const stats = [
    {
      label: 'Earned This Month',
      value: '$2,847',
      change: '+23% vs last month',
      changeType: 'increase' as const,
      icon: DollarSign,
      iconColor: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      label: 'Active Opportunities',
      value: 12,
      change: '3 new today',
      changeType: 'increase' as const,
      icon: Briefcase,
      iconColor: 'text-accent',
      bgColor: 'bg-accent/10'
    },
    {
      label: 'Profile Views',
      value: 847,
      change: '+15% this week',
      changeType: 'increase' as const,
      icon: Eye,
      iconColor: 'text-blue-500',
      bgColor: 'bg-blue-500/10'
    },
    {
      label: 'New Connections',
      value: 8,
      change: '5 pending',
      changeType: 'increase' as const,
      icon: Users,
      iconColor: 'text-purple-500',
      bgColor: 'bg-purple-500/10'
    }
  ]

  // Quick actions
  const quickActions = [
    { label: 'Post a Job', icon: Plus, href: '/jobs/new', variant: 'primary' as const },
    { label: 'Find Creators', icon: Search, href: '/explore', variant: 'secondary' as const },
    { label: 'Messages', icon: MessageSquare, href: '/messages', variant: 'secondary' as const }
  ]

  // Recent activity
  const recentActivity = [
    { icon: DollarSign, text: 'Payment received: $500', time: '2h ago', color: 'text-green-500' },
    { icon: MessageSquare, text: 'New message from Sarah', time: '4h ago', color: 'text-blue-500' },
    { icon: Star, text: 'New 5-star review', time: '1d ago', color: 'text-yellow-500' },
    { icon: Users, text: 'New connection request', time: '2d ago', color: 'text-purple-500' }
  ]

  // Earnings data (mock data for now)
  const earningsData = [
    { day: 'Mon', amount: 320 },
    { day: 'Tue', amount: 520 },
    { day: 'Wed', amount: 360 },
    { day: 'Thu', amount: 640 },
    { day: 'Fri', amount: 560 },
    { day: 'Sat', amount: 680 },
    { day: 'Sun', amount: 480 }
  ]
  const totalEarnings = earningsData.reduce((sum, d) => sum + d.amount, 0)

  // Transform top opportunity data
  const topOpportunity = topOpportunityData ? {
    id: topOpportunityData.id,
    title: topOpportunityData.title,
    description: topOpportunityData.description || 'No description provided',
    budget: topOpportunityData.budget || 0,
    tags: topOpportunityData.required_skills || [],
    postedAt: new Date(topOpportunityData.created_at).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }),
    applicants: Math.floor(Math.random() * 10) + 1, // Mock data
    location: 'Remote' // Mock data
  } : null

  return (
    <AppLayout user={userProfile}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 relative z-10">
        {/* Breadcrumbs */}
        <Breadcrumbs 
          items={[{ label: 'Dashboard' }]} 
          className="mb-6"
        />
        {/* Welcome Section */}
        <div className="mb-8 sm:mb-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold mb-2 sm:mb-3 tracking-tight">
            Welcome back, <span className="text-gradient-aurora">{userProfile?.display_name || 'Creator'}</span>
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground">Your opportunity command center</p>
        </div>

        {/* Stats Grid */}
        <div className="mb-8 sm:mb-12">
          <StatsCards stats={stats} />
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 auto-rows-[280px] mb-8 sm:mb-12">
          {/* Top Opportunity - Takes 2 columns and 2 rows on large screens */}
          <TopOpportunity opportunity={topOpportunity} />

          {/* Quick Actions */}
          <QuickActions actions={quickActions} />

          {/* Activity Feed */}
          <ActivityFeed activities={recentActivity} />

          {/* Earnings Chart - Takes 2 columns on large screens */}
          <EarningsChart data={earningsData} total={totalEarnings} />
        </div>

        {/* Recommended Creators Section */}
        {recommendedCreators && recommendedCreators.length > 0 && (
          <section className="mt-12">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-2">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold">Recommended For You</h2>
                <p className="text-sm sm:text-base text-muted-foreground">Creators you might want to collaborate with</p>
              </div>
              <Link href="/explore" className="text-primary hover:underline flex items-center gap-1 text-sm sm:text-base">
                View All <TrendingUp className="w-4 h-4" />
              </Link>
            </div>

            <ResponsiveGrid minWidth={280} gap={6}>
              {recommendedCreators.map(creator => (
                <CreatorCardPremium key={creator.id} creator={creator} />
              ))}
            </ResponsiveGrid>
          </section>
        )}
      </div>
    </AppLayout>
  )
}
