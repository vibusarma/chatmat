import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import Chat from "./components/Chat";

export default function Home() {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
      <div className="max-w-7xl mx-auto p-4 md:p-8">
        <header className="text-center mb-12">
          <div className="inline-block">
            <h1 className="text-6xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent mb-3 
              hover:scale-105 transition-transform duration-300">
              ChatMate
            </h1>
            <div className="h-1.5 w-32 bg-gradient-to-r from-primary via-accent to-primary mx-auto rounded-full 
              animate-pulse" />
          </div>
          <p className="text-muted mt-4 text-lg font-light">
            Your AI-powered conversation assistant
          </p>
        </header>
        <div className="bg-secondary/30 backdrop-blur-xl rounded-3xl shadow-lg border border-border">
          <Chat />
        </div>
      </div>
    </main>
  );
}