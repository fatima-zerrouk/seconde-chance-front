import React from 'react';
import { CiMail } from 'react-icons/ci';
import { BsTelephone, BsPinMap } from 'react-icons/bs';
import { NavLink } from 'react-router-dom';

export function Footer() {
  const linkActive = ({ isActive }) => (isActive ? 'font-bold' : '');

  return (
    <section className="shadow-line-t py-4 px-6 md:px-12 md:py-8 md:flex md:gap-10 md:justify-around text-base">
      <ul className="pb-4">
        <li>
          <h2 className=" title-h3 mb-4"> Seconde chance</h2>
        </li>
        <li>
          Offrir une nouvelle vie{' '}
          <span className="display: block">aux animaux abandonnés.</span>{' '}
        </li>
      </ul>

      <ul className="pb-4">
        <li>
          <h3 className=" title-h3 mb-4"> Navigation</h3>
        </li>
        <li className="mb-1">
          <NavLink to="/" className={linkActive}>
            Accueil
          </NavLink>
        </li>
        <li className="mb-1">
          <NavLink to="/catalog" className={linkActive}>
            Adopter
          </NavLink>
        </li>
        <li className="mb-1">
          <NavLink to="/terms" className={linkActive}>
            Conditions d&apos;adoption
          </NavLink>
        </li>
        <li>
          <NavLink to="/login" className={linkActive}>
            Connexion
          </NavLink>
        </li>
      </ul>

      <address className="not-italic ">
        <h3 className=" title-h3 mb-4">Contact</h3>
        <ul>
          <li className="items-center mb-3">
            {' '}
            <a
              href="mailto:contact@seconde-chance.fr"
              className=" flex items-center gap-2"
            >
              <CiMail className="text-xl" aria-label="icone de courier" />{' '}
              contact@seconde-chance.fr{' '}
            </a>
          </li>
          <li className="mb-3">
            {' '}
            <a href="tel:0123456789" className=" flex items-center gap-2">
              <BsTelephone
                className="text-xl"
                aria-label="icone de téléphone"
              />{' '}
              01 23 45 67 89
            </a>
          </li>
          <li className=" flex items-center gap-2">
            <BsPinMap className="text-xl" aria-label="icone de carte " /> 71
            quai Perrache, 69002 Lyon
          </li>
        </ul>
      </address>
      {/* <p className='text-center'>© 2026 Seconde chance </p> */}
    </section>
  );
}
