import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ChevronRight, Users, Calendar, DollarSign } from 'lucide-react'
import Link from 'next/link'

interface Job {
  id: string
  title: string
  description: string
  budget: number
  deadline: string
  status: 'active' | 'closed' | 'completed'
  applications: number
}

interface CreatorJobListProps {
  jobs: Job[]
}

export function CreatorJobList({ jobs }: CreatorJobListProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-700'
      case 'closed':
        return 'bg-gray-100 text-gray-700'
      case 'completed':
        return 'bg-blue-100 text-blue-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <div className="space-y-4">
      {jobs.map((job) => (
        <Card key={job.id} className="p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-lg font-semibold text-foreground">{job.title}</h3>
                <Badge className={getStatusColor(job.status)}>
                  {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                </Badge>
              </div>
              <p className="text-muted-foreground mb-4">{job.description}</p>

              <div className="flex flex-wrap gap-6 text-sm">
                <div className="flex items-center gap-2 text-foreground">
                  <DollarSign className="w-4 h-4 text-primary" />
                  <span className="font-semibold">${job.budget}</span>
                </div>
                <div className="flex items-center gap-2 text-foreground">
                  <Calendar className="w-4 h-4 text-primary" />
                  <span>{job.deadline}</span>
                </div>
                <div className="flex items-center gap-2 text-foreground">
                  <Users className="w-4 h-4 text-primary" />
                  <span>{job.applications} applications</span>
                </div>
              </div>
            </div>

            <Button variant="ghost" size="sm" className="text-primary hover:bg-primary/10">
              View Details
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </Card>
      ))}
    </div>
  )
}
