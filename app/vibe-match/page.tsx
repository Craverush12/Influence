import { redirect } from 'next/navigation'
import { getCurrentUser } from '@/lib/auth-service'
import { ReelUpload } from '@/components/reel-upload'
import { AppLayout } from '@/components/layout/app-layout'
import { Breadcrumbs } from '@/components/navigation/breadcrumbs'
import { Sparkles } from 'lucide-react'

export default async function VibeMatchPage() {
    const user = await getCurrentUser()
    
    if (!user) {
        redirect('/auth/login')
    }

    return (
        <AppLayout user={user}>
            <div className="min-h-screen bg-background">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
                    {/* Breadcrumbs */}
                    <Breadcrumbs items={[{ label: 'Vibe Match' }]} className="mb-6" />

                    {/* Header */}
                    <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-6">
                            <Sparkles className="w-8 h-8 text-primary" />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
                            Find Your <span className="text-primary">Vibe</span> Match
                        </h1>
                        <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto">
                            Upload a reel. Our AI analyzes the aesthetic, pacing, and mood to connect you with the perfect creative partner.
                        </p>
                    </div>

                    {/* Upload Section */}
                    <div className="max-w-4xl mx-auto">
                        <ReelUpload />
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}
