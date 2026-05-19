import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { COMPANIES, CLIENTS, REPORTS } from '../data/mockData';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('rs_user') || 'null');
    } catch {
      return null;
    }
  });
  const [theme, setTheme] = useState(() => localStorage.getItem('rs_theme') || 'light');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [pubMenuOpen, setPubMenuOpen] = useState(false);
  const [checkResult, setCheckResult] = useState(null);
  const [checkPhone, setCheckPhone] = useState('');
  const [blacklistPage, setBlacklistPage] = useState(1);
  const [blacklistFilter, setBlacklistFilter] = useState({ search: '', level: '', wilaya: '' });
  const [reportsFilter, setReportsFilter] = useState({ from: '', to: '', city: '', type: '' });
  const [modal, setModal] = useState(null);
  const [apiVisible, setApiVisible] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('rs_theme', theme);
  }, [theme]);

  useEffect(() => {
    if (user) localStorage.setItem('rs_user', JSON.stringify(user));
    else localStorage.removeItem('rs_user');
  }, [user]);

  const toggleTheme = useCallback(() => {
    setTheme((t) => (t === 'light' ? 'dark' : 'light'));
  }, []);

  const login = useCallback((email) => {
    const company = COMPANIES.find((c) => c.email === email) || { ...COMPANIES[0], email };
    setUser(company);
  }, []);

  const register = useCallback((data) => {
    setUser({
      id: 'new',
      name: data.company,
      email: data.email,
      ice: data.ice,
      plan: 'Starter',
    });
  }, []);

  const logout = useCallback(() => setUser(null), []);

  const checkClient = useCallback((phone) => {
    const cleaned = phone.replace(/\s/g, '');
    setCheckPhone(cleaned);
    setCheckResult(
      CLIENTS[cleaned] || {
        name: 'Client inconnu',
        phone: maskPhone(cleaned),
        score: 15,
        level: 'FIABLE',
        orders: 2,
        retours: 0,
        rate: 0,
        timeline: [],
      },
    );
  }, []);

  const viewProfile = useCallback(() => {
    setCheckPhone('0612345678');
    setCheckResult(CLIENTS['0612345678']);
  }, []);

  const showModal = useCallback((title, text) => setModal({ title, text }), []);
  const closeModal = useCallback(() => setModal(null), []);

  const exportCSV = useCallback(() => {
    const hdr = 'Date,Téléphone,Ville,Type,Valeur,Statut\n';
    const rows = REPORTS.map(
      (r) => `${r.date},${r.phone},${r.city},${r.type},${r.value},${r.status}`,
    ).join('\n');
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([hdr + rows], { type: 'text/csv' }));
    a.download = 'retourstop-signalements.csv';
    a.click();
    showModal('Info', 'Export CSV téléchargé');
  }, [showModal]);

  const value = useMemo(
    () => ({
      user,
      theme,
      sidebarOpen,
      pubMenuOpen,
      checkResult,
      checkPhone,
      blacklistPage,
      blacklistFilter,
      reportsFilter,
      modal,
      apiVisible,
      setSidebarOpen,
      setPubMenuOpen,
      setBlacklistPage,
      setBlacklistFilter,
      setReportsFilter,
      setApiVisible,
      toggleTheme,
      login,
      register,
      logout,
      checkClient,
      viewProfile,
      showModal,
      closeModal,
      exportCSV,
    }),
    [
      user,
      theme,
      sidebarOpen,
      pubMenuOpen,
      checkResult,
      checkPhone,
      blacklistPage,
      blacklistFilter,
      reportsFilter,
      modal,
      apiVisible,
      toggleTheme,
      login,
      register,
      logout,
      checkClient,
      viewProfile,
      showModal,
      closeModal,
      exportCSV,
    ],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}

function maskPhone(phone) {
  if (!phone) return '';
  return `${phone.slice(0, 4)}****${phone.slice(-2)}`;
}
