import React from 'react';
import { SectionAdmin } from '../../components/ui/Sections';
import Form from '../../components/ui/Form';
// import { ButtonTerracota } from '../../components/ui/Buttons';
// import { Field } from '../../components/ui/Field'

export default function AddAnimal() {
  return (
    <SectionAdmin
      title={'Ajouter un animal'}
      paragraph={'Remplissez tous les champs pour ajouter un nouvel animal'}
    >
      <Form />
    </SectionAdmin>
  );
}
