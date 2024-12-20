"use client";

import { useState } from "react";
import { Message } from "@/types/chat";
import { FiSend } from "react-icons/fi";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import CopyButton from './CopyButton';

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const formatMessage = (content: string) => {
    if (content.includes("```")) {
      const parts = content.split(/(```[\s\S]*?```)/);
      return parts.map((part, index) => {
        if (part.startsWith("```")) {
          const match = part.match(/```(\w+)?\n([\s\S]*?)```/);
          if (match) {
            const [, lang, code] = match;
            return (
              <div key={index} className="my-2 rounded-lg overflow-hidden relative">
                <CopyButton text={code.trim()} />
                <SyntaxHighlighter
                  language={lang || 'text'}
                  style={vscDarkPlus}
                  className="!m-0"
                >
                  {code.trim()}
                </SyntaxHighlighter>
              </div>
            );
          }
        }
        return <span key={index}>{part}</span>;
      });
    }
    return content;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() === "") return;

    const newMessage: Message = {
      role: "user",
      content: input,
    };

    setMessages((prev) => [...prev, newMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();
      
      const assistantMessage: Message = {
        role: "assistant",
        content: data.message,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen max-w-3xl mx-auto p-4">
      <div className="flex-1 overflow-y-auto mb-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`p-3 rounded-lg max-w-[80%] ${
                message.role === "user"
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground"
              }`}
            >
              {formatMessage(message.content)}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-secondary text-secondary-foreground p-3 rounded-lg">
              Thinking...
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
      <input
  type="text"
  value={input}
  onChange={(e) => setInput(e.target.value)}
  className="flex-1 p-2 border rounded-lg bg-background text-foreground border-accent focus:outline-none focus:ring-2 focus:ring-primary"
  placeholder="Ask me anything..."
/>

        <button
          type="submit"
          className="p-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          disabled={isLoading}
        >
          <FiSend size={20} />
        </button>
      </form>
    </div>
  );
} 