const BASE_URL = 'http://localhost:8080';

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
  const res = await fetch(`${BASE_URL}${path}`, opts);
  if (!res.ok) {
    if (res.status === 401) {
      const refreshed = await tryRefresh();
      if (refreshed) {
        headers['Authorization'] = `Bearer ${getToken()}`;
        const retryRes = await fetch(`${BASE_URL}${path}`, opts);
        if (retryRes.ok) {
          if (retryRes.status === 204) return null;
          return retryRes.json();
        }
        const err = await retryRes.json().catch(() => ({ error: 'Erreur serveur' }));
        throw new Error(err.error || 'Erreur serveur');
      }
    }
    const err = await res.json().catch(() => ({ error: 'Erreur serveur' }));
    throw new Error(err.error || 'Erreur serveur');
  }
  if (res.status === 204) return null;
  return res.json();
}
