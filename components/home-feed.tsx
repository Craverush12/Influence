'use client'

import Link from 'next/link'
import { Sparkles, Search, ArrowRight, Star, MapPin, MessageSquare, Briefcase, TrendingUp, Zap } from 'lucide-react'
import KarmaBalance from './karma-balance'

interface HomeFeedProps {
    user: any
    creators: any[]
    jobs: any[]
}

export default function HomeFeed({ user, creators, jobs }: HomeFeedProps) {
    return (
        <div className="min-h-screen hero-gradient relative overflow-hidden">
            {/* Minimal Background Elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/3 rounded-full blur-3xl"></div>
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
                        <Link href="/dashboard" className="btn-secondary text-sm">
                            Dashboard
                        </Link>
                        <Link href="/profile/setup" className="w-10 h-10 rounded-full bg-white/10 overflow-hidden border border-white/20">
                            {user.profile_image_url ? (
                                <img src={user.profile_image_url} alt="Profile" className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-white font-bold">
                                    {user.display_name?.[0] || user.email?.[0]}
                                </div>
                            )}
                        </Link>
                    </div>
                </div>
            </nav>

            <div className="max-w-7xl mx-auto px-6 py-12 relative z-10">
                {/* Welcome Header */}
                <div className="mb-12 fade-in">
                    <h1 className="text-4xl md:text-6xl font-black mb-3">
                        <span className="text-white">Hello,</span>{' '}
                        <span className="gradient-text">{user.display_name || 'Creator'}</span>
                    </h1>
                    <p className="text-xl text-white/60">Here's what's happening in the community today.</p>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
                    {[
                        { label: 'Find Creators', icon: Search, href: '/explore', color: 'text-blue-400' },
                        { label: 'Post a Job', icon: Briefcase, href: '/jobs/new', color: 'text-green-400' },
                        { label: 'Messages', icon: MessageSquare, href: '/messages', color: 'text-purple-400' },
                        { label: 'Trending', icon: TrendingUp, href: '/explore?sort=trending', color: 'text-orange-400' },
                    ].map((action, i) => {
                        const Icon = action.icon
                        return (
                            <Link
                                key={i}
                                href={action.href}
                                className="glass-card p-6 hover:scale-105 transition-all group flex flex-col items-center justify-center gap-3 text-center"
                            >
                                <div className={`w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors`}>
                                    <Icon className={`w-6 h-6 ${action.color}`} />
                                </div>
                                <span className="font-semibold text-white">{action.label}</span>
                            </Link>
                        )
                    })}
                </div>

                {/* Trending Creators */}
                <section className="mb-16">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                            <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
                            Trending Creators
                        </h2>
                        <Link href="/explore" className="text-white/60 hover:text-white flex items-center gap-1 text-sm">
                            View All <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {creators.map((creator, i) => (
                            <Link
                                key={creator.id}
                                href={`/creator/${creator.id}`}
                                className="glass-card p-6 hover:scale-[1.02] transition-all group"
                            >
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-16 h-16 rounded-full bg-white/10 overflow-hidden border-2 border-transparent group-hover:border-white/20 transition-colors">
                                        {creator.profile_image_url ? (
                                            <img src={creator.profile_image_url} alt={creator.display_name} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-xl font-bold text-white">
                                                {(creator.display_name || creator.username)?.[0]}
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-white group-hover:text-blue-400 transition-colors">
                                            {creator.display_name || creator.username}
                                        </h3>
                                        <p className="text-sm text-white/50">@{creator.username}</p>
                                        {creator.location && (
                                            <div className="flex items-center gap-1 text-xs text-white/40 mt-1">
                                                <MapPin className="w-3 h-3" />
                                                {creator.location}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <p className="text-sm text-white/70 line-clamp-2 mb-4">{creator.bio || 'No bio yet.'}</p>
                                <div className="flex gap-2">
                                    <span className="px-2 py-1 rounded-md bg-white/5 text-xs text-white/60">Video Editor</span>
                                    <span className="px-2 py-1 rounded-md bg-white/5 text-xs text-white/60">Content</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>

                {/* Recent Jobs */}
                <section>
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                            <Briefcase className="w-6 h-6 text-green-400" />
                            Recent Opportunities
                        </h2>
                        <Link href="/jobs" className="text-white/60 hover:text-white flex items-center gap-1 text-sm">
                            View All <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {jobs.map((job, i) => (
                            <Link
                                key={job.id}
                                href={`/jobs/${job.id}`}
                                className="glass-card p-6 hover:border-white/20 transition-all group"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="text-lg font-bold text-white group-hover:text-green-400 transition-colors mb-1">
                                            {job.title}
                                        </h3>
                                        <p className="text-sm text-white/50">
                                            Posted by <span className="text-white/70">{job.creator?.display_name || 'Unknown'}</span>
                                        </p>
                                    </div>
                                    <span className="px-3 py-1 rounded-full bg-green-500/10 text-green-400 text-xs font-bold border border-green-500/20">
                                        ${job.budget_min} - ${job.budget_max}
                                    </span>
                                </div>
                                <p className="text-white/70 text-sm line-clamp-2 mb-4">
                                    {job.description}
                                </p>
                                <div className="flex items-center justify-between text-xs text-white/40">
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
