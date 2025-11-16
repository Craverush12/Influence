interface Message {
  id: string
  sender: 'user' | string
  content: string
  timestamp: string
  avatar: string
  file?: { name: string; size: string }
}

interface ChatWindowProps {
  messages: Message[]
}

export function ChatWindow({ messages }: ChatWindowProps) {
  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex gap-4 ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}
        >
          <img
            src={message.avatar || '/placeholder.svg'}
            alt="Avatar"
            className="w-8 h-8 rounded-full object-cover bg-muted flex-shrink-0"
          />

          <div className={`flex flex-col gap-2 max-w-md ${message.sender === 'user' ? 'items-end' : ''}`}>
            <div
              className={`px-4 py-3 rounded-lg ${
                message.sender === 'user'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-foreground'
              }`}
            >
              <p className="break-words">{message.content}</p>

              {message.file && (
                <div className="mt-3 flex items-center gap-2 bg-white/10 px-3 py-2 rounded">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 21H5a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v9m-9 5l3 3m0 0l3-3m-3 3v-6m0-11l-4 4m0 0l4-4m-4 4h8"
                    />
                  </svg>
                  <div className="text-xs">
                    <p className="font-medium">{message.file.name}</p>
                    <p className="opacity-75">{message.file.size}</p>
                  </div>
                </div>
              )}
            </div>

            <span className="text-xs text-muted-foreground">{message.timestamp}</span>
          </div>
        </div>
      ))}
    </div>
  )
}
