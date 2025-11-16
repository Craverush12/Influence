'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Search, Heart, MessageSquare, Star, Sparkles, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function ExplorePage() {
  const router = useRouter()
  const [creators, setCreators] = useState<any[]>([])
  const [filteredCreators, setFilteredCreators] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [liked, setLiked] = useState(new Set<string>())

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (!storedUser) {
      router.push('/auth/login')
      return
    }

    loadCreators()
  }, [router])

  const loadCreators = async () => {
    const supabase = createClient()

    const { data, error } = await supabase
      .from('users')
      .select('*')
      .limit(20)

    if (!error && data) {
      setCreators(data)
      setFilteredCreators(data)
    }
    setLoading(false)
  }

  const handleSearch = (term: string) => {
    setSearchTerm(term)
    const filtered = creators.filter(
      (creator) =>
        creator.display_name?.toLowerCase().includes(term.toLowerCase()) ||
        creator.username?.toLowerCase().includes(term.toLowerCase()) ||
        creator.bio?.toLowerCase().includes(term.toLowerCase())
    )
    setFilteredCreators(filtered)
  }

  const toggleLike = (creatorId: string) => {
    const newLiked = new Set(liked)
    if (newLiked.has(creatorId)) {
      newLiked.delete(creatorId)
    } else {
      newLiked.add(creatorId)
    }
    setLiked(newLiked)
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
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 via-pink-500 to-cyan-500 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold gradient-text">Creator Hub</span>
          </Link>
          <Link
            href="/dashboard"
            className="px-4 py-2 text-white/70 hover:text-white transition-colors rounded-lg hover:bg-white/5"
          >
            Dashboard
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12 relative z-10">
        {/* Header */}
        <div className="mb-12 fade-in">
          <h1 className="text-5xl md:text-6xl font-black mb-4">
            <span className="gradient-text">Discover</span> <span className="text-white">Creators</span>
          </h1>
          <p className="text-xl text-white/60 mb-8">Find amazing collaborators in our community</p>

          {/* Search Bar */}
          <div className="relative max-w-2xl">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
            <input
              type="text"
              placeholder="Search creators by name, bio..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="input-modern w-full pl-14 pr-5"
            />
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="relative">
              <div className="w-16 h-16 rounded-full border-4 border-purple-500/30 border-t-purple-500 animate-spin"></div>
              <div className="absolute inset-0 w-16 h-16 rounded-full border-4 border-pink-500/30 border-t-pink-500 animate-spin" style={{ animationDelay: '0.15s' }}></div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCreators.map((creator, i) => (
              <Link
                key={creator.id}
                href={`/creator/${creator.id}`}
                className="floating-card overflow-hidden stagger-item group cursor-pointer block"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                {/* Cover Image with Gradient Overlay */}
                <div className="w-full h-40 bg-gradient-to-br from-purple-500 via-pink-500 to-cyan-500 overflow-hidden relative">
                  {creator.cover_image_url ? (
                    <img
                      src={creator.cover_image_url || "/placeholder.svg"}
                      alt="cover"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-purple-500 via-pink-500 to-cyan-500"></div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                  
                  {/* Like Button - Floating */}
                  <button
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      toggleLike(creator.id)
                    }}
                    className={`absolute top-4 right-4 p-2.5 rounded-xl backdrop-blur-md transition-all z-20 ${
                      liked.has(creator.id)
                        ? 'bg-red-500/30 text-red-400 border border-red-500/50'
                        : 'bg-black/30 text-white/70 border border-white/20 hover:bg-red-500/20 hover:text-red-400 hover:border-red-500/50'
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${liked.has(creator.id) ? 'fill-current' : ''}`} />
                  </button>
                </div>

                <div className="p-6 relative">
                  {/* Profile Avatar - Floating */}
                  <div className="absolute -top-12 left-6 z-10">
                    <div className="relative">
                      <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500 via-pink-500 to-cyan-500 overflow-hidden border-4 border-black shadow-2xl group-hover:scale-110 transition-transform duration-300">
                        {creator.profile_image_url ? (
                          <img
                            src={creator.profile_image_url || "/placeholder.svg"}
                            alt={creator.display_name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-black text-2xl">
                            {(creator.display_name || creator.username)?.[0]?.toUpperCase()}
                          </div>
                        )}
                      </div>
                      {/* Online Status Indicator */}
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-4 border-black"></div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="pt-12">
                    {/* Name & Username */}
                    <div className="mb-4">
                      <h3 className="text-xl font-black text-white mb-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 transition-all">
                        {creator.display_name || creator.username}
                      </h3>
                      <p className="text-sm text-white/50 font-medium">@{creator.username}</p>
                    </div>

                    {/* Bio */}
                    {creator.bio && (
                      <p className="text-sm text-white/70 line-clamp-2 mb-4 leading-relaxed">
                        {creator.bio}
                      </p>
                    )}

                    {/* Stats Row */}
                    <div className="flex items-center gap-4 mb-4 pb-4 border-b border-white/10">
                      <div className="flex items-center gap-1.5">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-bold text-white">4.9</span>
                        <span className="text-xs text-white/40">(24)</span>
                      </div>
                      {creator.location && (
                        <div className="flex items-center gap-1.5">
                          <div className="w-1 h-1 rounded-full bg-white/40"></div>
                          <span className="text-xs text-white/50">{creator.location}</span>
                        </div>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                      <span className="flex-1 btn-primary text-sm inline-flex items-center justify-center gap-2 group-hover:scale-105 transition-transform pointer-events-none">
                        View Profile
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                      <button
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          // Handle message click - navigate to messages
                          router.push(`/messages?user=${creator.id}`)
                        }}
                        className="p-3 rounded-xl bg-white/5 text-white/70 hover:bg-white/10 hover:text-white transition-all group-hover:scale-105"
                      >
                        <MessageSquare className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Hover Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 via-pink-500/0 to-cyan-500/0 group-hover:from-purple-500/10 group-hover:via-pink-500/10 group-hover:to-cyan-500/10 transition-all duration-500 rounded-2xl pointer-events-none"></div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {!loading && filteredCreators.length === 0 && (
          <div className="text-center py-20 fade-in">
            <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-6">
              <Search className="w-10 h-10 text-white/40" />
            </div>
            <p className="text-white/60 mb-6 text-lg">No creators found matching your search</p>
            <button
              onClick={() => handleSearch('')}
              className="btn-secondary inline-flex items-center gap-2"
            >
              Clear Search
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
