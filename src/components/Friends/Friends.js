import React, { useState, useEffect, useContext } from "react";
import Navbar from "../Navbar/Navbar";
import "./Friends.css";
import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import config from '../../config.json';

const URL = config.api_url;

function Friends() {
    const { authTokens} = useContext(AuthContext);
    const [friends, setFriends] = useState([]);
    const [haveFriends, setHaveFriends] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        async function getFollowings() {
            const response = await fetch(`${URL}/user/followings/me`, {
                headers: {
                    "Authorization": `Bearer ${authTokens.access}`
                }
            });
            const data = await response.json();
            setIsLoading(false)
            setFriends(data.users);
        }

        getFollowings();
    }, []);



    useEffect(() => {
        if (friends.length > 0) {
            setHaveFriends(true);
        } else {
            setHaveFriends(false);
        }
    }, [friends]);

    const handleSearchButton = async () => {
        const response = await fetch(`${URL}/user/search/${searchQuery}`, {
            headers: {
                "Authorization": `Bearer ${authTokens.access}`
            }
        });
        const data = await response.json();
        setFilteredData(data.users);
    };

    return (
        <div className="friends">
            <Navbar />
            <div className="friends--content">
                {isLoading ? (
                    <div>Loading...</div>
                ) : (
                    <>
                        {haveFriends && <h1>Your current friends:</h1>}
                        {haveFriends ? (
                            friends.map((friend) => (
                                <div key={friend.username}>
                                    <div className="friends--container">
                                        <img className="friends--icon" src={friend.photo} alt={friend.username}></img>
                                        <Link to={`/user/${friend.username}`}>
                                            <h3>@{friend.username}</h3>
                                        </Link>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="friends--not-found">
                                <h2>Sorry... cannot find any friends.</h2>
                                <h3>Add some friends now!</h3>
                                <img src='https://static.thenounproject.com/png/28129-200.png' alt="No friends found" />
                            </div>
                        )}
                        <div className={haveFriends ? 'margin-bottom' : ''}>
                            <div className='addfriend'>
                                <i className="fa fa-user fa-solid fa-flip" aria-hidden="true"></i>
                                <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="addfriend--search-input" placeholder="Search..." />
                                <button className="search-btn" onClick={handleSearchButton}>Search</button>
                            </div>
                            <ul className="user-list">
                                {filteredData.map((user) => (
                                    <Link to={`/user/${user.username}`} key={user.username}>
                                        <li>
                                            <img className="friends--icon" src={user.photo} alt={user.username} />
                                            <h3>{user.username}</h3>
                                            <p>@{user.username}</p>
                                        </li>
                                    </Link>
                                ))}
                            </ul>
                        </div>
                    </>
                )}
            </div>
        </div >
    );
}

export default Friends;
