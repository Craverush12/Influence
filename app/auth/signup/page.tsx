'use client'

import { useRouter } from 'next/navigation'
import SignupWizard from '@/components/signup-wizard'

export default function SignupPage() {
  const router = useRouter()

  const handleComplete = () => {
    // Redirect to dashboard or onboarding after successful signup
    router.push('/dashboard')
  }

  return <SignupWizard onComplete={handleComplete} />
}
