import { createClient } from '@/lib/supabase/server'
import { getCurrentUser } from '@/lib/auth-service'
import Link from 'next/link'
import { ArrowLeft, Calendar, DollarSign, MapPin, Clock, Share2, Flag, MessageSquare } from 'lucide-react'
import DeleteJobButton from './delete-job-button'

export default async function JobDetailsPage({ params }: { params: { id: string } }) {
    const user = await getCurrentUser()
    const supabase = await createClient()

    const { data: job } = await supabase
        .from('creator_jobs')
        .select(`
      *,
      creator:users(id, display_name, username, profile_image_url, location, bio)
    `)
        .eq('id', params.id)
        .single()

    if (!job) {
        return (
            <div className="min-h-screen hero-gradient flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-white mb-4">Job Not Found</h1>
                    <Link href="/jobs" className="btn-primary">
                        Back to Jobs
                    </Link>
                </div>
            </div>
        )
    }

    const isOwner = user?.id === job.creator_id

    return (
        <div className="min-h-screen hero-gradient relative overflow-hidden">
            {/* Navigation */}
            <nav className="sticky top-0 z-50 nav-glass">
                <div className="max-w-7xl mx-auto px-6 py-5">
                    <Link href="/jobs" className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Jobs
                    </Link>
                </div>
            </nav>

            <div className="max-w-5xl mx-auto px-6 py-12 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Job Header */}
                        <div className="glass-card p-8">
                            <div className="flex items-start justify-between mb-6">
                                <div>
                                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{job.title}</h1>
                                    <div className="flex flex-wrap gap-4 text-sm text-white/60">
                                        <span className="px-3 py-1 rounded-full bg-white/10 text-white/80">
                                            {job.category || 'General'}
                                        </span>
                                        <div className="flex items-center gap-1.5">
                                            <Clock className="w-4 h-4" />
                                            <span>Posted {new Date(job.created_at).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                </div>
                                {isOwner && (
                                    <div className="flex gap-2">
                                        <DeleteJobButton jobId={job.id} />
                                    </div>
                                )}
                            </div>

                            <div className="prose prose-invert max-w-none">
                                <h3 className="text-xl font-bold text-white mb-4">Description</h3>
                                <p className="text-white/80 whitespace-pre-wrap leading-relaxed">
                                    {job.description}
                                </p>
                            </div>
                        </div>

                        {/* Job Details */}
                        <div className="glass-card p-8">
                            <h3 className="text-xl font-bold text-white mb-6">Project Details</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5">
                                    <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                                        <DollarSign className="w-5 h-5 text-green-400" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-white/50">Budget</p>
                                        <p className="text-white font-semibold">
                                            ${job.budget_min?.toLocaleString()} - ${job.budget_max?.toLocaleString()}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5">
                                    <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                                        <Calendar className="w-5 h-5 text-blue-400" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-white/50">Timeline</p>
                                        <p className="text-white font-semibold">{job.timeline || 'Flexible'}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Apply Card */}
                        <div className="glass-card p-6 sticky top-24">
                            {!isOwner ? (
                                <Link
                                    href={`/messages?user=${job.creator_id}&message=Hi, I'm interested in your job post: ${job.title}`}
                                    className="btn-primary w-full py-4 text-lg font-bold mb-4 flex items-center justify-center gap-2"
                                >
                                    <MessageSquare className="w-5 h-5" />
                                    Apply Now
                                </Link>
                            ) : (
                                <div className="p-4 bg-white/5 rounded-xl text-center mb-4">
                                    <p className="text-white/60 text-sm">This is your job post</p>
                                </div>
                            )}

                            <div className="flex gap-2">
                                <button className="btn-secondary flex-1 py-2 text-sm flex items-center justify-center gap-2">
                                    <Share2 className="w-4 h-4" />
                                    Share
                                </button>
                                <button className="btn-secondary flex-1 py-2 text-sm flex items-center justify-center gap-2">
                                    <Flag className="w-4 h-4" />
                                    Report
                                </button>
                            </div>
                        </div>

                        {/* About the Client */}
                        <div className="glass-card p-6">
                            <h3 className="text-lg font-bold text-white mb-4">About the Client</h3>
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 rounded-full bg-white/10 overflow-hidden">
                                    {job.creator?.profile_image_url ? (
                                        <img
                                            src={job.creator.profile_image_url}
                                            alt={job.creator.display_name}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-white font-bold">
                                            {job.creator?.display_name?.[0] || job.creator?.username?.[0]}
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <Link href={`/creator/${job.creator.id}`} className="font-bold text-white hover:underline">
                                        {job.creator.display_name || job.creator.username}
                                    </Link>
                                    <p className="text-sm text-white/50">@{job.creator.username}</p>
                                </div>
                            </div>
                            {job.creator?.location && (
                                <div className="flex items-center gap-2 text-sm text-white/60 mb-4">
                                    <MapPin className="w-4 h-4" />
                                    <span>{job.creator.location}</span>
                                </div>
                            )}
                            {job.creator?.bio && (
                                <p className="text-sm text-white/70 line-clamp-3">
                                    {job.creator.bio}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
