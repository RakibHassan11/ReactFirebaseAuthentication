import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import React, { useState } from 'react';
import { auth } from '../../fireBase.init';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { NavLink } from 'react-router-dom';

const SignUp = () => {
    const [success, setSuccess] = useState(null);
    const [errorMessage, setErrorMessage] = useState(false);
    const [showPassword, setShowPassword] = useState(false);


    const handleSignUp = (event) =>{
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;
        const terms = event.target.terms.checked;
        console.log(email, password, terms)

        // reset error and status
        setErrorMessage('');
        setSuccess(false);
        if(!terms){
            setErrorMessage('Please accept our terms and conditions')
            return;
        }

        if(password.length < 6){
            setErrorMessage('Password should be 6 character or longer');
            return;
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
        if(!passwordRegex.test(password)){
            setErrorMessage('Must include one uppercase, one lowercase, one number, one special character');
            return;
        }

        // Create user with email and password
        createUserWithEmailAndPassword(auth, email, password)
        .then( result => {
            console.log(result.user);
            setSuccess(true);
        })
        .catch(error =>{
            console.log('ERROR', error.message)
            setErrorMessage(error.message)
            setSuccess(false);

            // Sent Varification email
            sendEmailVerification(auth.currentUser)
            .then(()=>{
                console.log('Verification email sent')
            })
        })
    }

    return (

            <div className="card  w-full max-w-sm mx-auto shadow-xl mt-32">
           
            <form className="card-body" onSubmit={handleSignUp}>
            <h1 className="text-4xl font-bold text-center mb-4">SignUp Here!</h1>
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

                <div className="form-control">
                <label className="label cursor-pointer justify-start">
                    <input type="checkbox" defaultChecked className="checkbox" name='terms' />               
                    <span className="label-text ml-2">Accept our terms and conditions</span>
                </label>
                </div>

                <div className="form-control mt-6">
                <button className="btn btn-primary ">Sign Up</button>
                </div>
            </form>
            {
                errorMessage && <p className='text-sm mx-auto ml-7'>{errorMessage}</p>
            }
            {
                success &&  <p className='text-green-700 mx-auto'>Sign Up Successfull</p>
            }
            <p>Already Have an Account? Please <NavLink to ="/login">Login</NavLink></p>
            </div>
    );
};

export default SignUp;