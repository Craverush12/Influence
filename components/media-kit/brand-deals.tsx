import { Star, ExternalLink, Calendar } from 'lucide-react'

interface BrandDeal {
    id: string
    brand_name: string
    campaign_name: string
    deal_date: string
    logo_url: string
    testimonial: string
    rating: number
}

interface BrandDealsProps {
    deals: BrandDeal[]
}

export default function BrandDeals({ deals }: BrandDealsProps) {
    if (!deals || deals.length === 0) {
        return (
            <div className="glass-card p-8 text-center">
                <h2 className="text-2xl font-bold text-white mb-2">Brand Collaborations</h2>
                <p className="text-white/50">No brand deals listed yet.</p>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white mb-6">Brand Collaborations</h2>

            <div className="grid grid-cols-1 gap-4">
                {deals.map((deal, i) => (
                    <div key={i} className="glass-card p-6 hover:bg-white/5 transition-colors group">
                        <div className="flex items-start gap-4">
                            <div className="w-16 h-16 rounded-xl bg-white flex items-center justify-center p-3 shrink-0">
                                <img src={deal.logo_url} alt={deal.brand_name} className="w-full h-full object-contain" />
                            </div>

                            <div className="flex-1">
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <h3 className="text-lg font-bold text-white">{deal.brand_name}</h3>
                                        <p className="text-white/60 text-sm">{deal.campaign_name}</p>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-white/40 bg-white/5 px-2 py-1 rounded-lg">
                                        <Calendar className="w-3 h-3" />
                                        {deal.deal_date}
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
