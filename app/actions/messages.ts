'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { getCurrentUser } from '@/lib/auth-service'
import { z } from 'zod'

const messageSchema = z.object({
    recipientId: z.string().uuid(),
    content: z.string().min(1, 'Message cannot be empty'),
})

export async function sendMessage(recipientId: string, content: string) {
    const user = await getCurrentUser()

    if (!user) {
        throw new Error('Not authenticated')
    }

    const validatedFields = messageSchema.safeParse({
        recipientId,
        content,
    })

    if (!validatedFields.success) {
        throw new Error('Invalid input')
    }

    const supabase = await createClient()

    const { data, error } = await supabase
        .from('messages')
        .insert({
            sender_id: user.id,
            recipient_id: recipientId,
            content: content.trim(),
        })
        .select()
        .single()

    if (error) {
        throw new Error(error.message)
    }

    // Revalidate the messages page to show new message
    revalidatePath('/messages')
    return data
}

export async function startConversation(recipientId: string, content: string) {
    // This is essentially the same as sendMessage but might have different revalidation or logic in future
    return sendMessage(recipientId, content)
}
