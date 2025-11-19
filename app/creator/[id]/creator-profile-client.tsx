'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { MessageSquare, ExternalLink, MapPin, Globe, Sparkles, ArrowLeft, Heart, Share2, Star, Users, TrendingUp, Instagram, Twitter, Youtube, Twitch, Music } from 'lucide-react'
import Link from 'next/link'
import { SocialEmbed } from '@/components/social-embed'
import TipButton from '@/components/tip-button'

interface CreatorProfileClientProps {
    creator: any
    socials: any[]
    currentUser: any
}

export default function CreatorProfileClient({ creator, socials, currentUser }: CreatorProfileClientProps) {
    const router = useRouter()
    const [liked, setLiked] = useState(false)

    const handleMessageClick = () => {
        if (!currentUser) {
            router.push('/auth/login')
            return
        }
        // Navigate to messages with user parameter - the messages page will handle creating the conversation
        router.push(`/messages?user=${creator.id}`)
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
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <Link href="/" className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center">
                                <Sparkles className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-lg md:text-xl font-bold gradient-text hidden sm:inline">Creator Hub</span>
                        </Link>
                        <Link href="/explore" className="text-white/70 hover:text-white transition-colors text-sm md:text-base flex items-center gap-2">
                            <ArrowLeft className="w-4 h-4" />
                            <span className="hidden sm:inline">Back to Explore</span>
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Profile */}
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 relative z-10">
                {/* Cover Image */}
                {creator.cover_image_url && (
                    <div className="w-full h-48 md:h-64 rounded-2xl overflow-hidden mb-6 md:mb-12 relative group">
                        <img
                            src={creator.cover_image_url || "/placeholder.svg"}
                            alt="cover"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    </div>
                )}

                {/* Profile Info Card */}
                <div className="glass-card p-6 md:p-10 mb-8 fade-in">
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-8">
                        <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4 md:gap-6 mb-6 md:mb-0">
                            {/* Profile Avatar */}
                            <div className="relative -mt-16 md:-mt-20">
                                <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-white/10 border-4 border-black shadow-xl overflow-hidden">
                                    {creator.profile_image_url ? (
                                        <img
                                            src={creator.profile_image_url || "/placeholder.svg"}
                                            alt={creator.display_name}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-white/10 flex items-center justify-center text-white font-light text-2xl md:text-3xl">
                                            {(creator.display_name || creator.username)?.[0]?.toUpperCase()}
                                        </div>
                                    )}
                                </div>
                                <div className="absolute -bottom-1 -right-1 w-6 h-6 md:w-8 md:h-8 bg-green-500 rounded-full border-4 border-black"></div>
                            </div>

                            {/* Name and Info */}
                            <div className="flex-1">
                                <h1 className="text-3xl md:text-5xl font-black text-white mb-2">
                                    {creator.display_name || creator.username}
                                </h1>
                                <p className="text-lg md:text-xl text-white/60 mb-4">@{creator.username}</p>

                                {/* Quick Stats */}
                                <div className="flex flex-wrap gap-4 md:gap-6">
                                    <div className="flex items-center gap-2">
                                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                        <span className="text-white/80 font-semibold">4.9</span>
                                        <span className="text-white/50 text-sm">(128 reviews)</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Users className="w-4 h-4 text-white/60" />
                                        <span className="text-white/80 font-semibold">2.5K</span>
                                        <span className="text-white/50 text-sm">followers</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <TrendingUp className="w-4 h-4 text-green-400" />
                                        <span className="text-white/80 font-semibold">98%</span>
                                        <span className="text-white/50 text-sm">on-time</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {creator.website && (
                            <a
                                href={creator.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all group mt-6"
                            >
                                <div className="w-10 h-10 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center">
                                    <Globe className="w-5 h-5 text-white" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-xs text-white/50 mb-1">Website</p>
                                    <p className="text-white font-semibold group-hover:text-white/80 transition-colors">Visit Site</p>
                                </div>
                                <ExternalLink className="w-4 h-4 text-white/40 group-hover:text-white transition-colors" />
                            </a>
                        )}
                    </div>

                    {/* Social Links - Quick Access */}
                    {socials.length > 0 && (
                        <div className="pt-6 border-t border-white/10">
                            <h3 className="text-lg md:text-xl font-bold text-white mb-4">Connect</h3>
                            <div className="flex flex-wrap gap-3">
                                {socials.map((social) => {
                                    const getPlatformIcon = (platform: string) => {
                                        switch (platform.toLowerCase()) {
                                            case 'instagram': return Instagram
                                            case 'twitter': return Twitter
                                            case 'youtube': return Youtube
                                            case 'twitch': return Twitch
                                            case 'tiktok': return Music
                                            default: return ExternalLink
                                        }
                                    }
                                    const Icon = getPlatformIcon(social.platform)
                                    const getGradient = (platform: string) => {
                                        switch (platform.toLowerCase()) {
                                            case 'instagram': return 'from-white/20 to-white/10'
                                            case 'twitter': return 'from-white/20 to-white/10'
                                            case 'youtube': return 'from-white/20 to-white/10'
                                            case 'twitch': return 'from-white/20 to-white/10'
                                            case 'tiktok': return 'from-white/20 to-white/10'
                                            default: return 'from-white/20 to-white/10'
                                        }
                                    }
                                    return (
                                        <a
                                            key={social.id}
                                            href={social.url || `https://${social.platform}.com/${social.handle}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="glass-card px-4 py-3 rounded-xl hover:scale-105 transition-all inline-flex items-center gap-3 group"
                                        >
                                            <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${getGradient(social.platform)} flex items-center justify-center`}>
                                                <Icon className="w-4 h-4 text-white" />
                                            </div>
                                            <div>
                                                <p className="text-white/80 group-hover:text-white font-semibold text-sm capitalize">{social.platform}</p>
                                                <p className="text-white/50 text-xs">@{social.handle}</p>
                                            </div>
                                            <ExternalLink className="w-4 h-4 text-white/40 group-hover:text-white transition-colors ml-2" />
                                        </a>
                                    )
                                })}
                            </div>
                        </div>
                    )}
                </div>

                {/* Social Media Feeds */}
                {socials.length > 0 && (
                    <div className="mb-8 fade-in">
                        <h2 className="text-3xl md:text-4xl font-black text-white mb-2">
                            <span className="gradient-text">Social</span> <span className="text-white">Presence</span>
                        </h2>
                        <p className="text-white/60 mb-6">Check out their latest content across platforms</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {socials.map((social) => (
                                <SocialEmbed
                                    key={social.id}
                                    platform={social.platform}
                                    handle={social.handle}
                                    url={social.url}
                                />
                            ))}
                        </div>
                    </div>
                )}

                {/* Additional Sections */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {/* Portfolio Preview */}
                    <div className="glass-card p-6 md:p-8">
                        <h2 className="text-2xl font-black text-white mb-6">Portfolio</h2>
                        <div className="grid grid-cols-2 gap-3">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="aspect-square rounded-xl bg-white/5 overflow-hidden group cursor-pointer">
                                    <div className="w-full h-full bg-white/5 group-hover:bg-white/10 transition-opacity"></div>
                                </div>
                            ))}
                        </div>
                        <button className="w-full mt-4 btn-secondary text-sm">
                            View Full Portfolio
                        </button>
                    </div>

                    {/* Recent Activity */}
                    <div className="glass-card p-6 md:p-8">
                        <h2 className="text-2xl font-black text-white mb-6">Recent Activity</h2>
                        <div className="space-y-4">
                            {[
                                { text: 'Completed collaboration with @designer', time: '2 days ago' },
                                { text: 'Posted new portfolio piece', time: '5 days ago' },
                                { text: 'Received 5-star review', time: '1 week ago' },
                            ].map((activity, i) => (
                                <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-white/5">
                                    <div className="w-2 h-2 rounded-full bg-white/40 mt-2"></div>
                                    <div className="flex-1">
                                        <p className="text-white/80 text-sm">{activity.text}</p>
                                        <p className="text-white/40 text-xs mt-1">{activity.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}
