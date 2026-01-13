'use client'

import Link from 'next/link'
import { Clock, Users, MapPin, DollarSign, Bookmark, TrendingUp, Zap } from 'lucide-react'
import { PremiumCard } from '@/components/ui/premium-card'
import { cn } from '@/lib/utils'

interface Job {
  id: string
  title: string
  description: string
  budget: number
  status: string
  created_at: string
  required_skills?: string[]
  creator?: {
    display_name?: string
    username?: string
    profile_image_url?: string
  }
}

interface PremiumJobCardProps {
  job: Job
  isBookmarked?: boolean
  onBookmarkToggle?: (jobId: string) => void
  showUrgency?: boolean
  className?: string
}

export default function PremiumJobCard({
  job,
  isBookmarked = false,
  onBookmarkToggle,
  showUrgency = false,
  className,
}: PremiumJobCardProps) {
  const timeAgo = new Date(job.created_at).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })

  const applicantsCount = Math.floor(Math.random() * 15) + 1 // Mock data
  const isHot = showUrgency && applicantsCount < 5

  return (
    <PremiumCard
      variant="interactive"
      color={isHot ? "coral" : "amber"}
      hoverEffect="lift"
      className={cn("relative group overflow-hidden", className)}
    >
      <Link href={`/jobs/${job.id}`} className="absolute inset-0 z-10" aria-label={`View job: ${job.title}`} />

      <div className="p-4 sm:p-6 relative">
        {/* Header */}
        <div className="flex items-start justify-between mb-4 gap-4">
          <div className="flex items-start gap-3 flex-1 min-w-0">
            {/* Creator Avatar */}
            {job.creator && (
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-muted overflow-hidden flex-shrink-0 border-2 border-border group-hover:border-primary/50 transition-colors">
                {job.creator.profile_image_url ? (
                  <img
                    src={job.creator.profile_image_url}
                    alt={job.creator.display_name || job.creator.username || 'Creator'}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-base sm:text-lg font-bold text-muted-foreground">
                    {(job.creator.display_name || job.creator.username)?.[0]?.toUpperCase()}
                  </div>
                )}
              </div>
            )}

            <div className="flex-1 min-w-0">
              {job.creator && (
                <p className="text-xs sm:text-sm text-muted-foreground font-medium mb-1">
                  {job.creator.display_name || `@${job.creator.username}`}
                </p>
              )}
              <h3 className="text-base sm:text-lg font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                {job.title}
              </h3>
            </div>
          </div>

          {/* Budget Badge */}
          <div className="flex flex-col items-end gap-2 flex-shrink-0">
            <div className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-primary/10 border border-primary/20">
              <div className="flex items-center gap-1">
                <DollarSign className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
                <span className="text-sm sm:text-base font-bold text-primary">
                  {job.budget ? job.budget.toLocaleString() : 'TBD'}
                </span>
              </div>
            </div>

            {/* Hot Badge */}
            {isHot && (
              <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-accent/10 border border-accent/20">
                <Zap className="w-3 h-3 text-accent fill-accent" />
                <span className="text-xs font-bold text-accent">Hot</span>
              </div>
            )}
          </div>

          {/* Bookmark Button */}
          {onBookmarkToggle && (
            <button
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                onBookmarkToggle(job.id)
              }}
              className={`absolute top-4 right-4 p-2 rounded-full backdrop-blur-md transition-all z-20 ${
                isBookmarked
                  ? 'bg-primary/20 text-primary'
                  : 'bg-background/50 text-muted-foreground hover:bg-background hover:text-foreground'
              }`}
              aria-label={isBookmarked ? "Remove bookmark" : "Bookmark job"}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
            </button>
          )}
        </div>

        {/* Description */}
        {job.description && (
          <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 mb-4 leading-relaxed">
            {job.description}
          </p>
        )}

        {/* Skills Tags */}
        {job.required_skills && job.required_skills.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {job.required_skills.slice(0, 4).map((skill, i) => (
              <span
                key={i}
                className="px-2 py-1 bg-muted hover:bg-muted/80 rounded-md text-xs font-medium transition-colors"
              >
                {skill}
              </span>
            ))}
            {job.required_skills.length > 4 && (
              <span className="px-2 py-1 bg-muted/50 rounded-md text-xs font-medium text-muted-foreground">
                +{job.required_skills.length - 4}
              </span>
            )}
          </div>
        )}

        {/* Footer Meta */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-border/50">
          <div className="flex items-center gap-3 sm:gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {timeAgo}
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-3 h-3" />
              {applicantsCount} {applicantsCount === 1 ? 'applicant' : 'applicants'}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className={`px-2 py-1 rounded-md text-xs font-medium ${
              job.status === 'open' 
                ? 'bg-green-500/10 text-green-500' 
                : 'bg-gray-500/10 text-gray-500'
            }`}>
              {job.status === 'open' ? 'Open' : 'Closed'}
            </span>
          </div>
        </div>
      </div>

      {/* Hover gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </PremiumCard>
  )
}
