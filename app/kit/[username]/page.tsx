import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { Instagram, Twitter, Youtube, Globe, Mail, Download, Share2, CheckCircle2, MapPin } from 'lucide-react'
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

    // Fetch stats
    const { data: stats } = await supabase
        .from('creator_stats')
        .select('*')
        .eq('user_id', creator.id)
        .order('recorded_at', { ascending: true })

    // Fetch brand deals
    const { data: deals } = await supabase
        .from('brand_deals')
        .select('*')
        .eq('user_id', creator.id)
        .order('deal_date', { ascending: false })

    return (
        <div className="min-h-screen bg-background text-foreground selection:bg-primary/30">
            {/* Hero Header */}
            <div className="relative h-[40vh] md:h-[50vh] overflow-hidden bg-muted">
                <div className="absolute inset-0">
                    {creator.cover_image_url ? (
                        <img src={creator.cover_image_url} alt="Cover" className="w-full h-full object-cover opacity-60" />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-primary/20 via-background to-primary/10" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
                    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-end gap-8">
                        {/* Avatar */}
                        <div className="w-32 h-32 md:w-48 md:h-48 rounded-3xl border-4 border-background bg-muted overflow-hidden shadow-2xl relative group">
                            {creator.profile_image_url ? (
                                <img src={creator.profile_image_url} alt={creator.display_name} className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-4xl font-bold text-muted-foreground">
                                    {creator.display_name?.[0]}
                                </div>
                            )}
                        </div>

                        {/* Info */}
                        <div className="flex-1 mb-4">
                            <div className="flex items-center gap-3 mb-2">
                                <h1 className="text-4xl md:text-6xl font-black tracking-tight text-foreground">
                                    {creator.display_name || creator.username}
                                </h1>
                                <CheckCircle2 className="w-8 h-8 text-blue-500 fill-blue-500/20" />
                            </div>
                            <p className="text-xl text-muted-foreground max-w-2xl font-light leading-relaxed">
                                {creator.bio || "Digital Creator & Influencer"}
                            </p>

                            {creator.location && (
                                <div className="flex items-center gap-2 mt-4 text-sm text-muted-foreground uppercase tracking-widest font-medium">
                                    <MapPin className="w-4 h-4" />
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
                        <LiveStatsGraph data={stats || []} />

                        {/* About Section */}
                        <div className="glass-card p-8 bg-card border border-border">
                            <h2 className="text-2xl font-bold mb-4 text-foreground">About Me</h2>
                            <p className="text-muted-foreground leading-relaxed text-lg">
                                {creator.bio ? creator.bio : "I create content that inspires and entertains. With a focus on high-quality storytelling and authentic engagement, I've built a loyal community of followers who trust my recommendations."}
                            </p>
                        </div>

                        {/* Brand Deals */}
                        <BrandDeals deals={deals || []} />
                    </div>

                    {/* Right Column: Quick Stats & Socials */}
                    <div className="space-y-8">
                        {/* Social Reach Card */}
                        <div className="glass-card p-6 bg-card border border-border">
                            <h3 className="text-lg font-bold mb-6 flex items-center gap-2 text-foreground">
                                <Share2 className="w-5 h-5 text-primary" />
                                Social Reach
                            </h3>

                            <div className="space-y-4">
                                {socials?.map((social: any) => (
                                    <div key={social.id} className="flex items-center justify-between p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 rounded-lg bg-background shadow-sm">
                                                {social.platform.toLowerCase() === 'instagram' && <Instagram className="w-5 h-5 text-pink-500" />}
                                                {social.platform.toLowerCase() === 'twitter' && <Twitter className="w-5 h-5 text-blue-400" />}
                                                {social.platform.toLowerCase() === 'youtube' && <Youtube className="w-5 h-5 text-red-500" />}
                                            </div>
                                            <span className="font-medium capitalize text-foreground">{social.platform}</span>
                                        </div>
                                        <div className="text-right">
                                            <div className="font-bold text-foreground">250K</div>
                                            <div className="text-xs text-muted-foreground">Followers</div>
                                        </div>
                                    </div>
                                ))}

                                {(!socials || socials.length === 0) && (
                                    <div className="text-center py-8 text-muted-foreground text-sm">
                                        No social accounts linked yet.
                                    </div>
                                )}
                            </div>

                            <div className="mt-6 pt-6 border-t border-border">
                                <div className="flex justify-between items-center">
                                    <span className="text-muted-foreground">Total Reach</span>
                                    <span className="text-2xl font-black text-primary">1.2M+</span>
                                </div>
                            </div>
                        </div>

                        {/* Audience Demographics (Mock) */}
                        <div className="glass-card p-6 bg-card border border-border">
                            <h3 className="text-lg font-bold mb-6 text-foreground">Audience</h3>

                            <div className="space-y-6">
                                <div>
                                    <div className="flex justify-between text-sm mb-2">
                                        <span className="text-muted-foreground">Gender</span>
                                    </div>
                                    <div className="flex h-2 rounded-full overflow-hidden">
                                        <div className="w-[65%] bg-blue-500"></div>
                                        <div className="w-[35%] bg-pink-500"></div>
                                    </div>
                                    <div className="flex justify-between text-xs mt-2 text-muted-foreground">
                                        <span>65% Male</span>
                                        <span>35% Female</span>
                                    </div>
                                </div>

                                <div>
                                    <div className="flex justify-between text-sm mb-2">
                                        <span className="text-muted-foreground">Top Locations</span>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-sm text-foreground">
                                            <span>United States</span>
                                            <span className="font-bold">45%</span>
                                        </div>
                                        <div className="w-full h-1 bg-muted rounded-full overflow-hidden">
                                            <div className="w-[45%] h-full bg-primary"></div>
                                        </div>

                                        <div className="flex justify-between text-sm text-foreground">
                                            <span>United Kingdom</span>
                                            <span className="font-bold">20%</span>
                                        </div>
                                        <div className="w-full h-1 bg-muted rounded-full overflow-hidden">
                                            <div className="w-[20%] h-full bg-primary/60"></div>
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
