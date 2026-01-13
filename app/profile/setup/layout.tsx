import { redirect } from 'next/navigation'
import { getCurrentUser } from '@/lib/auth-service'
import { AppLayout } from '@/components/layout/app-layout'

export default async function ProfileSetupLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getCurrentUser()

  if (!user) {
    redirect('/auth/login')
  }

  return (
    <AppLayout user={user}>
      {children}
    </AppLayout>
  )
}
