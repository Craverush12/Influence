'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { MessageSquare, ExternalLink, Globe, Sparkles, ArrowLeft, Star, Users, TrendingUp, Instagram, Twitter, Youtube, Twitch, Music, MapPin } from 'lucide-react'
import Link from 'next/link'
import { SocialEmbed } from '@/components/social-embed'
import { ThemeToggle } from '@/components/theme-toggle'

interface CreatorProfileClientProps {
    creator: any
    socials: any[]
    currentUser: any
}

export default function CreatorProfileClient({ creator, socials, currentUser }: CreatorProfileClientProps) {
    const router = useRouter()

    const handleMessageClick = () => {
        if (!currentUser) {
            router.push('/auth/login')
            return
        }
        router.push(`/messages?user=${creator.id}`)
    }

    return (
        <div className="min-h-screen bg-background text-foreground relative">
            {/* Navigation */}
            <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <Link href="/" className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                                <Sparkles className="w-4 h-4 text-primary" />
                            </div>
                            <span className="text-lg font-bold tracking-tight hidden sm:inline">Creator Hub</span>
                        </Link>
                        <Link href="/explore" className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium flex items-center gap-2">
                            <ArrowLeft className="w-4 h-4" />
                            <span className="hidden sm:inline">Back to Explore</span>
                        </Link>
                        <div className="ml-4">
                            <ThemeToggle />
                        </div>
                    </div>
                </div>
            </nav>

            {/* Profile Header */}
            <div className="relative">
                {/* Cover Image */}
                <div className="h-48 md:h-64 w-full bg-muted relative overflow-hidden">
                    {creator.cover_image_url ? (
                        <img
                            src={creator.cover_image_url}
                            alt="cover"
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5"></div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-60"></div>
                </div>

                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 -mt-20">
                    <div className="flex flex-col md:flex-row items-start gap-6 mb-8">
                        {/* Avatar */}
                        <div className="relative">
                            <div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl border-4 border-background bg-muted shadow-xl overflow-hidden">
                                {creator.profile_image_url ? (
                                    <img
                                        src={creator.profile_image_url}
                                        alt={creator.display_name}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-3xl font-bold text-muted-foreground bg-muted">
                                        {(creator.display_name || creator.username)?.[0]?.toUpperCase()}
                                    </div>
                                )}
                            </div>
                            <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-4 border-background"></div>
                        </div>

                        {/* Info */}
                        <div className="flex-1 pt-20 md:pt-24">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                                <div>
                                    <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-1">
                                        {creator.display_name || creator.username}
                                    </h1>
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <span>@{creator.username}</span>
                                        {creator.location && (
                                            <>
                                                <span>•</span>
                                                <span className="flex items-center gap-1">
                                                    <MapPin className="w-3 h-3" />
                                                    {creator.location}
                                                </span>
                                            </>
                                        )}
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <button
                                        onClick={handleMessageClick}
                                        className="btn-primary flex items-center gap-2"
                                    >
                                        <MessageSquare className="w-4 h-4" />
                                        Message
                                    </button>
                                    {creator.website && (
                                        <a
                                            href={creator.website}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="btn-secondary flex items-center gap-2"
                                        >
                                            <Globe className="w-4 h-4" />
                                            Website
                                        </a>
                                    )}
                                </div>
                            </div>

                            {/* Stats */}
                            <div className="flex flex-wrap gap-6 py-6 border-y border-border/50">
                                <div className="flex items-center gap-2">
                                    <Star className="w-5 h-5 fill-primary text-primary" />
                                    <div>
                                        <span className="font-bold text-foreground">4.9</span>
                                        <span className="text-muted-foreground text-sm ml-1">Rating</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Users className="w-5 h-5 text-muted-foreground" />
                                    <div>
                                        <span className="font-bold text-foreground">2.5K</span>
                                        <span className="text-muted-foreground text-sm ml-1">Followers</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <TrendingUp className="w-5 h-5 text-green-500" />
                                    <div>
                                        <span className="font-bold text-foreground">98%</span>
                                        <span className="text-muted-foreground text-sm ml-1">Success Rate</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bio & Content */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-12">
                        <div className="lg:col-span-2 space-y-8">
                            {/* About */}
                            <section>
                                <h2 className="text-xl font-bold mb-4">About</h2>
                                <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                                    {creator.bio || "No bio yet."}
                                </p>
                            </section>

                            {/* Social Feeds */}
                            {socials.length > 0 && (
                                <section>
                                    <h2 className="text-xl font-bold mb-4">Latest Content</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {socials.map((social) => (
                                            <SocialEmbed
                                                key={social.id}
                                                platform={social.platform}
                                                handle={social.handle}
                                                url={social.url}
                                            />
                                        ))}
                                    </div>
                                </section>
                            )}
                        </div>

                        <div className="space-y-6">
                            {/* Social Links */}
                            {socials.length > 0 && (
                                <div className="glass-card p-6 rounded-2xl bg-card border border-border">
                                    <h3 className="font-bold mb-4">Connect</h3>
                                    <div className="space-y-3">
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
                                            return (
                                                <a
                                                    key={social.id}
                                                    href={social.url || `https://${social.platform}.com/${social.handle}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center justify-between p-3 rounded-xl hover:bg-muted transition-colors group"
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                                                            <Icon className="w-4 h-4" />
                                                        </div>
                                                        <span className="font-medium capitalize">{social.platform}</span>
                                                    </div>
                                                    <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                                                </a>
                                            )
                                        })}
                                    </div>
                                </div>
                            )}

                            {/* Portfolio Preview */}
                            <div className="glass-card p-6 rounded-2xl bg-card border border-border">
                                <h3 className="font-bold mb-4">Portfolio</h3>
                                <div className="grid grid-cols-2 gap-2 mb-4">
                                    {[1, 2, 3, 4].map((i) => (
                                        <div key={i} className="aspect-square rounded-lg bg-muted overflow-hidden hover:opacity-80 transition-opacity cursor-pointer"></div>
                                    ))}
                                </div>
                                <button className="w-full btn-secondary text-sm">View Full Portfolio</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
