'use client'

import { deleteJob } from '@/app/actions/jobs'
import { Trash2, Loader2 } from 'lucide-react'
import { useTransition } from 'react'
import { useRouter } from 'next/navigation'

export default function DeleteJobButton({ jobId }: { jobId: string }) {
    const [isPending, startTransition] = useTransition()
    const router = useRouter()

    const handleDelete = async () => {
        if (!confirm('Are you sure you want to delete this job?')) return

        startTransition(async () => {
            await deleteJob(jobId)
            router.push('/jobs')
        })
    }

    return (
        <button
            onClick={handleDelete}
            disabled={isPending}
            className="btn-secondary text-red-400 hover:bg-red-500/10 hover:border-red-500/30 flex items-center gap-2 text-sm"
        >
            {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
            Delete Job
        </button>
    )
}
