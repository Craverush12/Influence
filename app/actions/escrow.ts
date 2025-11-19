'use server'

import { createClient } from '@/lib/supabase/server'
import { getCurrentUser } from '@/lib/auth-service'
import { revalidatePath } from 'next/cache'
import { getBalance } from './karma'

export async function createProject(title: string, description: string, freelancerId: string, budget: number) {
    const user = await getCurrentUser()
    if (!user) return { error: 'Unauthorized' }

    const supabase = await createClient()

    const { data, error } = await supabase
        .from('projects')
        .insert({
            title,
            description,
            client_id: user.id,
            freelancer_id: freelancerId,
            budget,
            status: 'pending',
            escrow_status: 'unfunded'
        })
        .select()
        .single()

    if (error) {
        console.error('Error creating project:', error)
        return { error: 'Failed to create project' }
    }

    return { success: true, projectId: data.id }
}

export async function fundProject(projectId: string) {
    const user = await getCurrentUser()
    if (!user) return { error: 'Unauthorized' }

    const supabase = await createClient()

    // 1. Get project details
    const { data: project } = await supabase
        .from('projects')
        .select('*')
        .eq('id', projectId)
        .single()

    if (!project) return { error: 'Project not found' }
    if (project.client_id !== user.id) return { error: 'Unauthorized' }
    if (project.escrow_status === 'funded') return { error: 'Already funded' }

    // 2. Check balance
    const balance = await getBalance()
    if (balance < project.budget) return { error: 'Insufficient Karma balance' }

    // 3. Deduct from client (Escrow Hold)
    const { error: txError } = await supabase.from('transactions').insert({
        user_id: user.id,
        amount: -project.budget,
        type: 'job_payment',
        description: `Escrow funding for project: ${project.title}`,
        recipient_id: null // Held by system
    })

    if (txError) return { error: 'Transaction failed' }

    // 4. Update project status
    await supabase
        .from('projects')
        .update({ status: 'active', escrow_status: 'funded' })
        .eq('id', projectId)

    revalidatePath(`/projects/${projectId}`)
    return { success: true }
}

export async function releaseFunds(projectId: string) {
    const user = await getCurrentUser()
    if (!user) return { error: 'Unauthorized' }

    const supabase = await createClient()

    // 1. Get project details
    const { data: project } = await supabase
        .from('projects')
        .select('*')
        .eq('id', projectId)
        .single()

    if (!project) return { error: 'Project not found' }
    if (project.client_id !== user.id) return { error: 'Only client can release funds' }
    if (project.escrow_status !== 'funded') return { error: 'No funds to release' }

    // 2. Credit freelancer
    const { error: txError } = await supabase.from('transactions').insert({
        user_id: project.freelancer_id,
        amount: project.budget,
        type: 'job_payment',
        description: `Payment released for project: ${project.title}`,
        recipient_id: user.id
    })

    if (txError) return { error: 'Transaction failed' }

    // 3. Update project status
    await supabase
        .from('projects')
        .update({ status: 'completed', escrow_status: 'released' })
        .eq('id', projectId)

    revalidatePath(`/projects/${projectId}`)
    return { success: true }
}
