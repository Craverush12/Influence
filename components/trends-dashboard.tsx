'use client'

import { useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { TrendingUp, ArrowUpRight, Filter, Zap, Instagram, Youtube, Twitch, Globe } from 'lucide-react'

interface Trend {
    id: string
    topic: string
    platform: string
    volume: number
    growth_rate: number
    category: string
    description: string
}

interface TrendsDashboardProps {
    trends: Trend[]
}

export default function TrendsDashboard({ trends }: TrendsDashboardProps) {
    const [selectedPlatform, setSelectedPlatform] = useState<string>('All')

    const platforms = ['All', 'TikTok', 'Instagram', 'YouTube', 'Twitch']

    const filteredTrends = selectedPlatform === 'All'
        ? trends
        : trends.filter(t => t.platform === selectedPlatform)

    const getPlatformIcon = (platform: string) => {
        switch (platform.toLowerCase()) {
            case 'instagram': return Instagram
            case 'youtube': return Youtube
            case 'twitch': return Twitch
            default: return Globe
        }
    }

    return (
        <div className="space-y-8">
            {/* Filters */}
            <div className="flex flex-wrap gap-3">
                {platforms.map(platform => (
                    <button
                        key={platform}
                        onClick={() => setSelectedPlatform(platform)}
                        className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${selectedPlatform === platform
                                ? 'bg-white text-black shadow-lg scale-105'
                                : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
                            }`}
                    >
                        {platform}
                    </button>
                ))}
            </div>

            {/* Chart Section */}
            <div className="glass-card p-6 md:p-8">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-2xl font-bold text-white mb-1">Growth Velocity</h2>
                        <p className="text-white/60 text-sm">Fastest growing topics in the last 24h</p>
                    </div>
                    <div className="p-3 rounded-xl bg-green-500/10 text-green-400">
                        <TrendingUp className="w-6 h-6" />
                    </div>
                </div>

                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={filteredTrends}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
                            <XAxis
                                dataKey="topic"
                                stroke="rgba(255,255,255,0.4)"
                                tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 12 }}
                                tickLine={false}
                                axisLine={false}
                            />
                            <YAxis
                                stroke="rgba(255,255,255,0.4)"
                                tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 12 }}
                                tickLine={false}
                                axisLine={false}
                                tickFormatter={(value) => `${value}%`}
                            />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#000', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                                itemStyle={{ color: '#fff' }}
                                cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                            />
                            <Bar dataKey="growth_rate" radius={[4, 4, 0, 0]}>
                                {filteredTrends.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.growth_rate > 100 ? '#4ade80' : '#60a5fa'} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Trends Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTrends.map((trend, i) => {
                    const Icon = getPlatformIcon(trend.platform)
                    return (
                        <div
                            key={trend.id}
                            className="glass-card p-6 hover:scale-[1.02] transition-all group cursor-pointer"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-3 rounded-xl bg-white/5 group-hover:bg-white/10 transition-colors">
                                    <Icon className="w-6 h-6 text-white" />
                                </div>
                                <span className={`flex items-center gap-1 text-sm font-bold ${trend.growth_rate > 100 ? 'text-green-400' : 'text-blue-400'
                                    }`}>
                                    <ArrowUpRight className="w-4 h-4" />
                                    {trend.growth_rate}%
                                </span>
                            </div>

                            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                                {trend.topic}
                            </h3>
                            <p className="text-white/60 text-sm mb-4 line-clamp-2">
                                {trend.description}
                            </p>

                            <div className="flex items-center justify-between pt-4 border-t border-white/10">
                                <span className="text-xs text-white/40 font-medium uppercase tracking-wider">
                                    {trend.category}
                                </span>
                                <span className="text-xs text-white/40">
                                    {(trend.volume / 1000).toFixed(1)}k posts
                                </span>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
