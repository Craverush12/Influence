'use client'

import { LucideIcon } from 'lucide-react'
import { PremiumCard } from '@/components/ui/premium-card'
import Link from 'next/link'

interface Action {
  label: string
  icon: LucideIcon
  href: string
  variant?: 'primary' | 'secondary'
}

interface QuickActionsProps {
  actions: Action[]
}

export function QuickActions({ actions }: QuickActionsProps) {
  return (
    <PremiumCard variant="glass" className="h-full">
      <div className="p-4 sm:p-6 flex flex-col h-full">
        <h3 className="text-base sm:text-lg font-bold mb-4">Quick Actions</h3>
        <div className="space-y-2 flex-1">
          {actions.map((action, index) => {
            const Icon = action.icon
            const isPrimary = action.variant === 'primary' || index === 0
            
            return (
              <Link
                key={index}
                href={action.href}
                className={`w-full p-3 rounded-xl text-left flex items-center gap-3 transition-all duration-300 group ${
                  isPrimary
                    ? 'bg-primary/10 hover:bg-primary/20 dark:bg-primary/20 dark:hover:bg-primary/30'
                    : 'bg-muted hover:bg-muted/80'
                }`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-transform duration-300 group-hover:scale-110 ${
                  isPrimary ? 'bg-primary/20 text-primary' : 'bg-background/50'
                }`}>
                  <Icon className="w-4 h-4" />
                </div>
                <span className="font-medium text-sm sm:text-base">{action.label}</span>
              </Link>
            )
          })}
        </div>
      </div>
    </PremiumCard>
  )
}
