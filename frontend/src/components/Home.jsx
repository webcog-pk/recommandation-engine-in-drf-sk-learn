import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {  Link } from 'react-router-dom'; // Import Link from react-router-dom
import './Home.css'; // Import the CSS file for styling

function Home() {
  const [movies, setMovies] = useState([]); // State to hold movies data
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [error, setError] = useState(null); // State to manage error

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/movies/'); // Update the endpoint to fetch movies
        console.log(response.data); // Log the response data
        setMovies(response.data.movies || response.data); // Use response.data.movies if it's an object
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []); // Empty dependency array means this effect runs once on mount

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>Error: {error}</h2>;
  }

  // Ensure movies is an array before mapping
  if (!Array.isArray(movies)) {
    return <h2>No movies available</h2>;
  }

  const getPosterUrl = (path) => {
    return `https://image.tmdb.org/t/p/w500${path}`;
  };


  return (
    <div className="home">
      <h1>All Movies</h1>
      <div className="movies-container">
        {movies.map(movie => (
          <div key={movie.id} className="movie-card"> {/* Use movie.id instead of show.show_id */}
            {/* <img 
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
              alt={movie.title} 
              className="movie-poster" 
            />  */}
            <img 
              src={getPosterUrl(movie.poster_path)} 
              alt={movie.title} 
              className="movie-poster" 
              onError={(e) => { e.target.onerror = null; e.target.src = 'https://t3.ftcdn.net/jpg/04/62/93/66/360_F_462936689_BpEEcxfgMuYPfTaIAOC1tCDurmsno7Sp.jpg'; }} // Fallback to default image
            />
            <h3>{movie.title}</h3>
            <p><strong>Original Title:</strong> {movie.original_title}</p>
            <p><strong>Release Date:</strong> {new Date(movie.release_date).toLocaleDateString()}</p> {/* Format release date */}
            <p><strong>Runtime:</strong> {movie.runtime} minutes</p>
            <p><strong>Genres:</strong> {Array.isArray(movie.genres) ? movie.genres.map(genre => genre.name).join(', ') : movie.genres}</p> {/* Handle genres */}
            <p><strong>Popularity:</strong> {movie.popularity}</p>
            <p><strong>Vote Average:</strong> {movie.vote_average}</p>
            < p><strong>Vote Count:</strong> {movie.vote_count}</p>
            <Link to={`/movie/${movie.id}`} className="detail-link">Check Detail</Link> {/* Use Link for navigation */}


          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;