import React from 'react';
import { FaStarOfLife } from 'react-icons/fa6';

export function Field({
  className = '',
  type,
  placeholder,
  id,
  ref,
  ...props
}) {
  return (
    <input
      ref={ref}
      type={type}
      placeholder={placeholder}
      id={id}
      {...props}
      className={`rounded-(--radius-input) border-[1.4px] border-brown h-12 p-2 ${className}`}
    />
  );
}

export function FieldAdd({
  className = '',
  type,
  placeholder,
  id,
  ref,
  label,
  htmlFor,
  ...props
}) {
  return (
    <>
      <label htmlFor={htmlFor} className="flex gap-4 font-medium">
        {label} <FaStarOfLife className="text-red-700 w-2 h-auto" />
      </label>

      <input
        ref={ref}
        type={type}
        placeholder={placeholder}
        id={id}
        {...props}
        className={`mt-2 mb-4 bg-white rounded-(--radius-input) border-[1.4px] border-brown w-full md:w-60 h-12 p-2 ${className}`}
      />
    </>
  );
}

export function Select({
  className = '',
  label,
  htmlFor,
  name,
  id,
  children,
  ...props
}) {
  return (
    <li className="">
      <label htmlFor={htmlFor} className="flex gap-4 font-medium">
        {label} <FaStarOfLife className="text-red-700 w-2 h-auto" />
      </label>
      <select
        name={name}
        id={id}
        {...props}
        className={`mt-2 mb-4 bg-white rounded-(--radius-input) border-[1.4px] border-brown w-full md:w-60 h-12 p-2 ${className}`}
      >
        <option value="">Sélectionner</option>
        {children}
      </select>
    </li>
  );
}
