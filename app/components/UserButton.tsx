"use client";

import { UserButton as ClerkUserButton } from "@clerk/nextjs";

export default function UserButton() {
  return (
    <div className="fixed top-4 left-4">
      <ClerkUserButton appearance={{
        elements: {
          userButtonBox: "hover:scale-105 transition-transform",
          userButtonTrigger: "rounded-full ring-2 ring-border hover:ring-primary",
        }
      }} />
    </div>
  );
} 