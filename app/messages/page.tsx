'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Send, Plus, SearchIcon } from 'lucide-react'
import Link from 'next/link'

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

export default function MessagesPage() {
  const router = useRouter()
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (!storedUser) {
      router.push('/auth/login')
      return
    }

    setUser(JSON.parse(storedUser))
    loadConversations(JSON.parse(storedUser))
  }, [router])

  const loadConversations = async (currentUser: any) => {
    const supabase = createClient()

    // Get all messages involving the current user
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .or(`sender_id.eq.${currentUser.id},recipient_id.eq.${currentUser.id}`)
      .order('created_at', { ascending: false })

    if (!error && data) {
      // Extract unique conversation partners
      const partners = new Map<string, any>()

      for (const msg of data) {
        const partnerId = msg.sender_id === currentUser.id ? msg.recipient_id : msg.sender_id

        if (!partners.has(partnerId)) {
          // Fetch partner details
          const { data: partnerData } = await supabase
            .from('users')
            .select('*')
            .eq('id', partnerId)
            .single()

          if (partnerData) {
            partners.set(partnerId, {
              id: partnerId,
              display_name: partnerData.display_name,
              username: partnerData.username,
              profile_image_url: partnerData.profile_image_url,
              lastMessage: msg.content,
              lastMessageTime: msg.created_at,
              unread: msg.read ? 0 : 1,
            })
          }
        }
      }

      setConversations(Array.from(partners.values()))
    }

    setLoading(false)
  }

  const loadMessages = async (recipientId: string) => {
    const supabase = createClient()

    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .or(
        `and(sender_id.eq.${user.id},recipient_id.eq.${recipientId}),and(sender_id.eq.${recipientId},recipient_id.eq.${user.id})`
      )
      .order('created_at', { ascending: true })

    if (!error && data) {
      setMessages(data)
      scrollToBottom()
    }
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!inputValue.trim() || !selectedConversation) return

    const supabase = createClient()

    const { data, error } = await supabase
      .from('messages')
      .insert({
        sender_id: user.id,
        recipient_id: selectedConversation,
        content: inputValue,
      })
      .select()

    if (!error && data) {
      setMessages([...messages, data[0]])
      setInputValue('')
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
        <div className="w-80 border-r border-slate-800 bg-slate-900/30 flex flex-col">
          {/* Search */}
          <div className="p-4 border-b border-slate-800">
            <div className="relative">
              <SearchIcon className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
              <input
                type="text"
                placeholder="Search conversations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-slate-800/50 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 text-sm"
              />
            </div>
          </div>

          {/* Conversations List */}
          <div className="flex-1 overflow-y-auto">
            {loading ? (
              <div className="flex items-center justify-center h-32">
                <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-500 border-t-transparent" />
              </div>
            ) : filteredConversations.length > 0 ? (
              filteredConversations.map((conversation) => (
                <button
                  key={conversation.id}
                  onClick={() => {
                    setSelectedConversation(conversation.id)
                    loadMessages(conversation.id)
                  }}
                  className={`w-full text-left p-4 border-b border-white/10 transition-colors ${
                    selectedConversation === conversation.id
                      ? 'bg-white/5 border-l-2 border-l-white/30'
                      : 'hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-white/10 border border-white/20 overflow-hidden">
                      {conversation.profile_image_url && (
                        <img
                          src={conversation.profile_image_url || "/placeholder.svg"}
                          alt={conversation.display_name}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-slate-50 truncate">
                        {conversation.display_name}
                      </p>
                      <p className="text-sm text-slate-400 truncate">
                        {conversation.lastMessage}
                      </p>
                    </div>
                  </div>
                </button>
              ))
            ) : (
              <div className="flex items-center justify-center h-32 text-slate-500">
                <p>No conversations yet</p>
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
                <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 overflow-hidden">
                  {activeConversation.profile_image_url && (
                    <img
                      src={activeConversation.profile_image_url || "/placeholder.svg"}
                      alt={activeConversation.display_name}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <div>
                  <p className="font-semibold text-slate-50">{activeConversation.display_name}</p>
                  <p className="text-xs text-slate-400">@{activeConversation.username}</p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender_id === user.id ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                      msg.sender_id === user.id
                        ? 'bg-white/10 text-white'
                        : 'bg-white/5 text-white'
                    }`}
                  >
                    <p className="break-words">{msg.content}</p>
                    <p className={`text-xs mt-2 ${
                      msg.sender_id === user.id ? 'text-white/60' : 'text-white/50'
                    }`}>
                      {new Date(msg.created_at).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="border-t border-slate-800 bg-slate-900/30 p-4">
              <form onSubmit={handleSendMessage} className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Type your message..."
                  className="input-modern flex-1 px-4 py-3 rounded-lg text-white placeholder-white/40 focus:outline-none"
                />
                <button
                  type="submit"
                  className="p-3 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-all"
                >
                  <Send className="w-5 h-5" />
                </button>
              </form>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center text-slate-400">
            <div className="text-center">
              <p className="text-lg mb-4">Select a conversation to start messaging</p>
              <p className="text-sm">or browse creators to start a new chat</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
