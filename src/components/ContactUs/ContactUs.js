import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import "./ContactUs.css";



function ContactUs() {
    const frontDeveloperID = 'Will_Never_Fade_Away';
    const backDeveloperID = 'Vector_Fa';

    const [showBackendImage, setShowBackendImage] = useState(false);
    const [showFrontendImage, setShowFrontendImage] = useState(false);


    return (
        <div>
            <Navbar />
            {showBackendImage && (
                <img
                    src="https://s6.uupload.ir/files/photo_2023-08-17_20-12-47_vk8y.jpg"
                    alt="Backend Developer"
                    className={`developer-image backend-image ${showBackendImage ? 'active' : ''}`}
                />
            )}
            {showFrontendImage && (
                <img
                    src="https://s6.uupload.ir/files/photo_2023-08-17_20-12-44_rqoi.jpg"
                    alt="Frontend Developer"
                    className={`developer-image frontend-image ${showFrontendImage ? 'active' : ''}`}
                />
            )}
            <div className="contact-us">
                <h1>Hello.</h1>
                <p>
                    <i className="fab fa-telegram" style={{ 'color': '#0088CC' }}></i> Back-end:@
                    <a
                        target="_blank"
                        href={`https://t.me/${backDeveloperID}`}
                        onMouseEnter={() => setShowBackendImage(true)}
                        onMouseLeave={() => setShowBackendImage(false)}
                    >
                        {backDeveloperID}
                    </a>
                    &nbsp;&nbsp;&nbsp;
                    <i className="fab fa-telegram" style={{ 'color': '#0088CC' }}></i>
                    Front-end:@
                    <a
                        target="_blank"
                        href={`https://t.me/${frontDeveloperID}`}
                        onMouseEnter={() => setShowFrontendImage(true)}
                        onMouseLeave={() => setShowFrontendImage(false)}
                    >
                        {frontDeveloperID}
                    </a>
                </p>

            </div>

        </div>
    );
}

export default ContactUs;
