import { Link } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';

export default function Footer() {
  return (
    <footer>
      <div className="container footer-grid">
        <div>
          <div className="logo" style={{ color: '#fff', marginBottom: '1rem' }}>
            <ShieldCheck size={20} /> RetourStop
          </div>
          <p style={{ fontSize: '.875rem' }}>
            Le bouclier de la livraison marocaine. Données partagées, décisions éclairées.
          </p>
        </div>
        <div>
          <h4>Produit</h4>
          <a href="#how">Fonctionnalités</a>
          <a href="#pricing">Tarifs</a>
          <Link to="/login">Connexion</Link>
        </div>
        <div>
          <h4>Légal</h4>
          <a href="#">Confidentialité</a>
          <a href="#">CGU</a>
          <a href="#">Contact</a>
        </div>
      </div>
      <div className="container footer-bottom">
        © 2026 RetourStop. Tous droits réservés.
      </div>
    </footer>
  );
}
