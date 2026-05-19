import { Moon, Sun } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useApp();
  return (
    <button type="button" className="theme-toggle" onClick={toggleTheme} aria-label="Thème">
      {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
