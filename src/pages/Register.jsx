import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PublicNav from '../components/layout/PublicNav';
import { useApp } from '../context/AppContext';

export default function Register() {
  const { register } = useApp();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    company: '',
    ice: '',
    phone: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    register(form);
    navigate('/dashboard');
  };

  return (
    <>
      <PublicNav />
      <div className="auth-wrap page">
        <div className="card auth-card">
          <h2>Inscription entreprise</h2>
          <p className="sub">Créez votre compte société</p>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="company">Nom de la société</label>
              <input id="company" name="company" required placeholder="Ex: Amana Express" value={form.company} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="ice">Numéro ICE</label>
              <input id="ice" name="ice" required placeholder="001234567890123" pattern="[0-9]{15}" value={form.ice} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Téléphone</label>
              <input id="phone" name="phone" required placeholder="06 XX XX XX XX" value={form.phone} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email professionnel</label>
              <input id="email" name="email" type="email" required value={form.email} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="password">Mot de passe</label>
              <input id="password" name="password" type="password" required minLength={6} value={form.password} onChange={handleChange} />
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '.5rem' }}>
              Créer mon compte
            </button>
          </form>
          <p style={{ textAlign: 'center', marginTop: '1rem', fontSize: '.875rem', color: 'var(--text-muted)' }}>
            Déjà inscrit ?{' '}
            <Link to="/login" style={{ color: 'var(--teal)', fontWeight: 600 }}>Se connecter</Link>
          </p>
        </div>
      </div>
    </>
  );
}
