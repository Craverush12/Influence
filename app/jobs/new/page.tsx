import { getCurrentUser } from '@/lib/auth-service'
import { redirect } from 'next/navigation'
import JobForm from './job-form'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default async function NewJobPage() {
    const user = await getCurrentUser()

    if (!user) {
        redirect('/auth/login?next=/jobs/new')
    }

    return (
        <div className="min-h-screen hero-gradient py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">
                <Link
                    href="/jobs"
                    className="inline-flex items-center gap-2 text-white/60 hover:text-white mb-8 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Jobs
                </Link>

                <div className="glass-card p-8">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-white mb-2">Post a New Job</h1>
                        <p className="text-white/60">
                            Describe your project and find the perfect creator for the job.
                        </p>
                    </div>

                    <JobForm />
                </div>
            </div>
        </div>
    )
}
