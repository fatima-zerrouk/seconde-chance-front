import React, { useEffect, useState } from 'react';
import { SectionAdmin } from '../../components/ui/Sections';
import { useFetch } from '../../hooks/useFetch';
import AnimalRow from '../../components/animal/AnimalRow';
import Pagination from '../../components/ui/Pagination';
import SearchBar from '../../components/ui/SearchBar';
import { TableHead } from '../../components/ui/Field';
import { toast } from 'sonner';
import ConfirmationModal from '../../components/ui/Modal';
import { Helmet } from 'react-helmet-async';

export default function AnimalManagement() {
  const { apiFetch } = useFetch();

  const [animals, setAnimals] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [animalToDelete, setAnimalToDelete] = useState(null);

  const limit = 5;

  useEffect(() => {
    async function loadAnimals() {
      setLoading(true);
      setError(null);

      try {
        const data = await apiFetch(
          `/animals?page=${page}&limit=${limit}&search=${search}`
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
  }, [page, search, apiFetch]); //Les dépendances

  const totalPages = Math.ceil(total / limit); // Arrondit (1.22 devient 2)

  // Désactive la pagination s'il y a qu'une page
  const handlePageChange = requestedPage => {
    if (requestedPage >= 1 && requestedPage <= totalPages) {
      setPage(requestedPage);
    }
  };

  const handleOpenConfirm = id => {
    setAnimalToDelete(id); // Ouvre la modal en stockant l'ID
  };

  // Fonction exécutée confirme la suppression
  const handleConfirmDelete = async () => {
    if (!animalToDelete) return; // Quitte la fonction si aucun animal n'est sélectionné

    try {
      await apiFetch(`/animals/${animalToDelete}`, {
        method: 'DELETE',
      });

      setAnimals(
        (
          prevAnimals // Met à jour la liste sans refaire une requête au serveur
        ) => prevAnimals.filter(animal => animal.id !== animalToDelete)
      );
      toast.success("L'animal a été supprimé avec succès");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setAnimalToDelete(null); // Ferme le modal de confirmation
    }
  };

  return (
    <>
      <Helmet>
        <title>Gestion des animaux</title>
      </Helmet>

      <SectionAdmin
        title={'Gestion des animaux'}
        className="flex flex-col justify-center"
      >
        {error && (
          <div className="text-center  my-10 p-6 bg-red-50 rounded-xl border border-red-200 max-w-lg mx-auto">
            <p className="text-red-700 font-semibold text-lg">
              Erreur : {error}
            </p>
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
              animals.map(animal => (
                <AnimalRow
                  key={animal.id}
                  animal={animal}
                  onDelete={handleOpenConfirm}
                />
              ))
            )}
          </tbody>
        </table>

        <ConfirmationModal
          isOpen={animalToDelete !== null} // Ouvre le modal si un ID est stocké
          onClose={() => setAnimalToDelete(null)} // Ferme la modal sans supprimer
          onConfirm={handleConfirmDelete} // Suppression
          message="Êtes-vous sûr de vouloir supprimer cet animal ? Cette action est irréversible."
        />

        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </SectionAdmin>
    </>
  );
}
