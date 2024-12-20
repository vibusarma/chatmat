import Chat from "./components/Chat";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-accent/5">
      <div className="max-w-7xl mx-auto p-4 md:p-8">
        <header className="text-center mb-12">
          <div className="inline-block">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-3">
            ChatMate
            </h1>
            <div className="h-1 w-24 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
          </div>
          <p className="text-muted mt-4 text-lg">
            Your AI-powered conversation assistant
          </p>
        </header>
        <div className="bg-secondary/5 backdrop-blur-sm rounded-2xl shadow-lg border border-accent/10">
          <Chat />
        </div>
      </div>
    </main>
  );
}