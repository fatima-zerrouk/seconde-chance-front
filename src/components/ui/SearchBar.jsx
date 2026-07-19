import React, { useEffect, useState } from 'react';

export default function SearchBar({ value, onChange, className = '' }) {
  const [localValue, setLocalValue] = useState(value);

  // garde une trace de la dernière valeur reçue du parent
  const [prevValue, setPrevValue] = useState(value);

  if (value !== prevValue) {
    setLocalValue(value);
    setPrevValue(value); // met à jour pour éviter une boucle infinie
  }

  //  le debouncing
  useEffect(() => {
    // Si la valeur locale est identique à celle du parent, pas besoin de lancer un timer
    if (localValue === value) return;

    // Lance un minuteur de 500ms avant de mettre à jour le parent
    const timer = setTimeout(() => {
      onChange(localValue);
    }, 600); // 500ms est le juste milieu idéal pour l'UX

    // Fonction de nettoyage (cleanup) : s'exécute si localValue change AVANT la fin des 500ms
    return () => clearTimeout(timer);
  }, [localValue, onChange, value]);

  return (
    <search className="mb-6">
      <label htmlFor="search-animal" className="sr-only">
        Rechercher un animal par son prénom
      </label>
      <input
        id="search-animal"
        type="text"
        maxLength={50}
        value={localValue}
        onChange={e => setLocalValue(e.target.value)}
        placeholder="Rechercher par prénom"
        className={`w-full shadow-(--shadow-card) mt-4 px-4 py-3 border-[1.5px] rounded-(--radius-input) ${className}`}
      />
    </search>
  );
}
