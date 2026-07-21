import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import AnimalData from '../components/ui/AnimalData';
import { SectionSubtitles } from '../components/ui/Sections';
import Carousel from '../components/ui/Carousel';
import Contact from '../components/ui/Contact';
import Status from '../components/ui/Status';

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

      <section className="px-(--margin-mobile) md:px-(--margin-desktop) py-12 md:pb-16">
        <div className="flex gap-6 items-center mb-6">
          <h1 className="title-h1 capitalize ">{animal.name}</h1>
          <Status status={animal.status} />
        </div>
        <div className="flex flex-col md:flex-row justify-between gap-8 md:items-start">
          <Carousel animal={animal} />
          <AnimalData animal={animal} />
        </div>
      </section>

      <section className="bg-cream py-18 px-(--margin-mobile) md:px-(--margin-desktop) flex flex-col md:flex-row justify-between gap-8 items-center">
        <div className="w-full md:w-150 h-auto">
          <h3 className="title-h3 mb-4 font-semibold">Description</h3>
          <p className="whitespace-pre-line">{animal.description}</p>
        </div>
        <Contact animal={animal} />
      </section>
    </>
  );
}
