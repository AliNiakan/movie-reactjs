import React from "react";
import "./FollowList.css";

function FollowList({ title, users, onClose, showSuggestion,suggestToFriend }) {
    return (
        <div className="follow-list">
            <div className="content">
                <h2>{title}</h2>
                <ul>
                    {users.map((user) => (
                        <li key={user.id}>
                            <a href={`/user/${user.username}`} className="user-link">
                                <img src={user.photo} className="user-photo" alt={user.username} />
                                {user.username}
                            </a>
                            {showSuggestion &&
                                <button className="suggestion-button" onClick={() => suggestToFriend(user.username)}>Suggest</button>
                            }
                        </li>

                    ))}
                </ul>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
}

export default FollowList;
