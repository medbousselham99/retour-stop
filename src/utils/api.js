const BASE_URL = 'http://localhost:8080';

function getToken() {
  return localStorage.getItem('rs_token');
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
    const err = await res.json().catch(() => ({ error: 'Erreur serveur' }));
    throw new Error(err.error || 'Erreur serveur');
  }
  if (res.status === 204) return null;
  return res.json();
}
