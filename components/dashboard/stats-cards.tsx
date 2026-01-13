'use client'

import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react'
import { PremiumCard } from '@/components/ui/premium-card'

interface Stat {
  label: string
  value: string | number
  change?: string
  changeType?: 'increase' | 'decrease'
  icon: LucideIcon
  iconColor: string
  bgColor: string
}

interface StatsCardsProps {
  stats: Stat[]
}

export function StatsCards({ stats }: StatsCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon
        
        return (
          <PremiumCard 
            key={index} 
            variant={index === 0 ? 'gradient' : 'elevated'}
            className="overflow-hidden group"
          >
            <div className="p-4 sm:p-6">
              <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mb-3 ${stat.bgColor} ${stat.iconColor} transition-transform duration-300 group-hover:scale-110`}>
                <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              
              <div className="text-2xl sm:text-3xl font-bold mb-1 transition-colors duration-300">
                {stat.value}
              </div>
              
              <div className="text-xs sm:text-sm text-muted-foreground mb-2">
                {stat.label}
              </div>
              
              {stat.change && (
                <div className={`text-xs flex items-center gap-1 font-medium ${
                  stat.changeType === 'increase' ? 'text-green-500 dark:text-green-400' : 'text-red-500 dark:text-red-400'
                }`}>
                  {stat.changeType === 'increase' ? (
                    <TrendingUp className="w-3 h-3" />
                  ) : (
                    <TrendingDown className="w-3 h-3" />
                  )}
                  {stat.change}
                </div>
              )}
            </div>
            
            {/* Hover gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          </PremiumCard>
        )
      })}
    </div>
  )
}
