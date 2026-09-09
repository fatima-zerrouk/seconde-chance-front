import React, { useEffect, useState } from 'react';
import { CardAnimal } from '../components/animal/AnimalCards';
import { useFetch } from '../hooks/useFetch';
import Pagination from '../components/ui/Pagination';
import { Helmet } from 'react-helmet-async';
import { useAnimalBreeds } from '../hooks/useAnimalBreeds';
import AnimalFilters from '../components/animal/AnimalFilters';

const LIMIT = 9;

export default function Catalog() {
  const { apiFetch } = useFetch();

  const [animals, setAnimals] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [filters, setFilters] = useState({
    speciesId: '',
    breedId: '',
    gender: '',
    ageGroup: '',
  });

  const { breeds } = useAnimalBreeds(filters.speciesId);

  // Chargement de la liste des animaux filtrée et paginée
  useEffect(() => {
    async function loadAnimals() {
      setLoading(true);
      setError(null);

      try {
        let url = `/animals/public?page=${page}&limit=${LIMIT}&search=${search}`;

        if (filters.speciesId) url += `&speciesId=${filters.speciesId}`;
        if (filters.breedId) url += `&breedId=${filters.breedId}`;
        if (filters.gender) url += `&gender=${filters.gender}`;
        if (filters.ageGroup) url += `&ageGroup=${filters.ageGroup}`;

        const data = await apiFetch(url, { method: 'GET' });
        setAnimals(data.animals);
        setTotal(data.total);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadAnimals();
  }, [page, search, filters, apiFetch]);

  // Changer un filtre sans effacer les autres
  const handleFilterChange = (name, value) => {
    setFilters(prev => ({
      ...prev,
      [name]: value, // Met à jour dynamiquement la clé (speciesId, gender...)
      // Si l'espèce change, réinitialise la race sélectionnée
      ...(name === 'speciesId' ? { breedId: '' } : {}),
    }));
    setPage(1); // Reset la page à 1 si filtre
  };

  const handleSearchChange = newValue => {
    setSearch(newValue);
    setPage(1);
  };

  const resetFilters = () => {
    setFilters({
      speciesId: '',
      breedId: '',
      gender: '',
      ageGroup: '',
    });
    setSearch('');
    setPage(1);
  };

  const totalPages = Math.ceil(total / LIMIT);

  const handlePageChange = requestedPage => {
    if (requestedPage >= 1 && requestedPage <= totalPages) {
      setPage(requestedPage);
    }
  };

  return (
    <>
      <Helmet>
        <title>Animaux à adopter</title>
        <meta
          name="description"
          content="Découvrez tous nos compagnons qui attendent une famille aimante."
        />
      </Helmet>

      <section className="px-(--margin-mobile) md:px-(--margin-desktop) py-22 md:pb-16 justify-items-center">
        <h1 className="text-center title-h1">Nos animaux à adopter</h1>
        <h2 className="text-center">
          Découvrez tous nos compagnons qui attendent une famille aimante.
        </h2>

        {/* Filtres */}
        <AnimalFilters
          search={search}
          onSearchChange={handleSearchChange}
          filters={filters}
          onFilterChange={handleFilterChange}
          breeds={breeds}
          onReset={resetFilters}
        />

        {error && (
          <p className="text-center text-red-700 my-8">Erreur : {error}</p>
        )}

        {loading ? (
          <p className="text-center my-18">Chargement des animaux...</p>
        ) : animals.length === 0 ? (
          <p className="my-18 text-center">
            Aucun animal ne correspond à votre recherche.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-8 md:gap-x-78 md:grid-cols-3 justify-items-center my-22 md:mx-78">
            {animals.map(animal => (
              <CardAnimal key={animal.id} {...animal} />
            ))}
          </div>
        )}

        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </section>
    </>
  );
}
