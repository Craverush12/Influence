'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Heart, Star, MapPin, Clock, DollarSign, CheckCircle, MessageSquare, Share2 } from 'lucide-react'
import { useState } from 'react'
import { Sidebar } from '@/components/sidebar'

export default function ProfessionalProfilePage() {
  const [liked, setLiked] = useState(false)

  const professional = {
    name: 'Alex Chen',
    role: 'Professional Video Editor',
    image: '/placeholder.svg?height=200&width=200',
    bio: 'Specializing in YouTube content and cinematic edits with 5+ years of professional experience.',
    rating: 4.9,
    reviews: 156,
    verified: true,
    specialties: ['Video Editing', 'Color Grading', 'Motion Graphics'],
    experience: '5+ years',
    startingPrice: 150,
    turnaround: '48 hours',
    languages: ['English', 'Mandarin'],
    responseTime: '2 hours',
    projectsCompleted: 189,
    onTimeRate: 98,
    portfolio: [
      {
        id: '1',
        title: 'YouTube Cinematic Edit',
        before: '/placeholder.svg?height=200&width=300',
        after: '/placeholder.svg?height=200&width=300',
      },
      {
        id: '2',
        title: 'Gaming Highlight Reel',
        before: '/placeholder.svg?height=200&width=300',
        after: '/placeholder.svg?height=200&width=300',
      },
    ],
    pricingTiers: [
      {
        name: 'Basic',
        price: 150,
        type: 'per-project',
        features: ['5-min video edit', 'Basic color correction', '48-hour turnaround'],
      },
      {
        name: 'Professional',
        price: 300,
        type: 'per-project',
        features: ['10-min video edit', 'Advanced color grading', '48-hour turnaround', 'Revisions included'],
        popular: true,
      },
      {
        name: 'Premium',
        price: 2500,
        type: 'package',
        features: ['Full series (10 videos)', 'Thumbnail design', 'Priority support'],
      },
    ],
  }

  const testimonials = [
    {
      author: 'Jordan Thompson',
      content: 'Exceptional quality and fast turnaround. Highly recommend!',
      rating: 5,
    },
    {
      author: 'Morgan Davis',
      content: 'Great work overall. Communication was excellent.',
      rating: 4,
    },
    {
      author: 'Casey Kim',
      content: 'Professional and reliable. Working with them multiple times.',
      rating: 5,
    },
  ]

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <Sidebar userType="creator" />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-auto">
          <div className="max-w-4xl mx-auto p-8">
            {/* Header */}
            <div className="flex gap-8 mb-8">
              <img
                src={professional.image || '/placeholder.svg'}
                alt={professional.name}
                className="w-48 h-48 rounded-lg object-cover bg-muted"
              />

              <div className="flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <h1 className="text-4xl font-bold text-foreground">{professional.name}</h1>
                      {professional.verified && (
                        <CheckCircle className="w-6 h-6 text-green-600" />
                      )}
                    </div>
                    <p className="text-lg text-muted-foreground">{professional.role}</p>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Share2 className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setLiked(!liked)}
                      className={liked ? 'text-red-600 border-red-300' : ''}
                    >
                      <Heart className={`w-4 h-4 ${liked ? 'fill-current' : ''}`} />
                    </Button>
                  </div>
                </div>

                <p className="text-foreground mb-6 leading-relaxed max-w-lg">
                  {professional.bio}
                </p>

                <div className="flex gap-8 mb-6">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Rating</p>
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-5 h-5 ${
                              i < Math.floor(professional.rating)
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-muted-foreground'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="font-bold text-foreground">{professional.rating}</span>
                      <span className="text-muted-foreground">({professional.reviews} reviews)</span>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground mb-1">On-Time Rate</p>
                    <p className="font-bold text-green-600">{professional.onTimeRate}%</p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Projects Completed</p>
                    <p className="font-bold text-foreground">{professional.projectsCompleted}</p>
                  </div>
                </div>

                <Button className="bg-primary hover:bg-primary/90 mr-3">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
                <Button variant="outline">View Full Profile</Button>
              </div>
            </div>

            {/* Quick Facts */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <Card className="p-4">
                <p className="text-xs text-muted-foreground mb-2">Experience</p>
                <p className="font-semibold text-foreground">{professional.experience}</p>
              </Card>
              <Card className="p-4">
                <p className="text-xs text-muted-foreground mb-2">Starting Price</p>
                <p className="font-semibold text-foreground">${professional.startingPrice}</p>
              </Card>
              <Card className="p-4">
                <p className="text-xs text-muted-foreground mb-2">Turnaround Time</p>
                <p className="font-semibold text-foreground">{professional.turnaround}</p>
              </Card>
              <Card className="p-4">
                <p className="text-xs text-muted-foreground mb-2">Response Time</p>
                <p className="font-semibold text-foreground">{professional.responseTime}</p>
              </Card>
            </div>

            {/* Specialties */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">Specialties</h2>
              <div className="flex flex-wrap gap-2">
                {professional.specialties.map((specialty) => (
                  <Badge key={specialty} className="bg-blue-500/10 text-blue-400">
                    {specialty}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Pricing Tiers */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">Pricing Tiers</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {professional.pricingTiers.map((tier) => (
                  <Card
                    key={tier.name}
                    className={`p-6 ${tier.popular ? 'ring-2 ring-primary' : ''}`}
                  >
                    {tier.popular && (
                      <Badge className="mb-4 bg-primary text-primary-foreground">Most Popular</Badge>
                    )}
                    <h3 className="text-xl font-semibold text-foreground mb-2">{tier.name}</h3>
                    <div className="mb-6">
                      <span className="text-3xl font-bold text-foreground">${tier.price}</span>
                      <span className="text-muted-foreground ml-2">/{tier.type}</span>
                    </div>
                    <ul className="space-y-2 mb-6">
                      {tier.features.map((feature) => (
                        <li key={feature} className="text-sm text-foreground flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button className="w-full bg-primary hover:bg-primary/90">
                      Book Now
                    </Button>
                  </Card>
                ))}
              </div>
            </div>

            {/* Portfolio */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">Portfolio</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {professional.portfolio.map((item) => (
                  <Card key={item.id} className="overflow-hidden">
                    <div className="grid grid-cols-2">
                      <div>
                        <p className="text-xs text-muted-foreground p-3 pb-0">Before</p>
                        <img
                          src={item.before || '/placeholder.svg'}
                          alt="Before"
                          className="w-full h-40 object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground p-3 pb-0">After</p>
                        <img
                          src={item.after || '/placeholder.svg'}
                          alt="After"
                          className="w-full h-40 object-cover"
                        />
                      </div>
                    </div>
                    <p className="p-4 font-semibold text-foreground">{item.title}</p>
                  </Card>
                ))}
              </div>
            </div>

            {/* Testimonials */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">Recent Reviews</h2>
              <div className="space-y-4">
                {testimonials.map((testimonial, i) => (
                  <Card key={i} className="p-6">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-foreground">{testimonial.author}</h4>
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, j) => (
                          <Star
                            key={j}
                            className={`w-4 h-4 ${
                              j < testimonial.rating
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-muted-foreground'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-muted-foreground">{testimonial.content}</p>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
