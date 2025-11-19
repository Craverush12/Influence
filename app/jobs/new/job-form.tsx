'use client'

import { useActionState } from 'react'
import { createJob } from '@/app/actions/jobs'
import { Loader2, AlertCircle } from 'lucide-react'

interface JobFormState {
    error: string | {
        title?: string[]
        description?: string[]
        category?: string[]
        budget_min?: string[]
        budget_max?: string[]
        timeline?: string[]
    } | null
}

const initialState: JobFormState = {
    error: null,
}

export default function JobForm() {
    const [state, formAction, isPending] = useActionState(createJob, initialState)

    const getFieldError = (field: 'title' | 'description' | 'category' | 'budget_min' | 'budget_max' | 'timeline') => {
        if (!state?.error || typeof state.error === 'string') return null
        return state.error[field]?.[0]
    }

    return (
        <form action={formAction} className="space-y-6">
            {/* Title */}
            <div>
                <label htmlFor="title" className="block text-sm font-medium text-white/80 mb-2">
                    Job Title
                </label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    required
                    placeholder="e.g. Need a Video Editor for YouTube Channel"
                    className="input-modern w-full"
                />
                {getFieldError('title') && (
                    <p className="text-red-400 text-sm mt-1">{getFieldError('title')}</p>
                )}
            </div>

            {/* Category */}
            <div>
                <label htmlFor="category" className="block text-sm font-medium text-white/80 mb-2">
                    Category
                </label>
                <select
                    id="category"
                    name="category"
                    className="input-modern w-full bg-black/20"
                >
                    <option value="Video Editing">Video Editing</option>
                    <option value="Graphic Design">Graphic Design</option>
                    <option value="Content Writing">Content Writing</option>
                    <option value="Social Media Management">Social Media Management</option>
                    <option value="Photography">Photography</option>
                    <option value="Other">Other</option>
                </select>
            </div>

            {/* Description */}
            <div>
                <label htmlFor="description" className="block text-sm font-medium text-white/80 mb-2">
                    Description
                </label>
                <textarea
                    id="description"
                    name="description"
                    required
                    rows={6}
                    placeholder="Describe the project details, requirements, and what you're looking for..."
                    className="input-modern w-full resize-none"
                ></textarea>
                {getFieldError('description') && (
                    <p className="text-red-400 text-sm mt-1">{getFieldError('description')}</p>
                )}
            </div>

            {/* Budget Range */}
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label htmlFor="budget_min" className="block text-sm font-medium text-white/80 mb-2">
                        Min Budget ($)
                    </label>
                    <input
                        type="number"
                        id="budget_min"
                        name="budget_min"
                        min="0"
                        placeholder="100"
                        className="input-modern w-full"
                    />
                </div>
                <div>
                    <label htmlFor="budget_max" className="block text-sm font-medium text-white/80 mb-2">
                        Max Budget ($)
                    </label>
                    <input
                        type="number"
                        id="budget_max"
                        name="budget_max"
                        min="0"
                        placeholder="1000"
                        className="input-modern w-full"
                    />
                </div>
            </div>

            {/* Timeline */}
            <div>
                <label htmlFor="timeline" className="block text-sm font-medium text-white/80 mb-2">
                    Timeline
                </label>
                <input
                    type="text"
                    id="timeline"
                    name="timeline"
                    placeholder="e.g. 2 weeks, ASAP"
                    className="input-modern w-full"
                />
            </div>

            {/* Error Message */}
            {state?.error && typeof state.error === 'string' && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-2 text-red-400">
                    <AlertCircle className="w-5 h-5" />
                    <p>{state.error}</p>
                </div>
            )}

            {/* Submit Button */}
            <button
                type="submit"
                disabled={isPending}
                className="btn-primary w-full flex items-center justify-center gap-2 py-3"
            >
                {isPending ? (
                    <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Posting Job...
                    </>
                ) : (
                    'Post Job'
                )}
            </button>
        </form>
    )
}
