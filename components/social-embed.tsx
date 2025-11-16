'use client'

import { Instagram, Twitter, Youtube, Twitch, ExternalLink, Music } from 'lucide-react'
import { useState } from 'react'

interface SocialEmbedProps {
  platform: string
  handle: string
  url?: string
}

const PLATFORM_CONFIG = {
  instagram: {
    icon: Instagram,
    gradient: 'from-pink-500 via-purple-500 to-orange-500',
    embedUrl: (handle: string) => `https://www.instagram.com/${handle}/embed`,
  },
  twitter: {
    icon: Twitter,
    gradient: 'from-blue-400 to-blue-600',
    embedUrl: (handle: string) => `https://twitter.com/${handle}`,
  },
  tiktok: {
    icon: Music,
    gradient: 'from-slate-900 via-pink-500 to-cyan-500',
    embedUrl: (handle: string) => `https://www.tiktok.com/@${handle}`,
  },
  youtube: {
    icon: Youtube,
    gradient: 'from-red-600 to-red-700',
    embedUrl: (handle: string) => `https://www.youtube.com/@${handle}`,
  },
  twitch: {
    icon: Twitch,
    gradient: 'from-purple-600 to-purple-800',
    embedUrl: (handle: string) => `https://www.twitch.tv/${handle}`,
  },
}

export function SocialEmbed({ platform, handle, url }: SocialEmbedProps) {
  const [showEmbed, setShowEmbed] = useState(false)
  const config = PLATFORM_CONFIG[platform as keyof typeof PLATFORM_CONFIG]
  const Icon = config?.icon || ExternalLink

  if (!config) return null

  // For now, show a preview card that links to the social profile
  // Full embeds require API keys and proper authentication
  return (
    <div className="glass-card p-6 hover:scale-105 transition-all duration-300 group cursor-pointer">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${config.gradient} flex items-center justify-center shadow-lg`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-white capitalize">{platform}</h3>
            <p className="text-sm text-white/60">@{handle}</p>
          </div>
        </div>
        <a
          href={url || config.embedUrl(handle)}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
        >
          <ExternalLink className="w-5 h-5 text-white/60" />
        </a>
      </div>

      {/* Preview Area */}
      <div className="relative aspect-video rounded-xl overflow-hidden bg-gradient-to-br from-black/20 to-black/40">
        <div className={`absolute inset-0 bg-gradient-to-br ${config.gradient} opacity-20`}></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <Icon className="w-12 h-12 text-white/40 mx-auto mb-2" />
            <p className="text-white/60 text-sm font-medium">@{handle}</p>
            <p className="text-white/40 text-xs mt-1">Click to view on {platform}</p>
          </div>
        </div>
      </div>

      {/* Stats Placeholder */}
      <div className="mt-4 flex items-center justify-between text-sm">
        <div className="flex items-center gap-4">
          <div>
            <p className="text-white/40 text-xs">Recent Posts</p>
            <p className="text-white font-semibold">--</p>
          </div>
          <div>
            <p className="text-white/40 text-xs">Engagement</p>
            <p className="text-white font-semibold">--</p>
          </div>
        </div>
        <button
          onClick={() => window.open(url || config.embedUrl(handle), '_blank')}
          className="text-xs font-semibold text-white/60 hover:text-white transition-colors"
        >
          View Profile →
        </button>
      </div>
    </div>
  )
}

// Instagram-specific embed component (requires Instagram Basic Display API)
export function InstagramEmbed({ username }: { username: string }) {
  // Note: Instagram embeds require API access
  // For now, we'll show a link to the profile
  return (
    <div className="glass-card p-6">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 via-purple-500 to-orange-500 flex items-center justify-center">
          <Instagram className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="font-bold text-white">Instagram</h3>
          <p className="text-sm text-white/60">@{username}</p>
        </div>
      </div>
      <a
        href={`https://instagram.com/${username}`}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-primary w-full inline-flex items-center justify-center gap-2"
      >
        View Instagram Profile
        <ExternalLink className="w-4 h-4" />
      </a>
    </div>
  )
}

// YouTube embed component
export function YouTubeEmbed({ channelId, channelHandle }: { channelId?: string; channelHandle?: string }) {
  const embedUrl = channelId 
    ? `https://www.youtube.com/embed?listType=user_uploads&list=${channelId}`
    : channelHandle
    ? `https://www.youtube.com/@${channelHandle}`
    : null

  if (!embedUrl) return null

  return (
    <div className="glass-card p-6">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center">
          <Youtube className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="font-bold text-white">YouTube</h3>
          <p className="text-sm text-white/60">@{channelHandle || 'channel'}</p>
        </div>
      </div>
      <div className="aspect-video rounded-xl overflow-hidden bg-black">
        <iframe
          src={embedUrl}
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  )
}

// TikTok embed component
export function TikTokEmbed({ username }: { username: string }) {
  return (
    <div className="glass-card p-6">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-slate-900 via-pink-500 to-cyan-500 flex items-center justify-center">
          <Music className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="font-bold text-white">TikTok</h3>
          <p className="text-sm text-white/60">@{username}</p>
        </div>
      </div>
      <a
        href={`https://tiktok.com/@${username}`}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-primary w-full inline-flex items-center justify-center gap-2"
      >
        View TikTok Profile
        <ExternalLink className="w-4 h-4" />
      </a>
    </div>
  )
}

