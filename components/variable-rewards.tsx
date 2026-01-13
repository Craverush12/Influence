'use client'

import { Card } from '@/components/ui/card'
import { Sparkles, TrendingUp, Users, Zap, ArrowRight, Star } from 'lucide-react'
import Link from 'next/link'

interface Recommendation {
  id: string
  type: 'creator' | 'job' | 'trend'
  title: string
  description: string
  image?: string
  badge?: string
  action: string
  href: string
}

export function VariableRewards() {
  // Variable Reward: Surprise recommendations that change
  const recommendations: Recommendation[] = [
    {
      id: '1',
      type: 'creator',
      title: 'Perfect Match Found!',
      description: 'Sarah Chen matches your style - 95% compatibility',
      badge: 'New Match',
      action: 'Connect',
      href: '/creator/123',
    },
    {
      id: '2',
      type: 'job',
      title: 'Trending Opportunity',
      description: 'Video editing job with $2,500 budget - 12 applicants',
      badge: 'Hot',
      action: 'View Job',
      href: '/jobs/456',
    },
    {
      id: '3',
      type: 'trend',
      title: 'Trending Now',
      description: 'Gaming content creators are in high demand this week',
      badge: 'Trending',
      action: 'Explore',
      href: '/explore?trending=gaming',
    },
  ]

  return (
    <Card className="glass-card p-6 bg-gradient-to-br from-accent-4/10 to-accent-5/10 border-accent-4/20">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-aurora-1 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <h3 className="text-lg font-display font-extrabold">For You</h3>
        </div>
        <span className="text-xs text-muted-foreground">Updated just now</span>
      </div>

      <div className="space-y-3">
        {recommendations.map((rec) => (
          <Link
            key={rec.id}
            href={rec.href}
            className="block p-4 rounded-lg bg-background/50 border border-border hover:border-primary/30 hover:bg-background/80 transition-all group"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  {rec.type === 'creator' && <Users className="w-4 h-4 text-primary" />}
                  {rec.type === 'job' && <TrendingUp className="w-4 h-4 text-primary" />}
                  {rec.type === 'trend' && <Zap className="w-4 h-4 text-primary" />}
                  <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    {rec.title}
                  </h4>
                  {rec.badge && (
                    <span className="px-2 py-0.5 rounded-full bg-primary/20 text-primary text-xs font-medium">
                      {rec.badge}
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{rec.description}</p>
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0" />
            </div>
          </Link>
        ))}
      </div>

      <Link
        href="/explore"
        className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
      >
        See more recommendations
        <ArrowRight className="w-4 h-4" />
      </Link>
    </Card>
  )
}

