// Login.js
import React, { useContext } from 'react';
import Navbar from '../Navbar/Navbar';
import AuthContext from '../../context/AuthContext';

function Login() {
    const authContext = useContext(AuthContext);


    const handleLogin = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const username = formData.get('username');
        const password = formData.get('password');

        try {
            await authContext.loginUser(username, password); 
        
        } catch (error) {
            console.log(`ERROR: ${error}`);
        }
    };

    return (

        <div className='login'>
            <Navbar />
            <div className='login--page'>
                <h1 className='login--page--title'>Sign in to your account</h1>
                <form onSubmit={handleLogin}>
                    <div className="login--input-group">
                        <label htmlFor="username">Username</label>
                        <input type='text' id='username' name='username' className='login--input-field' />
                    </div>
                    <div className="login--input-group">
                        <label htmlFor="password">Password</label>
                        <input type='password' id='password' name='password' className='login--input-field' />
                    </div>
                    <button type='submit' className='login--button'>Login</button>
                </form>

                <p>Don't have an account? <span><a className='login--redirect' href='/register'>Sign up</a></span> here.</p>
            </div>
        </div>
    );
}

export default Login;
