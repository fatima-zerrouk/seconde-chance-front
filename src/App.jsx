// import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Header } from './components/layout/Header';
import Home from './pages/Home';
import { Footer } from './components/layout/Footer';

function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
