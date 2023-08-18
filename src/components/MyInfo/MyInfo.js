import React, { useState, useContext, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import EditInfo from "../EditInfo/EditInfo";
import "./MyInfo.css";
import AuthContext from "../../context/AuthContext";
import FollowList from "../FollowList/FollowList";
import config from '../../config.json';
const URL = config.api_url;

function MyInfo() {
    const [userInfo, setUserInfo] = useState({});
    const [showEdit, setShowEdit] = useState(false)
    const [showFollowings, setShowFollowings] = useState(false);
    const [showFollowers, setShowFollowers] = useState(false);
    const [followers, setFollowers] = useState([]);
    const [followings, setFollowings] = useState([]);

    const { authTokens } = useContext(AuthContext);

    useEffect(() => {
        async function getUserInformation() {
            const response = await fetch(`${URL}/user/profile/me/`, {
                headers: {
                    'Authorization': `Bearer ${authTokens.access}`
                }
            });
            const data = await response.json();
            setUserInfo(data);
        }

        getUserInformation();
    }, [authTokens]);

    function toggleEditOptions() {
        setShowEdit(showEdit => !showEdit);
    }

    async function getFollowers() {
        if (!showFollowers) {
            await fetchFollowers();
            setShowFollowers(true);
        } else {
            setShowFollowers(false);
        }
    }

    async function getFollowings() {
        if (!showFollowings) {
            await fetchFollowings();
            setShowFollowings(true);
        } else {
            setShowFollowings(false);
        }
    }

    async function fetchFollowers() {
        const response = await fetch(`${URL}/user/followers/me/`, {
            headers: {
                "Authorization": `Bearer ${authTokens.access}`
            }
        });
        const data = await response.json();
        setFollowers(data.users);
    }

    async function fetchFollowings() {
        const response = await fetch(`${URL}/user/followings/me/`, {
            headers: {
                "Authorization": `Bearer ${authTokens.access}`
            }
        });
        const data = await response.json();
        setFollowings(data.users);
    }

    const user = userInfo.user;

    return (
        <div>
            <Navbar />

            {user ? (
                <div className="my-info">

                    <div className="info-pfp">
                        <img src={user.photo} alt="Profile" />
                    </div>
                    <h2>@{user.username}</h2>
                    <div className="bio">
                        <label htmlFor="user-bio">
                            Bio:
                            <p id="user-bio">{user.bio}</p>
                        </label>
                    </div>

                    <div className="profile-details">

                        <div className="followers-following">
                            <p onClick={getFollowers} >Followers: {user.follower_count}</p>
                            <p onClick={getFollowings} >Following: {user.following_count}</p>
                        </div>

                        <button onClick={toggleEditOptions} className="change-button">Change Information <i className="fas fa-edit info-pfp"></i></button>
                        {showEdit
                            &&
                            <EditInfo
                                user={user}
                                showEdit={showEdit}
                                setShowEdit={setShowEdit}
                                toggleEditOptions={toggleEditOptions} />

                        }
                        {showFollowers && (
                            <FollowList
                                title="Followers"
                                users={followers}
                                onClose={() => setShowFollowers(false)}
                            />
                        )}

                        {showFollowings && (
                            <FollowList
                                title="Following"
                                users={followings}
                                onClose={() => setShowFollowings(false)}
                            />
                        )}

                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}

        </div>
    );
}

export default MyInfo;
