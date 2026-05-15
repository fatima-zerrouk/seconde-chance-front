import React from 'react';

export function Field({
  className = '',
  type,
  placeholder,
  value,
  onChange,
  name,
  id,
  required = false, //par défaut il n'est pas requis
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      name={name}
      id={id}
      required={required}
      className={`rounded-(--radius-input) border-[1.4px] border-brown h-12 p-2 ${className}`}
    />
  );
}
