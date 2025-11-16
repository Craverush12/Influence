import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Star, ThumbsUp, Flag, CheckCircle } from 'lucide-react'

interface Review {
  id: string
  author: string
  role: string
  rating: number
  title: string
  content: string
  date: string
  helpful: number
  verified: boolean
  projectTitle: string
  avatar: string
}

interface ReviewsListProps {
  reviews: Review[]
}

export function ReviewsList({ reviews }: ReviewsListProps) {
  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <Card key={review.id} className="p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex items-start gap-4 flex-1">
              <img
                src={review.avatar || '/placeholder.svg'}
                alt={review.author}
                className="w-12 h-12 rounded-full object-cover bg-muted"
              />

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-semibold text-foreground">{review.author}</h4>
                  {review.verified && (
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                  )}
                </div>

                <p className="text-sm text-muted-foreground mb-3">
                  {review.role} • {review.date}
                </p>

                <div className="flex items-center gap-2 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < review.rating
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-muted-foreground'
                      }`}
                    />
                  ))}
                </div>

                <h5 className="font-semibold text-foreground mb-2">{review.title}</h5>
                <p className="text-foreground mb-3 leading-relaxed">{review.content}</p>

                <p className="text-sm text-muted-foreground mb-4">
                  Project: <span className="font-medium text-foreground">{review.projectTitle}</span>
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-border">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                <ThumbsUp className="w-4 h-4 mr-1" />
                {review.helpful}
              </Button>
            </div>

            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-destructive">
              <Flag className="w-4 h-4" />
            </Button>
          </div>
        </Card>
      ))}
    </div>
  )
}
