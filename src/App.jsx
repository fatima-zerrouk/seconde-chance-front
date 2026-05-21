// import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Header } from './components/layout/Header';
import Home from './pages/Home';
import { Footer } from './components/layout/Footer';
import Login from './pages/Login';
import Dashboard from './pages/DashboardAdmin/Dashboard';
import PrivateRoute from './routes/PrivateRoute';
import { Toaster } from 'sonner';
function App() {
  return (
    <div className="flex flex-col h-screen">
      {' '}
      {/* pour dimmension écran */}
      <Toaster richColors position="top-right" />
      <Header />
      <main className="flex-1">
        {/* pour dimmension écran */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute role={'admin'}>
                <Dashboard />
              </PrivateRoute>
            }
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
