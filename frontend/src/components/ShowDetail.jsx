import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom'; // Import Link from react-router-dom
import './ShowDetail.css'; // Import the CSS file for styling

function ShowDetail() {
  const { id } = useParams(); // Get the movie ID from the URL
  const [movie, setMovie] = useState(null); // State to hold movie details
  const [similarMovies, setSimilarMovies] = useState([]); // State to hold similar movies
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [error, setError] = useState(null); // State to manage error

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/movies/${id}/`); // Update the endpoint to fetch movie details
        setMovie(response.data.movies); // Set the movie details
        setSimilarMovies(response.data.similar_movies); // Set similar movies
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]); // Fetch details when the component mounts or when the ID changes

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>Error: {error}</h2>;
  }

  if (!movie) {
    return <h2>No movie details available</h2>;
  }

  const getPosterUrl = (path) => {
    return `https://image.tmdb.org/t/p/w500${path}`;
  };


  return (
    <div className="show-detail">
      <h1>{movie.title}</h1>
      {/* <img 
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
        alt={movie.title} 
        className="movie-poster" 
      /> */}
       <img 
              src={getPosterUrl(movie.poster_path)} 
              alt={movie.title} 
              className="movie-poster" 
              onError={(e) => { e.target.onerror = null; e.target.src = 'https://t4.ftcdn.net/jpg/04/70/29/97/360_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg'; }} // Fallback to default image
            />
      <b>Original Title: {movie.original_title}</b>
      <div className="show-info">
        <p><strong>Overview:</strong> {movie.overview}</p>
        <p><strong>Release Date:</strong> {new Date(movie.release_date).toLocaleDateString()}</p>
        <p><strong>Runtime:</strong> {movie.runtime} minutes</p>
        <p><strong>Genres:</strong> {Array.isArray(movie.genres) ? movie.genres.map(genre => genre.name).join(', ') : movie.genres}</p>
        <p><strong>Popularity:</strong> {movie.popularity}</p>
        <p><strong>Vote Average:</strong> {movie.vote_average}</p>
        <p><strong>Vote Count:</strong> {movie.vote_count}</p>
        <Link to="/" className="detail-link">Go Home</Link> {/* Use Link for navigation */}
      </div>
      <h3 style={{ color: "red" }}>Similar Movies</h3>
      <hr />
      <div className="similar-movies">
        {similarMovies.map(similarMovie => (
          <div key={similarMovie.id} className="similar-movie">
            <h2>{similarMovie.title}</h2>
           
            <b>Original Title: {similarMovie.original_title}</b>
            <p><strong>Overview:</strong> {similarMovie.overview}</p>
            <p><strong>Release Date:</strong> {new Date(similarMovie.release_date).toLocaleDateString()}</p>
            <Link to={`/movies/${similarMovie.id}`} className="detail-link">Check Detail</Link> {/* Use Link for similar movie detail */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ShowDetail;