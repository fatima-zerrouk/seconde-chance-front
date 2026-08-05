import React from 'react';
import { CardDataAnimal } from '../animal/AnimalCards';

export default function AnimalData({ animal }) {
  return (
    <article className="bg-terracotta p-6 rounded-(--radius-card) shadow-(--shadow-card) md:w-110 md:h-110">
      <h2 className="title-h2 mb-4">Caractéristique</h2>

      <div className="grid grid-cols-2 gap-4 justify-items-center mb-4 ">
        <CardDataAnimal
          label={'Espèce'}
          value={animal.specie_name === 'Dog' ? 'Chien' : 'Chat'}
        />
        <CardDataAnimal
          label={'Genre'}
          value={animal.gender === 'male' ? 'Mâle' : 'Femelle'}
        />
        <CardDataAnimal
          label={'Age'}
          value={`${animal.age} ${animal.age > 1 ? 'ans' : 'an'}`}
        />
        <CardDataAnimal
          label="Taille"
          value={
            animal.size === 'small'
              ? 'Petit'
              : animal.size === 'medium'
                ? 'Moyen'
                : 'Grand'
          }
        />
      </div>
      <CardDataAnimal label={'Race'} value={animal.breed_name} />
    </article>
  );
}
