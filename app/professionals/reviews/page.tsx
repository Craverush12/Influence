'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Star, MessageSquare, ThumbsUp, Flag, TrendingUp } from 'lucide-react'
import { useState } from 'react'
import { Sidebar } from '@/components/sidebar'
import { ReviewsAnalytics } from '@/components/reviews-analytics'
import { ReviewsList } from '@/components/reviews-list'

export default function ReviewsPage() {
  const [reviews] = useState([
    {
      id: '1',
      author: 'Jordan Thompson',
      role: 'Content Creator',
      rating: 5,
      title: 'Exceptional quality and fast turnaround!',
      content: 'Alex delivered beautifully edited videos with perfect color grading. The attention to detail was impressive and they finished ahead of schedule. Highly recommend!',
      date: '2025-01-05',
      helpful: 24,
      verified: true,
      projectTitle: 'YouTube Gaming Series',
      avatar: '/placeholder.svg?height=48&width=48',
    },
    {
      id: '2',
      author: 'Morgan Davis',
      role: 'YouTuber',
      rating: 4,
      title: 'Great work overall',
      content: 'Solid editing work. My only minor note is the first revision took a couple days, but once I provided feedback, edits were super quick. Great communication.',
      date: '2025-01-02',
      helpful: 18,
      verified: true,
      projectTitle: 'Educational Video Series',
      avatar: '/placeholder.svg?height=48&width=48',
    },
    {
      id: '3',
      author: 'Casey Kim',
      role: 'Podcast Host',
      rating: 5,
      title: 'Professional and reliable',
      content: 'Have worked with Alex on multiple projects. They understand what we need without excessive back-and-forth. Quality is always consistent.',
      date: '2024-12-28',
      helpful: 31,
      verified: true,
      projectTitle: 'Podcast Audio Mix',
      avatar: '/placeholder.svg?height=48&width=48',
    },
    {
      id: '4',
      author: 'Alex Richardson',
      role: 'Content Creator',
      rating: 5,
      title: 'Best editor I\'ve worked with',
      content: 'Excellent communication, professional output, and fair pricing. Alex goes above and beyond on every project.',
      date: '2024-12-22',
      helpful: 42,
      verified: true,
      projectTitle: 'Music Video Editing',
      avatar: '/placeholder.svg?height=48&width=48',
    },
  ])

  const stats = {
    averageRating: 4.8,
    totalReviews: 156,
    verified: 142,
    trend: '+12%',
    breakdownByRating: {
      5: { count: 124, percentage: 79 },
      4: { count: 22, percentage: 14 },
      3: { count: 7, percentage: 5 },
      2: { count: 2, percentage: 1 },
      1: { count: 1, percentage: 1 },
    },
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <Sidebar userType="professional" />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="border-b border-border bg-card px-8 py-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Reviews & Ratings</h1>
              <p className="text-muted-foreground mt-2">
                Build trust with verified reviews and ratings from real clients
              </p>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2 mb-2">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(stats.averageRating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : i < stats.averageRating
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-muted-foreground'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-2xl font-bold text-foreground">{stats.averageRating}</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Based on {stats.totalReviews} reviews
              </p>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-auto">
          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
              {/* Main Content */}
              <div className="lg:col-span-2">
                <ReviewsList reviews={reviews} />
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                <ReviewsAnalytics stats={stats} />

                {/* Trust Indicators */}
                <Card className="p-6">
                  <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Star className="w-5 h-5 text-primary" />
                    Trust Indicators
                  </h3>

                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm text-foreground">Identity Verified</p>
                        <p className="text-xs text-muted-foreground">Verified professional</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm text-foreground">Payment Protected</p>
                        <p className="text-xs text-muted-foreground">Escrow system in place</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm text-foreground">Responsive</p>
                        <p className="text-xs text-muted-foreground">Avg response: 2 hours</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm text-foreground">On-Time Delivery</p>
                        <p className="text-xs text-muted-foreground">98% on-time rate</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
