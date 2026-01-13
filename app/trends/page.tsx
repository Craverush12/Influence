import { redirect } from 'next/navigation'
import { getCurrentUser } from '@/lib/auth-service'
import { getTrends } from '@/app/actions/trends'
import { AppLayout } from '@/components/layout/app-layout'
import { Breadcrumbs } from '@/components/navigation/breadcrumbs'
import { TrendingUp, Zap, ArrowUp, ArrowDown, Minus, TrendingDown } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { EmptyState } from '@/components/ui/empty-state'

export default async function TrendsPage() {
    const user = await getCurrentUser()
    
    if (!user) {
        redirect('/auth/login')
    }

    const trends = await getTrends()

    // Mock data if no trends available
    const mockTrends = [
        { id: '1', topic: 'AI Video Editing', platform: 'TikTok', growth_rate: 145, mentions: 12400, category: 'Technology' },
        { id: '2', topic: 'Vintage Aesthetic', platform: 'Instagram', growth_rate: 89, mentions: 8700, category: 'Design' },
        { id: '3', topic: 'Green Screen Tips', platform: 'YouTube', growth_rate: 67, mentions: 5600, category: 'Tutorial' },
        { id: '4', topic: 'Brand Collabs', platform: 'TikTok', growth_rate: 54, mentions: 4200, category: 'Business' },
        { id: '5', topic: 'Behind The Scenes', platform: 'Instagram', growth_rate: 42, mentions: 3900, category: 'Content' },
        { id: '6', topic: 'Minimalist Design', platform: 'YouTube', growth_rate: 28, mentions: 2800, category: 'Design' },
    ]

    const displayTrends = trends && trends.length > 0 ? trends : mockTrends

    const getTrendIcon = (growthRate: number) => {
        if (growthRate > 100) return <ArrowUp className="w-4 h-4 text-green-500" />
        if (growthRate > 50) return <TrendingUp className="w-4 h-4 text-brand-amber" />
        if (growthRate > 0) return <Minus className="w-4 h-4 text-muted-foreground" />
        return <TrendingDown className="w-4 h-4 text-destructive" />
    }

    const getTrendBadge = (growthRate: number) => {
        if (growthRate > 100) return <Badge variant="success">🔥 Hot</Badge>
        if (growthRate > 50) return <Badge variant="warning">📈 Rising</Badge>
        return <Badge variant="secondary">📊 Steady</Badge>
    }

    return (
        <AppLayout user={user}>
            <div className="min-h-screen bg-background">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
                    {/* Breadcrumbs */}
                    <Breadcrumbs items={[{ label: 'Trends', href: '/trends' }]} className="mb-6" />

                    {/* Header */}
                    <div className="mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
                            <Zap className="w-4 h-4 text-primary fill-primary" />
                            <span className="text-sm font-medium text-foreground">Real-time Insights</span>
                        </div>

                        <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
                            <span className="text-foreground">Trend</span>{' '}
                            <span className="text-primary">Radar</span>
                        </h1>
                        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
                            Spot the next big thing before it goes viral. Track rising topics across TikTok, Instagram, and YouTube.
                        </p>
                    </div>

                    {/* Trends Grid */}
                    {displayTrends.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
                            {displayTrends.map((trend, index) => (
                                <Card 
                                    key={trend.id} 
                                    variant="elevated" 
                                    className="group hover:border-primary/50 transition-all duration-300"
                                    style={{ animationDelay: `${index * 100}ms` }}
                                >
                                    <CardHeader>
                                        <div className="flex items-start justify-between mb-2">
                                            <div className="flex items-center gap-2">
                                                {getTrendIcon(trend.growth_rate)}
                                                <CardTitle className="text-lg group-hover:text-primary transition-colors">
                                                    {trend.topic}
                                                </CardTitle>
                                            </div>
                                            {getTrendBadge(trend.growth_rate)}
                                        </div>
                                        <CardDescription className="flex items-center gap-2">
                                            <Badge variant="outline" size="sm">{trend.platform}</Badge>
                                            <Badge variant="outline" size="sm">{trend.category}</Badge>
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-2xl font-bold text-foreground">
                                                    +{trend.growth_rate}%
                                                </p>
                                                <p className="text-xs text-muted-foreground">Growth Rate</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-lg font-semibold text-muted-foreground">
                                                    {(trend.mentions / 1000).toFixed(1)}K
                                                </p>
                                                <p className="text-xs text-muted-foreground">Mentions</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    ) : (
                        <EmptyState
                            icon={<TrendingUp className="w-8 h-8" />}
                            title="No trends available"
                            description="Check back soon for the latest trending topics and insights."
                        />
                    )}

                    {/* Info Banner */}
                    {trends && trends.length === 0 && (
                        <Card variant="glass" className="mt-8 border-primary/20">
                            <CardContent className="p-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                                        <Zap className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-foreground mb-1">
                                            Showing sample trends
                                        </h3>
                                        <p className="text-sm text-muted-foreground">
                                            These are example trends to demonstrate the feature. Real trend data will be displayed once the trends table is set up.
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </AppLayout>
    )
}
