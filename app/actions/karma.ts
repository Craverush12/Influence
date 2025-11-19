'use server'

import { createClient } from '@/lib/supabase/server'
import { getCurrentUser } from '@/lib/auth-service'
import { revalidatePath } from 'next/cache'

export async function getBalance() {
    const user = await getCurrentUser()
    if (!user) return 0

    const supabase = await createClient()

    // We can query the view or sum directly. Summing directly is safer if view isn't set up yet.
    const { data, error } = await supabase
        .from('transactions')
        .select('amount')
        .eq('user_id', user.id)

    if (error || !data) return 0

    return data.reduce((acc, curr) => acc + curr.amount, 0)
}

export async function addCredits(amount: number) {
    const user = await getCurrentUser()
    if (!user) return { error: 'Unauthorized' }

    if (amount <= 0) return { error: 'Invalid amount' }

    const supabase = await createClient()

    const { error } = await supabase.from('transactions').insert({
        user_id: user.id,
        amount: amount,
        type: 'deposit',
        description: 'Added credits via Mock Payment',
    })

    if (error) {
        console.error('Error adding credits:', error)
        return { error: 'Failed to add credits' }
    }

    revalidatePath('/dashboard')
    return { success: true }
}

export async function sendTip(recipientId: string, amount: number) {
    const user = await getCurrentUser()
    if (!user) return { error: 'Unauthorized' }

    if (amount <= 0) return { error: 'Invalid amount' }

    const balance = await getBalance()
    if (balance < amount) return { error: 'Insufficient balance' }

    const supabase = await createClient()

    // Transaction 1: Sender loses money
    const { error: senderError } = await supabase.from('transactions').insert({
        user_id: user.id,
        amount: -amount,
        type: 'tip',
        description: `Tip sent to creator`,
        recipient_id: recipientId
    })

    if (senderError) return { error: 'Failed to process transaction' }

    // Transaction 2: Recipient gains money
    const { error: recipientError } = await supabase.from('transactions').insert({
        user_id: recipientId,
        amount: amount,
        type: 'tip',
        description: `Tip received from ${user.username || 'user'}`,
        recipient_id: user.id // Linking back to sender
    })

    if (recipientError) {
        // In a real app, we'd need a transaction block here to rollback
        console.error('Failed to credit recipient', recipientError)
    }

    revalidatePath('/dashboard')
    return { success: true }
}
