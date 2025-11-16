'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Search, Filter, Heart, Star, MapPin, Clock, DollarSign, ChevronRight } from 'lucide-react'
import { useState } from 'react'
import { Sidebar } from '@/components/sidebar'
import { SearchFilters } from '@/components/search-filters'
import { ProfessionalCard } from '@/components/professional-card'

export default function FindProfessionals() {
  const [searchQuery, setSearchQuery] = useState('')
  const [showFilters, setShowFilters] = useState(true)
  const [filters, setFilters] = useState({
    specialty: [],
    experience: '',
    budgetMin: 0,
    budgetMax: 10000,
    turnaround: '',
    language: [],
    rating: 0,
  })

  const [professionals] = useState([
    {
      id: '1',
      name: 'Alex Chen',
      specialties: ['Video Editing', 'Color Grading'],
      rating: 4.9,
      reviews: 42,
      experience: '5+ years',
      startingPrice: 150,
      turnaround: '48 hours',
      languages: ['English', 'Mandarin'],
      bio: 'Professional video editor specializing in YouTube content and cinematic edits.',
      verified: true,
      projectsCompleted: 156,
      responseTime: '2 hours',
      image: '/placeholder.svg?height=80&width=80',
    },
    {
      id: '2',
      name: 'Sarah Martinez',
      specialties: ['Thumbnail Design', 'Graphic Design'],
      rating: 4.8,
      reviews: 38,
      experience: '4+ years',
      startingPrice: 100,
      turnaround: '24 hours',
      languages: ['English', 'Spanish'],
      bio: 'Creative designer focused on high-impact thumbnails that boost engagement.',
      verified: true,
      projectsCompleted: 128,
      responseTime: '1 hour',
      image: '/placeholder.svg?height=80&width=80',
    },
    {
      id: '3',
      name: 'Jordan Lee',
      specialties: ['Audio Mixing', 'Sound Design'],
      rating: 4.7,
      reviews: 31,
      experience: '6+ years',
      startingPrice: 200,
      turnaround: '3 days',
      languages: ['English', 'Korean'],
      bio: 'Audio engineer with expertise in podcast production and music mastering.',
      verified: true,
      projectsCompleted: 94,
      responseTime: '4 hours',
      image: '/placeholder.svg?height=80&width=80',
    },
    {
      id: '4',
      name: 'Emma Wilson',
      specialties: ['Script Writing', 'Content Strategy'],
      rating: 4.6,
      reviews: 25,
      experience: '3+ years',
      startingPrice: 80,
      turnaround: '2 days',
      languages: ['English'],
      bio: 'Content strategist and scriptwriter for digital media and educational videos.',
      verified: false,
      projectsCompleted: 67,
      responseTime: '6 hours',
      image: '/placeholder.svg?height=80&width=80',
    },
    {
      id: '5',
      name: 'Michael Zhang',
      specialties: ['Video Editing', 'Motion Graphics'],
      rating: 4.9,
      reviews: 55,
      experience: '7+ years',
      startingPrice: 250,
      turnaround: '3 days',
      languages: ['English', 'Mandarin'],
      bio: 'Expert in motion graphics and complex video production for brands.',
      verified: true,
      projectsCompleted: 189,
      responseTime: '30 minutes',
      image: '/placeholder.svg?height=80&width=80',
    },
    {
      id: '6',
      name: 'Lisa Park',
      specialties: ['Thumbnail Design', 'Animation'],
      rating: 4.8,
      reviews: 44,
      experience: '5+ years',
      startingPrice: 120,
      turnaround: '2 days',
      languages: ['English', 'Japanese'],
      bio: 'Animator and designer specializing in eye-catching thumbnails and intros.',
      verified: true,
      projectsCompleted: 134,
      responseTime: '3 hours',
      image: '/placeholder.svg?height=80&width=80',
    },
  ])

  const filteredProfessionals = professionals.filter((prof) => {
    const matchesSearch = prof.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prof.specialties.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesSpecialty = filters.specialty.length === 0 ||
      prof.specialties.some(s => filters.specialty.includes(s))

    const matchesExperience = !filters.experience ||
      prof.experience === filters.experience

    const matchesBudget = prof.startingPrice >= filters.budgetMin &&
      prof.startingPrice <= filters.budgetMax

    const matchesTurnaround = !filters.turnaround ||
      prof.turnaround === filters.turnaround

    const matchesLanguage = filters.language.length === 0 ||
      prof.languages.some(l => filters.language.includes(l))

    const matchesRating = prof.rating >= filters.rating

    return matchesSearch && matchesSpecialty && matchesExperience &&
      matchesBudget && matchesTurnaround && matchesLanguage && matchesRating
  })

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <Sidebar userType="creator" />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="border-b border-border bg-card px-8 py-6">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold text-foreground mb-4">Find Professionals</h1>
            <p className="text-muted-foreground mb-6">
              Browse and connect with talented editors and service providers
            </p>

            {/* Search Bar */}
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Search by name or specialty..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 py-2 h-11"
                />
              </div>
              <Button
                onClick={() => setShowFilters(!showFilters)}
                variant="outline"
                className="gap-2"
              >
                <Filter className="w-4 h-4" />
                Filters
              </Button>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-auto">
          <div className="max-w-6xl mx-auto p-8">
            <div className="flex gap-8">
              {/* Filters Sidebar */}
              {showFilters && (
                <div className="w-72">
                  <SearchFilters filters={filters} onFiltersChange={setFilters} />
                </div>
              )}

              {/* Results */}
              <div className="flex-1">
                <div className="mb-6">
                  <p className="text-sm text-muted-foreground">
                    Showing <span className="font-semibold text-foreground">{filteredProfessionals.length}</span> professionals
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {filteredProfessionals.map((professional) => (
                    <ProfessionalCard key={professional.id} professional={professional} />
                  ))}
                </div>

                {filteredProfessionals.length === 0 && (
                  <Card className="p-12 text-center">
                    <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-foreground mb-2">No professionals found</h3>
                    <p className="text-muted-foreground">Try adjusting your search filters or query</p>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
