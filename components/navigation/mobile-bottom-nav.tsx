'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Home,
  Compass,
  Briefcase,
  MessageSquare,
  User,
  Plus,
  Sparkles,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'

interface MobileBottomNavProps {
  notifications?: number
  className?: string
}

export function MobileBottomNav({ notifications = 0, className }: MobileBottomNavProps) {
  const pathname = usePathname()
  const [activeTab, setActiveTab] = React.useState(pathname)

  React.useEffect(() => {
    setActiveTab(pathname)
  }, [pathname])

  const navItems = [
    {
      href: '/',
      label: 'Home',
      icon: Home,
    },
    {
      href: '/explore',
      label: 'Explore',
      icon: Compass,
    },
    {
      href: '/create',
      label: 'Create',
      icon: Plus,
      isAction: true, // Special center button
    },
    {
      href: '/messages',
      label: 'Messages',
      icon: MessageSquare,
      badge: notifications,
    },
    {
      href: '/profile',
      label: 'Profile',
      icon: User,
    },
  ]

  return (
    <nav className={cn(
      'lg:hidden fixed bottom-0 left-0 right-0 z-40 pb-safe',
      className
    )}>
      {/* Glass Background with Border */}
      <div className="relative">
        {/* Top border glow */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        
        {/* Main Nav Container */}
        <div className="glass-premium border-t border-border/30">
          <div className="max-w-screen-xl mx-auto px-4">
            <div className="flex items-center justify-around h-16 relative">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
                
                // Special handling for center action button
                if (item.isAction) {
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex flex-col items-center justify-center -mt-8 group"
                    >
                      <div className="w-14 h-14 rounded-full bg-gradient-aurora-1 shadow-lg shadow-primary/40 flex items-center justify-center group-hover:scale-110 group-active:scale-95 transition-all duration-200">
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <span className="text-xs font-medium text-primary mt-1">
                        {item.label}
                      </span>
                    </Link>
                  )
                }

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex flex-col items-center justify-center gap-1 min-w-[60px] group relative"
                  >
                    {/* Active Indicator */}
                    {isActive && (
                      <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-8 h-1 bg-primary rounded-full" />
                    )}

                    {/* Icon Container */}
                    <div className="relative">
                      <Icon
                        className={cn(
                          'w-6 h-6 transition-all duration-200',
                          isActive
                            ? 'text-primary scale-110'
                            : 'text-muted-foreground group-hover:text-foreground group-hover:scale-110'
                        )}
                      />
                      
                      {/* Badge for notifications */}
                      {item.badge && item.badge > 0 && (
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-destructive rounded-full flex items-center justify-center shadow-lg">
                          <span className="text-[9px] font-bold text-white">
                            {item.badge > 9 ? '9+' : item.badge}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Label */}
                    <span
                      className={cn(
                        'text-xs font-medium transition-colors duration-200',
                        isActive ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'
                      )}
                    >
                      {item.label}
                    </span>

                    {/* Hover Effect */}
                    <div
                      className={cn(
                        'absolute inset-0 rounded-lg transition-all duration-200',
                        isActive
                          ? 'bg-primary/5'
                          : 'bg-transparent group-hover:bg-secondary/30'
                      )}
                    />
                  </Link>
                )
              })}
            </div>
          </div>
        </div>

        {/* Bottom Safe Area for iOS */}
        <div className="h-safe bg-background/95 backdrop-blur-sm" />
      </div>
    </nav>
  )
}

// Alternative: Minimal Floating Bottom Nav
export function FloatingBottomNav({ notifications = 0, className }: MobileBottomNavProps) {
  const pathname = usePathname()

  const navItems = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/explore', label: 'Explore', icon: Compass },
    { href: '/jobs', label: 'Jobs', icon: Briefcase },
    { href: '/messages', label: 'Messages', icon: MessageSquare, badge: notifications },
  ]

  return (
    <nav className={cn(
      'lg:hidden fixed bottom-6 left-4 right-4 z-40',
      className
    )}>
      <div className="glass-aurora rounded-2xl shadow-2xl">
        <div className="flex items-center justify-around px-2 py-3">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-200 relative',
                  isActive
                    ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/30 scale-110'
                    : 'text-muted-foreground hover:bg-white/10 hover:scale-105'
                )}
              >
                <Icon className="w-5 h-5" />
                
                {/* Badge */}
                {item.badge && item.badge > 0 && (
                  <Badge 
                    variant="error" 
                    size="sm"
                    className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center text-[9px]"
                  >
                    {item.badge > 9 ? '9+' : item.badge}
                  </Badge>
                )}
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
