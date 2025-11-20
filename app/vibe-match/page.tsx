import { ReelUpload } from '@/components/reel-upload'

export default function VibeMatchPage() {
    return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-4xl space-y-8 text-center mb-12">
                <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-500 tracking-tighter">
                    Find Your <span className="text-purple-500">Vibe</span> Match
                </h1>
                <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto">
                    Upload a reel. Our AI analyzes the aesthetic, pacing, and mood to connect you with the perfect creative partner.
                </p>
            </div>

            <ReelUpload />
        </div>
    )
}
