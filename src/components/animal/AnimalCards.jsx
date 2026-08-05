import { NavLink } from 'react-router-dom';
import { optimizeCloudinaryUrl } from '../../utils/cloudinary';
import Status from './AnimalStatus';
import { GENDER_LABELS } from '../../utils/animalLabels.js';

export function CardDataAnimal({ label, value, className = '' }) {
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
  const imageUrl = optimizeCloudinaryUrl(picture_url, 500);

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
          <p>
            <Status status={status} />
          </p>
        </div>

        <div className="flex flex-row justify-between mx-4 mb-4 ">
          <p>{GENDER_LABELS[gender]}</p>
          <p className="flex flex-row ">{age} ans</p>
        </div>
      </article>
    </NavLink>
  );
}
