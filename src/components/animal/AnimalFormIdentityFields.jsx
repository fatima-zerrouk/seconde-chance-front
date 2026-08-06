import { useFormContext, useWatch, Controller } from 'react-hook-form';
import { FieldAdd, Select } from '../ui/Field.jsx';
import { useAnimalBreeds } from '../../hooks/useAnimalBreeds.js';
import { GENDER_LABELS, SIZE_LABELS } from '../../utils/animalLabels.js';

export default function AnimalIdentityFields() {
  const {
    register,
    control,
    setValue,
    setError,
    formState: { errors },
  } = useFormContext();

  const specieValue = useWatch({ control, name: 'specie' });
  const { breeds = [] } = useAnimalBreeds(specieValue, setError);

  return (
    <ul className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
      <li>
        <FieldAdd
          label="Nom"
          type="text"
          htmlFor="name"
          id="name"
          placeholder="Ex: Luna"
          className="w-60 bg-amber-500"
          {...register('name', {
            required: 'Le nom est requis',
            minLength: {
              value: 2,
              message: 'Le nom doit faire 2 caractères minimum',
            },
            maxLength: {
              value: 50,
              message: 'Le nom doit faire 50 caractères maximum',
            },
            pattern: {
              value: /^[a-zA-ZàâäéèêëîïôöùûüçÉÀÂÄÈÊËÎÏÔÖÙÛÜÇ\s-]+$/,
              message:
                'Le nom ne doit contenir que des lettres, des tirets ou des espaces',
            },
          })}
        />
        {errors.name && <p className="text-red-700">{errors.name.message}</p>}
      </li>

      <li>
        <FieldAdd
          label="Age"
          type="number"
          htmlFor="age"
          id="age"
          placeholder="Ex: 2"
          className="w-60"
          {...register('age', {
            required: "L'age est requis",
            valueAsNumber: true,
            validate: value =>
              Number.isInteger(value) || "L'âge doit être un entier",
          })}
        />
        {errors.age && <p className="text-red-700">{errors.age.message}</p>}
      </li>

      <li>
        <Select
          label="Espèce"
          htmlFor="specie"
          id="specie"
          name="specie"
          option=""
          {...register('specie', {
            required: "L'espèce est requise",
            valueAsNumber: true,
            onChange: () => setValue('id_breed', ''),
          })}
        >
          <option value="1">Chien</option>
          <option value="2">Chat</option>
        </Select>
        {errors.specie && (
          <p className="text-red-700">{errors.specie.message}</p>
        )}
      </li>

      <li>
        <Controller
          name="id_breed"
          control={control}
          rules={{ required: 'La race est requise' }}
          render={({ field }) => (
            <Select {...field} id="id_breed" label="Race">
              {breeds.map(breed => (
                <option key={breed.id} value={breed.id}>
                  {breed.name}
                </option>
              ))}
            </Select>
          )}
        />
        {errors.id_breed && (
          <p className="text-red-700">{errors.id_breed.message}</p>
        )}
      </li>

      <li>
        <Select
          label="Genre"
          htmlFor="gender"
          id="gender"
          name="gender"
          option=""
          {...register('gender', { required: 'Le genre est requis' })}
        >
          <option value="female">{GENDER_LABELS.female}</option>
          <option value="male">{GENDER_LABELS.male}</option>
        </Select>
        {errors.gender && (
          <p className="text-red-700">{errors.gender.message}</p>
        )}
      </li>

      <li>
        <Select
          label="Taille"
          htmlFor="size"
          id="size"
          name="size"
          option=""
          {...register('size', { required: 'La taille est requise' })}
        >
          <option value="small">{SIZE_LABELS.small}</option>
          <option value="medium">{SIZE_LABELS.medium}</option>
          <option value="big">{SIZE_LABELS.big}</option>
        </Select>
        {errors.size && <p className="text-red-700">{errors.size.message}</p>}
      </li>
    </ul>
  );
}
