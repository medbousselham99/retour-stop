import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, MapPin, Search } from 'lucide-react';
import AppShell from '../components/layout/AppShell';
import RetourChart from '../components/RetourChart';
import CityPills from '../components/CityPills';
import { api } from '../utils/api';

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api('GET', '/api/dashboard')
      .then(setData)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <AppShell title="Tableau de bord">
        <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>Chargement...</div>
      </AppShell>
    );
  }

  const k = data?.kpis;
  const chart = data?.chart;
  const cityRates = data?.cityRates;
  const activity = data?.activity || [];

  return (
    <AppShell title="Tableau de bord">
      <div className="kpi-grid">
        <div className="card kpi-card">
          <div className="label">Retours signalés ce mois</div>
          <div className="value">{k?.monthlyReturns ?? 0}</div>
          <div className="sub">+12% vs mois dernier</div>
        </div>
        <div className="card kpi-card">
          <div className="label">Clients vérifiés</div>
          <div className="value">{(k?.verifiedClients ?? 0).toLocaleString()}</div>
          <div className="sub">+8% cette semaine</div>
        </div>
        <div className="card kpi-card">
          <div className="label">Alertes risque</div>
          <div className="value">{k?.riskAlerts ?? 0}</div>
          <div className="sub">23 aujourd'hui</div>
        </div>
        <div className="card kpi-card">
          <div className="label">Économies estimées</div>
          <div className="value" style={{ color: 'var(--teal)' }}>{(k?.savings ?? 0).toLocaleString()} MAD</div>
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
          <RetourChart labels={chart?.labels} data={chart?.values} />
        </div>
        <div className="card">
          <h3 style={{ fontWeight: 700, marginBottom: '1rem' }}>Carte des risques — Maroc</h3>
          <div className="map-placeholder">
            <MapPin size={32} />
            Taux de retour par ville
            <CityPills rates={cityRates} />
          </div>
        </div>
      </div>

      <div className="card" style={{ marginTop: '1.5rem' }}>
        <h3 style={{ fontWeight: 700, marginBottom: '1rem' }}>Activité récente</h3>
        {activity.length === 0 && (
          <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '1rem' }}>Aucune activité récente</p>
        )}
        {activity.map((a) => (
          <div key={`${a.type}-${a.time}`} className="activity-item">
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
