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
// Auth Components
import { AuthProvider } from './contexts/AuthContext';
import Login from './Components/Auth/Login';
import SignUp from './Components/Auth/SignUp';
import ForgotPassword from './Components/Auth/ForgotPassword';
import Profile from './Components/Auth/Profile';
import PrivateRoute from './Components/Auth/PrivateRoute';

function App() {
  const location = useLocation(); 

  return (
    <AuthProvider>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/profile" element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        } />
        <Route path="/add-movie" element={
          <PrivateRoute>
            <AddMovie />
          </PrivateRoute>
        } />
        <Route path="/edit-movie/:id" element={
          <PrivateRoute>
            <EditMovie />
          </PrivateRoute>
        } />
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
    </AuthProvider>
  );
}

export default App;
