import Link from "next/link";
import ChatHistoryItem from "@/components/ChatHistory";

export default function HistoryPage() {
  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Chat History</h1>
        <Link 
          href="/"
          className="text-primary hover:text-primary/80 transition-colors"
        >
          Back to Chat
        </Link>
      </div>
      <div className="space-y-4">
        <p className="text-muted">No chat history yet</p>
      </div>
    </div>
  );
} 