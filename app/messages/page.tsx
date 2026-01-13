import { redirect } from 'next/navigation'
import { getCurrentUser } from '@/lib/auth-service'
import ChatInterface from './chat-interface'
import { AppLayout } from '@/components/layout/app-layout'
import { Breadcrumbs } from '@/components/navigation/breadcrumbs'

export default async function MessagesPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect('/auth/login')
  }

  return (
    <AppLayout user={user}>
      <div className="h-[calc(100vh-4rem)] lg:h-screen flex flex-col">
        <div className="px-4 sm:px-6 py-4 border-b border-border">
          <Breadcrumbs items={[{ label: 'Messages' }]} />
        </div>
        <div className="flex-1 overflow-hidden">
          <ChatInterface currentUser={user} />
        </div>
      </div>
    </AppLayout>
  )
}
