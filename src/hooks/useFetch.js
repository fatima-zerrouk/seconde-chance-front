export function useFetch() {
  const API_URL = import.meta.env.VITE_API_URL;

  async function apiFetch(url, options = {}) {
    const token = localStorage.getItem('token');

    // Détection automatique : est-ce qu'on envoie un fichier/FormData
    const isFormData = options.body instanceof FormData;

    const res = await fetch(`${API_URL}${url}`, {
      ...options,
      headers: {
        // Ajoute 'application/json' QUE si ce n'est pas du FormData !
        ...(!isFormData && { 'Content-Type': 'application/json' }),
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
    });

    const data = await res.json();

    if (res.status === 400) {
      return { validationErrors: data.errors };
    }

    if (!res.ok) {
      throw new Error(data.message || 'Une erreur est survenue.');
    }

    return data;
  }

  return { apiFetch };
}
