import React, { useEffect, useState } from "react";
import MovieCard from "../MovieCard/MovieCard"
import { useParams } from 'react-router-dom';
import ErrorPage from "../Error/ErrorPage";
import Navbar from "../Navbar/Navbar";
import "./GenreMovies.css"
import config from '../../config.json';
const URL = config.api_url;

function GenreMovies() {
    const { genre } = useParams();
    const [movies, setMovies] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);
    useEffect(() => {
        async function getMovies() {

            const response = await fetch(`${URL}/movie/all/genre/${genre}/`);
            const data = await response.json();
            setMovies(data.movies);
            if (!data.success) {
                setErrorMessage(data.message);

            }

        }

        getMovies();
    }, [genre]);

    if (errorMessage) {
        return (
            <>
                <Navbar />
                <ErrorPage message={errorMessage} />;
            </>
        )
    }

    return (
        <div className="genremovies">
            <Navbar />
            {movies && movies.map(movie => (
                <a href={`${window.location.origin}/movie/${movie.id}/`} key={movie.id}>
                    <MovieCard data={movie} />
                </a>
            ))}
        </div>
    );
}

export default GenreMovies;
