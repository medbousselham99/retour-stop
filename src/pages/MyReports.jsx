import { useState, useEffect } from 'react';
import { Download } from 'lucide-react';
import AppShell from '../components/layout/AppShell';
import WilayaSelect from '../components/WilayaSelect';
import { useApp } from '../context/AppContext';
import { statusBadgeClass } from '../utils/helpers';
import { api } from '../utils/api';

export default function MyReports() {
  const { reportsFilter, setReportsFilter, exportCSV } = useApp();
  const [localFilter, setLocalFilter] = useState(reportsFilter);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api('GET', '/api/reports')
      .then(setReports)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  let rows = [...reports];
  if (localFilter.city) rows = rows.filter((r) => r.city === localFilter.city);
  if (localFilter.type) rows = rows.filter((r) => r.type.includes(localFilter.type));

  const applyFilter = () => setReportsFilter(localFilter);

  return (
    <AppShell title="Mes signalements">
      <header className="page-header" style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2>Mes signalements</h2>
          <p>{loading ? 'Chargement...' : `${rows.length} signalements`}</p>
        </div>
        <button type="button" className="btn btn-outline btn-sm" onClick={exportCSV}>
          <Download size={16} /> Exporter CSV
        </button>
      </header>

      <section className="filters card" style={{ padding: '1rem', marginBottom: '1rem' }}>
        <p className="form-group">
          <label htmlFor="rf-from">Du</label>
          <input id="rf-from" type="date" value={localFilter.from} onChange={(e) => setLocalFilter((f) => ({ ...f, from: e.target.value }))} />
        </p>
        <p className="form-group">
          <label htmlFor="rf-to">Au</label>
          <input id="rf-to" type="date" value={localFilter.to} onChange={(e) => setLocalFilter((f) => ({ ...f, to: e.target.value }))} />
        </p>
        <p className="form-group">
          <label htmlFor="rf-city">Ville</label>
          <select id="rf-city" value={localFilter.city} onChange={(e) => setLocalFilter((f) => ({ ...f, city: e.target.value }))}>
            <option value="">Toutes</option>
            <WilayaSelect includeEmpty={false} />
          </select>
        </p>
        <p className="form-group">
          <label htmlFor="rf-type">Type</label>
          <select id="rf-type" value={localFilter.type} onChange={(e) => setLocalFilter((f) => ({ ...f, type: e.target.value }))}>
            <option value="">Tous</option>
            <option value="Refus">Refus</option>
            <option value="Colis">Colis</option>
          </select>
        </p>
        <button type="button" className="btn btn-primary btn-sm" onClick={applyFilter}>Filtrer</button>
      </section>

      <section className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Téléphone</th>
              <th>Ville</th>
              <th>Type</th>
              <th>Valeur</th>
              <th>Statut</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 && !loading && (
              <tr><td colSpan={6} style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>Aucun signalement</td></tr>
            )}
            {rows.map((r) => (
              <tr key={r.id}>
                <td>{r.date}</td>
                <td>{r.phone}</td>
                <td>{r.city}</td>
                <td>{r.type}</td>
                <td>{r.value} MAD</td>
                <td><span className={statusBadgeClass(r.status)}>{r.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </AppShell>
  );
}
