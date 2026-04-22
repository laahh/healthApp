import usersFile from "../data/users.json";

export const AUTH_SESSION_KEY = "health_auth_session_v1";

/** Data pengguna untuk disimpan di session (tanpa password). */
function toPublicUser(record) {
  if (!record) return null;
  const { password: _p, ...rest } = record;
  return rest;
}

export function getUsersFromStore() {
  const list = usersFile?.users;
  return Array.isArray(list) ? list : [];
}

/**
 * Cocokkan username & password dengan data di JSON.
 * @returns {object|null} user publik atau null
 */
export function authenticate(username, password) {
  const u = String(username || "").trim().toLowerCase();
  const p = String(password || "");
  const found = getUsersFromStore().find(
    (row) => String(row.username || "").toLowerCase() === u && String(row.password || "") === p
  );
  return found ? toPublicUser(found) : null;
}

export function getSession() {
  try {
    const raw = localStorage.getItem(AUTH_SESSION_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || !parsed.user) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function getSessionUser() {
  return getSession()?.user ?? null;
}

export function setSessionUser(user) {
  if (!user) {
    localStorage.removeItem(AUTH_SESSION_KEY);
    return;
  }
  localStorage.setItem(AUTH_SESSION_KEY, JSON.stringify({ user }));
}

/** Gabungkan field ke user yang sedang login (untuk edit profil). */
export function mergeSessionUser(partial) {
  const cur = getSessionUser();
  if (!cur) return null;
  const next = { ...cur, ...partial };
  setSessionUser(next);
  return next;
}

export function logout() {
  localStorage.removeItem(AUTH_SESSION_KEY);
}
