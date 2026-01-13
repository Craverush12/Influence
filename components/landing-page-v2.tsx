'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { 
  Sparkles, Users, Zap, Shield, TrendingUp, ArrowRight, Star, Heart,
  Play, Check, DollarSign, Award, MessageCircle, Eye, ChevronDown, Briefcase
} from 'lucide-react'
import { ThemeToggle } from '@/components/theme-toggle'

export default function LandingPageV2() {
  const [scrollY, setScrollY] = useState(0)
  const heroRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-background dark:bg-black text-foreground antialiased overflow-x-hidden">
      
      {/* ========================================
          PREMIUM NAVIGATION - Floating Glass
          ======================================== */}
      <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrollY > 50 ? 'rgba(6, 7, 10, 0.8)' : 'transparent',
          backdropFilter: scrollY > 50 ? 'blur(20px)' : 'none',
          borderBottom: scrollY > 50 ? '1px solid rgba(255, 255, 255, 0.05)' : 'none'
        }}
      >
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-4 flex justify-between items-center">
          {/* Logo with Warm Amber Brand */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-amber via-brand-coral to-brand-sage flex items-center justify-center relative overflow-hidden">
              <Sparkles className="w-5 h-5 text-white relative z-10" />
              <div className="absolute inset-0 bg-gradient-to-br from-brand-coral to-brand-amber opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
            <span className="text-xl font-display font-bold tracking-tight">Influx</span>
          </Link>

          {/* Navigation Links - Desktop */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Features</Link>
            <Link href="#creators" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">For Creators</Link>
            <Link href="#pricing" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Pricing</Link>
          </div>

          {/* CTA Group */}
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link href="/auth/login" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors hidden sm:block">
              Log in
            </Link>
            <Link 
              href="/auth/signup" 
              className="group relative px-6 py-2.5 rounded-xl bg-gradient-to-r from-brand-amber to-brand-coral text-white font-semibold text-sm overflow-hidden transition-all hover:scale-105 hover:shadow-lg hover:shadow-brand-amber/30"
            >
              <span className="relative z-10">Get Started</span>
              <div className="absolute inset-0 bg-gradient-to-r from-brand-coral to-brand-amber opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>
          </div>
        </div>
      </nav>

      {/* ========================================
          HERO SECTION - Full-Screen Immersive
          ======================================== */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        
        {/* Animated Warm Background - Golden Hour Vibes */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-brand-amber/20 rounded-full blur-[120px] animate-pulse-slow" />
          <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-brand-coral/20 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: '1s' }} />
          <div className="absolute bottom-0 left-1/2 w-[700px] h-[700px] bg-brand-sage/15 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: '2s' }} />
          
          {/* Noise Texture Overlay */}
          <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }} />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-32 text-center">
          
          {/* Social Proof Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/50 backdrop-blur-xl border border-border mb-8 animate-fade-in">
            <div className="flex -space-x-2">
              {[1,2,3,4].map(i => (
                <div key={i} className="w-6 h-6 rounded-full bg-gradient-to-br from-brand-amber to-brand-coral border-2 border-charcoal" />
              ))}
            </div>
            <span className="text-sm font-medium text-foreground">
              <span className="text-brand-amber font-bold">12,847</span> creators joined this month
            </span>
          </div>

          {/* Main Headline - Massive & Bold */}
          <h1 className="font-display font-black tracking-tighter mb-8 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <span className="block text-[clamp(3rem,12vw,10rem)] leading-[0.85] mb-4">
              Turn Followers
            </span>
            <span className="block text-[clamp(3rem,12vw,10rem)] leading-[0.85] bg-gradient-to-r from-brand-amber via-brand-coral to-brand-sage bg-clip-text text-transparent">
              Into Fortune
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-3xl text-muted-foreground font-light max-w-3xl mx-auto mb-12 leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            The platform where <span className="text-foreground font-semibold">serious creators</span> find collaborators, 
            land paid opportunities, and <span className="text-brand-amber font-semibold">build empires</span>.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <Link 
              href="/auth/signup"
              className="group relative px-8 py-4 rounded-2xl bg-gradient-to-r from-brand-amber to-brand-coral text-white font-bold text-lg overflow-hidden transition-all hover:scale-105 hover:shadow-2xl hover:shadow-brand-amber/40 flex items-center gap-3"
            >
              <span className="relative z-10">Start Earning Today</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 bg-gradient-to-r from-brand-coral to-brand-amber opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>
            
            <button className="group px-8 py-4 rounded-2xl bg-card/50 backdrop-blur-xl border border-border text-foreground font-bold text-lg hover:border-brand-amber/50 transition-all flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-brand-amber/20 flex items-center justify-center">
                <Play className="w-4 h-4 text-brand-amber fill-brand-amber ml-0.5" />
              </div>
              Watch Demo
            </button>
          </div>

          {/* Stats Bar - Impressive Numbers */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto p-8 rounded-3xl bg-card/30 backdrop-blur-xl border border-border/50 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            {[
              { value: '$2.4M+', label: 'Paid to Creators', icon: DollarSign },
              { value: '50K+', label: 'Active Members', icon: Users },
              { value: '98%', label: 'Satisfaction', icon: Heart },
              { value: '5K+', label: 'Jobs Posted', icon: Briefcase }
            ].map((stat, i) => {
              const Icon = stat.icon
              return (
                <div key={i} className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Icon className="w-5 h-5 text-brand-amber" />
                    <div className="text-3xl md:text-4xl font-display font-black text-foreground">{stat.value}</div>
                  </div>
                  <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
                </div>
              )
            })}
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce">
            <ChevronDown className="w-6 h-6 text-muted-foreground" />
          </div>
        </div>
      </section>

      {/* ========================================
          FEATURES - Bento Grid Layout
          ======================================== */}
      <section id="features" className="py-32 px-6 lg:px-12 bg-obsidian relative">
        <div className="max-w-[1440px] mx-auto">
          
          {/* Section Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-amber/10 border border-brand-amber/20 mb-6">
              <Sparkles className="w-4 h-4 text-brand-amber" />
              <span className="text-sm font-semibold text-brand-amber">POWERFUL FEATURES</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-display font-black tracking-tight mb-6">
              Everything You Need to
              <br />
              <span className="bg-gradient-to-r from-brand-amber to-brand-coral bg-clip-text text-transparent">Dominate Your Niche</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Stop juggling DMs, spreadsheets, and sketchy payment apps. 
              Your entire creator business, in one place.
            </p>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[280px]">
            
            {/* Feature 1 - Large */}
            <div className="group lg:col-span-2 lg:row-span-2 rounded-3xl bg-gradient-to-br from-charcoal to-graphite border border-border p-8 hover:border-brand-amber/50 transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-amber/10 rounded-full blur-3xl" />
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-brand-amber/20 flex items-center justify-center mb-6">
                    <Zap className="w-7 h-7 text-brand-amber" />
                  </div>
                  <h3 className="text-3xl font-display font-bold mb-4">AI-Powered Matching</h3>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    Our algorithm analyzes your content style, audience, and goals to find 
                    <span className="text-brand-amber font-semibold"> perfect collaboration matches</span>. 
                    No more endless scrolling—just instant connections that grow your reach.
                  </p>
                </div>
                <div className="flex items-center gap-2 text-brand-amber font-semibold group-hover:gap-4 transition-all">
                  Learn more <ArrowRight className="w-5 h-5" />
                </div>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="group rounded-3xl bg-gradient-to-br from-charcoal to-graphite border border-border p-6 hover:border-brand-sage/50 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-brand-sage/20 flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-brand-sage" />
              </div>
              <h3 className="text-xl font-display font-bold mb-2">Secure Escrow</h3>
              <p className="text-muted-foreground text-sm">Get paid safely. Every time. Automatic escrow protects both parties.</p>
            </div>

            {/* Feature 3 */}
            <div className="group rounded-3xl bg-gradient-to-br from-charcoal to-graphite border border-border p-6 hover:border-brand-coral/50 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-brand-coral/20 flex items-center justify-center mb-4">
                <MessageCircle className="w-6 h-6 text-brand-coral" />
              </div>
              <h3 className="text-xl font-display font-bold mb-2">All-in-One Chat</h3>
              <p className="text-muted-foreground text-sm">Stop losing messages. Keep all project conversations organized in one place.</p>
            </div>

            {/* Feature 4 */}
            <div className="group rounded-3xl bg-gradient-to-br from-charcoal to-graphite border border-border p-6 hover:border-brand-amber/50 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-brand-amber/20 flex items-center justify-center mb-4">
                <Award className="w-6 h-6 text-brand-amber" />
              </div>
              <h3 className="text-xl font-display font-bold mb-2">Build Reputation</h3>
              <p className="text-muted-foreground text-sm">Reviews and verified badges that attract premium clients.</p>
            </div>

            {/* Feature 5 */}
            <div className="group rounded-3xl bg-gradient-to-br from-charcoal to-graphite border border-border p-6 hover:border-brand-coral/50 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-brand-coral/20 flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-brand-coral" />
              </div>
              <h3 className="text-xl font-display font-bold mb-2">Growth Analytics</h3>
              <p className="text-muted-foreground text-sm">Track collabs that actually move the needle on your audience growth.</p>
            </div>

            {/* Feature 6 - Large */}
            <div className="group lg:col-span-2 rounded-3xl bg-gradient-to-br from-charcoal to-graphite border border-border p-8 hover:border-brand-sage/50 transition-all duration-300">
              <div className="flex items-start justify-between gap-6">
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-brand-sage/20 flex items-center justify-center mb-6">
                    <Eye className="w-7 h-7 text-brand-sage" />
                  </div>
                  <h3 className="text-2xl font-display font-bold mb-3">Portfolio That Converts</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Showcase your best work with video embeds, case studies, and social proof. 
                    Turn profile views into collaboration requests.
                  </p>
                </div>
                <div className="hidden md:block w-32 h-32 rounded-2xl bg-brand-sage/10 animate-pulse-slow" />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================
          SOCIAL PROOF - Real Creator Stories
          ======================================== */}
      <section className="py-32 px-6 lg:px-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian via-void to-obsidian" />
        
        <div className="relative z-10 max-w-[1440px] mx-auto">
          
          {/* Section Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-aurora-amber text-aurora-amber" />
              ))}
            </div>
            <h2 className="text-5xl md:text-7xl font-display font-black tracking-tight mb-6">
              Creators Making
              <br />
              <span className="bg-gradient-to-r from-brand-amber to-brand-coral bg-clip-text text-transparent">Real Money</span>
            </h2>
            <p className="text-xl text-muted-foreground">Join thousands who've turned collaborations into careers</p>
          </div>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "I landed my first $2,500 editing gig within 48 hours of joining. This platform literally changed my life.",
                author: "Marcus Johnson",
                role: "Video Editor • 45K TikTok",
                avatar: "MJ",
                earnings: "$47K earned",
                gradient: "from-brand-amber to-brand-coral"
              },
              {
                quote: "Finally found creators who match my vibe AND pay on time. The escrow system gives me peace of mind.",
                author: "Sarah Chen",
                role: "Content Creator • 120K Instagram",
                avatar: "SC",
                earnings: "$28K earned",
                gradient: "from-brand-coral to-brand-sage"
              },
              {
                quote: "Built my entire freelance business here. The reputation system helps me charge premium rates now.",
                author: "Alex Rivera",
                role: "Thumbnail Designer • 5-star rated",
                avatar: "AR",
                earnings: "$63K earned",
                gradient: "from-brand-sage to-brand-amber"
              }
            ].map((testimonial, i) => (
              <div key={i} className="group rounded-3xl bg-card border border-border p-8 hover:border-aurora-emerald/50 transition-all duration-300 hover:scale-[1.02]">
                {/* Quote */}
                <div className="mb-6">
                  <Star className="w-5 h-5 fill-aurora-amber text-aurora-amber mb-4" />
                  <p className="text-lg text-foreground leading-relaxed">&ldquo;{testimonial.quote}&rdquo;</p>
                </div>
                
                {/* Author */}
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${testimonial.gradient} flex items-center justify-center font-display font-bold text-white text-lg`}>
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-display font-bold text-foreground">{testimonial.author}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>

                {/* Earnings Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-amber/10 border border-brand-amber/20">
                  <DollarSign className="w-4 h-4 text-brand-amber" />
                  <span className="text-sm font-semibold text-brand-amber">{testimonial.earnings}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================
          FINAL CTA - High Urgency
          ======================================== */}
      <section className="py-32 px-6 lg:px-12 bg-gradient-to-br from-charcoal via-graphite to-charcoal relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-amber/20 rounded-full blur-[150px]" />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-7xl font-display font-black tracking-tight mb-6">
            Ready to Level Up
            <br />
            <span className="bg-gradient-to-r from-brand-amber to-brand-coral bg-clip-text text-transparent">Your Creator Game?</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-12">
            Join 50,000+ creators earning from collaborations. Start free, upgrade when you're ready.
          </p>
          
          {/* Primary CTA */}
          <Link 
            href="/auth/signup"
            className="inline-flex items-center gap-3 px-10 py-5 rounded-2xl bg-gradient-to-r from-brand-amber to-brand-coral text-white font-bold text-xl hover:scale-105 transition-all hover:shadow-2xl hover:shadow-brand-amber/40 mb-8"
          >
            Create Free Account
            <ArrowRight className="w-6 h-6" />
          </Link>

          {/* Trust Signals */}
          <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground">
            {[
              { icon: Check, text: 'Free forever plan' },
              { icon: Check, text: 'No credit card required' },
              { icon: Check, text: 'Setup in 2 minutes' }
            ].map((item, i) => {
              const Icon = item.icon
              return (
                <div key={i} className="flex items-center gap-2">
                  <Icon className="w-5 h-5 text-brand-amber" />
                  <span>{item.text}</span>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ========================================
          FOOTER
          ======================================== */}
      <footer className="py-12 px-6 lg:px-12 border-t border-border bg-obsidian">
        <div className="max-w-[1440px] mx-auto text-center text-sm text-muted-foreground">
          <p>© 2026 Creator Hub. Built by creators, for creators.</p>
        </div>
      </footer>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fade-in-up {
          from { 
            opacity: 0;
            transform: translateY(30px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.05); }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out;
          animation-fill-mode: both;
        }
        .animate-pulse-slow {
          animation: pulse-slow 8s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}
