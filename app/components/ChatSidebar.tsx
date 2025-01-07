import { ChatHistory } from "@/types/chat";
import { format } from "date-fns";
import { FiMessageSquare, FiTrash2 } from "react-icons/fi";

interface ChatSidebarProps {
  histories: ChatHistory[];
  onSelectChat: (history: ChatHistory) => void;
  onDeleteChat: (id: string) => void;
  selectedChatId?: string;
}

export default function ChatSidebar({ 
  histories, 
  onSelectChat, 
  onDeleteChat,
  selectedChatId 
}: ChatSidebarProps) {
  return (
    <div className="w-64 h-[80vh] bg-secondary/30 backdrop-blur-xl rounded-l-3xl border-r border-border p-4">
      <h2 className="text-lg font-semibold mb-4">Chat History</h2>
      <div className="space-y-2 overflow-y-auto h-[calc(100%-2rem)]">
        {histories.map((history) => (
          <div
            key={history.id}
            className={`p-3 rounded-lg cursor-pointer transition-all hover:bg-secondary/50 flex justify-between items-center group ${
              selectedChatId === history.id ? "bg-secondary/70" : ""
            }`}
            onClick={() => onSelectChat(history)}
          >
            <div className="flex items-center space-x-3">
              <FiMessageSquare className="text-muted" />
              <div>
                <p className="text-sm truncate">
                  {history.messages[0]?.content.slice(0, 30)}...
                </p>
                <p className="text-xs text-muted">
                  {format(new Date(history.timestamp), "MMM d, yyyy")}
                </p>
              </div>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDeleteChat(history.id);
              }}
              className="opacity-0 group-hover:opacity-100 p-1 hover:bg-secondary/80 rounded transition-all"
              aria-label="Delete chat"
            >
              <FiTrash2 className="text-red-400" size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
} 