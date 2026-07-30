import { FieldAdd, Select } from './Field';
import { ButtonTerracota } from './Buttons';
import { useNavigate } from 'react-router-dom';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { FaStarOfLife } from 'react-icons/fa6';
import { useEffect, useState } from 'react';
import { ImageUploader } from '../ImageUploader';
import { useFetch } from '../../hooks/useFetch';

export default function Form({ onSubmit, animalEdit, isLoading = false }) {
  const navigate = useNavigate();
  const { apiFetch } = useFetch();
  const isEdit = Boolean(animalEdit);

  const {
    register,
    handleSubmit,
    setError,
    setValue, // Injecte l'URL de l'image reçue
    control, // Observe en temps réel l'état de l'URL pour l'aperçu image
    formState: { errors }, // Contient toutes les erreurs des champs
  } = useForm({
    mode: 'onTouched',
    // Si animalEdit existe, RHF préremplit les champs tout seul
    defaultValues: animalEdit,
  });

  // Text alternatif img
  const animalAltForm =
    useWatch({ control, name: 'name', defaultValue: animalEdit?.name }) ||
    "l'animal";

  // Observe l'espèce en temps réel pour filtrer les races
  const specieValue = useWatch({
    control,
    name: 'specie',
    defaultValue: animalEdit?.specie,
  });

  const [breeds, setBreeds] = useState([]);

  useEffect(() => {
    async function loadBreeds() {
      try {
        const query = specieValue ? `?speciesId=${specieValue}` : '';
        const data = await apiFetch(`/animals/public/breeds${query}`, {
          method: 'GET',
        });
        setBreeds(data);
      } catch {
        setError('id_breed', {
          type: 'server',
          message: 'Erreur lors du chargement des races',
        });
      }
    }
    loadBreeds();
  }, [specieValue, setError, apiFetch]);

  useEffect(() => {
    register('urls', {
      validate: value => {
        // Garde que les éléments qui contiennent une vraie URL pas null, '', ou undefind
        const trueImages = value ? value.filter(Boolean) : [];
        // Vérifie s'il en reste au moins une url
        return trueImages.length >= 1 || 'Il faut au moins une photo';
      },
    });
  }, [register]);

  const currentUrls = useWatch({ control, name: 'urls' }) || []; // Récupère le tableau d'images (urls) actuel

  const handleImageUploaded = (index, url) => {
    const newUrls = [...currentUrls];
    newUrls[index] = url; // Place l'URL au bon index (0, 1 ou 2)
    setValue('urls', newUrls, { shouldValidate: true });
  };

  const handleImageRemoved = index => {
    const newUrls = [...currentUrls];
    // Au lieu de supprimer la case, la valeur est à undefined
    newUrls[index] = undefined;
    setValue('urls', newUrls, { shouldValidate: true });
  };

  // Fonction pour empaqueter la data et setError
  const interceptedSubmit = data => {
    onSubmit(data, { setError });
  };

  return (
    <section>
      {' '}
      <form
        onSubmit={handleSubmit(interceptedSubmit)}
        className=" rounded-(--radius-card) shadow-card mb-12 bg-lin p-8 w-full h-auto  transition-all duration-300 ease-in-out"
      >
        <fieldset>
          <legend className="sr-only">
            {isEdit ? "Modifier l'animal" : 'Ajouter un animal'}
          </legend>

          <ul className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
            <li>
              <FieldAdd
                label={'Nom'}
                type="text"
                htmlFor={'name'}
                id={'name'}
                placeholder="Ex: Luna"
                className=" w-60 bg-amber-500"
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
              {errors.name && (
                <p className="text-red-700">{errors.name.message}</p>
              )}
            </li>

            <li>
              <FieldAdd
                label={'Age'}
                type="number"
                htmlFor={'age'}
                id={'age'}
                placeholder="Ex: 2"
                className=" w-60"
                {...register('age', {
                  required: "L'age est requis",
                  valueAsNumber: true, // Convertit la chaîne "1" en nombre 1
                  validate: value =>
                    Number.isInteger(value) || "L'âge doit être un entier",
                })}
              />
              {errors.age && (
                <p className="text-red-700">{errors.age.message}</p>
              )}
            </li>

            <li>
              <Select
                label={'Espèce'}
                htmlFor={'specie'}
                id={'specie'}
                name={'specie'}
                option={''}
                {...register('specie', {
                  required: "L'espèce est requise",
                  valueAsNumber: true,
                  onChange: () => {
                    // Reset la race quand l'espèce change pour éviter d'associer un chien à une race de chat
                    setValue('id_breed', '');
                  },
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
                  <Select {...field} id={'id_breed'} label={'Race'}>
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
                label={'Sexe'}
                htmlFor={'gender'}
                id={'gender'}
                name={'gender'}
                option={''}
                {...register('gender', {
                  required: 'Le genre est requis',
                })}
              >
                <option value="male">Masculin</option>
                <option value="female">Féminin</option>
              </Select>
              {errors.gender && (
                <p className="text-red-700">{errors.gender.message}</p>
              )}
            </li>

            <li>
              <Select
                label={'Taille'}
                htmlFor={'size'}
                id={'size'}
                name={'size'}
                option={''}
                {...register('size', {
                  required: 'La taille est requise',
                })}
              >
                <option value="small">Petit</option>
                <option value="medium">Moyen</option>
                <option value="big">Grand</option>
              </Select>
              {errors.size && (
                <p className="text-red-700">{errors.size.message}</p>
              )}
            </li>
          </ul>
        </fieldset>
        <label
          htmlFor="description"
          className="flex flex-row gap-4 font-medium mt-6"
        >
          Description <FaStarOfLife className="text-red-700 w-2 h-auto" />
        </label>
        <textarea
          name="description"
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

        <p className="font-medium mt-6 flex flex-row gap-4">
          Galerie <FaStarOfLife className="text-red-700 w-2 h-auto" />
        </p>
        <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-7 mb-6">
          {[0, 1, 2].map(index => (
            <ImageUploader
              key={index}
              index={index}
              currentUrl={currentUrls[index]}
              animalAlt={animalAltForm}
              onUploadSuccess={url => handleImageUploaded(index, url)}
              onRemove={() => handleImageRemoved(index)}
            />
          ))}
        </div>
        {errors.urls && (
          <p className="text-red-700 mb-8">{errors.urls.message}</p>
        )}

        <div className="flex flex-col md:flex-row gap-6 justify-end mt-12">
          <button
            type="button"
            disabled={isLoading}
            onClick={() => navigate('/dashboard/animals')}
            className="mt-8 md:mt-0 w-full md:w-60  h-14 font-medium rounded-(--radius-button)  border-[1.4px] hover:bg-brown hover:border-0 hover:text-lin  border-brown cursor-pointer"
          >
            Annuler
          </button>
          <ButtonTerracota
            type="submit"
            disabled={isLoading}
            value={isEdit ? 'Modifier' : 'Ajouter'}
            className="w-full md:w-60 mt-4 md:mt-0"
          />
        </div>
      </form>
    </section>
  );
}
