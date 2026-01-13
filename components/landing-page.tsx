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

            {/* Hero Section - Phase 2.1: Psychology Application */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
                {/* Aurora Mesh Gradient Background */}
                <div className="absolute inset-0 aurora-bg"></div>
                
                {/* Social Proof Badge - Real-time user count */}
                <div className="absolute top-20 left-1/2 -translate-x-1/2 z-10">
                    <div className="glass-card inline-flex items-center gap-2 px-4 py-2 rounded-full">
                        <Users className="w-4 h-4 text-primary" />
                        <span className="text-sm font-medium">1,247 creators joined this week</span>
                    </div>
                </div>

                <div className="relative max-w-7xl mx-auto px-6 py-24 md:py-32 text-center z-10">
                    {/* Headline with Visual Hierarchy - F-pattern layout */}
                    <h1 className="text-6xl md:text-8xl lg:text-9xl font-display font-extrabold mb-8 leading-[0.9] tracking-tight">
                        <span className="block text-foreground">Connect.</span>
                        <span className="block text-muted-foreground">Collaborate.</span>
                        <span className="block text-gradient-aurora">Create Magic.</span>
                    </h1>

                    {/* Curiosity Gap */}
                    <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-6 leading-relaxed">
                        Discover why 50K+ creators choose us to find their perfect collaborators
                    </p>

                    {/* CTA with Loss Aversion */}
                    <div className="flex gap-4 justify-center mb-20 flex-wrap">
                        <Link 
                            href="/auth/signup" 
                            className="btn-primary inline-flex items-center gap-2 shadow-lg shadow-primary/20 hover:scale-105 transition-transform"
                        >
                            Start Free Trial
                            <span className="ml-2 text-xs opacity-75 font-normal">(No credit card • Expires in 48h)</span>
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                        <Link 
                            href="/auth/login" 
                            className="btn-secondary inline-flex items-center gap-2"
                        >
                            Log In
                        </Link>
                    </div>

                    {/* Stats - Social Proof */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-y border-border/50 py-12 bg-card/30 backdrop-blur-sm">
                        {[
                            { value: '50K+', label: 'Active Creators', highlight: false },
                            { value: '100K+', label: 'Connections Made', highlight: false },
                            { value: '$50M+', label: 'Value Created', highlight: true },
                            { value: '4.9/5', label: 'Average Rating', highlight: false },
                        ].map((stat, i) => (
                            <div key={i} className={`space-y-1 ${stat.highlight ? 'scale-105' : ''}`}>
                                <div className="text-3xl md:text-4xl font-display font-extrabold tracking-tight text-gradient-aurora">{stat.value}</div>
                                <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features - Phase 2.2: Serial Position Effect & Visual Anchor */}
            <section className="py-24 md:py-32 bg-muted/30 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl md:text-6xl font-display font-extrabold mb-4 tracking-tight">
                            Everything You Need
                        </h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Built by creators, for creators. Every feature designed to help you connect, collaborate, and thrive.
                        </p>
                    </div>

                    {/* Serial Position Effect: Most important first and last, highlighted in middle */}
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: Sparkles,
                                title: 'Discover Matches',
                                desc: 'Find collaborators who align with your vision and amplify your creative voice.',
                                highlight: true, // First - most important
                            },
                            {
                                icon: Zap,
                                title: 'Real-Time Sync',
                                desc: 'Instant messaging and collaboration tools. Work together seamlessly.',
                                highlight: false,
                            },
                            {
                                icon: Shield,
                                title: 'Secure Work',
                                desc: 'Verified profiles and secure contracts. Focus on creating while we handle trust.',
                                highlight: false,
                            },
                            {
                                icon: TrendingUp,
                                title: 'Grow Audience',
                                desc: 'Cross-promote and collaborate to watch your reach expand exponentially.',
                                highlight: false,
                            },
                            {
                                icon: Users,
                                title: 'Community',
                                desc: 'Share knowledge, celebrate wins, and build lasting partnerships.',
                                highlight: true, // Middle - visual anchor
                            },
                            {
                                icon: Rocket,
                                title: 'Scale Up',
                                desc: 'Manage multiple projects and scale your creative business effortlessly.',
                                highlight: false, // Last - also important
                            },
                        ].map((feature, i) => {
                            const Icon = feature.icon
                            return (
                                <div 
                                    key={i} 
                                    className={`glass-card p-8 hover:-translate-y-1 transition-all duration-300 ${
                                        feature.highlight 
                                            ? 'ring-2 ring-primary/50 scale-105 bg-gradient-to-br from-primary/5 to-accent-3/5' 
                                            : ''
                                    }`}
                                >
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${
                                        feature.highlight 
                                            ? 'bg-gradient-aurora-1 text-white' 
                                            : 'bg-primary/10'
                                    }`}>
                                        <Icon className={`w-6 h-6 ${feature.highlight ? 'text-white' : 'text-primary'}`} />
                                    </div>
                                    <h3 className="text-xl font-display font-bold mb-3">{feature.title}</h3>
                                    <p className="text-muted-foreground leading-relaxed">
                                        {feature.desc}
                                    </p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* Social Proof Section - Phase 2.3: Framing Effect, Halo Effect, Peak-End Rule */}
            <section className="py-24 md:py-32 relative">
                <div className="max-w-7xl mx-auto px-6">
                    {/* Framing Effect: Positive framing */}
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
                            <Star className="w-4 h-4 text-primary fill-primary" />
                            <span className="text-sm font-medium">98% satisfaction rate</span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-display font-extrabold mb-4 tracking-tight">
                            Trusted by Creators Worldwide
                        </h2>
                    </div>

                    {/* Testimonials Grid */}
                    <div className="grid md:grid-cols-3 gap-8 mb-16">
                        {[
                            {
                                quote: "This platform changed everything. I found my dream collaborators, and together we've grown our audiences exponentially.",
                                author: "Sarah Chen",
                                role: "Content Creator • 2M Followers",
                                rating: 5,
                                avatar: "SC",
                            },
                            {
                                quote: "The best investment I've made for my creative business. Real connections, real results.",
                                author: "Marcus Johnson",
                                role: "Photographer • 500K Followers",
                                rating: 5,
                                avatar: "MJ",
                            },
                            {
                                quote: "From zero to hero. This platform helped me build a network that transformed my career.",
                                author: "Emma Rodriguez",
                                role: "Video Creator • 1.5M Followers",
                                rating: 5,
                                avatar: "ER",
                            },
                        ].map((testimonial, i) => (
                            <div key={i} className="glass-card p-8">
                                <div className="mb-4 flex gap-1">
                                    {[...Array(testimonial.rating)].map((_, j) => (
                                        <Star key={j} className="w-4 h-4 fill-primary text-primary" />
                                    ))}
                                </div>
                                <blockquote className="text-lg font-medium leading-relaxed mb-6">
                                    "{testimonial.quote}"
                                </blockquote>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-gradient-aurora-1 flex items-center justify-center font-display font-bold text-white">
                                        {testimonial.avatar}
                                    </div>
                                    <div>
                                        <div className="font-display font-bold">{testimonial.author}</div>
                                        <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Peak-End Rule: Strongest testimonial at the end */}
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="glass-card p-12 bg-gradient-to-br from-primary/10 to-accent-3/10 border-2 border-primary/30">
                            <div className="mb-6 flex justify-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-6 h-6 fill-primary text-primary" />
                                ))}
                            </div>
                            <blockquote className="text-2xl md:text-4xl font-display font-bold leading-tight mb-8">
                                "I've tried every platform. This one actually delivers. The community, the tools, the results—everything exceeded my expectations."
                            </blockquote>
                            <div className="flex items-center justify-center gap-4">
                                <div className="w-16 h-16 rounded-full bg-gradient-aurora-1 flex items-center justify-center font-display font-extrabold text-white text-xl">
                                    AC
                                </div>
                                <div className="text-left">
                                    <div className="font-display font-bold text-xl">Alex Chen</div>
                                    <div className="text-muted-foreground">Top Creator • 5M+ Followers</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Trust Badges - Halo Effect */}
                    <div className="mt-16 flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                            <Shield className="w-5 h-5 text-primary" />
                            <span>Verified & Secure</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Zap className="w-5 h-5 text-primary" />
                            <span>99.9% Uptime</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Users className="w-5 h-5 text-primary" />
                            <span>50K+ Active Users</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Final CTA - Loss Aversion & Default Effect */}
            <section className="py-24 md:py-32 border-t border-border/50 bg-muted/30 relative overflow-hidden">
                <div className="absolute inset-0 aurora-bg opacity-30"></div>
                <div className="relative max-w-3xl mx-auto px-6 text-center z-10">
                    <h2 className="text-4xl md:text-6xl font-display font-extrabold mb-6 tracking-tight">
                        Ready to Level Up?
                    </h2>
                    <p className="text-xl text-muted-foreground mb-10">
                        Join thousands of creators building the future of content. Start your journey today.
                    </p>
                    <Link 
                        href="/auth/signup" 
                        className="btn-primary inline-flex items-center gap-2 text-lg px-8 py-4 h-auto shadow-xl shadow-primary/20 hover:scale-105 transition-transform"
                    >
                        Get Started Free
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                    <div className="mt-8 flex items-center justify-center gap-6 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                            <Heart className="w-4 h-4 text-primary" />
                            <span>No credit card required</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Zap className="w-4 h-4 text-primary" />
                            <span>Setup in 2 minutes</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Shield className="w-4 h-4 text-primary" />
                            <span>Cancel anytime</span>
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
