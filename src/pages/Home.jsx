import React from 'react';
import OptimizedImage from '../components/ui/OptimizedImage';
import { LinkTerracota } from '../components/ui/Buttons';
import { SectionSubtitles } from '../components/ui/Sections';
import { CardContact, CardHow, CardMission } from '../components/ui/Cards';
import { dataContact, dataHow, dataMisson } from '../components/DataCards';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';

export default function Home() {
  return (
    <>
      <section className=" flex flex-col justify-between pb-14 md:pb-6 lg:flex-row-reverse items-center bg-lin px-(--margin-mobile) md:px-(--margin-desktop)">
        <OptimizedImage
          src="/assets/dog-home.png"
          alt="Photo bannière d'un chien marron dans un drap"
          width="910"
          height="1820"
          lazy={false}
          fetchPriority="high"
          className="lg:mr-80 w-full max-w-60 md:max-w-66 h-auto animate-balance origin-top"
        />

        <div>
          <h1 className="title-h1 mb-8">
            <span className="font-medium block"> Offrez une </span>seconde
            chance <span className="font-medium block"> à un compagnon</span>
          </h1>

          <p>
            Chaque animal mérite un foyer aimant. Découvrez nos{' '}
            <span className="inline-block">
              chiens et chats qui attendent une famille.
            </span>
          </p>

          <div className="sm:flex gap-8">
            <LinkTerracota
              to={'/catalog'}
              value={'Découvrez nos animaux'}
              ariaLabel={'Lien qui mène à la page du catalogue animal '}
              className=" w-full md:w-62 mt-8  duration-500 hover:translate-x-5"
            />
            <a
              href="#adopt"
              className="  hover:translate-x-5 flex justify-center items-center mt-8 h-14 font-medium rounded-(--radius-button) border-2  hover:bg-brown hover:border-0 hover:text-lin transition duration-500 ease-in-out w-full md:w-52 border-terracotta cursor-pointer"
            >
              Comment adopter
            </a>
          </div>
        </div>
      </section>

      <SectionSubtitles title={'Notre mission'}>
        <p>
          Seconde Chance œuvre chaque jour pour offrir une nouvelle vie aux
          <span className="md:inline-block">
            {' '}
            animaux abandonnés et les reconnecter avec des familles aimantes.
          </span>
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 mt-12 ">
          {dataMisson.map(card => (
            <CardMission
              key={card.id}
              icon={card.icon}
              title={card.title}
              text={card.text}
            />
          ))}
        </div>
      </SectionSubtitles>

      <section className="bg-lin flex flex-col gap-12 lg:flex-row md:items-center md:justify-between py-12 md:py-16 px-(--margin-mobile) md:px-(--margin-desktop)">
        <div>
          <h2 className="title-h2">L&apos;adoption responsable</h2>
          <p className="pb-6 pt-2">
            Adopter un animal est un engagement à long
            <span className="block">
              terme qui demande réflexion, temps et ressources.
            </span>
          </p>

          <p className="flex my-4 gap-2">
            <IoMdCheckmarkCircleOutline className="text-terracotta text-3xl" />
            Un engagement de 10 à 20 ans selon l&apos;espèce
          </p>
          <p className="flex gap-2">
            <IoMdCheckmarkCircleOutline className="text-terracotta text-3xl" />
            Des frais vétérinaires et d&apos;entretien réguliers
          </p>
          <p className="flex my-4 gap-2">
            <IoMdCheckmarkCircleOutline className="text-terracotta text-3xl" />
            Du temps quotidien pour le bien-être de l&apos;animal
          </p>
          <p className="flex gap-2">
            <IoMdCheckmarkCircleOutline className="text-terracotta text-3xl" />
            Un environnement adapté à ses besoins
          </p>
        </div>

        <OptimizedImage
          src="/assets/dog-cat.jpeg"
          alt="Photo d'un chien et d'un chat côte à côte sur l'herbe"
          width="2896"
          height="1704"
          lazy={true}
          fetchPriority="low"
          className="rounded-(--radius-card) w-full sm:max-w-100 lg:max-w-130 "
        />
      </section>

      <SectionSubtitles
        id="adopt"
        className="text-center "
        title={' Comment ça marche ?'}
        paragraph={"Le processus d'adoption en 4 étapes simples."}
      >
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 mt-10 ">
          {dataHow.map(card => (
            <CardHow
              key={card.id}
              icon={card.icon}
              title={card.title}
              text={card.text}
              className={'text-left'}
            />
          ))}
        </div>

        <LinkTerracota
          to={'/catalog'}
          value={'Découvrez nos animaux'}
          className=" w-full md:w-62 mt-11 m-auto duration-500 hover:translate-x-6"
          ariaLabel={'Lien qui mène à la page du catalogue animal '}
        />
      </SectionSubtitles>

      <SectionSubtitles
        className="text-center "
        title={'Notre impact'}
        paragraph={
          "Depuis notre création, nous avons changé la vie de milliers d'animaux."
        }
      >
        <ul className="py-14 flex-col md:flex md:flex-row justify-center md:gap-20">
          <li>
            <h3 className="title-h2 font-extrabold">1248</h3>
            <p>Animaux secourus</p>
          </li>

          <li>
            <h3 className="title-h2 font-extrabold ">1032</h3>
            <p>Adoptions réussies</p>
          </li>
          <li>
            <h3 className="title-h2 font-extrabold ">82%</h3>
            <p>Taux de réussite</p>
          </li>
          <li>
            <h3 className="title-h2 font-extrabold">37</h3>
            <p>Bénévoles</p>
          </li>
        </ul>
      </SectionSubtitles>

      <SectionSubtitles
        className="text-center bg-terracotta "
        title={'Contactez-nous'}
        paragraph={
          "Une question ? N'hésitez pas à nous contacter, notre équipe est là pour vous accompagner."
        }
      >
        <address className="not-italic">
          <ul className="py- flex-col lg:flex lg:flex-row lg:justify-center md:gap-8">
            {dataContact.map(card => (
              <CardContact
                key={card.id}
                icon={card.icon}
                title={card.title}
                text={card.text}
                link={card.link}
                target={card.target}
                className={' text-left my-8'}
              />
            ))}
          </ul>
        </address>
      </SectionSubtitles>
    </>
  );
}
