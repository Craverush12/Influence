import { createClient } from '@/lib/supabase/server'
import { getCurrentUser } from '@/lib/auth-service'
import { notFound } from 'next/navigation'
import { Shield, CheckCircle, Clock, AlertCircle, DollarSign, Lock } from 'lucide-react'
import ProjectActions from './project-actions'

interface ProjectPageProps {
    params: Promise<{
        id: string
    }>
}

export default async function ProjectPage({ params }: ProjectPageProps) {
    const { id } = await params
    const user = await getCurrentUser()
    if (!user) return notFound()

    const supabase = await createClient()
    const { data: project } = await supabase
        .from('projects')
        .select(`
      *,
      client:users!client_id(display_name, username),
      freelancer:users!freelancer_id(display_name, username)
    `)
        .eq('id', id)
        .single()

    if (!project) return notFound()

    // Ensure user is involved
    if (project.client_id !== user.id && project.freelancer_id !== user.id) {
        return notFound()
    }

    const isClient = user.id === project.client_id

    return (
        <div className="min-h-screen hero-gradient p-6">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-8 fade-in">
                    <div className="flex items-center gap-2 text-white/60 text-sm mb-2">
                        <Shield className="w-4 h-4" /> Secure Workspace
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{project.title}</h1>
                    <div className="flex items-center gap-4 text-white/60">
                        <span>Client: <strong className="text-white">{project.client.display_name}</strong></span>
                        <span>•</span>
                        <span>Freelancer: <strong className="text-white">{project.freelancer.display_name}</strong></span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="md:col-span-2 space-y-6">
                        {/* Status Card */}
                        <div className="glass-card p-8 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                <Shield className="w-32 h-32 text-white" />
                            </div>

                            <div className="relative z-10">
                                <h2 className="text-xl font-bold text-white mb-6">Project Status</h2>

                                <div className="space-y-8">
                                    {/* Step 1: Created */}
                                    <div className="flex gap-4">
                                        <div className="flex flex-col items-center">
                                            <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                                                <CheckCircle className="w-5 h-5 text-black" />
                                            </div>
                                            <div className="w-0.5 h-full bg-green-500/30 my-2"></div>
                                        </div>
                                        <div>
                                            <h3 className="text-white font-bold">Project Created</h3>
                                            <p className="text-white/60 text-sm">Terms agreed upon.</p>
                                        </div>
                                    </div>

                                    {/* Step 2: Funding */}
                                    <div className="flex gap-4">
                                        <div className="flex flex-col items-center">
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${project.escrow_status !== 'unfunded' ? 'bg-green-500' : 'bg-white/10 border border-white/20'
                                                }`}>
                                                {project.escrow_status !== 'unfunded' ? (
                                                    <CheckCircle className="w-5 h-5 text-black" />
                                                ) : (
                                                    <DollarSign className="w-4 h-4 text-white" />
                                                )}
                                            </div>
                                            <div className={`w-0.5 h-full my-2 ${project.escrow_status !== 'unfunded' ? 'bg-green-500/30' : 'bg-white/10'
                                                }`}></div>
                                        </div>
                                        <div>
                                            <h3 className={`font-bold ${project.escrow_status !== 'unfunded' ? 'text-white' : 'text-white/60'}`}>
                                                Escrow Funded
                                            </h3>
                                            <p className="text-white/60 text-sm">
                                                {project.escrow_status === 'funded'
                                                    ? `Funds secured (${project.budget} Karma)`
                                                    : 'Waiting for client to fund escrow'}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Step 3: Completion */}
                                    <div className="flex gap-4">
                                        <div className="flex flex-col items-center">
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${project.status === 'completed' ? 'bg-green-500' : 'bg-white/10 border border-white/20'
                                                }`}>
                                                {project.status === 'completed' ? (
                                                    <CheckCircle className="w-5 h-5 text-black" />
                                                ) : (
                                                    <Lock className="w-4 h-4 text-white" />
                                                )}
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className={`font-bold ${project.status === 'completed' ? 'text-white' : 'text-white/60'}`}>
                                                Funds Released
                                            </h3>
                                            <p className="text-white/60 text-sm">
                                                {project.status === 'completed'
                                                    ? 'Payment transferred to freelancer'
                                                    : 'Funds held until work is approved'}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="glass-card p-6">
                            <h3 className="text-lg font-bold text-white mb-4">Project Details</h3>
                            <p className="text-white/70 leading-relaxed">
                                {project.description || 'No description provided.'}
                            </p>
                        </div>
                    </div>

                    {/* Sidebar Actions */}
                    <div className="space-y-6">
                        <div className="glass-card p-6">
                            <div className="text-center mb-6">
                                <p className="text-white/60 text-sm mb-1">Total Budget</p>
                                <div className="text-4xl font-black text-white flex items-center justify-center gap-1">
                                    <Zap className="w-6 h-6 text-yellow-400 fill-yellow-400" />
                                    {project.budget}
                                </div>
                                <p className="text-white/40 text-xs mt-2">Karma Credits</p>
                            </div>

                            <ProjectActions
                                projectId={project.id}
                                isClient={isClient}
                                status={project.status}
                                escrowStatus={project.escrow_status}
                            />
                        </div>

                        <div className="glass-card p-6 bg-blue-500/10 border-blue-500/20">
                            <div className="flex items-start gap-3">
                                <Shield className="w-5 h-5 text-blue-400 shrink-0 mt-1" />
                                <div>
                                    <h4 className="font-bold text-white text-sm">Payment Protection</h4>
                                    <p className="text-white/60 text-xs mt-1">
                                        Funds are held securely in escrow until the work is approved. This protects both parties.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
