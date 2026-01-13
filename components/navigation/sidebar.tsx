'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  Home, 
  Search, 
  Briefcase, 
  MessageSquare, 
  Sparkles, 
  TrendingUp,
  User,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useState } from 'react'
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

interface SidebarProps {
  user?: {
    display_name?: string
    username?: string
    email?: string
    profile_image_url?: string
  }
  onLogout?: () => void
}

export function Sidebar({ user, onLogout }: SidebarProps) {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          "hidden lg:flex flex-col fixed left-0 top-0 h-screen bg-card border-r border-border transition-all duration-300 z-40",
          isCollapsed ? "w-20" : "w-64"
        )}
      >
        {/* Header */}
        <div className="p-6 border-b border-border">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-5 h-5 text-primary" />
            </div>
            {!isCollapsed && (
              <span className="text-xl font-bold tracking-tight">Influx</span>
            )}
          </Link>
          
          {!isCollapsed && (
            <div className="mt-4">
              <KarmaBalance />
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-6">
          <div className="px-3 space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                  title={isCollapsed ? item.label : undefined}
                >
                  <Icon className={cn(
                    "w-5 h-5 flex-shrink-0",
                    isActive ? "text-primary" : "group-hover:scale-110 transition-transform"
                  )} />
                  {!isCollapsed && (
                    <>
                      <span className="font-medium text-sm">{item.label}</span>
                      {item.badge && item.badge > 0 && (
                        <span className="ml-auto bg-primary text-primary-foreground text-xs font-bold px-2 py-0.5 rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </>
                  )}
                  {isCollapsed && item.badge && item.badge > 0 && (
                    <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                      {item.badge}
                    </span>
                  )}
                </Link>
              )
            })}
          </div>

          {/* Divider */}
          <div className="my-4 mx-3 border-t border-border" />

          {/* Secondary Navigation */}
          <div className="px-3 space-y-1">
            {secondaryNavigation.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                  title={isCollapsed ? item.label : undefined}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {!isCollapsed && <span className="font-medium text-sm">{item.label}</span>}
                </Link>
              )
            })}
          </div>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-border space-y-3">
          {!isCollapsed && <ThemeToggle />}
          
          {user && (
            <div className={cn(
              "flex items-center gap-3 p-2 rounded-xl hover:bg-muted transition-colors",
              isCollapsed && "justify-center"
            )}>
              <div className="w-10 h-10 rounded-full bg-muted overflow-hidden flex-shrink-0">
                {user.profile_image_url ? (
                  <img src={user.profile_image_url} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-foreground font-bold text-sm">
                    {(user.display_name || user.username || user.email)?.[0]?.toUpperCase()}
                  </div>
                )}
              </div>
              {!isCollapsed && (
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {user.display_name || user.username || 'User'}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {user.email}
                  </p>
                </div>
              )}
            </div>
          )}

          {onLogout && (
            <button
              onClick={onLogout}
              className={cn(
                "flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors",
                isCollapsed && "justify-center"
              )}
              title={isCollapsed ? "Logout" : undefined}
            >
              <LogOut className="w-5 h-5 flex-shrink-0" />
              {!isCollapsed && <span className="font-medium text-sm">Logout</span>}
            </button>
          )}

          {/* Collapse Toggle */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="w-full flex items-center justify-center p-2 rounded-xl hover:bg-muted transition-colors"
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? (
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            ) : (
              <ChevronLeft className="w-5 h-5 text-muted-foreground" />
            )}
          </button>
        </div>
      </aside>

    </>
  )
}
