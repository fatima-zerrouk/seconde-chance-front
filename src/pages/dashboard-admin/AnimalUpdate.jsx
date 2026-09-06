import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { SectionAdmin } from '../../components/ui/Sections';
import AnimalForm from '../../components/animal/AnimalForm';
import { useFetch } from '../../hooks/useFetch';
import { toast } from 'sonner';
import { Helmet } from 'react-helmet-async';

export default function AnimalUpdate() {
  const { id } = useParams(); //Destructuration de l'id
  const [animal, setAnimal] = useState(null); // Valeur initial
  const { apiFetch } = useFetch();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    // Appel les données au montage du composant
    const loadAnimal = async () => {
      try {
        const response = await apiFetch(`/animals/${id}`, { method: 'GET' });
        // setAnimal(response); // Stocke le résultat
        const deducedSpecie = response.id_breed <= 10 ? 1 : 2;
        setAnimal({
          ...response,
          specie: deducedSpecie,
          urls: response.urls || [], // Évite que la galerie d'images plante si c'est undefined
        });
      } catch (err) {
        setError(err.message);
        toast.error("Impossible de charger l'animal");
      }
    };
    loadAnimal();
  }, [id, apiFetch]); // Données en fonction de l'ID

  const handleUpdateForm = async (data, methods) => {
    try {
      setIsUpdating(true);
      await apiFetch(`/animals/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      });
      toast.success("L'animal a bien été mis à jour");
      navigate('/dashboard/animals');
    } catch (error) {
      // Si le backend renvoie des erreurs de validation
      if (error.validationErrors) {
        error.validationErrors.forEach(validationError => {
          // Lie l'erreur du back directement au bon champ dans le formulaire
          methods.setError(validationError.path, {
            type: 'server',
            message: validationError.msg,
          });
        });
      } else {
        toast.error(error.message);
      }
    } finally {
      setIsUpdating(false);
    }
  };

  if (error) {
    return (
      <SectionAdmin
        title={'Modifier un animal'}
        paragraph={"Modifier les informations de l'animal"}
      >
        <div className="text-center my-10 p-6 bg-red-50 rounded-xl border border-red-200 max-w-lg mx-auto">
          <p className="text-red-700 font-semibold text-lg mb-4">{error}</p>
          <button
            onClick={() => navigate('/dashboard/animals')}
            className="cursor-pointer px-4 py-2 bg-red-700 text-white rounded-lg hover:bg-red-900 transition duration-300 ease-in-out"
          >
            Retour au tableau de bord
          </button>
        </div>
      </SectionAdmin>
    );
  }

  if (animal === null) {
    //Si l'animal vaut null affiche ce message
    return (
      <p className="flex justify-center my-50 font-medium animate-pulse">
        Chargement des données...
      </p>
    );
  }

  return (
    <>
      <Helmet>
        <title>Modifier un animal</title>
      </Helmet>

      <SectionAdmin
        title={'Modifier un animal'}
        paragraph={"Modifier les informations de l'animal"}
      >
        <AnimalForm
          animalEdit={animal}
          onSubmit={handleUpdateForm}
          isLoading={isUpdating}
        />
      </SectionAdmin>
    </>
  );
}
