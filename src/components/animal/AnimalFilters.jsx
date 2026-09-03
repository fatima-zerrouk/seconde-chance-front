import React from 'react';
import SearchBar from '../ui/SearchBar';
import { CatalogSelect } from '../ui/Field';
import { ButtonTerracota } from '../ui/Buttons';
import { GENDER_LABELS } from '../../utils/animalLabels';

export default function AnimalFilters({
  search,
  onSearchChange,
  filters,
  onFilterChange,
  breeds,
  onReset,
}) {
  return (
    <div className="bg-cream w-70 md:w-225 p-6 mt-10 rounded-(--radius-button) shadow-(--shadow-card)">
      <SearchBar
        className="shadow-none bg-white"
        value={search}
        onChange={onSearchChange}
      />

      <div className="flex flex-col md:flex-row gap-6">
        <CatalogSelect
          label="Espèces"
          htmlFor="speciesId"
          id="speciesId"
          name="speciesId"
          value={filters.speciesId}
          onChange={e => onFilterChange('speciesId', e.target.value)}
        >
          <option value="2">Chat</option>
          <option value="1">Chien</option>
        </CatalogSelect>

        <CatalogSelect
          label="Races"
          htmlFor="breedId"
          id="breedId"
          name="breedId"
          value={filters.breedId}
          onChange={e => onFilterChange('breedId', e.target.value)}
        >
          {breeds.map(breed => (
            <option key={breed.id} value={breed.id}>
              {breed.name}
            </option>
          ))}
        </CatalogSelect>

        <CatalogSelect
          label="Genres"
          htmlFor="gender"
          id="gender"
          name="gender"
          value={filters.gender}
          onChange={e => onFilterChange('gender', e.target.value)}
        >
          <option value="female">{GENDER_LABELS.female}</option>
          <option value="male">{GENDER_LABELS.male}</option>
        </CatalogSelect>

        <CatalogSelect
          label="Âges"
          htmlFor="ageGroup"
          id="ageGroup"
          name="ageGroup"
          value={filters.ageGroup}
          onChange={e => onFilterChange('ageGroup', e.target.value)}
        >
          <option value="junior">Junior (Moins de 2 ans)</option>
          <option value="adult">Adulte (2 à 7 ans)</option>
          <option value="senior">Senior (Plus de 7 ans)</option>
        </CatalogSelect>
      </div>

      <div className="flex justify-center md:justify-end">
        <ButtonTerracota
          value="Réinitialiser les filtres"
          onClick={onReset}
          className="w-full md:w-52 md:px-2 mt-2"
        />
      </div>
    </div>
  );
}
