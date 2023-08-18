import React, { useContext } from "react";
import MovieDetail from './MovieDetail';
import "./Message.css";
import AuthContext from "../../context/AuthContext";
import config from "../../config.json"
const URL = config.api_url;

function Message({ id, movie, username, onDelete }) {
    const { authTokens } = useContext(AuthContext);

    async function deleteMessage() {
        await fetch(`${URL}/user/recommend/remove/${id}/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${authTokens.access}`,
            }
        });
        onDelete(); // Call the onDelete function to update the list without refreshing the page
    }
    const handleRefresh = () => {
        window.location.reload();
    };

    async function answerToLikedHandler() {
        await sendAnswer("Liked");
        handleRefresh();
    }

    async function answerToWatchedHandler() {
        await sendAnswer("Watched");
        handleRefresh();
    }

    async function answerToNotLikedHandler() {
        await sendAnswer("NotLiked");
        handleRefresh();
    }


    async function sendAnswer(status) {
        console.log(id)
        const bodyData = {
            recommend_id: id,
            answer_status: status
        }
        const response = await fetch(`${URL}/user/recommend/answer/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${authTokens.access}`,
            },
            body: JSON.stringify(bodyData)
        })

        const data = await response.json()
        console.log(data)
    }
    return (
        <div className='message-container'>
            <div className="message">
                <div className="message-header">
                    <span className="friend-name">{username}</span> suggested you to watch:
                </div>
                <div className="movie-information">
                    <h3 className="movie-name">
                        {movie.title}
                    </h3>
                    <MovieDetail movie={movie} />
                </div>

                <div className="button-container">
                    <button className="like-button" onClick={() => answerToLikedHandler()}>Liked it</button>
                    <button className="watched-button" onClick={() => answerToWatchedHandler()}>Already watched</button>
                    <button className="dislike-button" onClick={() => answerToNotLikedHandler()}>Didn't like it</button>
                </div>
            </div>
            <i onClick={() => deleteMessage()} className="fa fa-times fa-2x delete-icon"></i>

        </div>
    );
}

export default Message;
