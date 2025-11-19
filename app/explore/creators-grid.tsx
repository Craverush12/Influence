'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Search, Heart, MessageSquare, Star, ArrowRight, MapPin } from 'lucide-react'
import Link from 'next/link'

interface Creator {
    id: string
    username: string
    display_name: string
    bio: string
    profile_image_url: string
    cover_image_url: string
    location?: string
}

interface CreatorsGridProps {
    initialCreators: Creator[]
}

export default function CreatorsGrid({ initialCreators }: CreatorsGridProps) {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [creators, setCreators] = useState<Creator[]>(initialCreators)
    const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '')
    const [locationFilter, setLocationFilter] = useState(searchParams.get('location') || '')
    const [liked, setLiked] = useState(new Set<string>())

    // Update creators when initialCreators prop changes (which happens when server re-renders)
    useEffect(() => {
        setCreators(initialCreators)
    }, [initialCreators])

    // Debounce search URL updates
    useEffect(() => {
        const timer = setTimeout(() => {
            const params = new URLSearchParams(searchParams.toString())

            if (searchTerm) {
                params.set('q', searchTerm)
            } else {
                params.delete('q')
            }

            if (locationFilter) {
                params.set('location', locationFilter)
            } else {
                params.delete('location')
            }

            router.push(`/explore?${params.toString()}`)
        }, 500)

        return () => clearTimeout(timer)
    }, [searchTerm, locationFilter, router, searchParams])

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
        <>
            {/* Header */}
            <div className="mb-12 fade-in">
                <h1 className="text-5xl md:text-6xl font-black mb-4">
                    <span className="gradient-text">Discover</span> <span className="text-white">Creators</span>
                </h1>
                <p className="text-xl text-white/60 mb-8">Find amazing collaborators in our community</p>

                {/* Search Bar & Filters */}
                <div className="flex flex-col md:flex-row gap-4 max-w-4xl">
                    <div className="relative flex-1">
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                        <input
                            type="text"
                            placeholder="Search creators by name, bio..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="input-modern w-full pl-14 pr-5"
                        />
                    </div>
                    <div className="relative md:w-64">
                        <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                        <input
                            type="text"
                            placeholder="Filter by location..."
                            value={locationFilter}
                            onChange={(e) => setLocationFilter(e.target.value)}
                            className="input-modern w-full pl-14 pr-5"
                        />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {creators.map((creator, i) => (
                    <Link
                        key={creator.id}
                        href={`/creator/${creator.id}`}
                        className="floating-card overflow-hidden stagger-item group cursor-pointer block"
                        style={{ animationDelay: `${i * 0.1}s` }}
                    >
                        {/* Cover Image with Gradient Overlay */}
                        <div className="w-full h-40 bg-white/5 overflow-hidden relative">
                            {creator.cover_image_url ? (
                                <img
                                    src={creator.cover_image_url || "/placeholder.svg"}
                                    alt="cover"
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                            ) : (
                                <div className="w-full h-full bg-white/5"></div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

                            {/* Like Button - Floating */}
                            <button
                                onClick={(e) => {
                                    e.preventDefault()
                                    e.stopPropagation()
                                    toggleLike(creator.id)
                                }}
                                className={`absolute top-4 right-4 p-2.5 rounded-xl backdrop-blur-md transition-all z-20 ${liked.has(creator.id)
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
                                    <div className="w-20 h-20 rounded-2xl bg-white/10 border-4 border-black shadow-2xl group-hover:scale-110 transition-transform duration-300 overflow-hidden">
                                        {creator.profile_image_url ? (
                                            <img
                                                src={creator.profile_image_url || "/placeholder.svg"}
                                                alt={creator.display_name}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-white/10 flex items-center justify-center text-white font-light text-2xl">
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
                                    <h3 className="text-xl font-light text-white mb-1 transition-all">
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
                            <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-all duration-500 rounded-2xl pointer-events-none"></div>
                        </div>
                    </Link>
                ))}
            </div>

            {creators.length === 0 && (
                <div className="text-center py-20 fade-in">
                    <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-6">
                        <Search className="w-10 h-10 text-white/40" />
                    </div>
                    <p className="text-white/60 mb-6 text-lg">No creators found matching your search</p>
                    <button
                        onClick={() => {
                            setSearchTerm('')
                            setLocationFilter('')
                        }}
                        className="btn-secondary inline-flex items-center gap-2"
                    >
                        Clear Search
                    </button>
                </div>
            )}
        </>
    )
}
