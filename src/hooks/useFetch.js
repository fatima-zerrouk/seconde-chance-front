import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export function useFetch() {
  const { logout } = useContext(AuthContext);
  const API_URL = import.meta.env.VITE_API_URL;

  async function apiFetch(url, options = {}) {
    const token = localStorage.getItem('token'); //récupère token
    const res = await fetch(`${API_URL}${url}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
    });

    if (res.status === 401) {
      logout();
      return;
    }
    if (res.status === 204) {
      // gestion du statut 204 (pas de contenue)
      return null;
    }
    if (!res.ok) {
      // si erreur API
      const data = await res.json(); // lecture message erreur back
      throw new Error(data.message || 'Erreur API'); // lance erreur
    }
    return await res.json(); // retourne les données JSON
  }
  return { apiFetch };
}
