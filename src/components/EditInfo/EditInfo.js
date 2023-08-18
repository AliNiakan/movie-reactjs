import React, { useState, useContext } from 'react';
import './EditInfo.css';
import AuthContext from "../../context/AuthContext";
import config from '../../config.json';
import Resizer from 'react-image-file-resizer';
const URL = config.api_url;

function EditInfo(props) {
    const [editedBio, setEditedBio] = useState('');
    const [editedProfilePicture, setEditedProfilePicture] = useState(null);
    const { authTokens } = useContext(AuthContext);
    const [profilePicturePreview, setProfilePicturePreview] = useState(null);

    const handleBioChange = (event) => {
        setEditedBio(event.target.value);
    };
    const handleRefresh = () => {
        window.location.reload();
    };
    const handleProfilePictureChange = (e) => {
        const file = e.target.files[0];


        Resizer.imageFileResizer(
            file,
            500, // new width
            500, // new height
            'JPEG', // format
            100, // quality
            0, // rotation
            (resizedFile) => {
                setEditedProfilePicture(resizedFile);
                setProfilePicturePreview(window.URL.createObjectURL(resizedFile));
            },
            'file'
        );
    };


    const updateProfile = async () => {
        try {
            const updateProfileURL = `${URL}/user/update/profile/`;
            const uploadProfileImageURL = `${URL}/user/upload/profile-image/`;

            if (editedBio) {
                const updateProfileOptions = {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${authTokens.access}`
                    },
                    body: JSON.stringify({ bio: editedBio }),
                };

                await fetch(updateProfileURL, updateProfileOptions);
                alert("Profile updated successfully.");
            }
            if (editedProfilePicture) {
                const formData = new FormData();
                formData.append('image', editedProfilePicture);

                const uploadProfileImageOptions = {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${authTokens.access}`
                    },
                    body: formData,
                };
                const response = await fetch(uploadProfileImageURL, uploadProfileImageOptions);
                const data = await response.json()
                if (data.success) {
                    alert(data.message)
                    handleRefresh()
                }
               

            }

        } catch (error) {
            console.error("Error updating profile:", error);
            throw error;
        }
    };


    return (
        <div>
            <div className='edit-info'>
                <h2>Edit Info</h2>
                <label htmlFor='bio'>Bio:</label>
                <input
                    type='text'
                    id='bio'
                    value={editedBio}
                    onChange={handleBioChange}
                    placeholder='Enter your new bio'
                />

                <label htmlFor='profilePicture'>Profile Picture:</label>
                <input
                    type='file'
                    id='profilePicture'
                    onChange={handleProfilePictureChange}
                />

                {profilePicturePreview && <img src={profilePicturePreview} alt='Profile' />}

                <div className='buttons'>
                    <button onClick={updateProfile} className='done-button'>
                        Done
                        <i className=" fa fa-check" aria-hidden="true"></i>
                    </button>
                    <button onClick={props.toggleEditOptions} className='cancel-button'>
                        Cancel
                        <i className="fa fa-x" aria-hidden="true"></i>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default EditInfo;