// signup.jsx

import React from 'react'
import './Signup.css'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BaseURL } from '../../BaseURL/BaseUrl.js';
import axios from 'axios';

const Signup = () => {
    const [userDetails, setUserDetails] = useState({
        email: '',
        password: '',
        name: ''
    })

    const [error, setError] = useState('')

    const handleUserInputs = () => {

        if (!userDetails.email || !userDetails.password || !userDetails.name) {
            // setError("Please fill all the input fields")
            toast.error("Please fill all the input fields")
            return false
        }

        const emailRegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegExp.test(userDetails.email)) {
            setError("Invalid Email")
            return false
        }


        if (userDetails.password.length < 6) {
            setError("Password must have minimum 6 character")
            return false;
        }

        setError('')
        // toast.success("Successfully Signup")
        return true


    }

    const handleSignup = async () => {
        const isvalid = handleUserInputs();
        if (!isvalid) return;

        try {
            const res = await axios.post(`${BaseURL}api/auth/signup`, {
                email: userDetails.email,
                password: userDetails.password,
                name: userDetails.name
            });
            toast.success("Signup successfully!...");
            setUserDetails({
                email: '',
                password: '',
                name: ''
            })

        } catch (error) {
            console.log(error)
            if (error.response && error.response.data && error.response.data.error) {
                setError(error.response.data.error)
                toast.error(error.response.data.error)
            }
            else {
                setError("Something went wrong.. Please try again");
                toast.error("Signup Failed!")

            }


        }

    }



    return (

        <div className="signup-container">

            <div className='signup'>
                <form>
                    <h1>Todo-App</h1>

                    <input type='email' placeholder='Email'
                        value={userDetails.email}
                        onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })} />

                    <input type='password' placeholder='Password'
                        value={userDetails.password}
                        onChange={(e) => setUserDetails({ ...userDetails, password: e.target.value })}
                    />

                    <input type='text' placeholder='Name'
                        value={userDetails.name}
                        onChange={(e) => setUserDetails({ ...userDetails, name: e.target.value })}
                    />

                    <button type='button' onClick={handleSignup}>Signup</button>

                    <h4 className='error'>{error}</h4>
                    <p>Already have an account?</p>
                    <Link to='/login'>Login</Link>

                </form>

            </div>
            <ToastContainer position="top-center" autoClose={2000} />

        </div>

    )
}

export default Signup