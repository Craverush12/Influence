'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { signUp } from '@/lib/auth'
import { Sparkles, ArrowRight, Mail, Lock, User, Eye, EyeOff, Check } from 'lucide-react'

export default function SignupPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    username: '',
    displayName: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
    setError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters')
      return
    }

    setLoading(true)

    try {
      const user = await signUp(
        formData.email,
        formData.password,
        formData.username,
        formData.displayName
      )
      localStorage.setItem('user', JSON.stringify(user))
      router.push('/profile/setup')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Signup failed')
    } finally {
      setLoading(false)
    }
  }

  const passwordStrength = formData.password.length > 0 ? Math.min(formData.password.length / 8, 1) : 0
  const hasLowercase = /[a-z]/.test(formData.password)
  const hasUppercase = /[A-Z]/.test(formData.password)
  const hasNumber = /[0-9]/.test(formData.password)
  const hasSpecial = /[^a-zA-Z0-9]/.test(formData.password)

  return (
    <div className="min-h-screen hero-gradient relative overflow-hidden flex items-center justify-center px-4 py-16">
      {/* Minimal Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-white/2 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-white/2 rounded-full blur-3xl"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Elegant Header */}
        <div className="text-center mb-12 fade-in">
          <h1 className="text-4xl md:text-5xl font-light mb-6" style={{ fontFamily: 'var(--font-playfair, "Playfair Display", serif)' }}>
            <span className="gradient-text">Welcome to</span>
            <br />
            <span className="text-white font-normal">Creator Hub</span>
          </h1>
          <p className="text-base text-white/60 leading-relaxed max-w-md mx-auto mb-2" style={{ letterSpacing: '0.03em', fontWeight: 300 }}>
            Join a community of creators, influencers, and professionals who are building their dreams together. 
            Connect with collaborators who understand your vision, grow your audience authentically, and turn your creative ideas into reality.
          </p>
          <p className="text-sm text-white/50 mt-4" style={{ letterSpacing: '0.02em', fontWeight: 300 }}>
            Your journey to creative success starts here.
          </p>
        </div>

        {/* Minimal Form Card */}
        <div className="glass-card p-8 md:p-10 fade-in">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Display Name */}
            <div className="space-y-2">
              <label className="block text-xs font-light text-white/70 mb-2 uppercase tracking-wider">
                Full Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="displayName"
                  value={formData.displayName}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('displayName')}
                  onBlur={() => setFocusedField(null)}
                  className={`input-modern w-full pl-4 transition-all duration-300 text-base font-light ${
                    focusedField === 'displayName' ? 'ring-1 ring-white/20 bg-white/5' : ''
                  }`}
                  placeholder="Enter your full name"
                  required
                />
              </div>
            </div>

            {/* Username */}
            <div className="space-y-2">
              <label className="block text-xs font-light text-white/70 mb-2 uppercase tracking-wider">
                Username
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('username')}
                  onBlur={() => setFocusedField(null)}
                  className={`input-modern w-full pl-4 transition-all duration-300 text-base font-light ${
                    focusedField === 'username' ? 'ring-1 ring-white/20 bg-white/5' : ''
                  }`}
                  placeholder="@yourhandle"
                  required
                />
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 font-light text-sm">@</span>
              </div>
              <p className="text-xs text-white/40 mt-1 font-light" style={{ letterSpacing: '0.02em' }}>
                This will be your unique identifier on the platform
              </p>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="block text-xs font-light text-white/70 mb-2 uppercase tracking-wider">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  className={`input-modern w-full pl-4 transition-all duration-300 text-base font-light ${
                    focusedField === 'email' ? 'ring-1 ring-white/20 bg-white/5' : ''
                  }`}
                  placeholder="your@email.com"
                  required
                />
              </div>
              <p className="text-xs text-white/40 mt-1 font-light" style={{ letterSpacing: '0.02em' }}>
                We'll never share your email with anyone
              </p>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="block text-xs font-light text-white/70 mb-2 uppercase tracking-wider">
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
                  className={`input-modern w-full pl-4 pr-12 transition-all duration-300 text-base font-light ${
                    focusedField === 'password' ? 'ring-1 ring-white/20 bg-white/5' : ''
                  }`}
                  placeholder="Create a strong password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              
              {/* Password Strength Indicator */}
              {formData.password.length > 0 && (
                <div className="mt-3 space-y-2">
                  <div className="h-0.5 bg-white/5 rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-500 ${
                        passwordStrength < 0.5 ? 'bg-red-500/50' :
                        passwordStrength < 0.75 ? 'bg-yellow-500/50' : 'bg-green-500/50'
                      }`}
                      style={{ width: `${passwordStrength * 100}%` }}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs text-white/40 font-light">
                    <div className={`flex items-center gap-2 ${hasLowercase ? 'text-green-400/70' : ''}`}>
                      <Check className={`w-3 h-3 ${hasLowercase ? 'opacity-100' : 'opacity-0'}`} />
                      Lowercase
                    </div>
                    <div className={`flex items-center gap-2 ${hasUppercase ? 'text-green-400/70' : ''}`}>
                      <Check className={`w-3 h-3 ${hasUppercase ? 'opacity-100' : 'opacity-0'}`} />
                      Uppercase
                    </div>
                    <div className={`flex items-center gap-2 ${hasNumber ? 'text-green-400/70' : ''}`}>
                      <Check className={`w-3 h-3 ${hasNumber ? 'opacity-100' : 'opacity-0'}`} />
                      Number
                    </div>
                    <div className={`flex items-center gap-2 ${hasSpecial ? 'text-green-400/70' : ''}`}>
                      <Check className={`w-3 h-3 ${hasSpecial ? 'opacity-100' : 'opacity-0'}`} />
                      Special
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <label className="block text-xs font-light text-white/70 mb-2 uppercase tracking-wider">
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
                  className={`input-modern w-full pl-4 pr-12 transition-all duration-300 text-base font-light ${
                    focusedField === 'confirmPassword' ? 'ring-1 ring-white/20 bg-white/5' : ''
                  } ${
                    formData.confirmPassword && formData.password !== formData.confirmPassword
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
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                <p className="text-xs text-red-400/70 flex items-center gap-1 font-light">
                  Passwords do not match
                </p>
              )}
              {formData.confirmPassword && formData.password === formData.confirmPassword && (
                <p className="text-xs text-green-400/70 flex items-center gap-1 font-light">
                  <Check className="w-3 h-3" />
                  Passwords match
                </p>
              )}
            </div>

            {error && (
              <div className="p-4 rounded-lg bg-red-500/5 border border-red-500/20 text-red-400/80 text-sm flex items-center gap-2 font-light">
                <span>⚠</span>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full inline-flex items-center justify-center gap-2 py-4 text-base font-light group relative overflow-hidden mt-8"
            >
              <span className="relative z-10 flex items-center gap-2">
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
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

          <div className="mt-8 pt-6 border-t border-white/5">
            <p className="text-center text-white/50 text-sm font-light" style={{ letterSpacing: '0.02em' }}>
              Already have an account?{' '}
              <Link href="/auth/login" className="font-normal gradient-text hover:opacity-80 transition-opacity">
                Sign In
              </Link>
            </p>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-10 text-center fade-in">
          <p className="text-xs text-white/30 font-light mb-4" style={{ letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            Trusted by creators worldwide
          </p>
          <div className="flex items-center justify-center gap-8 text-xs text-white/30 font-light">
            <div className="flex items-center gap-2">
              <Check className="w-3 h-3 text-green-400/50" />
              <span>Secure</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-3 h-3 text-green-400/50" />
              <span>Free Forever</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-3 h-3 text-green-400/50" />
              <span>50K+ Creators</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
