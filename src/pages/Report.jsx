import { useState } from 'react';
import { Send } from 'lucide-react';
import AppShell from '../components/layout/AppShell';
import WilayaSelect from '../components/WilayaSelect';
import { useApp } from '../context/AppContext';
import { api } from '../utils/api';

export default function Report() {
  const { showModal } = useApp();
  const [form, setForm] = useState({
    phone: '',
    name: '',
    city: '',
    date: '',
    type: '',
    value: '',
    notes: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api('POST', '/api/reports', {
        phone: form.phone,
        name: form.name,
        city: form.city,
        date: form.date,
        type: form.type,
        value: form.value ? Number(form.value) : null,
        notes: form.notes,
      });
      showModal('Signalement envoyé', 'Votre signalement sera validé sous 24h.');
      setForm({ phone: '', name: '', city: '', date: '', type: '', value: '', notes: '' });
    } catch (err) {
      showModal('Erreur', err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppShell title="Signaler un retour">
      <header className="page-header">
        <h2>Signaler un retour</h2>
        <p>Documentez un incident pour protéger les autres sociétés.</p>
      </header>

      <article className="card" style={{ maxWidth: 720 }}>
        <form onSubmit={handleSubmit}>
          <section className="form-row">
            <p className="form-group">
              <label htmlFor="phone">Téléphone client *</label>
              <input id="phone" name="phone" required pattern="0[67][0-9]{8}" value={form.phone} onChange={handleChange} />
            </p>
            <p className="form-group">
              <label htmlFor="name">Nom</label>
              <input id="name" name="name" value={form.name} onChange={handleChange} />
            </p>
          </section>
          <section className="form-row">
            <p className="form-group">
              <label htmlFor="city">Wilaya / Ville *</label>
              <select id="city" name="city" required value={form.city} onChange={handleChange}>
                <WilayaSelect />
              </select>
            </p>
            <p className="form-group">
              <label htmlFor="date">Date *</label>
              <input id="date" type="date" name="date" required value={form.date} onChange={handleChange} />
            </p>
          </section>
          <section className="form-row">
            <p className="form-group">
              <label htmlFor="type">Type d'incident *</label>
              <select id="type" name="type" required value={form.type} onChange={handleChange}>
                <option value="">Sélectionner...</option>
                <option>Refus de livraison</option>
                <option>Colis ouvert et partiellement retourné</option>
                <option>Adresse incorrecte</option>
                <option>Injoignable par téléphone</option>
                <option>Autre</option>
              </select>
            </p>
            <p className="form-group">
              <label htmlFor="value">Valeur (MAD)</label>
              <input id="value" type="number" name="value" min={0} value={form.value} onChange={handleChange} />
            </p>
          </section>
          <p className="form-group">
            <label htmlFor="notes">Notes</label>
            <textarea id="notes" name="notes" rows={3} value={form.notes} onChange={handleChange} />
          </p>
          <p className="form-group">
            <label htmlFor="photo">Photo (optionnelle)</label>
            <input id="photo" type="file" accept="image/*" />
            <small style={{ fontSize: '.75rem', color: 'var(--text-muted)', display: 'block' }}>
              Preuve de tentative de livraison
            </small>
          </p>
          <button type="submit" className="btn btn-danger" disabled={loading}>
            <Send size={18} /> {loading ? 'Envoi...' : 'Soumettre'}
          </button>
        </form>
      </article>
    </AppShell>
  );
}
