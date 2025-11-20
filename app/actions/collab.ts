'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

export async function createProposal(formData: FormData) {
    const supabase = await createClient()

    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        return { error: 'You must be logged in to create a proposal.' }
    }

    const title = formData.get('title') as string
    const description = formData.get('description') as string
    const budget = parseInt(formData.get('budget') as string)
    const requiredVibe = formData.get('requiredVibe') as string

    if (!title || !description || !budget) {
        return { error: 'All fields are required.' }
    }

    const { error } = await supabase
        .from('collab_proposals')
        .insert({
            user_id: user.id,
            title,
            description,
            budget,
            required_vibe: requiredVibe,
        })

    if (error) {
        console.error('Error creating proposal:', error)
        return { error: 'Failed to create proposal.' }
    }

    revalidatePath('/collab')
    return { success: true }
}
