'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { calculateAura } from '@/lib/aura'
import { Heart, X, Sparkles, Zap, MapPin, Star } from 'lucide-react'
import Link from 'next/link'

export default function AuraMatchPage() {
    const [profiles, setProfiles] = useState<any[]>([])
    const [currentIndex, setCurrentIndex] = useState(0)
    const [loading, setLoading] = useState(true)
    const [matchAnimation, setMatchAnimation] = useState<'left' | 'right' | null>(null)

    useEffect(() => {
        const fetchProfiles = async () => {
            const supabase = createClient()
            const { data } = await supabase.from('users').select('*').limit(10)

            if (data) {
                // Add aura data to each profile
                const enhancedProfiles = data.map(p => ({
                    ...p,
                    aura: calculateAura(p)
                }))
                setProfiles(enhancedProfiles)
            }
            setLoading(false)
        }

        fetchProfiles()
    }, [])

    const handleSwipe = (direction: 'left' | 'right') => {
        setMatchAnimation(direction)
        setTimeout(() => {
            setMatchAnimation(null)
            setCurrentIndex(prev => prev + 1)
        }, 300)
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center hero-gradient">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
            </div>
        )
    }

    if (currentIndex >= profiles.length) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center hero-gradient text-center px-4">
                <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center mb-6 animate-bounce">
                    <Sparkles className="w-10 h-10 text-yellow-400" />
                </div>
                <h2 className="text-3xl font-bold text-white mb-4">That's everyone for now!</h2>
                <p className="text-white/60 mb-8">Check back later for more vibe matches.</p>
                <button
                    onClick={() => setCurrentIndex(0)}
                    className="btn-primary"
                >
                    Start Over
                </button>
            </div>
        )
    }

    const currentProfile = profiles[currentIndex]

    return (
        <div className="min-h-screen hero-gradient overflow-hidden flex flex-col">
            {/* Header */}
            <nav className="p-6 flex justify-between items-center">
                <Link href="/" className="text-2xl font-black gradient-text flex items-center gap-2">
                    <Zap className="w-6 h-6 text-yellow-400 fill-yellow-400" />
                    Aura Match
                </Link>
                <div className="px-4 py-2 rounded-full bg-white/10 text-sm font-medium text-white">
                    {profiles.length - currentIndex} matches left
                </div>
            </nav>

            {/* Card Stack */}
            <div className="flex-1 flex items-center justify-center p-4 relative">
                {/* Background Elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-1/4 left-0 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-1/4 right-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl"></div>
                </div>

                <div
                    className={`
            relative w-full max-w-md aspect-[3/4] md:aspect-[4/5] glass-card overflow-hidden shadow-2xl transition-transform duration-300
            ${matchAnimation === 'left' ? '-translate-x-[150%] rotate-[-20deg] opacity-0' : ''}
            ${matchAnimation === 'right' ? 'translate-x-[150%] rotate-[20deg] opacity-0' : ''}
          `}
                >
                    {/* Image */}
                    <div className="absolute inset-0">
                        {currentProfile.profile_image_url ? (
                            <img
                                src={currentProfile.profile_image_url}
                                alt={currentProfile.display_name}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full bg-zinc-800 flex items-center justify-center">
                                <span className="text-6xl font-bold text-white/10">
                                    {currentProfile.display_name?.[0]}
                                </span>
                            </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
                    </div>

                    {/* Vibe Badge */}
                    <div className="absolute top-6 right-6">
                        <div className="px-4 py-2 rounded-full backdrop-blur-md bg-black/30 border border-white/20 flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-yellow-400" />
                            <span className="text-white font-bold text-sm uppercase tracking-wider">
                                {currentProfile.aura.vibe}
                            </span>
                        </div>
                    </div>

                    {/* Match Score */}
                    <div className="absolute top-6 left-6">
                        <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center border-4 border-black shadow-xl">
                            <span className="text-white font-black text-sm">{currentProfile.aura.matchScore}%</span>
                        </div>
                    </div>

                    {/* Info */}
                    <div className="absolute bottom-0 left-0 right-0 p-8">
                        <h2 className="text-4xl font-black text-white mb-2 shadow-black drop-shadow-lg">
                            {currentProfile.display_name}
                        </h2>
                        <p className="text-white/80 text-lg mb-4 line-clamp-2 drop-shadow-md">
                            {currentProfile.bio || "No bio yet, but the vibes are immaculate."}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-6">
                            {currentProfile.aura.keywords.map((keyword: string, i: number) => (
                                <span key={i} className="px-3 py-1 rounded-lg bg-white/20 text-white text-xs font-bold backdrop-blur-sm">
                                    #{keyword}
                                </span>
                            ))}
                            {currentProfile.location && (
                                <span className="px-3 py-1 rounded-lg bg-white/20 text-white text-xs font-bold backdrop-blur-sm flex items-center gap-1">
                                    <MapPin className="w-3 h-3" /> {currentProfile.location}
                                </span>
                            )}
                        </div>

                        {/* Actions */}
                        <div className="flex justify-center gap-6">
                            <button
                                onClick={() => handleSwipe('left')}
                                className="w-16 h-16 rounded-full bg-zinc-900 border border-zinc-700 flex items-center justify-center hover:scale-110 hover:bg-red-500/20 hover:border-red-500 transition-all group"
                            >
                                <X className="w-8 h-8 text-white/40 group-hover:text-red-500 transition-colors" />
                            </button>

                            <Link href={`/creator/${currentProfile.id}`} className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all">
                                <Star className="w-6 h-6 text-white" />
                            </Link>

                            <button
                                onClick={() => handleSwipe('right')}
                                className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center hover:scale-110 hover:bg-green-400 transition-all shadow-lg shadow-green-500/20"
                            >
                                <Heart className="w-8 h-8 fill-current" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
