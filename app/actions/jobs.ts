'use server'

import { createClient } from '@/lib/supabase/server'
import { getCurrentUser } from '@/lib/auth-service'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { redirect } from 'next/navigation'

const jobSchema = z.object({
    title: z.string().min(3, 'Title must be at least 3 characters'),
    description: z.string().min(10, 'Description must be at least 10 characters'),
    category: z.string().optional(),
    budget_min: z.coerce.number().min(0).optional(),
    budget_max: z.coerce.number().min(0).optional(),
    timeline: z.string().optional(),
})

export async function createJob(prevState: any, formData: FormData) {
    const user = await getCurrentUser()

    if (!user) {
        return { error: 'You must be logged in to post a job' }
    }

    const validatedFields = jobSchema.safeParse({
        title: formData.get('title'),
        description: formData.get('description'),
        category: formData.get('category'),
        budget_min: formData.get('budget_min'),
        budget_max: formData.get('budget_max'),
        timeline: formData.get('timeline'),
    })

    if (!validatedFields.success) {
        return { error: validatedFields.error.flatten().fieldErrors }
    }

    const supabase = await createClient()

    const { error } = await supabase.from('creator_jobs').insert({
        creator_id: user.id,
        ...validatedFields.data,
        status: 'open',
    })

    if (error) {
        console.error('Error creating job:', error)
        return { error: 'Failed to create job' }
    }

    revalidatePath('/jobs')
    redirect('/jobs')
}

export async function deleteJob(jobId: string) {
    const user = await getCurrentUser()

    if (!user) {
        return { error: 'Unauthorized' }
    }

    const supabase = await createClient()

    // Verify ownership
    const { data: job } = await supabase
        .from('creator_jobs')
        .select('creator_id')
        .eq('id', jobId)
        .single()

    if (!job || job.creator_id !== user.id) {
        return { error: 'Unauthorized' }
    }

    const { error } = await supabase
        .from('creator_jobs')
        .delete()
        .eq('id', jobId)

    if (error) {
        return { error: 'Failed to delete job' }
    }

    revalidatePath('/jobs')
}
