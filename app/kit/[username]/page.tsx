import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { Instagram, Twitter, Youtube, Globe, Mail, Download, Share2, CheckCircle2 } from 'lucide-react'
import LiveStatsGraph from '@/components/media-kit/live-stats-graph'
import BrandDeals from '@/components/media-kit/brand-deals'

interface MediaKitPageProps {
    params: Promise<{
        username: string
    }>
}

export default async function MediaKitPage({ params }: MediaKitPageProps) {
    const { username } = await params
    const supabase = await createClient()

    // Fetch creator by username (case insensitive)
    const { data: creator } = await supabase
        .from('users')
        .select('*')
        .ilike('username', username)
        .single()

    if (!creator) {
        return notFound()
    }

    // Fetch socials
    const { data: socials } = await supabase
        .from('social_links')
        .select('*')
        .eq('user_id', creator.id)

    return (
        <div className="min-h-screen bg-black text-white selection:bg-purple-500/30">
            {/* Hero Header */}
            <div className="relative h-[40vh] md:h-[50vh] overflow-hidden">
                <div className="absolute inset-0">
                    {creator.cover_image_url ? (
                        <img src={creator.cover_image_url} alt="Cover" className="w-full h-full object-cover opacity-60" />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-purple-900 via-black to-blue-900" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
                    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-end gap-8">
                        {/* Avatar */}
                        <div className="w-32 h-32 md:w-48 md:h-48 rounded-3xl border-4 border-black bg-zinc-900 overflow-hidden shadow-2xl relative group">
                            {creator.profile_image_url ? (
                                <img src={creator.profile_image_url} alt={creator.display_name} className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-4xl font-bold text-white/20">
                                    {creator.display_name?.[0]}
                                </div>
                            )}
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                        </div>

                        {/* Info */}
                        <div className="flex-1 mb-4">
                            <div className="flex items-center gap-3 mb-2">
                                <h1 className="text-4xl md:text-6xl font-black tracking-tight">
                                    {creator.display_name || creator.username}
                                </h1>
                                <CheckCircle2 className="w-8 h-8 text-blue-500 fill-blue-500/20" />
                            </div>
                            <p className="text-xl text-white/60 max-w-2xl font-light leading-relaxed">
                                {creator.bio || "Digital Creator & Influencer"}
                            </p>

                            {creator.location && (
                                <div className="flex items-center gap-2 mt-4 text-sm text-white/40 uppercase tracking-widest font-medium">
                                    <Globe className="w-4 h-4" />
                                    {creator.location}
                                </div>
                            )}
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3 mb-4">
                            <button className="btn-primary flex items-center gap-2">
                                <Mail className="w-4 h-4" />
                                Contact Me
                            </button>
                            <button className="btn-secondary flex items-center gap-2">
                                <Download className="w-4 h-4" />
                                Download PDF
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Stats & Info */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Live Stats Graph */}
                        <LiveStatsGraph />

                        {/* About Section */}
                        <div className="glass-card p-8">
                            <h2 className="text-2xl font-bold mb-4">About Me</h2>
                            <p className="text-white/70 leading-relaxed text-lg">
                                {creator.bio ? creator.bio : "I create content that inspires and entertains. With a focus on high-quality storytelling and authentic engagement, I've built a loyal community of followers who trust my recommendations."}
                            </p>
                        </div>

                        {/* Brand Deals */}
                        <BrandDeals />
                    </div>

                    {/* Right Column: Quick Stats & Socials */}
                    <div className="space-y-8">
                        {/* Social Reach Card */}
                        <div className="glass-card p-6">
                            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                                <Share2 className="w-5 h-5 text-purple-400" />
                                Social Reach
                            </h3>

                            <div className="space-y-4">
                                {socials?.map((social: any) => (
                                    <div key={social.id} className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 rounded-lg bg-white/5">
                                                {social.platform.toLowerCase() === 'instagram' && <Instagram className="w-5 h-5" />}
                                                {social.platform.toLowerCase() === 'twitter' && <Twitter className="w-5 h-5" />}
                                                {social.platform.toLowerCase() === 'youtube' && <Youtube className="w-5 h-5" />}
                                            </div>
                                            <span className="font-medium capitalize">{social.platform}</span>
                                        </div>
                                        <div className="text-right">
                                            <div className="font-bold">250K</div>
                                            <div className="text-xs text-white/40">Followers</div>
                                        </div>
                                    </div>
                                ))}

                                {(!socials || socials.length === 0) && (
                                    <div className="text-center py-8 text-white/40 text-sm">
                                        No social accounts linked yet.
                                    </div>
                                )}
                            </div>

                            <div className="mt-6 pt-6 border-t border-white/10">
                                <div className="flex justify-between items-center">
                                    <span className="text-white/60">Total Reach</span>
                                    <span className="text-2xl font-black gradient-text">1.2M+</span>
                                </div>
                            </div>
                        </div>

                        {/* Audience Demographics (Mock) */}
                        <div className="glass-card p-6">
                            <h3 className="text-lg font-bold mb-6">Audience</h3>

                            <div className="space-y-6">
                                <div>
                                    <div className="flex justify-between text-sm mb-2">
                                        <span className="text-white/60">Gender</span>
                                    </div>
                                    <div className="flex h-2 rounded-full overflow-hidden">
                                        <div className="w-[65%] bg-blue-500"></div>
                                        <div className="w-[35%] bg-pink-500"></div>
                                    </div>
                                    <div className="flex justify-between text-xs mt-2 text-white/40">
                                        <span>65% Male</span>
                                        <span>35% Female</span>
                                    </div>
                                </div>

                                <div>
                                    <div className="flex justify-between text-sm mb-2">
                                        <span className="text-white/60">Top Locations</span>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span>United States</span>
                                            <span className="font-bold">45%</span>
                                        </div>
                                        <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                                            <div className="w-[45%] h-full bg-white/80"></div>
                                        </div>

                                        <div className="flex justify-between text-sm">
                                            <span>United Kingdom</span>
                                            <span className="font-bold">20%</span>
                                        </div>
                                        <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                                            <div className="w-[20%] h-full bg-white/60"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
