'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { getCurrentUser } from '@/lib/auth-service'
import { z } from 'zod'

const profileSchema = z.object({
    displayName: z.string().min(2, 'Display name must be at least 2 characters'),
    bio: z.string().min(10, 'Bio must be at least 10 characters'),
    location: z.string().optional(),
    website: z.string().url().optional().or(z.literal('')),
    userType: z.enum(['creator', 'professional']),
})

export type ProfileState = {
    error?: string
    success?: boolean
}

export async function updateProfile(prevState: ProfileState, formData: FormData): Promise<ProfileState> {
    const user = await getCurrentUser()

    if (!user) {
        return { error: 'Not authenticated' }
    }

    const validatedFields = profileSchema.safeParse({
        displayName: formData.get('displayName'),
        bio: formData.get('bio'),
        location: formData.get('location'),
        website: formData.get('website'),
        userType: formData.get('userType'),
    })

    if (!validatedFields.success) {
        return {
            error: validatedFields.error.flatten().fieldErrors.bio?.[0] || 'Invalid input',
        }
    }

    const { displayName, bio, location, website, userType } = validatedFields.data
    const supabase = await createClient()

    const { error: updateError } = await supabase
        .from('users')
        .update({
            display_name: displayName,
            bio,
            location,
            website,
            updated_at: new Date().toISOString(),
        })
        .eq('id', user.id)

    if (updateError) {
        return { error: updateError.message }
    }

    const { error: roleError } = await supabase
        .from('user_roles')
        .upsert({
            user_id: user.id,
            role: userType,
        }, { onConflict: 'user_id,role' })

    if (roleError) {
        return { error: roleError.message }
    }

    redirect('/dashboard')
}
