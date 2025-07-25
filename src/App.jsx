import { Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import Home from './Components/Home';
import Header from './Components/Header';
import AddMovie from './Components/AddMovie';
import EditMovie from './Components/EditMovie';
import SingleMovie from './Components/SingleMovie';
import Footer from './Components/Footer';
import NewSection from './Components/NewSection';
import TrendingGenres from './Components/TrendingGenres';
import Testimonials from './Components/Testimonials';

function App() {
  const location = useLocation(); 

  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-movie" element={<AddMovie />} />
        <Route path="/edit-movie/:id" element={<EditMovie />} />
        <Route path="/single-movie/:id" element={<SingleMovie />} />
      </Routes>

      {location.pathname === '/' && (
        <>
          <NewSection />
          <Testimonials />
          <TrendingGenres />
        </>
      )}

      <Footer />
    </>
  );
}

export default App;
