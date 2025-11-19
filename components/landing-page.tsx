'use client'

import Link from 'next/link'
import { Sparkles, Users, Zap, Shield, TrendingUp, Rocket, ArrowRight, Palette, Star, Heart, MessageCircle } from 'lucide-react'

export default function LandingPage() {
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
                    <Link href="/" className="text-2xl font-bold gradient-text">
                        Creator Hub
                    </Link>
                    <div className="flex gap-4 items-center">
                        <Link href="/auth/login" className="text-sm font-medium text-white/70 hover:text-white transition-colors">
                            Log in
                        </Link>
                        <Link href="/auth/signup" className="btn-primary">
                            Sign up
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative max-w-7xl mx-auto px-6 py-24 md:py-32 text-center fade-in">
                <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full mb-8 glass-card">
                    <Sparkles className="w-4 h-4 text-white/60" />
                    <span className="text-sm font-light">Join the creator revolution</span>
                </div>

                <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight" style={{ fontFamily: 'var(--font-playfair, "Playfair Display", serif)' }}>
                    <span className="block text-white">Connect.</span>
                    <span className="block text-white">Collaborate.</span>
                    <span className="block gradient-text">Create Magic.</span>
                </h1>

                <p className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto mb-12 font-light" style={{ letterSpacing: '0.02em' }}>
                    The platform where influencers and creators unite. Discover collaborators, grow your audience, and build something extraordinary together.
                </p>

                <div className="flex gap-4 justify-center mb-20 flex-wrap">
                    <Link href="/auth/signup" className="btn-primary inline-flex items-center gap-2 glow">
                        <Users className="w-5 h-5" />
                        Join as Creator
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                    <Link href="/auth/signup" className="btn-secondary inline-flex items-center gap-2">
                        <Rocket className="w-5 h-5" />
                        Join as Professional
                    </Link>
                </div>

                {/* Stats - Creative Visual Showcase */}
                <div className="relative pt-20">
                    <div className="flex flex-wrap justify-center gap-8 md:gap-12">
                        {[
                            {
                                value: '50K+',
                                label: 'Creators Building',
                                sublabel: 'Their dreams',
                                icon: Sparkles,
                                gradient: 'from-white/20 to-white/10',
                                delay: '0.1s',
                                size: 'large'
                            },
                            {
                                value: '100K+',
                                label: 'Connections Made',
                                sublabel: 'Every month',
                                icon: Heart,
                                gradient: 'from-white/20 to-white/10',
                                delay: '0.2s',
                                size: 'medium'
                            },
                            {
                                value: '$50M+',
                                label: 'Value Created',
                                sublabel: 'Together',
                                icon: TrendingUp,
                                gradient: 'from-white/20 to-white/10',
                                delay: '0.3s',
                                size: 'medium'
                            },
                            {
                                value: '4.9/5',
                                label: 'Loved by Creators',
                                sublabel: 'Rated by you',
                                icon: Star,
                                gradient: 'from-yellow-400 to-orange-500',
                                delay: '0.4s',
                                size: 'large'
                            },
                        ].map((stat, i) => {
                            const Icon = stat.icon
                            return (
                                <div
                                    key={i}
                                    className="group relative stagger-item cursor-pointer"
                                    style={{ animationDelay: stat.delay }}
                                >
                                    <div className="relative glass-card p-8 md:p-10 hover:scale-105 transition-all duration-500">
                                        {/* Animated gradient background */}
                                        <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-20 rounded-2xl transition-opacity duration-500`}></div>

                                        {/* Icon with gradient */}
                                        <div className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                            <Icon className="w-8 h-8 text-white" />
                                            <div className="absolute inset-0 bg-white/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all"></div>
                                        </div>

                                        {/* Number with animated gradient */}
                                        <div className="relative mb-2">
                                            <div className={`text-5xl md:text-6xl font-black bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>
                                                {stat.value}
                                            </div>
                                        </div>

                                        {/* Labels */}
                                        <div className="space-y-1">
                                            <div className="text-lg font-semibold text-white" style={{ letterSpacing: '0.01em' }}>{stat.label}</div>
                                            <div className="text-sm text-white/50 font-medium" style={{ letterSpacing: '0.02em' }}>{stat.sublabel}</div>
                                        </div>

                                        {/* Glow effect */}
                                        <div className={`absolute -inset-1 bg-gradient-to-r ${stat.gradient} rounded-2xl opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500 -z-10`}></div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* Features - Creative Showcase */}
            <section className="relative py-24 md:py-32 overflow-hidden">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-20">
                        <h2 className="text-5xl md:text-7xl font-bold mb-6" style={{ fontFamily: 'var(--font-playfair, "Playfair Display", serif)' }}>
                            <span className="gradient-text">Everything You Need</span>
                            <br />
                            <span className="text-white">To Grow Together</span>
                        </h2>
                        <p className="text-xl text-white/60 max-w-2xl mx-auto" style={{ letterSpacing: '0.02em' }}>
                            Built by creators, for creators. Every feature designed to help you connect, collaborate, and thrive.
                        </p>
                    </div>

                    {/* Creative Feature Showcase */}
                    <div className="space-y-12 md:space-y-20">
                        {[
                            {
                                icon: Sparkles,
                                title: 'Discover Your Perfect Match',
                                desc: 'Browse through verified creators with stunning portfolios. Find collaborators who align with your vision and amplify your creative voice.',
                                highlight: '50K+ creators',
                                gradient: 'from-white/20 via-white/10 to-white/20',
                                position: 'left'
                            },
                            {
                                icon: Zap,
                                title: 'Connect in Real-Time',
                                desc: 'Instant messaging, video calls, and seamless collaboration tools. Work together like you\'re in the same room, even when you\'re worlds apart.',
                                highlight: 'Instant sync',
                                gradient: 'from-white/20 via-white/10 to-white/20',
                                position: 'right'
                            },
                            {
                                icon: Shield,
                                title: 'Your Work, Protected',
                                desc: 'Verified profiles, secure contracts, and transparent transactions. Focus on creating while we handle the trust and safety.',
                                highlight: '100% secure',
                                gradient: 'from-white/20 via-white/10 to-white/20',
                                position: 'left'
                            },
                            {
                                icon: TrendingUp,
                                title: 'Grow Your Audience',
                                desc: 'Connect with creators who bring new audiences. Cross-promote, collaborate, and watch your reach expand exponentially.',
                                highlight: '10x growth',
                                gradient: 'from-white/20 via-white/10 to-white/20',
                                position: 'right'
                            },
                            {
                                icon: Users,
                                title: 'Join the Movement',
                                desc: 'Be part of a thriving community where creators support each other. Share knowledge, celebrate wins, and build lasting partnerships.',
                                highlight: '100K+ members',
                                gradient: 'from-white/20 via-white/10 to-white/20',
                                position: 'left'
                            },
                            {
                                icon: Rocket,
                                title: 'Scale Without Limits',
                                desc: 'Manage multiple projects, track collaborations, and scale your creative business. All the tools you need, beautifully integrated.',
                                highlight: 'Unlimited projects',
                                gradient: 'from-white/20 via-white/10 to-white/20',
                                position: 'right'
                            },
                        ].map((feature, i) => {
                            const Icon = feature.icon
                            const isEven = i % 2 === 0
                            return (
                                <div
                                    key={i}
                                    className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-8 md:gap-12 stagger-item group`}
                                    style={{ animationDelay: `${i * 0.15}s` }}
                                >
                                    {/* Visual Element */}
                                    <div className="flex-1 w-full md:w-auto">
                                        <div className="relative">
                                            <div className={`glass-card p-12 md:p-16 relative overflow-hidden group-hover:scale-105 transition-all duration-500`}>
                                                {/* Animated gradient background */}
                                                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-10 group-hover:opacity-20 transition-opacity duration-500`}></div>

                                                {/* Large Icon */}
                                                <div className="relative z-10">
                                                    <div className={`w-24 h-24 md:w-32 md:h-32 rounded-3xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-2xl`}>
                                                        <Icon className="w-12 h-12 md:w-16 md:h-16 text-white" />
                                                    </div>

                                                    {/* Highlight badge */}
                                                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-4">
                                                        <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${feature.gradient}`}></div>
                                                        <span className="text-sm font-semibold text-white">{feature.highlight}</span>
                                                    </div>
                                                </div>

                                                {/* Glow effect */}
                                                <div className={`absolute -inset-4 bg-gradient-to-r ${feature.gradient} rounded-3xl opacity-0 group-hover:opacity-20 blur-2xl transition-opacity duration-500 -z-10`}></div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 space-y-4">
                                        <h3 className="text-3xl md:text-4xl font-bold text-white" style={{ fontFamily: 'var(--font-playfair, "Playfair Display", serif)' }}>
                                            {feature.title}
                                        </h3>
                                        <p className="text-lg md:text-xl text-white/70 leading-relaxed">
                                            {feature.desc}
                                        </p>
                                        <div className="flex items-center gap-2 pt-4">
                                            <div className={`h-1 w-12 bg-gradient-to-r ${feature.gradient} rounded-full`}></div>
                                            <span className="text-sm text-white/50 font-medium">Learn more →</span>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* Social Proof - Creative Story-Style */}
            <section className="relative py-24 md:py-32 overflow-hidden">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-20">
                        <h2 className="text-5xl md:text-7xl font-bold mb-6" style={{ fontFamily: 'var(--font-playfair, "Playfair Display", serif)' }}>
                            <span className="gradient-text">Real Stories</span>
                            <br />
                            <span className="text-white">From Real Creators</span>
                        </h2>
                        <p className="text-xl text-white/60 max-w-2xl mx-auto" style={{ letterSpacing: '0.02em' }}>
                            See how creators are transforming their careers and building their dreams together
                        </p>
                    </div>

                    {/* Creative Testimonial Showcase */}
                    <div className="relative">
                        {/* Main Featured Testimonial */}
                        <div className="mb-12 stagger-item">
                            <div className="glass-card p-10 md:p-16 relative overflow-hidden group hover:scale-[1.02] transition-all duration-500">
                                {/* Gradient background */}
                                <div className="absolute inset-0 bg-white/5 opacity-50 group-hover:opacity-70 transition-opacity"></div>

                                <div className="relative z-10">
                                    <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8">
                                        {/* Avatar with gradient ring */}
                                        <div className="relative">
                                            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white/10 border border-white/20 p-1">
                                                <div className="w-full h-full rounded-full bg-black flex items-center justify-center text-2xl font-bold text-white">
                                                    SC
                                                </div>
                                            </div>
                                            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-4 border-black"></div>
                                        </div>

                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <h3 className="text-2xl md:text-3xl font-bold text-white" style={{ fontFamily: 'var(--font-playfair, "Playfair Display", serif)' }}>Sarah Chen</h3>
                                                <div className="flex gap-1">
                                                    {[...Array(5)].map((_, j) => (
                                                        <Star key={j} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                                                    ))}
                                                </div>
                                            </div>
                                            <p className="text-white/60 font-medium mb-4">Content Creator • 2M Followers</p>
                                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card">
                                                <TrendingUp className="w-4 h-4 text-green-400" />
                                                <span className="text-sm font-semibold text-white">10x Growth</span>
                                            </div>
                                        </div>
                                    </div>

                                    <blockquote className="text-xl md:text-2xl text-white/90 leading-relaxed font-light italic">
                                        "This platform changed everything. I found my dream collaborators, and together we've grown our audiences exponentially. The community here genuinely supports each other's growth."
                                    </blockquote>
                                </div>
                            </div>
                        </div>

                        {/* Side-by-Side Testimonials */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {[
                                {
                                    name: 'Marcus Johnson',
                                    initials: 'MJ',
                                    role: 'Video Producer',
                                    followers: '500K',
                                    gradient: 'from-white/20 to-white/10',
                                    text: 'The best investment I\'ve made. Quality connections and seamless workflow make collaboration effortless.',
                                    highlight: 'Seamless workflow',
                                    icon: Zap
                                },
                                {
                                    name: 'Emma Rodriguez',
                                    initials: 'ER',
                                    role: 'Influencer & Brand Strategist',
                                    followers: '1.2M',
                                    gradient: 'from-white/20 to-white/10',
                                    text: 'Finally a platform that understands creators. Beautiful, intuitive, and powerful. It\'s become essential to my business.',
                                    highlight: 'Essential tool',
                                    icon: Rocket
                                },
                            ].map((testimonial, i) => {
                                const Icon = testimonial.icon
                                return (
                                    <div
                                        key={i}
                                        className="glass-card p-8 stagger-item group hover:scale-[1.02] transition-all duration-500 relative overflow-hidden"
                                        style={{ animationDelay: `${(i + 1) * 0.2}s` }}
                                    >
                                        {/* Gradient accent */}
                                        <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${testimonial.gradient}`}></div>
                                        <div className={`absolute inset-0 bg-gradient-to-br ${testimonial.gradient} opacity-0 group-hover:opacity-10 transition-opacity`}></div>

                                        <div className="relative z-10">
                                            <div className="flex items-start gap-4 mb-6">
                                                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${testimonial.gradient} flex items-center justify-center text-xl font-bold text-white shadow-lg`}>
                                                    {testimonial.initials}
                                                </div>
                                                <div className="flex-1">
                                                    <h4 className="text-xl font-bold text-white mb-1" style={{ fontFamily: 'var(--font-playfair, "Playfair Display", serif)' }}>{testimonial.name}</h4>
                                                    <p className="text-sm text-white/60 mb-2">{testimonial.role}</p>
                                                    <div className="flex items-center gap-2">
                                                        <Users className="w-4 h-4 text-white/40" />
                                                        <span className="text-xs text-white/50">{testimonial.followers} followers</span>
                                                    </div>
                                                </div>
                                                <div className={`p-3 rounded-xl bg-gradient-to-br ${testimonial.gradient} opacity-20 group-hover:opacity-30 transition-opacity`}>
                                                    <Icon className="w-5 h-5 text-white" />
                                                </div>
                                            </div>

                                            <p className="text-white/80 leading-relaxed mb-4 italic">"{testimonial.text}"</p>

                                            <div className="flex items-center gap-2 pt-4 border-t border-white/10">
                                                <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${testimonial.gradient}`}></div>
                                                <span className="text-sm font-semibold text-white/70">{testimonial.highlight}</span>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>

                        {/* Bottom CTA */}
                        <div className="mt-12 text-center stagger-item" style={{ animationDelay: '0.6s' }}>
                            <div className="inline-flex items-center gap-3 glass-card px-8 py-4">
                                <Heart className="w-5 h-5 text-white/60" />
                                <span className="text-white/80 font-medium">Join thousands of creators building their dreams</span>
                                <ArrowRight className="w-5 h-5 text-white/60" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section - Dramatic */}
            <section className="relative py-24 md:py-32">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <div className="floating-card p-12 md:p-16 glow">
                        <h2 className="text-5xl md:text-6xl font-bold mb-6" style={{ fontFamily: 'var(--font-playfair, "Playfair Display", serif)' }}>
                            <span className="gradient-text">Ready to</span> <span className="text-white">Level Up?</span>
                        </h2>
                        <p className="text-xl text-white/70 mb-10 max-w-2xl mx-auto">
                            Join thousands of creators building the future of content. Start your journey today.
                        </p>
                        <Link href="/auth/signup" className="btn-primary inline-flex items-center gap-2 text-lg px-10 py-5">
                            Get Started Free
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                        <div className="mt-8 flex items-center justify-center gap-6 text-sm text-white/50">
                            <div className="flex items-center gap-2">
                                <Heart className="w-4 h-4" />
                                <span>No credit card</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Zap className="w-4 h-4" />
                                <span>Setup in minutes</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Shield className="w-4 h-4" />
                                <span>Secure & trusted</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="relative py-12 border-t border-white/10">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <p className="text-white/40 text-sm">
                        © 2025 Creator Hub. Building the future of creator collaboration.
                    </p>
                </div>
            </footer>
        </div>
    )
}
