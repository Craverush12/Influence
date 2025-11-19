import { Star, ExternalLink, Calendar } from 'lucide-react'

export default function BrandDeals() {
    const deals = [
        {
            brand: 'Nike',
            campaign: 'Summer Run Collection',
            date: 'Aug 2024',
            logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg',
            testimonial: "One of the most professional creators we've worked with. The content was exactly on brand and performed 3x above benchmark.",
            rating: 5
        },
        {
            brand: 'Spotify',
            campaign: 'Wrapped 2023',
            date: 'Dec 2023',
            logo: 'https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg',
            testimonial: "Incredible energy and creativity. They turned a simple brief into a viral moment.",
            rating: 5
        },
        {
            brand: 'Adobe',
            campaign: 'Creative Cloud',
            date: 'Mar 2024',
            logo: 'https://upload.wikimedia.org/wikipedia/commons/8/8d/Adobe_Corporate_Logo.png',
            testimonial: "High quality production value and great storytelling. Highly recommended.",
            rating: 5
        }
    ]

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white mb-6">Brand Collaborations</h2>

            <div className="grid grid-cols-1 gap-4">
                {deals.map((deal, i) => (
                    <div key={i} className="glass-card p-6 hover:bg-white/5 transition-colors group">
                        <div className="flex items-start gap-4">
                            <div className="w-16 h-16 rounded-xl bg-white flex items-center justify-center p-3 shrink-0">
                                <img src={deal.logo} alt={deal.brand} className="w-full h-full object-contain" />
                            </div>

                            <div className="flex-1">
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <h3 className="text-lg font-bold text-white">{deal.brand}</h3>
                                        <p className="text-white/60 text-sm">{deal.campaign}</p>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-white/40 bg-white/5 px-2 py-1 rounded-lg">
                                        <Calendar className="w-3 h-3" />
                                        {deal.date}
                                    </div>
                                </div>

                                <div className="relative mt-4 pl-4 border-l-2 border-white/10">
                                    <p className="text-white/80 italic text-sm leading-relaxed">"{deal.testimonial}"</p>
                                </div>

                                <div className="flex items-center gap-1 mt-3">
                                    {[...Array(deal.rating)].map((_, j) => (
                                        <Star key={j} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
