import React, { useState } from 'react';
import { SectionAdmin } from '../../components/ui/Sections';
import Form from '../../components/ui/Form';
import { useFetch } from '../../hooks/useFetch';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
// import { ButtonTerracota } from '../../components/ui/Buttons';
// import { Field } from '../../components/ui/Field'

export default function AddAnimal() {
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);
  const { apiFetch } = useFetch();
  const navigate = useNavigate();

  const handleAddForm = async data => {
    try {
      setLoading(false);
      setErr(null);

      data.status = 'available';
      data.is_visible = true;

      const response = await apiFetch('/animals', {
        method: 'POST',
        body: JSON.stringify(data),
      });

      if (response?.validationErrors) {
        response.validationErrors.forEach(validationError => {
          setErr(validationError.path, { message: validationError.msg });
        });
        return;
      }
      // if (response?.validationErrors) {
      //   setErr("Le formulaire contient des données invalides. Veuillez vérifier vos saisies.");
      //   return;
      // }

      toast.success('Animal créé');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.message);
      setErr(error.message);
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
      {/* passe la fonction POST au composant form */}
      <Form onSubmit={handleAddForm} err={err} />
    </SectionAdmin>
  );
}
