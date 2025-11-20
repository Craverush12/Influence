'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export async function analyzeReel(formData: FormData) {
    const supabase = await createClient()

    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        return { error: 'You must be logged in to analyze a reel.' }
    }

    const videoUrl = formData.get('videoUrl') as string

    if (!videoUrl) {
        return { error: 'Video URL is required.' }
    }

    // --- MOCK AI ANALYSIS ---
    // In a real implementation, we would send the videoUrl to Gemini/GPT-4o here.
    const vibes = [
        { aesthetic: 'Cyberpunk', mood: 'Dark & Gritty', pacing: 'Frenetic' },
        { aesthetic: 'Cottagecore', mood: 'Peaceful', pacing: 'Slow' },
        { aesthetic: 'Minimalist', mood: 'Clean', pacing: 'Moderate' },
        { aesthetic: 'High Energy', mood: 'Excited', pacing: 'Fast' },
    ]

    const randomVibe = vibes[Math.floor(Math.random() * vibes.length)]

    // Mock Embedding (1536 dimensions - just a few non-zero for testing)
    const mockEmbedding = Array(1536).fill(0).map(() => Math.random() * 0.1)
    // ------------------------

    const { data, error } = await supabase
        .from('reel_analysis')
        .insert({
            user_id: user.id,
            video_url: videoUrl,
            analysis_json: randomVibe,
            // embedding: mockEmbedding // Commented out until pgvector is confirmed/enabled to avoid errors if not set up
        })
        .select()
        .single()

    if (error) {
        console.error('Error saving analysis:', error)
        return { error: 'Failed to save analysis.' }
    }

    return { success: true, analysis: randomVibe }
}
