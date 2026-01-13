'use client'

import { Clock, Users, MapPin, ArrowRight } from 'lucide-react'
import { PremiumCard } from '@/components/ui/premium-card'
import Link from 'next/link'

interface Opportunity {
  id: string
  title: string
  description: string
  budget: number
  tags: string[]
  postedAt: string
  applicants: number
  location?: string
}

interface TopOpportunityProps {
  opportunity: Opportunity | null
}

export function TopOpportunity({ opportunity }: TopOpportunityProps) {
  if (!opportunity) {
    return (
      <PremiumCard variant="elevated" className="lg:col-span-2 lg:row-span-2">
        <div className="p-6 h-full flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
            <span className="text-3xl">💼</span>
          </div>
          <h3 className="text-lg font-bold mb-2">No opportunities yet</h3>
          <p className="text-sm text-muted-foreground mb-4">Check back soon for new opportunities</p>
          <Link href="/jobs" className="btn-primary">
            Browse All Jobs
          </Link>
        </div>
      </PremiumCard>
    )
  }

  return (
    <PremiumCard 
      variant="interactive" 
      color="amber"
      className="lg:col-span-2 lg:row-span-2 overflow-hidden group"
    >
      <div className="p-4 sm:p-6 h-full flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between mb-4 gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xl sm:text-2xl">🔥</span>
            <h3 className="text-base sm:text-xl font-bold">Top Opportunity</h3>
          </div>
          <div className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-primary/10 border border-primary/20 flex-shrink-0">
            <span className="text-sm sm:text-lg font-bold text-primary">
              ${opportunity.budget.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 space-y-3 sm:space-y-4 overflow-auto">
          <div>
            <h4 className="text-base sm:text-lg font-semibold mb-2 line-clamp-2">{opportunity.title}</h4>
            <p className="text-sm text-muted-foreground line-clamp-3">
              {opportunity.description}
            </p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {opportunity.tags.slice(0, 5).map((tag, i) => (
              <span 
                key={i}
                className="px-2 sm:px-3 py-1 bg-muted hover:bg-muted/80 rounded-md text-xs font-medium transition-all duration-300 hover:scale-105"
              >
                {tag}
              </span>
            ))}
            {opportunity.tags.length > 5 && (
              <span className="px-2 sm:px-3 py-1 bg-muted/50 rounded-md text-xs font-medium text-muted-foreground">
                +{opportunity.tags.length - 5} more
              </span>
            )}
          </div>

          {/* Meta info */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
              {opportunity.postedAt}
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-3 h-3 sm:w-4 sm:h-4" />
              {opportunity.applicants} applicants
            </div>
            {opportunity.location && (
              <div className="flex items-center gap-1">
                <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="truncate">{opportunity.location}</span>
              </div>
            )}
          </div>
        </div>

        {/* CTA */}
        <Link 
          href={`/jobs/${opportunity.id}`}
          className="w-full py-3 mt-4 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-all duration-300 flex items-center justify-center gap-2 group-hover:scale-[1.02]"
        >
          Apply Now
          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>

      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </PremiumCard>
  )
}
