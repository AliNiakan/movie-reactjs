import React, { useEffect, useState, useContext } from "react";
import Navbar from "../Navbar/Navbar";
import MovieCard from "../MovieCard/MovieCard"
import "./Favorites.css";
import ErrorPage from "../Error/ErrorPage"
import AuthContext from "../../context/AuthContext";
import config from '../../config.json';
const URL = config.api_url;

function Favorites() {
    const { authTokens } = useContext(AuthContext);
    const [favoriteMovies, setFavoriteMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        async function getFavoriteMovies() {
            try {
                const response = await fetch(`${URL}/movie/favorite/all/`, {
                    headers: {
                        "Authorization": `Bearer ${authTokens.access}`,
                    }
                });

                const data = await response.json();
                if (!data.success) {
                    setErrorMessage(data.message);
                }
                setFavoriteMovies(data.movies);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching favorite movies:', error);
                setLoading(false);
            }
        }

        getFavoriteMovies();
    }, [authTokens.access]);


    if (errorMessage) {
        return (
            <>
                <Navbar />
                <ErrorPage message={errorMessage} />;
            </>
        )
    }

    return (
        <div>
            <Navbar />
            <div className="favorites-container">
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    favoriteMovies.map((movie) => (
                        <a href={`/movie/${movie.id}`}>
                            <MovieCard key={movie.id} data={movie} />
                        </a>
                    ))
                )}
            </div>
        </div>
    );
}

export default Favorites;
