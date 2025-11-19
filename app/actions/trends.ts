'use server'

import { createClient } from '@/lib/supabase/server'

export async function getTrends() {
    const supabase = await createClient()

    const { data: trends, error } = await supabase
        .from('trends')
        .select('*')
        .order('growth_rate', { ascending: false })

    if (error) {
        console.error('Error fetching trends:', error)
        return []
    }

    return trends
}
