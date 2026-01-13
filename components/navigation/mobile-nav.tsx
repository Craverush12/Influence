'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { 
  Menu,
  X,
  Home, 
  Search, 
  Briefcase, 
  MessageSquare, 
  Sparkles, 
  TrendingUp,
  User,
  Settings,
  LogOut,
  Bell
} from 'lucide-react'
import { cn } from '@/lib/utils'
import KarmaBalance from '@/components/karma-balance'
import { ThemeToggle } from '@/components/theme-toggle'

interface NavItem {
  label: string
  href: string
  icon: typeof Home
  badge?: number
}

const navigation: NavItem[] = [
  { label: 'Home', href: '/', icon: Home },
  { label: 'Explore', href: '/explore', icon: Search },
  { label: 'Jobs', href: '/jobs', icon: Briefcase },
  { label: 'Messages', href: '/messages', icon: MessageSquare },
  { label: 'Vibe Match', href: '/vibe-match', icon: Sparkles },
  { label: 'Trends', href: '/trends', icon: TrendingUp },
]

const secondaryNavigation: NavItem[] = [
  { label: 'Profile', href: '/profile/setup', icon: User },
  { label: 'Settings', href: '/settings', icon: Settings },
]

interface MobileNavProps {
  user?: {
    display_name?: string
    username?: string
    email?: string
    profile_image_url?: string
  }
  onLogout?: () => void
}

export function MobileNav({ user, onLogout }: MobileNavProps) {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  // Close drawer on route change
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return (
    <>
      {/* Top Bar */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-background/80 backdrop-blur-md border-b border-border z-50">
        <div className="flex items-center justify-between h-full px-4">
          {/* Hamburger Button */}
          <button
            onClick={() => setIsOpen(true)}
            className="p-2 -ml-2 rounded-lg hover:bg-muted transition-colors"
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-primary" />
            </div>
            <span className="text-lg font-bold tracking-tight">Influx</span>
          </Link>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            <button
              className="p-2 rounded-lg hover:bg-muted transition-colors relative"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5" />
              {/* Badge */}
              <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
            </button>
            
            <Link href="/profile/setup" className="w-8 h-8 rounded-full bg-muted overflow-hidden">
              {user?.profile_image_url ? (
                <img src={user.profile_image_url} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-foreground font-bold text-xs">
                  {(user?.display_name || user?.username || user?.email)?.[0]?.toUpperCase()}
                </div>
              )}
            </Link>
          </div>
        </div>
      </header>

      {/* Spacer for fixed header */}
      <div className="lg:hidden h-16" />

      {/* Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Drawer */}
      <aside
        className={cn(
          "lg:hidden fixed top-0 left-0 bottom-0 w-80 max-w-[85vw] bg-card border-r border-border z-50 transform transition-transform duration-300 ease-in-out overflow-y-auto",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Drawer Header */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between mb-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-primary" />
              </div>
              <span className="text-xl font-bold tracking-tight">Influx</span>
            </Link>
            
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-lg hover:bg-muted transition-colors"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* User Info */}
          {user && (
            <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50">
              <div className="w-12 h-12 rounded-full bg-muted overflow-hidden flex-shrink-0">
                {user.profile_image_url ? (
                  <img src={user.profile_image_url} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-foreground font-bold">
                    {(user.display_name || user.username || user.email)?.[0]?.toUpperCase()}
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {user.display_name || user.username || 'User'}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {user.email}
                </p>
              </div>
            </div>
          )}

          <div className="mt-4">
            <KarmaBalance />
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4">
          <div className="space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <span className="font-medium text-sm">{item.label}</span>
                  {item.badge && item.badge > 0 && (
                    <span className="ml-auto bg-primary text-primary-foreground text-xs font-bold px-2 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </Link>
              )
            })}
          </div>

          {/* Divider */}
          <div className="my-4 border-t border-border" />

          {/* Secondary Navigation */}
          <div className="space-y-1">
            {secondaryNavigation.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <span className="font-medium text-sm">{item.label}</span>
                </Link>
              )
            })}
          </div>
        </nav>

        {/* Drawer Footer */}
        <div className="p-4 border-t border-border space-y-3 mt-auto">
          <ThemeToggle />
          
          {onLogout && (
            <button
              onClick={onLogout}
              className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
            >
              <LogOut className="w-5 h-5 flex-shrink-0" />
              <span className="font-medium text-sm">Logout</span>
            </button>
          )}
        </div>
      </aside>
    </>
  )
}
