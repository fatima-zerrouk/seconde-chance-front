import { FieldAdd, Select } from './Field';
import { ButtonTerracota } from './Buttons';
import { useNavigate } from 'react-router-dom';
// import { useFetch } from '../../hooks/useFetch';
import { useForm } from 'react-hook-form';
// import { toast } from 'sonner';
import { FaStarOfLife } from 'react-icons/fa6';

export default function Form({ onSubmit, animalEdit, animalError }) {
  const navigate = useNavigate();
  const isEdit = Boolean(animalEdit);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onTouched',
    // Si animalEdit existe, React Hook Form pré-remplit les champs tout seul !
    defaultValues: animalEdit,
  });

  return (
    <section>
      {' '}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" rounded-(--radius-card) shadow-card mb-12 bg-lin p-8 w-full h-auto  transition-all duration-300 ease-in-out"
      >
        <fieldset className="">
          <legend className="mb-4">
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
                  valueAsNumber: true, //retourne un nombre "1" en 1

                  validate: value =>
                    Number.isInteger(value) || "L'âge doit être un entier", //isInteger Vérifie nombre entier si 1.1 erreur
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
                // option={''}
                {...register('specie', {
                  required: "L'espèce est requise",
                })}
              >
                <option value="Cat">Chat</option>
                <option value="Dog">Chien</option>
              </Select>
              {errors.specie && (
                <p className="text-red-700">{errors.specie.message}</p>
              )}
            </li>
            <li>
              <Select
                label={'Race'}
                htmlFor={'id_breed'}
                id={'id_breed'}
                name={'breed'}
                option={''}
                {...register('id_breed', {
                  required: 'La race est requise',
                  valueAsNumber: true, // Convertit la chaîne "1" en nombre 1
                })}
              >
                <option value="1">Labrador Retriever</option>
                <option value="2">Berger Allemand</option>
                <option value="11">Siamois</option>
                <option value="12">Maine Coon</option>
              </Select>
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

        {animalError && <p className="text-red-700 mb-4">{animalError}</p>}

        <div className="flex flex-col md:flex-row gap-6 justify-end mt-4 m">
          <button
            onClick={() => navigate('/dashboard')}
            className="mt-8 md:mt-0 w-full md:w-60  h-14 font-medium rounded-(--radius-button)  border-[1.4px] hover:bg-brown hover:border-0 hover:text-lin  border-brown cursor-pointer"
          >
            Annuler
          </button>
          <ButtonTerracota
            type="submit"
            value={isEdit ? 'Modifier' : 'Ajouter'}
            className="w-full md:w-60 mt-4 md:mt-0"
          />
        </div>
      </form>
    </section>
  );
}
