import React from "react";

import "./MovieDetail.css";

function MovieDetail({movie}) {

    return (
        <div className="movie-detail-container">
            <img alt="thumbnail" className="tumbnail-detail" src={movie.thumbnail}></img>
            <p className="movie-description">{movie.description}</p>

        </div>
    )
}

export default MovieDetail;
