import React from 'react';
import { LinkTerracota } from '../components/ui/Buttons';
import OptimizedImage from '../components/ui/OptimizedImage';
import { Helmet } from 'react-helmet-async';
import { SectionSubtitles } from '../components/ui/Sections';

export default function AnimalTerms() {
  return (
    <>
      <Helmet>
        <title>Conditions d&apos;adoptions</title>
        <meta
          name="description"
          content=" Adopter un animal est un acte de responsabilité. Voici ce que vous
            devez savoir avant de vous engager."
        />
      </Helmet>

      <section className="relative flex flex-col justify-between  pb-16 lg:flex-row-reverse items-center bg-cream px-(--margin-mobile) md:lts md:ps-20">
        <OptimizedImage
          src="/assets/cats.png"
          alt="Photo bannière d'un chien marron dans un drap"
          width="380"
          height="253"
          lazy={false}
          fetchPriority="high"
          // className="w-full h-auto z-10"
          className="relative z-10 w-full lg:transform-origin-bottom-left lg:scale-114 h-auto lg:-ml-5 lg:-mb-4"
        />

        <div className="relative">
          <h1 className="title-h1 mb-8 ">
            Règles
            <span className="font-medium "> pour une adoption</span> réussie
          </h1>

          <p>
            Adopter un animal est un acte de responsabilité.
            <span className="inline-block">
              {' '}
              Voici ce que vous devez savoir avant de vous engager.{' '}
            </span>
          </p>

          <div className="sm:flex gap-8">
            <LinkTerracota
              to={'/catalog'}
              value={'Découvrez nos animaux'}
              ariaLabel={'Lien qui mène à la page du catalogue animal '}
              className="w-full md:w-60 mt-8 duration-500 hover:translate-x-5"
            />
            <a
              href="#adopt"
              className="md:hover:z-30 w-full md:w-50  hover:translate-x-5 flex justify-center items-center mt-8 h-14 font-medium rounded-(--radius-button) border-2  hover:bg-brown hover:border-0 hover:text-lin transition duration-400 ease-in-out border-terracotta cursor-pointer"
            >
              Comment adopter
            </a>
          </div>
        </div>
      </section>

      <SectionSubtitles></SectionSubtitles>
    </>
  );
}
