'use client';

import { useTheme } from '../context/ThemeContext';
import { FiSun, FiMoon, FiMonitor } from 'react-icons/fi';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="fixed top-4 right-4 bg-secondary/50 backdrop-blur-sm rounded-full p-1 flex gap-1">
      <button
        onClick={() => setTheme('light')}
        className={`p-2 rounded-full transition-all ${
          theme === 'light'
            ? 'bg-primary text-primary-foreground'
            : 'hover:bg-secondary/80'
        }`}
        aria-label="Light mode"
      >
        <FiSun size={20} />
      </button>
      <button
        onClick={() => setTheme('dark')}
        className={`p-2 rounded-full transition-all ${
          theme === 'dark'
            ? 'bg-primary text-primary-foreground'
            : 'hover:bg-secondary/80'
        }`}
        aria-label="Dark mode"
      >
        <FiMoon size={20} />
      </button>
      <button
        onClick={() => setTheme('system')}
        className={`p-2 rounded-full transition-all ${
          theme === 'system'
            ? 'bg-primary text-primary-foreground'
            : 'hover:bg-secondary/80'
        }`}
        aria-label="System theme"
      >
        <FiMonitor size={20} />
      </button>
    </div>
  );
} 