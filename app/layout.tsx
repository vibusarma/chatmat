import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from './context/ThemeContext';
import ThemeToggle from './components/ThemeToggle';
import { ClerkProvider } from "@clerk/nextjs";
import UserButton from './components/UserButton';

export const metadata: Metadata = {
  title: "ChatMate",
  description: "Your AI-powered conversation assistant",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ClerkProvider>
        <body className="antialiased font-sans">
          <ThemeProvider>
            <UserButton />
            <ThemeToggle />
            {children}
          </ThemeProvider>
        </body>
      </ClerkProvider>
    </html>
  );
}
