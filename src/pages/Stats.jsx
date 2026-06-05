import { useState, useEffect } from 'react';
import { BarChart, MapPin, TrendingUp, DollarSign } from 'lucide-react';
import AppShell from '../components/layout/AppShell';
import { api } from '../utils/api';
import { badgeClass } from '../utils/helpers';
import { WILAYAS } from '../data/mockData';

export default function Stats() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api('GET', '/api/stats/wilaya')
      .then(setData)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <AppShell title="Statistiques par wilaya">
        <div className="page-header">
          <div className="skeleton skeleton-title" />
          <div className="skeleton skeleton-text" style={{ width: '50%' }} />
        </div>
        <div className="kpi-grid">
          {[1,2,3,4].map((i) => <div key={i} className="card kpi-card"><div className="skeleton skeleton-card" /></div>)}
        </div>
        <div className="table-wrap" style={{ marginTop: '1.5rem' }}>
          <div className="skeleton skeleton-card" style={{ height: 200 }} />
        </div>
      </AppShell>
    );
  }

  const totals = data?.totals;
  const wilayas = data?.wilayas || [];

  return (
    <AppShell title="Statistiques par wilaya">
      <div className="page-header">
        <h2>Statistiques par wilaya</h2>
        <p>Répartition des signalements et niveaux de risque par région.</p>
      </div>

      <div className="kpi-grid">
        <div className="card kpi-card animate-in stagger-1">
          <div className="label">Signalements totaux</div>
          <div className="value">{totals?.totalReports ?? 0}</div>
          <div className="sub">Toutes wilayas confondues</div>
        </div>
        <div className="card kpi-card animate-in stagger-2">
          <div className="label">Clients concernés</div>
          <div className="value">{totals?.totalClients ?? 0}</div>
          <div className="sub">Clients uniques</div>
        </div>
        <div className="card kpi-card animate-in stagger-3">
          <div className="label">Montant total engagé</div>
          <div className="value" style={{ color: 'var(--teal)' }}>{(totals?.totalMontant ?? 0).toLocaleString()} MAD</div>
          <div className="sub">Valeur cumulée</div>
        </div>
        <div className="card kpi-card animate-in stagger-4">
          <div className="label">Clients à risque</div>
          <div className="value" style={{ color: 'var(--red)' }}>{totals?.totalBlacklistes ?? 0}</div>
          <div className="sub">Risqué + Blacklisté</div>
        </div>
      </div>

      <div className="table-wrap animate-in" style={{ marginTop: '1.5rem', opacity: 0 }}>
        <table>
          <thead>
            <tr>
              <th>Wilaya</th>
              <th>Signalements</th>
              <th>Validé</th>
              <th>Attention</th>
              <th>Risqué</th>
              <th>Blacklisté</th>
              <th>Montant total</th>
              <th>Taux risque</th>
            </tr>
          </thead>
          <tbody>
            {wilayas.map((w, i) => (
              <tr key={w.wilaya} className="animate-in" style={{ animationDelay: `${i * 40}ms` }}>
                <td><strong>{w.wilaya}</strong></td>
                <td>{w.totalReports}</td>
                <td><span className="badge badge-fiable">{w.fiable}</span></td>
                <td><span className="badge badge-attention">{w.attention}</span></td>
                <td><span className="badge badge-risque">{w.risque}</span></td>
                <td><span className="badge badge-blacklist">{w.blackliste}</span></td>
                <td>{w.montantTotal.toLocaleString()} MAD</td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
                    <div className="risk-bar" style={{ flex: 1, margin: 0 }}>
                      <div
                        className="risk-bar-fill"
                        style={{
                          width: `${Math.min(w.tauxRisque, 100)}%`,
                          background: w.tauxRisque >= 50 ? 'var(--red)' : w.tauxRisque >= 30 ? 'var(--orange)' : 'var(--teal)',
                        }}
                      />
                    </div>
                    <span style={{ fontSize: '.8125rem', fontWeight: 600 }}>{w.tauxRisque}%</span>
                  </div>
                </td>
              </tr>
            ))}
            {wilayas.length === 0 && (
              <tr>
                <td colSpan={8} style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
                  Aucune donnée disponible
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </AppShell>
  );
}
