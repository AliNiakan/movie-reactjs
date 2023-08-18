import React, { useContext } from "react"
import Navbar from "../Navbar/Navbar";
import { useParams, Link } from 'react-router-dom';
import Slider from "react-slick";
import ErrorPage from "../Error/ErrorPage"
import "./MoviePage.css"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AuthContext from "../../context/AuthContext";
import FollowList from "../FollowList/FollowList";
import config from '../../config.json';
const URL = config.api_url

function MoviePage() {
    const { id } = useParams();
    const { authTokens, user } = useContext(AuthContext)
    const [currentMovie, setCurrentMovie] = React.useState();
    const [commentContainsSpoiler, setCommentContainsSpoiler] = React.useState(false);
    const [isFavorite, setIsFavorite] = React.useState();
    const [showSuggestPanel, setShowSuggestPanel] = React.useState(false);
    const [friends, setFriends] = React.useState([])
    const [error, setError] = React.useState(null);
    const commentInput = React.useRef(null);

    const handleRefresh = () => {
        window.location.reload();
    };
    function toggleSuggestPanel() {
        setShowSuggestPanel(!showSuggestPanel);
        getFollowings()
    }

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 800,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    async function addToFavorites() {
        const response = await fetch(`${URL}/movie/favorite/add/${id}/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${authTokens.access}`
            }
        });
        if (response.ok) {
            setIsFavorite(true);
        } 
    }

    async function getFollowings() {
        const response = await fetch(`${URL}/user/followings/me`, {
            headers: {
                "Authorization": `Bearer ${authTokens.access}`
            }
        });
        const data = await response.json();
        setFriends(data.users);
    }

    async function deleteFromFavorites() {
        const response = await fetch(`${URL}/movie/favorite/remove/${id}/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${authTokens.access}`
            }
        });
        if (response.ok) {
            setIsFavorite(false)
        }
    }

    async function suggestToFriend(user) {
        const response = await fetch(`${URL}/user/recommend/movie/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${authTokens.access}`
            },
            body: JSON.stringify({
                username: user,
                movie_id: id
            })
        });
        const data = await response.json()
        if (!data.success) {
            alert(data.message)
            return
        } else {
            alert("Request sent.")
        }

    }


    async function addComment(commentBody) {
        const commentData = {
            movie_id: id,
            is_spoiler: commentContainsSpoiler,
            body: commentBody
        };
        const response = await fetch(`${URL}/movie/add/comment/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${authTokens.access}`
            },
            body: JSON.stringify(commentData)
        });
        const data = await response.json();

        if (!data.success) {
            setError(data.body[0]);
        } else {
            setError(null);
            handleRefresh();
        }
    }




    React.useEffect(() => {
        if (user) {
            const getFavoriteStatus = async () => {
                try {
                    const response = await fetch(`${URL}/movie/favorite/exists/${id}/`, {
                        headers: {
                            Authorization: `Bearer ${authTokens.access}`
                        }
                    });
                    const data = await response.json();
                    setIsFavorite(data.success);
                } catch (error) {
                    console.error('Error fetching favorite status:', error);
                }
            };

            getFavoriteStatus();
        }
    }, [id,]);



    React.useEffect(() => {
        try {
            const getMovie = async () => {
                try {
                    const response = await fetch(`${URL}/movie/detail/${id}/`);
                    const data = await response.json();
                    setCurrentMovie(data.movies);
                } catch (error) {
                    console.error('Error fetching data:', error);
                    setCurrentMovie()
                }
            };

            getMovie();
        }
        catch{
            alert('Something went wrong')
        }
      
    }, [id]);

    if (error) {
        return (
            <>
                <Navbar />
                <ErrorPage message={error} />
            </>
        )
    }

    return (
        <div className="mp--container">
            <Navbar />
            <div className="movie--page">
                {currentMovie ? (
                    <>
                        <h1>{currentMovie.title}</h1>
                        <img src={currentMovie.thumbnail} alt={currentMovie.title} className="thumbnail" />
                        <p>Release Year: {currentMovie.publish_year}</p>
                        <p>Favorites Count: {currentMovie.favorites_count}</p>
                        <p>Type: {currentMovie.type}</p>
                        {user &&
                            <div className="favorites-buttons">
                                {isFavorite ? (
                                    <button onClick={() => deleteFromFavorites()} className="delete-favorite-button">Delete from Favorites</button>
                                ) : (
                                    <button onClick={() => addToFavorites()} className="add-favorite-button">Add to Favorites</button>
                                )}
                            </div>
                        }
                        {user &&
                            <button onClick={() => toggleSuggestPanel()} className="suggest-button">
                                <span>Suggest to a friend </span>
                                <i className="fa fa-share-alt" aria-hidden="true"></i>
                            </button>
                        }
                        {showSuggestPanel && (
                            <div>
                                <FollowList
                                    title="Friends"
                                    users={friends}
                                    onClose={() => setShowSuggestPanel(false)}
                                    showSuggestion={true}
                                    suggestToFriend={suggestToFriend}
                                />
                            </div>
                        )}
                        <p className="description">{currentMovie.description}</p>
                        {/* Additional images slider */}
                        {Array.isArray(currentMovie.images) && currentMovie.images.length > 1 && (
                            <Slider {...sliderSettings}>
                                {currentMovie.images.map((image, index) => (
                                    <img key={index} src={image} alt={`Movie Image ${index + 1}`} className="additional-image" />
                                ))}
                            </Slider>
                        )}
                        <br />
                        <hr />
                        <div className="comments-section">
                            <h2>Comments:</h2>
                            <ul>
                                {currentMovie.comments.map((comment) => (
                                    <li >
                                        <strong>
                                            <a href={`/user/${comment.user.username}`}>
                                                {comment.user.username}
                                            </a>
                                        </strong>: {comment.is_spoiler
                                            ? (
                                                <span className="spoiler">
                                                    {comment.body}
                                                </span>
                                            ) : (
                                                comment.body
                                            )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        {user ?
                            <div className="add-comment">
                                <h2>Add comment:</h2>
                                <input type="text" placeholder="Max char: 500..." ref={commentInput} />
                                <button onClick={() => addComment(commentInput.current.value, commentContainsSpoiler)}>Send</button>
                                <div className="checkbox-container">
                                    <input
                                        type="checkbox"
                                        id="spoilerCheckbox"
                                        className="checkbox-input"
                                        checked={commentContainsSpoiler}
                                        onChange={() => setCommentContainsSpoiler(!commentContainsSpoiler)}
                                    />
                                    <label className="checkbox-label" htmlFor="spoilerCheckbox">
                                        Check this box if your comment contains spoilers
                                    </label>
                                </div>
                            </div>
                            :
                            <div className="add-comment">
                                <h2>
                                    <i class="fa fa-warning"></i>
                                    <Link to="/login">Login</Link> to add comment
                                </h2>
                            </div>
                        }
                    </>
                ) : (
                    <p>Loading...</p>
                )
                }
            </div >
        </div >
    );
}

export default MoviePage;
