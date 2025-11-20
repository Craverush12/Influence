'use client'

import { useState } from 'react'
import { analyzeReel } from '@/app/actions/analyze-reel'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Upload, Video, Sparkles, Zap, Loader2 } from 'lucide-react'
import { toast } from 'sonner'

export function ReelUpload() {
    const [videoUrl, setVideoUrl] = useState('')
    const [loading, setLoading] = useState(false)
    const [analysis, setAnalysis] = useState<any>(null)

    const handleAnalyze = async () => {
        if (!videoUrl) {
            toast.error('Please enter a video URL')
            return
        }

        setLoading(true)
        setAnalysis(null)

        const formData = new FormData()
        formData.append('videoUrl', videoUrl)

        try {
            const result = await analyzeReel(formData)

            if (result.error) {
                toast.error(result.error)
            } else {
                setAnalysis(result.analysis)
                toast.success('Vibe detected!')
            }
        } catch (error) {
            toast.error('Something went wrong')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="w-full max-w-md mx-auto space-y-6">
            <Card className="border-zinc-800 bg-zinc-900/50 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-xl font-bold text-white">
                        <Sparkles className="w-5 h-5 text-purple-400" />
                        Vibe Match Engine
                    </CardTitle>
                    <CardDescription className="text-zinc-400">
                        Paste a reel URL to detect its aesthetic soul.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <div className="relative">
                            <Video className="absolute left-3 top-3 h-4 w-4 text-zinc-500" />
                            <Input
                                placeholder="https://instagram.com/reel/..."
                                value={videoUrl}
                                onChange={(e) => setVideoUrl(e.target.value)}
                                className="pl-9 bg-zinc-950 border-zinc-800 text-white placeholder:text-zinc-600 focus-visible:ring-purple-500"
                            />
                        </div>
                    </div>

                    <Button
                        onClick={handleAnalyze}
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Analyzing Vibe...
                            </>
                        ) : (
                            <>
                                <Zap className="mr-2 h-4 w-4" />
                                Analyze Vibe
                            </>
                        )}
                    </Button>
                </CardContent>
            </Card>

            {analysis && (
                <Card className="border-zinc-800 bg-zinc-900/50 backdrop-blur-sm animate-in fade-in slide-in-from-bottom-4">
                    <CardHeader>
                        <CardTitle className="text-lg font-semibold text-white">Analysis Result</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <span className="text-xs text-zinc-500 uppercase tracking-wider">Aesthetic</span>
                                <div className="text-lg font-medium text-purple-400">{analysis.aesthetic}</div>
                            </div>
                            <div className="space-y-1">
                                <span className="text-xs text-zinc-500 uppercase tracking-wider">Mood</span>
                                <div className="text-lg font-medium text-blue-400">{analysis.mood}</div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <span className="text-xs text-zinc-500 uppercase tracking-wider">Pacing</span>
                            <div className="flex items-center gap-2">
                                <div className="h-2 flex-1 bg-zinc-800 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-gradient-to-r from-green-500 to-emerald-500"
                                        style={{ width: analysis.pacing === 'Fast' || analysis.pacing === 'Frenetic' ? '90%' : analysis.pacing === 'Moderate' ? '50%' : '20%' }}
                                    />
                                </div>
                                <span className="text-sm text-zinc-300">{analysis.pacing}</span>
                            </div>
                        </div>

                        <div className="pt-4 border-t border-zinc-800">
                            <Badge variant="outline" className="border-purple-500/30 text-purple-400 bg-purple-500/10">
                                98% Match with "Cinematic" Editors
                            </Badge>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}
