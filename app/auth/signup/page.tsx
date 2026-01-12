'use client'

import { useState } from 'react'
import { useActionState } from 'react'
import { useRouter } from 'next/navigation'
import { signup } from '@/app/actions/auth'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'

const initialState = {
  error: '',
}

export default function SignupPage() {
  const router = useRouter()
  const [state, action, isPending] = useActionState(signup, initialState)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    displayName: '',
    username: '',
    role: 'creator' as 'creator' | 'professional',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const formDataToSubmit = new FormData()
    Object.entries(formData).forEach(([key, value]) => {
      formDataToSubmit.append(key, value as string)
    })
    await action(formDataToSubmit)
    if (!state?.error) {
      router.push('/dashboard')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Create Account</CardTitle>
          <CardDescription>Join Creator Hub today</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Email</label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Username</label>
              <Input
                type="text"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Display Name</label>
              <Input
                type="text"
                value={formData.displayName}
                onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Password</label>
              <Input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
            </div>
            {state?.error && (
              <div className="text-sm text-destructive">{state.error}</div>
            )}
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? 'Creating account...' : 'Sign Up'}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link href="/auth/login" className="text-primary hover:underline">
              Sign in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
