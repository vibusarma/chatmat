"use client";

import { useState } from 'react';
import { FiCheck, FiCopy } from 'react-icons/fi';

interface CopyButtonProps {
  text: string;
}

export default function CopyButton({ text }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="absolute right-2 top-2 p-2 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors text-white"
      aria-label="Copy code"
    >
      {copied ? <FiCheck size={16} /> : <FiCopy size={16} />}
    </button>
  );
}