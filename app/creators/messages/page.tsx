'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Send, Paperclip, Search, Phone, Video, Info, Plus, Clock, CheckCircle } from 'lucide-react'
import { useState } from 'react'
import { Sidebar } from '@/components/sidebar'
import { ConversationList } from '@/components/conversation-list'
import { ChatWindow } from '@/components/chat-window'
import { FileUploadArea } from '@/components/file-upload-area'

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState('1')
  const [messageText, setMessageText] = useState('')
  const [showFileUpload, setShowFileUpload] = useState(false)

  const [conversations] = useState([
    {
      id: '1',
      name: 'Alex Chen',
      role: 'Video Editor',
      avatar: '/placeholder.svg?height=48&width=48',
      lastMessage: 'I\'ve started on the first 3 videos. Should be done by tomorrow.',
      timestamp: '2 min ago',
      unread: true,
      status: 'active',
      projectTitle: 'YouTube Gaming Series - 10 Videos',
    },
    {
      id: '2',
      name: 'Sarah Martinez',
      role: 'Thumbnail Designer',
      avatar: '/placeholder.svg?height=48&width=48',
      lastMessage: 'Here are the 5 thumbnail designs for your TikTok series.',
      timestamp: '1 hour ago',
      unread: false,
      status: 'active',
      projectTitle: 'TikTok Thumbnail Package',
    },
    {
      id: '3',
      name: 'Jordan Lee',
      role: 'Audio Engineer',
      avatar: '/placeholder.svg?height=48&width=48',
      lastMessage: 'Audio mixing complete. Ready for review.',
      timestamp: '5 hours ago',
      unread: false,
      status: 'idle',
      projectTitle: 'Podcast Episode Audio Mix',
    },
  ])

  const [messages] = useState([
    {
      id: '1',
      sender: 'user',
      content: 'Hi Alex! I\'ve got 10 gaming videos that need editing. All are about 15-20 minutes long.',
      timestamp: '10:30 AM',
      avatar: '/placeholder.svg?height=40&width=40',
    },
    {
      id: '2',
      sender: 'alex',
      content: 'Sounds great! I can definitely handle that. What\'s your timeline and budget?',
      timestamp: '10:35 AM',
      avatar: '/placeholder.svg?height=40&width=40',
    },
    {
      id: '3',
      sender: 'user',
      content: 'Budget is $1500 total, and I need them done within 2 weeks.',
      timestamp: '10:36 AM',
      avatar: '/placeholder.svg?height=40&width=40',
    },
    {
      id: '4',
      sender: 'alex',
      content: 'Perfect, that works well for my schedule. Let me send you my contract and we can get started!',
      timestamp: '10:37 AM',
      avatar: '/placeholder.svg?height=40&width=40',
      file: { name: 'creator-editor-contract.pdf', size: '245 KB' },
    },
    {
      id: '5',
      sender: 'user',
      content: 'I\'ve started on the first 3 videos. Should be done by tomorrow.',
      timestamp: 'now',
      avatar: '/placeholder.svg?height=40&width=40',
    },
  ])

  const [milestones] = useState([
    {
      id: '1',
      title: 'Initial Contract & Payment',
      description: 'Contract signed and 50% payment received',
      completed: true,
      dueDate: '2025-01-08',
    },
    {
      id: '2',
      title: 'First 5 Videos Delivered',
      description: 'Initial batch of 5 edited videos delivered for review',
      completed: false,
      dueDate: '2025-01-10',
    },
    {
      id: '3',
      title: 'Final 5 Videos & Revisions',
      description: 'Remaining videos delivered and revisions completed',
      completed: false,
      dueDate: '2025-01-15',
    },
    {
      id: '4',
      title: 'Final Payment & Project Close',
      description: 'Final payment received, project completed',
      completed: false,
      dueDate: '2025-01-15',
    },
  ])

  const selectedConv = conversations.find(c => c.id === selectedConversation)

  const handleSendMessage = () => {
    if (messageText.trim()) {
      setMessageText('')
    }
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <Sidebar userType="creator" />

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Conversations List */}
        <div className="w-80 border-r border-border bg-card flex flex-col">
          <div className="p-6 border-b border-border">
            <h1 className="text-2xl font-bold text-foreground mb-4">Messages</h1>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search conversations..."
                className="pl-10"
              />
            </div>
          </div>

          {/* Conversation List */}
          <ConversationList
            conversations={conversations}
            selectedId={selectedConversation}
            onSelect={setSelectedConversation}
          />
        </div>

        {/* Chat Window */}
        <div className="flex-1 flex flex-col bg-background">
          {selectedConv ? (
            <>
              {/* Chat Header */}
              <div className="border-b border-border bg-card px-8 py-4 flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <img
                    src={selectedConv.avatar || '/placeholder.svg'}
                    alt={selectedConv.name}
                    className="w-12 h-12 rounded-full object-cover bg-muted"
                  />
                  <div>
                    <h2 className="text-lg font-semibold text-foreground">{selectedConv.name}</h2>
                    <p className="text-sm text-muted-foreground">{selectedConv.projectTitle}</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="ghost" size="sm">
                    <Phone className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Video className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Info className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Chat Body */}
              <div className="flex-1 flex overflow-hidden">
                <div className="flex-1 flex flex-col overflow-hidden">
                  {/* Messages */}
                  <ChatWindow messages={messages} />

                  {/* Message Input */}
                  <div className="border-t border-border bg-card p-6 space-y-4">
                    {showFileUpload && <FileUploadArea onClose={() => setShowFileUpload(false)} />}

                    <div className="flex gap-3">
                      <Input
                        placeholder="Type your message..."
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowFileUpload(!showFileUpload)}
                      >
                        <Paperclip className="w-5 h-5" />
                      </Button>
                      <Button
                        onClick={handleSendMessage}
                        className="bg-primary hover:bg-primary/90"
                      >
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Project Milestones Sidebar */}
                <div className="w-72 border-l border-border bg-card overflow-y-auto">
                  <div className="p-6 border-b border-border sticky top-0 bg-card">
                    <h3 className="font-semibold text-foreground flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      Project Milestones
                    </h3>
                  </div>

                  <div className="p-6 space-y-4">
                    {milestones.map((milestone) => (
                      <div
                        key={milestone.id}
                        className={`pb-4 border-b border-border last:border-0 ${
                          milestone.completed ? 'opacity-60' : ''
                        }`}
                      >
                        <div className="flex items-start gap-3 mb-2">
                          {milestone.completed ? (
                            <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                          ) : (
                            <div className="w-5 h-5 rounded-full border-2 border-muted mt-0.5 flex-shrink-0" />
                          )}
                          <div className="flex-1 min-w-0">
                            <p
                              className={`font-medium ${
                                milestone.completed
                                  ? 'line-through text-muted-foreground'
                                  : 'text-foreground'
                              }`}
                            >
                              {milestone.title}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {milestone.description}
                            </p>
                            <p className="text-xs text-muted-foreground mt-2">
                              Due: {milestone.dueDate}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-full text-center">
              <div>
                <h2 className="text-2xl font-semibold text-foreground mb-2">No conversation selected</h2>
                <p className="text-muted-foreground">Select a conversation to start messaging</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
