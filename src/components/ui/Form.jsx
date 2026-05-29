// 1 première version
// import React from 'react';
// import { FieldAdd, Select } from './Field';
// import { ButtonTerracota } from './Buttons';

// export default function Form() {
//   return (
//     <section>
//       <form
//         action=""
//         className="flex justify-center rounded-(--radius-card) shadow-card  bg-lin p-8 h-auto transition-all duration-300 ease-in-out"
//       >
//         <fieldset className="">
//           <ul className="">
//             <FieldAdd
//               label={'Nom'}
//               type="text"
//               htmlFor={'name'}
//               id={'name'}
//               placeholder="Ex: Luna"
//               className=" w-60"
//             />
//             <FieldAdd
//               label={'Age'}
//               type="text"
//               htmlFor={'age'}
//               id={'age'}
//               placeholder="Ex: 2"
//               className=" w-60"
//             />
//             <Select
//               label={'Espèce'}
//               htmlFor={'specie'}
//               id={'specie'}
//             name={'specie'}
//               option={''}
//             />

//             <Select label={'Race'} htmlFor={'breed'} id={'breed'} name={'breed'} option={''} />
//             <Select
//               label={'Sexe'}
//               htmlFor={'gender'}
//               id={'gender'}
//               name={'gender'}
//               option={''}
//             />
//             <Select label={'Taille'} htmlFor={'size'} id={'size'} name={'size'} option={''} />
//           </ul>

//         </fieldset>

//         <ButtonTerracota value={"d"} />
//       </form>
//     </section>
//   );
// }

// 2 AVEC
import React, { useState } from 'react';
import { FieldAdd, Select } from './Field';
import { ButtonTerracota } from './Buttons';
import { useNavigate } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { FaStarOfLife } from 'react-icons/fa6';

export default function Form() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);
  const { apiFetch } = useFetch();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({ mode: 'onTouched' });

  const handleSubmitForm = async data => {
    try {
      setLoading(true);
      const response = await apiFetch('/animals/', {
        method: 'POST',
        body: JSON.stringify(data),
      });

      if (response?.validationErrors) {
        response.validationErrors.forEach(validationError => {
          setError(validationError.path, { message: validationError.msg });
        });
        return;
      }

      toast.success('Animal créé');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.message);
      setErr(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Chargement en cours</p>;
  if (err) return <p>{'Erreur en cours : ' + err}</p>;

  return (
    <section>
      {' '}
      <form
        onSubmit={handleSubmit(handleSubmitForm)}
        className="flex flex-col  rounded-(--radius-card) shadow-card  bg-lin p-8 w-full h-auto transition-all duration-300 ease-in-out"
      >
        <fieldset className="">
          <legend className="mb-4">Test form</legend>
          <ul className="">
            <FieldAdd
              label={'Nom'}
              type="text"
              htmlFor={'name'}
              id={'name'}
              placeholder="Ex: Luna"
              className=" w-60"
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
            {errors.age && <p className="text-red-700">{errors.age.message}</p>}

            <Select
              label={'Espèce'}
              htmlFor={'specie'}
              id={'specie'}
              name={'specie'}
              option={''}
              {...register('specie', {
                required: "L'espece est requise",
              })}
            >
              <option value="">Mettre vrai info</option>
            </Select>
            {errors.specie && (
              <p className="text-red-700">{errors.specie.message}</p>
            )}

            <Select
              label={'Race'}
              htmlFor={'breed'}
              id={'breed'}
              name={'breed'}
              option={''}
              {...register('breed', {
                required: 'La race est requise',
              })}
            >
              <option value="">Mettre vrai info</option>
            </Select>
            {errors.breed && (
              <p className="text-red-700">{errors.breed.message}</p>
            )}

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
              <option value="">Mettre vrai info</option>
            </Select>
            {errors.gender && (
              <p className="text-red-700">{errors.gender.message}</p>
            )}

            <Select
              label={'Taille'}
              htmlFor={'size'}
              id={'size'}
              name={'size'}
              option={''}
              {...register('size', {
                required: 'La talle est requise',
              })}
            >
              <option value="">Mettre vrai info</option>
            </Select>
            {errors.size && (
              <p className="text-red-700">{errors.size.message}</p>
            )}
          </ul>
        </fieldset>

        <label htmlFor="desc" className="flex flex-row gap-4 font-medium">
          Description <FaStarOfLife className="text-red-700 w-2 h-auto" />
        </label>
        <textarea
          name="desc"
          id="desc"
          placeholder="Décrivez son caractère et ses besoins."
          className="bg-white 
        mt-2 mb-4 rounded-(--radius-input) border-[1.4px] border-brown w-full h-124 p-2"
          {...register('desc', {
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
        {errors.desc && <p className="text-red-700">{errors.desc.message}</p>}

        <ButtonTerracota
          type="submit"
          value="Ajouter"
          className="w-full md:w-60 mt-4"
        />
        <button
          onClick={() => navigate('/dashboard')}
          className="mt-8 w-full md:w-60  h-14 font-medium rounded-(--radius-button) border-2 hover:bg-brown hover:border-0 hover:text-lin  border-brown cursor-pointer"
        >
          Annuler
        </button>
      </form>
    </section>
  );
}
