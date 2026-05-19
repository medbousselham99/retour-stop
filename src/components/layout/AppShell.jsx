import { useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

export default function AppShell({ title, children }) {
  const { sidebarOpen, setSidebarOpen } = useApp();

  useEffect(() => {
    setSidebarOpen(false);
  }, [title, setSidebarOpen]);

  return (
    <div className="app-layout">
      <div
        className={`mobile-overlay${sidebarOpen ? ' show' : ''}`}
        onClick={() => setSidebarOpen(false)}
        onKeyDown={(e) => e.key === 'Escape' && setSidebarOpen(false)}
        role="button"
        tabIndex={0}
        aria-label="Fermer le menu"
      />
      <Sidebar />
      <div className="main-content">
        <Topbar title={title} />
        <div className="page-body page">{children}</div>
      </div>
    </div>
  );
}
