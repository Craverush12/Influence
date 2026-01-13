'use client'

import { useState } from 'react'
import { useActionState } from 'react'
import Link from 'next/link'
import { signup } from '@/app/actions/auth'
import { ArrowRight, ArrowLeft, Eye, EyeOff, Check, Sparkles, User, Mail, Lock, Image, Tag, Loader2 } from 'lucide-react'

const initialState = {
  error: '',
}

interface SignupWizardProps {
  onComplete?: () => void
}

export default function SignupWizard({ onComplete }: SignupWizardProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [state, action, isPending] = useActionState(signup, initialState)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    displayName: '',
    username: '',
    role: 'creator' as 'creator' | 'professional',
    profilePicture: null as File | null,
    interests: [] as string[],
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const totalSteps = 4
  const progress = (currentStep / totalSteps) * 100

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Create FormData for the server action
    const formDataToSubmit = new FormData()
    Object.entries(formData).forEach(([key, value]) => {
      if (key === 'profilePicture' && value) {
        formDataToSubmit.append(key, value)
      } else if (key !== 'profilePicture') {
        formDataToSubmit.append(key, value as string)
      }
    })
    await action(formDataToSubmit)
    if (!state?.error && onComplete) {
      onComplete()
    }
  }

  const passwordStrength = formData.password.length > 0 ? Math.min(formData.password.length / 8, 1) : 0
  const hasLowercase = /[a-z]/.test(formData.password)
  const hasUppercase = /[A-Z]/.test(formData.password)
  const hasNumber = /[0-9]/.test(formData.password)
  const hasSpecial = /[^a-zA-Z0-9]/.test(formData.password)
  const isPasswordValid = passwordStrength >= 0.75 && hasLowercase && hasUppercase && hasNumber && hasSpecial
  const passwordsMatch = formData.password === formData.confirmPassword && formData.confirmPassword.length > 0

  const canProceedStep1 = formData.email.length > 0 && isPasswordValid && passwordsMatch
  const canProceedStep2 = formData.displayName.length > 0 && formData.username.length > 0
  // Step 3 (profile picture) is optional, so always can proceed
  // Step 4 (interests) is optional, so always can proceed

  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex items-center justify-center px-4 py-16">
      {/* Aurora Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 gradient-aurora-mesh opacity-20"></div>
      </div>

      <div className="w-full max-w-2xl relative z-10">
        {/* Progress Indicator - Goal Gradient Effect */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-muted-foreground">
              Step {currentStep} of {totalSteps}
            </span>
            <span className="text-sm font-medium text-muted-foreground">
              {Math.round(progress)}% Complete
            </span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-aurora-1 transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Form Card */}
        <div className="glass-card p-8 md:p-10 animate-in fade-in slide-in-from-bottom-8 duration-700 bg-card border border-border">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Step 1: Email + Password - Foot-in-the-Door */}
            {currentStep === 1 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right duration-300">
                <div className="text-center mb-8">
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-aurora-1 flex items-center justify-center">
                      <Mail className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <h2 className="text-3xl font-display font-extrabold mb-2">Create Your Account</h2>
                  <p className="text-muted-foreground">Takes less than 2 minutes</p>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium text-foreground">
                    Email Address <span className="text-destructive">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-muted/50 border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    placeholder="your@email.com"
                    required
                    aria-required="true"
                    aria-describedby="email-description"
                  />
                  <p id="email-description" className="sr-only">Enter your email address to get started</p>
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <label htmlFor="password" className="block text-sm font-medium text-foreground">
                    Password <span className="text-destructive">*</span>
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full bg-muted/50 border border-border rounded-xl px-4 py-3 pr-12 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                      placeholder="Create a strong password"
                      required
                      aria-required="true"
                      aria-describedby="password-requirements"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  
                  {/* Password Strength Indicator */}
                  {formData.password.length > 0 && (
                    <div className="mt-3 space-y-2" id="password-requirements" role="group" aria-label="Password requirements">
                      <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                        <div
                          className={`h-full transition-all duration-500 ${
                            passwordStrength < 0.5 ? 'bg-destructive' :
                            passwordStrength < 0.75 ? 'bg-yellow-500' : 'bg-primary'
                          }`}
                          style={{ width: `${passwordStrength * 100}%` }}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className={`flex items-center gap-2 ${hasLowercase ? 'text-primary' : 'text-muted-foreground'}`}>
                          <Check className={`w-3 h-3 ${hasLowercase ? 'opacity-100' : 'opacity-0'}`} />
                          Lowercase
                        </div>
                        <div className={`flex items-center gap-2 ${hasUppercase ? 'text-primary' : 'text-muted-foreground'}`}>
                          <Check className={`w-3 h-3 ${hasUppercase ? 'opacity-100' : 'opacity-0'}`} />
                          Uppercase
                        </div>
                        <div className={`flex items-center gap-2 ${hasNumber ? 'text-primary' : 'text-muted-foreground'}`}>
                          <Check className={`w-3 h-3 ${hasNumber ? 'opacity-100' : 'opacity-0'}`} />
                          Number
                        </div>
                        <div className={`flex items-center gap-2 ${hasSpecial ? 'text-primary' : 'text-muted-foreground'}`}>
                          <Check className={`w-3 h-3 ${hasSpecial ? 'opacity-100' : 'opacity-0'}`} />
                          Special
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Confirm Password */}
                <div className="space-y-2">
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-foreground">
                    Confirm Password <span className="text-destructive">*</span>
                  </label>
                  <div className="relative">
                    <input
                      id="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className={`w-full bg-muted/50 border rounded-xl px-4 py-3 pr-12 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 transition-all ${
                        formData.confirmPassword && !passwordsMatch
                          ? 'border-destructive focus:ring-destructive/20'
                          : formData.confirmPassword && passwordsMatch
                          ? 'border-primary focus:ring-primary/20'
                          : 'border-border focus:ring-primary/20 focus:border-primary'
                      }`}
                      placeholder="Confirm your password"
                      required
                      aria-required="true"
                      aria-invalid={formData.confirmPassword && !passwordsMatch}
                      aria-describedby="confirm-password-feedback"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {formData.confirmPassword && (
                    <p
                      id="confirm-password-feedback"
                      className={`text-xs flex items-center gap-1 ${
                        passwordsMatch ? 'text-primary' : 'text-destructive'
                      }`}
                      role="alert"
                    >
                      {passwordsMatch ? (
                        <>
                          <Check className="w-3 h-3" />
                          Passwords match
                        </>
                      ) : (
                        'Passwords do not match'
                      )}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Step 2: Basic Info - Name, Role */}
            {currentStep === 2 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right duration-300">
                <div className="text-center mb-8">
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-aurora-1 flex items-center justify-center">
                      <User className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <h2 className="text-3xl font-display font-extrabold mb-2">Tell Us About Yourself</h2>
                  <p className="text-muted-foreground">Help us personalize your experience</p>
                </div>

                {/* Display Name */}
                <div className="space-y-2">
                  <label htmlFor="displayName" className="block text-sm font-medium text-foreground">
                    Full Name <span className="text-destructive">*</span>
                  </label>
                  <input
                    id="displayName"
                    type="text"
                    name="displayName"
                    value={formData.displayName}
                    onChange={handleChange}
                    className="w-full bg-muted/50 border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    placeholder="Enter your full name"
                    required
                    aria-required="true"
                  />
                </div>

                {/* Username */}
                <div className="space-y-2">
                  <label htmlFor="username" className="block text-sm font-medium text-foreground">
                    Username <span className="text-destructive">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">@</span>
                    <input
                      id="username"
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      className="w-full bg-muted/50 border border-border rounded-xl px-4 py-3 pl-10 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                      placeholder="yourhandle"
                      required
                      aria-required="true"
                    />
                  </div>
                </div>

                {/* Role - Default Effect: Pre-select recommended */}
                <div className="space-y-2">
                  <label htmlFor="role" className="block text-sm font-medium text-foreground">
                    I am a... <span className="text-destructive">*</span>
                  </label>
                  <select
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full bg-muted/50 border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    required
                    aria-required="true"
                  >
                    <option value="creator">Creator / Influencer</option>
                    <option value="professional">Professional / Service Provider</option>
                  </select>
                </div>
              </div>
            )}

            {/* Step 3: Profile Picture - Optional */}
            {currentStep === 3 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right duration-300">
                <div className="text-center mb-8">
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-aurora-1 flex items-center justify-center">
                      <Image className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <h2 className="text-3xl font-display font-extrabold mb-2">Add Your Photo</h2>
                  <p className="text-muted-foreground">Optional - You can skip this step</p>
                </div>

                <div className="space-y-2">
                  <label htmlFor="profilePicture" className="block text-sm font-medium text-foreground">
                    Profile Picture
                  </label>
                  <input
                    id="profilePicture"
                    type="file"
                    name="profilePicture"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) {
                        setFormData({ ...formData, profilePicture: file })
                      }
                    }}
                    className="w-full bg-muted/50 border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  />
                  <p className="text-xs text-muted-foreground">Recommended: Square image, at least 400x400px</p>
                </div>
              </div>
            )}

            {/* Step 4: Interests/Skills - Optional */}
            {currentStep === 4 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right duration-300">
                <div className="text-center mb-8">
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-aurora-1 flex items-center justify-center">
                      <Tag className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <h2 className="text-3xl font-display font-extrabold mb-2">What Are You Into?</h2>
                  <p className="text-muted-foreground">Optional - Help us match you with the right people</p>
                </div>

                <div className="space-y-2">
                  <label htmlFor="interests" className="block text-sm font-medium text-foreground">
                    Interests or Skills (comma-separated)
                  </label>
                  <input
                    id="interests"
                    type="text"
                    name="interests"
                    value={formData.interests.join(', ')}
                    onChange={(e) => {
                      const interests = e.target.value.split(',').map(i => i.trim()).filter(i => i.length > 0)
                      setFormData({ ...formData, interests })
                    }}
                    className="w-full bg-muted/50 border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    placeholder="e.g., photography, video editing, graphic design"
                  />
                </div>
              </div>
            )}

            {/* Error Message */}
            {state?.error && (
              <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm flex items-center gap-2" role="alert">
                <span>⚠</span>
                {state.error}
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between gap-4 pt-6 border-t border-border">
              <button
                type="button"
                onClick={handleBack}
                disabled={currentStep === 1}
                className="btn-secondary inline-flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>

              {currentStep < totalSteps ? (
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={
                    (currentStep === 1 && !canProceedStep1) ||
                    (currentStep === 2 && !canProceedStep2)
                  }
                  className="btn-primary inline-flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continue
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isPending}
                  className="btn-primary inline-flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Creating Account...
                    </>
                  ) : (
                    <>
                      Create Account
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              )}
            </div>
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
      </div>
    </div>
  )
}

