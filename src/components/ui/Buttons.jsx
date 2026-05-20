import React from 'react';
import { NavLink } from 'react-router-dom';

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

export function LinkTerracota({ className = '', value, to, ariaLabel }) {
  return (
    <NavLink
      to={to}
      aria-label={ariaLabel}
      className={`flex justify-center items-center bg-terracotta font-medium h-14 rounded-(--radius-button)  cursor-pointer hover:bg-brown hover:text-lin transition duration-150 ease-in-out  ${className}`}
    >
      {value}
    </NavLink>
  );
}
