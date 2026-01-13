import * as React from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export interface EmptyStateProps {
  icon?: React.ReactNode
  title: string
  description?: string
  action?: {
    label: string
    onClick?: () => void
    href?: string
  }
  secondaryAction?: {
    label: string
    onClick?: () => void
    href?: string
  }
  className?: string
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  secondaryAction,
  className,
}: EmptyStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center text-center py-12 px-4", className)}>
      {/* Icon */}
      {icon && (
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center text-muted-foreground mb-4">
          {icon}
        </div>
      )}
      
      {/* Title */}
      <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2">
        {title}
      </h3>
      
      {/* Description */}
      {description && (
        <p className="text-sm sm:text-base text-muted-foreground mb-6 max-w-md">
          {description}
        </p>
      )}
      
      {/* Actions */}
      {(action || secondaryAction) && (
        <div className="flex flex-col sm:flex-row items-center gap-3">
          {action && (
            action.href ? (
              <Button asChild variant="primary" size="md">
                <a href={action.href}>{action.label}</a>
              </Button>
            ) : (
              <Button variant="primary" size="md" onClick={action.onClick}>
                {action.label}
              </Button>
            )
          )}
          
          {secondaryAction && (
            secondaryAction.href ? (
              <Button asChild variant="ghost" size="md">
                <a href={secondaryAction.href}>{secondaryAction.label}</a>
              </Button>
            ) : (
              <Button variant="ghost" size="md" onClick={secondaryAction.onClick}>
                {secondaryAction.label}
              </Button>
            )
          )}
        </div>
      )}
    </div>
  )
}
