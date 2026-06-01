import { Link } from 'react-router-dom';
import { Check, ShieldCheck, Search, AlertTriangle, BarChart3, Ban } from 'lucide-react';
import PublicNav from '../components/layout/PublicNav';
import Footer from '../components/layout/Footer';

const STEPS = [
  { icon: AlertTriangle, title: 'Signaler', text: 'Documentez chaque incident de retour avec preuves et détails.' },
  { icon: ShieldCheck, title: 'Partager', text: 'Données partagées de manière sécurisée entre sociétés partenaires.' },
  { icon: Search, title: 'Protéger', text: 'Vérifiez tout numéro avant expédition. Score de risque et alertes en temps réel.' },
];

const PRICING = [
  { name: 'Starter', price: '199', period: 'MAD/mois', features: ['500 vérifications/mois', '50 signalements/mois'], cta: 'Commencer', featured: false },
  { name: 'Pro', price: '499', period: 'MAD/mois', features: ['Vérifications illimitées', 'API & alertes SMS'], cta: 'Demander une démo', featured: true },
  { name: 'Enterprise', price: 'Sur mesure', period: '', features: ['Multi-agences', 'SLA dédié'], cta: 'Nous contacter', featured: false },
];

const TESTIMONIALS = [
  { quote: 'RetourStop nous a permis de réduire nos retours de 18% en trois mois.', author: 'Karim El Amrani', role: 'Directeur Ops — Amana Express' },
  { quote: 'La vérification avant dispatch a changé notre façon de travailler.', author: 'Sara Benjelloun', role: 'CEO — Livo Logistics' },
  { quote: 'API fluide, données fiables. Intégré à notre TMS en une semaine.', author: 'Yassine Tazi', role: 'CTO — Swiftylogix' },
];

export default function Landing() {
  return (
    <>
      <PublicNav />
      <main className="page">
        <section className="hero container">
          <p style={{ color: 'var(--teal)', fontWeight: 600, fontSize: '.875rem', marginBottom: '.75rem', letterSpacing: '.05em', textTransform: 'uppercase' }}>
            Le bouclier de la livraison marocaine
          </p>
          <h1>Protégez vos livraisons.<br />Stoppez les retours.</h1>
          <p className="ar">احمِ تسليماتك. أوقف المرتجعات.</p>
          <p>
            Plateforme B2B partagée pour les sociétés de livraison au Maroc. Signalez, consultez et
            évitez les clients à risque avant chaque livraison COD.
          </p>
          <div className="hero-cta">
            <Link to="/register" className="btn btn-primary btn-lg">Demander une démo</Link>
            <Link to="/login" className="btn btn-outline btn-lg">Connexion entreprise</Link>
          </div>
        </section>

        <section className="section section-alt">
          <div className="container">
            <h2 className="section-title">Le problème du retour au Maroc</h2>
            <p className="section-sub">
              Avec le paiement à la livraison (COD), les refus et retours partiels fragilisent toute la chaîne logistique.
            </p>
            <div className="stats-grid">
              <div className="card stat-card">
                <div className="num">30-40%</div>
                <p>Taux de retour moyen sur les commandes COD</p>
              </div>
              <div className="card stat-card">
                <div className="num">2 400 MAD</div>
                <p>Perte moyenne par incident de retour</p>
              </div>
              <div className="card stat-card">
                <div className="num">67%</div>
                <p>Des livreurs signalent des clients récidivistes</p>
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="how">
          <div className="container">
            <h2 className="section-title">Comment ça marche</h2>
            <p className="section-sub">Trois étapes pour protéger votre réseau de livraison</p>
            <div className="steps-grid">
              {STEPS.map((step) => {
                const Icon = step.icon;
                return (
                  <div key={step.title} className="card step-card">
                    <div className="step-num"><Icon size={20} /></div>
                    <h3>{step.title}</h3>
                    <p>{step.text}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="section section-alt" id="pricing">
          <div className="container">
            <h2 className="section-title">Tarifs transparents</h2>
            <p className="section-sub">Choisissez le plan adapté à votre volume</p>
            <div className="pricing-grid">
              {PRICING.map((p) => (
                <div key={p.name} className={`card price-card${p.featured ? ' featured' : ''}`}>
                  <h3>{p.name}</h3>
                  <div className="price">{p.price} {p.period && <span className="period">{p.period}</span>}</div>
                  <ul className="price-features">
                    {p.features.map((f) => (
                      <li key={f}><Check size={16} color="var(--teal)" /> {f}</li>
                    ))}
                  </ul>
                  <Link to={p.name === 'Enterprise' ? '/' : '/register'} className={p.featured ? 'btn btn-primary' : 'btn btn-outline'} style={{ width: '100%' }}>
                    {p.cta}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <h2 className="section-title">Ils nous font confiance</h2>
            <div className="testimonials-grid">
              {TESTIMONIALS.map((t) => (
                <div key={t.author} className="card testimonial">
                  <p className="quote">{t.quote}</p>
                  <div className="author">{t.author}</div>
                  <div className="role">{t.role}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section section-alt" style={{ textAlign: 'center' }}>
          <div className="container">
            <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '1rem' }}>Prêt à stopper les retours ?</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '1.0625rem' }}>
              Rejoignez les sociétés de livraison qui protègent déjà leurs marges.
            </p>
            <Link to="/register" className="btn btn-primary btn-lg">Demander une démo</Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
