import { Link } from 'react-router-dom';
import { Menu, Plus } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import ThemeToggle from './ThemeToggle';

export default function Topbar({ title }) {
  const { setSidebarOpen } = useApp();

  return (
    <header className="topbar">
      <div style={{ display: 'flex', alignItems: 'center', gap: '.75rem' }}>
        <button
          type="button"
          className="menu-btn"
          onClick={() => setSidebarOpen((o) => !o)}
        >
          <Menu size={20} />
        </button>
        <span className="topbar-title">{title}</span>
      </div>
      <div className="topbar-right">
        <ThemeToggle />
        <Link to="/report" className="btn btn-danger btn-sm">
          <Plus size={16} /> Signaler
        </Link>
      </div>
    </header>
  );
}
