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
        className={`capitalize mt-2 mb-4 bg-white rounded-(--radius-input) border-[1.4px] border-brown w-full h-12 p-2 ${className}`}
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
    <>
      <label htmlFor={htmlFor} className="flex gap-4 font-medium">
        {label} <FaStarOfLife className="text-red-700 w-2 h-auto" />
      </label>
      <select
        name={name}
        id={id}
        {...props}
        className={`mt-2 mb-4 bg-white rounded-(--radius-input) border-[1.4px] border-brown w-full h-12 p-2 ${className}`}
      >
        <option value="">Sélectionner</option>
        {children}
      </select>
    </>
  );
}

export function TableData({ td, value, children, className = '' }) {
  return (
    <td
      className={`flex justify-between border-b gap-5 items-center md:table-cell py-2 md:px-3 md:py-3 text-base ${className}`}
    >
      <span className="font-semibold uppercase md:hidden">{td}</span>
      {/* Si value existe ajoute span sinon non */}
      {value && <span className="capitalize">{value}</span>}
      {children}
    </td>
  );
}

export function TableHead({ value }) {
  return <th className="px-5 py-4 font-medium text-left">{value}</th>;
}
