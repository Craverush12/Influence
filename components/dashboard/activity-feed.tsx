'use client'

import { LucideIcon } from 'lucide-react'
import { PremiumCard } from '@/components/ui/premium-card'

interface Activity {
  icon: LucideIcon
  text: string
  time: string
  color: string
}

interface ActivityFeedProps {
  activities: Activity[]
}

export function ActivityFeed({ activities }: ActivityFeedProps) {
  return (
    <PremiumCard variant="elevated" className="h-full">
      <div className="p-4 sm:p-6 flex flex-col h-full">
        <h3 className="text-base sm:text-lg font-bold mb-4">Recent Activity</h3>
        <div className="space-y-3 flex-1 overflow-auto scrollbar-thin">
          {activities.map((activity, i) => {
            const Icon = activity.icon
            
            return (
              <div 
                key={i} 
                className="flex items-start gap-3 p-2 rounded-lg hover:bg-muted/50 transition-all duration-300 cursor-pointer group"
              >
                <div className={`w-8 h-8 rounded-lg bg-muted flex items-center justify-center flex-shrink-0 ${activity.color} transition-transform duration-300 group-hover:scale-110`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs sm:text-sm font-medium truncate">{activity.text}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{activity.time}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </PremiumCard>
  )
}
