import { useCallback } from 'react';

export function useFetch() {
  const API_URL = import.meta.env.VITE_API_URL;

  const apiFetch = useCallback(
    async (url, options = {}) => {
      const token = localStorage.getItem('token');

      // Détection fichier FormData
      const isFormData = options.body instanceof FormData;

      const res = await fetch(`${API_URL}${url}`, {
        ...options,
        headers: {
          // Ajoute 'application/json' que si ce n'est pas du FormData
          ...(!isFormData && { 'Content-Type': 'application/json' }),
          ...(token && { Authorization: `Bearer ${token}` }),
          ...options.headers,
        },
      });

      if (res.status === 204) {
        return;
      }

      const data = await res.json();

      if (!res.ok) {
        const error = new Error(data.message || 'Une erreur est survenue.');

        // Si Express-Validator a renvoyé un tableau d'erreurs dans data.errors
        if (data.errors) {
          error.validationErrors = data.errors;
        }

        throw error; // Propulse l'erreur directement dans le catch() du composant
      }

      return data;
    },
    [API_URL]
  );

  return { apiFetch };
}
