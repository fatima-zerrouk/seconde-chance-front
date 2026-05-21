import React, { useContext, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { ButtonTerracota } from '../ui/Buttons';

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, logout } = useContext(AuthContext);

  const linkActive = ({ isActive }) => (isActive ? 'font-semibold' : '');

  return (
    <header className="py-6 md:py-3 px-(--margin-mobile) md:px-(--margin-desktop) z-1 shadow-line-b">
      <nav
        aria-label="Barre de navigation"
        className="flex flex-col lg:flex-row lg:items-center lg:justify-between"
      >
        <div className="flex justify-between items-center md:w-auto ">
          <Link to="/" className="font-bold text-xl uppercase">
            Seconde<span className="block">chance</span>
          </Link>

          <button
            className="lg:hidden text-3xl "
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? '✖' : ' ☰'}
          </button>
        </div>

        <ul
          className={`
            bg-white flex-col items-center gap-4 px-4 py-10 lg:p-0
           ${isOpen ? 'flex' : 'hidden'} 
          lg:flex lg:flex-row lg:gap-8 lg:items-center text-base`}
        >
          <li>
            <NavLink
              to="/"
              onClick={() => setIsOpen(false)}
              className={linkActive}
            >
              Accueil
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/catalog"
              onClick={() => setIsOpen(false)}
              className={linkActive}
            >
              Adopter
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/terms"
              onClick={() => setIsOpen(false)}
              className={linkActive}
            >
              Conditions d&apos;adoption
            </NavLink>
          </li>
          {isAuthenticated ? (
            <li>
              <ButtonTerracota
                onClick={logout}
                value={'Déconnexion'}
                className="px-4 py-2 h-auto"
              />
            </li>
          ) : (
            <li>
              {' '}
              <NavLink
                to="/login"
                onClick={() => setIsOpen(false)}
                aria-label="Lien qui mène à la page de connexion"
                className={({ isActive }) =>
                  `flex justify-center items-center bg-terracotta font-medium h-auto py-2 px-4 rounded-(--radius-button)  cursor-pointer hover:bg-brown hover:text-lin transition duration-150 ease-in-out ${
                    isActive
                      ? ' font-semibold' // css sur la page active
                      : ''
                  }`
                }
              >
                Connexion
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}
