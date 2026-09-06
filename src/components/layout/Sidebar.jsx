import React, { useState, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { ButtonTerracota } from '../ui/Buttons';
import { IoExitOutline } from 'react-icons/io5';
import { AuthContext } from '../../context/AuthContext';

export default function SideBar() {
  const linkActive = ({ isActive }) =>
    isActive
      ? 'font-medium bg-terracotta p-4 rounded-(--radius-button) flex flex-row items-center  '
      : 'flex flex-row items-center p-4 rounded-(--radius-button)  hover:bg-brown hover:text-lin transition duration-150 ease-in-out';
  const [isOpen, setIsOpen] = useState(false);
  const { logout } = useContext(AuthContext);

  return (
    <section>
      <button
        className={`lg:hidden fixed left-7 top-4 py-2 px-3 z-20 text-3xl cursor-pointer rounded-lg
    transition-colors duration-200
    ${isOpen ? 'bg-transparent' : 'bg-terracotta shadow-(--shadow-line-b)'}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
      >
        {isOpen ? '✖' : ' ☰'}
      </button>

      <aside
        className={`bg-lin z-10 w-80 px-(--margin-mobile)  pt-22 pb-8 h-full flex flex-col fixed lg:sticky  transition-transform duration-300 ease-in-out
           ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
           lg:translate-x-0  lg:p-8`}
      >
        <nav className="flex-1 flex flex-col justify-between">
          <ul className="flex flex-col gap-4 w-full">
            <li>
              <NavLink
                to="/"
                onClick={() => setIsOpen(false)}
                className="mb-8 flex flex-row items-center gap-4 w-full p-4 border rounded-(--radius-button)  hover:bg-brown hover:text-lin transition duration-150 ease-in-out "
              >
                {' '}
                <FaArrowLeft />
                Revenir au site
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/dashboard"
                end
                onClick={() => setIsOpen(false)}
                className={linkActive}
              >
                Tableau de bord
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/dashboard/add"
                onClick={() => setIsOpen(false)}
                className={linkActive}
              >
                Ajouter un animal
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/dashboard/animals"
                onClick={() => setIsOpen(false)}
                className={linkActive}
              >
                Gestion des animaux
              </NavLink>
            </li>
          </ul>

          <ButtonTerracota
            value={'Déconnexion'}
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 mt-auto font-normal"
            icon={<IoExitOutline className="text-3xl  " />}
          />
        </nav>
      </aside>
    </section>
  );
}
