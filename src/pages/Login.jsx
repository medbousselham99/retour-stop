import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PublicNav from '../components/layout/PublicNav';
import { useApp } from '../context/AppContext';

export default function Login() {
  const { login } = useApp();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PublicNav />
      <div className="auth-wrap page">
        <div className="card auth-card">
          <h2>Connexion</h2>
          <p className="sub">Accédez à votre tableau de bord</p>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email professionnel</label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Mot de passe</label>
              <input
                id="password"
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error && (
              <p style={{ color: 'var(--red)', fontSize: '.875rem', marginBottom: '.75rem' }}>{error}</p>
            )}
            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '.5rem' }} disabled={loading}>
              {loading ? 'Connexion...' : 'Se connecter'}
            </button>
          </form>
          <p style={{ textAlign: 'center', marginTop: '1rem', fontSize: '.875rem', color: 'var(--text-muted)' }}>
            Pas encore de compte ?{' '}
            <Link to="/register" style={{ color: 'var(--teal)', fontWeight: 600 }}>S'inscrire</Link>
          </p>
        </div>
      </div>
    </>
  );
}
