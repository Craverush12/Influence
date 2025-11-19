'use client'

import { useState } from 'react'
import { fundProject, releaseFunds } from '@/app/actions/escrow'
import { Loader2, Lock, CheckCircle, AlertCircle } from 'lucide-react'

interface ProjectActionsProps {
    projectId: string
    isClient: boolean
    status: string
    escrowStatus: string
}

export default function ProjectActions({ projectId, isClient, status, escrowStatus }: ProjectActionsProps) {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const handleFund = async () => {
        setLoading(true)
        setError('')
        const res = await fundProject(projectId)
        if (res?.error) setError(res.error)
        setLoading(false)
    }

    const handleRelease = async () => {
        setLoading(true)
        setError('')
        const res = await releaseFunds(projectId)
        if (res?.error) setError(res.error)
        setLoading(false)
    }

    if (status === 'completed') {
        return (
            <div className="w-full py-3 rounded-xl bg-green-500/20 text-green-400 border border-green-500/30 flex items-center justify-center gap-2 font-bold">
                <CheckCircle className="w-5 h-5" />
                Project Completed
            </div>
        )
    }

    if (isClient) {
        if (escrowStatus === 'unfunded') {
            return (
                <div className="space-y-3">
                    <button
                        onClick={handleFund}
                        disabled={loading}
                        className="w-full btn-primary flex items-center justify-center gap-2"
                    >
                        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Lock className="w-4 h-4" />}
                        Fund Escrow
                    </button>
                    {error && (
                        <div className="text-red-400 text-xs flex items-center gap-1 justify-center">
                            <AlertCircle className="w-3 h-3" /> {error}
                        </div>
                    )}
                    <p className="text-center text-xs text-white/40">
                        Funds will be deducted from your balance and held securely.
                    </p>
                </div>
            )
        }

        if (escrowStatus === 'funded') {
            return (
                <div className="space-y-3">
                    <button
                        onClick={handleRelease}
                        disabled={loading}
                        className="w-full btn-primary bg-green-500 hover:bg-green-600 border-green-600 flex items-center justify-center gap-2"
                    >
                        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle className="w-4 h-4" />}
                        Release Funds
                    </button>
                    {error && (
                        <div className="text-red-400 text-xs flex items-center gap-1 justify-center">
                            <AlertCircle className="w-3 h-3" /> {error}
                        </div>
                    )}
                    <p className="text-center text-xs text-white/40">
                        Only click this when you have received and approved the work.
                    </p>
                </div>
            )
        }
    }

    // Freelancer View
    if (!isClient) {
        if (escrowStatus === 'unfunded') {
            return (
                <div className="w-full py-3 rounded-xl bg-white/5 text-white/40 border border-white/10 flex items-center justify-center gap-2 font-medium text-sm">
                    Waiting for funding...
                </div>
            )
        }

        if (escrowStatus === 'funded') {
            return (
                <div className="w-full py-3 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/30 flex items-center justify-center gap-2 font-bold">
                    <Lock className="w-4 h-4" />
                    Funds Secured
                </div>
            )
        }
    }

    return null
}
