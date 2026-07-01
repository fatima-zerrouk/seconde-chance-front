import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { SectionAdmin } from '../../components/ui/Sections';
import Form from '../../components/ui/Form';
import { useFetch } from '../../hooks/useFetch';
import { toast } from 'sonner';

export default function UpdateAnimal() {
  const { id } = useParams(); //Destructuration de l'id
  const [animal, setAnimal] = useState(null); // Valeur initial
  const { apiFetch } = useFetch();
  const navigate = useNavigate();

  useEffect(() => {
    // Appel les données au montage du composant
    const loadAnimal = async () => {
      try {
        const response = await apiFetch(`/animals/${id}`, { method: 'GET' });
        setAnimal(response); // Stocke le résultat
      } catch (error) {
        console.error('Erreurs lors du chargement', error);
      }
    };
    loadAnimal();
  }, [id]); // Données en fonction de l'ID

  const handleUpdateForm = async (data, methods) => {
    try {
      await apiFetch(`/animals/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      });
      toast.success('Animal mis à jour');
      navigate('/dashboard');
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
      }
    }
  };

  if (animal === null) {
    //Si l'animal vaut null affiche ce message
    return <p>Chargement des données...</p>;
  }

  return (
    <SectionAdmin title={'Modifier'} paragraph={'Modifier les informations'}>
      <Form animalEdit={animal} onSubmit={handleUpdateForm} />
    </SectionAdmin>
  );
}
