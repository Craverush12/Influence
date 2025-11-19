'use client'

import { useState, useEffect, useActionState } from 'react'
import { useRouter } from 'next/navigation'
import ImageUpload from '@/components/image-upload'
import { uploadImage } from '@/lib/supabase/storage'
import { updateProfile } from '@/app/actions/profile'
import { ArrowRight, ArrowLeft, Sparkles, User, Briefcase, Image as ImageIcon, FileText, Check, MapPin, Globe, Camera } from 'lucide-react'

const initialState = {
  error: '',
}

export default function ProfileSetupPage() {
  const router = useRouter()
  const [state, action, isPending] = useActionState(updateProfile, initialState)
  const [step, setStep] = useState(1)
  const [profileData, setProfileData] = useState({
    displayName: '',
    bio: '',
    location: '',
    website: '',
    profileImage: '',
    coverImage: '',
    userType: '' as 'creator' | 'professional' | '',
  })

  const [error, setError] = useState('')
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward')

  const handleProfileImageUpload = async (file: File) => {
    try {
      const url = await uploadImage(file, 'profile-images')
      setProfileData({ ...profileData, profileImage: url })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Image upload failed')
    }
  }

  const handleNext = () => {
    if (step === 1 && !profileData.displayName) {
      setError('Please enter your display name')
      return
    }
    if (step === 2 && !profileData.userType) {
      setError('Please select your role')
      return
    }
    setError('')
    setDirection('forward')
    setStep(step + 1)
  }

  const handleBack = () => {
    setError('')
    setDirection('backward')
    setStep(step - 1)
  }

  const steps = [
    {
      number: 1,
      icon: User,
      title: 'Basic Info',
      subtitle: 'Let\'s start with the essentials',
      description: 'Your name and location help others find and connect with you. Share where you\'re based and how people can reach you.',
      gradient: 'from-white/10 to-white/5'
    },
    {
      number: 2,
      icon: Briefcase,
      title: 'Your Role',
      subtitle: 'Define your creative identity',
      description: 'Whether you\'re a content creator looking for collaborators or a professional offering services, choose the path that aligns with your goals.',
      gradient: 'from-white/10 to-white/5'
    },
    {
      number: 3,
      icon: ImageIcon,
      title: 'Profile Photo',
      subtitle: 'Show the world who you are',
      description: 'A great profile picture helps you stand out and builds trust with potential collaborators. Choose an image that represents your authentic self.',
      gradient: 'from-white/10 to-white/5'
    },
    {
      number: 4,
      icon: FileText,
      title: 'About You',
      subtitle: 'Share your unique story',
      description: 'Your bio is your chance to tell your story. Share your passions, your journey, and what makes you unique. This is how others will discover what you\'re all about.',
      gradient: 'from-white/10 via-white/5 to-white/10'
    },
  ]

  const progress = (step / steps.length) * 100

  return (
    <div className="min-h-screen hero-gradient relative overflow-hidden">
      {/* Minimal Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-white/2 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-white/2 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12 relative z-10">
        {/* Elegant Progress Header */}
        <div className="mb-12 fade-in">
          <div className="mb-10">
            <h1 className="text-4xl md:text-5xl font-light mb-4" style={{ fontFamily: 'var(--font-playfair, "Playfair Display", serif)' }}>
              <span className="gradient-text">Complete Your Profile</span>
            </h1>
            <p className="text-base text-white/60 leading-relaxed max-w-2xl mb-2" style={{ letterSpacing: '0.03em', fontWeight: 300 }}>
              {steps[step - 1].description}
            </p>
            <p className="text-sm text-white/50 mt-2" style={{ letterSpacing: '0.02em', fontWeight: 300 }}>
              Step {step} of {steps.length} • {Math.round((step / steps.length) * 100)}% complete
            </p>
          </div>

          {/* Minimal Progress Bar */}
          <div className="relative mb-12">
            <div className="h-0.5 bg-white/5 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-white/20 via-white/10 to-white/20 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Step Indicators */}
          <div className="flex items-center justify-between">
            {steps.map((s, i) => {
              const StepIcon = s.icon
              const isActive = step === s.number
              const isCompleted = step > s.number
              const isUpcoming = step < s.number

              return (
                <div key={s.number} className="flex items-center flex-1">
                  <div className="flex flex-col items-center flex-1 relative">
                    {/* Step Circle */}
                    <div className={`relative w-10 h-10 rounded-xl flex items-center justify-center mb-2 transition-all duration-500 ${isActive
                        ? `bg-gradient-to-br ${s.gradient} scale-105`
                        : isCompleted
                          ? 'bg-green-500/20 scale-100'
                          : 'bg-white/5 scale-100'
                      }`}>
                      {isCompleted ? (
                        <Check className="w-5 h-5 text-green-400" />
                      ) : (
                        <StepIcon className={`w-5 h-5 transition-colors ${isActive ? 'text-white' : 'text-white/30'
                          }`} />
                      )}
                    </div>

                    {/* Step Title */}
                    <div className="text-center">
                      <div className={`text-xs font-light mb-0.5 transition-colors uppercase tracking-wider ${isActive ? 'text-white' : isCompleted ? 'text-green-400/70' : 'text-white/30'
                        }`}>
                        {s.title}
                      </div>
                    </div>
                  </div>

                  {/* Connector Line */}
                  {i < steps.length - 1 && (
                    <div className={`h-0.5 flex-1 mx-3 mb-6 rounded-full transition-all duration-500 ${isCompleted ? 'bg-green-500/30' : 'bg-white/5'
                      }`}></div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Step Content */}
        <div className="glass-card p-8 md:p-12 fade-in relative overflow-hidden">
          {/* Background Gradient for Current Step */}
          <div className={`absolute inset-0 bg-gradient-to-br ${steps[step - 1].gradient} opacity-5 pointer-events-none transition-opacity duration-500`}></div>

          <form action={action} className="relative z-10">
            {/* Hidden Inputs for all data */}
            <input type="hidden" name="displayName" value={profileData.displayName} />
            <input type="hidden" name="location" value={profileData.location} />
            <input type="hidden" name="website" value={profileData.website} />
            <input type="hidden" name="userType" value={profileData.userType} />
            <input type="hidden" name="profileImage" value={profileData.profileImage} />
            <input type="hidden" name="coverImage" value={profileData.coverImage} />
            <input type="hidden" name="bio" value={profileData.bio} />

            {/* Step 1: Basic Information */}
            {step === 1 && (
              <div className="space-y-6 animate-slide-in">
                <div className="mb-10">
                  <h2 className="text-3xl md:text-4xl font-light text-white mb-4" style={{ fontFamily: 'var(--font-playfair, "Playfair Display", serif)' }}>
                    Basic Information
                  </h2>
                  <p className="text-base text-white/60 leading-relaxed" style={{ letterSpacing: '0.03em', fontWeight: 300 }}>
                    Your name and location help others find and connect with you. Share where you're based and how people can reach you. This information will be visible on your profile and helps build trust with potential collaborators.
                  </p>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-xs font-light text-white/70 mb-2 uppercase tracking-wider">
                      Display Name
                    </label>
                    <input
                      type="text"
                      value={profileData.displayName}
                      onChange={(e) =>
                        setProfileData({ ...profileData, displayName: e.target.value })
                      }
                      className="input-modern w-full text-base py-3 font-light"
                      placeholder="Enter your full name"
                      autoFocus
                    />
                    <p className="text-xs text-white/40 mt-2 font-light" style={{ letterSpacing: '0.02em' }}>
                      This is how others will see and remember you
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-light text-white/70 mb-2 uppercase tracking-wider">
                      Location
                    </label>
                    <input
                      type="text"
                      value={profileData.location}
                      onChange={(e) =>
                        setProfileData({ ...profileData, location: e.target.value })
                      }
                      className="input-modern w-full text-base py-3 font-light"
                      placeholder="City, Country"
                    />
                    <p className="text-xs text-white/40 mt-2 font-light" style={{ letterSpacing: '0.02em' }}>
                      Helps others find creators and professionals in their area
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-light text-white/70 mb-2 uppercase tracking-wider">
                      Website
                    </label>
                    <input
                      type="url"
                      value={profileData.website}
                      onChange={(e) =>
                        setProfileData({ ...profileData, website: e.target.value })
                      }
                      className="input-modern w-full text-base py-3 font-light"
                      placeholder="https://yourwebsite.com"
                    />
                    <p className="text-xs text-white/40 mt-2 font-light" style={{ letterSpacing: '0.02em' }}>
                      Optional: Link to your portfolio, blog, or main platform
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Role Selection */}
            {step === 2 && (
              <div className="space-y-6 animate-slide-in">
                <div className="mb-10">
                  <h2 className="text-3xl md:text-4xl font-light text-white mb-4" style={{ fontFamily: 'var(--font-playfair, "Playfair Display", serif)' }}>
                    Define Your Creative Identity
                  </h2>
                  <p className="text-base text-white/60 leading-relaxed mb-2" style={{ letterSpacing: '0.03em', fontWeight: 300 }}>
                    Whether you're a content creator looking for collaborators or a professional offering services, choose the path that aligns with your goals. This helps us connect you with the right people and opportunities.
                  </p>
                  <p className="text-sm text-white/50 mt-2" style={{ letterSpacing: '0.02em', fontWeight: 300 }}>
                    You can always update this later in your settings
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <button
                    type="button"
                    onClick={() =>
                      setProfileData({ ...profileData, userType: 'creator' })
                    }
                    className={`group relative p-6 rounded-2xl border transition-all duration-300 text-left overflow-hidden ${profileData.userType === 'creator'
                        ? 'border-white/20 bg-white/5'
                        : 'border-white/5 hover:border-white/10 bg-white/2'
                      }`}
                  >
                    <div className="relative z-10">
                      <div className="flex items-start gap-4 mb-4">
                        <div className={`w-12 h-12 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center transition-transform ${profileData.userType === 'creator' ? 'scale-105' : ''
                          }`}>
                          <Sparkles className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-light text-white mb-2" style={{ fontFamily: 'var(--font-playfair, "Playfair Display", serif)' }}>
                            Creator
                          </h3>
                          <p className="text-sm text-white/60 leading-relaxed font-light" style={{ letterSpacing: '0.02em' }}>
                            I create content and need collaborators to help bring my vision to life. Perfect for influencers, content creators, and artists looking to grow their audience and find the right partners.
                          </p>
                        </div>
                        {profileData.userType === 'creator' && (
                          <div className="w-5 h-5 rounded-full bg-white/20 border border-white/30 flex items-center justify-center flex-shrink-0">
                            <Check className="w-3 h-3 text-white" />
                          </div>
                        )}
                      </div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setProfileData({ ...profileData, userType: 'professional' })
                    }
                    className={`group relative p-6 rounded-2xl border transition-all duration-300 text-left overflow-hidden ${profileData.userType === 'professional'
                        ? 'border-white/20 bg-white/5'
                        : 'border-white/5 hover:border-white/10 bg-white/2'
                      }`}
                  >
                    <div className="relative z-10">
                      <div className="flex items-start gap-4 mb-4">
                        <div className={`w-12 h-12 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center transition-transform ${profileData.userType === 'professional' ? 'scale-105' : ''
                          }`}>
                          <Briefcase className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-light text-white mb-2" style={{ fontFamily: 'var(--font-playfair, "Playfair Display", serif)' }}>
                            Professional
                          </h3>
                          <p className="text-sm text-white/60 leading-relaxed font-light" style={{ letterSpacing: '0.02em' }}>
                            I offer services to creators and help them achieve their goals. Perfect for editors, designers, marketers, and other professionals who want to work with creators.
                          </p>
                        </div>
                        {profileData.userType === 'professional' && (
                          <div className="w-5 h-5 rounded-full bg-white/20 border border-white/30 flex items-center justify-center flex-shrink-0">
                            <Check className="w-3 h-3 text-white" />
                          </div>
                        )}
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Profile Photo */}
            {step === 3 && (
              <div className="space-y-6 animate-slide-in">
                <div className="mb-10">
                  <h2 className="text-3xl md:text-4xl font-light text-white mb-4" style={{ fontFamily: 'var(--font-playfair, "Playfair Display", serif)' }}>
                    Profile Picture
                  </h2>
                  <p className="text-base text-white/60 leading-relaxed mb-2" style={{ letterSpacing: '0.03em', fontWeight: 300 }}>
                    Profile picture upload is temporarily disabled. You can add your profile picture later from your profile settings.
                  </p>
                  <p className="text-sm text-white/50 mt-2" style={{ letterSpacing: '0.02em', fontWeight: 300 }}>
                    This step has been skipped for now
                  </p>
                </div>
                {/* <div className="flex justify-center">
                  <ImageUpload
                    onImageUpload={handleProfileImageUpload}
                    placeholder="Upload your profile picture"
                    aspectRatio="square"
                  />
                </div> */}
              </div>
            )}

            {/* Step 4: Bio */}
            {step === 4 && (
              <div className="space-y-6 animate-slide-in">
                <div className="mb-10">
                  <h2 className="text-3xl md:text-4xl font-light text-white mb-4" style={{ fontFamily: 'var(--font-playfair, "Playfair Display", serif)' }}>
                    Share Your Unique Story
                  </h2>
                  <p className="text-base text-white/60 leading-relaxed mb-2" style={{ letterSpacing: '0.03em', fontWeight: 300 }}>
                    Your bio is your chance to tell your story. Share your passions, your journey, and what makes you unique. This is how others will discover what you're all about and why they should connect with you.
                  </p>
                  <p className="text-sm text-white/50 mt-2" style={{ letterSpacing: '0.02em', fontWeight: 300 }}>
                    Be authentic, be yourself, and let your personality shine through
                  </p>
                </div>
                <div>
                  <label className="block text-xs font-light text-white/70 mb-2 uppercase tracking-wider">
                    Bio
                  </label>
                  <textarea
                    value={profileData.bio}
                    onChange={(e) =>
                      setProfileData({ ...profileData, bio: e.target.value })
                    }
                    className="input-modern w-full min-h-[200px] resize-none text-base py-4 font-light"
                    placeholder="Tell us about yourself, your passions, your journey, and what you're looking for. What makes you unique? What drives you? What kind of collaborations are you seeking?"
                    rows={8}
                    autoFocus
                  />
                  <div className="mt-3 text-xs text-white/40 text-right font-light">
                    {profileData.bio.length} characters
                  </div>
                </div>
              </div>
            )}

            {(error || state?.error) && (
              <div className="mt-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm flex items-center gap-2 animate-shake">
                <span>⚠</span>
                {error || state?.error}
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex gap-4 mt-10 pt-8 border-t border-white/5">
              {step > 1 && (
                <button
                  type="button"
                  onClick={handleBack}
                  className="btn-secondary flex-1 inline-flex items-center justify-center gap-2 py-4 text-base font-light group"
                >
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  Back
                </button>
              )}
              {step === 4 ? (
                <button
                  type="submit"
                  disabled={isPending}
                  className="btn-primary flex-1 inline-flex items-center justify-center gap-2 py-4 text-base font-light group relative overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {isPending ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Creating...
                      </>
                    ) : (
                      <>
                        Complete Profile
                        <Check className="w-4 h-4" />
                      </>
                    )}
                  </span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleNext}
                  className="btn-primary flex-1 inline-flex items-center justify-center gap-2 py-4 text-base font-light group relative overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Continue
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
