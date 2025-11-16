import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'

interface SearchFiltersProps {
  filters: {
    specialty: string[]
    experience: string
    budgetMin: number
    budgetMax: number
    turnaround: string
    language: string[]
    rating: number
  }
  onFiltersChange: (filters: any) => void
}

export function SearchFilters({ filters, onFiltersChange }: SearchFiltersProps) {
  const [expandedSections, setExpandedSections] = useState({
    specialty: true,
    experience: true,
    budget: true,
    turnaround: true,
    language: true,
    rating: true,
  })

  const specialties = ['Video Editing', 'Thumbnail Design', 'Audio Mixing', 'Script Writing', 'Motion Graphics', 'Animation']
  const experiences = ['1-2 years', '3-4 years', '5+ years']
  const turnarounds = ['24 hours', '2 days', '3 days', '1 week']
  const languages = ['English', 'Spanish', 'Mandarin', 'Korean', 'Japanese']
  const ratings = [4, 4.5, 4.7, 4.9]

  const toggleSection = (section: string) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section],
    })
  }

  const toggleSpecialty = (specialty: string) => {
    const updated = filters.specialty.includes(specialty)
      ? filters.specialty.filter(s => s !== specialty)
      : [...filters.specialty, specialty]
    onFiltersChange({ ...filters, specialty: updated })
  }

  const toggleLanguage = (language: string) => {
    const updated = filters.language.includes(language)
      ? filters.language.filter(l => l !== language)
      : [...filters.language, language]
    onFiltersChange({ ...filters, language: updated })
  }

  return (
    <div className="space-y-4 sticky top-8">
      {/* Specialty */}
      <Card className="p-4">
        <button
          onClick={() => toggleSection('specialty')}
          className="w-full flex items-center justify-between mb-4"
        >
          <h3 className="font-semibold text-foreground">Specialty</h3>
          <ChevronDown
            className={`w-4 h-4 transition-transform ${expandedSections.specialty ? '' : '-rotate-90'}`}
          />
        </button>
        {expandedSections.specialty && (
          <div className="space-y-3">
            {specialties.map((specialty) => (
              <label key={specialty} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.specialty.includes(specialty)}
                  onChange={() => toggleSpecialty(specialty)}
                  className="w-4 h-4 rounded border-border bg-background cursor-pointer"
                />
                <span className="text-sm text-foreground">{specialty}</span>
              </label>
            ))}
          </div>
        )}
      </Card>

      {/* Experience */}
      <Card className="p-4">
        <button
          onClick={() => toggleSection('experience')}
          className="w-full flex items-center justify-between mb-4"
        >
          <h3 className="font-semibold text-foreground">Experience</h3>
          <ChevronDown
            className={`w-4 h-4 transition-transform ${expandedSections.experience ? '' : '-rotate-90'}`}
          />
        </button>
        {expandedSections.experience && (
          <div className="space-y-3">
            {experiences.map((exp) => (
              <label key={exp} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="experience"
                  checked={filters.experience === exp}
                  onChange={() => onFiltersChange({ ...filters, experience: exp })}
                  className="w-4 h-4 cursor-pointer"
                />
                <span className="text-sm text-foreground">{exp}</span>
              </label>
            ))}
          </div>
        )}
      </Card>

      {/* Budget */}
      <Card className="p-4">
        <button
          onClick={() => toggleSection('budget')}
          className="w-full flex items-center justify-between mb-4"
        >
          <h3 className="font-semibold text-foreground">Budget Range</h3>
          <ChevronDown
            className={`w-4 h-4 transition-transform ${expandedSections.budget ? '' : '-rotate-90'}`}
          />
        </button>
        {expandedSections.budget && (
          <div className="space-y-4">
            <div>
              <label className="text-xs text-muted-foreground mb-2 block">Min: ${filters.budgetMin}</label>
              <input
                type="range"
                min="0"
                max="10000"
                value={filters.budgetMin}
                onChange={(e) => onFiltersChange({ ...filters, budgetMin: parseInt(e.target.value) })}
                className="w-full"
              />
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-2 block">Max: ${filters.budgetMax}</label>
              <input
                type="range"
                min="0"
                max="10000"
                value={filters.budgetMax}
                onChange={(e) => onFiltersChange({ ...filters, budgetMax: parseInt(e.target.value) })}
                className="w-full"
              />
            </div>
          </div>
        )}
      </Card>

      {/* Turnaround Time */}
      <Card className="p-4">
        <button
          onClick={() => toggleSection('turnaround')}
          className="w-full flex items-center justify-between mb-4"
        >
          <h3 className="font-semibold text-foreground">Turnaround Time</h3>
          <ChevronDown
            className={`w-4 h-4 transition-transform ${expandedSections.turnaround ? '' : '-rotate-90'}`}
          />
        </button>
        {expandedSections.turnaround && (
          <div className="space-y-3">
            {turnarounds.map((time) => (
              <label key={time} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="turnaround"
                  checked={filters.turnaround === time}
                  onChange={() => onFiltersChange({ ...filters, turnaround: time })}
                  className="w-4 h-4 cursor-pointer"
                />
                <span className="text-sm text-foreground">{time}</span>
              </label>
            ))}
          </div>
        )}
      </Card>

      {/* Languages */}
      <Card className="p-4">
        <button
          onClick={() => toggleSection('language')}
          className="w-full flex items-center justify-between mb-4"
        >
          <h3 className="font-semibold text-foreground">Languages</h3>
          <ChevronDown
            className={`w-4 h-4 transition-transform ${expandedSections.language ? '' : '-rotate-90'}`}
          />
        </button>
        {expandedSections.language && (
          <div className="space-y-3">
            {languages.map((lang) => (
              <label key={lang} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.language.includes(lang)}
                  onChange={() => toggleLanguage(lang)}
                  className="w-4 h-4 rounded border-border bg-background cursor-pointer"
                />
                <span className="text-sm text-foreground">{lang}</span>
              </label>
            ))}
          </div>
        )}
      </Card>

      {/* Minimum Rating */}
      <Card className="p-4">
        <button
          onClick={() => toggleSection('rating')}
          className="w-full flex items-center justify-between mb-4"
        >
          <h3 className="font-semibold text-foreground">Minimum Rating</h3>
          <ChevronDown
            className={`w-4 h-4 transition-transform ${expandedSections.rating ? '' : '-rotate-90'}`}
          />
        </button>
        {expandedSections.rating && (
          <div className="space-y-3">
            {ratings.map((rating) => (
              <label key={rating} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="rating"
                  checked={filters.rating === rating}
                  onChange={() => onFiltersChange({ ...filters, rating })}
                  className="w-4 h-4 cursor-pointer"
                />
                <span className="text-sm text-foreground">{rating}+ stars</span>
              </label>
            ))}
          </div>
        )}
      </Card>
    </div>
  )
}
