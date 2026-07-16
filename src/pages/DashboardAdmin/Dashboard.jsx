import React from 'react';
import { SectionAdmin } from '../../components/ui/Sections';
import { Helmet } from 'react-helmet-async';

export default function Dashboard() {
  return (
    <>
      <Helmet>
        <title>Tableau de bord</title>
      </Helmet>
      <SectionAdmin
        title={'Tableau de bord'}
        paragraph={'Statisitiques refuge'}
      ></SectionAdmin>
    </>
  );
}
