import { createClient } from '@/lib/supabase/server'
import { getCurrentUser } from '@/lib/auth-service'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Plus, Briefcase, Search, Filter, TrendingUp } from 'lucide-react'
import { ResponsiveGrid } from '@/components/responsive-grid'
import PremiumJobCard from '@/components/premium-job-card'
import { AppLayout } from '@/components/layout/app-layout'
import { Breadcrumbs } from '@/components/navigation/breadcrumbs'

export default async function JobsPage() {
    const user = await getCurrentUser()
    
    if (!user) {
        redirect('/auth/login')
    }
    
    const supabase = await createClient()

    const { data: jobs } = await supabase
        .from('creator_jobs')
        .select(`
      *,
      creator:users(display_name, username, profile_image_url, location)
    `)
        .eq('status', 'open')
        .order('created_at', { ascending: false })

    return (
        <AppLayout user={user}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 relative z-10">
                {/* Breadcrumbs & Header */}
                <div className="mb-8">
                    <Breadcrumbs items={[{ label: 'Jobs' }]} className="mb-4" />
                    
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                            <h1 className="text-3xl sm:text-4xl font-bold mb-2">Job Opportunities</h1>
                            <p className="text-muted-foreground">Find high-paying collaborations and grow your career</p>
                        </div>
                        <Link href="/jobs/new" className="btn-primary inline-flex items-center justify-center gap-2">
                            <Plus className="w-4 h-4" />
                            Post a Job
                        </Link>
                    </div>
                </div>
                {/* Search & Filter Bar */}
                <div className="mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">

                    {/* Search & Filter Bar */}
                    <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-2 max-w-3xl mx-auto shadow-sm flex flex-col sm:flex-row gap-2">
                        <div className="relative flex-1">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                            <input
                                type="text"
                                placeholder="Search by title, skills..."
                                className="w-full bg-transparent border-none focus:ring-0 pl-12 pr-4 py-3 text-foreground placeholder:text-muted-foreground"
                            />
                        </div>
                        <button className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-muted hover:bg-muted/80 transition-colors">
                            <Filter className="w-4 h-4" />
                            <span className="text-sm font-medium">Filter</span>
                        </button>
                    </div>
                </div>

                {/* Featured/Hot Jobs Section */}
                {jobs && jobs.length > 0 && (
                    <div className="mb-8 sm:mb-12">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-2">
                                <TrendingUp className="w-5 h-5 text-accent" />
                                <h2 className="text-xl sm:text-2xl font-bold">Hot Opportunities</h2>
                            </div>
                        </div>
                        <ResponsiveGrid minWidth={320} gap={6}>
                            {jobs.slice(0, 3).map((job: any) => (
                                <PremiumJobCard key={job.id} job={job} showUrgency={true} />
                            ))}
                        </ResponsiveGrid>
                    </div>
                )}

                {/* All Jobs Grid */}
                {jobs && jobs.length > 3 && (
                    <div>
                        <h2 className="text-xl sm:text-2xl font-bold mb-6">All Opportunities</h2>
                        <ResponsiveGrid minWidth={320} gap={6}>
                            {jobs.slice(3).map((job: any) => (
                                <PremiumJobCard key={job.id} job={job} />
                            ))}
                        </ResponsiveGrid>
                    </div>
                )}

                {/* Empty State */}
                {(!jobs || jobs.length === 0) && (
                    <div className="text-center py-20">
                        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                            <Briefcase className="w-8 h-8 text-muted-foreground" />
                        </div>
                        <h3 className="text-lg font-medium text-foreground mb-2">No opportunities yet</h3>
                        <p className="text-muted-foreground mb-6">Be the first to post a job opportunity</p>
                        <Link href="/jobs/new" className="btn-primary inline-flex items-center gap-2">
                            <Plus className="w-4 h-4" />
                            Post Your First Job
                        </Link>
                    </div>
                )}
            </div>
        </AppLayout>
    )
}
