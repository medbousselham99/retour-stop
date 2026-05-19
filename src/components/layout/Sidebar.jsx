import { NavLink } from 'react-router-dom';
import {
  AlertTriangle,
  Ban,
  FileText,
  LayoutDashboard,
  Search,
  Settings,
  ShieldCheck,
} from 'lucide-react';
import { COMPANIES } from '../../data/mockData';
import { useApp } from '../../context/AppContext';

const NAV_ITEMS = [
  { to: '/dashboard', label: 'Tableau de bord', icon: LayoutDashboard },
  { to: '/check', label: 'Vérifier un client', icon: Search },
  { to: '/report', label: 'Signaler un retour', icon: AlertTriangle },
  { to: '/my-reports', label: 'Mes signalements', icon: FileText },
  { to: '/blacklist', label: 'Liste noire', icon: Ban },
  { to: '/settings', label: 'Paramètres', icon: Settings },
];

export default function Sidebar() {
  const { user, sidebarOpen } = useApp();
  const company = user || COMPANIES[0];

  return (
    <aside className={`sidebar${sidebarOpen ? ' open' : ''}`} id="sidebar">
      <div className="sidebar-logo">
        <ShieldCheck size={20} /> RetourStop
      </div>
      <nav className="sidebar-nav">
        {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            <Icon size={18} /> {label}
          </NavLink>
        ))}
      </nav>
      <div className="sidebar-footer">
        {company.name}
        <br />
        Plan {company.plan}
      </div>
    </aside>
  );
}
