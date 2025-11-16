'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Plus, BriefcaseIcon as BriefcaseOpen, DollarSign, Clock, Users, ChevronRight, Search, Filter, LogOut } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { Sidebar } from '@/components/sidebar'
import { CreatorJobList } from '@/components/creator-job-list'
import { NewJobModal } from '@/components/new-job-modal'

export default function CreatorDashboard() {
  const [showNewJobModal, setShowNewJobModal] = useState(false)
  const [jobs, setJobs] = useState([
    {
      id: '1',
      title: 'YouTube Video Editing - Gaming Series',
      description: '10-minute gaming highlight video editing',
      budget: 500,
      deadline: '2025-01-15',
      status: 'active',
      applications: 3,
    },
    {
      id: '2',
      title: 'TikTok Thumbnail Design Package',
      description: '5 custom thumbnail designs for TikTok series',
      budget: 250,
      deadline: '2025-01-10',
      status: 'active',
      applications: 8,
    },
  ])

  const stats = [
    {
      icon: BriefcaseOpen,
      label: 'Active Jobs',
      value: '2',
      color: 'bg-white/10 text-white',
    },
    {
      icon: Users,
      label: 'Total Applications',
      value: '11',
      color: 'bg-white/10 text-white',
    },
    {
      icon: DollarSign,
      label: 'Spent This Month',
      value: '$2,450',
      color: 'bg-green-100 text-green-600',
    },
    {
      icon: Clock,
      label: 'Avg Turnaround',
      value: '2.3 days',
      color: 'bg-orange-100 text-orange-600',
    },
  ]

  const handleJobCreated = (newJob: any) => {
    setJobs([newJob, ...jobs])
    setShowNewJobModal(false)
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <Sidebar userType="creator" />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="border-b border-border bg-card px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Creator Dashboard</h1>
              <p className="text-sm text-muted-foreground mt-1">Welcome back, Sarah Chen</p>
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
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat) => {
                const Icon = stat.icon
                return (
                  <Card key={stat.label} className="p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground mb-2">{stat.label}</p>
                        <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                      </div>
                      <div className={`${stat.color} p-3 rounded-lg`}>
                        <Icon className="w-6 h-6" />
                      </div>
                    </div>
                  </Card>
                )
              })}
            </div>

            {/* Jobs Section */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-foreground">Your Job Postings</h2>
                  <p className="text-sm text-muted-foreground mt-1">Manage and track all your posted jobs</p>
                </div>
                <Button 
                  onClick={() => setShowNewJobModal(true)}
                  className="bg-primary hover:bg-primary/90"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Post New Job
                </Button>
              </div>

              {/* Search and Filter */}
              <div className="flex gap-4 mb-6">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search your jobs..."
                    className="pl-10"
                  />
                </div>
                <Button variant="outline" className="gap-2">
                  <Filter className="w-4 h-4" />
                  Filter
                </Button>
              </div>

              {/* Jobs List */}
              <CreatorJobList jobs={jobs} />
            </div>

            {/* Recent Activity */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Recent Activity</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-4 border-b border-border">
                  <div>
                    <p className="font-medium text-foreground">Sarah Martinez applied to your job</p>
                    <p className="text-sm text-muted-foreground">YouTube Video Editing - Gaming Series</p>
                  </div>
                  <span className="text-xs bg-white/10 text-white/70 px-3 py-1 rounded-full">2 hours ago</span>
                </div>
                <div className="flex items-center justify-between pb-4 border-b border-border">
                  <div>
                    <p className="font-medium text-foreground">Project completed with Alex Chen</p>
                    <p className="text-sm text-muted-foreground">TikTok Thumbnail Design Package</p>
                  </div>
                  <span className="text-xs bg-green-100 text-green-600 px-3 py-1 rounded-full">5 hours ago</span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">Payment received from Jordan Lee</p>
                    <p className="text-sm text-muted-foreground">$450.00 for video editing project</p>
                  </div>
                  <span className="text-xs bg-green-100 text-green-600 px-3 py-1 rounded-full">1 day ago</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* New Job Modal */}
      <NewJobModal 
        isOpen={showNewJobModal} 
        onClose={() => setShowNewJobModal(false)}
        onJobCreated={handleJobCreated}
      />
    </div>
  )
}
