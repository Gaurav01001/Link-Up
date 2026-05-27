// ─── Auth Service ─────────────────────────────────────────────────────────────
// Pure API calls only. No state, no side effects.
// All state management happens in store/auth.store.js.

import api from '../api/axios';

/**
 * Register a new user.
 * @param {{ username: string, email: string, password: string, fullName: string }} data
 * @returns {Promise<{ user: object, token: string }>}
 */
export async function register(data) {
  const res = await api.post('/api/auth/register', data);
  return res.data;
}

/**
 * Log in with email + password.
 * @param {{ email: string, password: string }} data
 * @returns {Promise<{ user: object, token: string }>}
 */
export async function login(data) {
  const res = await api.post('/api/auth/login', data);
  return res.data;
}

/**
 * Fetch the currently authenticated user using the stored token.
 * Used on app load to hydrate the auth store.
 * @returns {Promise<{ user: object }>}
 */
export async function getMe() {
  const res = await api.get('/api/auth/me');
  return res.data;
}

/**
 * Log out — invalidates session server-side (if supported).
 * Token removal from localStorage is handled in the store.
 * @returns {Promise<void>}
 */
export async function logout() {
  await api.post('/api/auth/logout');
}
