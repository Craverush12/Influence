'use client'

import { PremiumCard } from '@/components/ui/premium-card'

interface EarningsData {
  day: string
  amount: number
}

interface EarningsChartProps {
  data: EarningsData[]
  total: number
}

export function EarningsChart({ data, total }: EarningsChartProps) {
  const maxAmount = Math.max(...data.map(d => d.amount), 1)

  return (
    <PremiumCard variant="interactive" className="lg:col-span-2">
      <div className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-2">
          <div>
            <h3 className="text-base sm:text-lg font-bold">Earnings This Week</h3>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">Track your weekly income</p>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold text-primary">${total.toLocaleString()}</span>
            <span className="text-xs sm:text-sm text-muted-foreground">this week</span>
          </div>
        </div>

        {/* Chart */}
        <div className="h-32 sm:h-48 flex items-end justify-between gap-1 sm:gap-2 mb-3">
          {data.map((item, i) => {
            const heightPercent = (item.amount / maxAmount) * 100
            
            return (
              <div 
                key={i} 
                className="flex-1 group cursor-pointer relative"
              >
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className="bg-foreground text-background text-xs px-2 py-1 rounded whitespace-nowrap">
                    ${item.amount}
                  </div>
                </div>
                <div 
                  className="w-full bg-gradient-to-t from-primary to-primary/40 rounded-t-lg hover:from-primary/80 hover:to-primary/60 transition-all duration-300 group-hover:scale-105 origin-bottom"
                  style={{ height: `${Math.max(heightPercent, 5)}%` }}
                />
              </div>
            )
          })}
        </div>

        {/* Labels */}
        <div className="flex justify-between text-xs text-muted-foreground">
          {data.map((item, i) => (
            <span key={i} className="flex-1 text-center truncate px-1">{item.day}</span>
          ))}
        </div>
      </div>
    </PremiumCard>
  )
}
