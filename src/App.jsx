// import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Header } from './components/layout/Header';
import Home from './pages/Home';

function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
