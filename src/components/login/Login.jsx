import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { createRef } from 'react';
import { auth } from '../../utils/firebase.config';
import "./login.css"

const Login = () => {
    const email = createRef()
    const password = createRef()
    const handleSubmit = async(e)=> {
        e.preventDefault()
        signInWithEmailAndPassword(auth,email.current.value,password.current.value)
    }
    return (
        <div className='login'>
            <div className="loginContainer">
                <h1>Se connecter</h1>
                <form className='loginForm' onSubmit={handleSubmit}>
                    <input type="email" placeholder='Email' ref={email} /><br /><br />
                    <input type="password" placeholder='Password' ref={password} /><br /><br />
                    <button className='loginBtn'>Se connecter</button>
                </form>
            </div>
        </div>
    );
};

export default Login;