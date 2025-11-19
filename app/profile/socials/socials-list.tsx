'use client'

import { useState, useActionState } from 'react'
import { Plus, X, Instagram, Twitter, Youtube, Twitch, ExternalLink, CheckCircle, Music, ArrowRight } from 'lucide-react'
import { addSocial, deleteSocial } from '@/app/actions/socials'
import Link from 'next/link'

const SOCIAL_PLATFORMS = [
    {
        id: 'instagram',
        name: 'Instagram',
        icon: Instagram,
        gradient: 'from-white/20 via-white/10 to-white/20',
        placeholder: '@yourhandle',
        example: 'https://instagram.com/yourhandle'
    },
    {
        id: 'twitter',
        name: 'Twitter / X',
        icon: Twitter,
        gradient: 'from-white/20 to-white/10',
        placeholder: '@yourhandle',
        example: 'https://twitter.com/yourhandle'
    },
    {
        id: 'tiktok',
        name: 'TikTok',
        icon: Music,
        gradient: 'from-white/20 via-white/10 to-white/20',
        placeholder: '@yourhandle',
        example: 'https://tiktok.com/@yourhandle'
    },
    {
        id: 'youtube',
        name: 'YouTube',
        icon: Youtube,
        gradient: 'from-white/20 to-white/10',
        placeholder: '@yourchannel',
        example: 'https://youtube.com/@yourchannel'
    },
    {
        id: 'twitch',
        name: 'Twitch',
        icon: Twitch,
        gradient: 'from-white/20 to-white/10',
        placeholder: 'yourchannel',
        example: 'https://twitch.tv/yourchannel'
    },
]

const initialState = {
    error: '',
}

export default function SocialsList({ initialSocials }: { initialSocials: any[] }) {
    const [adding, setAdding] = useState(false)
    const [state, action, isPending] = useActionState(addSocial, initialState)
    const [newSocial, setNewSocial] = useState({ platform: '', handle: '', url: '' })

    const handleDelete = async (id: string) => {
        if (confirm('Are you sure you want to remove this account?')) {
            await deleteSocial(id)
        }
    }

    // Reset form on success
    if (state?.success && adding) {
        setAdding(false)
        setNewSocial({ platform: '', handle: '', url: '' })
    }

    return (
        <div className="glass-card p-6 md:p-10 fade-in">
            {/* Connected Socials */}
            {initialSocials.length > 0 && (
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-white mb-6">Connected Accounts</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {initialSocials.map((social) => {
                            const platform = SOCIAL_PLATFORMS.find((p) => p.id === social.platform)
                            const Icon = platform?.icon || ExternalLink
                            return (
                                <div
                                    key={social.id}
                                    className="glass-card p-5 group hover:scale-105 transition-all duration-300 relative overflow-hidden"
                                >
                                    {/* Gradient background on hover */}
                                    <div className={`absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-opacity`}></div>

                                    <div className="relative z-10 flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className={`w-14 h-14 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center shadow-lg`}>
                                                <Icon className="w-7 h-7 text-white" />
                                            </div>
                                            <div>
                                                <p className="font-bold text-white mb-1">{platform?.name || social.platform}</p>
                                                <p className="text-sm text-white/60">@{social.handle}</p>
                                                {social.followers_count && (
                                                    <p className="text-xs text-white/40 mt-1">{social.followers_count.toLocaleString()} followers</p>
                                                )}
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => handleDelete(social.id)}
                                            className="p-2 rounded-lg bg-white/5 hover:bg-red-500/20 text-white/40 hover:text-red-400 transition-all"
                                        >
                                            <X className="w-5 h-5" />
                                        </button>
                                    </div>

                                    {social.url && (
                                        <a
                                            href={social.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="absolute inset-0 z-20"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <span className="sr-only">Visit {platform?.name}</span>
                                        </a>
                                    )}
                                </div>
                            )
                        })}
                    </div>
                </div>
            )}

            {/* Add New Social */}
            {!adding ? (
                <button
                    onClick={() => setAdding(true)}
                    className="w-full py-4 px-6 rounded-xl border-2 border-dashed border-white/20 text-white/60 hover:border-white/40 hover:text-white transition-all flex items-center justify-center gap-3 font-semibold group"
                >
                    <div className="w-10 h-10 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Plus className="w-5 h-5 text-white" />
                    </div>
                    <span>Add Social Account</span>
                </button>
            ) : (
                <div className="glass-card p-6 space-y-5 fade-in">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-bold text-white">Add New Account</h3>
                        <button
                            onClick={() => {
                                setAdding(false)
                                setNewSocial({ platform: '', handle: '', url: '' })
                            }}
                            className="p-2 rounded-lg hover:bg-white/5 transition-colors"
                        >
                            <X className="w-5 h-5 text-white/60" />
                        </button>
                    </div>

                    <form action={action}>
                        <div className="space-y-5">
                            <div>
                                <label className="block text-sm font-semibold text-white/90 mb-2">
                                    Platform
                                </label>
                                <select
                                    name="platform"
                                    value={newSocial.platform}
                                    onChange={(e) => setNewSocial({ ...newSocial, platform: e.target.value })}
                                    className="input-modern w-full"
                                >
                                    <option value="">Select a platform</option>
                                    {SOCIAL_PLATFORMS.map((platform) => (
                                        <option key={platform.id} value={platform.id}>
                                            {platform.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-white/90 mb-2">
                                    Handle
                                </label>
                                <input
                                    type="text"
                                    name="handle"
                                    value={newSocial.handle}
                                    onChange={(e) => setNewSocial({ ...newSocial, handle: e.target.value })}
                                    className="input-modern w-full"
                                    placeholder={newSocial.platform ? SOCIAL_PLATFORMS.find(p => p.id === newSocial.platform)?.placeholder : 'your_handle'}
                                />
                                <p className="text-xs text-white/40 mt-2">
                                    Enter your handle (e.g., @username or username)
                                </p>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-white/90 mb-2">
                                    Profile URL <span className="text-white/40">(optional)</span>
                                </label>
                                <input
                                    type="url"
                                    name="url"
                                    value={newSocial.url}
                                    onChange={(e) => setNewSocial({ ...newSocial, url: e.target.value })}
                                    className="input-modern w-full"
                                    placeholder="https://..."
                                />
                                <p className="text-xs text-white/40 mt-2">
                                    We'll auto-generate this if you leave it blank
                                </p>
                            </div>

                            {state?.error && (
                                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                                    {state.error}
                                </div>
                            )}

                            <div className="flex gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setAdding(false)
                                        setNewSocial({ platform: '', handle: '', url: '' })
                                    }}
                                    className="btn-secondary flex-1"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isPending}
                                    className="btn-primary flex-1 inline-flex items-center justify-center gap-2"
                                >
                                    {isPending ? (
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    ) : (
                                        <CheckCircle className="w-4 h-4" />
                                    )}
                                    Add Account
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            )}

            {/* Continue Button */}
            <div className="mt-8 pt-6 border-t border-white/10">
                <Link
                    href="/dashboard"
                    className="btn-primary w-full inline-flex items-center justify-center gap-2"
                >
                    Go to Dashboard
                    <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
        </div>
    )
}
