import React from 'react';

export default function SearchBar({ value, onChange, className = '' }) {
  return (
    <search className="mb-6">
      <label htmlFor="search-animal" className="sr-only">
        Rechercher un animal par son prénom
      </label>
      <input
        id="search-animal"
        type="text"
        maxLength={50}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="Rechercher par prénom"
        className={`w-full shadow-(--shadow-card)  px-4 py-3 border-[1.5px] rounded-(--radius-input) ${className}`}
      />
    </search>
  );
}
