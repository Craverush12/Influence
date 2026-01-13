'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronRight, Home } from 'lucide-react'
import { cn } from '@/lib/utils'

interface BreadcrumbItem {
  label: string
  href: string
  icon?: React.ComponentType<{ className?: string }>
}

interface PremiumBreadcrumbsProps {
  items?: BreadcrumbItem[]
  separator?: React.ReactNode
  className?: string
}

export function PremiumBreadcrumbs({
  items: customItems,
  separator,
  className,
}: PremiumBreadcrumbsProps) {
  const pathname = usePathname()

  // Auto-generate breadcrumbs from pathname if no custom items provided
  const items = React.useMemo(() => {
    if (customItems) return customItems

    const segments = pathname.split('/').filter(Boolean)
    const breadcrumbs: BreadcrumbItem[] = [
      { label: 'Home', href: '/', icon: Home },
    ]

    let href = ''
    segments.forEach((segment, index) => {
      href += `/${segment}`
      const label = segment
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')

      breadcrumbs.push({
        label,
        href,
      })
    })

    return breadcrumbs
  }, [customItems, pathname])

  const defaultSeparator = (
    <ChevronRight className="w-4 h-4 text-muted-foreground/50" />
  )

  return (
    <nav
      aria-label="Breadcrumb"
      className={cn('flex items-center gap-2 text-sm', className)}
    >
      <ol className="flex items-center gap-2 flex-wrap">
        {items.map((item, index) => {
          const isLast = index === items.length - 1
          const Icon = item.icon

          return (
            <li key={item.href} className="flex items-center gap-2">
              {/* Breadcrumb Link/Text */}
              {isLast ? (
                <span className="flex items-center gap-2 text-foreground font-medium">
                  {Icon && <Icon className="w-4 h-4" />}
                  <span>{item.label}</span>
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group"
                >
                  {Icon && (
                    <Icon className="w-4 h-4 transition-transform group-hover:scale-110" />
                  )}
                  <span className="relative">
                    {item.label}
                    <span className="absolute inset-x-0 -bottom-0.5 h-px bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                  </span>
                </Link>
              )}

              {/* Separator */}
              {!isLast && (
                <span className="flex items-center" aria-hidden="true">
                  {separator ?? defaultSeparator}
                </span>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

// Alternative: Compact Breadcrumbs with Dropdown for Long Paths
export function CompactBreadcrumbs({
  items: customItems,
  className,
}: PremiumBreadcrumbsProps) {
  const pathname = usePathname()
  const [showAll, setShowAll] = React.useState(false)

  const items = React.useMemo(() => {
    if (customItems) return customItems

    const segments = pathname.split('/').filter(Boolean)
    const breadcrumbs: BreadcrumbItem[] = [
      { label: 'Home', href: '/', icon: Home },
    ]

    let href = ''
    segments.forEach((segment) => {
      href += `/${segment}`
      const label = segment
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')

      breadcrumbs.push({ label, href })
    })

    return breadcrumbs
  }, [customItems, pathname])

  // Show first, last, and "..." if more than 3 items
  const displayItems = React.useMemo(() => {
    if (items.length <= 3 || showAll) return items

    return [
      items[0],
      { label: '...', href: '#', isEllipsis: true },
      items[items.length - 1],
    ]
  }, [items, showAll])

  return (
    <nav
      aria-label="Breadcrumb"
      className={cn('flex items-center gap-2 text-sm', className)}
    >
      <ol className="flex items-center gap-2">
        {displayItems.map((item, index) => {
          const isLast = index === displayItems.length - 1
          const Icon = item.icon

          return (
            <li key={`${item.href}-${index}`} className="flex items-center gap-2">
              {(item as any).isEllipsis ? (
                <button
                  onClick={() => setShowAll(true)}
                  className="px-2 py-1 text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded transition-all"
                >
                  •••
                </button>
              ) : isLast ? (
                <span className="flex items-center gap-2 text-foreground font-medium px-2 py-1 bg-primary/5 rounded">
                  {Icon && <Icon className="w-4 h-4" />}
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="flex items-center gap-2 px-2 py-1 text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded transition-all"
                >
                  {Icon && <Icon className="w-4 h-4" />}
                  {item.label}
                </Link>
              )}

              {!isLast && (
                <ChevronRight className="w-4 h-4 text-muted-foreground/50" />
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
