import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { api } from '../utils/api';
import { maskPhone } from '../utils/helpers';

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
  const [checkLoading, setCheckLoading] = useState(false);
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

  const login = useCallback(async (email, password) => {
    const data = await api('POST', '/api/auth/login', { email, password });
    localStorage.setItem('rs_token', data.token);
    setUser({ name: data.name, email: data.email, ice: data.ice, plan: data.plan });
  }, []);

  const register = useCallback(async (form) => {
    const data = await api('POST', '/api/auth/register', {
      company: form.company,
      email: form.email,
      password: form.password,
      ice: form.ice,
      phone: form.phone,
    });
    localStorage.setItem('rs_token', data.token);
    setUser({ name: data.name, email: data.email, ice: data.ice, plan: data.plan });
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('rs_token');
    setUser(null);
  }, []);

  const checkClient = useCallback(async (phone) => {
    const cleaned = phone.replace(/\s/g, '');
    setCheckPhone(cleaned);
    setCheckLoading(true);
    setCheckResult(null);
    try {
      const data = await api('GET', `/api/clients/${cleaned}`);
      setCheckResult(data);
    } catch {
      setCheckResult({
        name: 'Client inconnu',
        phone: maskPhone(cleaned),
        score: 15,
        level: 'FIABLE',
        orders: 2,
        retours: 0,
        rate: 0,
        timeline: [],
      });
    } finally {
      setCheckLoading(false);
    }
  }, []);

  const showModal = useCallback((title, text) => setModal({ title, text }), []);
  const closeModal = useCallback(() => setModal(null), []);

  const exportCSV = useCallback(async () => {
    try {
      const reports = await api('GET', '/api/reports');
      const hdr = 'Date,Téléphone,Ville,Type,Valeur,Statut\n';
      const rows = reports.map(
        (r) => `${r.date},${r.phone},${r.city},${r.type},${r.value},${r.status}`,
      ).join('\n');
      const a = document.createElement('a');
      a.href = URL.createObjectURL(new Blob([hdr + rows], { type: 'text/csv' }));
      a.download = 'retourstop-signalements.csv';
      a.click();
      showModal('Info', 'Export CSV téléchargé');
    } catch {
      showModal('Erreur', 'Impossible d\'exporter les données');
    }
  }, [showModal]);

  const value = useMemo(
    () => ({
      user,
      theme,
      sidebarOpen,
      pubMenuOpen,
      checkResult,
      checkPhone,
      checkLoading,
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
      showModal,
      closeModal,
      exportCSV,
    }),
    [
      user, theme, sidebarOpen, pubMenuOpen, checkResult, checkPhone, checkLoading,
      blacklistPage, blacklistFilter, reportsFilter, modal, apiVisible,
      toggleTheme, login, register, logout, checkClient,
      showModal, closeModal, exportCSV,
    ],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
