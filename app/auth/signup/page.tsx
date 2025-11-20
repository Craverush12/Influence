'use client'

import { useActionState, useState } from 'react'
import Link from 'next/link'
import { signup } from '@/app/actions/auth'
import { ArrowRight, Eye, EyeOff, Check, Sparkles } from 'lucide-react'

const initialState = {
  error: '',
}

export default function SignupPage() {
  const [state, action, isPending] = useActionState(signup, initialState)
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const passwordStrength = formData.password.length > 0 ? Math.min(formData.password.length / 8, 1) : 0
  const hasLowercase = /[a-z]/.test(formData.password)
  const hasUppercase = /[A-Z]/.test(formData.password)
  const hasNumber = /[0-9]/.test(formData.password)
  const hasSpecial = /[^a-zA-Z0-9]/.test(formData.password)

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
            Welcome to <span className="text-primary">Creator Hub</span>
          </h1>
          <p className="text-base text-muted-foreground leading-relaxed max-w-md mx-auto mb-2">
            Join a community of creators, influencers, and professionals who are building their dreams together.
          </p>
        </div>

        {/* Minimal Form Card */}
        <div className="glass-card p-8 md:p-10 animate-in fade-in slide-in-from-bottom-8 duration-700 bg-card border border-border">
          <form action={action} className="space-y-5">
            {/* Display Name */}
            <div className="space-y-2">
              <label className="block text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wider">
                Full Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="displayName"
                  onFocus={() => setFocusedField('displayName')}
                  onBlur={() => setFocusedField(null)}
                  className={`w-full bg-muted/50 border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300 ${focusedField === 'displayName' ? 'bg-background' : ''
                    }`}
                  placeholder="Enter your full name"
                  required
                />
              </div>
            </div>

            {/* Username */}
            <div className="space-y-2">
              <label className="block text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wider">
                Username
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="username"
                  onFocus={() => setFocusedField('username')}
                  onBlur={() => setFocusedField(null)}
                  className={`w-full bg-muted/50 border border-border rounded-xl px-4 py-3 pl-10 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300 ${focusedField === 'username' ? 'bg-background' : ''
                    }`}
                  placeholder="yourhandle"
                  required
                />
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">@</span>
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="block text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wider">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  className={`w-full bg-muted/50 border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300 ${focusedField === 'email' ? 'bg-background' : ''
                    }`}
                  placeholder="your@email.com"
                  required
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
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField(null)}
                  className={`w-full bg-muted/50 border border-border rounded-xl px-4 py-3 pr-12 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300 ${focusedField === 'password' ? 'bg-background' : ''
                    }`}
                  placeholder="Create a strong password"
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

              {/* Password Strength Indicator */}
              {formData.password.length > 0 && (
                <div className="mt-3 space-y-2">
                  <div className="h-0.5 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-500 ${passwordStrength < 0.5 ? 'bg-red-500' :
                        passwordStrength < 0.75 ? 'bg-yellow-500' : 'bg-green-500'
                        }`}
                      style={{ width: `${passwordStrength * 100}%` }}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                    <div className={`flex items-center gap-2 ${hasLowercase ? 'text-green-500' : ''}`}>
                      <Check className={`w-3 h-3 ${hasLowercase ? 'opacity-100' : 'opacity-0'}`} />
                      Lowercase
                    </div>
                    <div className={`flex items-center gap-2 ${hasUppercase ? 'text-green-500' : ''}`}>
                      <Check className={`w-3 h-3 ${hasUppercase ? 'opacity-100' : 'opacity-0'}`} />
                      Uppercase
                    </div>
                    <div className={`flex items-center gap-2 ${hasNumber ? 'text-green-500' : ''}`}>
                      <Check className={`w-3 h-3 ${hasNumber ? 'opacity-100' : 'opacity-0'}`} />
                      Number
                    </div>
                    <div className={`flex items-center gap-2 ${hasSpecial ? 'text-green-500' : ''}`}>
                      <Check className={`w-3 h-3 ${hasSpecial ? 'opacity-100' : 'opacity-0'}`} />
                      Special
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <label className="block text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wider">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('confirmPassword')}
                  onBlur={() => setFocusedField(null)}
                  className={`w-full bg-muted/50 border border-border rounded-xl px-4 py-3 pr-12 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300 ${focusedField === 'confirmPassword' ? 'bg-background' : ''
                    } ${formData.confirmPassword && formData.password !== formData.confirmPassword
                      ? 'ring-1 ring-red-500/30'
                      : formData.confirmPassword && formData.password === formData.confirmPassword
                        ? 'ring-1 ring-green-500/30'
                        : ''
                    }`}
                  placeholder="Confirm your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                <p className="text-xs text-red-500 flex items-center gap-1">
                  Passwords do not match
                </p>
              )}
              {formData.confirmPassword && formData.password === formData.confirmPassword && (
                <p className="text-xs text-green-500 flex items-center gap-1">
                  <Check className="w-3 h-3" />
                  Passwords match
                </p>
              )}
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
                    Creating your account...
                  </>
                ) : (
                  <>
                    Create Account
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </span>
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-border">
            <p className="text-center text-muted-foreground text-sm">
              Already have an account?{' '}
              <Link href="/auth/login" className="font-medium text-primary hover:underline transition-all">
                Sign In
              </Link>
            </p>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-10 text-center animate-in fade-in slide-in-from-bottom-12 duration-1000">
          <p className="text-xs text-muted-foreground font-medium mb-4 uppercase tracking-widest">
            Trusted by creators worldwide
          </p>
          <div className="flex items-center justify-center gap-8 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <Check className="w-3 h-3 text-green-500" />
              <span>Secure</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-3 h-3 text-green-500" />
              <span>Free Forever</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-3 h-3 text-green-500" />
              <span>50K+ Creators</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
