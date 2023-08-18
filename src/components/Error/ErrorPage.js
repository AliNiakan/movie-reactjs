import React, { useState } from "react";
import "./ErrorPage.css";

function ErrorPage(props) {
    const [isHappy, setIsHappy] = useState(false);

    const handleMouseEnter = () => {
        setIsHappy(true);
    };

    const handleMouseLeave = () => {
        setIsHappy(false);
    };

    return (
        <div className="errorpage">
            <a href={`/`}>
                <i
                    className={`fas ${isHappy ? "fa-smile" : "fa-frown"} fa-8x`}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                ></i>
            </a>
            <p className={`typing-text ${isHappy ? "show" : ""}`}>i can take you home</p>
            <h1>Sorry... it seems like something is wrong</h1>
            <h3>{props.message}</h3>
        </div>
    );
}

export default ErrorPage;
