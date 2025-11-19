import { getTrends } from '@/app/actions/trends'
import TrendsDashboard from '@/components/trends-dashboard'
import { Sparkles, Zap } from 'lucide-react'

export default async function TrendsPage() {
    const trends = await getTrends()

    return (
        <div className="min-h-screen hero-gradient">
            {/* Background Elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[100px]"></div>
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px]"></div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-12 relative z-10">
                {/* Header */}
                <div className="mb-12 fade-in">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-6">
                        <Zap className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <span className="text-sm font-medium text-white/80">Real-time Insights</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-black mb-6">
                        <span className="text-white">Trend</span> <span className="gradient-text">Radar</span>
                    </h1>
                    <p className="text-xl text-white/60 max-w-2xl">
                        Spot the next big thing before it goes viral. Track rising topics across TikTok, Instagram, and YouTube.
                    </p>
                </div>

                <TrendsDashboard trends={trends} />
            </div>
        </div>
    )
}
