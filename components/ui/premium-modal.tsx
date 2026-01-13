'use client'

import * as React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from './dialog'
import { Button } from './button'
import { X, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Badge } from './badge'

interface PremiumModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description?: string
  children: React.ReactNode
  footer?: React.ReactNode
  primaryAction?: {
    label: string
    onClick: () => void | Promise<void>
    variant?: 'default' | 'gradient' | 'destructive'
    loading?: boolean
    disabled?: boolean
  }
  secondaryAction?: {
    label: string
    onClick: () => void
  }
  badge?: {
    label: string
    variant?: 'default' | 'aurora' | 'success' | 'warning'
  }
  variant?: 'default' | 'glass' | 'aurora'
  size?: 'sm' | 'default' | 'lg' | 'xl' | 'full'
  showClose?: boolean
  className?: string
}

export function PremiumModal({
  open,
  onOpenChange,
  title,
  description,
  children,
  footer,
  primaryAction,
  secondaryAction,
  badge,
  variant = 'default',
  size = 'default',
  showClose = true,
  className,
}: PremiumModalProps) {
  const [isLoading, setIsLoading] = React.useState(false)

  const handlePrimaryAction = async () => {
    if (!primaryAction?.onClick) return

    setIsLoading(true)
    try {
      await primaryAction.onClick()
    } finally {
      setIsLoading(false)
    }
  }

  const sizeClasses = {
    sm: 'max-w-sm',
    default: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-[95vw] h-[95vh]',
  }

  const variantClasses = {
    default: 'bg-charcoal border-border',
    glass: 'glass-premium border-border/50',
    aurora: 'glass-aurora border-primary/20',
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          'rounded-2xl border-2 p-0 gap-0 overflow-hidden',
          sizeClasses[size],
          variantClasses[variant],
          className
        )}
      >
        {/* Header */}
        <DialogHeader className="px-6 pt-6 pb-4 border-b border-border/50 space-y-3">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 space-y-2">
              {badge && (
                <Badge variant={badge.variant || 'default'} size="sm">
                  {badge.label}
                </Badge>
              )}
              <DialogTitle className="text-2xl font-bold text-foreground leading-tight">
                {title}
              </DialogTitle>
              {description && (
                <DialogDescription className="text-muted-foreground leading-relaxed">
                  {description}
                </DialogDescription>
              )}
            </div>
            {showClose && (
              <button
                onClick={() => onOpenChange(false)}
                className="w-8 h-8 rounded-lg hover:bg-secondary transition-colors flex items-center justify-center text-muted-foreground hover:text-foreground"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </DialogHeader>

        {/* Content */}
        <div className={cn(
          'px-6 py-6',
          size === 'full' && 'flex-1 overflow-y-auto'
        )}>
          {children}
        </div>

        {/* Footer */}
        {(footer || primaryAction || secondaryAction) && (
          <DialogFooter className="px-6 py-4 border-t border-border/50 bg-muted/20">
            {footer || (
              <div className="flex items-center justify-end gap-3 w-full">
                {secondaryAction && (
                  <Button
                    variant="ghost"
                    onClick={secondaryAction.onClick}
                    disabled={isLoading}
                  >
                    {secondaryAction.label}
                  </Button>
                )}
                {primaryAction && (
                  <Button
                    variant={primaryAction.variant || 'gradient'}
                    onClick={handlePrimaryAction}
                    disabled={primaryAction.disabled || isLoading || primaryAction.loading}
                  >
                    {(isLoading || primaryAction.loading) && (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    )}
                    {primaryAction.label}
                  </Button>
                )}
              </div>
            )}
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  )
}

// Confirmation Modal Preset
interface ConfirmationModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description: string
  confirmLabel?: string
  cancelLabel?: string
  onConfirm: () => void | Promise<void>
  variant?: 'default' | 'destructive'
  loading?: boolean
}

export function ConfirmationModal({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  onConfirm,
  variant = 'default',
  loading = false,
}: ConfirmationModalProps) {
  const handleConfirm = async () => {
    await onConfirm()
    onOpenChange(false)
  }

  return (
    <PremiumModal
      open={open}
      onOpenChange={onOpenChange}
      title={title}
      description={description}
      size="sm"
      primaryAction={{
        label: confirmLabel,
        onClick: handleConfirm,
        variant: variant === 'destructive' ? 'destructive' : 'gradient',
        loading,
      }}
      secondaryAction={{
        label: cancelLabel,
        onClick: () => onOpenChange(false),
      }}
    >
      {/* Empty - description is in header */}
    </PremiumModal>
  )
}

// Form Modal Preset
interface FormModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description?: string
  children: React.ReactNode
  onSubmit: () => void | Promise<void>
  submitLabel?: string
  cancelLabel?: string
  loading?: boolean
  disabled?: boolean
  size?: 'sm' | 'default' | 'lg' | 'xl'
}

export function FormModal({
  open,
  onOpenChange,
  title,
  description,
  children,
  onSubmit,
  submitLabel = 'Save',
  cancelLabel = 'Cancel',
  loading = false,
  disabled = false,
  size = 'default',
}: FormModalProps) {
  return (
    <PremiumModal
      open={open}
      onOpenChange={onOpenChange}
      title={title}
      description={description}
      size={size}
      variant="glass"
      primaryAction={{
        label: submitLabel,
        onClick: onSubmit,
        variant: 'gradient',
        loading,
        disabled,
      }}
      secondaryAction={{
        label: cancelLabel,
        onClick: () => onOpenChange(false),
      }}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault()
          onSubmit()
        }}
        className="space-y-4"
      >
        {children}
      </form>
    </PremiumModal>
  )
}

// Feature Modal Preset (for showcasing new features)
interface FeatureModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description: string
  children: React.ReactNode
  actionLabel?: string
  onAction?: () => void
}

export function FeatureModal({
  open,
  onOpenChange,
  title,
  description,
  children,
  actionLabel = 'Got it',
  onAction,
}: FeatureModalProps) {
  return (
    <PremiumModal
      open={open}
      onOpenChange={onOpenChange}
      title={title}
      description={description}
      variant="aurora"
      size="lg"
      badge={{ label: 'New Feature', variant: 'aurora' }}
      primaryAction={{
        label: actionLabel,
        onClick: () => {
          onAction?.()
          onOpenChange(false)
        },
        variant: 'gradient',
      }}
    >
      {children}
    </PremiumModal>
  )
}
