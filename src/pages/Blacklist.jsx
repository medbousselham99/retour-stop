import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye } from 'lucide-react';
import AppShell from '../components/layout/AppShell';
import WilayaSelect from '../components/WilayaSelect';
import { useApp } from '../context/AppContext';
import { badgeClass } from '../utils/helpers';
import { api } from '../utils/api';

export default function Blacklist() {
  const navigate = useNavigate();
  const {
    blacklistPage,
    blacklistFilter,
    setBlacklistPage,
    setBlacklistFilter,
    viewProfile,
  } = useApp();

  const [localFilter, setLocalFilter] = useState(blacklistFilter);
  const [pageData, setPageData] = useState({ content: [], totalPages: 0, totalElements: 0, number: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const params = { page: blacklistPage - 1, size: 5 };
    if (localFilter.search) params.search = localFilter.search;
    if (localFilter.level) params.level = localFilter.level;
    if (localFilter.wilaya) params.wilaya = localFilter.wilaya;
    api('GET', `/api/blacklist?${new URLSearchParams(params)}`)
      .then((data) => {
        if (data.content) {
          setPageData(data);
        } else {
          setPageData({ content: data, totalPages: 1, totalElements: data.length, number: 0 });
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [blacklistPage, blacklistFilter]);

  const items = pageData.content || [];
  const totalPages = pageData.totalPages || 1;
  const currentPage = pageData.number + 1;

  const applyFilter = () => {
    setBlacklistFilter(localFilter);
    setBlacklistPage(1);
  };

  const handleViewProfile = () => {
    viewProfile();
    navigate('/check');
  };

  return (
    <AppShell title="Liste noire">
      <header className="page-header">
        <h2>Liste noire partagée</h2>
        <p>{loading ? 'Chargement...' : `${pageData.totalElements} profils signalés sur la plateforme.`}</p>
      </header>

      <section className="filters card" style={{ padding: '1rem', marginBottom: '1rem' }}>
        <p className="form-group" style={{ flex: 1, minWidth: 200 }}>
          <label htmlFor="bl-search">Rechercher</label>
          <input
            id="bl-search"
            value={localFilter.search}
            onChange={(e) => setLocalFilter((f) => ({ ...f, search: e.target.value }))}
            placeholder="Téléphone ou nom"
          />
        </p>
        <p className="form-group">
          <label htmlFor="bl-level">Niveau</label>
          <select id="bl-level" value={localFilter.level} onChange={(e) => setLocalFilter((f) => ({ ...f, level: e.target.value }))}>
            <option value="">Tous</option>
            <option value="BLACKLISTÉ">BLACKLISTÉ</option>
            <option value="RISQUÉ">RISQUÉ</option>
            <option value="ATTENTION">ATTENTION</option>
          </select>
        </p>
        <p className="form-group">
          <label htmlFor="bl-wilaya">Wilaya</label>
          <select id="bl-wilaya" value={localFilter.wilaya} onChange={(e) => setLocalFilter((f) => ({ ...f, wilaya: e.target.value }))}>
            <option value="">Toutes</option>
            <WilayaSelect includeEmpty={false} />
          </select>
        </p>
        <button type="button" className="btn btn-primary btn-sm" onClick={applyFilter}>Filtrer</button>
      </section>

      <section className="table-wrap animate-in" style={{ opacity: 0 }}>
        <table>
          <thead>
            <tr>
              <th>Nom</th>
              <th>Téléphone</th>
              <th>Ville</th>
              <th>Score</th>
              <th>Signalements</th>
              <th>Dernier</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {items.length === 0 && !loading && (
              <tr><td colSpan={7} style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>Aucun résultat</td></tr>
            )}
            {items.map((b, i) => (
              <tr key={b.id} className="animate-in" style={{ animationDelay: `${i * 30}ms` }}>
                <td>{b.name}</td>
                <td>{b.phone}</td>
                <td>{b.city}</td>
                <td><span className={badgeClass(b.level)}>{b.score} — {b.level}</span></td>
                <td>{b.reports}</td>
                <td>{b.last}</td>
                <td>
                  <button type="button" className="btn btn-outline btn-sm" onClick={handleViewProfile}>
                    <Eye size={14} /> Profil
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <nav className="pagination" aria-label="Pagination">
        <button type="button" disabled={currentPage <= 1} onClick={() => setBlacklistPage(currentPage - 1)}>←</button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((i) => (
          <button
            key={i}
            type="button"
            className={i === currentPage ? 'active' : ''}
            onClick={() => setBlacklistPage(i)}
          >
            {i}
          </button>
        ))}
        <button type="button" disabled={currentPage >= totalPages} onClick={() => setBlacklistPage(currentPage + 1)}>→</button>
      </nav>
    </AppShell>
  );
}
