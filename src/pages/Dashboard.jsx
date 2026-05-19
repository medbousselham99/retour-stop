import { Link } from 'react-router-dom';
import { AlertTriangle, MapPin, Search } from 'lucide-react';
import AppShell from '../components/layout/AppShell';
import RetourChart from '../components/RetourChart';
import CityPills from '../components/CityPills';
import { ACTIVITY } from '../data/mockData';

export default function Dashboard() {
  return (
    <AppShell title="Tableau de bord">
      <div className="kpi-grid">
        <div className="card kpi-card">
          <div className="label">Retours signalés ce mois</div>
          <div className="value">127</div>
          <div className="sub">+12% vs mois dernier</div>
        </div>
        <div className="card kpi-card">
          <div className="label">Clients vérifiés</div>
          <div className="value">3 842</div>
          <div className="sub">+8% cette semaine</div>
        </div>
        <div className="card kpi-card">
          <div className="label">Alertes risque</div>
          <div className="value">89</div>
          <div className="sub">23 aujourd&apos;hui</div>
        </div>
        <div className="card kpi-card">
          <div className="label">Économies estimées</div>
          <div className="value" style={{ color: 'var(--teal)' }}>184K MAD</div>
          <div className="sub">Incidents évités</div>
        </div>
      </div>

      <div className="quick-actions">
        <Link to="/report" className="btn btn-danger">
          <AlertTriangle size={18} /> Signaler un client
        </Link>
        <Link to="/check" className="btn btn-teal">
          <Search size={18} /> Vérifier un client
        </Link>
      </div>

      <div className="grid-2">
        <div className="card chart-card">
          <h3 style={{ fontWeight: 700, marginBottom: '1rem' }}>Retours par semaine</h3>
          <RetourChart />
        </div>
        <div className="card">
          <h3 style={{ fontWeight: 700, marginBottom: '1rem' }}>Carte des risques — Maroc</h3>
          <div className="map-placeholder">
            <MapPin size={32} />
            Taux de retour par ville
            <CityPills />
          </div>
        </div>
      </div>

      <div className="card" style={{ marginTop: '1.5rem' }}>
        <h3 style={{ fontWeight: 700, marginBottom: '1rem' }}>Activité récente</h3>
        {ACTIVITY.map((a) => (
          <div key={a.text} className="activity-item">
            <div className={`activity-icon ${a.type}`}>
              {a.type === 'report' ? <AlertTriangle size={16} /> : <Search size={16} />}
            </div>
            <div>
              <div>{a.text}</div>
              <div style={{ color: 'var(--text-muted)', fontSize: '.75rem' }}>{a.time}</div>
            </div>
          </div>
        ))}
      </div>
    </AppShell>
  );
}
