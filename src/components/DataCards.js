import { FaRegHeart } from 'react-icons/fa6';
import { LuShield } from 'react-icons/lu';
import { FiHome } from 'react-icons/fi';
import {
  PiNumberCircleOneFill,
  PiNumberCircleTwoFill,
  PiNumberCircleThreeFill,
  PiNumberCircleFourFill,
} from 'react-icons/pi';
import { CiMail } from 'react-icons/ci';
import { BsTelephone, BsPinMap } from 'react-icons/bs';

export const dataMisson = [
  {
    id: 1,
    icon: FaRegHeart,
    title: 'Sauvetage',
    text: 'Nous recueillons les animaux abandonnés et leur offrons les soins nécessaires.',
  },
  {
    id: 2,
    icon: LuShield,
    title: 'Protection',
    text: 'Chaque animal reçoit un suivi médical complet et est identifié.',
  },
  {
    id: 3,
    icon: FiHome,
    title: 'Adoption',
    text: 'Nous accompagnons chaque famille pour trouver le compagnon idéal.',
  },
];

export const dataHow = [
  {
    id: 1,
    icon: PiNumberCircleOneFill,
    title: 'Découvrez',
    text: 'Parcourez notre catalogue et trouvez votre futur compagnon.',
  },
  {
    id: 2,
    icon: PiNumberCircleTwoFill,
    title: 'Contactez-nous',
    text: 'Prenez contact avec nous pour organiser une rencontre.',
  },
  {
    id: 3,
    icon: PiNumberCircleThreeFill,
    title: 'Rencontrez',
    text: "Faites connaissance avec l'animal dans notre refuge.",
  },
  {
    id: 4,
    icon: PiNumberCircleFourFill,
    title: 'Adoptez',
    text: "Finalisez l'adoption et accueillez votre nouveau compagnon.",
  },
];

export const dataContact = [
  {
    id: 1,
    icon: CiMail,
    title: 'Email',
    link: 'mailto:contact@seconde-chance.fr',
    text: 'contact@seconde-chance.fr',
  },
  {
    id: 2,
    icon: BsTelephone,
    title: 'Téléphone',
    link: 'tel:0123456789',
    text: '01 23 45 67 89',
  },
  {
    id: 3,
    icon: BsPinMap,
    title: 'Adresse',
    link: 'https://www.google.com/maps/place/H%C3%B4tel71/@45.7368557,4.8200765,17z/data=!3m1!4b1!4m6!3m5!1s0x47f4eb3c7c5a9b19:0xad4f12f554639cfb!8m2!3d45.7368557!4d4.8200765!16s%2Fg%2F11fl7dhr5p?entry=ttu&g_ep=EgoyMDI2MDUxMy4wIKXMDSoASAFQAw%3D%3D',
    text: '71 quai Perrache, 69002 Lyon',
    target: 'blank',
  },
];
