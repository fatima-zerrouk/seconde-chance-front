import { FaArrowRight } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import { TableData } from '../ui/Field';
import { useState } from 'react';
import { useFetch } from '../../hooks/useFetch';
import { toast } from 'sonner';
import { optimizeCloudinaryUrl } from '../../utils/cloudinary';

export default function AnimalRow({ animal, onDelete }) {
  const { apiFetch } = useFetch();
  const [status, setStatus] = useState(animal.status); // Initialise avec le statut
  const imageUrl = optimizeCloudinaryUrl(animal.picture_url, 350);

  const handleStatus = async e => {
    const newStatus = e.target.value; // Récupère statut sélectionné

    try {
      await apiFetch(`/animals/${animal.id}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status: newStatus }),
      });
      setStatus(newStatus); // Met à jour pour rafraîchir l'affichage
    } catch (error) {
      toast.error("Impossible de modifier le statut de l'animal", error);
    }
  };

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
          value={status} // Valeur actuellement affichée
          onChange={handleStatus} // Déclenche la mise à jour du statut
          aria-label={`Modifier le statut de ${animal.name}`}
          className="cursor-pointer rounded-(--radius-input) border-[1.4px] border-brown py-2 px-1 md:py-1 text-base "
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
        <button
          className="bg-terracotta px-3 py-2 text-base font-medium rounded-(--radius-button) hover:bg-brown hover:text-lin transition duration-150 ease-in-out"
          onClick={() => onDelete(animal.id)}
        >
          Supprimer
        </button>
      </TableData>

      <TableData td={'Page détail :'}>
        <NavLink
          to={`/catalog/${animal.id}`}
          className="inline-flex p-2 hover:bg-brown hover:text-lin rounded-(--radius-input) transition duration-150 ease-in-out"
          aria-label={`Lien vers la page détail de ${animal.name}`}
        >
          <FaArrowRight />
        </NavLink>
      </TableData>
    </tr>
  );
}
