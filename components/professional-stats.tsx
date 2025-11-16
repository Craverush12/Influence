import { Card } from '@/components/ui/card'
import { TrendingUp, Award, Clock, DollarSign } from 'lucide-react'

export function ProfessionalStats() {
  const stats = [
    {
      icon: Award,
      label: 'Rating',
      value: '4.9/5',
      subtext: 'From 42 reviews',
      color: 'bg-yellow-100 text-yellow-600',
    },
    {
      icon: TrendingUp,
      label: 'Projects Completed',
      value: '156',
      subtext: '+12 this month',
      color: 'bg-green-100 text-green-600',
    },
    {
      icon: Clock,
      label: 'Avg Response Time',
      value: '2 hours',
      subtext: 'Usually responds faster',
      color: 'bg-blue-100 text-blue-600',
    },
    {
      icon: DollarSign,
      label: 'Monthly Earnings',
      value: '$4,250',
      subtext: '+18% from last month',
      color: 'bg-purple-100 text-purple-600',
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <Card key={stat.label} className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-3xl font-bold text-foreground mt-1">{stat.value}</p>
                <p className="text-xs text-muted-foreground mt-2">{stat.subtext}</p>
              </div>
              <div className={`${stat.color} p-3 rounded-lg`}>
                <Icon className="w-6 h-6" />
              </div>
            </div>
          </Card>
        )
      })}
    </div>
  )
}
