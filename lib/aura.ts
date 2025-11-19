export interface AuraProfile {
    vibe: 'Energetic' | 'Moody' | 'Minimalist' | 'Chaotic' | 'Professional'
    colorPalette: string[]
    matchScore: number
    keywords: string[]
}

export function calculateAura(user: any): AuraProfile {
    // In a real app, this would use Computer Vision on their profile pic
    // and NLP on their bio. For now, we'll use a deterministic mock based on username length.

    const vibes = ['Energetic', 'Moody', 'Minimalist', 'Chaotic', 'Professional']
    const palettes = [
        ['#FF5733', '#FFC300', '#DAF7A6'], // Energetic
        ['#2C3E50', '#8E44AD', '#2980B9'], // Moody
        ['#FFFFFF', '#E5E7EB', '#000000'], // Minimalist
        ['#FF00FF', '#00FFFF', '#FFFF00'], // Chaotic
        ['#2C3E50', '#ECF0F1', '#BDC3C7'], // Professional
    ]

    const index = (user.username?.length || 0) % vibes.length

    return {
        vibe: vibes[index] as any,
        colorPalette: palettes[index],
        matchScore: Math.floor(Math.random() * 30) + 70, // 70-99% match
        keywords: ['Creative', 'Visionary', 'Bold']
    }
}
