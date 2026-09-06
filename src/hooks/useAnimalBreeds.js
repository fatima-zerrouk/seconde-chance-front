import { useEffect, useState } from 'react';
import { useFetch } from './useFetch.js';

export function useAnimalBreeds(speciesId, setError = null) {
  const { apiFetch } = useFetch();
  const [breeds, setBreeds] = useState([]);
  const [loadingBreeds, setLoadingBreeds] = useState(false);
  const [errorBreeds, setErrorBreeds] = useState(null);

  useEffect(() => {
    async function loadBreeds() {
      setLoadingBreeds(true);
      setErrorBreeds(null);

      try {
        const query = speciesId ? `?speciesId=${speciesId}` : '';
        const data = await apiFetch(`/animals/public/breeds${query}`, {
          method: 'GET',
        });
        setBreeds(Array.isArray(data) ? data : []);
      } catch (err) {
        const message = err.message || 'Erreur lors du chargement des races';
        setErrorBreeds(message);

        // Si l'appelant fournit setError (RHF dans le formulaire d'ajout)
        if (setError) {
          setError('id_breed', {
            type: 'server',
            message: message,
          });
        }
      } finally {
        setLoadingBreeds(false);
      }
    }

    loadBreeds();
  }, [speciesId, setError, apiFetch]);

  return { breeds, loadingBreeds, errorBreeds };
}
