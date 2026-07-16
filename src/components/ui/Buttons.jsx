import React from 'react';
import { NavLink } from 'react-router-dom';

export function ButtonTerracota({
  className = '',
  value,
  type,
  onClick,
  icon,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`bg-terracotta font-medium h-14 rounded-(--radius-button)  cursor-pointer hover:bg-brown hover:text-lin transition duration-150 ease-in-out ${className}`}
    >
      {icon}
      {value}
    </button>
  );
}

export function LinkTerracota({ className = '', value, to, ariaLabel, icon }) {
  return (
    <NavLink
      to={to}
      aria-label={ariaLabel}
      className={`flex justify-center items-center bg-terracotta font-medium h-14 rounded-(--radius-button)  hover:bg-brown hover:text-lin transition duration-150 ease-in-out  ${className}`}
    >
      {' '}
      {icon}
      {value}
    </NavLink>
  );
}

export function ButtonPagination({ disabled, onClick, value }) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className="items-center rounded-(--radius-button) bg-cream  border border-lin px-4 py-2 text-base font-medium hover:bg-brown hover:text-lin disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
    >
      {value}
    </button>
  );
}
