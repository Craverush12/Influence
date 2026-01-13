'use client'

import Link from 'next/link'
import { MapPin, Star, DollarSign, TrendingUp, MessageCircle } from 'lucide-react'
import { PremiumCard } from '@/components/ui/premium-card'

interface CreatorCardProps {
  creator: {
    id: string
    username: string
    display_name: string | null
    bio: string | null
    location: string | null
    profile_image_url: string | null
    rating?: number
    earnings?: number
    followers?: number
  }
  variant?: 'default' | 'glass' | 'elevated' | 'interactive'
}

export function CreatorCardPremium({ creator, variant = 'interactive' }: CreatorCardProps) {
  return (
    <Link href={`/creator/${creator.id}`} className="block group">
      <PremiumCard 
        variant={variant}
        className="overflow-hidden h-full"
      >
        {/* Card Content */}
        <div className="p-4 sm:p-6">
          {/* Header with Avatar & Info */}
          <div className="flex items-start gap-3 sm:gap-4 mb-4">
            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden border-2 border-primary/20 group-hover:border-primary/50 transition-colors bg-gradient-to-br from-primary/20 to-accent/20">
                {creator.profile_image_url ? (
                  <img 
                    src={creator.profile_image_url} 
                    alt={creator.display_name || creator.username}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-xl sm:text-2xl font-bold text-primary">
                    {(creator.display_name || creator.username)?.[0]?.toUpperCase()}
                  </div>
                )}
              </div>
              {/* Status indicator */}
              <div className="absolute bottom-0 right-0 w-3 h-3 sm:w-4 sm:h-4 bg-green-500 rounded-full border-2 border-card" />
            </div>

            {/* Name & Username */}
            <div className="flex-1 min-w-0">
              <h3 className="font-display font-bold text-base sm:text-lg text-foreground group-hover:text-primary transition-colors truncate">
                {creator.display_name || creator.username}
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground truncate">
                @{creator.username}
              </p>
              
              {/* Location */}
              {creator.location && (
                <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                  <MapPin className="w-3 h-3" />
                  <span className="truncate">{creator.location}</span>
                </div>
              )}
            </div>

            {/* Rating Badge */}
            {creator.rating && (
              <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-primary/10 border border-primary/20 flex-shrink-0">
                <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-primary text-primary" />
                <span className="text-xs sm:text-sm font-bold text-primary">{creator.rating}</span>
              </div>
            )}
          </div>

          {/* Bio */}
          {creator.bio && (
            <p className="text-sm text-muted-foreground line-clamp-2 mb-4 leading-relaxed">
              {creator.bio}
            </p>
          )}

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-4">
            {/* Earnings */}
            {creator.earnings && (
              <div className="flex items-center gap-2 px-2 sm:px-3 py-2 rounded-lg bg-muted/50 dark:bg-muted/20">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <DollarSign className="w-4 h-4 text-primary" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs text-muted-foreground">Earned</div>
                  <div className="text-sm sm:text-base font-bold text-foreground truncate">
                    ${(creator.earnings / 1000).toFixed(1)}K
                  </div>
                </div>
              </div>
            )}

            {/* Followers */}
            {creator.followers && (
              <div className="flex items-center gap-2 px-2 sm:px-3 py-2 rounded-lg bg-muted/50 dark:bg-muted/20">
                <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-4 h-4 text-accent" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs text-muted-foreground">Followers</div>
                  <div className="text-sm sm:text-base font-bold text-foreground truncate">
                    {creator.followers >= 1000 
                      ? `${(creator.followers / 1000).toFixed(1)}K`
                      : creator.followers
                    }
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Skills/Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="px-2 py-1 text-xs font-medium rounded-md bg-primary/10 text-primary border border-primary/20">
              Video Editor
            </span>
            <span className="px-2 py-1 text-xs font-medium rounded-md bg-accent/10 text-accent border border-accent/20">
              Content Creator
            </span>
          </div>

          {/* CTA Button */}
          <button className="w-full px-4 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-all hover:scale-[1.02] flex items-center justify-center gap-2">
            <MessageCircle className="w-4 h-4" />
            Connect
          </button>
        </div>

        {/* Hover Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded-2xl" />
      </PremiumCard>
    </Link>
  )
}
