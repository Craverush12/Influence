import { Card } from '@/components/ui/card'
import { Star, TrendingUp } from 'lucide-react'

interface ReviewsAnalyticsProps {
  stats: {
    averageRating: number
    totalReviews: number
    verified: number
    trend: string
    breakdownByRating: {
      [key: number]: { count: number; percentage: number }
    }
  }
}

export function ReviewsAnalytics({ stats }: ReviewsAnalyticsProps) {
  return (
    <Card className="p-6">
      <h3 className="font-semibold text-foreground mb-6 flex items-center gap-2">
        <TrendingUp className="w-5 h-5 text-primary" />
        Rating Distribution
      </h3>

      <div className="space-y-4">
        {[5, 4, 3, 2, 1].map((rating) => {
          const data = stats.breakdownByRating[rating]
          return (
            <div key={rating}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  {[...Array(rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-3 h-3 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                  {[...Array(5 - rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-3 h-3 text-muted-foreground"
                    />
                  ))}
                </div>
                <span className="text-sm font-medium text-foreground">
                  {data.percentage}%
                </span>
              </div>

              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="bg-yellow-400 h-2 rounded-full transition-all"
                  style={{ width: `${data.percentage}%` }}
                />
              </div>

              <p className="text-xs text-muted-foreground mt-1">
                {data.count} reviews
              </p>
            </div>
          )
        })}
      </div>

      <div className="mt-6 pt-6 border-t border-border">
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">{stats.verified}</span> verified reviews
        </p>
        <p className="text-sm font-medium text-green-600 mt-2">
          {stats.trend} from last month
        </p>
      </div>
    </Card>
  )
}
