import { FaArrowRight } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import { TableData } from '../ui/Field';
import { useState } from 'react';
import { useFetch } from '../../hooks/useFetch';
import { toast } from 'sonner';

export default function AnimalRow({ animal }) {
  const { apiFetch } = useFetch();
  const [status, setStatus] = useState(animal.status); // Initialise le statut avec celui reçu dans les props

  const handleStatus = async e => {
    const newStatus = e.target.value; // Récupère statut sélectionné dans la liste

    try {
      // Envoie une requête pour mettre à jour le statut
      await apiFetch(`/animals/${animal.id}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status: newStatus }),
      });
      setStatus(newStatus); // Met à jour le state pour rafraîchir l'affichage
    } catch (error) {
      toast.error("Impossible de modifier le statut de l'animal", error);
    }
  };

  // Fonction pour optimiser l'URL Cloudinary
  const optimizeCloudinaryUrl = url => {
    if (!url) return 'https://via.placeholder.com/150';

    // Si c'est une URL Cloudinary, injecte les paramètres d'optimisation
    if (url.includes('cloudinary.com')) {
      // f_auto : choisit le meilleur format (WebP ou AVIF) selon le navigateur
      // q_auto : compresse intelligemment sans perte de qualité
      // w_150,c_scale : redimensionne l'image
      return url.replace('/upload/', '/upload/f_auto,q_auto,w_150,c_scale/');
    }

    return url;
  };
  const imageUrl = optimizeCloudinaryUrl(animal.picture_url);

  return (
    <tr className="block md:table-row border md:border-none rounded-(--radius-card) shadow-(--shadow-card) md:shadow-none p-6 mb-6 md:mb-0">
      <TableData td={'Photo :'}>
        <img
          src={imageUrl}
          alt={`Photo de ${animal.name}`}
          className="w-22 h-16 object-cover rounded-(--radius-input)"
        />
      </TableData>

      <TableData td={'Prénom :'} value={animal.name}></TableData>

      <TableData
        td={'Espèce :'}
        value={animal.specie_name === 'Dog' ? 'Chien' : 'Chat'}
      ></TableData>

      <TableData td={'Statut :'}>
        <select
          value={status}
          onChange={handleStatus}
          aria-label={`Modifier le statut de ${animal.name}`}
          className="cursor-pointer rounded-(--radius-input) border-[1.4px] border-brown py-2 px-1 md:py-1 text-base font-medium focus:outline-none "
        >
          <option value="available">Disponible</option>
          <option value="in_progress">En cours d&apos;adoption</option>
          <option value="adopted">Adopter</option>
        </select>
      </TableData>

      <TableData td={'Modifier :'}>
        <NavLink
          className="bg-lin px-3 py-2 text-base font-medium rounded-(--radius-button) hover:bg-brown hover:text-lin transition duration-150 ease-in-out"
          to={`/dashboard/update/${animal.id}`}
          aria-label={`Lien vers le formulaire de modification de ${animal.name}`}
        >
          Modifier
        </NavLink>
      </TableData>

      <TableData td={'Supprimer :'}>
        <button className="bg-terracotta px-3 py-2 text-base font-medium rounded-(--radius-button) hover:bg-brown hover:text-lin transition duration-150 ease-in-out">
          Supprimer
        </button>
      </TableData>

      <TableData td={'Page détail :'}>
        <NavLink
          to={`/dashboard/animals/${animal.id}`}
          className="inline-flex p-2 hover:bg-brown hover:text-lin rounded-(--radius-input) transition duration-150 ease-in-out"
          aria-label={`Lien vers la page détail de ${animal.name}`}
        >
          <FaArrowRight />
        </NavLink>
      </TableData>
    </tr>
  );
}
