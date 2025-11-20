'use client'

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { TrendingUp, Users, Eye, MousePointerClick } from 'lucide-react'

interface LiveStatsGraphProps {
    data?: any[]
}

export default function LiveStatsGraph({ data }: LiveStatsGraphProps) {
    // Use provided data or empty array to prevent errors
    const chartData = data || []

    return (
        <div className="glass-card p-6 md:p-8">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-2xl font-bold text-white mb-1">Live Performance</h2>
                    <p className="text-white/60 text-sm">Real-time growth metrics across all platforms</p>
                </div>
                <div className="flex gap-2">
                    <div className="px-3 py-1 rounded-lg bg-blue-500/10 text-blue-400 text-xs font-bold border border-blue-500/20 flex items-center gap-1">
                        <Users className="w-3 h-3" /> +12%
                    </div>
                    <div className="px-3 py-1 rounded-lg bg-green-500/10 text-green-400 text-xs font-bold border border-green-500/20 flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" /> +24%
                    </div>
                </div>
            </div>

            <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                        <defs>
                            <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="colorFollowers" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
                        <XAxis
                            dataKey="name"
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
                        />
                        <Tooltip
                            contentStyle={{ backgroundColor: '#000', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                            itemStyle={{ color: '#fff' }}
                            cursor={{ stroke: 'rgba(255,255,255,0.2)' }}
                        />
                        <Area type="monotone" dataKey="views" stroke="#8884d8" fillOpacity={1} fill="url(#colorViews)" />
                        <Area type="monotone" dataKey="followers" stroke="#82ca9d" fillOpacity={1} fill="url(#colorFollowers)" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-white/10">
                <div className="text-center">
                    <div className="flex items-center justify-center gap-2 text-white/60 text-sm mb-1">
                        <Eye className="w-4 h-4" /> Avg Views
                    </div>
                    <div className="text-2xl font-bold text-white">45.2K</div>
                </div>
                <div className="text-center border-l border-white/10">
                    <div className="flex items-center justify-center gap-2 text-white/60 text-sm mb-1">
                        <MousePointerClick className="w-4 h-4" /> CTR
                    </div>
                    <div className="text-2xl font-bold text-white">4.8%</div>
                </div>
                <div className="text-center border-l border-white/10">
                    <div className="flex items-center justify-center gap-2 text-white/60 text-sm mb-1">
                        <Users className="w-4 h-4" /> Engagement
                    </div>
                    <div className="text-2xl font-bold text-white">12.5%</div>
                </div>
            </div>
        </div>
    )
}
