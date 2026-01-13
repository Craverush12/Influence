'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command'
import {
  Home,
  Search,
  Compass,
  Briefcase,
  MessageSquare,
  User,
  Settings,
  TrendingUp,
  Users,
  Sparkles,
  Zap,
  Crown,
  FileText,
  HelpCircle,
  LogOut,
  Moon,
  Sun,
  Palette,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'

interface CommandPaletteProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export function CommandPalette({ open: controlledOpen, onOpenChange }: CommandPaletteProps) {
  const router = useRouter()
  const [open, setOpen] = React.useState(false)
  const [search, setSearch] = React.useState('')

  // Use controlled or uncontrolled state
  const isOpen = controlledOpen ?? open
  const setIsOpen = onOpenChange ?? setOpen

  // Keyboard shortcut: Cmd+K or Ctrl+K
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setIsOpen((open) => !open)
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [setIsOpen])

  const handleSelect = React.useCallback(
    (callback: () => void) => {
      setIsOpen(false)
      callback()
    },
    [setIsOpen]
  )

  // Quick Actions
  const quickActions = [
    {
      label: 'Search everything',
      icon: Search,
      onSelect: () => router.push('/search'),
      kbd: '⌘K',
    },
    {
      label: 'Find creators',
      icon: Users,
      onSelect: () => router.push('/explore'),
    },
    {
      label: 'Vibe Match',
      icon: Sparkles,
      onSelect: () => router.push('/aura'),
      badge: 'AI',
    },
    {
      label: 'Post a job',
      icon: Briefcase,
      onSelect: () => router.push('/jobs/new'),
      badge: 'New',
    },
  ]

  // Navigation
  const navigationItems = [
    { label: 'Home', icon: Home, href: '/' },
    { label: 'Explore Creators', icon: Compass, href: '/explore' },
    { label: 'Dashboard', icon: TrendingUp, href: '/dashboard' },
    { label: 'Jobs Board', icon: Briefcase, href: '/jobs' },
    { label: 'Messages', icon: MessageSquare, href: '/messages' },
    { label: 'Collaborations', icon: Users, href: '/collab' },
    { label: 'Trends', icon: TrendingUp, href: '/trends', badge: 'Hot' },
    { label: 'Your Profile', icon: User, href: '/profile' },
  ]

  // Settings & Preferences
  const settingsItems = [
    { label: 'Settings', icon: Settings, href: '/settings' },
    { label: 'Appearance', icon: Palette, onSelect: () => console.log('Theme picker') },
    { label: 'Toggle dark mode', icon: Moon, onSelect: () => console.log('Toggle theme') },
    { label: 'Help & Support', icon: HelpCircle, href: '/help' },
    { label: 'Documentation', icon: FileText, href: '/docs' },
  ]

  // Pro Features
  const proFeatures = [
    { label: 'Upgrade to Pro', icon: Crown, href: '/pricing', badge: 'Pro' },
    { label: 'Advanced Analytics', icon: Zap, href: '/analytics', badge: 'Pro' },
  ]

  return (
    <CommandDialog open={isOpen} onOpenChange={setIsOpen}>
      <Command className="rounded-2xl border-2 border-border/50 shadow-2xl bg-charcoal">
        <CommandInput
          placeholder="Search for anything..."
          value={search}
          onValueChange={setSearch}
          className="h-14 text-base border-b border-border/50"
        />
        <CommandList className="max-h-[500px] p-2">
          <CommandEmpty className="py-12 text-center">
            <div className="flex flex-col items-center gap-3">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                <Search className="w-8 h-8 text-muted-foreground" />
              </div>
              <div>
                <div className="font-medium text-foreground mb-1">No results found</div>
                <div className="text-sm text-muted-foreground">
                  Try searching for something else
                </div>
              </div>
            </div>
          </CommandEmpty>

          {/* Quick Actions */}
          <CommandGroup heading="Quick Actions" className="mb-2">
            {quickActions.map((item) => {
              const Icon = item.icon
              return (
                <CommandItem
                  key={item.label}
                  onSelect={() => handleSelect(item.onSelect)}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg aria-selected:bg-primary/10 aria-selected:text-primary cursor-pointer group"
                >
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center group-aria-selected:bg-primary/20 transition-colors">
                    <Icon className="w-4 h-4 text-primary" />
                  </div>
                  <span className="flex-1 font-medium">{item.label}</span>
                  {item.badge && (
                    <Badge variant="aurora" size="sm">
                      {item.badge}
                    </Badge>
                  )}
                  {item.kbd && (
                    <kbd className="px-2 py-1 text-xs bg-muted rounded border border-border text-muted-foreground">
                      {item.kbd}
                    </kbd>
                  )}
                </CommandItem>
              )
            })}
          </CommandGroup>

          <CommandSeparator className="my-2" />

          {/* Navigation */}
          <CommandGroup heading="Navigate" className="mb-2">
            {navigationItems.map((item) => {
              const Icon = item.icon
              return (
                <CommandItem
                  key={item.href}
                  onSelect={() => handleSelect(() => router.push(item.href))}
                  className="flex items-center gap-3 px-4 py-2.5 rounded-lg aria-selected:bg-secondary cursor-pointer"
                >
                  <Icon className="w-4 h-4 text-muted-foreground" />
                  <span className="flex-1">{item.label}</span>
                  {item.badge && (
                    <Badge variant="warning" size="sm">
                      {item.badge}
                    </Badge>
                  )}
                </CommandItem>
              )
            })}
          </CommandGroup>

          <CommandSeparator className="my-2" />

          {/* Pro Features */}
          <CommandGroup heading="Premium" className="mb-2">
            {proFeatures.map((item) => {
              const Icon = item.icon
              return (
                <CommandItem
                  key={item.href}
                  onSelect={() => handleSelect(() => router.push(item.href))}
                  className="flex items-center gap-3 px-4 py-2.5 rounded-lg aria-selected:bg-gradient-aurora-1/10 cursor-pointer group"
                >
                  <div className="w-8 h-8 rounded-lg bg-gradient-aurora-1 flex items-center justify-center shadow-lg shadow-primary/20">
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  <span className="flex-1 font-medium">{item.label}</span>
                  <Badge variant="aurora" size="sm">
                    {item.badge}
                  </Badge>
                </CommandItem>
              )
            })}
          </CommandGroup>

          <CommandSeparator className="my-2" />

          {/* Settings */}
          <CommandGroup heading="Settings & Support">
            {settingsItems.map((item) => {
              const Icon = item.icon
              return (
                <CommandItem
                  key={item.label}
                  onSelect={() =>
                    handleSelect(
                      item.href
                        ? () => router.push(item.href!)
                        : item.onSelect!
                    )
                  }
                  className="flex items-center gap-3 px-4 py-2.5 rounded-lg aria-selected:bg-secondary cursor-pointer"
                >
                  <Icon className="w-4 h-4 text-muted-foreground" />
                  <span className="flex-1">{item.label}</span>
                </CommandItem>
              )
            })}
          </CommandGroup>
        </CommandList>

        {/* Footer */}
        <div className="border-t border-border/50 p-3 bg-muted/30">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-background rounded border border-border">↑</kbd>
                <kbd className="px-1.5 py-0.5 bg-background rounded border border-border">↓</kbd>
                <span>Navigate</span>
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-background rounded border border-border">↵</kbd>
                <span>Select</span>
              </span>
            </div>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-background rounded border border-border">Esc</kbd>
              <span>Close</span>
            </span>
          </div>
        </div>
      </Command>
    </CommandDialog>
  )
}

// Hook for easy usage
export function useCommandPalette() {
  const [open, setOpen] = React.useState(false)

  const toggle = React.useCallback(() => {
    setOpen((prev) => !prev)
  }, [])

  return {
    open,
    setOpen,
    toggle,
    CommandPalette: () => <CommandPalette open={open} onOpenChange={setOpen} />,
  }
}
