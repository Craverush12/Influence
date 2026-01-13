'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  BriefcaseIcon as Briefcase,
  Users,
  MessageSquare,
  Settings,
  LogOut,
  Home,
  Search,
  Bell,
  Sparkles,
  TrendingUp,
  Compass,
  Zap,
  Menu,
  X,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

interface PremiumSidebarProps {
  userType?: 'creator' | 'professional'
  userName?: string
  userAvatar?: string
  notifications?: number
}

export function PremiumSidebar({
  userType = 'creator',
  userName = 'Creator',
  userAvatar,
  notifications = 0,
}: PremiumSidebarProps) {
  const pathname = usePathname()
  const [isMobileOpen, setIsMobileOpen] = React.useState(false)

  const allLinks = [
    // Universal Links
    { href: '/', label: 'Home', icon: Home, section: 'main', badge: null },
    { href: '/explore', label: 'Explore', icon: Compass, section: 'main', badge: null },
    { href: '/trends', label: 'Trends', icon: TrendingUp, section: 'main', badge: 'Hot' },
    
    // Creator Links
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, section: 'work', badge: null },
    { href: '/jobs', label: 'Jobs', icon: Briefcase, section: 'work', badge: null },
    { href: '/collab', label: 'Collaborations', icon: Users, section: 'work', badge: null },
    
    // Communication
    { href: '/messages', label: 'Messages', icon: MessageSquare, section: 'social', badge: notifications > 0 ? notifications.toString() : null },
    { href: '/aura', label: 'Vibe Match', icon: Sparkles, section: 'social', badge: 'AI' },
  ]

  const mainLinks = allLinks.filter(link => link.section === 'main')
  const workLinks = allLinks.filter(link => link.section === 'work')
  const socialLinks = allLinks.filter(link => link.section === 'social')

  const NavLink = ({ link }: { link: typeof allLinks[0] }) => {
    const Icon = link.icon
    const isActive = pathname === link.href || pathname.startsWith(link.href + '/')

    return (
      <Link
        href={link.href}
        onClick={() => setIsMobileOpen(false)}
        className={cn(
          'group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 relative',
          isActive
            ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20'
            : 'text-muted-foreground hover:bg-secondary/50 hover:text-foreground hover:-translate-y-0.5'
        )}
      >
        {/* Active Indicator */}
        {isActive && (
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary rounded-r-full" />
        )}

        <Icon className={cn(
          'w-5 h-5 transition-transform duration-200',
          isActive ? 'scale-110' : 'group-hover:scale-110'
        )} />
        
        <span className="font-medium flex-1">{link.label}</span>
        
        {/* Badge */}
        {link.badge && (
          <Badge 
            variant={link.badge === 'AI' ? 'aurora' : link.badge === 'Hot' ? 'warning' : 'default'} 
            size="sm"
            className="animate-pulse-glow"
          >
            {link.badge}
          </Badge>
        )}

        {/* Hover Effect */}
        {!isActive && (
          <div className="absolute inset-0 bg-gradient-surface-glow rounded-xl opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
        )}
      </Link>
    )
  }

  const SidebarContent = () => (
    <>
      {/* Logo Section */}
      <div className="p-6 border-b border-border/50">
        <Link 
          href="/" 
          className="flex items-center gap-3 group"
          onClick={() => setIsMobileOpen(false)}
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-aurora-1 flex items-center justify-center shadow-lg shadow-primary/20 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12">
            <span className="text-white font-bold text-lg">C</span>
          </div>
          <div className="flex-1">
            <div className="font-bold text-lg text-foreground leading-tight">Creator Hub</div>
            <div className="text-xs text-muted-foreground">Where magic happens</div>
          </div>
        </Link>
      </div>

      {/* User Profile Card */}
      <div className="p-4">
        <Link 
          href="/profile" 
          className="flex items-center gap-3 p-3 rounded-xl glass-aurora hover:-translate-y-1 transition-all duration-300 hover:shadow-xl group"
          onClick={() => setIsMobileOpen(false)}
        >
          {userAvatar ? (
            <img src={userAvatar} alt={userName} className="w-10 h-10 rounded-full" />
          ) : (
            <div className="w-10 h-10 rounded-full bg-gradient-aurora-2 flex items-center justify-center">
              <span className="text-white font-bold text-sm">
                {userName.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
          <div className="flex-1 min-w-0">
            <div className="font-semibold text-sm text-foreground truncate">{userName}</div>
            <div className="text-xs text-muted-foreground flex items-center gap-1">
              <Zap className="w-3 h-3 text-primary" />
              <span>Pro Member</span>
            </div>
          </div>
          <Badge variant="success" size="sm">+99</Badge>
        </Link>
      </div>

      {/* Navigation Sections */}
      <nav className="flex-1 px-4 overflow-y-auto">
        {/* Main Section */}
        <div className="mb-6">
          <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3 px-4">
            Discover
          </div>
          <div className="space-y-1">
            {mainLinks.map((link) => (
              <NavLink key={link.href} link={link} />
            ))}
          </div>
        </div>

        {/* Work Section */}
        <div className="mb-6">
          <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3 px-4">
            Your Work
          </div>
          <div className="space-y-1">
            {workLinks.map((link) => (
              <NavLink key={link.href} link={link} />
            ))}
          </div>
        </div>

        {/* Social Section */}
        <div className="mb-6">
          <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3 px-4">
            Connect
          </div>
          <div className="space-y-1">
            {socialLinks.map((link) => (
              <NavLink key={link.href} link={link} />
            ))}
          </div>
        </div>

        {/* CTA Card */}
        <div className="mx-4 mb-6">
          <div className="relative overflow-hidden rounded-2xl p-6 bg-gradient-aurora-1 text-white">
            <div className="relative z-10">
              <Sparkles className="w-8 h-8 mb-3" />
              <h3 className="font-bold text-lg mb-2">Upgrade to Pro</h3>
              <p className="text-sm text-white/80 mb-4 leading-relaxed">
                Unlock unlimited collaborations and premium features.
              </p>
              <Button variant="glass" size="sm" className="w-full text-white">
                Learn More
              </Button>
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
          </div>
        </div>
      </nav>

      {/* Footer Section */}
      <div className="p-4 border-t border-border/50 space-y-2">
        <Link 
          href="/settings" 
          className="flex items-center gap-3 px-4 py-3 text-muted-foreground hover:bg-secondary/50 hover:text-foreground rounded-xl transition-all"
          onClick={() => setIsMobileOpen(false)}
        >
          <Settings className="w-5 h-5" />
          <span className="font-medium">Settings</span>
        </Link>
        
        <button className="w-full flex items-center gap-3 px-4 py-3 text-muted-foreground hover:bg-destructive/10 hover:text-destructive rounded-xl transition-all">
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Log Out</span>
        </button>
      </div>
    </>
  )

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 w-12 h-12 rounded-xl glass-premium flex items-center justify-center text-foreground shadow-lg"
      >
        {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Desktop Sidebar - Floating Glass */}
      <aside className="hidden lg:flex w-72 h-screen sticky top-0 p-4">
        <div className="w-full glass-premium rounded-2xl flex flex-col overflow-hidden shadow-2xl">
          <SidebarContent />
        </div>
      </aside>

      {/* Mobile Sidebar - Slide from Left */}
      <aside
        className={cn(
          'lg:hidden fixed top-0 left-0 w-80 h-screen z-40 glass-premium flex flex-col overflow-hidden shadow-2xl transition-transform duration-300',
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <SidebarContent />
      </aside>
    </>
  )
}
