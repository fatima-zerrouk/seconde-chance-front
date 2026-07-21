import React from 'react';
import { CiMail } from 'react-icons/ci';
import { BsTelephone, BsPinMap } from 'react-icons/bs';

export default function Contact({ animal }) {
  return (
    <address className="bg-cream p-8 not-italic mt-8 md:mt-0 rounded-(--radius-card) shadow-(--shadow-card) md:w-auto md:h-auto">
      <h2 className="title-h2 mb-4">
        Intéressé par <span className="capitalize"> {animal.name}</span> ?
      </h2>
      <p className="mb-4">
        Contactez-nous une rencontre avec{' '}
        <span className="capitalize"> {animal.name} </span>
      </p>

      <ul>
        <li className="items-center mb-3 bg-white w-full p-4 rounded-(--radius-button) ">
          {' '}
          <a
            href="mailto:contact@seconde-chance.fr"
            className=" flex items-center gap-2"
          >
            <CiMail
              className="bg-[#FBF3F0] text-[#A55C45] w-auto h-auto text-3xl p-2 rounded-xl"
              aria-label="icone de courier"
            />{' '}
            contact@seconde-chance.fr{' '}
          </a>
        </li>
        <li className="mb-3 bg-white w-full p-4 rounded-(--radius-button) ">
          {' '}
          <a href="tel:0123456789" className=" flex items-center gap-2">
            <BsTelephone
              className=" bg-[#FBF3F0] text-[#A55C45]  w-auto h-auto text-3xl p-2 rounded-xl"
              aria-label="icone de téléphone"
            />{' '}
            01 23 45 67 89
          </a>
        </li>
        <li className="flex items-center gap-2 bg-white w-full p-4 rounded-(--radius-button) ">
          <BsPinMap
            className=" bg-[#FBF3F0] text-[#A55C45]  w-auto h-auto text-3xl p-2 rounded-xl"
            aria-label="icone de carte "
          />{' '}
          71 quai Perrache, 69002 Lyon
        </li>
      </ul>
    </address>
  );
}
