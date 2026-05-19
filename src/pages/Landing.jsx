import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';
import PublicNav from '../components/layout/PublicNav';
import Footer from '../components/layout/Footer';

export default function Landing() {
  return (
    <>
      <PublicNav />
      <main className="page">
        <section className="hero container">
          <p style={{ color: 'var(--teal)', fontWeight: 600, fontSize: '.875rem', marginBottom: '.75rem' }}>
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
              {[
                { n: 1, title: 'Signaler', text: 'Documentez chaque incident de retour avec preuves et détails.' },
                { n: 2, title: 'Partager', text: 'Données partagées de manière sécurisée entre sociétés partenaires.' },
                { n: 3, title: 'Protéger', text: 'Vérifiez tout numéro avant expédition. Score de risque et alertes en temps réel.' },
              ].map((step) => (
                <div key={step.n} className="card">
                  <div className="step-num">{step.n}</div>
                  <h3 style={{ marginBottom: '.5rem' }}>{step.title}</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '.875rem' }}>{step.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section section-alt" id="pricing">
          <div className="container">
            <h2 className="section-title">Tarifs transparents</h2>
            <p className="section-sub">Choisissez le plan adapté à votre volume</p>
            <div className="pricing-grid">
              <div className="card price-card">
                <h3>Starter</h3>
                <div className="price">199 <span className="period">MAD/mois</span></div>
                <ul className="price-features">
                  <li><Check size={16} /> 500 vérifications/mois</li>
                  <li><Check size={16} /> 50 signalements/mois</li>
                </ul>
                <Link to="/register" className="btn btn-outline" style={{ width: '100%' }}>Commencer</Link>
              </div>
              <div className="card price-card featured">
                <h3>Pro</h3>
                <div className="price">499 <span className="period">MAD/mois</span></div>
                <ul className="price-features">
                  <li><Check size={16} /> Vérifications illimitées</li>
                  <li><Check size={16} /> API & alertes SMS</li>
                </ul>
                <Link to="/register" className="btn btn-primary" style={{ width: '100%' }}>Demander une démo</Link>
              </div>
              <div className="card price-card">
                <h3>Enterprise</h3>
                <div className="price">Sur mesure</div>
                <ul className="price-features">
                  <li><Check size={16} /> Multi-agences</li>
                  <li><Check size={16} /> SLA dédié</li>
                </ul>
                <Link to="/" className="btn btn-outline" style={{ width: '100%' }}>Nous contacter</Link>
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <h2 className="section-title">Ils nous font confiance</h2>
            <div className="testimonials-grid">
              {[
                { quote: '« RetourStop nous a permis de réduire nos retours de 18% en trois mois. »', author: 'Karim El Amrani', role: 'Directeur Ops — Amana Express' },
                { quote: '« La vérification avant dispatch a changé notre façon de travailler. »', author: 'Sara Benjelloun', role: 'CEO — Livo Logistics' },
                { quote: '« API fluide, données fiables. Intégré à notre TMS en une semaine. »', author: 'Yassine Tazi', role: 'CTO — Swiftylogix' },
              ].map((t) => (
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
            <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
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
