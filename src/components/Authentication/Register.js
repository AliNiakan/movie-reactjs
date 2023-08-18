import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import "./Authentication.css"
import config from '../../config.json';
const URL = config.api_url

function Register() {

    const [verifyEmail, setVerifyEmail] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [verifyCode, setVerifyCode] = useState("");
    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    async function verifyEmailHandler() {
        try {
            const response = await fetch(`${URL}/user/register/email/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email
                })
            });

            const data = await response.json();
            if (!data.success) {
                setVerifyEmail(false);
                alert(data.email)
                return
            }
            console.log(data);
            setVerifyEmail(true);
            alert('Check your email for verification.');
        } catch (error) {
            console.error('Error:', error);
        }
    }

    async function registerHandler() {
        try {
            const response = await fetch(`${URL}/user/register/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    username: username,
                    password: password,
                    verify_code: verifyCode
                })
            });

            const data = await response.json();

            console.log(data);

            alert('Done.');
        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <div className='register'>
            <Navbar />
            <div className='register--page'>
                <h1 className='register--page--title'>Create a new account</h1>

                <div className="register--input-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type='email'
                        id='email'
                        name='email'
                        className='register--input-field'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                {verifyEmail &&
                    <>
                        <div className="register--input-group">
                            <label htmlFor="username">Username</label>
                            <input
                                type='text'
                                id='username'
                                name='username'
                                className='register--input-field'
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>

                        <div className="register--input-group">
                            <label htmlFor="password">Password</label>
                            <i
                                className={`password-toggle fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}
                                style={{ 'color': '#1E90FF' }}
                                onMouseEnter={toggleShowPassword}
                                onMouseLeave={toggleShowPassword}
                            ></i>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id='password'
                                name='password'
                                className='register--input-field'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        
                        <div className="register--input-group">
                            <label htmlFor="verify">Verify code</label>
                            <br />
                            <input
                                type='text'
                                id='verify'
                                name='verify'
                                className='register--input-field'
                                value={verifyCode}
                                onChange={(e) => setVerifyCode(e.target.value)}
                            />
                        </div>
                        
                    </>}

                <button className='register--button' onClick={verifyEmailHandler}>Send code</button>
                {verifyEmail && <button className='register--button' onClick={registerHandler}>Register</button>}

                <p>
                    Already have an account? <span><a className='register--redirect' href='/login'>Login</a></span> here.
                </p>
            </div>
        </div>
    );
}

export default Register;
