import { useState, useEffect } from 'react';
import { Building2, FileText, Users, DollarSign, Clock, CheckCircle, AlertTriangle } from 'lucide-react';
import AppShell from '../components/layout/AppShell';
import { api } from '../utils/api';
import { useApp } from '../context/AppContext';

export default function Company() {
  const { user } = useApp();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api('GET', '/api/company/stats')
      .then(setStats)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <AppShell title="Mon entreprise">
        <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>Chargement...</div>
      </AppShell>
    );
  }

  const s = stats;
  const k = s?.kpis;

  return (
    <AppShell title="Mon entreprise">
      <div className="page-header">
        <h2>Mon entreprise</h2>
        <p>Vue d&apos;ensemble de votre activité et statistiques.</p>
      </div>

      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
          <div style={{ width: 64, height: 64, borderRadius: 16, background: 'var(--navy)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Building2 size={32} color="#fff" />
          </div>
          <div style={{ flex: 1 }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>{s?.name || user?.name}</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '.875rem' }}>
              {s?.email} {s?.ice ? `· ICE: ${s.ice}` : ''}
            </p>
          </div>
          <span className="badge badge-fiable" style={{ fontSize: '.875rem', padding: '.35rem 1rem' }}>
            Plan {s?.plan || user?.plan || 'Starter'}
          </span>
        </div>
      </div>

      <div className="kpi-grid">
        <div className="card kpi-card">
          <div className="label">Signalements totaux</div>
          <div className="value">{k?.totalReports ?? 0}</div>
          <div className="sub">
            <FileText size={14} /> Tous vos signalements
          </div>
        </div>
        <div className="card kpi-card">
          <div className="label">Clients signalés</div>
          <div className="value">{k?.totalClients ?? 0}</div>
          <div className="sub">
            <Users size={14} /> Clients uniques
          </div>
        </div>
        <div className="card kpi-card">
          <div className="label">Valeur totale</div>
          <div className="value" style={{ color: 'var(--teal)' }}>{(k?.totalValue ?? 0).toLocaleString()} MAD</div>
          <div className="sub">
            <DollarSign size={14} /> Montant cumulé
          </div>
        </div>
        <div className="card kpi-card">
          <div className="label">En attente</div>
          <div className="value" style={{ color: 'var(--orange)' }}>{k?.pendingReports ?? 0}</div>
          <div className="sub">
            <Clock size={14} /> Signalements en cours
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginTop: '1.5rem' }}>
        <div className="card">
          <h3 style={{ fontWeight: 700, marginBottom: '1rem' }}>Statut des signalements</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
                <CheckCircle size={16} color="var(--teal)" /> Validés
              </span>
              <span style={{ fontWeight: 700, fontSize: '1.25rem' }}>{k?.validReports ?? 0}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
                <Clock size={16} color="var(--yellow)" /> En attente
              </span>
              <span style={{ fontWeight: 700, fontSize: '1.25rem' }}>{k?.pendingReports ?? 0}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
                <AlertTriangle size={16} color="var(--red)" /> Litiges
              </span>
              <span style={{ fontWeight: 700, fontSize: '1.25rem' }}>{k?.disputeReports ?? 0}</span>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 style={{ fontWeight: 700, marginBottom: '1rem' }}>Évolution mensuelle</h3>
          {(!s?.monthlyStats || s.monthlyStats.length === 0) && (
            <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '1rem' }}>
              Aucune donnée mensuelle
            </p>
          )}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '.75rem' }}>
            {s?.monthlyStats?.slice(0, 6).map((m) => (
              <div key={m.month} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '.5rem 0', borderBottom: '1px solid var(--border)' }}>
                <span style={{ fontSize: '.875rem', fontWeight: 500 }}>
                  {new Date(m.month + '-01').toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}
                </span>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontWeight: 700 }}>{m.reports}</span>
                  <span style={{ color: 'var(--text-muted)', fontSize: '.75rem', marginLeft: '.5rem' }}>
                    {m.value.toLocaleString()} MAD
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
