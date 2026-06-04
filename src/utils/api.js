const BASE_URL = 'http://localhost:8080';
const CACHE_PREFIX = 'rs_cache_';
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

function getToken() {
  return localStorage.getItem('rs_token');
}

function getRefreshToken() {
  return localStorage.getItem('rs_refresh_token');
}

let refreshPromise = null;

async function tryRefresh() {
  if (refreshPromise) return refreshPromise;
  refreshPromise = (async () => {
    const refreshToken = getRefreshToken();
    if (!refreshToken) return false;
    try {
      const res = await fetch(`${BASE_URL}/api/auth/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken }),
      });
      if (!res.ok) {
        localStorage.removeItem('rs_token');
        localStorage.removeItem('rs_refresh_token');
        localStorage.removeItem('rs_user');
        window.location.href = '/login';
        return false;
      }
      const data = await res.json();
      localStorage.setItem('rs_token', data.token);
      localStorage.setItem('rs_refresh_token', data.refreshToken);
      localStorage.setItem('rs_user', JSON.stringify({
        name: data.name, email: data.email, ice: data.ice, plan: data.plan,
      }));
      return true;
    } catch {
      return false;
    } finally {
      refreshPromise = null;
    }
  })();
  return refreshPromise;
}

function getCacheKey(method, path) {
  return CACHE_PREFIX + method + '_' + path;
}

function getFromCache(method, path) {
  if (method !== 'GET') return null;
  try {
    const key = getCacheKey(method, path);
    const cached = localStorage.getItem(key);
    if (!cached) return null;
    const { data, timestamp } = JSON.parse(cached);
    if (Date.now() - timestamp > CACHE_TTL) {
      localStorage.removeItem(key);
      return null;
    }
    return data;
  } catch {
    return null;
  }
}

function setCache(method, path, data) {
  if (method !== 'GET') return;
  try {
    const key = getCacheKey(method, path);
    localStorage.setItem(key, JSON.stringify({ data, timestamp: Date.now() }));
  } catch {}
}

export async function api(method, path, body) {
  const headers = {};
  const token = getToken();
  if (token) headers['Authorization'] = `Bearer ${token}`;
  if (body != null && !(body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }
  const opts = { method, headers };
  if (body != null) {
    opts.body = body instanceof FormData ? body : JSON.stringify(body);
  }

  const cached = getFromCache(method, path);
  if (cached && navigator.onLine !== false) {
    return cached;
  }

  try {
    const res = await fetch(`${BASE_URL}${path}`, opts);
    if (!res.ok) {
      if (res.status === 401) {
        const refreshed = await tryRefresh();
        if (refreshed) {
          headers['Authorization'] = `Bearer ${getToken()}`;
          const retryRes = await fetch(`${BASE_URL}${path}`, opts);
          if (retryRes.ok) {
            if (retryRes.status === 204) return null;
            const data = await retryRes.json();
            setCache(method, path, data);
            return data;
          }
          const err = await retryRes.json().catch(() => ({ error: 'Erreur serveur' }));
          throw new Error(err.error || 'Erreur serveur');
        }
      }
      const err = await res.json().catch(() => ({ error: 'Erreur serveur' }));
      throw new Error(err.error || 'Erreur serveur');
    }
    if (res.status === 204) return null;
    const data = await res.json();
    setCache(method, path, data);
    return data;
  } catch (e) {
    const fallback = getFromCache(method, path);
    if (fallback) return fallback;
    throw e;
  }
}

export function clearCache() {
  const keys = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith(CACHE_PREFIX)) keys.push(key);
  }
  keys.forEach((k) => localStorage.removeItem(k));
}
