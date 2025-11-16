import { Badge } from '@/components/ui/badge'

interface Conversation {
  id: string
  name: string
  role: string
  avatar: string
  lastMessage: string
  timestamp: string
  unread: boolean
  status: 'active' | 'idle' | 'offline'
  projectTitle: string
}

interface ConversationListProps {
  conversations: Conversation[]
  selectedId: string
  onSelect: (id: string) => void
}

export function ConversationList({ conversations, selectedId, onSelect }: ConversationListProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-600'
      case 'idle':
        return 'bg-yellow-500'
      default:
        return 'bg-gray-400'
    }
  }

  return (
    <div className="flex-1 overflow-y-auto space-y-1 p-2">
      {conversations.map((conv) => (
        <button
          key={conv.id}
          onClick={() => onSelect(conv.id)}
          className={`w-full text-left p-4 rounded-lg transition-colors ${
            selectedId === conv.id
              ? 'bg-primary text-primary-foreground'
              : 'hover:bg-accent text-foreground'
          }`}
        >
          <div className="flex items-start gap-3 mb-2">
            <div className="relative">
              <img
                src={conv.avatar || '/placeholder.svg'}
                alt={conv.name}
                className="w-12 h-12 rounded-full object-cover bg-muted"
              />
              <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-card ${getStatusColor(conv.status)}`} />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start gap-2 mb-1">
                <p className="font-semibold truncate">{conv.name}</p>
                <span className={`text-xs flex-shrink-0 ${selectedId === conv.id ? 'opacity-70' : 'text-muted-foreground'}`}>
                  {conv.timestamp}
                </span>
              </div>

              <p className={`text-sm ${selectedId === conv.id ? 'opacity-90' : 'text-muted-foreground'} truncate`}>
                {conv.lastMessage}
              </p>

              {conv.unread && selectedId !== conv.id && (
                <Badge className="mt-2 bg-primary text-primary-foreground">New</Badge>
              )}
            </div>
          </div>
        </button>
      ))}
    </div>
  )
}
