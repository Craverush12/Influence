import { Card } from '@/components/ui/card'
import { CheckCircle, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function ProfileCompletionCard() {
  const completionItems = [
    { label: 'Profile picture', completed: true },
    { label: 'Bio and specialties', completed: true },
    { label: 'Portfolio items (minimum 3)', completed: true },
    { label: 'Pricing tiers', completed: true },
    { label: 'Identity verification', completed: false },
  ]

  const completedCount = completionItems.filter((item) => item.completed).length
  const completionPercentage = Math.round((completedCount / completionItems.length) * 100)

  return (
    <Card className="p-6 bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/20">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-2">Profile Completion</h3>
          <p className="text-sm text-muted-foreground">
            Complete your profile to increase visibility and attract more clients
          </p>
        </div>
        <div className="text-right">
          <p className="text-3xl font-bold text-primary">{completionPercentage}%</p>
          <p className="text-xs text-muted-foreground">Complete</p>
        </div>
      </div>

      <div className="mb-6">
        <div className="w-full bg-border rounded-full h-2">
          <div
            className="bg-primary h-2 rounded-full transition-all duration-500"
            style={{ width: `${completionPercentage}%` }}
          />
        </div>
      </div>

      <div className="space-y-2 mb-4">
        {completionItems.map((item) => (
          <div key={item.label} className="flex items-center gap-3">
            {item.completed ? (
              <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-orange-500 flex-shrink-0" />
            )}
            <span className="text-sm text-foreground">{item.label}</span>
          </div>
        ))}
      </div>

      {completionPercentage < 100 && (
        <Button className="w-full bg-primary hover:bg-primary/90">
          Complete Your Profile
        </Button>
      )}
    </Card>
  )
}
