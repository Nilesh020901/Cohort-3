import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function MoviesList() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/movies');
        setMovies(response.data);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };
    fetchMovies();
  }, []);

  return (
    <div>
      <h1>Movies List</h1>
      <div>
        {movies.map((movie) => (
          <div key={movie.id}>
            <Link to={`/movie/${movie.id}`}>
              <h2>{movie.title}</h2>
            </Link>
            <p>{movie.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MoviesList;
