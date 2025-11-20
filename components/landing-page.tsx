'use client'

import Link from 'next/link'
import { Sparkles, Users, Zap, Shield, TrendingUp, Rocket, ArrowRight, Star, Heart } from 'lucide-react'
import { ThemeToggle } from '@/components/theme-toggle'

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-background text-foreground relative overflow-hidden selection:bg-primary/10 selection:text-primary">
            {/* Minimal Background Elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-3xl"></div>
            </div>

            {/* Navigation */}
            <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                    <Link href="/" className="text-xl font-bold tracking-tight">
                        Creator Hub
                    </Link>
                    <div className="flex gap-4 items-center">
                        <ThemeToggle />
                        <Link href="/auth/login" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                            Log in
                        </Link>
                        <Link href="/auth/signup" className="btn-primary text-sm px-5 py-2.5 h-auto">
                            Sign up
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative max-w-7xl mx-auto px-6 py-24 md:py-32 text-center animate-in fade-in zoom-in duration-700">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8 bg-muted/50 border border-border/50 backdrop-blur-sm">
                    <Sparkles className="w-3.5 h-3.5 text-primary" />
                    <span className="text-sm font-medium text-muted-foreground">Join the creator revolution</span>
                </div>

                <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight tracking-tight text-foreground">
                    <span className="block">Connect.</span>
                    <span className="block text-muted-foreground">Collaborate.</span>
                    <span className="block text-primary">Create Magic.</span>
                </h1>

                <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
                    The platform where influencers and creators unite. Discover collaborators, grow your audience, and build something extraordinary together.
                </p>

                <div className="flex gap-4 justify-center mb-20 flex-wrap">
                    <Link href="/auth/signup" className="btn-primary inline-flex items-center gap-2 shadow-lg shadow-primary/20">
                        <Users className="w-4 h-4" />
                        Join as Creator
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                    <Link href="/auth/signup" className="btn-secondary inline-flex items-center gap-2">
                        <Rocket className="w-4 h-4" />
                        Join as Professional
                    </Link>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-y border-border/50 py-12 bg-card/30 backdrop-blur-sm">
                    {[
                        { value: '50K+', label: 'Creators' },
                        { value: '100K+', label: 'Connections' },
                        { value: '$50M+', label: 'Value Created' },
                        { value: '4.9/5', label: 'Rating' },
                    ].map((stat, i) => (
                        <div key={i} className="space-y-1">
                            <div className="text-3xl md:text-4xl font-bold tracking-tight">{stat.value}</div>
                            <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Features */}
            <section className="py-24 md:py-32 bg-muted/30">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-20">
                        <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">
                            Everything You Need
                        </h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Built by creators, for creators. Every feature designed to help you connect, collaborate, and thrive.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: Sparkles,
                                title: 'Discover Matches',
                                desc: 'Find collaborators who align with your vision and amplify your creative voice.',
                            },
                            {
                                icon: Zap,
                                title: 'Real-Time Sync',
                                desc: 'Instant messaging and collaboration tools. Work together seamlessly.',
                            },
                            {
                                icon: Shield,
                                title: 'Secure Work',
                                desc: 'Verified profiles and secure contracts. Focus on creating while we handle trust.',
                            },
                            {
                                icon: TrendingUp,
                                title: 'Grow Audience',
                                desc: 'Cross-promote and collaborate to watch your reach expand exponentially.',
                            },
                            {
                                icon: Users,
                                title: 'Community',
                                desc: 'Share knowledge, celebrate wins, and build lasting partnerships.',
                            },
                            {
                                icon: Rocket,
                                title: 'Scale Up',
                                desc: 'Manage multiple projects and scale your creative business effortlessly.',
                            },
                        ].map((feature, i) => {
                            const Icon = feature.icon
                            return (
                                <div key={i} className="glass-card p-8 hover:-translate-y-1 transition-transform duration-300">
                                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                                        <Icon className="w-6 h-6 text-primary" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                                    <p className="text-muted-foreground leading-relaxed">
                                        {feature.desc}
                                    </p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* Testimonial */}
            <section className="py-24 md:py-32">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <div className="mb-8 flex justify-center gap-1">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                        ))}
                    </div>
                    <blockquote className="text-2xl md:text-4xl font-medium leading-tight mb-8">
                        "This platform changed everything. I found my dream collaborators, and together we've grown our audiences exponentially."
                    </blockquote>
                    <div className="flex items-center justify-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center font-bold">
                            SC
                        </div>
                        <div className="text-left">
                            <div className="font-bold">Sarah Chen</div>
                            <div className="text-sm text-muted-foreground">Content Creator • 2M Followers</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 md:py-32 border-t border-border/50 bg-muted/30">
                <div className="max-w-3xl mx-auto px-6 text-center">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
                        Ready to Level Up?
                    </h2>
                    <p className="text-xl text-muted-foreground mb-10">
                        Join thousands of creators building the future of content. Start your journey today.
                    </p>
                    <Link href="/auth/signup" className="btn-primary inline-flex items-center gap-2 text-lg px-8 py-4 h-auto shadow-xl shadow-primary/20">
                        Get Started Free
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                    <div className="mt-8 flex items-center justify-center gap-6 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                            <Heart className="w-4 h-4" />
                            <span>No credit card</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Zap className="w-4 h-4" />
                            <span>Setup in minutes</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 border-t border-border/50">
                <div className="max-w-7xl mx-auto px-6 text-center text-sm text-muted-foreground">
                    <p>© 2025 Creator Hub. Building the future of creator collaboration.</p>
                </div>
            </footer>
        </div>
    )
}
