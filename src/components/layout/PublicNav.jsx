import { Link } from 'react-router-dom';
import { Menu, ShieldCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import ThemeToggle from './ThemeToggle';

export default function PublicNav() {
  const { pubMenuOpen, setPubMenuOpen } = useApp();

  return (
    <nav className="pub-nav">
      <div className="container pub-nav-inner">
        <Link to="/" className="logo">
          <span className="logo-icon"><ShieldCheck size={18} /></span>
          RetourStop
        </Link>
        <div className={`pub-links${pubMenuOpen ? ' open' : ''}`}>
          <Link to="/" onClick={() => setPubMenuOpen(false)}>Accueil</Link>
          <a href="#pricing" onClick={() => setPubMenuOpen(false)}>Tarifs</a>
          <a href="#how" onClick={() => setPubMenuOpen(false)}>Comment ça marche</a>
        </div>
        <div className="nav-actions">
          <ThemeToggle />
          <Link to="/login" className="btn btn-outline btn-sm">Connexion</Link>
          <Link to="/register" className="btn btn-primary btn-sm">S&apos;inscrire</Link>
          <button type="button" className="hamburger" onClick={() => setPubMenuOpen((o) => !o)}>
            <Menu size={22} />
          </button>
        </div>
      </div>
    </nav>
  );
}
