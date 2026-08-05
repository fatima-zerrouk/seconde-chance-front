import { NavLink } from 'react-router-dom';
import { optimizeCloudinaryUrl } from '../../utils/cloudinary';

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
  const displayStatus = STATUS_LABELS[status] || status;
  const statusClass = STATUS_STYLES[status];
  const sexe = GENDERS[gender];
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
          <p
            className={`text-center border rounded-(--radius-input) p-[1.6px] font-medium text-base ${statusClass}`}
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
