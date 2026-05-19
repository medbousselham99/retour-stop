import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye } from 'lucide-react';
import AppShell from '../components/layout/AppShell';
import WilayaSelect from '../components/WilayaSelect';
import { BLACKLIST } from '../data/mockData';
import { useApp } from '../context/AppContext';
import { badgeClass } from '../utils/helpers';

const PER_PAGE = 5;

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

  let items = BLACKLIST.filter((b) => {
    if (localFilter.search && !b.phone.includes(localFilter.search) && !b.name.toLowerCase().includes(localFilter.search.toLowerCase())) return false;
    if (localFilter.level && b.level !== localFilter.level) return false;
    if (localFilter.wilaya && b.city !== localFilter.wilaya) return false;
    return true;
  });

  const totalPages = Math.max(1, Math.ceil(items.length / PER_PAGE));
  const page = Math.min(blacklistPage, totalPages);
  const slice = items.slice((page - 1) * PER_PAGE, page * PER_PAGE);

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
        <p>{BLACKLIST.length} profils signalés sur la plateforme.</p>
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

      <section className="table-wrap">
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
            {slice.map((b) => (
              <tr key={b.id}>
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
        <button type="button" disabled={page <= 1} onClick={() => setBlacklistPage(page - 1)}>←</button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((i) => (
          <button
            key={i}
            type="button"
            className={i === page ? 'active' : ''}
            onClick={() => setBlacklistPage(i)}
          >
            {i}
          </button>
        ))}
        <button type="button" disabled={page >= totalPages} onClick={() => setBlacklistPage(page + 1)}>→</button>
      </nav>
    </AppShell>
  );
}
