import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import AnimalData from '../components/ui/AnimalData';
import { SectionSubtitles } from '../components/ui/Sections';

export default function AnimalDetails() {
  const [animal, setAnimal] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const { id } = useParams();
  const { apiFetch } = useFetch();

  useEffect(() => {
    async function detailAnimal() {
      try {
        setLoading(true);
        const data = await apiFetch(`/animals/public/${id}`, { method: 'GET' });
        setAnimal(data);
        console.log(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    detailAnimal();
  }, [id]);

  if (loading) {
    return (
      <div
        className="flex justify-center items-center min-h-screen"
        role="status"
        aria-live="polite"
      >
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        <span className="sr-only">
          Chargement des détails de l&apos;animal...
        </span>
      </div>
    );
  }
  if (error) {
    return (
      <div
        className="max-w-xl mx-auto my-8 p-4 bg-red-50 border-l-4 border-red-500 text-red-700"
        role="alert"
      >
        <p className="font-bold">Une erreur est survenue</p>
        <p>{error}</p>
      </div>
    );
  }
  if (!animal) {
    return (
      <div className="max-w-xl mx-auto my-8 text-center text-gray-600">
        <p>Aucun animal trouvé.</p>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Détails</title>
        <meta
          name="description"
          content="Découvrez tous nos compagnons qui attendent une famille aimante."
        />
      </Helmet>

      <SectionSubtitles>
        <h1 className="title-h1">{animal.name}</h1>
        {/* statut */}

        <div>
          {/* IMG */}
          <AnimalData animal={animal} />
        </div>

        <div>
          {/* DESCRIPTION */}
          {/* CONTACT */}
        </div>
      </SectionSubtitles>
    </>
  );
}
