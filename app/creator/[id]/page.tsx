'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { MessageSquare, ExternalLink, MapPin, Globe, Sparkles, ArrowLeft, Heart, Share2, Star, Users, TrendingUp, Instagram, Twitter, Youtube, Twitch, Music } from 'lucide-react'
import Link from 'next/link'
import { SocialEmbed } from '@/components/social-embed'

export default function CreatorProfilePage() {
  const router = useRouter()
  const params = useParams()
  const [creator, setCreator] = useState<any>(null)
  const [socials, setSocials] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [liked, setLiked] = useState(false)

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (!storedUser) {
      router.push('/auth/login')
      return
    }

    setCurrentUser(JSON.parse(storedUser))
    loadCreator()
  }, [params, router])

  const loadCreator = async () => {
    const supabase = createClient()

    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', params.id as string)
      .single()

    if (!error && data) {
      setCreator(data)

      // Load socials
      const { data: socialsData } = await supabase
        .from('user_socials')
        .select('*')
        .eq('user_id', data.id)

      if (socialsData) {
        setSocials(socialsData)
      }
    }

    setLoading(false)
  }

  const handleMessageClick = async () => {
    if (!currentUser) return

    // Create message in database
    const supabase = createClient()
    await supabase.from('messages').insert({
      sender_id: currentUser.id,
      recipient_id: creator.id,
      content: 'Hi! I found your profile on Creator Hub.',
    })

    router.push(`/messages`)
  }

  if (loading) {
    return (
      <div className="min-h-screen hero-gradient flex items-center justify-center">
        <div className="relative">
          <div className="w-16 h-16 rounded-full border-4 border-purple-500/30 border-t-purple-500 animate-spin"></div>
          <div className="absolute inset-0 w-16 h-16 rounded-full border-4 border-pink-500/30 border-t-pink-500 animate-spin" style={{ animationDelay: '0.15s' }}></div>
        </div>
      </div>
    )
  }

  if (!creator) {
    return (
      <div className="min-h-screen hero-gradient flex items-center justify-center px-4">
        <div className="text-center glass-card p-8">
          <p className="text-white/60 mb-6 text-lg">Creator not found</p>
          <Link href="/explore" className="btn-primary inline-flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Explore
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen hero-gradient relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 nav-glass">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 via-pink-500 to-cyan-500 flex items-center justify-center">
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
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-gradient-to-br from-purple-500 via-pink-500 to-cyan-500 overflow-hidden border-4 border-black shadow-xl">
                  {creator.profile_image_url ? (
                    <img
                      src={creator.profile_image_url || "/placeholder.svg"}
                      alt={creator.display_name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-2xl md:text-3xl">
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
                    <Users className="w-4 h-4 text-purple-400" />
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

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <button
                onClick={() => setLiked(!liked)}
                className={`p-3 md:px-6 md:py-3 rounded-xl transition-all ${
                  liked
                    ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                    : 'btn-secondary'
                }`}
              >
                <Heart className={`w-5 h-5 ${liked ? 'fill-current' : ''}`} />
              </button>
              <button className="btn-secondary p-3 md:px-6 md:py-3">
                <Share2 className="w-5 h-5" />
              </button>
              <button
                onClick={handleMessageClick}
                className="btn-primary flex-1 md:flex-none inline-flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-5 h-5" />
                <span>Message</span>
              </button>
            </div>
          </div>

          {/* Bio */}
          {creator.bio && (
            <div className="mb-8">
              <p className="text-base md:text-lg text-white/80 leading-relaxed">{creator.bio}</p>
            </div>
          )}

          {/* Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
            {creator.location && (
              <div className="flex items-center gap-3 p-4 rounded-xl bg-white/5">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-xs text-white/50 mb-1">Location</p>
                  <p className="text-white font-semibold">{creator.location}</p>
                </div>
              </div>
            )}
            {creator.website && (
              <a
                href={creator.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all group"
              >
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
                  <Globe className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-white/50 mb-1">Website</p>
                  <p className="text-white font-semibold group-hover:text-cyan-400 transition-colors">Visit Site</p>
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
                    switch(platform.toLowerCase()) {
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
                    switch(platform.toLowerCase()) {
                      case 'instagram': return 'from-pink-500 via-purple-500 to-orange-500'
                      case 'twitter': return 'from-blue-400 to-blue-600'
                      case 'youtube': return 'from-red-600 to-red-700'
                      case 'twitch': return 'from-purple-600 to-purple-800'
                      case 'tiktok': return 'from-slate-900 via-pink-500 to-cyan-500'
                      default: return 'from-purple-500 to-pink-500'
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
                <div key={i} className="aspect-square rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 overflow-hidden group cursor-pointer">
                  <div className="w-full h-full bg-gradient-to-br from-purple-500 via-pink-500 to-cyan-500 opacity-50 group-hover:opacity-70 transition-opacity"></div>
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
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 mt-2"></div>
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
    </div>
  )
}
