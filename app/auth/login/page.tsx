'use client'

import { useActionState } from 'react'
import Link from 'next/link'
import { login } from '@/app/actions/auth'
import { ArrowRight, Eye, EyeOff, Sparkles } from 'lucide-react'
import { useState } from 'react'

const initialState = {
  error: '',
}

export default function LoginPage() {
  const [state, action, isPending] = useActionState(login, initialState)
  const [showPassword, setShowPassword] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex items-center justify-center px-4 py-16">
      {/* Minimal Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Elegant Header */}
        <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex justify-center mb-6">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-primary" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-foreground">
            Welcome Back
          </h1>
          <p className="text-base text-muted-foreground leading-relaxed max-w-md mx-auto mb-2">
            Continue your creative journey. Connect with collaborators, discover new opportunities, and keep building the future you envision.
          </p>
        </div>

        {/* Minimal Form Card */}
        <div className="glass-card p-8 md:p-10 animate-in fade-in slide-in-from-bottom-8 duration-700 bg-card border border-border">
          <form action={action} className="space-y-5">
            {/* Email */}
            <div className="space-y-2">
              <label className="block text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wider">
                Email Address
              </label>
              <div className="relative">
                <input
                  name="email"
                  type="email"
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  className={`w-full bg-muted/50 border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300 ${focusedField === 'email' ? 'bg-background' : ''
                    }`}
                  placeholder="your@email.com"
                  required
                  autoFocus
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="block text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wider">
                Password
              </label>
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField(null)}
                  className={`w-full bg-muted/50 border border-border rounded-xl px-4 py-3 pr-12 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300 ${focusedField === 'password' ? 'bg-background' : ''
                    }`}
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {state?.error && (
              <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm flex items-center gap-2">
                <span>⚠</span>
                {state.error}
              </div>
            )}

            <button
              type="submit"
              disabled={isPending}
              className="btn-primary w-full inline-flex items-center justify-center gap-2 py-4 text-base font-medium group relative overflow-hidden mt-8"
            >
              <span className="relative z-10 flex items-center gap-2">
                {isPending ? (
                  <>
                    <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin"></div>
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </span>
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-border">
            <p className="text-center text-muted-foreground text-sm">
              Don't have an account?{' '}
              <Link href="/auth/signup" className="font-medium text-primary hover:underline transition-all">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
