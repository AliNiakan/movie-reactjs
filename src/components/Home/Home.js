import React, { useEffect, useState } from "react";
import MovieCard from "../MovieCard/MovieCard";
import Navbar from "../Navbar/Navbar";
import config from '../../config.json';
import ErrorPage from "../Error/ErrorPage"
import "./Home.css"

const URL = config.api_url;

const Home = () => {
  const [movieTitle, setMovieTitle] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const movieSearchHandler = (event) => {
    setMovieTitle(event.target.value);
  };

  async function findMovie() {
    try {
      const response = await fetch(`${URL}/movie/search/${movieTitle}`);
      const data = await response.json();
      setMovies(data.movies);
      setError(false);
    } catch (error) {
      setError(true);
      console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {
    const fetchNewMoviesOrSeries = async () => {
      try {
        const response = await fetch(`${URL}/movie/get/newest/`);
        const data = await response.json();
        setMovies(data.movies);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
        console.error('Error fetching data:', error);
      }
    };

    fetchNewMoviesOrSeries();
  }, [URL]);

  if (error) {
    return <ErrorPage />;
  }

  return (
    <div className="home">
      <Navbar />
      <div className="home--search-box">
        <button onClick={findMovie} className="home--done">
          <i className="fas fa-search"></i>
        </button>
        <input type="text" className="home--search" onChange={movieSearchHandler} />
      </div>
      <div className="movie-card-container">
        {loading ? (
          <p>Loading...</p>
        ) : (
          movies.map(movie => (
            <a href={`/movie/${movie.id}`} key={movie.id}>
              <MovieCard data={movie} />
            </a>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
