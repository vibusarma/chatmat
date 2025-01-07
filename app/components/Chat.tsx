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

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (!data || !data.message) {
        throw new Error('Invalid response format');
      }

      const assistantMessage: Message = {
        role: "assistant",
        content: data.message,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error:", error);
      // Add user-friendly error message
      setMessages((prev) => [...prev, {
        role: "assistant",
        content: "Sorry, I encountered an error. Please try again."
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[80vh] max-w-4xl mx-auto p-6">
      <div className="flex-1 overflow-y-auto mb-6 space-y-6 scrollbar-thin scrollbar-thumb-accent scrollbar-track-transparent">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`p-4 rounded-2xl max-w-[85%] shadow-sm ${
                message.role === "user"
                  ? "bg-gradient-to-br from-primary to-accent text-primary-foreground"
                  : "bg-secondary text-secondary-foreground"
              } transform transition-all duration-200 hover:scale-[1.02]`}
            >
              {formatMessage(message.content)}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-secondary text-secondary-foreground p-4 rounded-2xl animate-pulse">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-muted rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-muted rounded-full animate-bounce delay-100" />
                <div className="w-2 h-2 bg-muted rounded-full animate-bounce delay-200" />
              </div>
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="flex gap-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 p-4 rounded-xl bg-secondary/50 border border-border text-black
            placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary/50 
            transition-all duration-200"
          placeholder="Ask me anything..."
        />
        <button
          type="submit"
          className="p-4 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-xl
            hover:opacity-90 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed
            shadow-lg hover:shadow-xl"
          disabled={isLoading}
        >
          <FiSend size={20} />
        </button>
      </form>
    </div>
  );
} 