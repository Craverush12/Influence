'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { getCurrentUser } from '@/lib/auth-service'
import { z } from 'zod'

const socialSchema = z.object({
    platform: z.string().min(1, 'Platform is required'),
    handle: z.string().min(1, 'Handle is required'),
    url: z.string().url('Invalid URL').optional().or(z.literal('')),
})

export type SocialState = {
    error?: string
    success?: boolean
}

export async function addSocial(prevState: SocialState, formData: FormData): Promise<SocialState> {
    const user = await getCurrentUser()

    if (!user) {
        return { error: 'Not authenticated' }
    }

    const validatedFields = socialSchema.safeParse({
        platform: formData.get('platform'),
        handle: formData.get('handle'),
        url: formData.get('url'),
    })

    if (!validatedFields.success) {
        return {
            error: validatedFields.error.flatten().fieldErrors.handle?.[0] || 'Invalid input',
        }
    }

    const { platform, handle, url } = validatedFields.data
    const supabase = await createClient()

    const { error } = await supabase
        .from('user_socials')
        .insert({
            user_id: user.id,
            platform,
            handle,
            url,
        })

    if (error) {
        return { error: error.message }
    }

    revalidatePath('/profile/socials')
    return { success: true }
}

export async function deleteSocial(id: string) {
    const user = await getCurrentUser()

    if (!user) {
        throw new Error('Not authenticated')
    }

    const supabase = await createClient()

    const { error } = await supabase
        .from('user_socials')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id)

    if (error) {
        throw new Error(error.message)
    }

    revalidatePath('/profile/socials')
}
