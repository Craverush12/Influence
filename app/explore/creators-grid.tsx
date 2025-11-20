'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Search, Heart, MessageSquare, Star, ArrowRight, MapPin, Filter } from 'lucide-react'
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

    useEffect(() => {
        setCreators(initialCreators)
    }, [initialCreators])

    useEffect(() => {
        const timer = setTimeout(() => {
            const params = new URLSearchParams(searchParams.toString())
            if (searchTerm) params.set('q', searchTerm)
            else params.delete('q')
            if (locationFilter) params.set('location', locationFilter)
            else params.delete('location')
            router.push(`/explore?${params.toString()}`)
        }, 500)
        return () => clearTimeout(timer)
    }, [searchTerm, locationFilter, router, searchParams])

    const toggleLike = (creatorId: string) => {
        const newLiked = new Set(liked)
        if (newLiked.has(creatorId)) newLiked.delete(creatorId)
        else newLiked.add(creatorId)
        setLiked(newLiked)
    }

    return (
        <>
            {/* Header & Search */}
            <div className="mb-12 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="text-center max-w-2xl mx-auto">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">
                        Discover <span className="text-primary">Creators</span>
                    </h1>
                    <p className="text-lg text-muted-foreground">
                        Find amazing collaborators in our community. Connect, create, and grow together.
                    </p>
                </div>

                <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-2 max-w-3xl mx-auto shadow-sm flex flex-col md:flex-row gap-2">
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search by name or bio..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-transparent border-none focus:ring-0 pl-12 pr-4 py-3 text-foreground placeholder:text-muted-foreground"
                        />
                    </div>
                    <div className="h-px md:h-auto md:w-px bg-border mx-2"></div>
                    <div className="relative md:w-1/3">
                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Location..."
                            value={locationFilter}
                            onChange={(e) => setLocationFilter(e.target.value)}
                            className="w-full bg-transparent border-none focus:ring-0 pl-12 pr-4 py-3 text-foreground placeholder:text-muted-foreground"
                        />
                    </div>
                </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {creators.map((creator, i) => (
                    <Link
                        key={creator.id}
                        href={`/creator/${creator.id}`}
                        className="group relative bg-card hover:bg-accent/5 border border-border rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-primary/20"
                    >
                        {/* Cover */}
                        <div className="h-48 relative overflow-hidden bg-muted">
                            {creator.cover_image_url ? (
                                <img
                                    src={creator.cover_image_url}
                                    alt="cover"
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                            ) : (
                                <div className="w-full h-full bg-gradient-to-br from-primary/5 to-primary/10"></div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>

                            <button
                                onClick={(e) => {
                                    e.preventDefault()
                                    e.stopPropagation()
                                    toggleLike(creator.id)
                                }}
                                className={`absolute top-4 right-4 p-2 rounded-full backdrop-blur-md transition-all ${liked.has(creator.id)
                                        ? 'bg-red-500/10 text-red-500'
                                        : 'bg-background/50 text-muted-foreground hover:bg-background hover:text-foreground'
                                    }`}
                            >
                                <Heart className={`w-5 h-5 ${liked.has(creator.id) ? 'fill-current' : ''}`} />
                            </button>
                        </div>

                        {/* Profile Info */}
                        <div className="p-6 pt-0 relative">
                            <div className="absolute -top-12 left-6">
                                <div className="w-24 h-24 rounded-2xl border-4 border-background bg-muted overflow-hidden shadow-sm group-hover:scale-105 transition-transform duration-300">
                                    {creator.profile_image_url ? (
                                        <img
                                            src={creator.profile_image_url}
                                            alt={creator.display_name}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-2xl font-bold text-muted-foreground bg-muted">
                                            {(creator.display_name || creator.username)?.[0]?.toUpperCase()}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="mt-14">
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                                            {creator.display_name || creator.username}
                                        </h3>
                                        <p className="text-sm text-muted-foreground font-medium">@{creator.username}</p>
                                    </div>
                                    <div className="flex items-center gap-1 bg-primary/5 px-2 py-1 rounded-lg">
                                        <Star className="w-3.5 h-3.5 fill-primary text-primary" />
                                        <span className="text-sm font-bold text-primary">4.9</span>
                                    </div>
                                </div>

                                {creator.bio && (
                                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4 leading-relaxed">
                                        {creator.bio}
                                    </p>
                                )}

                                <div className="flex items-center justify-between pt-4 border-t border-border/50">
                                    {creator.location ? (
                                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                            <MapPin className="w-3.5 h-3.5" />
                                            {creator.location}
                                        </div>
                                    ) : (
                                        <div></div>
                                    )}

                                    <div className="flex gap-2">
                                        <button
                                            className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                                            onClick={(e) => {
                                                e.preventDefault()
                                                e.stopPropagation()
                                                router.push(`/messages?user=${creator.id}`)
                                            }}
                                        >
                                            <MessageSquare className="w-4 h-4" />
                                        </button>
                                        <div className="p-2 rounded-lg bg-primary/10 text-primary">
                                            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            {creators.length === 0 && (
                <div className="text-center py-20">
                    <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                        <Search className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-medium text-foreground mb-2">No creators found</h3>
                    <p className="text-muted-foreground mb-6">Try adjusting your search or filters</p>
                    <button
                        onClick={() => {
                            setSearchTerm('')
                            setLocationFilter('')
                        }}
                        className="btn-secondary"
                    >
                        Clear Search
                    </button>
                </div>
            )}
        </>
    )
}
