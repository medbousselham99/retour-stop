import { Moon, Sun } from 'lucide-react';
import { useCallback, useRef, useState } from 'react';
import { useApp } from '../../context/AppContext';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useApp();
  const [spinning, setSpinning] = useState(false);
  const timeout = useRef(null);

  const handleClick = useCallback(() => {
    setSpinning(true);
    toggleTheme();
    clearTimeout(timeout.current);
    timeout.current = setTimeout(() => setSpinning(false), 300);
  }, [toggleTheme]);

  return (
    <button type="button" className={`theme-toggle${spinning ? ' spinning' : ''}`} onClick={handleClick} aria-label="Thème">
      {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
