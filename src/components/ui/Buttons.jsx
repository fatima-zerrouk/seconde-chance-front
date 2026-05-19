import React from 'react';

export function ButtonTerracota({ className = '', value, type = 'button' }) {
  return (
    <button
      type={type}
      className={`bg-terracotta font-medium h-14 rounded-(--radius-button)  cursor-pointer hover:bg-brown hover:text-lin transition duration-150 ease-in-out ${className}`}
    >
      {value}
    </button>
  );
}
