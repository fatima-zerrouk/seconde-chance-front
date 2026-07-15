import React, { useState } from 'react';
import { SectionAdmin } from '../../components/ui/Sections';
import Form from '../../components/ui/Form';
import { useFetch } from '../../hooks/useFetch';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

export default function AddAnimal() {
  const [loading, setLoading] = useState(false);
  const [globalError, setGlobalError] = useState(null); // Stocke les erreurs générales crash serveur, ect.
  const { apiFetch } = useFetch();
  const navigate = useNavigate();

  const handleAddForm = async (data, methods) => {
    try {
      setLoading(true);
      setGlobalError(null);

      // date, ajoute par défaut des propriétés avant l'envoi
      data.status = 'available';
      data.is_visible = true;

      // Envoie les données vers le Back
      await apiFetch('/animals', {
        method: 'POST',
        body: JSON.stringify(data),
      });

      toast.success('Animal créé');
      navigate('/dashboard');
    } catch (error) {
      // Gestion des erreurs de validation
      if (error.validationErrors) {
        toast.error('Veuillez vérifier les champs du formulaire.');

        error.validationErrors.forEach(validationError => {
          // Lie l'erreur au bon champ RHF
          methods.setError(validationError.path, {
            type: 'server',
            message: validationError.msg, // Message du validateur Node
          });
        });
        return;
      }

      toast.error(error.message);
      setGlobalError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Ajouter un animal</title>
      </Helmet>

      <SectionAdmin
        title={'Ajouter un animal'}
        paragraph={'Remplissez tous les champs pour ajouter un nouvel animal'}
      >
        {globalError && <p className="text-red-700">{globalError} </p>}
        {/* Passe la fonction POST au composant form */}
        <Form onSubmit={handleAddForm} />
      </SectionAdmin>
    </>
  );
}
