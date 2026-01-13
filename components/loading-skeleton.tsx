'use client'

import { cn } from '@/lib/utils'

interface LoadingSkeletonProps {
  variant?: 'card' | 'text' | 'avatar' | 'button' | 'input' | 'badge'
  className?: string
  count?: number
  width?: string | number
  height?: string | number
}

export function LoadingSkeleton({ 
  variant = 'card', 
  className, 
  count = 1,
  width,
  height 
}: LoadingSkeletonProps) {
  const items = Array.from({ length: count })

  if (variant === 'card') {
    return (
      <>
        {items.map((_, i) => (
          <div key={i} className={cn("rounded-2xl border border-border bg-card overflow-hidden animate-pulse", className)}>
            <div className="skeleton-shimmer h-40 w-full" />
            <div className="p-6 space-y-3">
              <div className="skeleton-shimmer h-6 w-3/4 rounded" />
              <div className="skeleton-shimmer h-4 w-full rounded" />
              <div className="skeleton-shimmer h-4 w-5/6 rounded" />
              <div className="flex gap-2 mt-4">
                <div className="skeleton-shimmer h-8 w-20 rounded-md" />
                <div className="skeleton-shimmer h-8 w-20 rounded-md" />
                <div className="skeleton-shimmer h-8 w-20 rounded-md" />
              </div>
            </div>
          </div>
        ))}
      </>
    )
  }

  if (variant === 'text') {
    return (
      <>
        {items.map((_, i) => (
          <div 
            key={i} 
            className={cn("skeleton-shimmer h-4 rounded animate-pulse", className)} 
            style={{ width: width || '100%', height: height || '1rem' }}
          />
        ))}
      </>
    )
  }

  if (variant === 'avatar') {
    return (
      <>
        {items.map((_, i) => (
          <div 
            key={i} 
            className={cn("skeleton-shimmer rounded-full animate-pulse", className)} 
            style={{ 
              width: width || '3rem', 
              height: height || width || '3rem' 
            }} 
          />
        ))}
      </>
    )
  }

  if (variant === 'button') {
    return (
      <>
        {items.map((_, i) => (
          <div 
            key={i} 
            className={cn("skeleton-shimmer h-10 rounded-xl animate-pulse", className)}
            style={{ width: width || '6rem' }}
          />
        ))}
      </>
    )
  }

  if (variant === 'input') {
    return (
      <>
        {items.map((_, i) => (
          <div 
            key={i} 
            className={cn("skeleton-shimmer h-11 rounded-xl animate-pulse", className)}
            style={{ width: width || '100%' }}
          />
        ))}
      </>
    )
  }

  if (variant === 'badge') {
    return (
      <>
        {items.map((_, i) => (
          <div 
            key={i} 
            className={cn("skeleton-shimmer h-6 rounded-full animate-pulse", className)}
            style={{ width: width || '4rem' }}
          />
        ))}
      </>
    )
  }

  return null
}
