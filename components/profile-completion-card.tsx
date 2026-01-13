'use client'

import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { CheckCircle, AlertCircle, ArrowRight, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function ProfileCompletionCard() {
  // Zeigarnik Effect: Highlight incomplete tasks prominently
  const completionItems = [
    { label: 'Profile picture', completed: true },
    { label: 'Bio and specialties', completed: true },
    { label: 'Portfolio items (minimum 3)', completed: true },
    { label: 'Pricing tiers', completed: true },
    { label: 'Identity verification', completed: false }, // Incomplete - highlighted
    { label: 'Connect social media', completed: false }, // Incomplete - highlighted
  ]

  const completedCount = completionItems.filter((item) => item.completed).length
  const completionPercentage = Math.round((completedCount / completionItems.length) * 100)
  const incompleteItems = completionItems.filter((item) => !item.completed)

  return (
    <Card className="glass-card p-6 bg-gradient-to-br from-primary/10 to-accent-3/10 border-primary/30 hover:border-primary/50 transition-all">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-display font-extrabold text-foreground">Profile Completion</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-1">
            Unlock exclusive features and get discovered faster
          </p>
          {/* Goal Gradient Effect */}
          <div className="mt-3">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-medium text-muted-foreground">Progress</span>
              <span className="text-xs font-extrabold text-primary">{completionPercentage}%</span>
            </div>
            <div className="w-full h-2.5 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-aurora-1 transition-all duration-500 ease-out"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
          </div>
        </div>
        <div className="text-right ml-4">
          <p className="text-3xl font-display font-extrabold text-gradient-aurora">{completionPercentage}%</p>
          <p className="text-xs text-muted-foreground">Complete</p>
        </div>
      </div>

      {/* Zeigarnik Effect: Show incomplete items prominently */}
      {incompleteItems.length > 0 && (
        <div className="mb-4 p-4 rounded-lg bg-destructive/10 border border-destructive/20">
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle className="w-4 h-4 text-destructive" />
            <p className="text-sm font-semibold text-foreground">Complete these to finish your profile:</p>
          </div>
          <div className="space-y-2">
            {incompleteItems.map((item) => (
              <div key={item.label} className="flex items-center gap-2 text-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-destructive animate-pulse" />
                <span className="text-foreground font-medium">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-2 mb-4">
        {completionItems.map((item) => (
          <div
            key={item.label}
            className={`flex items-center gap-3 p-2 rounded-lg transition-all ${
              item.completed
                ? 'bg-primary/5'
                : 'bg-muted/30 border border-destructive/20'
            }`}
          >
            {item.completed ? (
              <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-destructive flex-shrink-0 animate-pulse" />
            )}
            <span className={`text-sm ${item.completed ? 'text-foreground' : 'text-foreground font-semibold'}`}>
              {item.label}
            </span>
          </div>
        ))}
      </div>

      {completionPercentage < 100 && (
        <Link href="/profile/setup">
          <Button className="w-full bg-gradient-aurora-1 hover:opacity-90 text-white font-semibold">
            Complete Now
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </Link>
      )}
    </Card>
  )
}
