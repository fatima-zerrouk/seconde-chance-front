import { Outlet } from 'react-router-dom';
import SideBar from './Sidebar';

export default function AdminLayout() {
  return (
    <div className="flex h-screen"> 
      <SideBar /> 
      <main className="flex-1 w-full overflow-x-auto ">
        <Outlet />
      </main>
    </div>
  );
}