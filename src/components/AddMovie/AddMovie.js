import React, { useState, useContext } from "react";
import Navbar from "../Navbar/Navbar";
import "./AddMovie.css"
import AuthContext from "../../context/AuthContext";
import config from '../../config.json';
const URL = config.api_url

function AddMovie() {
  const { authTokens } = useContext(AuthContext)
  const [genresList, setGenresList] = React.useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);

  const [thumbnail, setThumbnail] = useState(null);
  const [images, setImages] = useState([]);

  const handleRefresh = () => {
    window.location.reload(); 
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    setThumbnail(file);
  };

  const handleImagesChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
  };

  const handleGenreChange = (genre) => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter((selectedGenre) => selectedGenre !== genre));
    } else {
      setSelectedGenres([...selectedGenres, genre]);
    }
  };

  React.useEffect(() => {
    async function getGenres() {
      try {
        const response = await fetch(`${URL}/movie/genres/`);
        const data = await response.json();
        const genreTitles = data.genres.map(genre => genre.title);
        setGenresList(genreTitles);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    }
    getGenres();
  }, []);


  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(); 

    formData.append('thumbnail', thumbnail); 

    images.forEach((image) => {
      formData.append('images', image);
    });

    formData.append('title', e.target['movie-title'].value);
    formData.append('publish_year', parseInt(e.target['movie-publish-year'].value));
    formData.append('type', e.target['movie-type'].value);
    formData.append('description', e.target['movie-description'].value);

    selectedGenres.forEach((genre) => {
      formData.append('genres', genresList.indexOf(genre) + 1);
    });

    try {
      const response = await fetch(`${URL}/movie/add/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authTokens.access}`,
        },
        body: formData, 
      });
      const responseData = await response.json();
      if (response.ok) {
        alert(`Movie added.`)
        handleRefresh()
      } else {

        console.error("Failed to add movie.");
        console.error("Error data:", responseData);
      }
    } catch (error) {
      console.error("Error adding movie:", error);
    }
  };



  return (
    <div className="add-movie--container">
      <Navbar />
      <div className="add-movie">
        <form method="POST" className="add-movie-form" onSubmit={handleFormSubmit} encType="multipart/form-data">
          <h1>Add Movie</h1>
          <label htmlFor="movie-title">Movie Title</label>
          <input type="text" name="movie-title" />

          <label htmlFor="movie-publish-year">Publish year</label>
          <input type="number" defaultValue="2000" name="movie-publish-year" />

          <label htmlFor="movie-type">Movie Type</label>
          <input type="text" name="movie-type" />

          <label htmlFor="movie-description" className="bigger-description">
            Movie Description
          </label>
          <input type="text" name="movie-description" />

          <label>Genres</label>
          <div className="genre-checkboxes">
            {genresList.map((genre) => (
              <label key={genre}>
                <input
                  type="checkbox"
                  name="genres"
                  value={genre}
                  checked={selectedGenres.includes(genre)}
                  onChange={() => handleGenreChange(genre)}
                />
                {genre}
              </label>
            ))}
          </div>

          <label htmlFor="movie-thumbnail">Thumbnail</label>
          <input type="file" name="movie-thumbnail" accept="image/*" onChange={handleThumbnailChange} />

          <label htmlFor="movie-images" >Images (You can use multiple images)</label>
          <input type="file" accept="image/*" multiple onChange={handleImagesChange} name="movie-images" />

          <button type="submit" className="movie--add">
            Done.
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddMovie;
