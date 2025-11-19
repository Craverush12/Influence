import { createClient } from '@/lib/supabase/server'
import { getCurrentUser } from '@/lib/auth-service'
import Link from 'next/link'
import { Plus, Briefcase, DollarSign, Clock, MapPin, Search } from 'lucide-react'

export default async function JobsPage() {
    const user = await getCurrentUser()
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
        <div className="min-h-screen hero-gradient relative overflow-hidden">
            {/* Navigation */}
            <nav className="sticky top-0 z-50 nav-glass">
                <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
                    <Link href="/" className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center">
                            <Briefcase className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-bold gradient-text">Creator Jobs</span>
                    </Link>
                    <div className="flex items-center gap-4">
                        <Link href="/dashboard" className="text-white/70 hover:text-white transition-colors">
                            Dashboard
                        </Link>
                        <Link href="/jobs/new" className="btn-primary inline-flex items-center gap-2">
                            <Plus className="w-4 h-4" />
                            Post a Job
                        </Link>
                    </div>
                </div>
            </nav>

            <div className="max-w-7xl mx-auto px-6 py-12 relative z-10">
                {/* Header */}
                <div className="mb-12 fade-in">
                    <h1 className="text-5xl md:text-6xl font-black mb-4">
                        <span className="gradient-text">Find</span> <span className="text-white">Opportunities</span>
                    </h1>
                    <p className="text-xl text-white/60 mb-8">Collaborate with top creators on exciting projects</p>

                    {/* Search - Placeholder for now */}
                    <div className="relative max-w-2xl">
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                        <input
                            type="text"
                            placeholder="Search jobs by title, category..."
                            className="input-modern w-full pl-14 pr-5"
                        />
                    </div>
                </div>

                {/* Jobs Grid */}
                <div className="grid grid-cols-1 gap-6">
                    {jobs?.map((job: any) => (
                        <Link
                            key={job.id}
                            href={`/jobs/${job.id}`}
                            className="glass-card p-6 hover:bg-white/10 transition-all group"
                        >
                            <div className="flex flex-col md:flex-row gap-6">
                                {/* Creator Info */}
                                <div className="flex-shrink-0">
                                    <div className="w-16 h-16 rounded-xl bg-white/10 overflow-hidden">
                                        {job.creator?.profile_image_url ? (
                                            <img
                                                src={job.creator.profile_image_url}
                                                alt={job.creator.display_name}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-white font-bold text-xl">
                                                {job.creator?.display_name?.[0] || job.creator?.username?.[0]}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Job Details */}
                                <div className="flex-1">
                                    <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-2">
                                        <div>
                                            <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                                                {job.title}
                                            </h3>
                                            <p className="text-white/60 text-sm">
                                                by {job.creator?.display_name || job.creator?.username}
                                            </p>
                                        </div>
                                        <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-xs font-medium text-white/80 mt-2 md:mt-0">
                                            {job.category || 'General'}
                                        </span>
                                    </div>

                                    <p className="text-white/70 mb-4 line-clamp-2">{job.description}</p>

                                    <div className="flex flex-wrap gap-4 text-sm text-white/50">
                                        {(job.budget_min || job.budget_max) && (
                                            <div className="flex items-center gap-1.5">
                                                <DollarSign className="w-4 h-4" />
                                                <span>
                                                    ${job.budget_min?.toLocaleString()} - ${job.budget_max?.toLocaleString()}
                                                </span>
                                            </div>
                                        )}
                                        {job.timeline && (
                                            <div className="flex items-center gap-1.5">
                                                <Clock className="w-4 h-4" />
                                                <span>{job.timeline}</span>
                                            </div>
                                        )}
                                        {job.creator?.location && (
                                            <div className="flex items-center gap-1.5">
                                                <MapPin className="w-4 h-4" />
                                                <span>{job.creator.location}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}

                    {(!jobs || jobs.length === 0) && (
                        <div className="text-center py-20">
                            <p className="text-white/50 text-lg">No open jobs found at the moment.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
