import React, { useContext, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { CgProfile } from 'react-icons/cg';

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated } = useContext(AuthContext);

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
    bg-white flex flex-col items-center gap-4 px-4 text-base transition-all duration-300 ease-in-out origin-top
    ${
      isOpen
        ? 'opacity-100 max-h-125 py-10 scale-y-100' //ouvert
        : 'opacity-0 max-h-0 py-0 scale-y-0 overflow-hidden' //fermer
    } 
    lg:flex lg:flex-row lg:gap-8 lg:items-center lg:p-0 lg:opacity-100 lg:scale-y-100 lg:overflow-visible
  `}
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
              <NavLink to="/dashboard" aria-label="Lien vers mon profil">
                <CgProfile className="w-12 md:10 h-auto hover:bg-terracotta hover:text-brown rounded-4xl bg-brown text-white transition duration-300 ease-in-out " />
              </NavLink>
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
                    isActive ? ' font-semibold' : ''
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
