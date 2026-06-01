import { Link, useNavigate } from 'react-router-dom';
import { LogOut, Menu, Plus } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import ThemeToggle from './ThemeToggle';

function initials(name) {
  if (!name) return 'RS';
  return name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase();
}

export default function Topbar({ title }) {
  const { user, setSidebarOpen, logout } = useApp();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="topbar">
      <div className="topbar-left">
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
        <div className="topbar-user" title={user?.name || 'Société'}>
          <div className="avatar avatar-navy">{initials(user?.name)}</div>
          <span style={{ fontSize: '.875rem', fontWeight: 500, display: 'none' }} className="user-name">
            {user?.name}
          </span>
        </div>
        <ThemeToggle />
        <button type="button" className="btn btn-outline btn-sm" onClick={handleLogout} title="Déconnexion">
          <LogOut size={16} />
        </button>
        <Link to="/report" className="btn btn-danger btn-sm">
          <Plus size={16} /> Signaler
        </Link>
      </div>
    </header>
  );
}
