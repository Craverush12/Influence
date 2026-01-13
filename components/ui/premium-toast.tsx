'use client'

import { toast as sonnerToast, ToastT } from 'sonner'
import { CheckCircle2, AlertCircle, Info, AlertTriangle, Sparkles, X } from 'lucide-react'
import * as React from 'react'

// Premium Toast Styles
export const toastStyles = {
  success: {
    icon: <CheckCircle2 className="w-5 h-5" />,
    className: 'glass-premium border-l-4 border-primary',
    style: {
      background: 'linear-gradient(135deg, rgba(23, 217, 157, 0.1) 0%, rgba(6, 7, 10, 0.95) 100%)',
    },
  },
  error: {
    icon: <AlertCircle className="w-5 h-5" />,
    className: 'glass-premium border-l-4 border-destructive',
    style: {
      background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(6, 7, 10, 0.95) 100%)',
    },
  },
  warning: {
    icon: <AlertTriangle className="w-5 h-5" />,
    className: 'glass-premium border-l-4 border-[hsl(38_95%_55%)]',
    style: {
      background: 'linear-gradient(135deg, rgba(255, 179, 65, 0.1) 0%, rgba(6, 7, 10, 0.95) 100%)',
    },
  },
  info: {
    icon: <Info className="w-5 h-5" />,
    className: 'glass-premium border-l-4 border-[hsl(190_90%_55%)]',
    style: {
      background: 'linear-gradient(135deg, rgba(26, 219, 255, 0.1) 0%, rgba(6, 7, 10, 0.95) 100%)',
    },
  },
  aurora: {
    icon: <Sparkles className="w-5 h-5" />,
    className: 'glass-aurora border-l-4 border-primary',
    style: {
      background: 'linear-gradient(135deg, rgba(23, 217, 157, 0.15) 0%, rgba(157, 95, 255, 0.15) 50%, rgba(6, 7, 10, 0.95) 100%)',
    },
  },
}

interface PremiumToastOptions {
  title?: string
  description?: string
  action?: {
    label: string
    onClick: () => void
  }
  duration?: number
}

// Premium Toast API
export const toast = {
  success: (message: string, options?: PremiumToastOptions) => {
    return sonnerToast(message, {
      description: options?.description,
      icon: toastStyles.success.icon,
      className: toastStyles.success.className,
      style: toastStyles.success.style,
      duration: options?.duration || 4000,
      action: options?.action ? {
        label: options.action.label,
        onClick: options.action.onClick,
      } : undefined,
    })
  },

  error: (message: string, options?: PremiumToastOptions) => {
    return sonnerToast.error(message, {
      description: options?.description,
      icon: toastStyles.error.icon,
      className: toastStyles.error.className,
      style: toastStyles.error.style,
      duration: options?.duration || 6000,
      action: options?.action ? {
        label: options.action.label,
        onClick: options.action.onClick,
      } : undefined,
    })
  },

  warning: (message: string, options?: PremiumToastOptions) => {
    return sonnerToast.warning(message, {
      description: options?.description,
      icon: toastStyles.warning.icon,
      className: toastStyles.warning.className,
      style: toastStyles.warning.style,
      duration: options?.duration || 5000,
      action: options?.action ? {
        label: options.action.label,
        onClick: options.action.onClick,
      } : undefined,
    })
  },

  info: (message: string, options?: PremiumToastOptions) => {
    return sonnerToast.info(message, {
      description: options?.description,
      icon: toastStyles.info.icon,
      className: toastStyles.info.className,
      style: toastStyles.info.style,
      duration: options?.duration || 4000,
      action: options?.action ? {
        label: options.action.label,
        onClick: options.action.onClick,
      } : undefined,
    })
  },

  aurora: (message: string, options?: PremiumToastOptions) => {
    return sonnerToast(message, {
      description: options?.description,
      icon: toastStyles.aurora.icon,
      className: toastStyles.aurora.className,
      style: toastStyles.aurora.style,
      duration: options?.duration || 4000,
      action: options?.action ? {
        label: options.action.label,
        onClick: options.action.onClick,
      } : undefined,
    })
  },

  // Promise toast for async operations
  promise: <T,>(
    promise: Promise<T>,
    options: {
      loading: string
      success: string | ((data: T) => string)
      error: string | ((error: any) => string)
    }
  ) => {
    return sonnerToast.promise(promise, {
      loading: options.loading,
      success: options.success,
      error: options.error,
      className: toastStyles.info.className,
      style: toastStyles.info.style,
    })
  },

  // Custom toast
  custom: (component: React.ReactNode, options?: { duration?: number }) => {
    return sonnerToast.custom(component, {
      duration: options?.duration || 4000,
    })
  },

  // Dismiss
  dismiss: (id?: string | number) => {
    sonnerToast.dismiss(id)
  },
}

// Example Usage Component (for documentation)
export function ToastExamples() {
  return (
    <div className="space-y-4 p-8">
      <h2 className="text-2xl font-bold mb-6">Premium Toast Examples</h2>
      
      <div className="grid gap-4">
        <button
          onClick={() => toast.success('Profile updated successfully!')}
          className="btn-primary"
        >
          Success Toast
        </button>

        <button
          onClick={() =>
            toast.error('Failed to save changes', {
              description: 'Please check your connection and try again.',
              action: {
                label: 'Retry',
                onClick: () => console.log('Retrying...'),
              },
            })
          }
          className="btn-primary"
        >
          Error Toast with Action
        </button>

        <button
          onClick={() =>
            toast.warning('Your session will expire soon', {
              description: 'Please save your work.',
              duration: 8000,
            })
          }
          className="btn-primary"
        >
          Warning Toast
        </button>

        <button
          onClick={() =>
            toast.info('New feature available!', {
              description: 'Check out our new collaboration tools.',
            })
          }
          className="btn-primary"
        >
          Info Toast
        </button>

        <button
          onClick={() =>
            toast.aurora('✨ You earned a new badge!', {
              description: 'Collaboration Master - Level 5',
              action: {
                label: 'View',
                onClick: () => console.log('Opening badges...'),
              },
            })
          }
          className="btn-primary"
        >
          Aurora Toast
        </button>

        <button
          onClick={() => {
            const promise = new Promise((resolve) =>
              setTimeout(() => resolve({ success: true }), 2000)
            )
            toast.promise(promise, {
              loading: 'Uploading video...',
              success: 'Video uploaded successfully!',
              error: 'Failed to upload video',
            })
          }}
          className="btn-primary"
        >
          Promise Toast
        </button>
      </div>
    </div>
  )
}
