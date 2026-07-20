import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/DashboardAdmin/Dashboard';
import PrivateRoute from './routes/PrivateRoute';
import { Toaster } from 'sonner';
import PublicLayout from './components/layout/PublicLayout';
import AdminLayout from './components/layout/AdminLayout';
import AddAnimal from './pages/DashboardAdmin/AddAnimal';
import UpdateAnimal from './pages/DashboardAdmin/UpdateAnimal';
import AnimalManagement from './pages/DashboardAdmin/AnimalManagement';
import AnimalCatalog from './pages/AnimalCatalog';
import AnimalDetails from './pages/AnimalDetails';

function App() {
  return (
    <>
      <Toaster
        richColors
        position="top-right"
        toastOptions={{
          className: 'mt-16',
        }}
      />

      {/* Routes layout public */}
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/catalog" element={<AnimalCatalog />} />
          <Route path="/catalog/:id" element={<AnimalDetails />} />
        </Route>

        {/* Routes layout ADMIN */}
        <Route element={<AdminLayout />}>
          <Route
            path="/dashboard"
            element={
              <PrivateRoute role={'admin'}>
                <Dashboard />
              </PrivateRoute>
            }
          />

          <Route
            path="/dashboard/animals"
            element={
              <PrivateRoute role={'admin'}>
                <AnimalManagement />
              </PrivateRoute>
            }
          >
            {' '}
          </Route>

          <Route
            path="/dashboard/add"
            element={
              <PrivateRoute role={'admin'}>
                <AddAnimal />
              </PrivateRoute>
            }
          >
            {' '}
          </Route>

          <Route
            path="/dashboard/update/:id"
            element={
              <PrivateRoute role={'admin'}>
                <UpdateAnimal />
              </PrivateRoute>
            }
          ></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
