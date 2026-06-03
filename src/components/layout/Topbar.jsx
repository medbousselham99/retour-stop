import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bell, CheckCheck, LogOut, Menu, Plus } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import ThemeToggle from './ThemeToggle';

function initials(name) {
  if (!name) return 'RS';
  return name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase();
}

export default function Topbar({ title }) {
  const { user, setSidebarOpen, logout, notifications, unreadCount, fetchNotifications, markNotificationRead, markAllNotificationsRead } = useApp();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
  }, [fetchNotifications]);

  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

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
        <div className="notification-bell" ref={ref}>
          <button type="button" className="btn btn-outline btn-sm" onClick={() => setOpen((o) => !o)} title="Notifications">
            <Bell size={16} />
            {unreadCount > 0 && <span className="notification-badge">{unreadCount > 9 ? '9+' : unreadCount}</span>}
          </button>
          {open && (
            <div className="notification-dropdown">
              <div className="notification-header">
                <span>Notifications</span>
                {unreadCount > 0 && (
                  <button type="button" className="btn-link" onClick={markAllNotificationsRead}>
                    <CheckCheck size={14} /> Tout marquer lu
                  </button>
                )}
              </div>
              {notifications.length === 0 && (
                <div className="notification-empty">Aucune notification</div>
              )}
              {notifications.slice(0, 10).map((n) => (
                <div
                  key={n.id}
                  className={`notification-item${n.read ? '' : ' unread'}`}
                  onClick={() => !n.read && markNotificationRead(n.id)}
                >
                  <div className="notification-text">{n.message}</div>
                  <div className="notification-time">{n.timeAgo}</div>
                </div>
              ))}
            </div>
          )}
        </div>
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
