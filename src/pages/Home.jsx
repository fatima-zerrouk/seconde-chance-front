import React from 'react';
import OptimizedImage from '../components/ui/OptimizedImage';
import { ButtonTerracota } from '../components/ui/Buttons';

export default function Home() {
  return (
    <>
      <section className="flex flex-col justify-between pb-16 md:pb-10 lg:flex-row-reverse items-center bg-lin px-(--margin-mobile) md:px-(--margin-desktop)">
        <OptimizedImage
          src="src/assets/dog-home.png"
          alt="Photo bannière d'un chien marron dans un drap"
          width="260"
          height="520"
          lazy={false}
          className="lg:mr-80 "
        />

        <div className="">
          <h1 className="title-h1 mb-8">
            <span className="font-medium block"> Offrez une </span>seconde
            chance <span className="font-medium block"> à un compagnon</span>
          </h1>

          <p className="m">
            Chaque animal mérite un foyer aimant. Découvrez nos{' '}
            <span className="inline-block">
              chiens et chats qui attendent une famille.
            </span>
          </p>

          <div className="sm:flex gap-6">
            <ButtonTerracota
              type="submit"
              value={'Découvrez nos animaux'}
              className=" w-full md:w-62 mt-8"
            />
            <button
              id="adopt"
              className="mt-8 h-14 font-medium rounded-(--radius-button) border-2  hover:bg-brown hover:border-0 hover:text-lin transition duration-300 ease-in-out w-full md:w-52 border-terracotta cursor-pointer"
            >
              Comment adopter
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
