'use client'

import { useState } from 'react'
import { sendTip } from '@/app/actions/karma'
import { Zap, Loader2 } from 'lucide-react'
import * as Dialog from '@radix-ui/react-dialog'
import { useRouter } from 'next/navigation'

export default function TipButton({ creatorId, creatorName }: { creatorId: string, creatorName: string }) {
    const [isOpen, setIsOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()

    const handleTip = async (amount: number) => {
        try {
            setLoading(true)
            setError(null)
            const result = await sendTip(creatorId, amount)

            if (result.error) {
                setError(result.error)
            } else {
                setIsOpen(false)
                router.refresh()
                // Could add a toast notification here
                alert(`Successfully sent ${amount} Karma to ${creatorName}!`)
            }
        } catch (err) {
            setError('Failed to send tip')
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="btn-secondary flex items-center gap-2"
            >
                <Zap className="w-4 h-4 text-yellow-400" />
                Tip
            </button>

            <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
                <Dialog.Portal>
                    <Dialog.Overlay className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50" />
                    <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-[#0A0A0A] border border-white/10 rounded-2xl p-6 z-50 shadow-2xl">
                        <Dialog.Title className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                            Send a Tip to {creatorName}
                        </Dialog.Title>
                        <Dialog.Description className="text-white/60 mb-6">
                            Support this creator by sending Karma credits.
                        </Dialog.Description>

                        {error && (
                            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
                                {error}
                            </div>
                        )}

                        <div className="grid grid-cols-3 gap-3 mb-6">
                            {[10, 50, 100, 500, 1000].map((amount) => (
                                <button
                                    key={amount}
                                    onClick={() => handleTip(amount)}
                                    disabled={loading}
                                    className="p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-yellow-500/50 transition-all flex flex-col items-center gap-1 group"
                                >
                                    <Zap className="w-4 h-4 text-white/40 group-hover:text-yellow-400" />
                                    <span className="font-bold text-white group-hover:text-yellow-400">
                                        {amount}
                                    </span>
                                </button>
                            ))}
                        </div>

                        <div className="flex justify-end">
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-white/60 hover:text-white text-sm"
                            >
                                Cancel
                            </button>
                        </div>
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>
        </>
    )
}
