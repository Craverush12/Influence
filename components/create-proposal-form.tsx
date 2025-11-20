'use client'

import { useState } from 'react'
import { createProposal } from '@/app/actions/collab'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Plus, Loader2 } from 'lucide-react'
import { toast } from 'sonner'

export function CreateProposalForm() {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)

        const formData = new FormData(e.currentTarget)

        try {
            const result = await createProposal(formData)

            if (result.error) {
                toast.error(result.error)
            } else {
                toast.success('Proposal created successfully!')
                setOpen(false)
            }
        } catch (error) {
            toast.error('Something went wrong')
        } finally {
            setLoading(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="bg-white text-black hover:bg-zinc-200 font-medium">
                    <Plus className="mr-2 h-4 w-4" />
                    Post a Request
                </Button>
            </DialogTrigger>
            <DialogContent className="bg-zinc-900 border-zinc-800 text-white sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create Collab Proposal</DialogTitle>
                    <DialogDescription className="text-zinc-400">
                        Describe what you need. Your budget will be held in Escrow upon agreement.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                    <div className="space-y-2">
                        <Label htmlFor="title">Title</Label>
                        <Input id="title" name="title" placeholder="e.g. Need Editor for Travel Vlog" className="bg-zinc-950 border-zinc-800" required />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea id="description" name="description" placeholder="Details about the project..." className="bg-zinc-950 border-zinc-800 min-h-[100px]" required />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="budget">Budget (Karma)</Label>
                            <Input id="budget" name="budget" type="number" placeholder="500" className="bg-zinc-950 border-zinc-800" required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="requiredVibe">Vibe Match</Label>
                            <Select name="requiredVibe">
                                <SelectTrigger className="bg-zinc-950 border-zinc-800">
                                    <SelectValue placeholder="Select Vibe" />
                                </SelectTrigger>
                                <SelectContent className="bg-zinc-900 border-zinc-800 text-white">
                                    <SelectItem value="Cyberpunk">Cyberpunk</SelectItem>
                                    <SelectItem value="Minimalist">Minimalist</SelectItem>
                                    <SelectItem value="Cottagecore">Cottagecore</SelectItem>
                                    <SelectItem value="High Energy">High Energy</SelectItem>
                                    <SelectItem value="Cinematic">Cinematic</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <DialogFooter className="pt-4">
                        <Button type="submit" disabled={loading} className="w-full bg-white text-black hover:bg-zinc-200">
                            {loading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Posting...
                                </>
                            ) : (
                                'Post Proposal'
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
