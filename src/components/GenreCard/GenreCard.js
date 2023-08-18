import React from "react";


const GenreCard = ({ genre }) => {
    const { slug, title, image, color } = genre;
    const handleClick = () => {
        window.location.href = `/genres/${slug}`;
    };
    return (
        <div onClick={handleClick} className={`genrecard genrecard-${title.toLowerCase()}`} style={{ backgroundColor: color }}>
            <img  src={image} alt={title} />
            <h3>{title}</h3>
        </div>
    );
};

export default GenreCard;