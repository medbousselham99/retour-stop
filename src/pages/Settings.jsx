import { useState, useEffect } from 'react';
import { Eye, EyeOff, RefreshCw } from 'lucide-react';
import AppShell from '../components/layout/AppShell';
import { useApp } from '../context/AppContext';
import { api } from '../utils/api';

function Toggle({ defaultOn = false }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <button
      type="button"
      className={`toggle${on ? ' on' : ''}`}
      onClick={() => setOn((v) => !v)}
      aria-pressed={on}
    />
  );
}

export default function Settings() {
  const { user, apiVisible, setApiVisible, showModal } = useApp();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    api('GET', '/api/settings/profile')
      .then(setProfile)
      .catch(() => {});
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    try {
      await api('PUT', '/api/settings/profile', {
        name: fd.get('name'),
        email: fd.get('email'),
        ice: fd.get('ice'),
        phone: fd.get('phone'),
      });
      showModal('Info', 'Profil mis à jour');
    } catch (err) {
      showModal('Erreur', err.message);
    }
  };

  const u = profile || user || { name: '', email: '', ice: '', plan: 'Starter' };

  return (
    <AppShell title="Paramètres">
      <section className="settings-section card">
        <h3>Profil société</h3>
        <form onSubmit={handleSubmit}>
          <section className="form-row">
            <p className="form-group">
              <label htmlFor="s-name">Nom</label>
              <input id="s-name" name="name" defaultValue={u.name} />
            </p>
            <p className="form-group">
              <label htmlFor="s-ice">ICE</label>
              <input id="s-ice" name="ice" defaultValue={u.ice} />
            </p>
          </section>
          <section className="form-row">
            <p className="form-group">
              <label htmlFor="s-email">Email</label>
              <input id="s-email" name="email" type="email" defaultValue={u.email} />
            </p>
            <p className="form-group">
              <label htmlFor="s-phone">Téléphone</label>
              <input id="s-phone" name="phone" defaultValue={u.phone || ''} />
            </p>
          </section>
          <p className="form-group">
            <label htmlFor="s-logo">Logo</label>
            <input id="s-logo" type="file" accept="image/*" />
          </p>
          <button type="submit" className="btn btn-primary btn-sm">Enregistrer</button>
        </form>
      </section>

      <section className="settings-section card">
        <h3>Clé API</h3>
        <p style={{ fontSize: '.875rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
          Intégrez RetourStop à votre TMS.
        </p>
        <p className="api-key-box">
          <input type={apiVisible ? 'text' : 'password'} readOnly value="rs_live_sk_maroc_8f3k2j9x7p1q" />
          <button type="button" className="btn btn-outline btn-sm" onClick={() => setApiVisible((v) => !v)}>
            {apiVisible ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
          <button type="button" className="btn btn-outline btn-sm" onClick={() => showModal('Info', 'Clé régénérée')}>
            <RefreshCw size={16} /> Régénérer
          </button>
        </p>
      </section>

      <section className="settings-section card">
        <h3>Notifications</h3>
        <p className="toggle-row"><span>Alertes email</span><Toggle defaultOn /></p>
        <p className="toggle-row"><span>Alertes SMS</span><Toggle /></p>
        <p className="toggle-row"><span>Rapport hebdomadaire</span><Toggle defaultOn /></p>
      </section>

      <section className="settings-section card">
        <h3>Abonnement</h3>
        <p className="plan-banner">
          <span>
            <strong>Plan {u.plan}</strong>
            <br />
            <small style={{ fontSize: '.875rem', color: 'var(--text-muted)' }}>
              {u.plan === 'Pro' ? '499 MAD/mois' : 'Détails du forfait'}
            </small>
          </span>
          <a href="/#pricing" className="btn btn-primary btn-sm">Mettre à niveau</a>
        </p>
      </section>
    </AppShell>
  );
}
