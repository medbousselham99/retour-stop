import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, Download, Search, Loader } from 'lucide-react';
import AppShell from '../components/layout/AppShell';
import { useApp } from '../context/AppContext';
import { badgeClass, scoreColor } from '../utils/helpers';

export default function Check() {
  const { checkPhone, checkResult, checkLoading, checkClient, showModal } = useApp();
  const [phone, setPhone] = useState(checkPhone);
  useEffect(() => setPhone(checkPhone), [checkPhone]);
  const r = checkResult;
  const col = r ? scoreColor(r.score) : '';

  const handleCheck = () => checkClient(phone);

  const exportPDF = async () => {
    if (!r) return;
    const { default: jsPDF } = await import('jspdf');
    const doc = new jsPDF({ unit: 'mm', format: 'a4' });
    const pageW = 210;
    let y = 20;

    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text('Fiche Client - RetourStop', pageW / 2, y, { align: 'center' });
    y += 12;

    doc.setDrawColor(220, 38, 38);
    doc.setLineWidth(0.5);
    doc.line(20, y, pageW - 20, y);
    y += 10;

    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');

    const fields = [
      ['Nom', r.name],
      ['Téléphone', r.phone],
      ['Score', `${r.score}/100`],
      ['Niveau', r.level],
      ['Commandes', String(r.orders)],
      ['Retours', String(r.retours)],
      ['Taux retour', `${r.rate}%`],
    ];

    fields.forEach(([label, value]) => {
      doc.setFont('helvetica', 'bold');
      doc.text(`${label}:`, 20, y);
      doc.setFont('helvetica', 'normal');
      doc.text(value, 70, y);
      y += 8;
    });

    if (r.timeline && r.timeline.length > 0) {
      y += 5;
      doc.setDrawColor(200);
      doc.line(20, y, pageW - 20, y);
      y += 8;
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(13);
      doc.text('Historique des incidents', 20, y);
      y += 8;
      doc.setFontSize(10);

      r.timeline.forEach((t) => {
        doc.setFont('helvetica', 'bold');
        doc.text(`${t.company} — ${t.date}`, 20, y);
        y += 5;
        doc.setFont('helvetica', 'normal');
        doc.text(t.type, 25, y);
        y += 8;
      });
    }

    y += 10;
    doc.setFontSize(8);
    doc.setTextColor(150);
    doc.text(`Généré le ${new Date().toLocaleDateString('fr-FR')} · RetourStop`, pageW / 2, y, { align: 'center' });

    doc.save(`fiche-${r.phone?.replace(/\D/g, '') || 'client'}.pdf`);
    showModal('Info', 'PDF téléchargé');
  };

  return (
    <AppShell title="Vérification client">
      <div className="page-header">
        <h2>Vérifier un client</h2>
        <p>Numéro marocain 06/07 pour obtenir le profil de risque.</p>
      </div>

      <div className="card">
        <div className="search-box">
          <input
            type="tel"
            placeholder="Ex: 0612345678"
            maxLength={10}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleCheck()}
          />
          <button type="button" className="btn btn-primary" onClick={handleCheck} disabled={checkLoading}>
            {checkLoading ? <Loader size={18} className="spin" /> : <Search size={18} />} Vérifier
          </button>
        </div>
        <p style={{ fontSize: '.75rem', color: 'var(--text-muted)' }}>
          Essayez : 0612345678, 0678901234, 0655123491, 0698765432
        </p>
      </div>

      {checkLoading && (
        <div className="card" style={{ marginTop: '1.5rem', textAlign: 'center', padding: '2rem' }}>
          <Loader size={24} className="spin" />
          <p style={{ marginTop: '.5rem', color: 'var(--text-muted)' }}>Recherche en cours...</p>
        </div>
      )}

      {r && !checkLoading && (
        <div className="card" style={{ marginTop: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>{r.name}</h3>
              <p style={{ color: 'var(--text-muted)' }}>{r.phone}</p>
            </div>
            <span className={badgeClass(r.level)}>{r.level}</span>
          </div>

          <div style={{ margin: '1.5rem 0', display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap' }}>
            <div>
              <div style={{ fontSize: '.875rem', color: 'var(--text-muted)' }}>Score de risque</div>
              <div className="risk-score" style={{ color: col }}>{r.score}</div>
            </div>
            <div style={{ flex: 1, minWidth: 200 }}>
              <div className="risk-bar">
                <div className="risk-bar-fill" style={{ width: `${r.score}%`, background: col }} />
              </div>
            </div>
          </div>

          <div className="risk-grid">
            {[
              { num: r.orders, lbl: 'Commandes' },
              { num: r.retours, lbl: 'Retours' },
              { num: `${r.rate}%`, lbl: 'Taux retour' },
              { num: r.level, lbl: 'Niveau', color: col },
            ].map((s) => (
              <div key={s.lbl} className="risk-stat">
                <div className="num" style={s.color ? { color: s.color } : undefined}>{s.num}</div>
                <div className="lbl">{s.lbl}</div>
              </div>
            ))}
          </div>

          {r.timeline && r.timeline.length > 0 ? (
            <>
              <h4 style={{ fontWeight: 600, margin: '1rem 0 .5rem' }}>Historique des incidents</h4>
              <ul className="timeline">
                {r.timeline.map((t, i) => (
                  <li key={i}>
                    <span className="dot" />
                    <div>
                      <strong>{t.company}</strong> — {t.date}
                      <br />
                      <span style={{ color: 'var(--text-muted)' }}>{t.type}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <p style={{ color: 'var(--text-muted)', fontSize: '.875rem', marginTop: '1rem' }}>
              Aucun incident signalé.
            </p>
          )}

          <div style={{ marginTop: '1rem', display: 'flex', gap: '.75rem', flexWrap: 'wrap' }}>
            <Link to="/report" className="btn btn-danger btn-sm">
              <AlertTriangle size={16} /> Signaler ce client
            </Link>
            <button type="button" className="btn btn-outline btn-sm" onClick={exportPDF}>
              <Download size={16} /> Export PDF
            </button>
          </div>
        </div>
      )}
    </AppShell>
  );
}
