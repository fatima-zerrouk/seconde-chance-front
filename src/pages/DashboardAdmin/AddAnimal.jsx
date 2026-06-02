import React, { useState } from 'react';
import { SectionAdmin } from '../../components/ui/Sections';
import Form from '../../components/ui/Form';
import { useFetch } from '../../hooks/useFetch';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

export default function AddAnimal() {
  const [loading, setLoading] = useState(false);
  const [globalError, setGlobalError] = useState(null); // pour erreur générals crash serveur ect
  const { apiFetch } = useFetch();
  const navigate = useNavigate();

  const handleAddForm = async (data, methods) => {
    try {
      setLoading(false);
      setGlobalError(null);

      data.status = 'available';
      data.is_visible = true;

      const response = await apiFetch('/animals', {
        method: 'POST',
        body: JSON.stringify(data),
      });

      if (response?.validationErrors) {
        // si le back détecte des fautes via express validator
        response.validationErrors.forEach(validationError => {
          methods.setError(validationError.path, {
            type: 'server',
            message: validationError.msg, // Le message rédigé dans ton validateur Node.js
          });

          // setGlobalError(validationError.path, { message: validationError.msg });
        });
        return;
      }

      toast.success('Animal créé');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.message);
      setGlobalError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // if (loading) return <p>Chargement en cours</p>;
  // if (err) return <p>{'Erreur en cours : ' + err}</p>;

  return (
    <SectionAdmin
      title={'Ajouter un animal'}
      paragraph={'Remplissez tous les champs pour ajouter un nouvel animal'}
    >
      {globalError && <p className="text-red-700">{globalError} </p>}
      {/* passe la fonction POST au composant form */}
      <Form onSubmit={handleAddForm} />
    </SectionAdmin>
  );
}
