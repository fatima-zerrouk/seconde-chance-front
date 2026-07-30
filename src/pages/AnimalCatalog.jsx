import React, { useEffect, useState } from 'react';
import { CardAnimal } from '../components/ui/Cards';
import { useFetch } from '../hooks/useFetch';
import Pagination from '../components/ui/Pagination';
import SearchBar from '../components/ui/SearchBar';
import { CatalogSelect } from '../components/ui/Field';
import { ButtonTerracota } from '../components/ui/Buttons';
import { Helmet } from 'react-helmet-async';

export default function Catalog() {
  const { apiFetch } = useFetch();

  const [animals, setAnimals] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [breeds, setBreeds] = useState([]);
  const [filters, setFilters] = useState({
    speciesId: '',
    breedId: '',
    gender: '',
    ageGroup: '',
  });

  const limit = 9;

  useEffect(() => {
    async function loadAnimals() {
      setLoading(true);
      setError(null);

      try {
        let url = `/animals/public?page=${page}&limit=${limit}&search=${search}`;

        if (filters.speciesId) url += `&speciesId=${filters.speciesId}`;
        if (filters.breedId) url += `&breedId=${filters.breedId}`;
        if (filters.gender) url += `&gender=${filters.gender}`;
        if (filters.ageGroup) url += `&ageGroup=${filters.ageGroup}`;

        const data = await apiFetch(url, { method: 'GET' });

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
  }, [page, search, filters, apiFetch]); //Les dépendances

  // Effet pour charger dynamiquement les races lorsque l'espèce change
  useEffect(() => {
    async function loadBreeds() {
      try {
        const data = await apiFetch(
          `/animals/public/breeds?speciesId=${filters.speciesId}`,
          { method: 'GET' }
        );
        setBreeds(data); // data contient la liste [{id: 1, name: "Labrador..."}, ...]
      } catch (err) {
        setError('Erreur lors du chargement des races :', err.message);
      }
    }

    loadBreeds();
  }, [filters.speciesId, apiFetch]); // Cet effet ne s'exécute que si speciesId change

  // Changer un filtre sans effacer les autres
  const handleFilterChange = (name, value) => {
    setFilters(prev => ({
      ...prev,
      [name]: value, // Met à jour dynamiquement la clé (speciesId, gender...)
    }));
    setPage(1); // Reset la page à 1 si filtre
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

  const totalPages = Math.ceil(total / limit);

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

      <section className=" px-(--margin-mobile) md:px-(--margin-desktop) py-22 md:pb-16 justify-items-center">
        <h1 className="text-center title-h1">Nos animaux à adopter</h1>
        <h2 className="text-center">
          Découvrez tous nos compagnons qui attendent une famille aimante.
        </h2>

        <div className=" bg-cream w-70 md:w-225 p-6 mt-10 rounded-(--radius-button) shadow-(--shadow-card) ">
          <SearchBar
            className="shadow-none bg-white "
            value={search}
            onChange={newValue => {
              setSearch(newValue);
              setPage(1);
            }}
          />

          <div className="flex flex-col md:flex md:flex-row gap-6 ">
            <CatalogSelect
              label="Espèce"
              htmlFor="speciesId"
              id="speciesId"
              name="speciesId"
              value={filters.speciesId}
              onChange={e => handleFilterChange('speciesId', e.target.value)}
            >
              <option value="2">Chat</option>
              <option value="1">Chien</option>
            </CatalogSelect>

            <CatalogSelect
              label="Race"
              htmlFor="breedId"
              id="breedId"
              name="breedId"
              value={filters.breedId}
              onChange={e => handleFilterChange('breedId', e.target.value)}
            >
              {breeds.map(breed => (
                <option key={breed.id} value={breed.id}>
                  {breed.name}
                </option>
              ))}
            </CatalogSelect>

            <CatalogSelect
              label="Genres"
              htmlFor="gender"
              id="gender"
              name="gender"
              value={filters.gender}
              onChange={e => handleFilterChange('gender', e.target.value)}
            >
              <option value="female">Femelle</option>
              <option value="male">Mâle</option>
            </CatalogSelect>
            <CatalogSelect
              label="Âge"
              htmlFor="ageGroup"
              id="ageGroup"
              name="ageGroup"
              value={filters.ageGroup}
              onChange={e => handleFilterChange('ageGroup', e.target.value)}
            >
              <option value="junior">Junior (Moins de 2 ans)</option>
              <option value="adult">Adulte (2 à 7 ans)</option>
              <option value="senior">Senior (Plus de 7 ans)</option>
            </CatalogSelect>
          </div>
          <div className="flex justify-center md:justify-end">
            <ButtonTerracota
              value={'Réinitiliser les filtres'}
              onClick={resetFilters}
              className="w-full md:w-52 md:px-2 mt-2 "
            />
          </div>
        </div>

        {error && <p className="text-center text-red-700">Erreur : {error}</p>}

        {loading ? (
          <p className="text-center">Chargement des animaux...</p>
        ) : animals.length === 0 ? (
          <p className="my-18">
            {' '}
            Aucun animal ne correspond à votre recherche.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-8 md:gap-x-78 md:grid-cols-3 justify-items-center my-22 md:mx-78">
            {animals.map(toto => (
              <CardAnimal key={toto.id} {...toto} />
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
