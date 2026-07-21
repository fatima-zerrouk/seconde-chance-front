import React from 'react';
import { LinkTerracota } from '../components/ui/Buttons';
import OptimizedImage from '../components/ui/OptimizedImage';
import { Helmet } from 'react-helmet-async';
import { SectionSubtitles } from '../components/ui/Sections';
import { CardRules } from '../components/ui/Cards';
import { dataRules } from '../components/DataCards';
import { HashLink } from 'react-router-hash-link';

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
          alt="Photo bannière avec deux chatons roux"
          width="380"
          height="253"
          lazy={false}
          fetchPriority="high"
          className="relative z-10 w-full lg:transform-origin-bottom-left lg:scale-113 h-auto lg:-ml-5 lg:-mb-4"
        />

        <div className="relative">
          <h1 className="title-h1 mb-8">
            Règles
            <span className="font-medium"> pour une adoption</span> réussie
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
            <HashLink
              to="/#adopt"
              className="md:hover:z-30 w-full md:w-50  hover:translate-x-5 flex justify-center items-center mt-8 h-14 font-medium rounded-(--radius-button) border-2  hover:bg-brown hover:border-0 hover:text-lin transition duration-400 ease-in-out border-terracotta cursor-pointer"
            >
              Comment adopter
            </HashLink>
          </div>
        </div>
      </section>

      <SectionSubtitles
        title={"Conditions d'adoption"}
        paragraph={
          'Adopter un animal est un acte  de responsabilité. Voici ce que vous devez savoir avant de vous engager.'
        }
        className="text-center"
      >
        <div className="justify-items-center">
          {dataRules.map(rule => (
            <CardRules key={rule.id} {...rule} />
          ))}

          <CardRules
            className="bg-lin"
            title={'Avant de vous décider'}
            text={
              "Adopter un animal est une décision importante qui ne doit pas être prise à la légère. Prenez le temps de réfléchir et n'hésitez pas à nous contacter pour toute question. Notre équipe est là pour vous accompagner et vous aider à trouver le compagnon qui correspond vraiment à votre mode de vie."
            }
          />

          <p className="mb-6">Prêt à donner une seconde chance à un animal ?</p>
          <LinkTerracota
            to={'/catalog'}
            value={'Découvrez nos animaux'}
            ariaLabel={'Lien qui mène à la page du catalogue animal '}
            className="w-60 duration-500 hover:translate-x-5"
          />
        </div>
      </SectionSubtitles>
    </>
  );
}
