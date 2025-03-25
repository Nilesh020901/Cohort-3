import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState({});
  const [reviews, setReviews] = useState([]);
  
  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const movieResponse = await axios.get(`http://localhost:5000/api/movies/${id}`);
        const reviewsResponse = await axios.get(`http://localhost:5000/api/movies/${id}/reviews`);
        setMovie(movieResponse.data);
        setReviews(reviewsResponse.data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };
    fetchMovieDetails();
  }, [id]);

  return (
    <div>
      <h1>{movie.title}</h1>
      <p>{movie.description}</p>
      <div>
        <h2>Reviews</h2>
        {reviews.map((review) => (
          <div key={review.id}>
            <p>{review.text}</p>
            <p>Rating: {review.rating}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MovieDetails;
