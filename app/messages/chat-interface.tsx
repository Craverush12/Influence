'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Send, SearchIcon } from 'lucide-react'
import Link from 'next/link'
import { sendMessage } from '@/app/actions/messages'

interface Message {
    id: string
    sender_id: string
    recipient_id: string
    content: string
    created_at: string
    read: boolean
}

interface Conversation {
    id: string
    display_name: string
    username: string
    profile_image_url: string
    lastMessage?: string
    lastMessageTime?: string
    unread?: number
}

interface ChatInterfaceProps {
    currentUser: any
}

export default function ChatInterface({ currentUser }: ChatInterfaceProps) {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [conversations, setConversations] = useState<Conversation[]>([])
    const [selectedConversation, setSelectedConversation] = useState<string | null>(null)
    const [messages, setMessages] = useState<Message[]>([])
    const [inputValue, setInputValue] = useState('')
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')
    const [error, setError] = useState<string | null>(null)
    const [sending, setSending] = useState(false)
    const messagesEndRef = useRef<HTMLDivElement>(null)

    // Handle URL user parameter
    useEffect(() => {
        const userIdParam = searchParams.get('user')
        if (userIdParam && userIdParam !== currentUser.id) {
            handleStartConversation(userIdParam)
        }
    }, [searchParams, currentUser.id])

    useEffect(() => {
        loadConversations()
    }, [])

    const loadConversations = async () => {
        try {
            setLoading(true)
            setError(null)
            const supabase = createClient()

            const { data, error: messagesError } = await supabase
                .from('messages')
                .select('*')
                .or(`sender_id.eq.${currentUser.id},recipient_id.eq.${currentUser.id}`)
                .order('created_at', { ascending: false })

            if (messagesError) {
                console.error('Error loading messages:', messagesError)
                setError('Failed to load conversations')
                setLoading(false)
                return
            }

            if (!data || data.length === 0) {
                setConversations([])
                setLoading(false)
                return
            }

            const partners = new Map<string, any>()

            for (const msg of data) {
                const partnerId = msg.sender_id === currentUser.id ? msg.recipient_id : msg.sender_id

                if (!partners.has(partnerId)) {
                    const { data: partnerData, error: partnerError } = await supabase
                        .from('users')
                        .select('*')
                        .eq('id', partnerId)
                        .single()

                    if (partnerError) {
                        console.error('Error loading partner:', partnerError)
                        continue
                    }

                    if (partnerData) {
                        const unreadCount = data.filter(
                            (m) => m.recipient_id === currentUser.id &&
                                m.sender_id === partnerId &&
                                !m.read
                        ).length

                        const recentMessages = data.filter(
                            (m) => (m.sender_id === partnerId && m.recipient_id === currentUser.id) ||
                                (m.sender_id === currentUser.id && m.recipient_id === partnerId)
                        )
                        const lastMsg = recentMessages[0]

                        partners.set(partnerId, {
                            id: partnerId,
                            display_name: partnerData.display_name || partnerData.username,
                            username: partnerData.username,
                            profile_image_url: partnerData.profile_image_url,
                            lastMessage: lastMsg?.content || '',
                            lastMessageTime: lastMsg?.created_at,
                            unread: unreadCount,
                        })
                    }
                }
            }

            setConversations(Array.from(partners.values()))
        } catch (err) {
            console.error('Error in loadConversations:', err)
            setError('Failed to load conversations')
        } finally {
            setLoading(false)
        }
    }

    const loadMessages = async (recipientId: string) => {
        try {
            setError(null)
            const supabase = createClient()

            const { data, error: messagesError } = await supabase
                .from('messages')
                .select('*')
                .or(`and(sender_id.eq.${currentUser.id},recipient_id.eq.${recipientId}),and(sender_id.eq.${recipientId},recipient_id.eq.${currentUser.id})`)
                .order('created_at', { ascending: true })

            if (messagesError) {
                console.error('Error loading messages:', messagesError)
                setError('Failed to load messages')
                return
            }

            if (data) {
                setMessages(data)
                scrollToBottom()

                const unreadIds = data
                    .filter((m) => m.recipient_id === currentUser.id && !m.read)
                    .map((m) => m.id)

                if (unreadIds.length > 0) {
                    await supabase
                        .from('messages')
                        .update({ read: true })
                        .in('id', unreadIds)
                }
            }
        } catch (err) {
            console.error('Error in loadMessages:', err)
            setError('Failed to load messages')
        }
    }

    const scrollToBottom = () => {
        setTimeout(() => {
            messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
        }, 100)
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    // Realtime Subscription
    useEffect(() => {
        const supabase = createClient()

        const channel = supabase
            .channel('realtime-messages')
            .on(
                'postgres_changes',
                {
                    event: 'INSERT',
                    schema: 'public',
                    table: 'messages',
                    filter: `recipient_id=eq.${currentUser.id}`,
                },
                async (payload) => {
                    const newMessage = payload.new as Message

                    // If the message is from the currently selected conversation partner
                    if (selectedConversation && newMessage.sender_id === selectedConversation) {
                        setMessages((prev) => {
                            if (prev.some(m => m.id === newMessage.id)) return prev
                            return [...prev, newMessage]
                        })
                        scrollToBottom()

                        // Mark as read
                        await supabase
                            .from('messages')
                            .update({ read: true })
                            .eq('id', newMessage.id)
                    }

                    // Update conversations list
                    setConversations((prev) => {
                        const existingConv = prev.find(c => c.id === newMessage.sender_id)

                        if (existingConv) {
                            return prev.map(c => {
                                if (c.id === newMessage.sender_id) {
                                    return {
                                        ...c,
                                        lastMessage: newMessage.content,
                                        lastMessageTime: newMessage.created_at,
                                        unread: selectedConversation === newMessage.sender_id ? c.unread : (c.unread || 0) + 1
                                    }
                                }
                                return c
                            })
                        } else {
                            loadConversations()
                            return prev
                        }
                    })
                }
            )
            .subscribe()

        return () => {
            supabase.removeChannel(channel)
        }
    }, [currentUser.id, selectedConversation])

    const handleStartConversation = async (recipientId: string) => {
        const existingConv = conversations.find((c) => c.id === recipientId)

        if (existingConv) {
            setSelectedConversation(recipientId)
            loadMessages(recipientId)
            router.replace('/messages')
            return
        }

        const supabase = createClient()
        const { data: partnerData } = await supabase
            .from('users')
            .select('*')
            .eq('id', recipientId)
            .single()

        if (partnerData) {
            const newConv: Conversation = {
                id: recipientId,
                display_name: partnerData.display_name || partnerData.username,
                username: partnerData.username,
                profile_image_url: partnerData.profile_image_url,
                unread: 0
            }
            setConversations(prev => [...prev, newConv])
            setSelectedConversation(recipientId)
            setMessages([])
            router.replace('/messages')
        }
    }

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!inputValue.trim() || !selectedConversation) {
            return
        }

        if (sending) return

        try {
            setSending(true)
            setError(null)

            const newMessage = await sendMessage(selectedConversation, inputValue.trim())

            if (newMessage) {
                setMessages([...messages, newMessage])
                setInputValue('')
                scrollToBottom()

                setConversations(prev => prev.map(c => {
                    if (c.id === selectedConversation) {
                        return {
                            ...c,
                            lastMessage: newMessage.content,
                            lastMessageTime: newMessage.created_at
                        }
                    }
                    return c
                }))
            }
        } catch (err) {
            console.error('Error in handleSendMessage:', err)
            setError('Failed to send message. Please try again.')
        } finally {
            setSending(false)
        }
    }

    const filteredConversations = conversations.filter((conv) =>
        conv.display_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        conv.username?.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const activeConversation = conversations.find((c) => c.id === selectedConversation)

    return (
        <div className="min-h-screen hero-gradient flex flex-col">
            {/* Navigation */}
            <nav className="sticky top-0 z-50 nav-glass">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="w-10 h-10 bg-white/10 border border-white/20 rounded-xl flex items-center justify-center">
                                <span className="text-white font-bold">CH</span>
                            </div>
                            <span className="text-lg font-bold gradient-text">Creator Hub</span>
                        </Link>
                        <Link href="/dashboard" className="px-4 py-2 text-white/70 hover:text-white transition-colors">
                            Dashboard
                        </Link>
                    </div>
                </div>
            </nav>

            <div className="flex flex-1 overflow-hidden max-w-7xl mx-auto w-full">
                {/* Conversations Sidebar */}
                <div className="w-80 border-r border-white/10 bg-white/5 flex flex-col">
                    {/* Search */}
                    <div className="p-4 border-b border-white/10">
                        <div className="relative">
                            <SearchIcon className="absolute left-3 top-3 w-4 h-4 text-white/40" />
                            <input
                                type="text"
                                placeholder="Search conversations..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="input-modern w-full pl-10 pr-4 py-2 text-sm"
                            />
                        </div>
                    </div>

                    {/* Conversations List */}
                    <div className="flex-1 overflow-y-auto">
                        {loading ? (
                            <div className="flex items-center justify-center h-32">
                                <div className="animate-spin rounded-full h-8 w-8 border-2 border-white/20 border-t-white/60" />
                            </div>
                        ) : error ? (
                            <div className="flex items-center justify-center h-32 p-4">
                                <p className="text-white/60 text-sm text-center">{error}</p>
                            </div>
                        ) : filteredConversations.length > 0 ? (
                            filteredConversations.map((conversation) => (
                                <button
                                    key={conversation.id}
                                    onClick={() => {
                                        setSelectedConversation(conversation.id)
                                        loadMessages(conversation.id)
                                    }}
                                    className={`w-full text-left p-4 border-b border-white/10 transition-colors ${selectedConversation === conversation.id
                                        ? 'bg-white/5 border-l-2 border-l-white/30'
                                        : 'hover:bg-white/5'
                                        }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-full bg-white/10 border border-white/20 overflow-hidden flex-shrink-0">
                                            {conversation.profile_image_url ? (
                                                <img
                                                    src={conversation.profile_image_url || "/placeholder.svg"}
                                                    alt={conversation.display_name}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-white/10 flex items-center justify-center text-white font-light text-lg">
                                                    {(conversation.display_name || conversation.username)?.[0]?.toUpperCase()}
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between mb-1">
                                                <p className="font-light text-white truncate">
                                                    {conversation.display_name || conversation.username}
                                                </p>
                                                {conversation.unread && conversation.unread > 0 && (
                                                    <span className="ml-2 flex-shrink-0 w-5 h-5 rounded-full bg-white/20 text-white text-xs flex items-center justify-center">
                                                        {conversation.unread}
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-sm text-white/50 truncate">
                                                {conversation.lastMessage || 'No messages yet'}
                                            </p>
                                        </div>
                                    </div>
                                </button>
                            ))
                        ) : (
                            <div className="flex items-center justify-center h-32 text-white/50 p-4">
                                <div className="text-center">
                                    <p className="text-sm mb-2">No conversations yet</p>
                                    <p className="text-xs text-white/40">Start a conversation from a creator's profile</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Chat Area */}
                {selectedConversation && activeConversation ? (
                    <div className="flex-1 flex flex-col">
                        {/* Chat Header */}
                        <div className="border-b border-white/10 bg-white/5 p-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 overflow-hidden flex-shrink-0">
                                    {activeConversation.profile_image_url ? (
                                        <img
                                            src={activeConversation.profile_image_url || "/placeholder.svg"}
                                            alt={activeConversation.display_name}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-white/10 flex items-center justify-center text-white font-light">
                                            {(activeConversation.display_name || activeConversation.username)?.[0]?.toUpperCase()}
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <p className="font-light text-white">{activeConversation.display_name || activeConversation.username}</p>
                                    <p className="text-xs text-white/50">@{activeConversation.username}</p>
                                </div>
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            {messages.length === 0 ? (
                                <div className="flex items-center justify-center h-full">
                                    <p className="text-white/50 text-sm">No messages yet. Start the conversation!</p>
                                </div>
                            ) : (
                                messages.map((msg) => (
                                    <div
                                        key={msg.id}
                                        className={`flex ${msg.sender_id === currentUser.id ? 'justify-end' : 'justify-start'}`}
                                    >
                                        <div
                                            className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${msg.sender_id === currentUser.id
                                                ? 'bg-white/10 text-white'
                                                : 'bg-white/5 text-white'
                                                }`}
                                        >
                                            <p className="break-words font-light">{msg.content}</p>
                                            <p className={`text-xs mt-2 font-light ${msg.sender_id === currentUser.id ? 'text-white/60' : 'text-white/50'
                                                }`}>
                                                {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="px-4 py-2 bg-red-500/10 border-t border-red-500/20">
                                <p className="text-red-400/80 text-sm">{error}</p>
                            </div>
                        )}

                        {/* Input */}
                        <div className="border-t border-white/10 bg-white/5 p-4">
                            <form onSubmit={handleSendMessage} className="flex gap-2">
                                <input
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    placeholder="Type your message..."
                                    className="input-modern flex-1 px-4 py-3 rounded-lg"
                                    disabled={sending}
                                />
                                <button
                                    type="submit"
                                    disabled={sending || !inputValue.trim()}
                                    className="p-3 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {sending ? (
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    ) : (
                                        <Send className="w-5 h-5" />
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                ) : (
                    <div className="flex-1 flex items-center justify-center text-white/50">
                        <div className="text-center">
                            <p className="text-lg mb-4 font-light">Select a conversation to start messaging</p>
                            <p className="text-sm text-white/40 font-light">or browse creators to start a new chat</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
