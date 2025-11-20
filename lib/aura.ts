export interface AuraProfile {
    vibe: 'Energetic' | 'Moody' | 'Minimalist' | 'Chaotic' | 'Professional'
    colorPalette: string[]
    matchScore: number
    keywords: string[]
}

export function calculateAura(user: any): AuraProfile {
    // Keyword-based matching logic
    const bio = (user.bio || '').toLowerCase()
    const location = (user.location || '').toLowerCase()
    const text = `${bio} ${location}`

    // Define keywords for each vibe
    const keywords = {
        Energetic: ['fun', 'active', 'sport', 'dance', 'travel', 'adventure', 'loud', 'excited'],
        Moody: ['art', 'dark', 'night', 'music', 'deep', 'thought', 'poetry', 'sad'],
        Minimalist: ['simple', 'clean', 'design', 'white', 'black', 'modern', 'tech'],
        Chaotic: ['random', 'crazy', 'wild', 'meme', 'funny', 'lol', 'weird'],
        Professional: ['business', 'work', 'marketing', 'ceo', 'founder', 'money', 'growth']
    }

    // Count matches
    const scores: Record<string, number> = {
        Energetic: 0,
        Moody: 0,
        Minimalist: 0,
        Chaotic: 0,
        Professional: 0
    }

    Object.entries(keywords).forEach(([vibe, words]) => {
        words.forEach(word => {
            if (text.includes(word)) {
                scores[vibe]++
            }
        })
    })

    // Find dominant vibe
    let maxScore = -1
    let dominantVibe = 'Energetic' // Default

    Object.entries(scores).forEach(([vibe, score]) => {
        if (score > maxScore) {
            maxScore = score
            dominantVibe = vibe
        }
    })

    // If no matches, fallback to deterministic hash
    if (maxScore === 0) {
        const vibes = ['Energetic', 'Moody', 'Minimalist', 'Chaotic', 'Professional']
        const index = (user.username?.length || 0) % vibes.length
        dominantVibe = vibes[index]
    }

    // Palettes map
    const palettes: Record<string, string[]> = {
        Energetic: ['#FF5733', '#FFC300', '#DAF7A6'],
        Moody: ['#2C3E50', '#8E44AD', '#2980B9'],
        Minimalist: ['#FFFFFF', '#E5E7EB', '#000000'],
        Chaotic: ['#FF00FF', '#00FFFF', '#FFFF00'],
        Professional: ['#2C3E50', '#ECF0F1', '#BDC3C7']
    }

    // Generate keywords based on vibe
    const vibeKeywords = {
        Energetic: ['Bold', 'Active', 'Dynamic'],
        Moody: ['Deep', 'Artistic', 'Mysterious'],
        Minimalist: ['Clean', 'Sleek', 'Modern'],
        Chaotic: ['Wild', 'Unpredictable', 'Fun'],
        Professional: ['Serious', 'Focused', 'Driven']
    }

    return {
        vibe: dominantVibe as any,
        colorPalette: palettes[dominantVibe],
        matchScore: Math.min(99, 70 + (maxScore * 5)), // Base 70%, +5% per keyword match
        keywords: vibeKeywords[dominantVibe as keyof typeof vibeKeywords]
    }
}
