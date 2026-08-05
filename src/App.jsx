import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/dashboard-admin/Dashboard';
import PrivateRoute from './routes/PrivateRoute';
import { Toaster } from 'sonner';
import PublicLayout from './components/layout/PublicLayout';
import AdminLayout from './components/layout/AdminLayout';
import AnimalAdd from './pages/dashboard-admin/AnimalAdd';
import AnimalUpdate from './pages/dashboard-admin/AnimalUpdate';
import AnimalManagement from './pages/dashboard-admin/AnimalManagement';
import AnimalCatalog from './pages/AnimalCatalog';
import AnimalDetails from './pages/AnimalDetails';
import AnimalTerms from './pages/AnimalTerms';

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
          <Route path="/terms" element={<AnimalTerms />} />
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
                <AnimalAdd />
              </PrivateRoute>
            }
          >
            {' '}
          </Route>

          <Route
            path="/dashboard/update/:id"
            element={
              <PrivateRoute role={'admin'}>
                <AnimalUpdate />
              </PrivateRoute>
            }
          ></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
