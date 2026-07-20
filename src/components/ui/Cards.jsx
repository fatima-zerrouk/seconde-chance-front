import React from 'react';
import { NavLink } from 'react-router-dom';

const STATUS_LABELS = {
  available: 'Disponible',
  in_progress: 'En cours d’adoption',
  adopted: 'Adopté',
};
const STATUS_STYLES = {
  available: 'w-26 bg-green-100 text-green-900 border-green-200',
  in_progress: 'w-44 bg-amber-100 text-amber-800 border-amber-200',
  adopted: 'w-26 bg-blue-100 text-blue-800 border-blue-200',
};
const GENDERS = {
  female: 'Femelle',
  male: 'Mâle',
};

export function CardMission({ icon: Icon, title, text, className }) {
  return (
    <article
      className={`bg-cream rounded-(--radius-card) shadow-(--shadow-card) px-8 py-10  ${className}`}
    >
      <Icon className="text-terracotta text-4xl mb-4" />
      <h3 className="title-h3 py-2">{title}</h3>
      <p className="">{text}</p>
    </article>
  );
}
export function CardHow({ icon: Icon, title, text, className }) {
  return (
    <article
      className={`bg-cream rounded-(--radius-card) shadow-(--shadow-card) p-6  ${className}`}
    >
      <Icon className="text-brown text-6xl mb-4" />
      <h3 className="title-h3 py-2">{title}</h3>
      <p>{text}</p>
    </article>
  );
}

export function CardContact({
  icon: Icon,
  title,
  link,
  className,
  ariaLabel,
  text,
  target,
}) {
  return (
    <li
      className={`flex flex-row items-center gap-4 bg-[#DD9B87] text rounded-(--radius-card) shadow-(--shadow-card) p-6  ${className}`}
    >
      <Icon
        aria-label={ariaLabel}
        className="text-brown  bg-[#E4AF9F] w-auto h-auto text-3xl p-2 rounded-xl"
      />
      <div className="w-full lg:w-44">
        <h3 className="font-semibold">{title}</h3>
        <a
          href={link}
          target={target}
          className="inline-block transition-transform duration-300 hover:translate-x-4"
        >
          {text}
        </a>
      </div>
    </li>
  );
}

export function DataAnimal({ label, value, className = '' }) {
  return (
    <div
      className={`bg-white w-full p-4 rounded-(--radius-button) ${className}`}
    >
      <p className="mb-1 ">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  );
}

export function CardAnimal({ id, name, status, gender, age, picture_url }) {
  const displayStatus = STATUS_LABELS[status] || status;
  const statusClass = STATUS_STYLES[status];
  const sexe = GENDERS[gender];

  const optimizeCloudinaryUrl = url => {
    if (!url)
      return 'https://cdn.phototourl.com/free/2026-07-16-68b65eb2-6d21-4c71-a9a7-4e251506c9b1.png';

    if (url.includes('cloudinary.com')) {
      return url.replace('/upload/', '/upload/f_auto,q_auto,w_500,c_scale/');
    }
  };
  const imageUrl = optimizeCloudinaryUrl(picture_url);

  return (
    <NavLink to={`/catalog/${id}`}>
      <article className="bg-cream w-70 pb-2 rounded-(--radius-button) shadow-(--shadow-line-b) hover:-translate-y-4 duration-400">
        <div>
          <img
            src={imageUrl}
            alt={`Photo de ${name}`}
            className="w-full h-40 object-cover rounded-t-[8px]"
          />
        </div>

        <div className="m-4 flex flex-row items-center justify-between gap-4">
          <p className="font-semibold capitalize truncate">{name}</p>
          <p
            className={`border rounded-(--radius-input) p-[1.6px] font-medium text-base ${statusClass}`}
          >
            {displayStatus}
          </p>
        </div>

        <div className="flex flex-row justify-between mx-4 mb-4 ">
          <p>{sexe}</p>
          <p className="flex flex-row ">{age} ans</p>
        </div>
      </article>
    </NavLink>
  );
}
