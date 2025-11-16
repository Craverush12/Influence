'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Plus, X, Instagram, Twitter, Youtube, Twitch, ExternalLink, Sparkles, ArrowRight, CheckCircle, Music } from 'lucide-react'
import Link from 'next/link'

const SOCIAL_PLATFORMS = [
  { 
    id: 'instagram', 
    name: 'Instagram', 
    icon: Instagram, 
    gradient: 'from-white/20 via-white/10 to-white/20',
    placeholder: '@yourhandle',
    example: 'https://instagram.com/yourhandle'
  },
  { 
    id: 'twitter', 
    name: 'Twitter / X', 
    icon: Twitter, 
    gradient: 'from-white/20 to-white/10',
    placeholder: '@yourhandle',
    example: 'https://twitter.com/yourhandle'
  },
  { 
    id: 'tiktok', 
    name: 'TikTok', 
    icon: Music, 
    gradient: 'from-white/20 via-white/10 to-white/20',
    placeholder: '@yourhandle',
    example: 'https://tiktok.com/@yourhandle'
  },
  { 
    id: 'youtube', 
    name: 'YouTube', 
    icon: Youtube, 
    gradient: 'from-white/20 to-white/10',
    placeholder: '@yourchannel',
    example: 'https://youtube.com/@yourchannel'
  },
  { 
    id: 'twitch', 
    name: 'Twitch', 
    icon: Twitch, 
    gradient: 'from-white/20 to-white/10',
    placeholder: 'yourchannel',
    example: 'https://twitch.tv/yourchannel'
  },
]

export default function SocialsPage() {
  const router = useRouter()
  const [socials, setSocials] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [adding, setAdding] = useState(false)
  const [newSocial, setNewSocial] = useState({ platform: '', handle: '', url: '' })
  const [error, setError] = useState('')
  const [userId, setUserId] = useState('')

  useEffect(() => {
    const loadSocials = async () => {
      const user = JSON.parse(localStorage.getItem('user') || '{}')
      if (!user.id) {
        router.push('/auth/login')
        return
      }

      setUserId(user.id)
      const supabase = createClient()

      const { data, error: fetchError } = await supabase
        .from('user_socials')
        .select('*')
        .eq('user_id', user.id)

      if (!fetchError && data) {
        setSocials(data)
      }
      setLoading(false)
    }

    loadSocials()
  }, [router])

  const handleAddSocial = async () => {
    if (!newSocial.platform || !newSocial.handle) {
      setError('Please select a platform and enter a handle')
      return
    }

    const supabase = createClient()

    // Auto-generate URL if not provided
    let url = newSocial.url
    if (!url && newSocial.handle) {
      const platform = SOCIAL_PLATFORMS.find(p => p.id === newSocial.platform)
      if (platform) {
        url = platform.example.replace('yourhandle', newSocial.handle.replace('@', ''))
      }
    }

    try {
      const { data, error: insertError } = await supabase
        .from('user_socials')
        .insert({
          user_id: userId,
          platform: newSocial.platform,
          handle: newSocial.handle.replace('@', ''),
          url: url,
        })
        .select()

      if (insertError) throw insertError

      setSocials([...socials, data[0]])
      setNewSocial({ platform: '', handle: '', url: '' })
      setAdding(false)
      setError('')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add social')
    }
  }

  const handleDeleteSocial = async (id: string) => {
    const supabase = createClient()

    try {
      const { error: deleteError } = await supabase
        .from('user_socials')
        .delete()
        .eq('id', id)

      if (deleteError) throw deleteError

      setSocials(socials.filter((s) => s.id !== id))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete social')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen hero-gradient flex items-center justify-center">
        <div className="relative">
          <div className="w-16 h-16 rounded-full border-4 border-white/20 border-t-white/60 animate-spin"></div>
          <div className="absolute inset-0 w-16 h-16 rounded-full border-4 border-white/10 border-t-white/40 animate-spin" style={{ animationDelay: '0.15s' }}></div>
        </div>
      </div>
    )
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
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold gradient-text hidden sm:inline">Creator Hub</span>
          </Link>
          <Link href="/dashboard" className="text-white/70 hover:text-white transition-colors text-sm md:text-base">
            Back to Dashboard
          </Link>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 relative z-10">
        {/* Header */}
        <div className="mb-12 fade-in">
          <h1 className="text-4xl md:text-5xl font-black mb-4 gradient-text">
            Connect Your Socials
          </h1>
          <p className="text-lg md:text-xl text-white/60">
            Link your social media accounts to showcase your reach and connect with collaborators
          </p>
        </div>

        <div className="glass-card p-6 md:p-10 fade-in">
          {/* Connected Socials */}
          {socials.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-6">Connected Accounts</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {socials.map((social) => {
                  const platform = SOCIAL_PLATFORMS.find((p) => p.id === social.platform)
                  const Icon = platform?.icon || ExternalLink
                  return (
                    <div
                      key={social.id}
                      className="glass-card p-5 group hover:scale-105 transition-all duration-300 relative overflow-hidden"
                    >
                      {/* Gradient background on hover */}
                      <div className={`absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-opacity`}></div>
                      
                      <div className="relative z-10 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className={`w-14 h-14 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center shadow-lg`}>
                            <Icon className="w-7 h-7 text-white" />
                          </div>
                          <div>
                            <p className="font-bold text-white mb-1">{platform?.name || social.platform}</p>
                            <p className="text-sm text-white/60">@{social.handle}</p>
                            {social.followers_count && (
                              <p className="text-xs text-white/40 mt-1">{social.followers_count.toLocaleString()} followers</p>
                            )}
                          </div>
                        </div>
                        <button
                          onClick={() => handleDeleteSocial(social.id)}
                          className="p-2 rounded-lg bg-white/5 hover:bg-red-500/20 text-white/40 hover:text-red-400 transition-all"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                      
                      {social.url && (
                        <a
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="absolute inset-0 z-20"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <span className="sr-only">Visit {platform?.name}</span>
                        </a>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Add New Social */}
          {!adding ? (
            <button
              onClick={() => setAdding(true)}
              className="w-full py-4 px-6 rounded-xl border-2 border-dashed border-white/20 text-white/60 hover:border-white/40 hover:text-white transition-all flex items-center justify-center gap-3 font-semibold group"
            >
              <div className="w-10 h-10 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Plus className="w-5 h-5 text-white" />
              </div>
              <span>Add Social Account</span>
            </button>
          ) : (
            <div className="glass-card p-6 space-y-5 fade-in">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-white">Add New Account</h3>
                <button
                  onClick={() => {
                    setAdding(false)
                    setNewSocial({ platform: '', handle: '', url: '' })
                    setError('')
                  }}
                  className="p-2 rounded-lg hover:bg-white/5 transition-colors"
                >
                  <X className="w-5 h-5 text-white/60" />
                </button>
              </div>

              <div>
                <label className="block text-sm font-semibold text-white/90 mb-2">
                  Platform
                </label>
                <select
                  value={newSocial.platform}
                  onChange={(e) => setNewSocial({ ...newSocial, platform: e.target.value })}
                  className="input-modern w-full"
                >
                  <option value="">Select a platform</option>
                  {SOCIAL_PLATFORMS.map((platform) => (
                    <option key={platform.id} value={platform.id}>
                      {platform.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-white/90 mb-2">
                  Handle
                </label>
                <input
                  type="text"
                  value={newSocial.handle}
                  onChange={(e) => setNewSocial({ ...newSocial, handle: e.target.value })}
                  className="input-modern w-full"
                  placeholder={newSocial.platform ? SOCIAL_PLATFORMS.find(p => p.id === newSocial.platform)?.placeholder : 'your_handle'}
                />
                <p className="text-xs text-white/40 mt-2">
                  Enter your handle (e.g., @username or username)
                </p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-white/90 mb-2">
                  Profile URL <span className="text-white/40">(optional)</span>
                </label>
                <input
                  type="url"
                  value={newSocial.url}
                  onChange={(e) => setNewSocial({ ...newSocial, url: e.target.value })}
                  className="input-modern w-full"
                  placeholder="https://..."
                />
                <p className="text-xs text-white/40 mt-2">
                  We'll auto-generate this if you leave it blank
                </p>
              </div>

              {error && (
                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                  {error}
                </div>
              )}

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => {
                    setAdding(false)
                    setNewSocial({ platform: '', handle: '', url: '' })
                    setError('')
                  }}
                  className="btn-secondary flex-1"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddSocial}
                  className="btn-primary flex-1 inline-flex items-center justify-center gap-2"
                >
                  <CheckCircle className="w-4 h-4" />
                  Add Account
                </button>
              </div>
            </div>
          )}

          {/* Continue Button */}
          <div className="mt-8 pt-6 border-t border-white/10">
            <Link
              href="/dashboard"
              className="btn-primary w-full inline-flex items-center justify-center gap-2"
            >
              Go to Dashboard
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
