import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, BarChart3, MapPin, Search, TrendingDown, TrendingUp } from 'lucide-react';
import AppShell from '../components/layout/AppShell';
import RetourChart from '../components/RetourChart';
import CityPills from '../components/CityPills';
import { api } from '../utils/api';

function formatPeriod(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  return `${y}-${m}`;
}

function periodLabel(period) {
  if (!period) return 'Ce mois';
  const [y, m] = period.split('-');
  const d = new Date(parseInt(y), parseInt(m) - 1);
  return d.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });
}

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState(() => formatPeriod(new Date()));

  const fetchData = useCallback(async (p) => {
    setLoading(true);
    try {
      const query = p ? `?period=${p}` : '';
      const result = await api('GET', `/api/dashboard${query}`);
      setData(result);
    } catch {}
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchData(period);
  }, [period, fetchData]);

  const changePeriod = (delta) => {
    const [y, m] = period.split('-').map(Number);
    const d = new Date(y, m - 1 + delta);
    setPeriod(formatPeriod(d));
  };

  if (loading && !data) {
    return (
      <AppShell title="Tableau de bord">
        <div className="page-header">
          <div className="skeleton skeleton-title" />
          <div className="skeleton skeleton-text" style={{ width: '40%' }} />
        </div>
        <div className="kpi-grid">
          {[1,2,3,4].map((i) => <div key={i} className="card kpi-card animate-in-fade"><div className="skeleton skeleton-card" /></div>)}
        </div>
        <div className="grid-2" style={{ marginTop: '1.5rem' }}>
          <div className="card"><div className="skeleton skeleton-card" style={{ height: 200 }} /></div>
          <div className="card"><div className="skeleton skeleton-card" style={{ height: 200 }} /></div>
        </div>
      </AppShell>
    );
  }

  const k = data?.kpis;
  const chart = data?.chart;
  const cityRates = data?.cityRates;
  const activity = data?.activity || [];
  const comp = k?.comparison;

  const TrendIcon = ({ value }) =>
    value >= 0 ? <TrendingUp size={14} color="var(--red)" /> : <TrendingDown size={14} color="var(--teal)" />;

  return (
    <AppShell title="Tableau de bord">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
        <div className="page-header" style={{ margin: 0 }}>
          <h2>Tableau de bord</h2>
          <p>Vue d&apos;ensemble de votre activité.</p>
        </div>
        <div style={{ display: 'flex', gap: '.5rem', alignItems: 'center' }}>
          <button type="button" className="btn btn-outline btn-sm" onClick={() => changePeriod(-1)}>← Mois préc.</button>
          <span style={{ fontWeight: 600, fontSize: '.875rem', minWidth: 120, textAlign: 'center' }}>
            {periodLabel(period)}
          </span>
          <button type="button" className="btn btn-outline btn-sm" onClick={() => changePeriod(1)}>Mois suiv. →</button>
          <button type="button" className="btn btn-outline btn-sm" onClick={() => setPeriod(formatPeriod(new Date()))}>
            <BarChart3 size={14} /> Ce mois
          </button>
        </div>
      </div>

      <div className="kpi-grid">
        <div className="card kpi-card animate-in stagger-1">
          <div className="label">Retours signalés</div>
          <div className="value">{k?.monthlyReturns ?? 0}</div>
          <div className="sub" style={{ display: 'flex', alignItems: 'center', gap: '.25rem' }}>
            <TrendIcon value={comp?.returnsChange} />
            {comp ? `${comp.returnsChange > 0 ? '+' : ''}${comp.returnsChange}% vs mois préc.` : '+12% vs mois dernier'}
          </div>
        </div>
        <div className="card kpi-card animate-in stagger-2">
          <div className="label">Clients vérifiés</div>
          <div className="value">{(k?.verifiedClients ?? 0).toLocaleString()}</div>
          <div className="sub" style={{ display: 'flex', alignItems: 'center', gap: '.25rem' }}>
            <TrendIcon value={comp?.verifiedChange} />
            {comp ? `${comp.verifiedChange > 0 ? '+' : ''}${comp.verifiedChange}% cette semaine` : '+8% cette semaine'}
          </div>
        </div>
        <div className="card kpi-card animate-in stagger-3">
          <div className="label">Alertes risque</div>
          <div className="value">{k?.riskAlerts ?? 0}</div>
          <div className="sub" style={{ display: 'flex', alignItems: 'center', gap: '.25rem' }}>
            <TrendIcon value={comp?.alertsChange} />
            {comp ? `${comp.alertsChange > 0 ? '+' : ''}${comp.alertsChange}% vs mois préc.` : '23 aujourd\'hui'}
          </div>
        </div>
        <div className="card kpi-card animate-in stagger-4">
          <div className="label">Économies estimées</div>
          <div className="value" style={{ color: 'var(--teal)' }}>{(k?.savings ?? 0).toLocaleString()} MAD</div>
          <div className="sub" style={{ display: 'flex', alignItems: 'center', gap: '.25rem' }}>
            <TrendIcon value={comp?.savingsChange} />
            {comp ? `${comp.savingsChange >= 0 ? '+' : ''}${comp.savingsChange}% vs mois préc.` : 'Incidents évités'}
          </div>
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

      <div className="grid-2 animate-in stagger-5" style={{ opacity: 0 }}>
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

      <div className="card animate-in stagger-6" style={{ marginTop: '1.5rem', opacity: 0 }}>
        <h3 style={{ fontWeight: 700, marginBottom: '1rem' }}>Activité récente</h3>
        {activity.length === 0 && (
          <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '1rem' }}>Aucune activité récente</p>
        )}
        {activity.map((a, i) => (
          <div key={`${a.type}-${a.time}-${i}`} className="activity-item">
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
