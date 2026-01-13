'use client'

import Link from 'next/link'
import { Sparkles, Search, ArrowRight, Star, MapPin, MessageSquare, Briefcase, TrendingUp } from 'lucide-react'
import KarmaBalance from './karma-balance'
import { ThemeToggle } from '@/components/theme-toggle'
import { ProfileCompletionCard } from './profile-completion-card'
import { VariableRewards } from './variable-rewards'

interface HomeFeedProps {
    user: any
    creators: any[]
    jobs: any[]
}

export default function HomeFeed({ user, creators, jobs }: HomeFeedProps) {
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
                        <Link href="/dashboard" className="btn-secondary text-sm py-2 px-4 h-auto">
                            Dashboard
                        </Link>
                        <Link href="/dashboard" className="w-9 h-9 rounded-full bg-muted overflow-hidden border border-border">
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

            <div className="max-w-7xl mx-auto px-6 py-12">
                {/* Welcome Header */}
                <div className="mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <h1 className="text-4xl md:text-6xl font-display font-extrabold mb-3 tracking-tight">
                        Hello, <span className="text-gradient-aurora">{user.display_name || 'Creator'}</span>
                    </h1>
                    <p className="text-lg text-muted-foreground">Here's what's happening in the community today.</p>
                </div>

                {/* Profile Completion - Zeigarnik Effect */}
                <div className="mb-8">
                    <ProfileCompletionCard />
                </div>

                {/* Variable Rewards - Recommendations */}
                <div className="mb-8">
                    <VariableRewards />
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
                    {[
                        { label: 'Find Creators', icon: Search, href: '/explore', color: 'text-blue-500' },
                        { label: 'Post a Job', icon: Briefcase, href: '/jobs/new', color: 'text-green-500' },
                        { label: 'Messages', icon: MessageSquare, href: '/messages', color: 'text-purple-500' },
                        { label: 'Trending', icon: TrendingUp, href: '/explore?sort=trending', color: 'text-orange-500' },
                    ].map((action, i) => {
                        const Icon = action.icon
                        return (
                            <Link
                                key={i}
                                href={action.href}
                                className="glass-card p-6 hover:scale-[1.02] transition-all group flex flex-col items-center justify-center gap-3 text-center bg-card hover:bg-accent/50 hover:border-primary/20"
                            >
                                <div className={`w-12 h-12 rounded-full bg-muted flex items-center justify-center group-hover:bg-background transition-colors`}>
                                    <Icon className={`w-6 h-6 ${action.color}`} />
                                </div>
                                <span className="font-semibold">{action.label}</span>
                            </Link>
                        )
                    })}
                </div>

                {/* Trending Creators */}
                <section className="mb-16">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold flex items-center gap-2 tracking-tight">
                            <Star className="w-5 h-5 fill-primary text-primary" />
                            Trending Creators
                        </h2>
                        <Link href="/explore" className="text-muted-foreground hover:text-foreground flex items-center gap-1 text-sm font-medium transition-colors">
                            View All <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {creators.map((creator, i) => (
                            <Link
                                key={creator.id}
                                href={`/creator/${creator.id}`}
                                className="glass-card p-6 hover:scale-[1.02] transition-all group bg-card hover:border-primary/20"
                            >
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-14 h-14 rounded-full bg-muted overflow-hidden border border-border group-hover:border-primary/50 transition-colors">
                                        {creator.profile_image_url ? (
                                            <img src={creator.profile_image_url} alt={creator.display_name} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-lg font-bold text-muted-foreground">
                                                {(creator.display_name || creator.username)?.[0]}
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <h3 className="font-bold group-hover:text-primary transition-colors">
                                            {creator.display_name || creator.username}
                                        </h3>
                                        <p className="text-sm text-muted-foreground">@{creator.username}</p>
                                        {creator.location && (
                                            <div className="flex items-center gap-1 text-xs text-muted-foreground/80 mt-1">
                                                <MapPin className="w-3 h-3" />
                                                {creator.location}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{creator.bio || 'No bio yet.'}</p>
                                <div className="flex gap-2">
                                    <span className="px-2 py-1 rounded-md bg-muted text-xs font-medium text-muted-foreground">Video Editor</span>
                                    <span className="px-2 py-1 rounded-md bg-muted text-xs font-medium text-muted-foreground">Content</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>

                {/* Recent Jobs */}
                <section>
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold flex items-center gap-2 tracking-tight">
                            <Briefcase className="w-5 h-5 text-primary" />
                            Recent Opportunities
                        </h2>
                        <Link href="/jobs" className="text-muted-foreground hover:text-foreground flex items-center gap-1 text-sm font-medium transition-colors">
                            View All <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {jobs.map((job, i) => (
                            <Link
                                key={job.id}
                                href={`/jobs/${job.id}`}
                                className="glass-card p-6 hover:border-primary/20 transition-all group bg-card"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="text-lg font-bold group-hover:text-primary transition-colors mb-1">
                                            {job.title}
                                        </h3>
                                        <p className="text-sm text-muted-foreground">
                                            Posted by <span className="text-foreground font-medium">{job.creator?.display_name || 'Unknown'}</span>
                                        </p>
                                    </div>
                                    <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold border border-primary/20">
                                        ${job.budget_min} - ${job.budget_max}
                                    </span>
                                </div>
                                <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                                    {job.description}
                                </p>
                                <div className="flex items-center justify-between text-xs text-muted-foreground/80">
                                    <span>{job.timeline || 'Flexible timeline'}</span>
                                    <span>{new Date(job.created_at).toLocaleDateString()}</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    )
}
