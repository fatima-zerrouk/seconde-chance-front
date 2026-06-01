import { Outlet } from 'react-router-dom';
import SideBar from './Sidebar';

export default function AdminLayout() {
  return (
    <div className="flex h-screen">  {/* Sidebar affichée à gauche */}
      <SideBar /> 
      {/*Contenu à droite de la Sidebar */}
      <main className="flex-1 w-full overflow-x-auto ">
        <Outlet />  {/* Affiche la route enfant (dashboard) d'une route parente (AdminLayout)*/}
      </main>
    </div>
  );
}