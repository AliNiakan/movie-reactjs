import React, { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import "./Response.css";
import config from "../../config.json"
const URL = config.api_url;

function Response({ id, answer, username, onDelete }) {
    const { authTokens } = useContext(AuthContext);

    async function deleteMessage() {
        await fetch(`${URL}/user/recommend/answer/remove/${id}/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${authTokens.access}`,
            }
        });
        onDelete();
    }



    return (
        <div className='response-container'>
            <p className="response-content">
                <a href={`/user/${username}`} className="response-friend-name"> {username} </a>{answer.answer_status} <a href={`/movie/${answer.movie.id}`} className="response-movie-name"> {answer.movie.title} </a> (you suggested) !</p>
            <i onClick={() => deleteMessage()} className="fa fa-times fa-2x delete-icon"></i>
        </div>
    );
}

export default Response;
