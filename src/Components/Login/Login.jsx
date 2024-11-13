import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { auth } from '../../fireBase.init';
import { NavLink } from 'react-router-dom';

const Login = () => {
    const [success, setSuccess] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [loginError, setLoginError] = useState('');


    const handleLogin = (event) => {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;
        console.log(email, password);

        // reset status
        setSuccess(false);
        setLoginError('');

        // Login User
        signInWithEmailAndPassword(auth, email, password)
        .then(result => {
            console.log(result.user);
            setSuccess(true);
            setShowPassword(true);
        } )
        .catch(error => {
            console.log('ERROR', error.message);
            if(!result.user.emailVerified){
                setLoginError('Please verify your email address')
            }
            else{
                setSuccess(true);
            }
            setLoginError(error.message);
        })


    }
    return (
        <div className="card  w-full max-w-sm mx-auto shadow-xl mt-32">
           
            <form className="card-body" onSubmit={handleLogin}>
            <h1 className="text-4xl font-bold text-center mb-4">Login</h1>
                <div className="form-control">
                <label className="input input-bordered flex items-center gap-2 ">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="h-4 w-4 opacity-70">
                    <path
                    d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                    <path
                    d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                </svg>
                <input type="email" name='email' className="grow" placeholder="Email" required/>
                </label> 
                </div>
                <div className="form-control">
             
                <label className="input input-bordered flex items-center gap-2">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="h-4 w-4 opacity-70">
                    <path
                    fillRule="evenodd"
                    d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                    clipRule="evenodd" />
                </svg>
                <input 
                    type={showPassword ? 'text' : 'password'}
                    name='password' 
                    className="grow" 
                    placeholder='Password' required/>
                <button 
                    onClick={() => setShowPassword(!showPassword)}
                    className='btn btn-xs '>
                    {
                        showPassword ? <FaEyeSlash /> : <FaEye />
                    }
                    
                </button>
                </label>
         
                </div>
                <div className="form-control mt-6">
                <button className="btn btn-primary ">Log in</button>
                </div>
            </form>
            {
                success && <p className='text-green-800'>User login Successfull</p>
            }
            {
                loginError && <p className='text-purple-800'>Error:{loginError}</p>
            }
            <p>New to this website please <NavLink to='/signup'>SignUp</NavLink></p>
            </div>
    );
};

export default Login;