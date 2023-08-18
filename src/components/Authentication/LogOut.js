import React, { useContext } from "react";
import Navbar from "../Navbar/Navbar";
import AuthContext from "../../context/AuthContext";
import "./Authentication.css"

function LogOut() {
    const { logoutUser } = useContext(AuthContext);
    function logoutHandler() {
        logoutUser()
    }
    return (
        <div className="logout-container">
            <Navbar />
            <div className="logout-content">
                <h1>Are you sure want to log out?</h1>
                <button onClick={logoutHandler}>Yes</button>
            </div>
        </div>
    )
}

export default LogOut;