import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Heart, Star, MapPin, Clock, DollarSign, CheckCircle, ChevronRight } from 'lucide-react'
import { useState } from 'react'

interface Professional {
  id: string
  name: string
  specialties: string[]
  rating: number
  reviews: number
  experience: string
  startingPrice: number
  turnaround: string
  languages: string[]
  bio: string
  verified: boolean
  projectsCompleted: number
  responseTime: string
  image: string
}

interface ProfessionalCardProps {
  professional: Professional
}

export function ProfessionalCard({ professional }: ProfessionalCardProps) {
  const [liked, setLiked] = useState(false)

  return (
    <Card className="p-6 hover:shadow-lg transition-all hover:border-primary/50">
      <div className="flex gap-6">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <img
            src={professional.image || '/placeholder.svg'}
            alt={professional.name}
            className="w-20 h-20 rounded-lg object-cover bg-muted"
          />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4 mb-2">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-lg font-semibold text-foreground truncate">{professional.name}</h3>
                {professional.verified && (
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                )}
              </div>
              <p className="text-sm text-muted-foreground line-clamp-1">{professional.bio}</p>
            </div>

            <button
              onClick={() => setLiked(!liked)}
              className={`flex-shrink-0 p-2 rounded-lg transition-colors ${
                liked
                  ? 'bg-red-100 text-red-600'
                  : 'bg-muted text-muted-foreground hover:bg-accent'
              }`}
            >
              <Heart className={`w-5 h-5 ${liked ? 'fill-current' : ''}`} />
            </button>
          </div>

          {/* Specialties */}
          <div className="flex flex-wrap gap-2 mb-4">
            {professional.specialties.map((specialty) => (
              <span
                key={specialty}
                className="text-xs bg-primary/10 text-primary px-2.5 py-1 rounded-full font-medium"
              >
                {specialty}
              </span>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-4 pb-4 border-b border-border">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Rating</p>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="font-semibold text-foreground">{professional.rating}</span>
                <span className="text-xs text-muted-foreground">({professional.reviews})</span>
              </div>
            </div>

            <div>
              <p className="text-xs text-muted-foreground mb-1">Experience</p>
              <p className="font-semibold text-foreground text-sm">{professional.experience}</p>
            </div>

            <div>
              <p className="text-xs text-muted-foreground mb-1">Starting Price</p>
              <p className="font-semibold text-foreground text-sm">${professional.startingPrice}</p>
            </div>

            <div>
              <p className="text-xs text-muted-foreground mb-1">Turnaround</p>
              <p className="font-semibold text-foreground text-sm">{professional.turnaround}</p>
            </div>

            <div>
              <p className="text-xs text-muted-foreground mb-1">Response</p>
              <p className="font-semibold text-foreground text-sm">{professional.responseTime}</p>
            </div>
          </div>

          {/* Languages and Projects */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>{professional.projectsCompleted} projects completed</span>
              <span>Languages: {professional.languages.join(', ')}</span>
            </div>

            <Button size="sm" className="bg-primary hover:bg-primary/90">
              View Profile
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  )
}
