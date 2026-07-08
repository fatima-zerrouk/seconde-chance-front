import React, { useEffect, useState } from 'react';
import { SectionAdmin } from '../../components/ui/Sections';
import { useFetch } from '../../hooks/useFetch';
import AnimalRow from '../../components/ui/AnimalRow';
import Pagination from '../../components/ui/Pagination';
import SearchBar from '../../components/ui/SearchBar';

export default function AnimalManagement() {
  const { apiFetch } = useFetch();

  const [animals, setAnimals] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const limit = 9;

  // L'effet qui se déclenche quand 'page' ou 'search' change
  useEffect(() => {
    async function loadAnimals() {
      setLoading(true);
      setError(null);

      try {
        // Appelle route privée
        const data = await apiFetch(
          `/animals?page=${page}&limit=${limit}&search=${search}`
        );

        // Stocke les résultats dans les états
        setAnimals(data.animals);
        setTotal(data.total);
      } catch (err) {
        // Si useFetch jette une erreur, elle est capturée ici
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadAnimals();
  }, [page, search]); //Les dépendances

  const totalPages = Math.ceil(total / limit); // Arrondit au supérieur (1.22 devient 2)

  return (
    <SectionAdmin title={'Gestion des animaux'}>
      {/* Affichage des erreurs si le serveur plante */}
      {error && (
        <div
          className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg"
          role="alert"
        >
          <span className="font-medium">Erreur :</span> {error}
        </div>
      )}

      <SearchBar
        value={search}
        onChange={newValue => {
          setSearch(newValue);
          setPage(1); // Reset la page à 1
        }}
      />

      <table className="w-full my-16">
        <thead>
          <tr className="bg-lin flex flex-row gap-14 px-6 py-3  border rounded-t-lg ">
            <th>Photo </th>
            <th>Prénom </th>
            <th>Espèce </th>
            <th>Statut </th>
            <th>Actions </th>
          </tr>
        </thead>

        <tbody className="">
          {animals.map(animal => (
            <AnimalRow key={animal.id} animal={animal} />
          ))}
        </tbody>
      </table>

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={requestedPage => setPage(requestedPage)}
      />
    </SectionAdmin>
  );
}
