import React, { useEffect, useState } from 'react';
import { CardAnimal } from '../components/ui/Cards';
import { useFetch } from '../hooks/useFetch';
import Pagination from '../components/ui/Pagination';

export default function Catalog() {
  const { apiFetch } = useFetch();

  const [animals, setAnimals] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  // const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const limit = 9;

  useEffect(() => {
    async function loadAnimals() {
      setLoading(true);
      setError(null);

      try {
        const data = await apiFetch(
          `/animals/public?page=${page}&limit=${limit}`,
          { method: 'GET' }
        );

        // Stocke les résultats dans les états
        setAnimals(data.animals);
        setTotal(data.total);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    loadAnimals();
  }, [page]); //Les dépendances

  const totalPages = Math.ceil(total / limit); // Arrondit (1.22 devient 2)

  // Désactive la pagination s'il y a qu'une page
  const handlePageChange = requestedPage => {
    if (requestedPage >= 1 && requestedPage <= totalPages) {
      setPage(requestedPage);
    }
  };

  return (
    <section className="text-center mx-(--margin-mobile) md:mx-78 py-12 md:pb-16">
      <h1 className="title-h1">Nos animaux à adopter</h1>
      <h2>Découvrez tous nos compagnons qui attendent une famille aimante.</h2>

      {loading && <p className="text-center">Chargement des animaux...</p>}
      {error && <p className="text-center text-red-700">Erreur : {error}</p>}
 
      <div className="grid grid-cols-1 gap-8 md:gap-x-78 md:grid-cols-3 justify-items-center my-12">
        {animals.map(toto => (
          <CardAnimal key={toto.id} {...toto} />
        ))}
      </div>

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </section>
  );
}
