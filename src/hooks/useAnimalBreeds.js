import { useEffect, useState } from 'react';
import { useFetch } from './useFetch.js';

export function useAnimalBreeds(specieValue, setError) {
  const { apiFetch } = useFetch();
  const [breeds, setBreeds] = useState([]);

  useEffect(() => {
    async function loadBreeds() {
      try {
        const query = specieValue ? `?speciesId=${specieValue}` : '';
        const data = await apiFetch(`/animals/public/breeds${query}`, {
          method: 'GET',
        });
        setBreeds(data);
      } catch (err) {
        console.error('Erreur lors du chargement des races :', err);
        setError('id_breed', {
          type: 'server',
          message: 'Erreur lors du chargement des races',
        });
      }
    }
    loadBreeds();
  }, [specieValue, setError, apiFetch]);

  return breeds;
}
