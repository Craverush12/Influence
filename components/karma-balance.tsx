'use client'

import { useState, useEffect } from 'react'
import { getBalance, addCredits } from '@/app/actions/karma'
import { Zap, Plus, Loader2 } from 'lucide-react'
import * as Dialog from '@radix-ui/react-dialog'
import { useRouter } from 'next/navigation'

export default function KarmaBalance() {
    const [balance, setBalance] = useState<number | null>(null)
    const [isOpen, setIsOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    useEffect(() => {
        fetchBalance()
    }, [])

    const fetchBalance = async () => {
        const bal = await getBalance()
        setBalance(bal)
    }

    const handleTopUp = async (amount: number) => {
        try {
            setLoading(true)
            await addCredits(amount)
            await fetchBalance()
            setIsOpen(false)
            router.refresh()
        } catch (error) {
            console.error('Top up failed', error)
        } finally {
            setLoading(false)
        }
    }

    if (balance === null) return null

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/20 hover:bg-yellow-500/20 transition-colors group"
            >
                <Zap className="w-4 h-4 text-yellow-400 group-hover:scale-110 transition-transform" />
                <span className="font-bold text-yellow-400">{balance}</span>
                <Plus className="w-3 h-3 text-yellow-400/50" />
            </button>

            <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
                <Dialog.Portal>
                    <Dialog.Overlay className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50" />
                    <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-[#0A0A0A] border border-white/10 rounded-2xl p-6 z-50 shadow-2xl">
                        <Dialog.Title className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                            <Zap className="w-5 h-5 text-yellow-400" />
                            Top Up Karma
                        </Dialog.Title>
                        <Dialog.Description className="text-white/60 mb-6">
                            Add Karma credits to tip creators and unlock premium features.
                            (This is a mock payment system)
                        </Dialog.Description>

                        <div className="grid grid-cols-2 gap-4 mb-6">
                            {[100, 500, 1000, 5000].map((amount) => (
                                <button
                                    key={amount}
                                    onClick={() => handleTopUp(amount)}
                                    disabled={loading}
                                    className="p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-yellow-500/50 transition-all flex flex-col items-center gap-2 group"
                                >
                                    <span className="text-2xl font-bold text-white group-hover:text-yellow-400 transition-colors">
                                        {amount}
                                    </span>
                                    <span className="text-xs text-white/40">Credits</span>
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
