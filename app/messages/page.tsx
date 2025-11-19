import { redirect } from 'next/navigation'
import { getCurrentUser } from '@/lib/auth-service'
import ChatInterface from './chat-interface'

export default async function MessagesPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect('/auth/login')
  }

  return <ChatInterface currentUser={user} />
}
