'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Plus, Upload, Star, Clock, DollarSign, CheckCircle, LogOut } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { Sidebar } from '@/components/sidebar'
import { ProfessionalStats } from '@/components/professional-stats'
import { ProfileCompletionCard } from '@/components/profile-completion-card'

export default function ProfessionalDashboard() {
  const [activeTab, setActiveTab] = useState('profile')

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <Sidebar userType="professional" />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="border-b border-border bg-card px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Professional Dashboard</h1>
              <p className="text-sm text-muted-foreground mt-1">Welcome back, Alex Chen</p>
            </div>
            <Button variant="ghost" size="sm">
              <LogOut className="w-4 h-4 mr-2" />
              Log Out
            </Button>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-auto">
          <div className="p-8">
            {/* Stats Overview */}
            <ProfessionalStats />

            {/* Profile Completion */}
            <div className="mb-8">
              <ProfileCompletionCard />
            </div>

            {/* Tabs */}
            <div className="flex gap-4 mb-6 border-b border-border">
              <button
                onClick={() => setActiveTab('profile')}
                className={`px-4 py-3 font-medium transition-colors ${
                  activeTab === 'profile'
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                My Profile
              </button>
              <button
                onClick={() => setActiveTab('portfolio')}
                className={`px-4 py-3 font-medium transition-colors ${
                  activeTab === 'portfolio'
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Portfolio
              </button>
              <button
                onClick={() => setActiveTab('pricing')}
                className={`px-4 py-3 font-medium transition-colors ${
                  activeTab === 'pricing'
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Pricing Tiers
              </button>
            </div>

            {/* Tab Content */}
            {activeTab === 'profile' && <ProfileTab />}
            {activeTab === 'portfolio' && <PortfolioTab />}
            {activeTab === 'pricing' && <PricingTab />}
          </div>
        </div>
      </div>
    </div>
  )
}

function ProfileTab() {
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState({
    bio: 'Professional video editor with 5+ years of experience specializing in YouTube content and cinematic edits.',
    specialties: ['Video Editing', 'Thumbnail Design', 'Color Grading'],
    experience: '5+ years',
    languages: ['English', 'Mandarin'],
  })

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Profile Information</h2>
          <p className="text-muted-foreground">Manage your professional profile and showcase your expertise</p>
        </div>
        <Button
          onClick={() => setIsEditing(!isEditing)}
          variant={isEditing ? 'destructive' : 'default'}
          className={isEditing ? 'bg-primary' : ''}
        >
          {isEditing ? 'Save Changes' : 'Edit Profile'}
        </Button>
      </div>

      <Card className="p-6">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Bio</label>
            {isEditing ? (
              <textarea
                value={profile.bio}
                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
                rows={4}
              />
            ) : (
              <p className="text-foreground">{profile.bio}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Specialties</label>
            <div className="flex flex-wrap gap-2">
              {profile.specialties.map((specialty) => (
                <span
                  key={specialty}
                  className="bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full text-sm font-medium"
                >
                  {specialty}
                </span>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Experience</label>
            <p className="text-foreground">{profile.experience}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Languages</label>
            <div className="flex flex-wrap gap-2">
              {profile.languages.map((lang) => (
                <span
                  key={lang}
                  className="bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full text-sm"
                >
                  {lang}
                </span>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-border">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span>Profile 85% complete - Verify your identity to increase visibility</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}

function PortfolioTab() {
  const [portfolioItems] = useState([
    {
      id: '1',
      title: 'YouTube Cinematic Edit',
      category: 'Video Editing',
      before: '/placeholder.svg?height=200&width=300',
      after: '/placeholder.svg?height=200&width=300',
      description: 'Professional cinematic edit with color grading and transitions',
    },
    {
      id: '2',
      title: 'Gaming Thumbnail Design',
      category: 'Thumbnail Design',
      image: '/placeholder.svg?height=200&width=300',
      description: '5 custom gaming thumbnails with high engagement rates',
    },
  ])

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Portfolio Gallery</h2>
          <p className="text-muted-foreground">Showcase your best work with before/after comparisons</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="w-4 h-4 mr-2" />
          Add Portfolio Item
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {portfolioItems.map((item) => (
          <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="space-y-4 p-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
                  <span className="text-xs bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full">
                    {item.category}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>

              {item.before && item.after ? (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs font-medium text-muted-foreground mb-2">Before</p>
                    <img
                      src={item.before || "/placeholder.svg"}
                      alt="Before"
                      className="w-full h-40 object-cover rounded-lg bg-muted"
                    />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-muted-foreground mb-2">After</p>
                    <img
                      src={item.after || "/placeholder.svg"}
                      alt="After"
                      className="w-full h-40 object-cover rounded-lg bg-muted"
                    />
                  </div>
                </div>
              ) : (
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  className="w-full h-40 object-cover rounded-lg bg-muted"
                />
              )}

              <div className="flex gap-2">
                <Button variant="outline" className="flex-1 text-sm">
                  Edit
                </Button>
                <Button variant="outline" className="flex-1 text-sm text-destructive">
                  Delete
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

function PricingTab() {
  const [pricingTiers] = useState([
    {
      id: '1',
      name: 'Basic',
      description: 'Perfect for small projects',
      price: 50,
      type: 'hourly',
      features: ['5-minute video edit', 'Basic color correction', 'Standard turnaround'],
    },
    {
      id: '2',
      name: 'Professional',
      description: 'Our most popular option',
      price: 150,
      type: 'per-project',
      features: ['10-minute video edit', 'Advanced color grading', '48-hour turnaround', 'Revisions included'],
      popular: true,
    },
    {
      id: '3',
      name: 'Premium Package',
      description: 'Full production support',
      price: 2500,
      type: 'package',
      features: ['Full series editing (10 videos)', 'Thumbnail design included', 'Priority support', '24-hour turnaround'],
    },
  ])

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Pricing Tiers</h2>
          <p className="text-muted-foreground">Set transparent pricing for your services</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="w-4 h-4 mr-2" />
          Add Pricing Tier
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {pricingTiers.map((tier) => (
          <Card
            key={tier.id}
            className={`p-6 ${
              tier.popular ? 'ring-2 ring-primary shadow-lg' : ''
            } hover:shadow-lg transition-shadow`}
          >
            {tier.popular && (
              <div className="bg-blue-500/10 text-blue-400 text-xs font-bold px-3 py-1 rounded-full w-fit mb-4">
                Most Popular
              </div>
            )}

            <h3 className="text-2xl font-bold text-foreground mb-2">{tier.name}</h3>
            <p className="text-sm text-muted-foreground mb-4">{tier.description}</p>

            <div className="mb-6">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-foreground">${tier.price}</span>
                <span className="text-muted-foreground text-sm">/{tier.type}</span>
              </div>
            </div>

            <ul className="space-y-3 mb-6">
              {tier.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-foreground">{feature}</span>
                </li>
              ))}
            </ul>

            <Button
              className={`w-full ${tier.popular ? 'bg-primary hover:bg-primary/90' : ''}`}
              variant={tier.popular ? 'default' : 'outline'}
            >
              Edit Tier
            </Button>
          </Card>
        ))}
      </div>
    </div>
  )
}
