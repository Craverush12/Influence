import * as React from 'react'
import { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from './button'
import { Badge } from './badge'

interface PremiumEmptyStateProps {
  icon?: LucideIcon
  iconGradient?: boolean
  title: string
  description?: string
  action?: {
    label: string
    onClick: () => void
    variant?: 'default' | 'gradient' | 'outline'
  }
  secondaryAction?: {
    label: string
    onClick: () => void
  }
  badge?: {
    label: string
    variant?: 'default' | 'aurora' | 'success' | 'warning'
  }
  illustration?: React.ReactNode
  className?: string
  size?: 'sm' | 'default' | 'lg'
}

export function PremiumEmptyState({
  icon: Icon,
  iconGradient = true,
  title,
  description,
  action,
  secondaryAction,
  badge,
  illustration,
  className,
  size = 'default',
}: PremiumEmptyStateProps) {
  const sizes = {
    sm: {
      container: 'py-12',
      icon: 'w-12 h-12',
      iconWrapper: 'w-20 h-20',
      title: 'text-xl',
      description: 'text-sm',
    },
    default: {
      container: 'py-16',
      icon: 'w-16 h-16',
      iconWrapper: 'w-28 h-28',
      title: 'text-2xl',
      description: 'text-base',
    },
    lg: {
      container: 'py-24',
      icon: 'w-20 h-20',
      iconWrapper: 'w-36 h-36',
      title: 'text-3xl',
      description: 'text-lg',
    },
  }

  const sizeClasses = sizes[size]

  return (
    <div className={cn('flex items-center justify-center', sizeClasses.container, className)}>
      <div className="max-w-md text-center space-y-6">
        {/* Icon or Illustration */}
        {illustration ? (
          <div className="flex justify-center">{illustration}</div>
        ) : Icon ? (
          <div className="flex justify-center">
            <div
              className={cn(
                'rounded-2xl flex items-center justify-center relative overflow-hidden',
                sizeClasses.iconWrapper,
                iconGradient && 'gradient-aurora-mesh'
              )}
            >
              <div
                className={cn(
                  'rounded-xl flex items-center justify-center bg-charcoal/50 backdrop-blur-sm',
                  sizeClasses.iconWrapper
                )}
              >
                <Icon className={cn(sizeClasses.icon, 'text-muted-foreground')} />
              </div>
            </div>
          </div>
        ) : null}

        {/* Badge */}
        {badge && (
          <div className="flex justify-center">
            <Badge variant={badge.variant || 'default'}>{badge.label}</Badge>
          </div>
        )}

        {/* Title */}
        <div>
          <h3 className={cn('font-bold text-foreground mb-2', sizeClasses.title)}>{title}</h3>
          {description && (
            <p className={cn('text-muted-foreground leading-relaxed', sizeClasses.description)}>
              {description}
            </p>
          )}
        </div>

        {/* Actions */}
        {(action || secondaryAction) && (
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            {action && (
              <Button
                variant={action.variant || 'gradient'}
                size={size === 'sm' ? 'sm' : 'lg'}
                onClick={action.onClick}
              >
                {action.label}
              </Button>
            )}
            {secondaryAction && (
              <Button
                variant="ghost"
                size={size === 'sm' ? 'sm' : 'lg'}
                onClick={secondaryAction.onClick}
              >
                {secondaryAction.label}
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

// Preset Empty States
export function NoResultsEmptyState({
  searchTerm,
  onClear,
  ...props
}: Omit<PremiumEmptyStateProps, 'title' | 'description'> & {
  searchTerm?: string
  onClear?: () => void
}) {
  return (
    <PremiumEmptyState
      title="No results found"
      description={
        searchTerm
          ? `We couldn't find anything matching "${searchTerm}". Try adjusting your search.`
          : "We couldn't find any results. Try adjusting your filters."
      }
      action={
        onClear
          ? {
              label: 'Clear filters',
              onClick: onClear,
              variant: 'outline',
            }
          : undefined
      }
      {...props}
    />
  )
}

export function NoDataEmptyState({
  entityName = 'items',
  onCreate,
  ...props
}: Omit<PremiumEmptyStateProps, 'title' | 'description'> & {
  entityName?: string
  onCreate?: () => void
}) {
  return (
    <PremiumEmptyState
      title={`No ${entityName} yet`}
      description={`Get started by creating your first ${entityName.toLowerCase()}.`}
      action={
        onCreate
          ? {
              label: `Create ${entityName.toLowerCase()}`,
              onClick: onCreate,
              variant: 'gradient',
            }
          : undefined
      }
      {...props}
    />
  )
}

export function ErrorEmptyState({
  onRetry,
  ...props
}: Omit<PremiumEmptyStateProps, 'title' | 'description'> & {
  onRetry?: () => void
}) {
  return (
    <PremiumEmptyState
      title="Something went wrong"
      description="We encountered an error loading your data. Please try again."
      action={
        onRetry
          ? {
              label: 'Try again',
              onClick: onRetry,
              variant: 'gradient',
            }
          : undefined
      }
      iconGradient={false}
      {...props}
    />
  )
}

export function ComingSoonEmptyState(
  props: Omit<PremiumEmptyStateProps, 'title' | 'description' | 'badge'>
) {
  return (
    <PremiumEmptyState
      title="Coming Soon"
      description="This feature is under development. Stay tuned for updates!"
      badge={{ label: 'In Development', variant: 'warning' }}
      iconGradient
      {...props}
    />
  )
}
