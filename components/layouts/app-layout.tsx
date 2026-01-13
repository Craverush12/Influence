'use client'

import * as React from 'react'
import { PremiumSidebar } from '@/components/navigation/premium-sidebar'
import { MobileBottomNav, FloatingBottomNav } from '@/components/navigation/mobile-bottom-nav'
import { CommandPalette } from '@/components/navigation/command-palette'
import { PremiumBreadcrumbs } from '@/components/navigation/premium-breadcrumbs'
import { Button } from '@/components/ui/button'
import { Search, Bell, Command as CommandIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'

interface AppLayoutProps {
  children: React.ReactNode
  user?: {
    name: string
    avatar?: string
    notifications?: number
  }
  showBreadcrumbs?: boolean
  showTopBar?: boolean
  showSidebar?: boolean
  showBottomNav?: boolean
  useFloatingBottomNav?: boolean
  className?: string
}

export function AppLayout({
  children,
  user = { name: 'Creator', notifications: 3 },
  showBreadcrumbs = true,
  showTopBar = true,
  showSidebar = true,
  showBottomNav = true,
  useFloatingBottomNav = false,
  className,
}: AppLayoutProps) {
  const [commandOpen, setCommandOpen] = React.useState(false)

  return (
    <div className="min-h-screen bg-background">
      {/* Command Palette */}
      <CommandPalette open={commandOpen} onOpenChange={setCommandOpen} />

      <div className="flex">
        {/* Premium Sidebar - Desktop */}
        {showSidebar && (
          <PremiumSidebar
            userName={user.name}
            userAvatar={user.avatar}
            notifications={user.notifications}
          />
        )}

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-h-screen">
          {/* Top Bar - Desktop */}
          {showTopBar && (
            <header className="sticky top-0 z-30 glass-panel backdrop-blur-xl border-b border-border/50">
              <div className="max-w-screen-2xl mx-auto px-4 lg:px-8 h-16 flex items-center justify-between gap-4">
                {/* Breadcrumbs - Desktop Only */}
                {showBreadcrumbs && (
                  <div className="hidden lg:flex flex-1 min-w-0">
                    <PremiumBreadcrumbs />
                  </div>
                )}

                {/* Mobile: Just logo/title */}
                <div className="lg:hidden flex-1 min-w-0">
                  <h1 className="text-lg font-bold text-foreground truncate">
                    Creator Hub
                  </h1>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  {/* Command Palette Trigger */}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setCommandOpen(true)}
                    className="hidden lg:flex"
                  >
                    <Search className="w-5 h-5" />
                  </Button>

                  {/* Command Palette with Kbd - Desktop */}
                  <button
                    onClick={() => setCommandOpen(true)}
                    className="hidden xl:flex items-center gap-2 px-3 py-2 bg-secondary/50 hover:bg-secondary rounded-lg transition-colors group"
                  >
                    <Search className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      Quick search...
                    </span>
                    <kbd className="px-2 py-0.5 text-xs bg-background rounded border border-border text-muted-foreground">
                      ⌘K
                    </kbd>
                  </button>

                  {/* Notifications */}
                  <Button variant="ghost" size="icon" className="relative">
                    <Bell className="w-5 h-5" />
                    {user.notifications && user.notifications > 0 && (
                      <Badge
                        variant="error"
                        size="sm"
                        className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center text-[9px]"
                      >
                        {user.notifications > 9 ? '9+' : user.notifications}
                      </Badge>
                    )}
                  </Button>

                  {/* Mobile Command Trigger */}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setCommandOpen(true)}
                    className="lg:hidden"
                  >
                    <CommandIcon className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </header>
          )}

          {/* Page Content */}
          <main className={cn('flex-1', className)}>
            {children}
          </main>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      {showBottomNav && (
        <>
          {useFloatingBottomNav ? (
            <FloatingBottomNav notifications={user.notifications} />
          ) : (
            <MobileBottomNav notifications={user.notifications} />
          )}
        </>
      )}
    </div>
  )
}

// Alternative: Minimal Layout (No Sidebar)
export function MinimalLayout({ children, className }: { children: React.ReactNode; className?: string }) {
  const [commandOpen, setCommandOpen] = React.useState(false)

  return (
    <div className="min-h-screen bg-background">
      <CommandPalette open={commandOpen} onOpenChange={setCommandOpen} />

      {/* Simple Top Bar */}
      <header className="sticky top-0 z-30 glass-panel backdrop-blur-xl border-b border-border/50">
        <div className="max-w-screen-xl mx-auto px-4 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-aurora-1 flex items-center justify-center">
              <span className="text-white font-bold text-sm">C</span>
            </div>
            <span className="font-bold text-lg">Creator Hub</span>
          </a>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setCommandOpen(true)}
            className="gap-2"
          >
            <Search className="w-4 h-4" />
            <span className="hidden sm:inline">Search</span>
            <kbd className="hidden lg:inline px-2 py-0.5 text-xs bg-background rounded border border-border">
              ⌘K
            </kbd>
          </Button>
        </div>
      </header>

      <main className={cn('min-h-[calc(100vh-4rem)]', className)}>
        {children}
      </main>
    </div>
  )
}

// Alternative: Full-Screen Layout (No Nav)
export function FullScreenLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      {children}
    </div>
  )
}
