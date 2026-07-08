import React from 'react';
import { ButtonPagination } from './Buttons';

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  return (
    <nav
      className="flex flex-row items-center gap-6 pb-8 justify-center"
      aria-label="Pagination"
    >
      {/* Bouton précédent */}
      <ButtonPagination
        disabled={currentPage === 1} // Désactive précédent si page 1
        onClick={() => onPageChange(currentPage - 1)} //Décrémente de 1
        value={'Précédent'}
      />

      {/* Texte indicateur (Super important pour le RGAA/Accessibilité !) */}
      <p className="self-center text-base">
        Page <span className="font-medium">{currentPage}</span> sur{' '}
        <span className="font-medium">{totalPages}</span>
      </p>
      {/* Bouton suivant */}
      <ButtonPagination
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        value={'Suivant'}
      />
    </nav>
  );
}
