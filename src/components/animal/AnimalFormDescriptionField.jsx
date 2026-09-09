import { useFormContext } from 'react-hook-form';
import { FaStarOfLife } from 'react-icons/fa6';

export default function AnimalDescriptionField() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <label
        htmlFor="description"
        className="flex flex-row gap-4 font-medium mt-6"
      >
        Description <FaStarOfLife className="text-red-700 w-2 h-auto" />
      </label>
      <textarea
        id="description"
        placeholder="Décrivez son caractère et ses besoins."
        className="bg-white mt-2 mb-4 rounded-(--radius-input) border-[1.4px] border-brown w-full h-96 md:h-64 p-2"
        {...register('description', {
          required: 'La description est requise',
          minLength: {
            value: 10,
            message: 'La description doit faire 10 caractères minimum',
          },
          maxLength: {
            value: 500,
            message: 'La description doit faire 500 caractères maximum',
          },
        })}
      ></textarea>
      {errors.description && (
        <p className="text-red-700">{errors.description.message}</p>
      )}
    </>
  );
}
