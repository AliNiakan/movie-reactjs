import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from './components/Authentication/Register';
import ContactUs from './components/ContactUs/ContactUs';
import Friends from './components/Friends/Friends';
import UserInfo from './components/UserInfo/UserInfo';
import MoviePage from './components/MoviePage/MoviePage';
import AddMovie from './components/AddMovie/AddMovie';
import Genres from "./components/Genres/Genres";
import GenreMovies from "./components/GenreMovies/GenreMovies";
import Login from './components/Authentication/Login';
import Home from './components/Home/Home';
import Inbox from './components/Inbox/Inbox';
import LogOut from './components/Authentication/LogOut';
import MyInfo from './components/MyInfo/MyInfo';
import EditInfo from './components/EditInfo/EditInfo';
import Favorites from './components/Favorites/Favorites';
import AuthContext from './context/AuthContext';

function App() {
  const { user, isAdmin } = useContext(AuthContext);

  return (
    <div className="container">
      <Routes>


        {user &&
          <>
            <Route path="/logout" element={<LogOut />} />
            <Route path="/myinfo" element={<MyInfo />} />
            <Route path="/editinfo" element={<EditInfo />} />
            <Route path="/inbox" element={<Inbox />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/friends" element={<Friends />} />
          </>
        }
        {
          isAdmin && user && (
            <Route path="/addmovie" element={<AddMovie />} />
          )
        }
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/user/:username" element={<UserInfo />} />
        <Route path="/movie/:id" element={<MoviePage />} />
        <Route path="/genres" element={<Genres />} />
        <Route path="/genres/:genre" element={<GenreMovies />} />
      </Routes>
    </div>

  );
}

export default App;
