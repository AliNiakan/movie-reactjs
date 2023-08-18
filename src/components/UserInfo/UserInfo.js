import React, { useEffect, useContext, useState } from "react";
import Navbar from "../Navbar/Navbar";
import "./UserInfo.css"
import ErrorPage from "../Error/ErrorPage";
import { useParams } from 'react-router-dom';
import MovieCard from "../MovieCard/MovieCard"
import AuthContext from "../../context/AuthContext";
import FollowList from "../FollowList/FollowList";
import config from '../../config.json';
const URL = config.api_url

function UserInfo() {
  const { username } = useParams();
  const { authTokens, user } = useContext(AuthContext)

  const [currentUser, setCurrentUser] = React.useState(null);
  const [isFriend, setIsFriend] = React.useState()
  const [isLoading, setIsLoading] = React.useState(true);
  const [favoriteMovies, setFavoriteMovies] = React.useState()

  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowings, setShowFollowings] = useState(false);
  const [followers, setFollowers] = useState([]);
  const [followings, setFollowings] = useState([]);

  useEffect(() => {
    async function getUser() {
      try {
        const response = await fetch(`${URL}/user/profile/${username}/`);
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const data = await response.json();
        setCurrentUser(data.user);
        setIsLoading(false);
        setFavoriteMovies(data.user.favorite_movies)
        if (!data.success) {
          setIsLoading(false);
          return <ErrorPage message={data.message} />
        }
      } catch (error) {

      }
    }
    getUser();
  }, []);

  useEffect(() => {
    async function checkIsFriend() {
      const response = await fetch(`${URL}/user/follow-exists/${username}/`, {
        headers: {
          "Authorization": `Bearer ${authTokens.access}`
        }
      });
      const data = await response.json();
      setIsFriend(data.success)
    }
    checkIsFriend()
  }, []);

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
    const response = await fetch(`${URL}/user/followers/${username}`, {
      headers: {
        "Authorization": `Bearer ${authTokens.access}`
      }
    });
    const data = await response.json();
    setFollowers(data.users);
  }

  async function fetchFollowings() {
    const response = await fetch(`${URL}/user/followings/${username}`, {
      headers: {
        "Authorization": `Bearer ${authTokens.access}`
      }
    });
    const data = await response.json();
    setFollowings(data.users);
  }


  async function addFriend() {
    try {
      const response = await fetch(`${URL}/user/follow/${username}/`, {
        method: 'POST',
        headers: {
          "Authorization": `Bearer ${authTokens.access}`
        }
      });
      if (!response.ok) {
        alert(`${username} is already your friend...`);
        return;
      }

      setIsFriend(true);
      alert(`${username} added to your friends.`);
    } catch {
      alert(`Something went wrong`);
    }
  }

  async function deleteFriend() {
    const response = await fetch(`${URL}/user/unfollow/${username}/`, {
      method: 'DELETE',
      headers: {
        "Authorization": `Bearer ${authTokens.access}`
      }
    });
    const data = await response.json()
    if (response.ok) {
      setIsFriend(false);
    } else {
     return <ErrorPage message={data.message}/>
    }
  }


  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-container">
      <Navbar />
      <div id="profile">
        <img src={currentUser.photo} className="profile-picture" alt="Profile Picture" />
        <h1><span className="profile-username">{currentUser.username}</span></h1>
        <p className="follow-btn" id="followers" onClick={getFollowers}>
          Followers: <span>{currentUser.follower_count}</span>
        </p>
        <p  className="follow-btn" id="following" onClick={getFollowings}>
          Following: <span>{currentUser.following_count}</span>
        </p>


        {currentUser.bio ? <p>Bio: <span id="bio">{currentUser.bio}</span></p>
          : null}

        {isFriend ? (
          <i className="delete-friend" onClick={() => deleteFriend()}>Delete Friend</i>
        ) : (
          <i className="add-friend" onClick={() => addFriend()}>Add Friend</i>
        )}

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


        <div className="favorite-movies">
          <h4>Favorite Movies :</h4>
          <div className="movie-list">
            {favoriteMovies !== null ? (
              favoriteMovies.length > 0 ? (
                favoriteMovies.map((movie) => (
                  <MovieCard key={movie.id} data={movie} className="movie-card" />
                ))
              ) : (
                <b>This user has no favorite movies.</b>
              )
            ) : (
              <b>Loading favorite movies...</b>
            )}
          </div>
        </div>


      </div>
    </div>
  );
}

export default UserInfo;
