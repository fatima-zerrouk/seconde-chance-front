// import React from 'react'
import { FaArrowRight } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

export default function AnimalRow({ animal }) {
  return (
    // dois rediriger vers l'animal au clique
    <tr className="grid grid-cols-7 p-3 gap-8 border items-center">
      <td className="">
        {/* Injecte l'URL dans le src */}
        <img
          src={animal.picture_url}
          alt={`Photo de ${animal.name}`}
          className="w-22 h-16 object-cover rounded-(--radius-input)"
        />
      </td>

      <td className="">{animal.name}</td>
      <td className="">{animal.specie_name}</td>
      {/*plus tard faire une liste statut 
        (available, in_progress, adopted)*/}
      <td className="">{animal.status}</td>
      {/* bouton qui redirige sur la page de modification */}
      <td>
        <NavLink
          className="bg-lin px-4 py-[4.6px] font-medium border rounded-(--radius-button) hover:bg-brown hover:text-lin transition duration-150 ease-in-out"
          to={`/dashboard/update/${animal.id}`}
        >
          Modifier{' '}
        </NavLink>{' '}
      </td>
      {/* bouton qui supprime l'animal mais avec avertissement avant et toast de confirmation après */}
      <td>
        {' '}
        <button className="bg-terracotta px-4 py-[4.6px]  flex font-medium  rounded-(--radius-button) hover:bg-brown hover:text-lin transition duration-150 ease-in-out">
          Supprimer
        </button>
      </td>
      <td className="m-auto hover:bg-brown hover:text-lin rounded-(--radius-input) p-2 transition duration-150 ease-in-out">
        <NavLink to={`/dashboard/animals/${animal.id}`}>
          <FaArrowRight className="" />
        </NavLink>
      </td>
    </tr>
  );
}
