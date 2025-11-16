'use client'

import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, BriefcaseIcon as BriefcaseOpen, Users, MessageSquare, Settings, LogOut, Home } from 'lucide-react'

interface SidebarProps {
  userType: 'creator' | 'professional'
}

export function Sidebar({ userType }: SidebarProps) {
  const pathname = usePathname()

  const creatorLinks = [
    { href: '/creators', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/creators/jobs', label: 'My Jobs', icon: BriefcaseOpen },
    { href: '/creators/applications', label: 'Applications', icon: Users },
    { href: '/creators/messages', label: 'Messages', icon: MessageSquare },
    { href: '/creators/settings', label: 'Settings', icon: Settings },
  ]

  const professionalLinks = [
    { href: '/professionals', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/professionals/profile', label: 'My Profile', icon: BriefcaseOpen },
    { href: '/professionals/opportunities', label: 'Opportunities', icon: Home },
    { href: '/professionals/messages', label: 'Messages', icon: MessageSquare },
    { href: '/professionals/settings', label: 'Settings', icon: Settings },
  ]

  const links = userType === 'creator' ? creatorLinks : professionalLinks

  return (
    <aside className="w-64 border-r border-border bg-card flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-border">
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">CH</span>
          </div>
          <span className="font-bold text-foreground">Creator Hub</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {links.map((link) => {
          const Icon = link.icon
          const isActive = pathname === link.href
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-lg transition-colors',
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-accent hover:text-foreground'
              )}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{link.label}</span>
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-border">
        <button className="w-full flex items-center gap-3 px-4 py-3 text-muted-foreground hover:bg-accent rounded-lg transition-colors">
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Log Out</span>
        </button>
      </div>
    </aside>
  )
}
