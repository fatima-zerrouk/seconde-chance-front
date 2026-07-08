import React, { useEffect, useState } from 'react';
import { SectionAdmin } from '../../components/ui/Sections';
import { useFetch } from '../../hooks/useFetch';
import AnimalRow from '../../components/ui/AnimalRow';
import Pagination from '../../components/ui/Pagination';
import SearchBar from '../../components/ui/SearchBar';
import { TableHead } from '../../components/ui/Field';

export default function AnimalManagement() {
  const { apiFetch } = useFetch();

  const [animals, setAnimals] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const limit = 5;

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

  // Désactive la pagination si y a qu'une page
  const handlePageChange = requestedPage => {
    if (requestedPage >= 1 && requestedPage <= totalPages) {
      setPage(requestedPage);
    }
  };
  return (
    <SectionAdmin
      title={'Gestion des animaux'}
      className="flex flex-col justify-center"
    >
      {/* Affichage des erreurs serveur */}
      {error && (
        <div className="text-center  my-10 p-6 bg-red-50 rounded-xl border border-red-200 max-w-lg mx-auto">
          <p className="text-red-700 font-semibold text-lg">Erreur : {error}</p>
        </div>
      )}

      <SearchBar
        value={search}
        onChange={newValue => {
          setSearch(newValue);
          setPage(1); // Reset la page à 1
        }}
      />

      <table className="w-full  md:table my-8">
        <thead className="hidden bg-lin border-[1.4px] md:table-header-group text-base">
          <tr>
            <TableHead value={'Photo'} />
            <TableHead value={'Prénom'} />
            <TableHead value={'Espèce'} />
            <TableHead value={'Statut'} />
            <TableHead value={'Modifier'} />
            <TableHead value={'Supprimer'} />
            <TableHead value={'Voir'} />
          </tr>
        </thead>

        {/* <tbody className=""> */}
        <tbody className="md:table-row-group md:shadow-(--shadow-card)">
          {loading ? (
            <tr>
              <td className="text-center py-8 font-medium" colSpan="7">
                Chargement des animaux...
              </td>
            </tr>
          ) : animals.length === 0 ? (
            <tr>
              <td colSpan="7" className="text-center py-8 font-medium">
                Aucun animal ne correspond à votre recherche.
              </td>
            </tr>
          ) : (
            animals.map(animal => <AnimalRow key={animal.id} animal={animal} />)
          )}
        </tbody>
      </table>

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </SectionAdmin>
  );
}
