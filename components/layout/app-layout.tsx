'use client'

import { Sidebar } from '@/components/navigation/sidebar'
import { MobileNav } from '@/components/navigation/mobile-nav'
import { useRouter } from 'next/navigation'

interface AppLayoutProps {
  children: React.ReactNode
  user?: {
    id: string
    display_name?: string
    username?: string
    email?: string
    profile_image_url?: string
  }
}

export function AppLayout({ children, user }: AppLayoutProps) {
  const router = useRouter()

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth/logout', { method: 'POST' })
      if (response.ok) {
        router.push('/auth/login')
        router.refresh()
      }
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Desktop Sidebar */}
      <Sidebar user={user} onLogout={handleLogout} />
      
      {/* Mobile Navigation */}
      <MobileNav user={user} onLogout={handleLogout} />
      
      {/* Main Content - Flex grows to fill remaining space */}
      <main className="flex-1 min-h-screen w-full lg:w-auto">
        {children}
      </main>
    </div>
  )
}
