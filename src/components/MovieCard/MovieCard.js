import React from "react";
import "./MovieCard.css"

function MovieCard(props) {

    return (
        <div className="movie-card-container">
            <div className="movie-card">
                <img className="movie-poster" src={props.data.thumbnail} alt={props.data.title} />
                <div className="movie-details">
                    <h2 className="movie-title movie-title-ellipsis">{props.data.title}</h2>
                    <p className="movie-info">
                        Year: <span className="movie-info-details">{props.data.publish_year}</span>
                    </p>
                    <p className="movie-info">
                        Type: <span className="movie-info-details">{props.data.type}</span>
                    </p>
                    <p>
                        {props.data.favorites_count}
                        <i className="fa fa-star" aria-hidden="true" style={{color:'#FFD700'}}></i>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default MovieCard