import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MoviesList from './components/MoviesList';
import MovieDetails from './pages/MovieDetails';
import LoginPage from './pages/LoginPage';
import AdminPanel from './pages/AdminPanel';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MoviesList />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </div>
  );
}

export default App;
