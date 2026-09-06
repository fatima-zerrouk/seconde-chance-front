import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate, useParams } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import AnimalData from '../components/animal/AnimalData';
import Carousel from '../components/animal/AnimalCarousel';
import Contact from '../components/ui/Contact';
import Status from '../components/animal/AnimalStatus';
import { NavLink } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

export default function AnimalDetails() {
  const [animal, setAnimal] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const { id } = useParams();
  const { apiFetch } = useFetch();
  const navigate = useNavigate(); 

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
  }, [id, apiFetch]);

  if (loading) {
    return (
      <div
        className="flex justify-center items-center min-h-screen"
        role="status"
        aria-live="polite"
      >
        <p className="animate-pulse">
          Chargement des détails de l&apos;animal...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="text-center my-10 p-6 bg-red-50 rounded-xl border border-red-200 max-w-lg mx-auto"
        role="alert"
      >
        <p className="text-red-700 font-semibold text-lg mb-4">{error}</p>
        <button
          onClick={() => navigate('/catalog')}
          className="cursor-pointer px-4 py-2 bg-red-700 text-white rounded-lg hover:bg-red-900 transition duration-300 ease-in-out"
        >
          Retour au catalogue
        </button>
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
        <NavLink to={`/catalog`} className="flex items-center gap-4 mb-8">
          <FaArrowLeft />
          Retour{' '}
        </NavLink>

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
