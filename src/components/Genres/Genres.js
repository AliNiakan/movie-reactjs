import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import GenreCard from "../GenreCard/GenreCard";
import "./Genres.css"

import config from '../../config.json';
const URL = config.api_url;

function Genres() {
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        async function getGenres() {
            const response = await fetch(`${URL}/movie/genres`);
            const data = await response.json();
            setGenres(data.genres);
        }
        getGenres();
    }, [URL]);

    return (
        <div>
            <Navbar />
            <div className="genres">
                {genres.map((genre) => (
                    <GenreCard key={genre.id} genre={genre} />
                ))}
            </div>
        </div>
    );
}

export default Genres;
