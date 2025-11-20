import { createClient } from '@/lib/supabase/server'
import { CreateProposalForm } from '@/components/create-proposal-form'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Search, Filter, DollarSign, Sparkles } from 'lucide-react'
import { Input } from '@/components/ui/input'

export default async function CollabMarketPage() {
    const supabase = await createClient()

    // Fetch proposals (Mocking data if table is empty for demo purposes, or fetching real data)
    // For this "Vision" demo, we'll try to fetch, but fallback to UI if empty or error
    const { data: proposals } = await supabase
        .from('collab_proposals')
        .select('*')
        .eq('status', 'open')
        .order('created_at', { ascending: false })

    return (
        <div className="min-h-screen bg-black text-white p-6 md:p-12">
            <div className="max-w-7xl mx-auto space-y-12">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div className="space-y-2">
                        <h1 className="text-4xl font-bold tracking-tight">Collab Market</h1>
                        <p className="text-zinc-400 text-lg">
                            Find your next creative partner. Secured by Escrow.
                        </p>
                    </div>
                    <CreateProposalForm />
                </div>

                {/* Filters */}
                <div className="flex gap-4 items-center bg-zinc-900/50 p-4 rounded-xl border border-zinc-800">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-zinc-500" />
                        <Input
                            placeholder="Search proposals..."
                            className="pl-9 bg-zinc-950 border-zinc-800 text-white"
                        />
                    </div>
                    <Button variant="outline" className="border-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-800">
                        <Filter className="mr-2 h-4 w-4" />
                        Filter by Vibe
                    </Button>
                    <Button variant="outline" className="border-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-800">
                        <DollarSign className="mr-2 h-4 w-4" />
                        Budget Range
                    </Button>
                </div>

                {/* Listings Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Mock Card 1 (Cyberpunk) */}
                    <Card className="bg-zinc-900 border-zinc-800 hover:border-purple-500/50 transition-colors group">
                        <CardHeader>
                            <div className="flex justify-between items-start">
                                <Badge variant="outline" className="bg-purple-500/10 text-purple-400 border-purple-500/20">
                                    Cyberpunk Vibe
                                </Badge>
                                <span className="text-green-400 font-mono font-bold">$500</span>
                            </div>
                            <CardTitle className="text-xl text-white mt-2 group-hover:text-purple-400 transition-colors">
                                Need Editor for Neon City Reel
                            </CardTitle>
                            <CardDescription className="text-zinc-500">
                                Looking for fast cuts and glitch effects. Reference: Blade Runner 2049.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center gap-2 text-sm text-zinc-400">
                                <Avatar className="h-6 w-6">
                                    <AvatarFallback>JD</AvatarFallback>
                                </Avatar>
                                <span>Posted by John Doe</span>
                            </div>
                        </CardContent>
                        <CardFooter className="border-t border-zinc-800 pt-4">
                            <Button className="w-full bg-white text-black hover:bg-zinc-200">
                                Apply Now
                            </Button>
                        </CardFooter>
                    </Card>

                    {/* Mock Card 2 (Minimalist) */}
                    <Card className="bg-zinc-900 border-zinc-800 hover:border-blue-500/50 transition-colors group">
                        <CardHeader>
                            <div className="flex justify-between items-start">
                                <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/20">
                                    Minimalist
                                </Badge>
                                <span className="text-green-400 font-mono font-bold">$300</span>
                            </div>
                            <CardTitle className="text-xl text-white mt-2 group-hover:text-blue-400 transition-colors">
                                Clean Corporate Promo
                            </CardTitle>
                            <CardDescription className="text-zinc-500">
                                Simple typography, white background, slow pacing.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center gap-2 text-sm text-zinc-400">
                                <Avatar className="h-6 w-6">
                                    <AvatarFallback>AC</AvatarFallback>
                                </Avatar>
                                <span>Posted by Acme Corp</span>
                            </div>
                        </CardContent>
                        <CardFooter className="border-t border-zinc-800 pt-4">
                            <Button className="w-full bg-white text-black hover:bg-zinc-200">
                                Apply Now
                            </Button>
                        </CardFooter>
                    </Card>

                    {/* Real Data Rendering (if available) */}
                    {proposals?.map((proposal) => (
                        <Card key={proposal.id} className="bg-zinc-900 border-zinc-800 hover:border-zinc-700 transition-colors">
                            <CardHeader>
                                <div className="flex justify-between items-start">
                                    <Badge variant="outline" className="bg-zinc-800 text-zinc-300 border-zinc-700">
                                        {proposal.required_vibe || 'General'}
                                    </Badge>
                                    <span className="text-green-400 font-mono font-bold">${proposal.budget}</span>
                                </div>
                                <CardTitle className="text-xl text-white mt-2">
                                    {proposal.title}
                                </CardTitle>
                                <CardDescription className="text-zinc-500">
                                    {proposal.description}
                                </CardDescription>
                            </CardHeader>
                            <CardFooter className="border-t border-zinc-800 pt-4">
                                <Button className="w-full bg-white text-black hover:bg-zinc-200">
                                    Apply Now
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}

                </div>
            </div>
        </div>
    )
}
